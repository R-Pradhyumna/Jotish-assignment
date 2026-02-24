import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <span className={styles.brand}>Jotish Portal</span>
        <span className={styles.user} aria-label="Logged in user">
          👋 TestUser
        </span>
      </div>
    </header>
  );
}

export default Header;
