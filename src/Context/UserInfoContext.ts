import { createContext } from "react";

export type User = {
  id: number;
  username: string;
  email: string;
};

type UserInfoContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserInfoContext = createContext<UserInfoContextType>({
  user: {
    id: 0,
    username: "",
    email: "",
  },
  setUser: () => {},
});
