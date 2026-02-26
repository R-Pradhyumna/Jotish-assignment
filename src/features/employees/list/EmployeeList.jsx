import { useNavigate } from "react-router-dom";

import buttonStyles from "../../../ui/Button.module.css";
import cardStyles from "../../../ui/Card.module.css";

import styles from "./EmployeeList.module.css";
import EmployeeListSkeleton from "./EmployeeListSkeleton";

import { useEmployeeList } from "./useEmployeeList";

function EmployeeList() {
  const { data: employees, isLoading, isError } = useEmployeeList();
  const navigate = useNavigate();

  if (isLoading) return <EmployeeListSkeleton />;

  if (isError)
    return (
      <p style={{ color: "var(--color-text-muted)" }}>
        Failed to load employees.
      </p>
    );

  if (!employees?.length) return <p>No employees found.</p>;

  return (
    <section className={styles.container}>
      <div className={styles.list}>
        {employees.map((emp) => (
          <article
            key={emp.id}
            className={`${cardStyles.card} ${styles.card}`}
            onClick={() => navigate(`/employees/${emp.id}`)}
          >
            <div className={styles.headerRow}>
              <h3>{emp.name}</h3>
              <p className={styles.salary}>${emp.salary.toLocaleString()}</p>
            </div>

            <div className={styles.metaRow}>
              <span>{emp.position}</span>
              <span className={styles.city}>📍 {emp.city}</span>
            </div>

            <button
              onClick={() => navigate(`/employees/${emp.id}`)}
              className={`${buttonStyles.button} ${buttonStyles.secondary}`}
            >
              View Details
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default EmployeeList;
