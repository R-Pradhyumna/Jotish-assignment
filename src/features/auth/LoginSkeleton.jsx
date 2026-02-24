import skeletonStyles from "../../ui/Skeleton.module.css";
import styles from "./LoginLoader.module.css";

function LoginLoader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={`${skeletonStyles.skeleton} ${styles.title}`} />
        <div className={`${skeletonStyles.skeleton} ${styles.subtitle}`} />
        <div className={`${skeletonStyles.skeleton} ${styles.input}`} />
        <div className={`${skeletonStyles.skeleton} ${styles.input}`} />
        <div className={`${skeletonStyles.skeleton} ${styles.button}`} />
      </div>
    </div>
  );
}

export default LoginLoader;
