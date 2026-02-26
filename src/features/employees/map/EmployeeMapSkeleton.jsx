import skeletonStyles from "../../../ui/Skeleton.module.css";
import styles from "./EmployeeMap.module.css";

function EmployeeMapSkeleton() {
  return (
    <section className={styles.mapPage}>
      <div className={styles.mapWrapper}>
        <div className={`${skeletonStyles.skeleton} ${styles.mapSkeleton}`} />
      </div>
    </section>
  );
}

export default EmployeeMapSkeleton;
