import { createContext } from "react";

type SidebarContextType = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType>({
  expanded: true,
  setExpanded: () => {},
});

export default SidebarContext;
