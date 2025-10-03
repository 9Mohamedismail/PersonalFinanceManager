import { useContext, useEffect, useState } from "react";
import axios from "axios";
import TransactionForm from "./TransactionForm";
import {
  TransactionsContext,
  type Transactions,
} from "../Context/TransactionsContext";
import type { GridRowId } from "@mui/x-data-grid";
import { AccountsContext } from "../Context/AccountsContext";

function EditTransactionModal({
  id,
  handleClose,
}: {
  id: GridRowId | null;
  handleClose: () => void;
}) {
  const { allTransactions, setAllTransactions } =
    useContext(TransactionsContext);

  const [formData, setFormData] = useState<Partial<Transactions>>({});
  const { accounts } = useContext(AccountsContext);

  useEffect(() => {
    if (id) {
      const found = allTransactions?.find((t) => t.id === id);
      if (found) setFormData(found);
    }
  }, [id, allTransactions]);

  const [loading, setLoading] = useState<boolean>(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

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
      const res = await axios.put(
        `http://localhost:3000/api/transaction/update/${id}`,
        payload,
        { withCredentials: true }
      );

      const updatedTransaction: Transactions = res.data.transaction;

      setAllTransactions((prev) =>
        prev
          ? prev.map((t) =>
              t.id === updatedTransaction.id ? updatedTransaction : t
            )
          : [updatedTransaction]
      );

      console.log("Transaction edited successfully!");
      handleClose();
    } catch (err: any) {
      const serverMsg = err?.response?.data?.message;
      const fallbackMsg = err?.message || "Transaction edit failed";
      setServerMessage(serverMsg || fallbackMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {serverMessage && (
        <div className="border bg-secondary-100 rounded shadow-sm border-primary py-4 mb-4 2xl:w-1/2">
          <p className="text-base text-primary mx-4 font-semibold">
            {serverMessage}
          </p>
        </div>
      )}

      <TransactionForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        loading={loading}
        buttonText="Update Transaction"
        loadingText="Updating Transaction..."
        accounts={accounts ?? []}
      />
    </div>
  );
}

export default EditTransactionModal;
