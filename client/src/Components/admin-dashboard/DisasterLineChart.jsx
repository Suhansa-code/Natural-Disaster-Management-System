import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const DisasterLineChart = ({ data }) => {
  // Prepare the dataset for the line chart
  const lineChartData = {
    labels: data ? data.map((item) => item.date) : [], // Dates from the data
    datasets: [
      {
        label: "Number of Disasters",
        data: data ? data.map((item) => item.count) : [], // Count of disasters on each date
        borderColor: "#42b490", // Line color
        backgroundColor: "rgba(66, 180, 144, 0.2)", // Line area color (for fill under the line)
        tension: 0.4, // Smoothing of the line
        fill: true, // Filling the area under the line
        pointRadius: 5, // Size of the points on the line
        pointHoverRadius: 7, // Size of points on hover
      },
    ],
  };

  // Line chart options
  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: false,
          text: "Date",
        },
      },
      y: {
        title: {
          display: false,
          text: "Number of Disasters",
        },
      },
    },
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg ">
      <div className="mt-4">
        <Line data={lineChartData} options={options} />
      </div>
    </div>
  );
};

export default DisasterLineChart;
