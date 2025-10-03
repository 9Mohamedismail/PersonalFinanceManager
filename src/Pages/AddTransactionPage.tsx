import { useContext, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionsReceipt from "../components/TransactionsReceipt";
import axios from "axios";
import {
  TransactionsContext,
  type Transactions,
} from "../Context/TransactionsContext";
import { AccountsContext } from "../Context/AccountsContext";
import { useNavigate } from "react-router-dom";

function AddTransactionPage() {
  const [formData, setFormData] = useState<Partial<Transactions>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState(0);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const { setAllTransactions } = useContext(TransactionsContext);
  const { accounts } = useContext(AccountsContext);
  const navigate = useNavigate();

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

      {accounts && accounts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          <TransactionForm
            key={resetKey}
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            loading={loading}
            buttonText="Add Transaction"
            loadingText="Adding Transaction..."
            accounts={accounts}
          />
          <TransactionsReceipt formData={formData} />
        </div>
      ) : (
        <div className="flex min-h-[70vh] justify-center items-center">
          <div className="bg-white rounded-lg shadow-sm border border-primary p-6 w-full max-w-lg text-center">
            <p className="text-lg text-gray-900 mb-4">
              You must create an account before adding transactions.
            </p>
            <button
              type="button"
              className="border-2 bg-white rounded shadow-sm border-primary py-2 px-4 sm:text-lg font-semibold text-primary uppercase tracking-wide cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              Add an account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTransactionPage;
