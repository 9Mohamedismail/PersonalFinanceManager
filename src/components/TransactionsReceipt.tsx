import Barcode from "react-barcode";
import { useContext } from "react";
import { UserInfoContext } from "../Context/UserInfoContext";
import {
  type Transactions,
  TransactionsContext,
} from "../Context/TransactionsContext";

type TransactionsReceiptProps<T> = {
  formData: T;
};

function TransactionsReceipt<T extends Partial<Transactions>>({
  formData,
}: TransactionsReceiptProps<T>) {
  const { user } = useContext(UserInfoContext);
  const { allTransactions } = useContext(TransactionsContext);

  return (
    <div className="bg-gray-50 border w-full font-receipt 2xl:w-[70%] p-4">
      <div className="flex flex-col justify-center items-center">
        <p className="text-4xl font-bold text-gray-900 uppercase tracking-wide ">
          Receipt
        </p>
        <p className="text-lg text-gray-900">[Personal Finance Manager]</p>
        <p className="text-lg text-gray-900">Expense Receipt</p>
      </div>

      <div className="flex justify-between p-4 text-base text-gray-900">
        <div className="text-start">
          <p> Receipt Number {allTransactions ? allTransactions.length : 0}</p>
          <p>{user ? user.username : ""}</p>
        </div>
        <div className="text-end">
          <p>{formData.date || "Transaction Date"}</p>
          <p> {formData.status || "Transaction Status:"}</p>
        </div>
      </div>

      <div className="flex justify-between p-4 mx-2 text-lg text-gray-900 break-words ">
        <p className="max-w-[70%] break-words">
          {formData.category != null
            ? `${formData.category}:`
            : "Transaction Category:"}
        </p>
        <p className="max-w-[30%] text-right">
          {formData.amount != null ? `$${formData.amount}` : "Amount"}
        </p>
      </div>

      <div className="flex flex-col p-4 text-lg text-gray-900">
        <div className="flex flex-row gap-4">
          <p>Account:</p>
          <p> {formData.accountId || "Account Name"}</p>
        </div>

        <div className="flex flex-row gap-4">
          <p>Transaction Type:</p>
          <p>{formData.type || "Account Type"}</p>
        </div>
      </div>

      <div className="flex justify-center text-lg text-gray-900">
        <p className="break-words w-full text-center p-4">
          {formData.description || "Transaction Description"}
        </p>
      </div>
      <div className="flex justify-center">
        <Barcode value="http://localhost:5173/" displayValue={false} />
      </div>
    </div>
  );
}

export default TransactionsReceipt;
