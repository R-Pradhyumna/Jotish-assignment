import { matchPath, Outlet, useLocation } from "react-router-dom";
import Header from "../ui/Header";
import styles from "./AppLayout.module.css";
import BottomNavigation from "./BottomNavigation";

function AppLayout() {
  const location = useLocation();

  const showNav =
    matchPath("/", location.pathname) ||
    matchPath("/analytics", location.pathname) ||
    matchPath("/map", location.pathname);

  return (
    <div className={styles.appContainer}>
      <Header />

      <main className={styles.mainContent} aria-live="polite" role="main">
        <Outlet />
      </main>

      {showNav && <BottomNavigation />}
    </div>
  );
}

export default AppLayout;
