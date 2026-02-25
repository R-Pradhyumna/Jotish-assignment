import skeletonStyles from "../../../ui/Skeleton.module.css";
import styles from "./EmployeeMap.module.css";

function EmployeeMapSkeleton() {
  return (
    <section className={styles.container}>
      <h2>Employee Locations</h2>

      <div className={styles.mapWrapper}>
        <div
          className={skeletonStyles.skeleton}
          style={{ height: "550px", width: "100%" }}
        />
      </div>
    </section>
  );
}

export default EmployeeMapSkeleton;
