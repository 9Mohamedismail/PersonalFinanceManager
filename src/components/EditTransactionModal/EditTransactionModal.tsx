import { useContext, useEffect, useState } from "react";
import axios from "axios";
import EditTransactionsForm from "./EditTransactionsForm";
import {
  TransactionsContext,
  type Transactions,
} from "../../Context/TransactionsContext";
import type { GridRowId } from "@mui/x-data-grid";

function EditTransactionModal({ id }: { id: GridRowId | null }) {
  const { allTransactions, setAllTransactions } =
    useContext(TransactionsContext);

  const [formData, setFormData] = useState<Partial<Transactions>>({});

  useEffect(() => {
    if (id) {
      const found = allTransactions?.find((t) => t.id === id);
      if (found) setFormData(found);
    }
  }, [id, allTransactions]);

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
      const res = await axios.post(
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
    } catch (err: any) {
      const serverMsg = err?.response?.data?.message;
      const fallbackMsg = err?.message || "Transaction edit failed";
      setServerError(serverMsg || fallbackMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 px-4 lg:px-8 flex min-h-screen justify-center items-center ">
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
