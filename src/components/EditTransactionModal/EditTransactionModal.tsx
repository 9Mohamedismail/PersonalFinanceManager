import { useState } from "react";
import axios from "axios";
import EditTransactionsForm from "./EditTransactionsForm";

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

function EditTransactionModal() {
  const [formData, setFormData] = useState<TransactionForm>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    console.log(formData);

    const payload = {
      ...formData,
      accountId: String(formData.accountId),
      amount: Number(formData.amount),
      type: formData.type?.toLowerCase(),
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/transaction/add", payload, {
        withCredentials: true,
      });

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
    <div className="flex justify-center py-10 px-4 lg:px-8">
      {serverError && (
        <div className="border bg-secondary-100 rounded shadow-sm border-primary py-4 mb-4 2xl:w-1/2 ">
          <p className="text-base text-primary mx-4 font-semibold">
            {serverError}
          </p>
        </div>
      )}

      <EditTransactionsForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default EditTransactionModal;
