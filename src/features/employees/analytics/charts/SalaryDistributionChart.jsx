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
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 5, left: -10, bottom: 10 }}
      >
        <CartesianGrid
          stroke="#E5E7EB"
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          dataKey="range"
          interval={0}
          angle={-20}
          textAnchor="end"
          minTickGap={0}
          tickMargin={10}
          tick={{ fill: "#6B7280", fontSize: 11 }}
        />

        <YAxis
          width={30}
          allowDecimals={false}
          tick={{ fill: "#6B7280", fontSize: 12 }}
        />

        <Tooltip
          trigger="hover"
          cursor={false}
          formatter={(value) => [`${Number(value) || 0} employees`, "Count"]}
        />

        <Bar dataKey="count" fill="#06B6D4" radius={[6, 6, 0, 0]}>
          <LabelList
            dataKey="count"
            position="top"
            formatter={(value) => (value > 0 ? value : "")}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SalaryDistributionChart;
