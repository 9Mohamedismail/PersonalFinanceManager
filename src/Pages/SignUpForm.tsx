import { FcMoneyTransfer } from "react-icons/fc";

function SignUpForm() {
  return (
    <div className="py-10 px-4 lg:px-8">
      <div className="h-full flex flex-col max-w-sm sm:max-w-md md:max-w-xl mx-auto">
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
              href="login"
              className="cursor-pointer font-bold text-secondary ml-1"
            >
              Log in.
            </a>
          </span>
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
            <div className="    ">
              <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
                Username
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
          <button className="border-2 border-primary rounded py-2 w-full md:w-1/2 px-4 text-lg font-bold text-primary uppercase tracking-wide">
            Sign up
          </button>
        </form>

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

export default SignUpForm;
