import { createContext } from "react";

export type TransactionType = "expense" | "income";
export type TransactionStatus = "pending" | "posted";
export type TransactionCategory =
  | "Restaurants"
  | "Supermarkets"
  | "Transportation"
  | "Gasoline"
  | "Merchandise";

export type Transactions = {
  id: number;
  userId: number;
  accountId: number;
  date: string;
  description: string;
  amount: string;
  type: TransactionType;
  status: TransactionStatus;
  category: TransactionCategory;
  createdAt: string;
  updatedAt: string;
};

type TransactionsContextType = {
  allTransactions: Transactions[] | null;
  weeklyTransactions: Transactions[] | null;
  monthlyTransactions: Transactions[] | null;
  setAllTransactions: React.Dispatch<
    React.SetStateAction<Transactions[] | null>
  >;
  setWeeklyTransactions: React.Dispatch<
    React.SetStateAction<Transactions[] | null>
  >;
  setMonthlyTransactions: React.Dispatch<
    React.SetStateAction<Transactions[] | null>
  >;
};

export const TransactionsContext = createContext<TransactionsContextType>({
  allTransactions: null,
  weeklyTransactions: null,
  monthlyTransactions: null,
  setAllTransactions: () => {},
  setWeeklyTransactions: () => {},
  setMonthlyTransactions: () => {},
});
