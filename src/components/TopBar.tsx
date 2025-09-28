import { useContext } from "react";
import SidebarContext from "../Context/SideBarContext";
import { FiChevronDown } from "react-icons/fi";
import { IoIosMenu } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserInfoContext } from "../Context/UserInfoContext";

function TopBar() {
  const { expanded, setExpanded } = useContext(SidebarContext);
  const { user, setUser, setAuthStatus } = useContext(UserInfoContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/logout",
        {},
        { withCredentials: true }
      );
      console.log(res.data.message);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
      setAuthStatus("unauthenticated");
      navigate("/login");
    }
  };

  const handleExpand = () => {
    const newValue = !expanded;
    localStorage.setItem("sideBar", newValue.toString());

    setExpanded(newValue);
  };

  return (
    <div className="flex items-center justify-between text-primary py-4 px-4 md:px-8">
      <div className="flex items-center space-x-4">
        <IoIosMenu size="2rem" onClick={handleExpand} />
        <h1 className="hidden sm:block text-base md:text-lg tracking-wide px-2 py-1 md:px-4 bg-white rounded-lg shadow-sm border border-primary">
          Good morning {user ? user.username : ""}
        </h1>
      </div>
      <h1 className="text-base md:text-lg tracking-wide px-2 py-1 md:px-4 bg-white rounded-lg shadow-sm border border-primary uppercase">
        {location.pathname.replace("/", "")}
      </h1>

      <div className="flex items-center space-x-4 px-2 py-1 md:px-4bg-white rounded-lg shadow-sm border border-primary">
        <img
          src="https://placehold.co/16x16"
          alt="User avatar"
          className="w-6 h-6 md:w-8 md:h-8 rounded-full"
        />

        {user ? (
          <div className="flex items-center cursor-pointer">
            <h1
              className="text-base md:text-lg tracking-wide uppercase"
              onClick={handleLogout}
            >
              Logout
            </h1>
            <FiChevronDown
              className="w-6 h-6"
              onClick={() => navigate("/profile")}
            />
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
