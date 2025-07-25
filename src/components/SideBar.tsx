import { useContext, createContext, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

const SidebarContext = createContext<boolean>(true);

function SideBar() {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <SidebarContext.Provider value={expanded}>
      <div
        className={`transition-all duration-300 ${
          expanded ? "lg:items-start items-center" : "items-center"
        }
        flex flex-col bg-secondary border  border-secondary text-primary gap-y-4 py-6`}
      >
        {/* Header */}
        <div className="flex flex-row items-center px-4">
          <img className="w-8 h-8" src="https://placehold.co/16x16" />
          {expanded && (
            <div
              className={`transition-all text-md tracking-wide font-bold hidden lg:block ml-4 `}
            >
              <p> Acme Finance </p>
              <p> Customer Portal </p>
            </div>
          )}
        </div>

        <div className="w-full border-t border-secondary-100/70" />

        {/* Overview */}

        <div className="flex flex-col gap-y-2 px-4">
          {expanded && (
            <p
              className={`transition-all text-md uppercase tracking-wide font-bold hidden lg:block`}
            >
              Overview
            </p>
          )}
          <ui>
            <SideBarItem icon={<MdSpaceDashboard />}> Dashboard </SideBarItem>
            <SideBarItem icon={<MdSpaceDashboard />}> Deals </SideBarItem>
            <SideBarItem icon={<MdSpaceDashboard />}> Orders </SideBarItem>
            <SideBarItem icon={<MdSpaceDashboard />}> Invoices </SideBarItem>
            <SideBarItem icon={<FaMoneyBillTransfer />}>
              Transactions
            </SideBarItem>
            <SideBarItem icon={<IoSettings />}> Settings </SideBarItem>
          </ui>
        </div>

        <div className="w-full border-t border-secondary-100/70" />

        {/* Account Management */}
        <div className="flex flex-col gap-y-4 px-4 ">
          {expanded && (
            <p
              className={`transition-all text-md uppercase tracking-wide font-bold hidden lg:block`}
            >
              Account Management
            </p>
          )}
          <ui>
            <SideBarItem icon={<MdSpaceDashboard />}>
              Make a payment
            </SideBarItem>
            <SideBarItem icon={<MdSpaceDashboard />}>
              Place an order
            </SideBarItem>
          </ui>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

const SideBarItem = ({
  children,
  icon,
}: {
  children: string;
  icon: React.ReactNode;
}) => {
  const expanded = useContext(SidebarContext);

  return (
    <li className="relative flex items-center py-2 my-1 text-xl font-medium">
      {icon}
      <span
        className={`transition-all ml-4 ${
          expanded ? "lg:inline hidden " : "hidden"
        }`}
      >
        {children}
      </span>
    </li>
  );
};

export default SideBar;
