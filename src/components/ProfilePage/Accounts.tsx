function Accounts() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary p-6 flex-1 h-full">
      <h2 className="block text-2xl text-primary uppercase tracking-wide mb-2">
        ACCOUNTS
      </h2>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            className="appearance-none block w-full bg-white rounded shadow-sm border border-primary  py-2 px-2 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
            type="text"
            name="username"
            readOnly
          />

          <button
            className="border-2 bg-white rounded-md shadow-sm border-orange-500 px-3 text-base font-semibold text-orange-500 uppercase tracking-wide cursor-pointer"
            onClick={() => handleOpen(params.row.id)}
          >
            Edit
          </button>
          <button
            className="border-2 bg-white rounded-md shadow-sm border-red-500 px-3 text-base font-semibold text-red-500 uppercase tracking-wide cursor-pointer"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
