import "./App.css";
import { MainLayout } from "./components/MainLayout";
function App() {
  return (
    <div
      id="app"
      className="dark:bg-black w-screen h-screen text-white dark:text-black"
    >
      <MainLayout />
    </div>
  );
}

export default App;
