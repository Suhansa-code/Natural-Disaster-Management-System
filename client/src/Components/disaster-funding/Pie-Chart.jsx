import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DisasterPieChart = ({ data }) => {
  // Sample dataset
  const disasterData = {
    labels:
      data && data.length > 0 ? data.map((disaster) => disaster.type) : [],
    datasets: [
      {
        data:
          data && data.length > 0 ? data.map((disaster) => disaster.count) : [], // count of each disaster type
        backgroundColor: [
          "rgba(255, 87, 51, 0.7)", // Earthquake
          "rgba(51, 255, 87, 0.7)", // Flood
          "rgba(51, 87, 255, 0.7)", // Hurricane
          "rgba(255, 51, 166, 0.7)", // Tornado
          "rgba(255, 150, 51, 0.7)", // Wildfire
          "rgba(179, 179, 179, 0.7)", // Others
        ],
        borderColor: [
          "rgba(255, 87, 51, 1)", // Earthquake
          "rgba(51, 255, 87, 1)", // Flood
          "rgba(51, 87, 255, 1)", // Hurricane
          "rgba(255, 51, 166, 1)", // Tornado
          "rgba(255, 150, 51, 1)", // Wildfire
          "rgba(179, 179, 179, 1)", // Others
        ],
        borderWidth: 2, // Add border for a cleaner look
        hoverOffset: 6, // Make hover effect more noticeable
        hoverBorderWidth: 3, // Add border to hover effect
      },
    ],
  };

  // Chart options to position legends under the chart and improve look
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // Move legend to the bottom
        labels: {
          font: {
            family: "Poppins", // Modern font for legend
            size: 12, // Font size for legends
          },
          padding: 20, // Space between legend items
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)", // Modern tooltip background
        titleColor: "#fff", // Title color for tooltip
        bodyColor: "#fff", // Body text color for tooltip
        borderColor: "#333", // Tooltip border color
        borderWidth: 1, // Tooltip border width
      },
      title: {
        display: false, // Disable title if not needed
      },
    },
  };

  return (
    <div className="bg-white p-2 ">
      <div className="mt-4">
        <Pie data={disasterData} options={options} />
      </div>
    </div>
  );
};

export default DisasterPieChart;
