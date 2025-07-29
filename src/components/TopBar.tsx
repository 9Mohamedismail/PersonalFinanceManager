import { FiChevronDown } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";

function TopBar() {
  return (
    <div className="flex items-center justify-between text-primary font-bold py-4 px-4 lg:px-8">
      <h1 className="text-lg tracking-wide px-4 py-1 border rounded-full">
        Good morning Alan!
      </h1>
      <h1 className="text-lg tracking-wide px-4 py-1 border rounded-full uppercase">
        Dashboard
      </h1>
      <div className="flex items-center space-x-4 px-4 py-1 font-bold border rounded-full">
        <IoMdNotificationsOutline size="2rem" />
        <img
          src="https://placehold.co/16x16"
          alt="User avatar"
          className="w-8 h-8 rounded-full"
        />
        <FiChevronDown size="2rem" />
      </div>
    </div>
  );
}

export default TopBar;
