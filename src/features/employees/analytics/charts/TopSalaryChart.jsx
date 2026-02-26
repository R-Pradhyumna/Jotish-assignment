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
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        tabIndex={-1}
        layout="vertical"
        margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
      >
        <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />

        <XAxis
          type="number"
          tickCount={4}
          tickFormatter={(value) => `$${Number(value || 0).toLocaleString()}`}
        />

        <YAxis
          type="category"
          dataKey="name"
          width={100}
          interval={0}
          tickFormatter={(value) => value.split(" ")[0]}
        />

        <Tooltip
          trigger="hover"
          cursor={false}
          formatter={(value) => `$${Number(value).toLocaleString()}`}
        />

        <Bar
          dataKey="salary"
          fill="#4F46E5"
          radius={[0, 6, 6, 0]}
          isAnimationActive
          tabIndex={-1}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TopSalaryChart;
