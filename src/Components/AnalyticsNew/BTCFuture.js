// import React, { Component } from 'react'
// import ReactApexChart from "react-apexcharts";

// class BTCFuture extends React.Component {
//     constructor(props) {
//       super(props);

//       this.state = {
      
//         series: [{
//           data: [
//             ["120820202",30.95],
//             [1327446000000,31.34],
//             [1327532400000,31.18],
          
//           ]
//         }],
//         options: {
//           chart: {
//             id: 'area-datetime',
//             type: 'area',
//             height: 240,
//             zoom: {
//               autoScaleYaxis: true
//             },
//             toolbar: {
//                 show: false
//               }
//           },
//           annotations: {
//             yaxis: [{
//               y: 30,
//               borderColor: '#999',
//               label: {
//                 show: true,
//                 text: 'Support',
//                 style: {
//                   color: "#fff",
//                   background: '#00E396'
//                 }
//               }
//             }],
//             xaxis: [{
//               x: new Date('14 Nov 2012').getTime(),
//               borderColor: '#999',
//               yAxisIndex: 0,
//               label: {
//                 show: true,
//                 text: 'Rally',
//                 style: {
//                   color: "#fff",
//                   background: '#775DD0'
//                 }
//               }
//             }]
//           },
//           dataLabels: {
//             enabled: false
//           },
//           markers: {
//             size: 0,
//             style: 'hollow',
//           },
//           xaxis: {
//             type: 'datetime',
//             min: new Date('01 Mar 2012').getTime(),
//             tickAmount: 6,
//           },
//           tooltip: {
//             x: {
//               format: 'dd MMM yyyy'
//             }
//           },
//           fill: {
//             type: 'gradient',
//             gradient: {
//               shadeIntensity: 1,
//               opacityFrom: 0.7,
//               opacityTo: 0.9,
//               stops: [0, 100]
//             }
//           },
//           grid: {
//             xaxis: {
//                 lines: {
//                     show: false
//                 }
//             },   
//             yaxis: {
//                 lines: {
//                     show: false
//                 }
//             }
//           },
//           xaxis: {
//             labels: {
//                 style: {
//                 colors: '#ffffff'
//                 }
//             }
//         },
//         yaxis: {
//             labels: {
//                 style: {
//                 colors: '#ffffff'
//                 }
//             }
//         }
//         },
      
      
//         selection: 'one_year',
      
//       };
//     }

  
//     updateData(timeline) {
//       this.setState({
//         selection: timeline
//       })
    
//       switch (timeline) {
//         case 'one_month':
//           BTCFuture.exec(
//             'area-datetime',
//             'zoomX',
//             new Date('28 Jan 2013').getTime(),
//             new Date('27 Feb 2013').getTime()
//           )
//           break
//         case 'six_months':
//           BTCFuture.exec(
//             'area-datetime',
//             'zoomX',
//             new Date('27 Sep 2012').getTime(),
//             new Date('27 Feb 2013').getTime()
//           )
//           break
//         case 'one_year':
//           BTCFuture.exec(
//             'area-datetime',
//             'zoomX',
//             new Date('27 Feb 2012').getTime(),
//             new Date('27 Feb 2013').getTime()
//           )
//           break
//         case 'ytd':
//           BTCFuture.exec(
//             'area-datetime',
//             'zoomX',
//             new Date('01 Jan 2013').getTime(),
//             new Date('27 Feb 2013').getTime()
//           )
//           break
//         case 'all':
//           BTCFuture.exec(
//             'area-datetime',
//             'zoomX',
//             new Date('23 Jan 2012').getTime(),
//             new Date('27 Feb 2013').getTime()
//           )
//           break
//         default:
//       }
//     }
  

//     render() {
//       return (
        

//   <div id="chart">

// <div id="chart-timeline">
// <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
// </div>
// </div>


//       );
//     }
//   }


// export default BTCFuture


// import React, { Component } from 'react'
// import ReactApexChart from "react-apexcharts";

// class BTCFuture extends React.Component {
//     constructor(props) {
//       super(props);

//       this.state = {
      
//         series: [
//           {
//             name: "High - 2013",
//             data: [5, 19, 5, 26, 7, 22, 5]
//           },
//           {
//             name: "Low - 2013",
//             data: [5, 30, 6, 18, 7, 13, 7]
//           },
//         ],
//         options: {
//           chart: {
//             height: 200,
//             type: 'line',
//             dropShadow: {
//               enabled: true,
//               color: '#000',
//               top: 18,
//               left: 7,
//               blur: 10,
//               opacity: 0.2
//             },
//             toolbar: {
//               show: false
//             }
//           },
//           colors: ['#25deb0', '#ea0d3e'],
//           dataLabels: {
//             enabled: false,
//           },
//           stroke: {
//             curve: 'straight'
//           },
//           grid: {
//             borderColor: '#e7e7e7',
//             xaxis: {
//                 lines: {
//                     show: false
//                 }
//             },   
//             yaxis: {
//                 lines: {
//                     show: false
//                 }
//             }
//           },
//           markers: {
//             size: 1
//           },
//           xaxis: {
//             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//             labels: {
//                 style: {
//                 colors: '#ffffff'
//                 }
//             }
//           },
//           yaxis: {
//             min: 5,
//             max: 35,
//             labels: {
//                 style: {
//                 colors: '#ffffff'
//                 }
//             }
//           },
//           legend: {
//             position: 'top',
//             horizontalAlign: 'right',
//             floating: true,
//             offsetY: -25,
//             offsetX: -5
//           }
//         },
      
      
//       };
//     }

  

//     render() {
//       return (
        

//   <div id="chart">
// <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={240} />
// </div>


//       );
//     }
//   }

//   export default BTCFuture



import React from 'react';
import Chart from 'react-apexcharts';

function BTCFuture() {
  const chartData = {
    options: {
      chart: {
        id: 'combined-chart',
        toolbar: {               
          show: false             
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '3px', // Adjust the width of the bars as needed (e.g., '50%', '70px', etc.)
          strokeWidth: 2
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        labels: {
              style: {
                colors: '#ffffff'
                }
        }
      },
      yaxis: {
        min: 5,
        max: 35,
        labels: {
            style: {
            colors: '#ffffff'
            }
        }
      },
      colors: ['#00E396', '#FF4560', '#00E396'],
      grid: {
        borderColor: '#e7e7e7',
          xaxis: {
              lines: {
                  show: false
              }
          },   
          yaxis: {
              lines: {
                  show: false
              }
          }
        }
    },
    series: [
      {
        name: 'Series 1',
        type: 'line',
        data: [5, 30, 5, 26, 5, 22, 5],
      },
      {
        name: 'Series 2',
        type: 'line',
        data: [10, 30, 10, 18, 7, 10, 7],
      },
      {
        name: 'Trading',
        type: 'bar',
        data: [10, 15, 20, 35, 20, 15, 10],
      },
    ],
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={250}
      />
    </div>
  );
}

export default BTCFuture;
