import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import buttonStyles from "../../ui/Button.module.css";
import cardStyles from "../../ui/Card.module.css";
import styles from "./PhotoResult.module.css";

function PhotoResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const employeeId = location.state?.employeeId;

  const [image] = useState(() => {
    // If image was passed through navigation, use it
    if (location.state?.image) {
      return location.state.image;
    }

    // If no employeeId, nothing to retrieve
    if (!employeeId) return null;

    // Check localStorage
    const stored = localStorage.getItem(`photo_${employeeId}`);
    if (!stored) return null;

    const parsed = JSON.parse(stored);

    // Validate expiry
    if (Date.now() < parsed.expiry) {
      return parsed.image;
    }

    // Expired → cleanup
    localStorage.removeItem(`photo_${employeeId}`);
    return null;
  });

  function handleRetake() {
    navigate(`/employees/${employeeId}`);
  }

  function handleDone() {
    navigate(`/employees/${employeeId}`);
  }

  if (!image) {
    return (
      <section className={styles.container}>
        <h2 className={styles.title}>Photo Expired</h2>
        <p className={styles.message}>
          The captured photo is no longer available. Please capture again.
        </p>

        <button
          className={`${buttonStyles.button} ${buttonStyles.primary}`}
          onClick={() => navigate(`/employees/${employeeId}`)}
        >
          Capture Again
        </button>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <button
        className={`${buttonStyles.button} ${buttonStyles.secondary} ${styles.backButton}`}
        onClick={() => navigate(`/employees/${employeeId}`)}
      >
        ← Back
      </button>

      <h2 className={styles.title}>Captured Photo</h2>

      <article className={`${cardStyles.card} ${styles.imageCard}`}>
        <img src={image} alt="Captured employee" className={styles.image} />
      </article>

      <div className={styles.actions}>
        <button
          className={`${buttonStyles.button} ${buttonStyles.secondary}`}
          onClick={handleRetake}
        >
          Retake
        </button>

        <button
          className={`${buttonStyles.button} ${buttonStyles.primary}`}
          onClick={handleDone}
        >
          Done
        </button>
      </div>
    </section>
  );
}

export default PhotoResult;
