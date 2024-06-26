// import React, { Component } from 'react'
// import ReactApexChart from "react-apexcharts";

// class BTCBasis extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {

//       series: [{
//         name: 'Spot',
//         data: [31, 40, 28, 51, 42, 109, 100]
//       }, {
//         name: 'Margin',
//         data: [11, 32, 45, 32, 34, 52, 41]
//       },
//       {
//         name: "Future",
//         data: [22, 25, 23, 22, 20, 22, 22]
//       },
//       ],
//       options: {
//         chart: {
//           height: 240,
//           type: 'area',
//           toolbar: {
//             show: false
//           }
//         },
//         grid: {
//           xaxis: {
//             lines: {
//               show: false
//             }
//           },
//           yaxis: {
//             lines: {
//               show: false
//             }
//           }
//         },
//         dataLabels: {
//           enabled: false
//         },
//         stroke: {
//           curve: 'smooth'
//         },
//         // xaxis: {
//         //   type: 'datetime',
//         //   categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
//         //   labels: {
//         //     style: {
//         //       colors: '#ffffff'
//         //     }
//         //   }
//         // },
//         xaxis: {
//           type: 'date',
//           categories: this.props.feedData[1]
//             .map(dateString => {
//               // const date = new Date(dateString);
//               // return !isNaN(date) ? date.toISOString() : "";
//               const date = dateString
//               return !isNaN(date) ? date : "";
//             })
//             .filter(date => date !== ""),
//           labels: {
//             style: {
//               colors: '#ffffff'
//             }
//           }
//         },
//         yaxis: {
//           labels: {
//             style: {
//               colors: '#ffffff'
//             }
//           }
//         },
//         tooltip: {
//           x: {
//             format: 'dd/MM/yy HH:mm'
//           },
//         },
//       },


//     };
//   }




//   render() {
//     { console.log(this.props.feedData[1].map(dateString => dateString), 'this.props.feedData[1]') }
//     return (

//       <div id="chart">
//         <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={240} />
//       </div>


//     );
//   }
// }

import React, { Component, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const BTCBasis = ({ feedData }) => {

  // console.log(feedData, 'feeddatas');
  const [a, seta] = useState([])
  const [b, setb] = useState([])




  const [series, setSeries] = useState([
    {
      name: 'Spot',
      // data: [31, 40, 28, 51, 42, 109, 100]
      data: feedData[3] ? feedData[3] : 0
    },
    {
      name: 'Margin',
      // data: [11, 32, 45, 32, 34, 52, 41]
      data: feedData[2] ? feedData[2] : 0

    },
    {
      name: "Future",
      // data: [22, 25, 23, 22, 20, 22, 22]
      data: feedData[1] ? feedData[1] : 0

    }

  ]);

  // console.log(series, 'setseries');
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
      categories: feedData[0],
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
        type="area"
        height={240}
      />
    </div>
  );
};



export default BTCBasis
