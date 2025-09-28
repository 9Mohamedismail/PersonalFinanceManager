function GeneralInfo() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary p-6 lg:flex-1">
      <div className="w-full flex flex-col">
        <div className="">
          <label className="block text-lg text-primary uppercase tracking-wide mb-2">
            Name
          </label>
          <div className="relative w-full">
            <input
              className="appearance-none block w-full bg-white rounded shadow-sm border border-primary  py-3 px-4 mb-3 leading-tight 
                     focus:outline-none focus:bg-white focus:border-primary"
              type="email"
              name="email"
              value={""}
            />
          </div>
        </div>
        <div className="">
          <label className="block text-lg text-primary uppercase tracking-wide mb-2">
            Email
          </label>
          <div className="relative w-full">
            <input
              className="appearance-none block w-full bg-white rounded shadow-sm border border-primary  py-3 px-4 mb-3 leading-tight 
                     focus:outline-none focus:bg-white focus:border-primary"
              type="email"
              name="email"
              value={""}
            />
          </div>
        </div>
        <div className="">
          <label className="block text-lg text-primary uppercase tracking-wide mb-2">
            Username
          </label>
          <div className="relative w-full">
            <input
              className="appearance-none block w-full bg-white rounded shadow-sm border border-primary  py-3 px-4 mb-3 leading-tight 
                     focus:outline-none focus:bg-white focus:border-primary"
              type="text"
              name="username"
              value={""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralInfo;
