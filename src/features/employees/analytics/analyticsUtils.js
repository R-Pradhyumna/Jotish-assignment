// Top 10 Highest Salaries
export function getTopSalaries(employees, limit = 10) {
  return [...employees]
    .sort((a, b) => b.salary - a.salary)
    .slice(0, limit)
    .map((emp) => ({
      name: emp.name,
      salary: emp.salary,
    }));
}

// Employees by City
const COLORS = [
  "#4F46E5",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#14B8A6",
];

export function getCityDistribution(employees) {
  const cityMap = {};

  employees.forEach((emp) => {
    cityMap[emp.city] = (cityMap[emp.city] || 0) + 1;
  });

  return Object.entries(cityMap)
    .sort((a, b) => b[1] - a[1])
    .map(([city, count], index) => ({
      city,
      count,
      fill: COLORS[index % COLORS.length],
    }));
}

// Salary Distribution (Fixed Bins)
export function getSalaryDistribution(employees) {
  const bins = {
    "0–100k": 0,
    "100k–250k": 0,
    "250k–500k": 0,
    "500k+": 0,
  };

  employees.forEach((emp) => {
    const salary = emp.salary;

    if (salary <= 100000) bins["0–100k"]++;
    else if (salary <= 250000) bins["100k–250k"]++;
    else if (salary <= 500000) bins["250k–500k"]++;
    else bins["500k+"]++;
  });

  return Object.entries(bins).map(([range, count]) => ({
    range,
    count,
  }));
}

// KPI Stats
export function getKpiStats(employees) {
  const total = employees.length;

  if (total === 0) {
    return {
      total: 0,
      maxSalary: 0,
      avgSalary: 0,
    };
  }

  const maxSalary = Math.max(...employees.map((emp) => emp.salary));

  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);

  const avgSalary = Math.round(totalSalary / total);

  return {
    total,
    maxSalary,
    avgSalary,
  };
}
