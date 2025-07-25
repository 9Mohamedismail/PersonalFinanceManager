import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

function App() {
  return (
    <div className="flex min-h-screen ">
      <SideBar />

      <div className="flex flex-col flex-1 border-secondary bg-bg">
        <TopBar />
        <div className="h-full flex items-center justify-between flex-col border text-secondary gap-y-4 px-6 py-12">
          <p> Main Content </p>
        </div>
      </div>
    </div>
  );
}

export default App;
