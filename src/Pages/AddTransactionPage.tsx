import TransactionsReceipt from "../components/TransactionsReceipt";

function AddTransactionPage() {
  return (
    <div className="py-10 px-4 lg:px-8">
      <div className="grid grid-cols-2 gap-4 items-start">
        <form className="bg-secondary-100 border rounded p-6">
          <div className="">
            <div className="w-full mb-6 md:mb-0">
              <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
                Amount
              </label>
              <input
                className="appearance-none block w-full bg-secondary-100 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-secondary "
                type="text"
                placeholder="Jane"
              />
            </div>
            <div className="w-full">
              <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
                Date
              </label>
              <input
                className="appearance-none block w-full bg-secondary-100 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-secondary "
                type="text"
                placeholder="Jane"
              />
            </div>
            <div className="w-full md:mb-0">
              <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
                Type
              </label>
              <select className="appearance-none block w-full bg-secondary-100 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-secondary ">
                <option>Debit</option>
                <option>Credit</option>
                <option>Transfer</option>
                <option>Fee</option>
                <option>Refund</option>
              </select>
            </div>
            <div className="w-full">
              <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
                Account
              </label>
              <select className="appearance-none block w-full bg-secondary-100 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-secondary ">
                <option>Debit</option>
                <option>Credit</option>
                <option>Transfer</option>
                <option>Fee</option>
                <option>Refund</option>
              </select>
            </div>
            <div className="w-full md:mb-0">
              <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
                Category
              </label>
              <input
                className="appearance-none block w-full bg-secondary-100 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-secondary "
                type="text"
                placeholder="Jane"
              />
            </div>
            <div className="w-full">
              <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
                Description
              </label>
              <input
                className="appearance-none block w-full bg-secondary-100 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-secondary "
                type="text"
                placeholder="Jane"
              />
            </div>
          </div>

          <div className="flex gap-6 items-center">
            <label className="flex items-center text-lg font-bold text-primary uppercase tracking-wide">
              Status:
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="pending"
                className="w-4 h-4 appearance-none bg-secondary-100 border rounded-full focus:outline-none focus:bg-secondary"
              />
              <span className="text-lg font-bold text-primary uppercase tracking-wide">
                Pending
              </span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="posted"
                className="w-4 h-4 appearance-none bg-secondary-100 border rounded-full focus:bg-secondary"
              />
              <span className="text-lg font-bold text-primary uppercase tracking-wide">
                Posted
              </span>
            </label>
          </div>

          <div className="mt-2">
            <button className=" border-2 border-primary rounded py-2 px-4 text-lg font-bold text-primary uppercase tracking-wide">
              Add Transaction
            </button>
          </div>
        </form>
        <TransactionsReceipt />
      </div>
    </div>
  );
}

export default AddTransactionPage;
