import * as React from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Axios from "../../Axios";
import Consts from "../../Constansts";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import './cancel.css'
import consts from '../../Constansts'
export default function OpenOrderTable({ selectedPairs, orderType, coinName }) {
  const [loading, setLoading] = React.useState(true);
  const [load, setLoad] = React.useState(false);

  const [tradelist, settradelist] = React.useState();
  const [tradelist1, settradelist1] = React.useState([]);
  const [pair, setpair] = React.useState("All");
  const [err, seterr] = React.useState();
  const [pnl, setPnl] = React.useState()
  const [pnlPercentage, setPnlPercentage] = React.useState(null);

  const headers = [
    "Symbol",
    "Order time",
    "Side",
    "Fill | Order price",
    "Filled | Total",
    "Filled | Order value",
    // "PnL | PnL%",
    "Fee",
    "TP | SL",
    "Reduce-only",
    "Status",

  ];

  // const historyget_from_them_db = () => {
  //   let data = {
  //     instId: selectedPairs,
  //     instType: "FUTURES",
  //     apiKey: "93975967-ed47-4070-a436-329e22e14a1b",
  //     secretKey: "CBB7D9C9B6426A6562D2741A1E8AC9A6",
  //     passphrase: "Pass@123",
  //   };

  //   Axios.post("/trade/openorderhistoryfuture", data, {
  //     headers: {
  //       Authorization: localStorage.getItem("Mellifluous"),
  //     },
  //   })
  //     .then((res) => {
  //       let data = []
  //       console.log(res.data.result[0].ordType, "open 123");

  //       for (let i = 0; i < res.data.result.length; i++) {
  //         if (res.data.result[i].ordType == orders) {
  //           data.push(res.data.result[i])
  //         }
  //       }

  //       if (data.length > 0) {

  //         settradelist1(data.reverse());
  //       }
  //     })
  //     .catch((errs) => seterr(errs));
  // };

  // React.useEffect(() => {
  //   historyget_from_them_db();
  // }, [orders]);

  React.useEffect(() => {
    let token = localStorage.getItem("Mellifluous");
    if (token) {
      Axios.post(
        `${Consts.BackendUrl}/trade/tradeHistory`,
        {
          pair: `${selectedPairs.split("-")[0]}-${selectedPairs.split("-")[1]}`,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
        .then((res) => {
          let data = [];
          res?.data?.result.map((item, index) => {
            if (item.trade_at == "future" || item.trade_at == "Future") {
              if (item.status == "Filled" || item.status == "Cancelled") {
                data.push(item);
              }
            }
          });
          if (data.length > 0) {
            settradelist(data);
            setLoading(false);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [selectedPairs]);

  React.useEffect(() => {
    getFutureTradeHistory()
  }, [orderType, coinName])

  const getFutureTradeHistory = async () => {
    const payload = {
      symbol: coinName?.pairs
    }
    try {
      setLoad(true)
      // const response = await Axios.post(`${consts.BackendUrl}/trade/futureTradeHistory?symbol=${coinName.pairs}`, {
      //   headers: {
      //     Authorization: localStorage.getItem("Mellifluous"),
      //   }
      // })
      const response = await Axios.post(`${consts.BackendUrl}/trade/futureTradeHistory`, payload, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        }
      })
      // console.log(response, 'history');
      const data = response.data.data
      // const data = [
      //   {
      //     "orderId": "fd4300ae-7847-404e-b947-b46980a4d140",
      //     "orderLinkId": "test-000005",
      //     "blockTradeId": "",
      //     "symbol": "ETHUSDT",
      //     "price": "1600.00",
      //     "qty": "0.10",
      //     "side": "Buy",
      //     "isLeverage": "",
      //     "positionIdx": 1,
      //     "orderStatus": "New",
      //     "cancelType": "UNKNOWN",
      //     "rejectReason": "EC_NoError",
      //     "avgPrice": "0",
      //     "leavesQty": "0.10",
      //     "leavesValue": "160",
      //     "cumExecQty": "0.00",
      //     "cumExecValue": "0",
      //     "cumExecFee": "0",
      //     "timeInForce": "GTC",
      //     "orderType": "Limit",
      //     "stopOrderType": "UNKNOWN",
      //     "orderIv": "",
      //     "triggerPrice": "0.00",
      //     "takeProfit": "2500.00",
      //     "stopLoss": "1500.00",
      //     "tpTriggerBy": "LastPrice",
      //     "slTriggerBy": "LastPrice",
      //     "triggerDirection": 0,
      //     "triggerBy": "UNKNOWN",
      //     "lastPriceOnCreated": "",
      //     "reduceOnly": false,
      //     "closeOnTrigger": false,
      //     "smpType": "None",
      //     "smpGroup": 0,
      //     "smpOrderId": "",
      //     "tpslMode": "Full",
      //     "tpLimitPrice": "",
      //     "slLimitPrice": "",
      //     "placeType": "",
      //     "createdTime": "1684738540559",
      //     "updatedTime": "1684738540561"
      //   }


      // ]

      if (response.data.success) {
        setLoad(false)
        // const livePrice = response.data.livePrice
        // console.log(livePrice, 'livePrice');
        let array = [];

        if (orderType == 'limit') {
          const limitOrders = data.filter(order => order.orderType === 'Limit');
          array.push(...limitOrders);
          // let calculatedPnL;
          // for (let i = 0; i < limitOrders.length; i++) {
          //   if (limitOrders[i].side === 'Buy') {
          //     calculatedPnL = (livePrice - limitOrders[i].price) * limitOrders[i].qty
          //   } else if (limitOrders[i].side === 'Sell') {
          //     calculatedPnL = (limitOrders[i].price - livePrice) * limitOrders[i].qty
          //   }
          //   // const pnl = (livePrice - limitOrders[i].price) * limitOrders[i].qty
          //   setPnl(calculatedPnL)
          //   console.log(calculatedPnL, 'calculatedPnL');
          //   const pnlPercentage = (calculatedPnL / (livePrice * limitOrders[i].qty)) * 100;
          //   console.log(pnlPercentage, 'pnlPercentage');
          //   setPnlPercentage(pnlPercentage);
          // }


        }
        else if (orderType == 'market') {
          const limitOrders = data.filter(order => order.orderType === 'Market');
          array.push(...limitOrders);
        }
        // console.log(array, 'array');
        settradelist1(array)
      }
    } catch (error) {
      setLoad(false)
      console.log(error, 'err');
    }
  }

  // console.log(tradelist1, 'tradelist');

  return (
    <TableContainer >
      <div style={{ maxHeight: "200px" }}>
        <Table
          stickyHeader
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className="table-style-open-order"
        >
          <TableHead >
            <TableRow>
              {headers.map((item, index) => {
                return (
                  <TableCell
                    sx={{ fontWeight: "400", fontSize: "13px" }}
                    key={index}
                  >
                    {item}{" "}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody >

            {tradelist1 && tradelist1.length > 0 && tradelist1?.map((item, index) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell sx={{ display: "flex", flexDirection: "column" }}>
                    {`${item.instId.split("-")[0]}/${item.instId.split("-")[1]
                      }${item.instId
                        .split("-")[2]
                        .substring(item.instId.split("-")[2].length - 4)}`}
                    <span style={{ fontSize: "9.6px" }}>{item.tdMode}</span>
                  </TableCell> */}

                  <TableCell sx={{ display: "flex", flexDirection: "column" }}>

                    <span style={{ fontSize: "9.6px" }}>{item?.symbol}</span>
                  </TableCell>


                  {/* <TableCell> <span style={{ display: "block" }}>{`${new Date(Number(item.cTime)).getDate()}/${new Date(Number(item.cTime)).getMonth() + 1}/${new Date(Number(item.cTime)).getFullYear()}`}</span>
                    <span style={{ textAlign: "end", paddingLeft: "12%" }}>{`${new Date(Number(item.cTime)).getHours()}:${new Date(Number(item.cTime)).getMinutes()}:${new Date(Number(item.cTime)).getSeconds()}`}</span> </TableCell> */}


                  <TableCell> <span style={{ display: "block" }}>{`${new Date(Number(item?.createdTime)).getDate()}/${new Date(Number(item?.createdTime)).getMonth() + 1}/${new Date(Number(item?.createdTime)).getFullYear()}`}</span>
                    <span style={{ textAlign: "end", paddingLeft: "12%" }}>{`${new Date(Number(item?.createdTime)).getHours()}:${new Date(Number(item?.createdTime)).getMinutes()}:${new Date(Number(item?.createdTime)).getSeconds()}`}</span> </TableCell>

                  {/* <TableCell >
                    <span style={{ color: item.side == "sell" ? "#25a750" : "#ca3f64" }}> {`${item.side == "sell" ? "Open" : "Close"} ${item.posSide}`}
                    </span>
                  </TableCell> */}

                  <TableCell >
                    <span style={{ color: item.side == "sell" ? "#25a750" : "#ca3f64" }}>
                      {item?.side == "sell" ? "Open" : "Close"}
                    </span>
                  </TableCell>


                  {/* <TableCell>
                    <span>{`${item.fillPx ? item.fillPx : "0"} ${item.feeCcy}`}</span>
                    <span style={{ display: "block" }}>{`${item.px ? item.px : ``} ${item.ordType == "market" ? item.ordType : item.rebateCcy}`}</span>
                  </TableCell> */}

                  <TableCell>
                    <span>{`${item?.cumExecFee ? item?.cumExecFee : "0"} ${item?.feeCurrency ? item?.feeCurrency : 'USDT'}`}</span>
                    <span style={{ display: "block" }}>{`${item.price ? item.price : ``} ${item.orderType}`}</span>
                  </TableCell>

                  {/* <TableCell>
                    <span>{`${item.fillPx ? `${(item.fillPx * 100).toString().split('.')[0]}.${(item.fillPx * 100).toString().split('.')[1]?.slice(0, 2)} ${item.feeCcy}` : `0 ${item.feeCcy}`}`}</span>
                    <span style={{ display: "block" }}>{`${item.px ? `${(item.px * 100).toString().split('.')[0]}.${(item.px * 100).toString().split('.')[1]?.slice(0, 2)}` : ``} ${item.ordType == "market" ? "--" : item.rebateCcy}`}</span>
                  </TableCell> */}

                  <TableCell>
                    <span>{Number(item.cumExecQty).toFixed(4)}</span>
                    <span style={{ display: "block" }}>{Number(item.qty).toFixed(4)}</span>
                  </TableCell>


                  {/* <TableCell>
                    <span>{`${item.fillPx ? `${(item.fillPx * 100).toString().split('.')[0]}.${(item.fillPx * 100).toString().split('.')[1]?.slice(0, 2)} ${item.feeCcy}` : `0 ${item.feeCcy}`}`}</span>
                    <span style={{ display: "block" }}>{`${item.px ? `${(item.px * 100).toString().split('.')[0]}.${(item.px * 100).toString().split('.')[1]?.slice(0, 2)}` : ``} ${item.ordType == "market" ? "--" : item.rebateCcy}`}</span>
                  </TableCell> */}

                  <TableCell>
                    <span>{item.cumExecValue}</span>
                  </TableCell>


                  {/* <TableCell>
                    <span style={{ color: item.pnl > 0 ? "#25a750" : item.pnl < 0 ? "#ca3f64" : "" }} >{`${item.pnl == 0 ? "--" : Number(item.pnl).toFixed(2)} ${item.pnl == 0 ? "" : item.feeCcy}`}</span>
                    <span style={{ display: "block", color: item.pnl > 0 ? "#25a750" : item.pnl < 0 ? "#ca3f64" : "" }}>{`${item.pnl == 0 ? "--" : `${(item.pnl / (item.fillPx * 100) * 1000).toFixed(2)}%`}`}</span>
                  </TableCell> */}

                  {/* <TableCell>
                    <span style={{ color: pnl > 0 ? "#25a750" : pnl < 0 ? "#ca3f64" : "" }} >{`${pnl == 0 ? "--" : Number(pnl).toFixed(3)} ${pnl == 0 ? "" : ""}`}</span>
                    <span style={{ display: "block", color: pnlPercentage > 0 ? "#25a750" : pnlPercentage < 0 ? "#ca3f64" : "" }}>{`${pnlPercentage == 0 ? "--" : `${(pnlPercentage).toFixed(2)}%`}`}</span>
                  </TableCell> */}

                  <TableCell> {item?.cumExecFee} USDT </TableCell>

                  <TableCell>
                    <span>{item?.takeProfit ? item?.takeProfit : "--"}</span> | <span>{item?.stopLoss ? item?.stopLoss : "--"}</span>
                  </TableCell>
                  <TableCell> {item.reduceOnly == "true" ? "Yes" : "No"} </TableCell>
                  <TableCell> {item.orderStatus} </TableCell>
                </TableRow>
              );
              // console.log(item, "index");
            })}


          </TableBody>


          {/* {tradelist && (
          <TableBody>
            {tradelist.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  {row.createdAt
                    ? new Date(row.createdAt).toLocaleString()
                    : "-"}
                  {console.log(row, "check")}
                </TableCell>
                <TableCell>{row.order_type ? row.order_type : "-"}</TableCell>
                <TableCell>{row.pair ? row.pair : "-"}</TableCell>
                <TableCell
                  sx={{
                    color: `${
                      row.trade_type == "buy"
                        ? "#25DEB0 !important"
                        : "#CA3F64 !important"
                    }`,
                  }}
                >
                  {row.price ? row.price : "0"}
                </TableCell>
                <TableCell>{row.remaining ? row.remaining : "0"}</TableCell>
                <TableCell>{row.trade_at ? row.trade_at : "-"}</TableCell>
                <TableCell
                  sx={{
                    color: `${
                      row.trade_type == "buy"
                        ? "#25DEB0 !important"
                        : "#CA3F64 !important"
                    }`,
                  }}
                >
                  {row.trade_type ? row.trade_type : "-"}
                </TableCell>
                <TableCell>{row.volume ? row.volume : "-"}</TableCell>
                <TableCell>{row.status ? row.status : "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )} */}
        </Table>
      </div>

      {loading || load && (
        <div style={{ width: "80%", padding: "1rem" }}>
          <CircularProgress size={"60"} />
        </div>
      )}

      {!loading && !load && tradelist1.length == 0 && (
        <div style={{ backgroundColor: "lightgrey" }}>
          <h5 style={{ padding: "1rem", color: "black" }}>Data Not Found</h5>
        </div>
      )}
    </TableContainer>
  );
}
