import cardStyles from "../../../ui/Card.module.css";
import skeletonStyles from "../../../ui/Skeleton.module.css";
import styles from "./EmployeeList.module.css";

function EmployeeListSkeleton() {
  return (
    <div className={styles.list}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className={`${cardStyles.card} ${styles.card}`}>
          {/* Header Row */}
          <div className={styles.headerRow}>
            <div
              className={skeletonStyles.skeleton}
              style={{ height: 18, width: "50%" }}
            />
            <div
              className={skeletonStyles.skeleton}
              style={{ height: 18, width: "30%" }}
            />
          </div>

          {/* Meta Row */}
          <div className={styles.metaRow}>
            <div
              className={skeletonStyles.skeleton}
              style={{ height: 14, width: "40%" }}
            />
            <div
              className={skeletonStyles.skeleton}
              style={{ height: 14, width: "35%" }}
            />
          </div>

          {/* Button Placeholder */}
          <div
            className={skeletonStyles.skeleton}
            style={{
              height: 36,
              width: 120,
              marginTop: 16,
              borderRadius: 8,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default EmployeeListSkeleton;
