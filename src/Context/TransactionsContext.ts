import { createContext } from "react";

export type TransactionType = "expense" | "income";

export type Transactions = {
  id: number;
  userId: number;
  accountId: number;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  createdAt: string;
  updatedAt: string;
};

type TransactionsContextType = {
  transactions: Transactions | null;
  setTransactions: React.Dispatch<React.SetStateAction<Transactions | null>>;
};

export const TransactionsContext = createContext<TransactionsContextType>({
  transactions: null,
  setTransactions: () => {},
});
