import { useContext } from "react";
import SidebarContext from "../Context/SideBarContext";
import { FiChevronDown } from "react-icons/fi";
import { IoMdNotificationsOutline, IoIosMenu } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserInfoContext } from "../Context/UserInfoContext";

function TopBar() {
  const { expanded, setExpanded } = useContext(SidebarContext);
  const { user, setUser } = useContext(UserInfoContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/logout",
        {}, // no body
        { withCredentials: true }
      );
      console.log(res.data.message);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser({ id: 0, username: "", email: "" });
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-between text-primary font-bold py-4 px-4 md:px-8">
      <div className="flex items-center space-x-4">
        <IoIosMenu size="2rem" onClick={() => setExpanded((prev) => !prev)} />
        <h1 className="hidden sm:block text-base md:text-lg tracking-wide px-2 py-1 md:px-4 border rounded-full">
          Good morning {user.username}
        </h1>
      </div>
      <h1 className="text-base md:text-lg tracking-wide px-2 py-1 md:px-4 border rounded-full uppercase">
        {location.pathname.replace("/", "")}
      </h1>

      <div className="flex items-center space-x-4 px-2 py-1 md:px-4 font-bold border rounded-full">
        <img
          src="https://placehold.co/16x16"
          alt="User avatar"
          className="w-6 h-6 md:w-8 md:h-8 rounded-full"
        />

        {user.id ? (
          <div
            className="flex items-center cursor-pointer"
            onClick={handleLogout}
          >
            <h1 className="text-base md:text-lg tracking-wide uppercase ">
              Logout
            </h1>
            <FiChevronDown className="w-6 h-6" />
          </div>
        ) : (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <h1 className="text-base md:text-lg tracking-wide uppercase ">
              Login
            </h1>
            <FiChevronDown className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
}

export default TopBar;
