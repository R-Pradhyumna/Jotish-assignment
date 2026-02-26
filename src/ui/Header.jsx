import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isAuthenticated");

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("photo_")) {
        localStorage.removeItem(key);
      }
    });

    navigate("/login", { replace: true });
  }

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <span className={styles.brand}>Jotish Portal</span>

        <span className={styles.user} aria-label="Logged in user">
          👋 TestUser
        </span>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout →
        </button>
      </div>
    </header>
  );
}

export default Header;
