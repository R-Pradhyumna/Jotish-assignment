import cardStyles from "../../../ui/Card.module.css";
import skeletonStyles from "../../../ui/Skeleton.module.css";
import styles from "./EmployeeDetail.module.css";

function EmployeeDetailSkeleton() {
  return (
    <section className={styles.container}>
      <div className={cardStyles.card}>
        <div className={styles.headerRow}>
          <div
            className={skeletonStyles.skeleton}
            style={{ height: 20, width: "50%" }}
          />
          <div
            className={skeletonStyles.skeleton}
            style={{ height: 18, width: "30%" }}
          />
        </div>

        <div
          className={skeletonStyles.skeleton}
          style={{ height: 16, width: "40%", marginTop: 12 }}
        />

        <div className={styles.metaRow}>
          <div
            className={skeletonStyles.skeleton}
            style={{ height: 14, width: "35%" }}
          />
          <div
            className={skeletonStyles.skeleton}
            style={{ height: 14, width: "35%" }}
          />
        </div>
      </div>
    </section>
  );
}

export default EmployeeDetailSkeleton;
