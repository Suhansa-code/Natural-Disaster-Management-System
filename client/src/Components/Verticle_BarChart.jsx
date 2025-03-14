import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const VerticalBarChart = ({ data }) => {
  return (
    <div className="w-full h-64 bg-white px-4 py-2 rounded-xl ">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
        >
          {/* Light grid lines for better readability */}
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />

          <XAxis
            dataKey="label"
            axisLine={false}
            tick={{ fill: "#555" }}
            className="text-[13px] font-normal text-gray-400 opacity-70 "
          />
          <YAxis tick={{ fill: "#555" }} hide={true} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />

          {/* Modern gradient bar */}
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0FE07F" />
              <stop offset="100%" stopColor="#0BA360" />
            </linearGradient>
          </defs>

          <Bar
            dataKey="value"
            fill="url(#barGradient)"
            barSize={30}
            radius={[4, 4, 0, 0]}
            // Rounded corners on top
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/10 backdrop-blur-md w-[120px] h-[60px] text-white px-3 py-2 rounded-xl shadow-lg border border-white/20 transition-all duration-100 transform scale-105">
        <p className="text-xs uppercase tracking-wider text-text-primary">
          {payload[0].payload.label}
        </p>
        <p className="text-[18px] font-semibold text-text-primary">
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default VerticalBarChart;
