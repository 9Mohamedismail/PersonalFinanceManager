import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import SidebarContext from "./Context/SideBarContext";
import { Route, Routes } from "react-router-dom";
import MainBentoGrid from "./components/MainBentoGrid";
import TransactionsPage from "./Pages/TransactionsPage";
import MetricsPage from "./Pages/MetricsPage";
import AddTransactionPage from "./Pages/AddTransactionPage";
import SignUpForm from "./Pages/SignUpForm";
import LoginForm from "./Pages/LoginForm";
import ForgotPasswordForm from "./Pages/ForgotPassword";
import ForgotUsernameForm from "./Pages/ForgotUsername";
import { UserInfoContext, type User } from "./Context/UserInfoContext";
import axios from "axios";

function App() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    id: 0,
    username: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user/me", {
          withCredentials: true,
        });

        console.log("User logged in", res.data.user);
        setUser(res.data.user);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          console.log(err.response.data.message);
        } else {
          console.error("Unexpected error fetching user:", err);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen">
      <UserInfoContext.Provider value={{ user, setUser }}>
        <SidebarContext.Provider value={{ expanded, setExpanded }}>
          <SideBar />
          <div className="flex flex-col flex-1 bg-background">
            <TopBar />
            <div className="flex-1">
              <Routes>
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/login/forgot" element={<ForgotPasswordForm />} />
                <Route
                  path="/login/forgot-username"
                  element={<ForgotUsernameForm />}
                />
                <Route path="/" element={<MainBentoGrid />} />
                <Route path="/dashboard" element={<MainBentoGrid />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route
                  path="/addtransaction"
                  element={<AddTransactionPage />}
                />
                <Route path="/metrics" element={<MetricsPage />} />
              </Routes>
            </div>
          </div>
        </SidebarContext.Provider>
      </UserInfoContext.Provider>
    </div>
  );
}

export default App;
