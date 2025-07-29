import BentoGrid from "./components/BentoGrid";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex flex-col flex-1 bg-background">
        <TopBar />
        <div className="flex-1">
          <Routes>
            <Route path="/dashboard" element={<BentoGrid />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
