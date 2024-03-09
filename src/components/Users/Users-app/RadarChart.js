import React from "react";
import ReactApexChart from "react-apexcharts";

const RadarChart = () => {
    const series = [{
        name: "Series 1",
        data: [400, 500, 600, 700, 800, 900],
      }];
    const options = {   
        chart: {
        toolbar: {
          show: !1
        }
      },
      stroke: {
          colors:["#038edc"]
      },
      xaxis: {
        categories: ["User1", "User2", "User3", "User4", "User5", "User6"]
      }
      };

  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="radar"
        height={1000}
      />
    </React.Fragment>
  );
};

export default RadarChart;
