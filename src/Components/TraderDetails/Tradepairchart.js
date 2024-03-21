import React, { Component, } from "react";
import ReactApexChart  from "react-apexcharts";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tradepairpiechart from "./Tradepairpiechart";
class Tradepairchart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [59.01],
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
      <div className="chart-cnt">
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <div id="chart">
      <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={250} />
      </div>
      <p className="coin-head">ETH - USDT</p>
      <p className="coin-name">Ethereum - Tether</p>
      </Grid>

      <Tradepairpiechart />
      </Grid>
      </Box>
      </div>
      );
    }
  }
  export default Tradepairchart