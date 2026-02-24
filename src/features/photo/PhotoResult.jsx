import { useLocation, useNavigate } from "react-router-dom";
import buttonStyles from "../../ui/Button.module.css";
import cardStyles from "../../ui/Card.module.css";
import styles from "./PhotoResult.module.css";

function PhotoResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const image = location.state?.image;

  function handleRetake() {
    navigate(-1);
  }

  function handleDone() {
    navigate("/", { replace: true });
  }

  if (!image) {
    return (
      <section className={styles.container}>
        <h2 className={styles.title}>No Photo Found</h2>
        <p className={styles.message}>You haven't captured a photo yet.</p>

        <button
          className={`${buttonStyles.button} ${buttonStyles.primary}`}
          onClick={() => navigate("/")}
        >
          Go to Employee List
        </button>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <button
        className={`${buttonStyles.button} ${buttonStyles.secondary}`}
        onClick={() => navigate(-1)}
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
