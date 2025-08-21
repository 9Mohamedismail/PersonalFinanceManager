import { useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import type { InsertUser } from "../db/schema";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [newUser, setNewUser] = useState<InsertUser>({
    userName: "",
    email: "",
  });

  const navigate = useNavigate();

  return (
    <div className="py-10 px-4 lg:px-8">
      <div className="h-full flex flex-col max-w-sm sm:max-w-md mx-auto">
        <div className="flex justify-center ">
          <FcMoneyTransfer className="w-16 h-16 md:w-24 md:h-24" />
        </div>
        <p className="text-4xl md:text-5xl text-center mb-4 font-bold text-primary tracking-wide">
          Log in to NAME
        </p>
        <p className="text-lg text-gray-900 text-center">
          Need a NAME account?
          <a
            onClick={() => navigate("/signup")}
            className="cursor-pointer font-bold text-secondary ml-1"
          >
            Create an account.
          </a>
        </p>

        <form className="mt-4" onClick={handleSubmit}>
          <div className="w-full flex flex-col">
            <div className="">
              <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
                Username or Email
              </label>
              <input
                className="appearance-none block w-full bg-background border border-secondary rounded py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
                type="text"
              />
            </div>

            <div className="">
              <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
                Password
              </label>
              <input
                className="appearance-none block w-full bg-background border border-secondary rounded py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
                type="text"
              />
            </div>
          </div>
          <button className="border-2 border-primary rounded py-2 w-full px-4 text-lg font-bold text-primary uppercase tracking-wide">
            Log in
          </button>
        </form>

        <div className="flex flex-row gap-2 mt-2">
          <button
            className="border-2 border-primary rounded py-1 w-full px-2 text-base font-semibold text-primary  tracking-wide"
            onClick={() => navigate("/login/forgot-username")}
          >
            Forgot Username?
          </button>
          <button
            className="border-2 border-primary rounded py-1 w-full px-2 text-base font-semibold text-primary tracking-wide"
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
          <button className="border-2 border-primary rounded  py-2 px-4 text-lg font-bold text-primary uppercase tracking-wide">
            Google
          </button>
          <button className="border-2 border-primary rounded  py-2 px-4 text-lg font-bold text-primary uppercase tracking-wide">
            Github
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
