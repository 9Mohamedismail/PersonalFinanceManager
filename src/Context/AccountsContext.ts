import { createContext } from "react";

export type AccountType = "Checking" | "Saving" | "Cash" | undefined;

export type Accounts = {
  accountName: string;
  accountType: AccountType;
};

type AccountsContextType = {
  accounts: Accounts[] | null;
  setAccounts: React.Dispatch<React.SetStateAction<Accounts[] | null>>;
};

export const AccountsContext = createContext<AccountsContextType>({
  accounts: null,
  setAccounts: () => {},
});
