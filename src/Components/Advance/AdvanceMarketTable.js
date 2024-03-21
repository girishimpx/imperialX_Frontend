import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useNavigate } from "react-router-dom";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import btcpng from "../../images/btc-png.png";
import ethpng from "../../images/eth-png.png";
import okbpng from "../../images/okb-png.png";
import oktpng from "../../images/okt-png.png";
import ltcpng from "../../images/ltc-png.png";
import dotpng from "../../images/dot-png.png";
import dogepng from "../../images/doge-png.png";
import adapng from "../../images/ada-png.png";
import Axios from "../../Axios";
import consts from "../../Constansts";

function createData(image, coin, coinname, price, percentage) {
  return { image, coin, coinname, price, percentage };
}

let ws = new WebSocket("wss://ws.okex.com:8443/ws/v5/public?brokerId=197");
export default function AdvanceMarketTable({ futurevalue, searchpair }) {
  const [coins, setCoin] = useState([]);
  const navigate = useNavigate();
  // console.log(futurevalue,"asdasdasd")
  const findPercentage = (lp, op) => {
    let increase = lp - op;
    let price_change = (increase / op) * 100;
    return price_change.toFixed(2);
  };

  useEffect(() => {
    Axios.get(`${consts.BackendUrl}/assets/getallasset`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: localStorage.getItem("Mellifluous"),
      },
    })
      .then((res) => {
        if (res?.data?.result.length > 0) {
          

          const newArray = res?.data?.result.map((obj) => ({
            ...obj,
            current_price: 0, // Set the initial age value here
          }));

          setCoin(newArray);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigateToFuturePage = (data) => {
    navigate("/future", { state: data });
  };

  return (
    <TableContainer className="market-list-table-outer">
      <Table aria-label="simple table">
        <TableBody>
          {/* {console.log(futurevalue,'futurevalue market tab')} */}
          
          {futurevalue?.map((row, index) => {
            if (searchpair) {
              if (row?.instId.includes(searchpair)) {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    // onClick={() => {
                    //   navigateToFuturePage(row);
                    // }}
                  >
                    <TableCell>
                      <div className="table-advace-left">
                        <div className="img-tble-adv">
                          <div>{/* <img src={"row?.image"} /> */}</div>
                          <div>
                            <span className="rowcoin">
                              {`${row?.instId.split("-")[0]}/${
                                row?.instId.split("-")[1]
                              } `}
                              {/* <span
                                style={{
                                  paddingLeft: "5px",
                                  color: "#2b60c3",
                                  fontSize: "11px",
                                }}
                              >{`${row?.data.instId
                                .split("-")[2]
                                .substring(
                                  row?.instId.split("-")[2].length - 4
                                )}${
                                row?.data?.alias == "quarter"
                                  ? "Qtly"
                                  : row?.data?.alias == "next_quarter"
                                  ? "Bi-Qtly"
                                  : row?.data?.alias == "this_week"
                                  ? "Wkly"
                                  : row?.data?.alias == "next_week"
                                  ? "Bi-Wkly"
                                  : ""
                              }`}</span> */}
                            </span>
                            <span className="rowcoinname">{row?.instId ? row?.instId:""}</span>
                          </div>
                        </div>
                        <div className="tble-inner-right"></div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="table-advace-rght">
                        <div className="tble-inner-right">
                          <span className="price-part">
                            {row?.last ? row?.last : 0}
                          </span>
                          <span
                            id={true < 0 ? "red-low" : "green-high"}
                            className="percentage-part"
                          >


                                
                         <span
                            style={{
                              color:
                                findPercentage(
                                  Number(row?.last),
                                  Number(row?.open24h)
                                ) > 0
                                  ? "#10D876 !important"
                                  : "#CA3F64 !important"
,
                            }}
                          >{`${
                            row?.last
                              ? findPercentage(
                                  Number(row?.last),
                                  Number(row?.open24h)
                                )
                              : 0
                          }%`}</span>
                          </span>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              }
            } else {
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  // onClick={() => {
                  //   navigateToFuturePage(row);
                  // }}
                >
                  <TableCell>
                    <div className="table-advace-left">
                      <div className="img-tble-adv">
                        <div>{/* <img src={"row?.image"} /> */}</div>
                        <div>
                          <span className="rowcoin">
                            {/* {console.log(row,'rowdaata')} */}
                            {row?.instId ? `${row?.instId?.split("-")[0]}/${
                              row?.instId?.split("-")[1]
                            } ` : '. . .'}
                            {/* <span
                              style={{
                                paddingLeft: "5px",
                                color: "#2b60c3",
                                fontSize: "11px",
                              }}
                            >{`${row?.instId
                              .split("-")[2]
                              .substring(
                                row?.instId.split("-")[2].length - 4
                              )}${
                              row?.alias == "quarter"
                                ? "Qtly"
                                : row?.alias == "next_quarter"
                                ? "Bi-Qtly"
                                : row?.alias == "this_week"
                                ? "Wkly"
                                : row?.alias == "next_week"
                                ? "Bi-Wkly"
                                : ""
                            }`}</span> */}
                          </span>

                            
                          
                          <span className="rowcoinname">{row?.instId ? row?.instId:""}</span>
                        </div>
                      </div>
                      <div className="tble-inner-right"></div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="table-advace-rght">
                      <div className="tble-inner-right">
                        <span className="price-part">
                          {row?.last ? row?.last : 0}
                        </span>
                        <span
                          id={true < 0 ? "red-low" : "green-high"}
                          className="percentage-part"
                        >
                          
                          <span
                            style={{
                              color: 
                                findPercentage(
                                  Number(row?.last),
                                  Number(row?.open24h)
                                ) > 0
                                  ? "#10D876"
                                  : "#CA3F64"
                              ,
                            }}
                          >{`${
                            row?.last
                              ? findPercentage(
                                  Number(row?.last),
                                  Number(row?.open24h)
                                )
                              : 0
                          }%`}</span>
                        </span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
