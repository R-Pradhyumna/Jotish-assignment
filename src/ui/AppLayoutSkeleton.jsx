import styles from "./AppLayoutSkeleton.module.css";
import skeletonStyles from "./Skeleton.module.css";

function PageLoader() {
  return (
    <div className={styles.container}>
      <div className={`${skeletonStyles.skeleton} ${styles.line}`} />
      <div className={`${skeletonStyles.skeleton} ${styles.lineShort}`} />
      <div className={`${skeletonStyles.skeleton} ${styles.lineMedium}`} />
    </div>
  );
}

export default PageLoader;
