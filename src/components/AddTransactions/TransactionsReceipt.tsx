import Barcode from "react-barcode";
import type { TransactionForm } from "../../Pages/AddTransactionPage";

type TransactionsReceiptProps = {
  formData: TransactionForm;
};

function TransactionsReceipt({ formData }: TransactionsReceiptProps) {
  return (
    <div className="bg-gray-50 border w-full font-receipt 2xl:w-[70%] p-4">
      <div className="flex flex-col justify-center items-center">
        <p className="text-4xl font-bold text-gray-900 uppercase tracking-wide ">
          Receipt
        </p>
        <p className="text-lg text-gray-900">Berqhotel Grosse Scheidegg</p>
        <p className="text-lg text-gray-900">
          3818 Grindeiwald Fanile R. Mullier
        </p>
      </div>

      <div className="flex justify-between p-4 text-base text-gray-900">
        <div className="text-start">
          <p> Receipt Number 4572</p>
          <p>Alan</p>
        </div>
        <div className="text-end">
          <p>{formData.date || "Transaction Date"}</p>
          <p> {formData.status || "Transaction Status"}</p>
        </div>
      </div>

      <div className="flex justify-between p-4 mx-2 text-lg text-gray-900 break-words ">
        <p className="max-w-[70%] break-words">
          {formData.description != null
            ? `${formData.description}:`
            : "Transaction Description:"}
        </p>
        <p className="max-w-[30%] text-right">
          {formData.amount != null ? `$${formData.amount}` : "Amount"}
        </p>
      </div>

      <div className="flex flex-col p-4 text-lg text-gray-900">
        <div className="flex flex-row gap-4">
          <p>Account:</p>
          <p> {formData.account || "Account Name"}</p>
        </div>

        <div className="flex flex-row gap-4">
          <p>Transaction Type:</p>
          <p>{formData.type || "Account Type"}</p>
        </div>
      </div>

      <div className="flex justify-center text-lg text-gray-900">
        <p className="break-words w-full text-center p-4">
          {formData.note || "Transaction Note"}
        </p>
      </div>
      <div className="flex justify-center">
        <Barcode value="http://localhost:5173/" displayValue={false} />
      </div>
    </div>
  );
}

export default TransactionsReceipt;
