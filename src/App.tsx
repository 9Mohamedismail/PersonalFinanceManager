import { useState } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import SidebarContext from "./Context/SideBarContext";
import { Route, Routes } from "react-router-dom";
import MainBentoGrid from "./components/MainBentoGrid";
import TransactionsPage from "./Pages/TransactionsPage";

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
              <Route path="/dashboard" element={<MainBentoGrid />} />\
              <Route path="/transactions" element={<TransactionsPage />} />
            </Routes>
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
}

export default App;
