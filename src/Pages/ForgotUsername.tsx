function ForgotUsernameForm() {
  return (
    <div className="py-10 px-4 lg:px-8">
      <div className="h-full flex flex-col max-w-sm sm:max-w-md mx-auto">
        <p className="text-3xl sm:text-4xl lg:text-5xl mb-4 font-bold text-primary tracking-wide">
          Recover your username
        </p>
        <p className="text-base md:text-lg text-gray-900">
          You can recover your username using the email address associated with
          your account.
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
          </div>

          <div className="flex flex-col lg:flex-row gap-2">
            <button className="border-2 border-primary rounded py-2 w-full px-4 lg:px-2 text-lg font-bold text-primary uppercase tracking-wide">
              Recover username
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

export default ForgotUsernameForm;
