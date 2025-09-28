function Accounts() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary p-6 lg:flex-1">
      <div className="">
        <label className="block text-lg text-primary uppercase tracking-wide mb-2">
          Accounts
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
    </div>
  );
}

export default Accounts;
