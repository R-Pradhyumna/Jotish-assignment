import styles from "./EmployeeAnalytics.module.css";

function EmployeeAnalytics() {
  return (
    <section className={styles.container}>
      <h2>Salary Analytics</h2>

      <div className={styles.chartWrapper}>{/* Recharts will go here */}</div>
    </section>
  );
}

export default EmployeeAnalytics;
