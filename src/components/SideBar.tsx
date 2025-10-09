import { useContext } from "react";
import { HiOutlinePresentationChartLine } from "react-icons/hi2";
import { MdOutlinePayments, MdAddShoppingCart } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TbReportMoney } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router";
import SidebarContext from "../Context/SideBarContext";
import { IoIosMenu } from "react-icons/io";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { expanded, setExpanded } = useContext(SidebarContext);

  const handleExpand = () => {
    const newValue = !expanded;
    localStorage.setItem("sideBar", newValue.toString());

    setExpanded(newValue);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 flex flex-col
    bg-primary border border-primary text-text gap-y-6 py-8
    w-0
    transform transition-transform duration-300 ease-in-out
    ${
      expanded
        ? "translate-x-0 md:translate-none"
        : "-translate-x-full md:translate-none"
    }
    ${expanded ? "w-64" : "w-16"}
     md:static md:transform md:transition-all md:duration-300 md:ease-in-out`}
    >
      <div className="flex flex-row items-center px-4">
        <img className="w-8 h-8" src="https://placehold.co/16x16" />
        {expanded && (
          <div
            className={`transition-all text-base tracking-wide font-semibold flex gap-x-2 items-center ml-4 `}
          >
            <p> Acme Finance </p>
            <div className="md:hidden">
              <IoIosMenu size="2rem" onClick={handleExpand} />
            </div>
          </div>
        )}
      </div>

      <div className="w-full border-t border-secondary-100" />

      <div className="flex flex-col gap-y-2 px-4">
        {expanded && (
          <p
            className={`transition-all text-base uppercase tracking-wide font-semibold`}
          >
            Overview
          </p>
        )}
        <ul>
          <SideBarItem
            icon={<AiOutlineDashboard size={32} />}
            onClick={() => {
              navigate("/dashboard");
              if (window.innerWidth < 768) setExpanded(false);
            }}
          >
            Dashboard
          </SideBarItem>
          <SideBarItem
            icon={<HiOutlinePresentationChartLine size={32} />}
            onClick={() => {
              navigate("/metrics");
              if (window.innerWidth < 768) setExpanded(false);
            }}
          >
            Metrics
          </SideBarItem>
          <SideBarItem
            icon={<LiaFileInvoiceDollarSolid size={32} />}
            onClick={() => {
              navigate("/transactions");
              if (window.innerWidth < 768) setExpanded(false);
            }}
          >
            Transactions
          </SideBarItem>
          <SideBarItem
            icon={<TbReportMoney size={32} />}
            onClick={() => {
              navigate("/addtransaction");
              if (window.innerWidth < 768) setExpanded(false);
            }}
          >
            Add Transaction
          </SideBarItem>

          <SideBarItem icon={<IoSettingsOutline size={32} />}>
            Settings
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
      className="relative flex items-center py-4 my-1 text-xl"
      onClick={onClick}
    >
      {icon}
      <span className={`transition-all ml-4 ${expanded ? "inline" : "hidden"}`}>
        {children}
      </span>
    </li>
  );
};

export default SideBar;
