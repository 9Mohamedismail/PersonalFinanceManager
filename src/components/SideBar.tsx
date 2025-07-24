import { MdSpaceDashboard } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

const SideBarItem = ({
  children,
  icon,
}: {
  children: string;
  icon: React.ReactNode;
}) => (
  <div className="flex items-center text-2xl space-x-2">
    {icon}
    <a>
      <span>{children}</span>
    </a>
  </div>
);

function SideBar() {
  return (
    <div className="w-72 flex flex-col bg-blue-600 border rounded-l-2xl">
      {/* Header */}
      <div className="flex flex-row items-center space-x-2 p-8">
        <img className="w-16 h-16" src="https://placehold.co/16x16" />
        <div>
          <p> Acme Finance </p>
          <p> Customer Portal </p>
        </div>
      </div>

      <div className="border-t border-white" />

      {/* Overview */}
      <div className="flex flex-col gap-y-4 p-8">
        <p>Overview</p>
        <SideBarItem icon={<MdSpaceDashboard />}> Dashboard </SideBarItem>
        <SideBarItem icon={<MdSpaceDashboard />}> Deals </SideBarItem>
        <SideBarItem icon={<MdSpaceDashboard />}> Orders </SideBarItem>
        <SideBarItem icon={<MdSpaceDashboard />}> Invoices </SideBarItem>
        <SideBarItem icon={<FaMoneyBillTransfer />}> Transactions </SideBarItem>
        <SideBarItem icon={<IoSettings />}> Settings </SideBarItem>
      </div>

      <div className="border-t border-white" />

      {/* Account Management */}
      <div className="flex flex-col gap-y-4 p-8">
        <p> Account Management </p>
        <SideBarItem icon={<MdSpaceDashboard />}> Make a payment </SideBarItem>
        <SideBarItem icon={<MdSpaceDashboard />}> Place an order </SideBarItem>
      </div>
    </div>
  );
}

export default SideBar;
