import { useContext, useState } from "react";
import AddTransactionForm from "../components/AddTransactions/AddTransactionsForm";
import TransactionsReceipt from "../components/AddTransactions/TransactionsReceipt";
import axios from "axios";
import { TransactionsContext } from "../Context/TransactionsContext";

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

function AddTransactionPage() {
  const [formData, setFormData] = useState<TransactionForm>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState(0);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const { setAllTransactions } = useContext(TransactionsContext);

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
      const res = await axios.post(
        "http://localhost:3000/api/transaction/add",
        payload,
        {
          withCredentials: true,
        }
      );

      const newTransaction = res.data.transaction;

      setAllTransactions((prev) => [...(prev ?? []), newTransaction]);
      setFormData({});
      console.log("Transaction added successfully!");
    } catch (err: any) {
      const serverMsg = err?.response?.data?.message;
      const fallbackMsg = err?.message || "Transaction add failed";
      setServerMessage(serverMsg || fallbackMsg);
    } finally {
      setLoading(false);
      setResetKey((prev) => prev + 1);
    }
  };

  return (
    <div className="py-10 px-4 lg:px-8">
      {serverMessage && (
        <div className="border bg-secondary-100 rounded shadow-sm border-primary py-4 mb-4 2xl:w-1/2 ">
          <p className="text-base text-primary mx-4 font-semibold">
            {serverMessage}
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <AddTransactionForm
          key={resetKey}
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
