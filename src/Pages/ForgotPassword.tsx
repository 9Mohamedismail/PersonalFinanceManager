import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { validatePassword } from "../utils/passwordRules";
import { PasswordRulesList } from "../components/PasswordRulesList";
import { IoIosCheckmarkCircle } from "react-icons/io";

type Info = {
  username: string;
  email: string;
};

type Result = {
  message: string;
  success: boolean;
};

type Step = "verify" | "setPassword" | "done";

function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("verify");
  const [info, setInfo] = useState<Info>({
    username: "",
    email: "",
  });
  const [password, setPassword] = useState({ password: "", confirm: "" });
  const [result, setResult] = useState<Result>({
    message: "",
    success: false,
  });

  const [touched, setTouched] = useState({ password: false, confirm: false });

  const [loading, setLoading] = useState(false);

  const onChangeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setResult({ message: "", success: false });
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setResult({ message: "", success: false });
  };

  const handleRequestSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!info.username || !info.email) {
      setResult({ message: "Enter both username and email", success: false });
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/user", info);

      setResult({
        message: "Identity verified. Set a new password.",
        success: true,
      });
      setStep("setPassword");
    } catch (err: any) {
      const serverMsg = err?.response?.data?.message;
      const fallbackMsg = err?.message || "Could not verify user.";
      setResult({
        message: serverMsg || fallbackMsg,
        success: false,
      });
    }
  };

  const handlePasswordSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!password.password || password.password !== password.confirm) {
      setResult({ message: "Passwords must match.", success: false });
      return;
    }

    const failedRules = validatePassword(password.password);

    if (failedRules.length !== 0 || loading) return;

    try {
      setLoading(true);
      await axios.put("http://localhost:3000/api/user/reset", {
        email: info.email,
        newPassword: password.password,
      });

      setResult({
        message: "Password updated. You can log in now",
        success: true,
      });
      setStep("done");
      setPassword({ password: "", confirm: "" });
      setTouched({ password: false, confirm: false });
    } catch (err: any) {
      const serverMsg = err?.response?.data?.message;
      const fallbackMsg = err?.message || "Could not update password";
      setResult({
        message: serverMsg || fallbackMsg,
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col max-w-sm sm:max-w-md md:max-w-lg mx-auto justify-center">
      {!result.success && result.message && (
        <div className="border bg-secondary-100 rounded shadow-sm py-4 mb-4">
          <p className="text-base text-primary mx-4 font-semibold">
            {result.message}
          </p>
        </div>
      )}

      {step === "verify" && (
        <>
          <p className="text-4xl md:text-5xl mb-4 text-primary tracking-wide">
            Reset your password
          </p>
          <p className="text-base md:text-lg text-gray-900">
            No worries, we'll help you get back to your account. Verify your
            account email address and username to continue.
          </p>

          <form className="mt-4" onSubmit={handleRequestSubmit}>
            <div className="w-full flex flex-col">
              <div className="">
                <label className="block text-lg text-primary uppercase tracking-wide mb-2">
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-white rounded shadow-sm border border-primary py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
                  type="email"
                  name="email"
                  value={info.email ?? ""}
                  onChange={onChangeInfo}
                />
              </div>
              <div className="">
                <label className="block text-lg text-primary uppercase tracking-wide mb-2">
                  Username
                </label>
                <input
                  className="appearance-none block w-full bg-white rounded shadow-sm border border-primary py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
                  type="username"
                  name="username"
                  value={info.username ?? ""}
                  onChange={onChangeInfo}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-2">
              <button
                type="submit"
                className="border-2 bg-white rounded shadow-sm border-primary py-2 w-full px-4 text-lg font-semibold text-primary uppercase tracking-wide cursor-pointer"
              >
                Reset Password
              </button>

              <button
                className="border-primary rounded w-full px-4 underline text-center lg:text-left text-base cursor-pointer font-semibold text-secondary tracking-wide"
                onClick={() => navigate("/login")}
              >
                Return to login
              </button>
            </div>
          </form>
        </>
      )}

      {step === "setPassword" && (
        <>
          <p className="text-5xl mb-4 text-primary tracking-wide">
            Choose a new password
          </p>

          <form className="mt-4" onSubmit={handlePasswordSubmit}>
            <div className="w-full flex flex-col">
              <label className="block text-lg text-primary uppercase tracking-wide mb-2">
                Password
              </label>
              <div className="relative w-full">
                <input
                  className="appearance-none block w-full bg-white rounded shadow-sm border border-primary py-3 px-4 mb-3 leading-tight 
                              focus:outline-none focus:bg-white focus:border-primary text-primary"
                  type="password"
                  name="password"
                  value={password.password ?? ""}
                  onChange={onChangePassword}
                  onFocus={(e) =>
                    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
                  }
                />
                {password.password.length > 0 &&
                  validatePassword(password.password).length === 0 && (
                    <IoIosCheckmarkCircle
                      color="4BB543"
                      className="absolute inset-y-0 right-0 h-full w-10 p-2 "
                    />
                  )}
              </div>
              <div className="">
                <label className="block text-lg text-primary uppercase tracking-wide mb-2">
                  Confirm Password
                </label>
                <div className="relative w-full">
                  <input
                    className="appearance-none block w-full bg-white rounded shadow-sm border border-primary py-3 px-4 mb-3 leading-tight 
                              focus:outline-none focus:bg-white focus:border-primary text-primary"
                    type="password"
                    name="confirm"
                    value={password.confirm ?? ""}
                    onChange={onChangePassword}
                    onFocus={(e) =>
                      setTouched((prev) => ({ ...prev, [e.target.name]: true }))
                    }
                  />
                  {password.confirm === password.password &&
                    validatePassword(password.password).length === 0 && (
                      <IoIosCheckmarkCircle
                        color="4BB543"
                        className="absolute inset-y-0 right-0 h-full w-10 p-2 "
                      />
                    )}
                </div>
              </div>
              <ul className="-mt-2 mb-2 space-y-1">
                {touched.password && password.password.length > 0 && (
                  <PasswordRulesList
                    password={password.password}
                    confirmPassword={password.confirm}
                    confirmPasswordRule
                  />
                )}
              </ul>
            </div>

            <button
              type="submit"
              disabled={
                validatePassword(password.password).length !== 0 || loading
              }
              className={`border-2 bg-white rounded shadow-sm border-primary py-2 w-full px-4 text-lg font-semibold text-primary uppercase tracking-wide cursor-pointer ${
                validatePassword(password.password).length !== 0 || loading
                  ? "opacity-50 cursor-not-allowed"
                  : "text-primary cursor-pointer"
              }`}
            >
              {loading ? "Updating Password..." : "Update Password"}
            </button>
          </form>
        </>
      )}

      {step === "done" && (
        <>
          <p className="text-5xl mb-8  text-primary text-center tracking-wide">
            All set! 🎉
          </p>

          <button
            className="border-2 bg-white rounded shadow-sm border-primary py-2 w-full px-4 text-lg font-semibold text-primary uppercase tracking-wide cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Return to login
          </button>
        </>
      )}
    </div>
  );
}

export default ForgotPasswordForm;
