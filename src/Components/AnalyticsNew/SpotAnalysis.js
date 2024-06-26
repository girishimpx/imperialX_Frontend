import React, { Component } from 'react'
import ReactApexChart from "react-apexcharts";

class SpotAnalysis extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [
        {
          name: "High - 2013",
          data: [18, 19, 23, 26, 22, 22, 23]
        },
        {
          name: "Low - 2013",
          data: [12, 11, 14, 18, 17, 13, 13]
        },
      ],
      options: {
        chart: {
          height: 200,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#25deb0', '#0382de'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight'
        },
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
        },
        markers: {
          size: 1
        },
        xaxis: {
          // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          categories: this.props.feedData,

          // title: {
          //   text: 'Month'
          // },
          labels: {
            style: {
              colors: '#ffffff'
            }
          }
        },
        yaxis: {
          // title: {
          //   text: 'Temperature'
          // },
          min: 5,
          max: 30,
          labels: {
            style: {
              colors: '#ffffff'
            }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },


    };
  }



  render() {
    // console.log(this.props.feedData, 'spotanalysis');
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={240} />
      </div>


    );
  }
}

export default SpotAnalysis