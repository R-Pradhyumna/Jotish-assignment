import skeletonStyles from "../../../ui/Skeleton.module.css";
import styles from "./EmployeeAnalytics.module.css";

function EmployeeAnalyticsSkeleton() {
  return (
    <section className={styles.container}>
      {/* Title Skeleton */}
      <div
        className={skeletonStyles.skeleton}
        style={{ height: 28, width: 220 }}
      />

      {/* Dropdown Skeleton */}
      <div
        className={skeletonStyles.skeleton}
        style={{ height: 42, width: 240, marginTop: 16 }}
      />

      {/* KPI Row Skeleton */}
      <div className={styles.kpiSection}>
        {[1, 2, 3].map((item) => (
          <div key={item} className={styles.kpiItem}>
            <div
              className={skeletonStyles.skeleton}
              style={{ height: 14, width: "60%" }}
            />
            <div
              className={skeletonStyles.skeleton}
              style={{ height: 22, width: "80%", marginTop: 8 }}
            />
          </div>
        ))}
      </div>

      {/* Chart Card Skeleton */}
      <div className={styles.chartWrapper}>
        <div
          className={skeletonStyles.skeleton}
          style={{ height: 400, width: "100%" }}
        />
      </div>
    </section>
  );
}

export default EmployeeAnalyticsSkeleton;
