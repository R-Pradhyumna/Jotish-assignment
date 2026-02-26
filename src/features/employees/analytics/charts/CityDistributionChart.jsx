import {
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function CityDistributionChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No city data available.</p>;
  }

  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 10, right: 10, bottom: 40, left: 10 }}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="city"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          cornerRadius={6}
          labelLine={false}
          label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill="#ffffff"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={12}
                fontWeight={600}
              >
                {value}
              </text>
            );
          }}
        >
          <Label
            value={`Total ${total}`}
            position="center"
            style={{
              fontSize: 14,
              fontWeight: 600,
              fill: "#111827",
            }}
          />
        </Pie>

        <Tooltip trigger="hover" />

        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          wrapperStyle={{
            fontSize: "11px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CityDistributionChart;
