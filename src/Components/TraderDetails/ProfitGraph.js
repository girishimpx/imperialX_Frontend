import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Query from "../../images/query.svg";
import graphLock from "../../images/graph-lock.svg";

class ProfitGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      options: {
        chart: {
          height: 250,
          type: "line",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          colors: "#25DEB0",
        },
        title: {
          text: "1 Jun 2022 - 29 Apr 2023",
          align: "left",
          style: {
            color: "#fff",
          },
        },
        grid: {
          show: false,
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
          labels: {
            style: {
              colors: "#fff",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#fff",
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div id="chart" className="profit-chart-graph">
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                height={210}
              />
            </div>
            <div className="graph-btm first">
            <div className="btm">
              <label>twr profit &nbsp;</label>
              <div><img src={Query} alt="Query" /></div>
            </div>
            <div className="btm">
              <label>max drawdown &nbsp;</label>
              <div><img src={Query} alt="Query" /></div>
            </div>
            </div>
            <div className="graph-btm two">
            <div className="btm">
              <label className="dif-rate">+60.96%</label>
            </div>
            <div className="btm">
              <div><img src={graphLock} alt="graphLock" /></div>
            </div>
            </div>

          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default ProfitGraph;
