import { useState } from "react";
import AddTransactionForm from "../components/AddTransactions/AddTransactionsForm";
import TransactionsReceipt from "../components/AddTransactions/TransactionsReceipt";

type Type = "Income" | "Expense";

type Category =
  | "Restaurants"
  | "Supermarkets"
  | "Transportation"
  | "Gasoline"
  | "Merchandise";

type Transaction = {
  amount: number;
  date: string;
  type: Type;
  account: string;
  category: Category;
  description: string;
  status: "pending" | "posted";
};

export type TransactionForm = Partial<Transaction>;

function AddTransactionPage() {
  const [formData, setFormData] = useState<TransactionForm>({});

  console.log(formData);
  return (
    <div className="py-10 px-4 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <AddTransactionForm formData={formData} setFormData={setFormData} />
        <TransactionsReceipt formData={formData} />
      </div>
    </div>
  );
}

export default AddTransactionPage;
