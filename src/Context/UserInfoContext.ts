import { createContext } from "react";

export type User = {
  id: number;
  username: string;
  email: string;
};

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type UserInfoContextType = {
  user: User | null;
  authStatus: AuthStatus;
  setAuthStatus: React.Dispatch<React.SetStateAction<AuthStatus>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserInfoContext = createContext<UserInfoContextType>({
  user: null,
  authStatus: "loading",
  setAuthStatus: () => {},
  setUser: () => {},
});
