import { useContext } from "react";
import SidebarContext from "../Context/SideBarContext";
import { FiChevronDown } from "react-icons/fi";
import { IoMdNotificationsOutline, IoIosMenu } from "react-icons/io";
import { useLocation } from "react-router-dom";

type Pages = "/Dashboard"; // fix

function TopBar() {
  const { expanded, setExpanded } = useContext(SidebarContext);
  const location: Pages = useLocation();

  return (
    <div className="flex items-center justify-between text-primary font-bold py-4 px-4 md:px-8">
      <div className="flex items-center space-x-4">
        <IoIosMenu size="2rem" onClick={() => setExpanded((prev) => !prev)} />
        <h1 className="hidden sm:block text-base md:text-lg tracking-wide px-2 py-1 md:px-4 border rounded-full">
          Good morning Alan!
        </h1>
      </div>
      <h1 className="text-base md:text-lg tracking-wide px-2 py-1 md:px-4 border rounded-full uppercase">
        {location.pathname}
      </h1>

      <div className="flex items-center space-x-4 px-2 py-1 md:px-4 font-bold border rounded-full">
        <IoMdNotificationsOutline className="w-6 h-6" />
        <img
          src="https://placehold.co/16x16"
          alt="User avatar"
          className="w-6 h-6 md:w-8 md:h-8 rounded-full"
        />
        <FiChevronDown className="w-6 h-6" />
      </div>
    </div>
  );
}

export default TopBar;
