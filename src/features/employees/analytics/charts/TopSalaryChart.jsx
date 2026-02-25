import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function TopSalaryChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No salary data available.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 20, left: 60, bottom: 20 }}
      >
        <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />

        <XAxis
          type="number"
          tickFormatter={(value) => `$${Number(value || 0).toLocaleString()}`}
        />

        <YAxis type="category" dataKey="name" width={130} />

        <Tooltip
          cursor={false}
          formatter={(value) => `$${value.toLocaleString()}`}
        />

        <Bar
          dataKey="salary"
          fill="#4F46E5"
          radius={[0, 6, 6, 0]}
          isAnimationActive={true}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TopSalaryChart;
