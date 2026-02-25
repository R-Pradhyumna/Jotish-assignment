import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function CityDistributionChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No city data available.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="city"
          innerRadius={70}
          outerRadius={130}
          paddingAngle={3}
          cornerRadius={6}
        />

        <Tooltip
          formatter={(value, name) => [`${Number(value) || 0} employees`, name]}
        />

        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ fontSize: "13px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CityDistributionChart;
