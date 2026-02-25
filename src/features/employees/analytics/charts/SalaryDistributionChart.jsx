import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function SalaryDistributionChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No salary distribution data available.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
      >
        <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />

        <XAxis dataKey="range" tick={{ fill: "#6B7280", fontSize: 13 }} />

        <YAxis allowDecimals={false} tick={{ fill: "#6B7280", fontSize: 13 }} />

        <Tooltip
          cursor={false}
          formatter={(value) => [`${Number(value) || 0} employees`, "Count"]}
        />

        <Bar dataKey="count" fill="#06B6D4" radius={[6, 6, 0, 0]}>
          <LabelList
            dataKey="count"
            position="top"
            formatter={(value) => (value > 0 ? value : "")}
            style={{ fill: "#111827", fontSize: 12 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SalaryDistributionChart;
