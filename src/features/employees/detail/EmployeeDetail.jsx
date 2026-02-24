import { useNavigate, useParams } from "react-router-dom";

import buttonStyles from "../../../ui/Button.module.css";
import cardStyles from "../../../ui/Card.module.css";
import styles from "./EmployeeDetail.module.css";

import EmployeeDetailSkeleton from "./EmployeeDetailSkeleton";

import { useEmployee } from "./useEmployee";

function EmployeeDetail() {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const { data: employee, isLoading, isError } = useEmployee(employeeId);

  if (isLoading) return <EmployeeDetailSkeleton />;

  if (isError) return <p className={styles.error}>Failed to load employee.</p>;

  if (!employee) return <p>Employee not found</p>;

  return (
    <section className={styles.container}>
      <button
        className={`${buttonStyles.button} ${buttonStyles.secondary}`}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <article className={`${cardStyles.card} ${styles.card}`}>
        <div className={styles.headerRow}>
          <h2>{employee.name}</h2>
          <span className={styles.salary}>
            {employee.salary.toLocaleString()}
          </span>
        </div>

        <p className={styles.position}>{employee.position}</p>

        <div className={styles.metaRow}>
          <span>📍 {employee.city}</span>
          <span>Joined {employee.startDate}</span>
        </div>
      </article>

      <button
        className={`${buttonStyles.button} ${buttonStyles.primary}`}
        onClick={() =>
          navigate("/photo-result", {
            state: { employeeId },
          })
        }
      >
        Capture Photo
      </button>
    </section>
  );
}

export default EmployeeDetail;
