import { NavLink } from "react-router-dom";
import styles from "./BottomNavigation.module.css";

function BottomNavigation() {
  return (
    <nav className={styles.nav} aria-label="Primary navigation">
      <ul className={styles.list}>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <span className={styles.icon} aria-hidden="true">
              🏠
            </span>
            <span className={styles.label}>List</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <span className={styles.icon} aria-hidden="true">
              📊
            </span>
            <span className={styles.label}>Graph</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/map"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <span className={styles.icon} aria-hidden="true">
              🗺
            </span>
            <span className={styles.label}>Map</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default BottomNavigation;
