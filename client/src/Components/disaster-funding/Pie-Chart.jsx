import React, { useRef, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const COLOR_GRADIENTS = [
  ["#16a34a", "#4ade80"], // Emerald gradient
  ["#2563eb", "#60a5fa"], // Blue gradient
  ["#f59e42", "#fde68a"], // Orange gradient
  ["#ef4444", "#fca5a5"], // Red gradient
  ["#a21caf", "#f472b6"], // Purple gradient
  ["#64748b", "#cbd5e1"], // Slate gradient
  ["#eab308", "#fde047"], // Yellow gradient
  ["#0ea5e9", "#7dd3fc"], // Sky gradient
  ["#f43f5e", "#fda4af"], // Rose gradient
];

const DisasterPieChart = ({ data }) => {
  const chartRef = useRef();
  const [bgGradients, setBgGradients] = useState([]);

  // Create gradients after chart is rendered
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const gradients = (data || []).map((_, i) => {
      const [start, end] = COLOR_GRADIENTS[i % COLOR_GRADIENTS.length];
      const gradient = ctx.createLinearGradient(0, 0, 180, 180);
      gradient.addColorStop(0, start);
      gradient.addColorStop(1, end);
      return gradient;
    });
    setBgGradients(gradients);
    // eslint-disable-next-line
  }, [data]);

  const disasterData = {
    labels: data && data.length > 0 ? data.map((d) => d.type) : [],
    datasets: [
      {
        data: data && data.length > 0 ? data.map((d) => d.count) : [],
        backgroundColor: bgGradients.length
          ? bgGradients
          : COLOR_GRADIENTS.map((g) => g[0]),
        borderColor: "#fff",
        borderWidth: 3,
        hoverOffset: 10,
        hoverBorderWidth: 4,
      },
    ],
  };

  // Modern chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            family: "Poppins, sans-serif",
            size: 14,
            weight: "bold",
          },
          color: "#334155",
          padding: 18,
          boxWidth: 18,
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#16a34a",
        bodyColor: "#334155",
        borderColor: "#16a34a",
        borderWidth: 1,
        padding: 14,
        cornerRadius: 10,
        titleFont: { weight: "normal", size: 15 },
        bodyFont: { size: 14 },
        displayColors: true,
        callbacks: {
          label: (context) =>
            `${context.label}: ${context.parsed} (${(
              (context.parsed /
                context.dataset.data.reduce((a, b) => a + b, 0)) *
              100
            ).toFixed(1)}%)`,
        },
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow p-4">
      <Pie data={disasterData} options={options} />
    </div>
  );
};

export default DisasterPieChart;
