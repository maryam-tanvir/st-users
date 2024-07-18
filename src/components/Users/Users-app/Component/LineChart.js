// import React, { useState, useEffect } from "react";
// import ReactApexChart from "react-apexcharts";

// const LineChart = () => {
//   const [series, setSeries] = useState([]);
//   const [options, setOptions] = useState({});

//   useEffect(() => {
//     const fetchChartData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/crud");
//         const data = await response.json();

//         if (Array.isArray(data)) {
//           const yesData = data.filter((item) => item.active_flag === "Yes");
//           const noData = data.filter((item) => item.active_flag === "No");

//           const formatDate = (dateString) => {
//             const [month, day, year] = dateString.split("/");
//             return new Date(year, month - 1, day); // JavaScript Date month is 0-based
//           };

//           const chartData = {
//             series: [
//               {
//                 name: "Yes",
//                 data: yesData.map((item) => formatDate(item.lead_date)), // Convert LeadDate to Date objects
//               },
//               {
//                 name: "No",
//                 data: noData.map((item) => formatDate(item.lead_date)), // Convert LeadDate to Date objects
//               },
//             ],
//             options: {
//               chart: {
//                 type: "line", // Line chart
//               },
//               xaxis: {
//                 type: "datetime", // Specify x-axis type as datetime for dates
//               },
//               yaxis: {
//                 title: {
//                   text: "Number of Leads",
//                 },
//               },
//               title: {
//                 text: "Active Flag by Lead Date",
//               },
//             },
//           };

//           setSeries(chartData.series);
//           setOptions(chartData.options);
//         } else {
//           console.error("Error: Data is not an array");
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchChartData();
//   }, []);

//   return (
//     <React.Fragment>
//       {options && (
//         <ReactApexChart
//           options={options}
//           series={series}
//           type="line"
//           height={350}
//           className="apex-charts"
//         />
//       )}
//     </React.Fragment>
//   );
// };

// export default LineChart;

// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Loading data...</p>;
  }

  const chartData = {
    labels: data.map((item) => item.lead_date), // X-axis labels (Lead Date)
    datasets: [
      {
        label: 'Lead Price',
        data: data.map((item) => item.lead_price), // Y-axis data (Lead Price)
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
      <h2>Lead Price Over Time</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
