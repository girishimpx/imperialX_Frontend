import React, { Component, } from "react";
import ReactApexChart  from "react-apexcharts";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
class Tradepairpiechart extends React.Component {
    constructor(props) {
      super(props);


      this.state = {
      
        series: [49.01],
        

        options: {
          chart: {
            height: 250,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '80',
              }
            },
          },
          labels: ['1569 trades'],
          colors:['#03FFD2'],
        },
      
      
      };
    }

  

    render() {
      return (
       
 
     <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
         <div id="chart2">
        <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={250} />
         </div>
         <p className="coin-head">BTC - USDT</p>
         <p className="coin-name">Bitcoin - Tether</p>
     </Grid>

    
      );
    }
  }

  export default Tradepairpiechart;