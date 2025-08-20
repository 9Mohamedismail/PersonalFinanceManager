import { FcMoneyTransfer } from "react-icons/fc";

function ForgotPasswordForm() {
  return (
    <div className="py-10 px-4 lg:px-8">
      <div className="h-full flex flex-col max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <p className="text-4xl md:text-5xl mb-4 font-bold text-primary tracking-wide">
          Reset your password
        </p>
        <p className="text-base md:text-lg text-gray-900">
          No worries, we'll help you get back to your account. Verify your
          account email address and username to continue.
        </p>

        <form className="mt-4">
          <div className="w-full flex flex-col">
            <div className="">
              <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
                Email
              </label>
              <input
                className="appearance-none block w-full bg-background border border-secondary rounded py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
                type="text"
              />
            </div>
            <div className="">
              <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
                Username
              </label>
              <input
                className="appearance-none block w-full bg-background border border-secondary rounded py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-2">
            <button className="border-2 border-primary rounded py-2 w-full px-4 text-lg font-bold text-primary uppercase tracking-wide">
              Reset Password
            </button>
            <button className="border-primary rounded w-full px-4 underline text-center lg:text-left text-base cursor-pointer font-bold text-secondary tracking-wide">
              Return to login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
