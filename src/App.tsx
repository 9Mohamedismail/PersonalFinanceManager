import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

function App() {
  return (
    <div className="flex min-h-screen ">
      <SideBar />

      <div className="flex flex-col flex-1 bg-background">
        <TopBar />
        <div className="h-16 flex items-center justify-between flex-col border text-text gap-y-4 px-6 py-12 bg-white">
          <p> Main Content </p>
        </div>
      </div>
    </div>
  );
}

export default App;
