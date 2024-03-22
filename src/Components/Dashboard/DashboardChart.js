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
import Axios from "../../Axios";
import { useParams } from 'react-router-dom';


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

const DashboardChartFunction = (props) => {
//   const { hoverData, balance } = props;
//   console.log("🚀 ~ file: AreaChart.js:34 ~ DashboardChartFunction ~ tradelistdata:", tradelistdata)
  const ws = new WebSocket("wss://ws.okex.com:8443/ws/v5/public?brokerId=197");
//   const [btc, setBtc] = useState();
//   const [eth, setEth] = useState();
//   const [xpr, setxrp] = useState();
//   const [dash, setdash] = useState();
let { id } = useParams(); 
// console.log(id,'id')

const [hoverData,setHoverData] = useState("BTC-USDT")



  const [btc, setBtc] = useState();
  const [eth, setEth] = useState();
  const [xpr, setxrp] = useState();
  const [dash, setdash] = useState();
  const [btc1, setBtc1] = useState();
  const [eth1, setEth1] = useState();
  const [xpr1, setxrp1] = useState();
  const [ltc, setLtc] = useState();
  const [totalBalance, setTotalBalance] = useState();
  const [hoverdata, sethover] = useState();

  const [tradelistdata, setTradeListdata] = useState([])
//   const [tradelistdata1, setTradeListdata1] = useState([])
  useEffect(()=>{
    if(btc !== undefined){
        // var arr = [...tradelistdata,btc]
        setTradeListdata([btc])
        // setTradeListdata1(arr)
    }
  },[btc])

  useEffect(()=>{
    setHoverData(id)
    setDatas({
        op: "subscribe",
        args: [
          {
            channel: "index-tickers",
            instId: id,
          },
        ],
    })
  },[id])


  const [datas,setDatas] =useState({})


  const Ticker = () => {
    // console.log(datas,"datas")
    ws.onopen = (event) => {
      ws.send(JSON.stringify(datas));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      try {
        // console.log(response,"egaryugeufg")
        if (response?.arg?.instId === "BTC-USDT") {
          setBtc(response?.data[0]);
        }
         else if (response?.arg?.instId == "ETH-USDT") {
            setBtc(response?.data[0]);
        } else if (response?.arg?.instId == "XRP-USDT") {
            setBtc(response?.data[0]);
        } else if (response?.arg?.instId == "LTC-USDT") {
            setBtc(response?.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
  };
  
  useEffect(() => {
    if(datas != undefined){
        Ticker();
    }

    return () => {
      ws.close(); // Close the WebSocket connection on unmount
    };
  }, [datas]);

  const updategraphcoordinate = () => {
    // console.log(tradelistdata,"checkss")
    if (tradelistdata[0]) {
      for (let i = 0; i < tradelistdata.length; i++) {
        let xaxis = Number(tradelistdata[i]?.idxPx);
        // console.log(xaxis,"xaxis")
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
        }
        //  else if (i == 1) {
        //   if (ethy.length > 300000) {
        //     ethy.shift();
        //     ethy.push(xaxis);
        //   } else {
        //     if (ethy.length <= 0) {
        //       ethy.push(xaxis);
        //     } else {
        //       ethy.push(xaxis);
        //     }
        //   }

        //   if (ethx.length > 300000) {
        //     ethx.shift();
        //     ethx.push(new Date().toISOString());
        //   } else {
        //     if (ethx.length <= 0) {
        //       ethx.push(new Date().toISOString());
        //     } else {
        //       ethx.push(new Date().toISOString());
        //     }
        //   }
        // } else if (i == 2) {
        //   if (xpry.length > 300000) {
        //     xpry.shift();
        //     xpry.push(xaxis);
        //   } else {
        //     if (xpry.length <= 0) {
        //       xpry.push(xaxis);
        //     } else {
        //       xpry.push(xaxis);
        //     }
        //   }

        //   if (xprx.length > 300000) {
        //     xprx.shift();
        //     xprx.push(new Date().toISOString());
        //   } else {
        //     if (xprx.length <= 0) {
        //       xprx.push(new Date().toISOString());
        //     } else {
        //       xprx.push(new Date().toISOString());
        //     }
        //   }
        // } else if (i == 3) {
        //   if (dashy.length > 300000) {
        //     dashy.shift();
        //     dashy.push(xaxis);
        //   } else {
        //     if (dashy.length <= 0) {
        //       dashy.push(xaxis);
        //     } else {
        //       dashy.push(xaxis);
        //     }
        //   }

        //   if (dashx.length > 300000) {
        //     dashx.shift();
        //     dashx.push(new Date().toISOString());
        //   } else {
        //     if (dashx.length <= 0) {
        //       dashx.push(new Date().toISOString());
        //     } else {
        //       dashx.push(new Date().toISOString());
        //     }
        //   }
        // }
      }
    }
  };

//   useEffect(()=>{
//     console.log(tradelistdata,"sadfsdfgasdf")
//     if(tradelistdata != undefined ){
        updategraphcoordinate();
//     }
//   },[tradelistdata])


  return (
    <div className="area-chart">
      <div className="row">

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
                  hoverData && tradelistdata[0]
                    ? hoverData == "BTC-USDT"
                      ? btcy.length > 0
                        ? Math.max(...btcy) -
                        (Math.max(...btcy) - Math.min(...btcy) + 1)
                        : 0
                      : hoverData == "ETH-USDT"
                        ? btcy.length > 0
                          ? Math.max(...btcy) -
                          (Math.max(...btcy) - Math.min(...btcy) + .5)
                          : 0
                        : hoverData == "XRP-USDT"
                          ? btcy.length > 0
                            ? Math.max(...btcy) -
                            (Math.max(...btcy) - Math.min(...btcy) + .0005)
                            : 0
                          : btcy.length > 0
                            ? Math.max(...btcy) -
                            (Math.max(...btcy) - Math.min(...btcy) + .5)
                            : 0
                    : btcy.length > 0
                      ? Math.max(...btcy) -
                      (Math.max(...btcy) - Math.min(...btcy) + 1)
                      : 10,

                // Minimum value for Y-axis
                max:
                  hoverData && tradelistdata[0]
                    ? hoverData === "BTC-USDT"
                      ? btcy.length > 0
                        ? Math.max(...btcy) +
                        (Math.max(...btcy) - Math.min(...btcy) + 1)
                        : 0
                      : hoverData === "ETH-USDT"
                        ? btcy.length > 0
                          ? Math.max(...btcy) +
                          (Math.max(...btcy) - Math.min(...btcy) + .5)
                          : 0
                        : hoverData === "XRP-USDT"
                          ? btcy.length > 0
                            ? Math.max(...btcy) +
                            (Math.max(...btcy) - Math.min(...btcy) + .0005)
                            : 0
                          : btcy.length > 0
                            ? Math.max(...btcy) +
                            (Math.max(...btcy) - Math.min(...btcy) + .5)
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
                      ? btcx
                      : hoverData == "XRP-USDT"
                        ? btcx
                        : btcx
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
                  ? hoverData === "BTC-USDT"
                    ? btcy
                    : hoverData === "ETH-USDT"
                      ? btcy
                      : hoverData === "XRP-USDT"
                        ? btcy
                        : btcy
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

    </div>
  );
};

export default DashboardChartFunction;
