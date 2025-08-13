import { useContext } from "react";
import { RiCoupon2Line, RiShoppingCart2Line } from "react-icons/ri";
import { MdOutlinePayments, MdAddShoppingCart } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TbReportMoney } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router";
import SidebarContext from "../Context/SideBarContext";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { expanded } = useContext(SidebarContext);

  return (
    <div
      className={`transition-all duration-300 ${
        expanded ? "xl:items-start items-center" : "items-center"
      }
        flex flex-col bg-primary border  border-primary text-text gap-y-6 py-8`}
    >
      {/* Header */}
      <div className="flex flex-row items-center px-4">
        <img className="w-8 h-8" src="https://placehold.co/16x16" />
        {expanded && (
          <div
            className={`transition-all text-base tracking-wide font-bold hidden xl:block ml-4 `}
          >
            <p> Acme Finance </p>
          </div>
        )}
      </div>

      <div className="w-full border-t border-secondary-100" />

      {/* Overview */}

      <div className="flex flex-col gap-y-2 px-4">
        {expanded && (
          <p
            className={`transition-all text-base uppercase tracking-wide font-bold hidden xl:block`}
          >
            Overview
          </p>
        )}
        <ul>
          <SideBarItem
            icon={<AiOutlineDashboard size={32} />}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </SideBarItem>
          <SideBarItem
            icon={<RiCoupon2Line size={32} />}
            onClick={() => navigate("/metrics")}
          >
            Metrics
          </SideBarItem>
          <SideBarItem
            icon={<RiShoppingCart2Line size={32} />}
            onClick={() => navigate("/addtransaction")}
          >
            Add Transaction
          </SideBarItem>
          <SideBarItem
            icon={<TbReportMoney size={32} />}
            onClick={() => navigate("/transactions")}
          >
            Transactions
          </SideBarItem>
          <SideBarItem icon={<LiaFileInvoiceDollarSolid size={32} />}>
            Invoices
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
            className={`transition-all text-base uppercase tracking-wide font-bold hidden xl:block`}
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
  );
}

const SideBarItem = ({
  children,
  icon,
  onClick,
}: {
  children: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) => {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className="relative flex items-center py-4 my-1 text-xl font-medium"
      onClick={onClick}
    >
      {icon}
      <span
        className={`transition-all ml-4 ${
          expanded ? "xl:inline hidden " : "hidden"
        }`}
      >
        {children}
      </span>
    </li>
  );
};

export default SideBar;
