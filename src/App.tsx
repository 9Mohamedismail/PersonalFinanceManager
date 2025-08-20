import { useState } from "react";
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

function App() {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen">
      <SidebarContext.Provider value={{ expanded, setExpanded }}>
        <SideBar />
        <div className="flex flex-col flex-1 bg-background">
          <TopBar />
          <div className="flex-1">
            <Routes>
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/dashboard" element={<MainBentoGrid />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/addtransaction" element={<AddTransactionPage />} />
              <Route path="/metrics" element={<MetricsPage />} />
            </Routes>
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
}

export default App;
