import { createContext } from "react";

type User = {
  id: number;
  username: string;
  email: string;
};

type UserInfoContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserInfoContext = createContext<UserInfoContextType>({
  user: null,
  setUser: () => {},
});
