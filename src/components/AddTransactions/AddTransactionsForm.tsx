import type { TransactionForm } from "../../Pages/AddTransactionPage";

type AddTransactionFormProps = {
  formData: TransactionForm;
  setFormData: React.Dispatch<React.SetStateAction<TransactionForm>>;
};

function AddTransactionForm({
  formData,
  setFormData,
}: AddTransactionFormProps) {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    const newFormData: TransactionForm = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  return (
    <form
      className="bg-secondary-100 border rounded p-6"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex flex-wrap lg:block">
        <div className="w-1/2 lg:w-full">
          <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
            Amount
          </label>
          <input
            className="appearance-none block w-full bg-background border border-secondary rounded py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
            type="number"
            name="amount"
            placeholder="0"
            value={formData.amount || ""}
            onChange={handleChange}
          />
        </div>
        <div className="w-1/2 pl-2 lg:w-full lg:pl-0">
          <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
            Date
          </label>
          <input
            className="appearance-none block w-full bg-background border border-secondary rounded py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
            name="date"
            type="date"
            value={formData.date || new Date().toISOString().split("T")[0]}
            onChange={handleChange}
          />
        </div>
        <div className="w-1/2 lg:w-full lg:pl-0">
          <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
            Type
          </label>
          <select
            name="type"
            onChange={handleChange}
            className="appearance-none block w-full bg-background border border-secondary rounded py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
          >
            <option disabled selected hidden value="">
              Account Type
            </option>
            <option value="Debit">Debit</option>
            <option value="Credit">Credit</option>
            <option value="Transfer">Transfer</option>
            <option value="Fee">Fee</option>
            <option value="Refund">Refund</option>
          </select>
        </div>
        <div className="w-1/2 pl-2 lg:w-full lg:pl-0 ">
          <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
            Account
          </label>
          <select
            name="account"
            onChange={handleChange}
            className="appearance-none block w-full bg-background border border-secondary rounded py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
          >
            <option disabled selected hidden value="">
              Choose an Account
            </option>
            <option>Chase 5848</option>
          </select>
        </div>
        <div className="w-1/2 lg:w-full lg:pl-0">
          <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
            Category
          </label>
          <select
            name="category"
            onChange={handleChange}
            className="appearance-none block w-full bg-background border border-secondary rounded py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
          >
            <option disabled selected hidden value="">
              Category Type
            </option>
            <option value="Restaurants">Restaurants</option>
            <option value="Supermarkets">Supermarkets</option>
            <option value="Transportation">Transportation</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Merchandise">Merchandise</option>
          </select>
        </div>

        <div className="w-1/2 pl-2 lg:pl-0 flex flex-col lg:flex-row lg:items-center lg:gap-4 lg:mb-3">
          <label className="flex items-center text-lg font-bold text-primary uppercase tracking-wide">
            Status:
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="pending"
              checked={formData.status === "pending"}
              onChange={handleChange}
              className="w-4 h-4 rounded-full border border-secondary accent-primary 
             focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 cursor-pointer"
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
              checked={formData.status === "posted"}
              onChange={handleChange}
              className="w-4 h-4 rounded-full border border-secondary accent-primary 
             focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 cursor-pointer"
            />

            <span className="text-lg font-bold text-primary uppercase tracking-wide">
              Posted
            </span>
          </label>
        </div>

        <div className="w-full">
          <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
            Description
          </label>
          <input
            name="description"
            type="text"
            placeholder="Description of Transaction"
            onChange={handleChange}
            className="appearance-none block w-full bg-background border border-secondary rounded py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
          />
        </div>
        <div className="w-full">
          <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
            Note:
          </label>
          <input
            name="note"
            type="text"
            placeholder="Transaction Note"
            onChange={handleChange}
            className="appearance-none block w-full bg-background border border-secondary rounded py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
          />
        </div>
      </div>

      <div className="mt-2">
        <button
          type="submit"
          className=" border-2 border-primary rounded py-2 px-4 text-lg font-bold text-primary uppercase tracking-wide"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}

export default AddTransactionForm;
