import { createContext } from "react";

export type Settings = {
  id: number;
  budgetTotal: number;
};

type SettingsContextType = {
  settings: Settings | null;
  setSettings: React.Dispatch<React.SetStateAction<Settings | null>>;
};

export const SettingsContext = createContext<SettingsContextType>({
  settings: null,
  setSettings: () => {},
});
