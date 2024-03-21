import React, { Component, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const LongShort = ({ feedData }) => {


  const [a,seta] = useState([])
  const [b,setb] = useState([])

  


  const [series, setSeries] = useState([
    {
      name: `Earn percentage `,
      
      data: feedData[0]   
    },
  ]);
  const [options, setoption] = useState({
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      stacked: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },

    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {  
          show: false,
        },
      },
    },
    xaxis: {
      categories:feedData[1],
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
  });

  





  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LongShort;
