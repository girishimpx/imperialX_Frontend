import React, { Component, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const LongShort = ({ feedData }) => {
  // console.log(feedData, 'feedData');

  const [a, seta] = useState([])
  const [b, setb] = useState([])

  const minPrice = Math.min(...feedData[2]);
  const maxPrice = Math.max(...feedData[2]);

  const [series, setSeries] = useState([
    // {
    //   name: `Earn percentage `,
    //   data: feedData?.[0] == "NaN" ? 0 : feedData[0]
    // },
    {
      name: 'Price',
      data: feedData?.[2]
    },
  ]);

  // console.log(feedData?.[2], 'setseries');
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
      categories: feedData?.[1],
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    yaxis: {
      // categories: feedData[2],
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
      min: minPrice,
      max: maxPrice
    },
  });


  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={240}
      />
    </div>
  );
};

export default LongShort;
