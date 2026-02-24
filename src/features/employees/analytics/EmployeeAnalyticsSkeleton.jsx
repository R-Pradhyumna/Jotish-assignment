import skeletonStyles from "../../../ui/Skeleton.module.css";
import styles from "./EmployeeAnalytics.module.css";

function EmployeeAnalyticsSkeleton() {
  return (
    <div className={styles.chartWrapper}>
      <div
        className={skeletonStyles.skeleton}
        style={{ height: 260, width: "100%" }}
      />
    </div>
  );
}

export default EmployeeAnalyticsSkeleton;
