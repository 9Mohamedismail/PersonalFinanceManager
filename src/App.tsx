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
import { getTransactions } from "./utils/getTransactions";
import {
  UserInfoContext,
  type User,
  type AuthStatus,
} from "./Context/UserInfoContext";
import { AccountsContext, type Accounts } from "./Context/AccountsContext";
import {
  TransactionsContext,
  type Transactions,
} from "./Context/TransactionsContext";
import axios from "axios";
import ProtectedRoute from "./utils/ProtectedRoute";
import ErrorPage from "./Pages/ErrorPage";
import Profile from "./Pages/Profile";

function App() {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
  const [accounts, setAccounts] = useState<Accounts[] | null>(null);
  const [allTransactions, setAllTransactions] = useState<Transactions[] | null>(
    null
  );
  const [currentWeekTransactions, setCurrentWeekTransactions] = useState<
    Transactions[] | null
  >(null);
  const [currentMonthTransactions, setCurrentMonthTransactions] = useState<
    Transactions[] | null
  >(null);

  useEffect(() => {
    let sideBarStorage = localStorage.getItem("sideBar") ?? "true";

    if (!localStorage.getItem("sideBar")) {
      localStorage.setItem("sideBar", sideBarStorage);
    }

    setExpanded(sideBarStorage === "true");
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user/me", {
          withCredentials: true,
        });

        console.log("User logged in", res.data.user);
        setUser(res.data.user);
        setAuthStatus("authenticated");
      } catch (err: any) {
        if (err?.response?.status === 401) {
          console.log(err.response.data.message);
        } else {
          console.error("Unexpected error fetching user:", err);
        }
        setAuthStatus("unauthenticated");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchAccounts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/accounts/with-count",
          {
            withCredentials: true,
          }
        );

        console.log("ALL User's accounts fetched:", res.data.payload);
        setAccounts(res.data.payload);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          console.log(err.response.data.message);
        } else {
          console.error("Unexpected error fetching user's accounts:", err);
        }
      }
    };

    fetchAccounts();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchTransactions = async () => {
      try {
        const transactionTypes = ["all", "week", "month"] as const;

        const results = await Promise.allSettled(
          transactionTypes.map((type) => getTransactions(type))
        );

        results.forEach((result, index) => {
          const type = transactionTypes[index];

          if (result.status === "fulfilled") {
            switch (type) {
              case "all":
                setAllTransactions(result.value);
                break;
              case "week":
                setCurrentWeekTransactions(result.value);
                break;
              case "month":
                setCurrentMonthTransactions(result.value);
                break;
            }
          } else {
            console.error(
              `Failed to load ${type} transactions:`,
              result.reason
            );
          }
        });
      } catch (err) {
        console.error("Unexpected error while fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, [user]);

  return (
    <div className="flex min-h-screen min-w-[360px]  bg-gray-50">
      <UserInfoContext.Provider
        value={{ user, authStatus, setAuthStatus, setUser }}
      >
        <AccountsContext.Provider value={{ accounts, setAccounts }}>
          <TransactionsContext.Provider
            value={{
              allTransactions,
              currentWeekTransactions,
              currentMonthTransactions,
              setAllTransactions,
              setCurrentWeekTransactions,
              setCurrentMonthTransactions,
            }}
          >
            <SidebarContext.Provider value={{ expanded, setExpanded }}>
              {authStatus === "loading" ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-5xl text-primary tracking-wide">
                    Loading...
                  </p>
                </div>
              ) : (
                <>
                  {authStatus === "authenticated" && <SideBar />}
                  <div className="flex flex-col flex-1 min-h-0 min-w-0">
                    {authStatus === "authenticated" && <TopBar />}
                    <div className="flex-1">
                      <Routes>
                        <Route element={<ProtectedRoute />}>
                          <Route
                            path="/dashboard"
                            element={<MainBentoGrid />}
                          />
                          <Route path="/profile" element={<Profile />} />
                          <Route
                            path="/transactions"
                            element={<TransactionsPage />}
                          />
                          <Route
                            path="/addtransaction"
                            element={<AddTransactionPage />}
                          />
                          <Route path="/metrics" element={<MetricsPage />} />
                        </Route>
                        <Route path="/signup" element={<SignUpForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route
                          path="/login/forgot"
                          element={<ForgotPasswordForm />}
                        />
                        <Route
                          path="/login/forgot-username"
                          element={<ForgotUsernameForm />}
                        />
                        <Route path="/*" element={<ErrorPage />} />
                      </Routes>
                    </div>
                  </div>
                </>
              )}
            </SidebarContext.Provider>
          </TransactionsContext.Provider>
        </AccountsContext.Provider>
      </UserInfoContext.Provider>
    </div>
  );
}

export default App;
