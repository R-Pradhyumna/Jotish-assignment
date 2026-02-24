import { useState } from "react";
import { useNavigate } from "react-router-dom";
import buttonStyles from "../../ui/Button.module.css";
import inputStyles from "../../ui/Input.module.css";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("testuser");
  const [password, setPassword] = useState("Test123");
  const [error] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Jotish Portal</h1>
        <p className={styles.subtitle}>Employee Dashboard</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className={inputStyles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-invalid={!!error}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={inputStyles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!error}
            />
          </div>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className={`${buttonStyles.button} ${buttonStyles.primary}`}
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
