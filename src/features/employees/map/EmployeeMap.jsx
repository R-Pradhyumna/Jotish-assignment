import styles from "./EmployeeMap.module.css";

function EmployeeMap() {
  return (
    <section className={styles.container}>
      <div className={styles.mapWrapper}>{/* Leaflet Map goes here */}</div>
    </section>
  );
}

export default EmployeeMap;
