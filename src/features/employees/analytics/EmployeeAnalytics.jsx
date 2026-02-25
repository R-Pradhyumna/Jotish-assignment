import { useState } from "react";

import { useEmployeeList } from "../list/useEmployeeList";
import {
  getCityDistribution,
  getKpiStats,
  getSalaryDistribution,
  getTopSalaries,
} from "./analyticsUtils";

import CityDistributionChart from "./charts/CityDistributionChart";
import SalaryDistributionChart from "./charts/SalaryDistributionChart";
import TopSalaryChart from "./charts/TopSalaryChart";

import styles from "./EmployeeAnalytics.module.css";

import EmployeeAnalyticsSkeleton from "./EmployeeAnalyticsSkeleton";

function EmployeeAnalytics() {
  const { data: employees, isLoading, isError } = useEmployeeList();
  const [selectedChart, setSelectedChart] = useState("top");

  if (isLoading) return <EmployeeAnalyticsSkeleton />;

  if (isError) return <p>Failed to load analytics.</p>;

  const topData = getTopSalaries(employees);
  const cityData = getCityDistribution(employees);
  const salaryBins = getSalaryDistribution(employees);
  const kpis = getKpiStats(employees);

  return (
    <section className={styles.container}>
      <h2>Employee Analytics</h2>

      <div className={styles.kpiSection}>
        <div className={styles.kpiItem}>
          <div className={styles.kpiLabel}>Total Employees</div>
          <div className={styles.kpiValue}>{kpis.total}</div>
        </div>

        <div className={styles.kpiItem}>
          <div className={styles.kpiLabel}>Highest Salary</div>
          <div className={styles.kpiValue}>
            ${kpis.maxSalary.toLocaleString()}
          </div>
        </div>

        <div className={styles.kpiItem}>
          <div className={styles.kpiLabel}>Average Salary</div>
          <div className={styles.kpiValue}>
            ${kpis.avgSalary.toLocaleString()}
          </div>
        </div>
      </div>

      <label htmlFor="chart-select" className={styles.hiddenLabel}>
        Select chart
      </label>
      <select
        value={selectedChart}
        onChange={(e) => setSelectedChart(e.target.value)}
        className={styles.dropdown}
      >
        <option value="top">Top 10 Highest Salaries</option>
        <option value="city">Employees by City</option>
        <option value="distribution">Salary Distribution</option>
      </select>

      <div className={styles.chartWrapper}>
        {selectedChart === "top" && <TopSalaryChart data={topData} />}
        {selectedChart === "city" && <CityDistributionChart data={cityData} />}
        {selectedChart === "distribution" && (
          <SalaryDistributionChart data={salaryBins} />
        )}
      </div>
    </section>
  );
}

export default EmployeeAnalytics;
