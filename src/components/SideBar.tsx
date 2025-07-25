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
  <div className="flex items-center text-xl font-medium space-x-4">
    {icon}
    <a>
      <span>{children}</span>
    </a>
  </div>
);

function SideBar() {
  return (
    <div className="w-72 flex flex-col bg-secondary border rounded-l-2xl border-secondary text-primary gap-y-4 px-6 py-12">
      {/* Header */}
      <div className="flex flex-row items-center space-x-4 px-4">
        <img className="w-8 h-8" src="https://placehold.co/16x16" />
        <div className="text-md tracking-wide font-bold">
          <p> Acme Finance </p>
          <p> Customer Portal </p>
        </div>
      </div>

      <div className="-mx-6 border-t border-secondary-100/70" />

      {/* Overview */}
      <div className="flex flex-col gap-y-4 px-4">
        <p className="text-md uppercase tracking-wide font-bold ">Overview</p>
        <SideBarItem icon={<MdSpaceDashboard />}> Dashboard </SideBarItem>
        <SideBarItem icon={<MdSpaceDashboard />}> Deals </SideBarItem>
        <SideBarItem icon={<MdSpaceDashboard />}> Orders </SideBarItem>
        <SideBarItem icon={<MdSpaceDashboard />}> Invoices </SideBarItem>
        <SideBarItem icon={<FaMoneyBillTransfer />}> Transactions </SideBarItem>
        <SideBarItem icon={<IoSettings />}> Settings </SideBarItem>
      </div>

      <div className="-mx-6 border-t border-secondary-100/70" />

      {/* Account Management */}
      <div className="flex flex-col gap-y-4 px-4 ">
        <p className="text-md uppercase tracking-wide font-bold ">
          Account Management
        </p>
        <SideBarItem icon={<MdSpaceDashboard />}> Make a payment </SideBarItem>
        <SideBarItem icon={<MdSpaceDashboard />}> Place an order </SideBarItem>
      </div>
    </div>
  );
}

export default SideBar;
