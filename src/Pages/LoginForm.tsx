import { useContext, useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserInfoContext } from "../Context/UserInfoContext";

type Login = {
  identifier: string;
  password: string;
};

function LoginForm() {
  const navigate = useNavigate();
  const { setUser, setAuthStatus } = useContext(UserInfoContext);

  const [login, setLogin] = useState<Login>({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!login.identifier || !login.password) {
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/login",
        {
          identifier: login.identifier.toLowerCase(),
          password: login.password,
        },
        { withCredentials: true }
      );

      console.log("User logged in successfully!");
      setUser(res.data.user);
      setAuthStatus("authenticated");
      navigate("/dashboard");
    } catch (err: any) {
      const serverMsg = err?.response?.data?.message;
      const fallbackMsg = err?.message || "Login failed";
      setServerError(serverMsg || fallbackMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col max-w-sm sm:max-w-md mx-auto justify-center">
      {serverError && (
        <div className="border bg-secondary-100 rounded shadow-sm border-primary py-4 mb-4">
          <p className="text-base text-primary mx-4 font-semibold">
            {serverError}
          </p>
        </div>
      )}
      <div className="flex justify-center ">
        <FcMoneyTransfer className="w-16 h-16 md:w-24 md:h-24" />
      </div>
      <p className="text-4xl md:text-5xl text-center mb-4 text-primary tracking-wide">
        Log in to NAME
      </p>
      <p className="text-lg text-gray-900 text-center">
        Need a NAME account?
        <a
          onClick={() => navigate("/signup")}
          className="cursor-pointer font-semibold text-secondary ml-1"
        >
          Create an account.
        </a>
      </p>

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col">
          <div className="">
            <label className="block text-lg text-primary uppercase tracking-wide mb-2">
              Username or Email
            </label>
            <input
              className="appearance-none block w-full bg-white rounded shadow-sm border border-primary  py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
              type="text"
              name="identifier"
              value={login.identifier ?? ""}
              onChange={handleChange}
            />
          </div>

          <div className="">
            <label className="block text-lg text-primary uppercase tracking-wide mb-2">
              Password
            </label>
            <input
              className="appearance-none block w-full bg-white rounded shadow-sm border border-primary py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary text-primary"
              type="password"
              name="password"
              value={login.password ?? ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`border-2 bg-white rounded shadow-sm border-primary py-2 w-full px-4 text-lg font-semibold text-primary uppercase tracking-wide cursor-pointer ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "text-primary cursor-pointer"
          }`}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className="flex flex-row gap-2 mt-2">
        <button
          className="border-2 bg-white rounded shadow-sm border-primary py-1 w-full px-2 text-base font-semibold text-primary tracking-wide cursor-pointer"
          onClick={() => navigate("/login/forgot-username")}
        >
          Forgot Username?
        </button>
        <button
          className="border-2 bg-white rounded shadow-sm border-primary py-1 w-full px-2 text-base font-semibold text-primary tracking-wide cursor-pointer"
          onClick={() => navigate("/login/forgot")}
        >
          Forgot Password?
        </button>
      </div>

      <div className="flex items-center mb-2">
        <div className="flex-1 h-px bg-primary"></div>
        <span className="px-3 text-lg text-gray-900 uppercase">or</span>
        <div className="flex-1 h-px bg-primary"></div>
      </div>

      <div className="flex flex-col gap-2 ">
        <button className="border-2 bg-white rounded shadow-sm border-primary  py-2 px-4 text-lg font-semibold text-primary uppercase tracking-wide cursor-pointer">
          Google
        </button>
        <button className="border-2 bg-white rounded shadow-sm border-primary  py-2 px-4 text-lg font-semibold text-primary uppercase tracking-wide cursor-pointer">
          Github
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
