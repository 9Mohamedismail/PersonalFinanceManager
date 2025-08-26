import { useState } from "react";
import axios from "axios";
import { FcMoneyTransfer } from "react-icons/fc";
import { IoIosCheckmarkCircle } from "react-icons/io";
import type { InsertUser } from "../db/schema";
import { useNavigate } from "react-router-dom";

type Field = "email" | "username" | "password";
type ValidatableField = "email" | "username";
type TouchedState = Record<Field, boolean>;
type ErrorState = Record<ValidatableField, string>;
type PasswordRule = {
  id: string;
  message: string;
  test: (value: string, username: string) => boolean;
};

function SignUpForm() {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState<InsertUser>({
    username: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState<TouchedState>({
    email: false,
    username: false,
    password: false,
  });

  const [error, setError] = useState<ErrorState>({
    email: "",
    username: "",
  });

  const [serverError, setServerError] = useState("");

  const [loading, setLoading] = useState(false);

  const validators: Record<ValidatableField, (value: string) => string> = {
    email: (value) => {
      if (!value.trim()) return "This email field is required";
      const emailPattern = /^[^@]+@[^@]+$/;
      return emailPattern.test(value)
        ? ""
        : "Please enter a valid email address";
    },

    username: (value) => {
      if (!value.trim()) return "This username field is required";
      if (value.length < 3 || value.length > 20)
        return "Username must be between 3 and 20 characters long.";
      if (!/^[a-zA-Z0-9]+$/.test(value))
        return "Username may only contain letters and numbers (no spaces or symbols).";
      return "";
    },
  };

  const passwordRules: PasswordRule[] = [
    {
      id: "lower",
      message: "One lowercase character",
      test: (value) => /[a-z]/.test(value),
    },
    {
      id: "upper",
      message: "One uppercase character",
      test: (value) => /[A-Z]/.test(value),
    },
    {
      id: "digit",
      message: "One number",
      test: (value) => /\d/.test(value),
    },
    {
      id: "special",
      message: "One special character",
      test: (value) => /[^a-zA-Z0-9]/.test(value),
    },
    {
      id: "len8",
      message: "8 characters minimum",
      test: (value) => value.length >= 8,
    },
    {
      id: "no-username",
      message: "Must not contain username",
      test: (value, username) =>
        username.length > 0
          ? !value.toLowerCase().includes(username.toLowerCase())
          : true,
    },
  ];

  const allPasswordRulesPassed = passwordRules.every((rule) =>
    rule.test(newUser.password, newUser.username)
  );

  const showCheck = (field: Field) => {
    return touched[field] && newUser[field].length > 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as Field;
    const value = e.target.value;

    setNewUser((prev) => ({ ...prev, [name]: value }));
    if (name === "email" || name === "username") {
      setError((prev) => ({
        ...prev,
        [name]: validators[name]?.(value) ?? "",
      }));
    }
  };

  const formValid =
    validators.email(newUser.email) === "" &&
    validators.username(newUser.username) === "" &&
    allPasswordRulesPassed;

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValid || loading) return;
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/signup", {
        username: newUser.username.toLowerCase(),
        email: newUser.email.toLowerCase(),
        password: newUser.password,
      });

      if (res.status === 201) {
        console.log("User created successfully!");
        navigate("/dashboard");
      }
    } catch (err: any) {
      const serverMsg = err.response?.data?.error ?? "Login failed";
      setServerError(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 px-4 lg:px-8">
      <div className="h-full flex flex-col max-w-sm sm:max-w-md md:max-w-xl mx-auto">
        {serverError && (
          <div className="border roundeds bg-secondary-100 py-4 mb-4">
            <p className="text-base text-primary mx-4 font-bold">
              {serverError}
            </p>
          </div>
        )}
        <div className="flex justify-center ">
          <FcMoneyTransfer className="w-16 h-16 md:w-24 md:h-24" />
        </div>
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:text-center mb-4 font-bold text-primary tracking-wide">
          Get started with your account
        </p>
        <p className="text-base lg:text-lg text-gray-900 lg:text-center">
          Track your spending, grow your savings, and reach your goals all in
          one place.
          <span className="block sm:inline mt-1 sm:mt-0 sm:ml-1">
            Already have an account?
            <a
              onClick={() => navigate("/login")}
              className="cursor-pointer font-bold text-secondary ml-1"
            >
              Log in.
            </a>
          </span>
        </p>

        <form noValidate className="mt-4" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col">
            <div className="">
              <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
                Email
              </label>
              <div className="relative w-full">
                <input
                  className="appearance-none block w-full bg-background border border-secondary rounded py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
                  type="email"
                  name="email"
                  value={newUser.email ?? ""}
                  onFocus={(e) =>
                    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
                  }
                  onChange={handleChange}
                />
                {showCheck("email") && (
                  <IoIosCheckmarkCircle
                    color={!error.email.length ? "4BB543" : "FC100D"}
                    className="absolute inset-y-0 right-0 h-full w-10 p-2 "
                  />
                )}
              </div>
              {error && (
                <p className="-mt-2 text-sm md:text-base text-[#fc100d] ">
                  {error.email}
                </p>
              )}
            </div>
            <div className="">
              <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
                Username
              </label>
              <div className="relative w-full">
                <input
                  className="appearance-none block w-full bg-background border border-secondary rounded py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
                  type="text"
                  name="username"
                  value={newUser.username ?? ""}
                  onFocus={(e) =>
                    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
                  }
                  onChange={handleChange}
                />
                {showCheck("username") && (
                  <IoIosCheckmarkCircle
                    color={!error.username.length ? "4BB543" : "fc100d"}
                    className="absolute inset-y-0 right-0 h-full w-10 p-2 "
                  />
                )}
              </div>
            </div>
            {error && (
              <p className="-mt-2 text-sm md:text-base text-[#fc100d]">
                {error.username}
              </p>
            )}
            <div className="">
              <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
                Password
              </label>
              <div className="relative w-full">
                <input
                  className="appearance-none block w-full bg-background border border-secondary rounded py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
                  type="password"
                  name="password"
                  value={newUser.password ?? ""}
                  onFocus={(e) =>
                    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
                  }
                  onChange={handleChange}
                />
                {showCheck("password") && allPasswordRulesPassed && (
                  <IoIosCheckmarkCircle
                    color="4BB543"
                    className="absolute inset-y-0 right-0 h-full w-10 p-2 "
                  />
                )}
              </div>
            </div>
          </div>
          <ul className="-mt-2 mb-2 space-y-1">
            {showCheck("password") &&
              passwordRules.map((rule) => {
                const passed = rule.test(newUser.password, newUser.username);
                return (
                  <li key={rule.id} className="flex items-center text-sm">
                    {passed ? (
                      <IoIosCheckmarkCircle className="mr-2" color="4BB543" />
                    ) : (
                      <span className="w-3 h-3 mr-2 rounded-full border border-gray-400 inline-block" />
                    )}
                    <span
                      className={passed ? "text-green-600" : "text-gray-700"}
                    >
                      {rule.message}
                    </span>
                  </li>
                );
              })}
          </ul>
          <button
            type="submit"
            disabled={!formValid || loading}
            className={`border-2 border-primary rounded py-2 w-full md:w-1/2 px-4 text-lg font-bold text-primary uppercase tracking-wide ${
              !formValid || loading
                ? "opacity-50 cursor-not-allowed"
                : "text-primary cursor-pointer"
            }`}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <div className="flex items-center mb-2">
          <div className="flex-1 h-px bg-primary"></div>
          <span className="px-3 text-lg text-gray-900 uppercase">or</span>
          <div className="flex-1 h-px bg-primary"></div>
        </div>

        <div className="flex flex-col gap-2 ">
          <button className="border-2 cursor-pointer border-primary rounded  py-2 px-4 text-lg font-bold text-primary uppercase tracking-wide">
            Google
          </button>
          <button className="border-2 cursor-pointer border-primary rounded  py-2 px-4 text-lg font-bold text-primary uppercase tracking-wide">
            Github
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
