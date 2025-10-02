import { useState } from "react";
import type { TransactionForm } from "../../Pages/AddTransactionPage";

type AddTransactionFormProps = {
  formData: TransactionForm;
  setFormData: React.Dispatch<React.SetStateAction<TransactionForm>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
};

function AddTransactionForm({
  formData,
  setFormData,
  handleSubmit,
  loading,
}: AddTransactionFormProps) {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    const { name, value } = e.target;
    const newFormData: TransactionForm = { ...formData, [name]: value };
    setFormData(newFormData);
  };
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitted(true);
    handleSubmit(e);
  };

  const descError = !formData.description
    ? "Description is required"
    : !/^[a-zA-Z0-9\s.,'"/()-]+$/.test(formData.description)
    ? "Description contains invalid characters"
    : null;

  return (
    <form
      className="bg-white rounded-lg shadow-sm border border-primary p-6"
      onSubmit={handleSubmitWrapper}
    >
      <div className="w-full flex flex-wrap lg:block">
        <div className="w-1/2 lg:w-full">
          <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
            Amount
          </label>
          <input
            className="appearance-none block w-full bg-white rounded shadow-sm border border-primary py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
            type="number"
            name="amount"
            placeholder="0"
            value={formData.amount ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {(submitted || touched.amount) && !formData.amount && (
            <p className="-mt-2 text-sm text-[#fc100d]">Please add an amount</p>
          )}
        </div>
        <div className="w-1/2 pl-2 lg:w-full lg:pl-0">
          <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
            Date
          </label>
          <input
            className="appearance-none block w-full bg-white rounded shadow-sm border border-primary py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary"
            name="date"
            type="date"
            value={formData.date ?? ""}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {(submitted || touched.date) && !formData.date && (
            <p className="-mt-2 text-sm  text-[#fc100d]">
              Please choose a date
            </p>
          )}
        </div>

        <div className="w-1/2 lg:w-full lg:pl-0">
          <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
            Type
          </label>
          <select
            name="type"
            value={formData.type ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="appearance-none block w-full bg-white rounded shadow-sm border border-primary py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary text-xs sm:text-base"
          >
            <option disabled hidden value="">
              Choose a Transaction Type
            </option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          {(submitted || touched.type) && !formData.type && (
            <p className="-mt-2 text-sm  text-[#fc100d] ">
              Please choose a type
            </p>
          )}
        </div>
        <div className="w-1/2 pl-2 lg:w-full lg:pl-0 ">
          <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
            Account
          </label>
          <select
            name="accountId"
            onChange={handleChange}
            value={formData.accountId ?? ""}
            onBlur={handleBlur}
            className="appearance-none block w-full bg-white rounded shadow-sm border border-primary py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary text-xs sm:text-base"
          >
            <option disabled hidden value="">
              Choose an Account
            </option>
            <option>Chase 5848</option>
          </select>
          {(submitted || touched.accountI) && !formData.accountId && (
            <p className="-mt-2 text-sm text-[#fc100d] ">
              Please choose an account
            </p>
          )}
        </div>
        <div className="w-1/2 lg:w-full lg:pl-0">
          <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
            Category
          </label>
          <select
            name="category"
            onChange={handleChange}
            value={formData.category ?? ""}
            onBlur={handleBlur}
            className="appearance-none block w-full bg-white rounded shadow-sm border border-primary py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary text-xs sm:text-base"
          >
            <option disabled hidden value="">
              Choose a Category Type
            </option>
            <option value="Restaurants">Restaurants</option>
            <option value="Supermarkets">Supermarkets</option>
            <option value="Transportation">Transportation</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Merchandise">Merchandise</option>
          </select>
          {(submitted || touched.category) && !formData.category && (
            <p className="-mt-2 text-sm  text-[#fc100d] ">
              Please choose a category
            </p>
          )}
        </div>

        <div className="w-1/2 pl-2 lg:pl-0">
          <label className="flex items-center text-lg font-bold text-primary uppercase tracking-wide">
            Status:
          </label>

          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 lg:mb-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="pending"
                checked={formData.status === "pending"}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-4 h-4 rounded-full border border-secondary accent-primary 
             focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 cursor-pointer"
              />

              <span className="font-bold text-primary uppercase tracking-wide">
                Pending
              </span>
            </label>

            <label className="flex  items-center gap-2">
              <input
                type="radio"
                name="status"
                value="posted"
                checked={formData.status === "posted"}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-4 h-4 rounded-full border border-secondary accent-primary 
             focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 cursor-pointer"
              />

              <span className=" font-bold text-primary uppercase tracking-wide">
                Posted
              </span>
            </label>
          </div>
          {(submitted || touched.status) && !formData.status && (
            <p className="text-sm text-[#fc100d]">Please choose a status</p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-lg font-bold text-primary uppercase tracking-wide mb-2">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description of Transaction"
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={256}
            className="appearance-none block w-full bg-white rounded shadow-sm border border-primary py-3 px-4 mb-3 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary text-xs sm:text-base"
          />
          <div className="flex flex-row-reverse justify-between">
            <p className="-mt-2 text-sm text-primary ">
              {formData.description?.length ?? 0}/256
            </p>

            {(submitted || touched.description) && descError && (
              <p className="-mt-2 text-sm text-[#fc100d] ">{descError}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-2">
        <button
          type="submit"
          disabled={loading}
          className={`border-2 bg-white rounded shadow-sm border-primary py-2 px-4 sm:text-lg font-semibold text-primary uppercase tracking-wide cursor-pointer ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "text-primary cursor-pointer"
          }`}
        >
          {loading ? "Adding Transaction..." : "Add Transaction"}
        </button>
      </div>
    </form>
  );
}

export default AddTransactionForm;
