import BentoGrid from "./components/BentoGrid";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

function App() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex flex-col flex-1 bg-background">
        <TopBar />
        <div className="flex-1">
          <BentoGrid />
        </div>
      </div>
    </div>
  );
}

export default App;
