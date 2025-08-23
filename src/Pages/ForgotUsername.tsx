import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Result = {
  message: string;
  success: boolean;
};

function ForgotUsernameForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [result, setResult] = useState<Result>({
    message: "",
    success: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return;

    try {
      await axios
        .post("http://localhost:3000/api/user/by-email", {
          email: email,
        })
        .then((res) => {
          setResult({
            message: res.data.username,
            success: true,
          });
        });
    } catch (err: any) {
      const serverMsg = err?.response?.data?.message;
      const fallbackMsg = err?.message || "User Retrieval failed";
      setResult({
        message: serverMsg || fallbackMsg,
        success: false,
      });
    }
  };

  return (
    <div className="py-10 px-4 lg:px-8">
      <div className="h-full flex flex-col max-w-sm sm:max-w-md mx-auto">
        {result.success ? (
          <>
            <p className="text-5xl mb-4 font-bold text-primary tracking-wide">
              User Retrieved
            </p>

            <p className="text-2xl text-gray-900">
              Your username is {result.message}. You can now go ahead and use it
              to
              <span className="">
                <a
                  onClick={() => navigate("/login")}
                  className="cursor-pointer font-bold text-secondary ml-1"
                >
                  log in.
                </a>
              </span>
            </p>
          </>
        ) : (
          <>
            {!result.success && result.message && (
              <div className="border roundeds bg-secondary-100 py-4 mb-4">
                <p className="text-base text-primary mx-4 font-bold">
                  {result.message}
                </p>
              </div>
            )}
            <p className="text-3xl sm:text-4xl lg:text-5xl mb-4 font-bold text-primary tracking-wide">
              Recover your username
            </p>
            <p className="text-base md:text-lg text-gray-900">
              You can recover your username using the email address associated
              with your account.
            </p>

            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="w-full flex flex-col">
                <div className="">
                  <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full bg-background border border-secondary rounded py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
                    type="email"
                    name="email"
                    value={email ?? ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-2">
                <button className="border-2 border-primary rounded py-2 w-full px-4 lg:px-2 text-lg font-bold text-primary uppercase tracking-wide">
                  Recover username
                </button>
                <button
                  className="border-primary rounded w-full px-4 underline text-center lg:text-left text-base cursor-pointer font-bold text-secondary tracking-wide"
                  onClick={() => navigate("/login")}
                >
                  Return to login
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotUsernameForm;
