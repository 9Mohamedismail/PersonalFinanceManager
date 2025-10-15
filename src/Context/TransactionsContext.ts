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
  currentWeekTransactions: Transactions[] | null;
  currentMonthTransactions: Transactions[] | null;
  setAllTransactions: React.Dispatch<
    React.SetStateAction<Transactions[] | null>
  >;
  setCurrentWeekTransactions: React.Dispatch<
    React.SetStateAction<Transactions[] | null>
  >;
  setCurrentMonthTransactions: React.Dispatch<
    React.SetStateAction<Transactions[] | null>
  >;
};

export const TransactionsContext = createContext<TransactionsContextType>({
  allTransactions: null,
  currentWeekTransactions: null,
  currentMonthTransactions: null,
  setAllTransactions: () => {},
  setCurrentWeekTransactions: () => {},
  setCurrentMonthTransactions: () => {},
});
