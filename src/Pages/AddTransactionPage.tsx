import { useState } from "react";
import AddTransactionForm from "../components/AddTransactions/AddTransactionsForm";
import TransactionsReceipt from "../components/AddTransactions/TransactionsReceipt";
import axios from "axios";

type Type = "Income" | "Expense";

type Category =
  | "Restaurants"
  | "Supermarkets"
  | "Transportation"
  | "Gasoline"
  | "Merchandise";

type Transaction = {
  accountId: string;
  date: string;
  description: string;
  amount: number;
  type: Type;
  category: Category;
  status: "pending" | "posted";
};

export type TransactionForm = Partial<Transaction>;

// MAKE SURE DESCRIPTION IS VALIDATED
function AddTransactionPage() {
  const [formData, setFormData] = useState<TransactionForm>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (
      !formData.accountId ||
      !formData.date ||
      !formData.description ||
      !formData.amount ||
      !formData.type ||
      !formData.category ||
      !formData.status
    ) {
      return;
    }

    const payload = {
      ...formData,
      accountId: String(formData.accountId),
      amount: Number(formData.amount),
      type: formData.type?.toLowerCase(),
    };

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/transaction/add",
        payload,
        { withCredentials: true }
      );

      console.log("Transaction added successfully!");
    } catch (err: any) {
      const serverMsg = err?.response?.data?.message;
      const fallbackMsg = err?.message || "Login failed";
      setServerError(serverMsg || fallbackMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 px-4 lg:px-8">
      {serverError && (
        <div className="border bg-secondary-100 rounded shadow-sm border-primary py-4 mb-4 2xl:w-1/2 ">
          <p className="text-base text-primary mx-4 font-semibold">
            {serverError}
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <AddTransactionForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <TransactionsReceipt formData={formData} />
      </div>
    </div>
  );
}

export default AddTransactionPage;
