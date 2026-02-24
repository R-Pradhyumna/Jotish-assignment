import skeletonStyles from "../../../ui/Skeleton.module.css";
import styles from "./EmployeeMap.module.css";

function EmployeeMapSkeleton() {
  return (
    <div className={styles.mapWrapper}>
      <div
        className={skeletonStyles.skeleton}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}

export default EmployeeMapSkeleton;
