import { createContext } from "react";

export type AccountType = "Checking" | "Saving" | "Cash" | undefined;

export type Accounts = {
  id: number;
  accountName: string;
  accountType: AccountType;
  transactionCount: number;
};

type AccountsContextType = {
  accounts: Accounts[] | null;
  setAccounts: React.Dispatch<React.SetStateAction<Accounts[] | null>>;
};

export const AccountsContext = createContext<AccountsContextType>({
  accounts: null,
  setAccounts: () => {},
});
