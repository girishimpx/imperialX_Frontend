import React, { Component, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import TradingViewWidget from "./TradingViewWidget";
import Button from "@mui/material/Button";
import "./AreaChart.css";
let ws = new WebSocket("wss://ws.okex.com:8443/ws/v5/public?brokerId=197");
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

let btcx = [];
let btcy = [];

let ethx = [];
let ethy = [];

let xprx = [];
let xpry = [];

let dashx = [];
let dashy = [];

const AreaChartFunction = (props) => {
  const { hoverData, tradelistdata, balance } = props;
  console.log("🚀 ~ file: AreaChart.js:34 ~ AreaChartFunction ~ tradelistdata:", tradelistdata)
  console.log("🚀 ~ file: AreaChart.js:34 ~ AreaChartFunction ~ hoverData:", hoverData)

  const [btc, setBtc] = useState();
  const [eth, setEth] = useState();
  const [xpr, setxrp] = useState();
  const [dash, setdash] = useState();

  const findPercentage = (lp, op) => {
    let increase = lp - op;
    let price_change = (increase / op) * 100;
    return price_change.toFixed(2).toLocaleString();
  };

  const updategraphcoordinate = () => {
    if (tradelistdata[0]) {
      for (let i = 0; i < tradelistdata.length; i++) {
        let xaxis = Number(tradelistdata[i]?.idxPx);

        if (i == 0) {
          if (btcy.length > 300000) {
            btcy.shift();
            btcy.push(xaxis);
          } else {
            if (btcy.length <= 0) {
              btcy.push(xaxis);
            } else {
              btcy.push(xaxis);
            }
          }

          if (btcx.length > 300000) {
            btcx.shift();
            btcx.push(new Date().toISOString());
          } else {
            if (btcx.length <= 0) {
              btcx.push(new Date().toISOString());
            } else {
              btcx.push(new Date().toISOString());
            }
          }
        } else if (i == 1) {
          if (ethy.length > 300000) {
            ethy.shift();
            ethy.push(xaxis);
          } else {
            if (ethy.length <= 0) {
              ethy.push(xaxis);
            } else {
              ethy.push(xaxis);
            }
          }

          if (ethx.length > 300000) {
            ethx.shift();
            ethx.push(new Date().toISOString());
          } else {
            if (ethx.length <= 0) {
              ethx.push(new Date().toISOString());
            } else {
              ethx.push(new Date().toISOString());
            }
          }
        } else if (i == 2) {
          if (xpry.length > 300000) {
            xpry.shift();
            xpry.push(xaxis);
          } else {
            if (xpry.length <= 0) {
              xpry.push(xaxis);
            } else {
              xpry.push(xaxis);
            }
          }

          if (xprx.length > 300000) {
            xprx.shift();
            xprx.push(new Date().toISOString());
          } else {
            if (xprx.length <= 0) {
              xprx.push(new Date().toISOString());
            } else {
              xprx.push(new Date().toISOString());
            }
          }
        } else if (i == 3) {
          if (dashy.length > 300000) {
            dashy.shift();
            dashy.push(xaxis);
          } else {
            if (dashy.length <= 0) {
              dashy.push(xaxis);
            } else {
              dashy.push(xaxis);
            }
          }

          if (dashx.length > 300000) {
            dashx.shift();
            dashx.push(new Date().toISOString());
          } else {
            if (dashx.length <= 0) {
              dashx.push(new Date().toISOString());
            } else {
              dashx.push(new Date().toISOString());
            }
          }
        }
      }
    }
  };

  updategraphcoordinate();

  return (
    <div className="area-chart">
      <div className="row">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0} className="flex-box-option">
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Item className="tradingview-pricechart">
                <h3 className="price-usd">
                  {hoverData
                    ?
                    //  `$ ${hoverData && tradelistdata[0]?.idxPx
                    //   ? Number(
                    //     hoverData == "BTC-USDT"
                    //       ? tradelistdata[0]?.idxPx
                    //       : hoverData == "ETH-USDT"
                    //         ? tradelistdata[1]?.idxPx
                    //         : hoverData == "LTC-USDT"
                    //           ? tradelistdata[3]?.idxPx
                    //           : hoverData == "XRP-USDT"
                    //             ? tradelistdata[2]?.idxPx
                    //             : 0
                    //   ).toLocaleString()
                    //   : tradelistdata[0]?.idxPx
                    //     ? tradelistdata[0]?.idxPx
                    //     : "0"
                    // }`
                    `$ ${hoverData && tradelistdata[0]?.idxPx
                      ? Number(
                        hoverData == "BTC-USDT"
                          ? balance[0] ? Number(balance[0]) * 87 : 0
                          : hoverData == "ETH-USDT"
                            ? balance[1] ? Number(balance[1]) * 87 : 0
                            : hoverData == "LTC-USDT"
                              ? balance[3] ? Number(balance[3]) * 87 : 0
                              : hoverData == "XRP-USDT"
                                ? balance[2] ? Number(balance[2]) * 87 : 0
                                : 0
                      ).toFixed(4)
                      : tradelistdata[0]?.idxPx
                        ? tradelistdata[0]?.idxPx
                        : "0"
                    }`
                    : tradelistdata[0]?.idxPx
                      ? `$ ${tradelistdata[0]?.idxPx}`
                      : `$ 0`}{" "}
                  {hoverData ? hoverData.split("-")[1] : "USDT"}
                </h3>

                <span
                  style={{
                    color: `${hoverData && tradelistdata[0]?.idxPx
                      ? findPercentage(
                        Number(
                          hoverData == "BTC-USDT"
                            ? tradelistdata[0]?.idxPx
                            : hoverData == "ETH-USDT"
                              ? tradelistdata[1]?.idxPx
                              : hoverData == "LTC-USDT"
                                ? tradelistdata[3]?.idxPx
                                : hoverData == "XRP-USDT"
                                  ? tradelistdata[2]?.idxPx
                                  : 0
                        ),
                        Number(
                          hoverData == "BTC-USDT"
                            ? tradelistdata[0]?.open24h
                            : hoverData == "ETH-USDT"
                              ? tradelistdata[1]?.open24h
                              : hoverData == "LTC-USDT"
                                ? tradelistdata[3]?.open24h
                                : hoverData == "XRP-USDT"
                                  ? tradelistdata[2]?.open24h
                                  : 0
                        )
                      ) >= 0
                        ? "#10D876"
                        : "red"
                      : tradelistdata[0]?.idxPx
                        ? Number(tradelistdata[0]?.idxPx) -
                          Number(tradelistdata[0]?.open24h) >=
                          0
                          ? "#10D876"
                          : "red"
                        : "#10D876"
                      }`,
                  }}
                  className="compare-percentage"
                >
                  {`${hoverData && tradelistdata[0]?.idxPx
                    ? (
                      Number(
                        hoverData == "BTC-USDT"
                          ? tradelistdata[0]?.idxPx
                          : hoverData == "ETH-USDT"
                            ? tradelistdata[1]?.idxPx
                            : hoverData == "LTC-USDT"
                              ? tradelistdata[3]?.idxPx
                              : hoverData == "XRP-USDT"
                                ? tradelistdata[2]?.idxPx
                                : 0
                      ) -
                      Number(
                        hoverData == "BTC-USDT"
                          ? tradelistdata[0]?.open24h
                          : hoverData == "ETH-USDT"
                            ? tradelistdata[1]?.open24h
                            : hoverData == "LTC-USDT"
                              ? tradelistdata[3]?.open24h
                              : hoverData == "XRP-USDT"
                                ? tradelistdata[2]?.open24h
                                : 0
                      )
                    ).toFixed(3)
                    : tradelistdata[0]
                      ? (
                        Number(tradelistdata[0]?.idxPx) -
                        Number(tradelistdata[0]?.open24h)
                      ).toFixed(3)
                      : "0"
                    } USDT`}{" "}
                  <span>{` (${hoverData && tradelistdata[0]?.idxPx
                    ? `${findPercentage(
                      Number(
                        hoverData == "BTC-USDT"
                          ? tradelistdata[0]?.idxPx
                          : hoverData == "ETH-USDT"
                            ? tradelistdata[1]?.idxPx
                            : hoverData == "XRP-USDT"
                              ? tradelistdata[2]?.idxPx
                              : hoverData == "LTC-USDT"
                                ? tradelistdata[3]?.idxPx
                                : 0
                      ),
                      Number(
                        hoverData == "BTC-USDT"
                          ? tradelistdata[0]?.open24h
                          : hoverData == "ETH-USDT"
                            ? tradelistdata[1]?.open24h
                            : hoverData == "XRP-USDT"
                              ? tradelistdata[2]?.open24h
                              : hoverData == "LTC-USDT"
                                ? tradelistdata[3]?.open24h
                                : 0
                      )
                    )}%`
                    : btc
                      ? `${findPercentage(
                        Number(tradelistdata[0]?.idxPx),
                        Number(tradelistdata[0]?.open24h)
                      )}%`
                      : tradelistdata[0]?.idxPx
                        ? `${findPercentage(
                          Number(tradelistdata[0]?.idxPx),
                          Number(tradelistdata[0]?.open24h)
                        )}%`
                        : `0%`
                    })`}</span>
                </span>
              </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Item
                className="tradingview-buttons"
                style={{ cursor: "default" }}
              >
                <div className="periodic-buttons" style={{ cursor: "default" }}>
                  <Button style={{ cursor: "default" }} variant="outlined">
                    {hoverData ? hoverData.split("-")[0] : "BTC"}
                  </Button>
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>

        <div id="chart">
          <ReactApexChart
            options={{
              chart: {
                height: 350,
                type: "area",
                toolbar: {
                  show: true,
                },

                stacked: true,
              },
              grid: {
                show: false,
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "smooth",
              },
              yaxis: {
                min:
                  hoverData && tradelistdata[0] && tradelistdata[1] && tradelistdata[2] && tradelistdata[3]
                    ? hoverData == "BTC-USDT"
                      ? btcy.length > 0
                        ? Math.max(...btcy) -
                        (Math.max(...btcy) - Math.min(...btcy) + 1)
                        : 0
                      : hoverData == "ETH-USDT"
                        ? ethy.length > 0
                          ? Math.max(...ethy) -
                          (Math.max(...ethy) - Math.min(...ethy) + .5)
                          : 0
                        : hoverData == "XRP-USDT"
                          ? xpry.length > 0
                            ? Math.max(...xpry) -
                            (Math.max(...xpry) - Math.min(...xpry) + .0005)
                            : 0
                          : dashy.length > 0
                            ? Math.max(...dashy) -
                            (Math.max(...dashy) - Math.min(...dashy) + .5)
                            : 0
                    : btcy.length > 0
                      ? Math.max(...btcy) -
                      (Math.max(...btcy) - Math.min(...btcy) + 1)
                      : 10,

                // Minimum value for Y-axis
                max:
                  hoverData && tradelistdata[0] && tradelistdata[1] && tradelistdata[2] && tradelistdata[3]
                    ? hoverData == "BTC-USDT"
                      ? btcy.length > 0
                        ? Math.max(...btcy) +
                        (Math.max(...btcy) - Math.min(...btcy) + 1)
                        : 0
                      : hoverData == "ETH-USDT"
                        ? ethy.length > 0
                          ? Math.max(...ethy) +
                          (Math.max(...ethy) - Math.min(...ethy) + .5)
                          : 0
                        : hoverData == "XRP-USDT"
                          ? xpry.length > 0
                            ? Math.max(...xpry) +
                            (Math.max(...xpry) - Math.min(...xpry) + .0005)
                            : 0
                          : dashy.length > 0
                            ? Math.max(...dashy) +
                            (Math.max(...dashy) - Math.min(...dashy) + .5)
                            : 0
                    : btcy.length > 0
                      ? Math.max(...btcy) +
                      (Math.max(...btcy) - Math.min(...btcy) + 1)
                      : 200,
              },

              xaxis: {
                type: "datetime",
                categories: hoverData
                  ? hoverData == "BTC-USDT"
                    ? btcx
                    : hoverData == "ETH-USDT"
                      ? ethx
                      : hoverData == "XRP-USDT"
                        ? xprx
                        : dashx
                  : btcx.length > 80000
                    ? btcx
                    : [
                      "2018-09-19T00:00:00.000Z",
                      "2018-09-19T01:30:00.000Z",
                      "2018-09-19T02:30:00.000Z",
                      "2018-09-19T03:30:00.000Z",
                      "2018-09-19T04:30:00.000Z",
                      "2018-09-19T05:30:00.000Z",
                      "2018-09-19T06:30:00.000Z",
                    ],
              },
              tooltip: {
                x: {
                  format: "dd/MM/yy HH:mm",
                },
              },
            }}
            series={[
              {
                data: hoverData
                  ? hoverData == "BTC-USDT"
                    ? btcy
                    : hoverData == "ETH-USDT"
                      ? ethy
                      : hoverData == "XRP-USDT"
                        ? xpry
                        : dashy
                  : btcy.length > 80000
                    ? btcy
                    : [31, 40, 28, 51, 42, 109, 100],
              },
            ]}
            type="area"
            height={350}
          />
        </div>
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} className="flex-box-options">
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Item className="tradingviewcls">
              <p className="welcome-msg option-label">24hr Volume</p>

              <span className="option-value">{`${hoverData && tradelistdata[0]
                ? `${hoverData == "BTC-USDT"
                  ? tradelistdata[0]?.open24h
                  : hoverData == "ETH-USDT"
                    ? tradelistdata[1]?.open24h
                    : hoverData == "XRP-USDT"
                      ? tradelistdata[2]?.open24h
                      : hoverData == "LTC-USDT"
                        ? tradelistdata[3]?.open24h
                        : "0"
                } USDT`
                : "0 USDT"
                }`}</span>
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Item className="tradingviewcls">
              <p className="welcome-msg option-label">Market Cap</p>
              <span className="option-value">19B USD</span>
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Item className="tradingviewcls">
              <p className="welcome-msg option-label">Circulating</p>
              <span className="option-value">{`${hoverData && tradelistdata[0]
                ? `${hoverData == "BTC-USDT"
                  ? tradelistdata[0]?.ts
                  : hoverData == "ETH-USDT"
                    ? tradelistdata[1]?.ts
                    : hoverData == "XRP-USDT"
                      ? tradelistdata[2]?.ts
                      : hoverData == "LTC-USDT"
                        ? tradelistdata[3]?.ts
                        : ""
                } ${hoverData.split("-")[0]}`
                : "0 USDT"
                }`}</span>
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Item className="tradingviewcls">
              <p className="welcome-msg option-label">All Time High</p>
              <span className="option-value">19.783.06 USD</span>
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Item className="tradingviewcls">
              <p className="welcome-msg option-label">Typical hold</p>
              <span className="option-value">88 days</span>
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Item className="tradingviewcls">
              <p className="welcome-msg option-label">Trading activity</p>
              <span className="option-value">70% buy</span>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AreaChartFunction;
