import { useContext, createContext, useState } from "react";
import { RiCoupon2Line, RiShoppingCart2Line } from "react-icons/ri";
import { MdOutlinePayments, MdAddShoppingCart } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TbReportMoney } from "react-icons/tb";
const SidebarContext = createContext<boolean>(true);

function SideBar() {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <SidebarContext.Provider value={expanded}>
      <div
        className={`transition-all duration-300 ${
          expanded ? "lg:items-start items-center" : "items-center"
        }
        flex flex-col bg-primary border  border-primary text-text gap-y-6 py-8`}
      >
        {/* Header */}
        <div className="flex flex-row items-center px-4">
          <img className="w-8 h-8" src="https://placehold.co/16x16" />
          {expanded && (
            <div
              className={`transition-all text-base tracking-wide font-bold hidden lg:block ml-4 `}
            >
              <p> Acme Finance </p>
              <p> Customer Portal </p>
            </div>
          )}
        </div>

        <div className="w-full border-t border-secondary-100" />

        {/* Overview */}

        <div className="flex flex-col gap-y-2 px-4">
          {expanded && (
            <p
              className={`transition-all text-base uppercase tracking-wide font-bold hidden lg:block`}
            >
              Overview
            </p>
          )}
          <ul>
            <SideBarItem icon={<AiOutlineDashboard size={32} />}>
              Dashboard
            </SideBarItem>
            <SideBarItem icon={<RiCoupon2Line size={32} />}>Deals</SideBarItem>
            <SideBarItem icon={<RiShoppingCart2Line size={32} />}>
              Orders
            </SideBarItem>
            <SideBarItem icon={<LiaFileInvoiceDollarSolid size={32} />}>
              Invoices
            </SideBarItem>
            <SideBarItem icon={<TbReportMoney size={32} />}>
              Transactions
            </SideBarItem>
            <SideBarItem icon={<IoSettingsOutline size={32} />}>
              Settings
            </SideBarItem>
          </ul>
        </div>

        <div className="w-full border-t border-secondary-100" />

        {/* Account Management */}
        <div className="flex flex-col gap-y-4 px-4 ">
          {expanded && (
            <p
              className={`transition-all text-base uppercase tracking-wide font-bold hidden lg:block`}
            >
              Account Management
            </p>
          )}
          <ul>
            <SideBarItem icon={<MdOutlinePayments size={32} />}>
              Make a payment
            </SideBarItem>
            <SideBarItem icon={<MdAddShoppingCart size={32} />}>
              Place an order
            </SideBarItem>
          </ul>
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
    <li className="relative flex items-center py-4 my-1 text-xl font-medium">
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
