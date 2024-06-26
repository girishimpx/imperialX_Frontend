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
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Spinner from 'react-bootstrap/Spinner';

function createData(image, coin, coinname, price, percentage) {
  return { image, coin, coinname, price, percentage };
}

// let ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197");
export default function AdvanceMarketTable({ futurevalue, searchpair, selectPair, futurepairs, loader }) {
  // console.log(futurevalue, 'futurevalue');
  const $ = window.$;
  const endpoint = consts.bybitsocketurl;

  const [coins, setCoin] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

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

  const handlefavpairfuture = async (check, value) => {
    try {
      const addd = check
      const { data } = await Axios.post(
        `/assets/favpairsfuture`,
        { pairs: value, add: addd },
        {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          },
        }
      );

      if (data?.success) {
        futurepairs()
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const client1 = new WebSocket('wss://stream.bybit.com/v5/public/linear');

    client1.onopen = () => {
      setInterval(() => {
        client1.send('ping'); // Send ping to keep connection alive
      }, 30000);

      futurevalue?.forEach(pairData => {
        const pair = pairData?.pairs
        // console.log(pair, 'pairs');
        client1.send(JSON.stringify({ op: 'subscribe', args: [`tickers.${pair}`] }));
      });
    };

    client1.onmessage = (event) => {
      const response = JSON.parse(event.data);
      // console.log(response,'future respo');
      if (response) {
        let increase =
          Number(response?.data?.highPrice24h) -
          Number(response?.data?.lowPrice24h);
        let price_change =
          (increase / Number(response?.data?.lowPrice24h)) * 100;

        $(".item_" + response?.data?.symbol).html(
          response?.data?.highPrice24h
        );
        $(".items_" + response?.data?.symbol).html(
          `${response?.data?.price24hPcnt ? response?.data?.price24hPcnt : 0} %`
        );
      }
      // console.log(response?.data?.highPrice24h, 'highPrice24h');
    };
    client1.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    return () => {
      client1.close();
    };
  }, [futurevalue, searchpair]);

  return (
    <TableContainer className="market-list-table-outer chg-table">
      <Table aria-label="simple table">
        <TableBody>
          {/* {console.log(futurevalue,'futurevalueeee')} */}
          {/* {console.log(searchpair, 'searchpair')} */}

          {
            futurevalue.length <= 0 ?
              <div style={{ padding: "1rem", textAlign: 'center' }}>
                {/* <CircularProgress size={60} /> */}
                {<p>Pairs Not Found</p>}
              </div>
              :
              futurevalue?.map((row, index) => {
                // {console.log(row, 'row')}
                // if (searchpair != "") {
                // if (row.data.instFamily.includes(searchpair)) {
                // if (row.pairs.includes(searchpair)) {
                //   return (
                //     <div className="row-flex-display-table">
                //       {
                //         row?.check ? <StarIcon onClick={(e) => { handlefavpairfuture(row?.check, row?.pairs) }} /> : <StarBorderIcon onClick={(e) => { handlefavpairfuture(row?.check, row?.pairs) }} />
                //       }

                //       <TableRow
                //         key={index}
                //         sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                //         onClick={() => {
                //           selectPair(row?.pairs)
                //           // console.log(row,"roesd")
                //           navigateToFuturePage(row);
                //         }}
                //       >
                //         <TableCell>
                //           <div className="table-advace-left">
                //             <div className="img-tble-adv">
                //               <div>{/* <img src={"row?.image"} /> */}</div>
                //               <div>
                //                 <span className="rowcoin">
                //                   {/* {`${row?.data.instId.split("-")[0]}/${
                //             row?.data.instId.split("-")[1]
                //           } `} */}
                //                   {`${row?.pairs}`}
                //                   <span
                //                     style={{
                //                       paddingLeft: "5px",
                //                       color: "#2b60c3",
                //                       fontSize: "11px",
                //                     }}
                //                   >
                //                     {/* {`${row?.data.instId
                //             .split("-")[2]
                //             // .substring(
                //             //   row?.data.instId.split("-")[2].length - 4
                //             // )
                //           }${
                //             row?.data.alias == "quarter"
                //               ? "Qtly"
                //               : row?.data.alias == "next_quarter"
                //               ? "Bi-Qtly"
                //               : row?.data.alias == "this_week"
                //               ? "Wkly"
                //               : row?.data.alias == "next_week"
                //               ? "Bi-Wkly"
                //               : ""
                //           }`} */}
                //                   </span>
                //                 </span>
                //                 {/* <span className="rowcoinname">{row?.data.instFamily ? row?.data.instFamily:""}</span> */}
                //               </div>
                //             </div>
                //             <div className="tble-inner-right"></div>
                //           </div>
                //         </TableCell>

                //         <TableCell>
                //           <div className="table-advace-rght">
                //             <div className="tble-inner-right">
                //               <span className={`remove item_${row?.pairs}`}>
                //                 {/* {row?.data?.data?.last ? row?.data?.data.last : 0} */}
                //                 {row?.low ? row?.low : 0}
                //               </span>
                //               <span
                //                 id={true < 0 ? "red-low" : "green-high"}
                //                 className={`remove high-rate items_${row?.pairs}`}
                //               >



                //                 <span
                //                   style={{
                //                     color:
                //                       row?.percentage > 0
                //                         ? "#10D876 !important"
                //                         : "#CA3F64 !important"
                //                     ,
                //                   }}
                //                 >
                //                   {/* {`${
                //         row?.data?.data?.last
                //           ? findPercentage(
                //               Number(row?.data?.data?.last),
                //               Number(row?.data?.data?.open24h)
                //             )
                //           : 0
                //       }%`} */}
                //                   {`${row?.percentage ? row?.percentage
                //                     : 0
                //                     }%`}
                //                 </span>
                //               </span>
                //             </div>
                //           </div>
                //         </TableCell>
                //       </TableRow>
                //     </div>
                //   );
                // }
                // else {
                //   return (
                //     <div style={{ padding: "1rem", textAlign: 'center' }}>
                //       {/* <CircularProgress size={60} /> */}
                //       {<p>Pairs Not Found</p>}
                //     </div>
                //   )
                // }
                // }
                // else {

                return (
                  <div className="row-flex-display-table">
                    {/* {
                  row?.check == true ? <StarIcon onClick={(e) => { handlefavpairfuture(row?.data?.check, row?.data?.instId) }} /> : <StarBorderIcon onClick={(e) => { handlefavpairfuture(row?.data?.check, row?.data?.instId) }} />
                } */}
                    {
                      row?.check ? <StarIcon onClick={(e) => { handlefavpairfuture(row?.check, row?.pairs) }} /> : <StarBorderIcon onClick={(e) => { handlefavpairfuture(row?.check, row?.pairs) }} />
                    }
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      onClick={() => {
                        selectPair(row?.pairs)
                        // console.log(row, "roese")
                        navigateToFuturePage(row);
                      }}
                    >
                      <TableCell>
                        <div className="table-advace-left">
                          <div className="img-tble-adv">
                            <div>{/* <img src={"row?.image"} /> */}</div>
                            <div>
                              <span className="rowcoin rowcoin-span">
                                {/* {`${row?.data.instId.split("-")[0]}/${
                            row?.data.instId.split("-")[1]
                          } `} */}
                                {`${row?.pairs}`}
                                <span
                                  style={{
                                    paddingLeft: "5px",
                                    color: "#2b60c3",
                                    fontSize: "11px",
                                  }}
                                >
                                  {/* {`${row?.data.instId
                            .split("-")[2]
                            // .substring(
                            //   row?.data.instId.split("-")[2].length - 4
                            // )
                          }${
                            row?.data.alias == "quarter"
                              ? "Qtly"
                              : row?.data.alias == "next_quarter"
                              ? "Bi-Qtly"
                              : row?.data.alias == "this_week"
                              ? "Wkly"
                              : row?.data.alias == "next_week"
                              ? "Bi-Wkly"
                              : ""
                          }`} */}
                                </span>
                              </span>



                              <span className="rowcoinname">{row?.data?.instFamily ? row?.data?.instFamily : ""}</span>
                            </div>
                          </div>
                          <div className="tble-inner-right"></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="table-advace-rght">
                          <div className="tble-inner-right">
                            <span className={`remove item_${row?.pairs}`}>
                              {/* {row?.data?.data?.last ? row?.data?.data.last : 0} */}
                              {row?.low ? row?.low : 0}
                            </span>

                            <span
                              id={Number(`remove high-rate items_${row?.pairs}`) < 0 ? "red-low" : "green-high"}
                              className={`remove high-rate items_${row?.pairs}`}
                            >

                              <span
                                style={{
                                  color:
                                    Number(row?.percentage) > 0
                                      ? "#10D876"
                                      : "#CA3F64"
                                  ,
                                }}
                              >
                                {/* <span
                          style={{
                            color: 
                              findPercentage(
                                Number(row?.data?.data?.last),
                                Number(row?.data?.data?.open24h)
                              ) > 0
                                ? "#10D876"
                                : "#CA3F64"
                            ,
                          }}
                        > */}
                                {/* {`${
                          row?.data?.data?.last
                            ? findPercentage(
                                Number(row?.data?.data?.last),
                                Number(row?.data?.data?.open24h)
                              )
                            : 0
                        }%`} */}
                                {`${row?.percentage ? row?.percentage : 0
                                  }%`}
                              </span>
                            </span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </div>
                );
                // }
              })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
