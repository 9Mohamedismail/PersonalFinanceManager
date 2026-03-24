import { useContext, useEffect, useState } from "react";
import axios from "axios";
import TransactionForm from "./TransactionForm";
import {
  TransactionsContext,
  type Transactions,
} from "../Context/TransactionsContext";
import type { GridRowId } from "@mui/x-data-grid";
import { AccountsContext } from "../Context/AccountsContext";

function ViewDetailsModal({
  id,
  handleClose,
}: {
  id: GridRowId | null;
  handleClose: () => void;
}) {
  const { allTransactions } = useContext(TransactionsContext);

  const [transactionData, setTransactionData] = useState<Partial<Transactions>>(
    {},
  );

  const { accounts } = useContext(AccountsContext);

  useEffect(() => {
    if (id) {
      const found = allTransactions?.find((t) => t.id === id);
      if (found) setTransactionData(found);
    }
  }, [id, allTransactions]);

  const findAccountById = (id) => {
    const found = accounts?.find((value) => value.id === id);
    return found?.accountName;
  };

  return (
    <div className="flex flex-col">
      <button
        className="ml-auto border-2 bg-white rounded-md shadow-sm border-red-500 px-3 text-base font-semibold text-red-500 uppercase tracking-wide cursor-pointer"
        onClick={handleClose}
      >
        Close
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-primary p-6 grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <span className="block text-lg text-primary uppercase tracking-wide font-bold">
              Transaction Amount
            </span>
            <p className="text-xl xl:text-lg text-gray-900 font-normal uppercase">
              ${transactionData.amount ?? "-"}
            </p>
          </div>

          <div>
            <span className="block text-xl xl:text-lg text-primary uppercase tracking-wide font-bold">
              Description
            </span>
            <p className="text-base xl:text-lg text-gray-900 font-normal normal-case">
              {transactionData.description ?? "-"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <span className="block text-xl xl:text-lg text-primary uppercase tracking-wide font-bold">
              Type
            </span>
            <p className="text-lg text-gray-900 font-normal uppercase">
              {transactionData.type ?? "-"}
            </p>
          </div>

          <div>
            <span className="block text-xl xl:text-lg text-primary uppercase tracking-wide font-bold">
              Status
            </span>
            <p className="text-lg text-gray-900 font-normal uppercase">
              {transactionData.status ?? "-"}
            </p>
          </div>

          <div>
            <span className="block text-xl xl:text-lg text-primary uppercase tracking-wide font-bold">
              Category
            </span>
            <p className="text-lg text-gray-900 font-normal uppercase">
              {transactionData.category ?? "-"}
            </p>
          </div>

          <div>
            <span className="block text-xl xl:text-lg text-primary uppercase tracking-wide font-bold uppercase">
              Account
            </span>
            <p className="text-lg text-gray-900 font-normal uppercase">
              {findAccountById(transactionData.accountId) ?? "-"}
            </p>
          </div>

          <div>
            <span className="block text-xl xl:text-lg text-primary uppercase tracking-wide font-bold">
              Date
            </span>
            <p className="text-lg text-gray-900 font-normal">
              {transactionData.date
                ? new Date(transactionData.date).toLocaleDateString("en-US")
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailsModal;
