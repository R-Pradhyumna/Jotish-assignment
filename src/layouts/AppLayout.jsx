import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import BottomNavigation from "./BottomNavigation";

function AppLayout() {
  return (
    <div className="appContainer">
      <Header />

      <main className="content">
        <Outlet />
      </main>

      <BottomNavigation />
    </div>
  );
}

export default AppLayout;
