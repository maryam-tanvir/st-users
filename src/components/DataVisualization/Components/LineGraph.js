// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Loading data...</p>;
  }

  const chartData = {
    labels: data.map((item) => item.battle_date), // X-axis labels (Lead Date)
    datasets: [
      {
        label: 'Profit and Loss',
        data: data.map((item) => item.profit_and_loss), // Y-axis data (Lead Price)
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjust blue for price
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <h2>Profit and Loss Over Time</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
