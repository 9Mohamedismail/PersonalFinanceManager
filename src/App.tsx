import { useState } from "react";
import BentoGrid from "./components/BentoGrid";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import SidebarContext from "./Context/SideBarContext";
import { Route, Routes } from "react-router-dom";

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
              <Route path="/dashboard" element={<BentoGrid />} />
            </Routes>
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
}

export default App;
