import React, { useEffect, useRef, useState } from "react";
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
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from 'crypto-js';
import WebSocket from 'websocket';

export default function OpenOrderTable({ selectedPairs, ordreType, reload }) {
  const [loading, setLoading] = React.useState(true);
  const [tradelist, settradelist] = React.useState();
  const [orderlist, setOrderlist] = React.useState();
  const [cancelorder, setCancelOrder] = React.useState();
  // console.log(ordreType, "adouygfipadgi");



  const [state, setState] = React.useState(false);
  const [pair, setPair] = React.useState("All");
  const Token = window.localStorage.getItem('Mellifluous')



  const connectUserSocket = async() => {

    var decryptedApiKey;
    var decryptedSecretKey;

    try {
      
      await Axios.get(`/bybit/getuserdata`, {
         headers: {
           Authorization: localStorage.getItem("Mellifluous"),
         },
       })
         .then((res) => {
             console.log(res?.data?.success,"exzi")
             if(res?.data?.success){
               const encryptedApiKey = res.data.result.one;
               const encryptedSecretKey = res.data.result.two; 
               // alert(encryptedApiKey);
               function decryptCaesar(ciphertext, shift) {
                 return ciphertext
                   .split("")
                   .map(char => {
                     if (char.match(/[a-z]/i)) {
                       let code = char.charCodeAt(0);
                       let start = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
                       return String.fromCharCode((code - start - shift + 26) % 26 + start);
                     } else if (char.match(/[0-9]/)) {
                       let code = char.charCodeAt(0);
                       let start = '0'.charCodeAt(0);
                       return String.fromCharCode((code - start - shift + 10) % 10 + start);
                     }
                     return char;
                   })
                   .join("");
               }
               decryptedApiKey = decryptCaesar(encryptedApiKey, 3);
               decryptedSecretKey = decryptCaesar(encryptedSecretKey, 3);
  
             }
         })
         .catch((err) => {
          console.log(err,'err');
         });
 
     } catch (error) {
       console.log(error,'error');
     }

     const apiKey = decryptedApiKey;
     const apiSecret = decryptedSecretKey;
     const endpoint = 'wss://stream.bybit.com/v5/private';

      // Generate expires timestamp
      const expires = new Date().getTime() + 30000; // Example: 10 seconds from now
  
      // Generate signature
      const signature = CryptoJS.HmacSHA256(`GET/realtime${expires}`, apiSecret).toString();
  
      // Create WebSocket connection
      const client = new WebSocket.w3cwebsocket(endpoint);
  
      client.onopen = () => {
        console.log('WebSocket Client Connected');
  
        // Send authentication message
        client.send(JSON.stringify({
          op: 'auth',
          args: [apiKey, expires, signature]
        }));
  
        client.send(JSON.stringify({
          op: 'subscribe',
          args: [
            'order.spot',
            // Add more topics as needed
          ]
        }));
      };
      // console.log(signature,apiKey,expires,"params")
      client.onmessage = (event) => {
        // console.log('Message received:', event.data);
        const data = JSON.parse(event.data);
        // console.log(data,"datasa")
  
        // Check if the message is an order update
        if (data?.data?.length > 0) {
          const filterorder = []
          for(let i =0; i < data.data.length; i++){
            const orders = data?.data[i]
            // console.log('Orders', orders);
            // if(orders.symbol == selectedPairs && orders.orderType == ordreType){
            // console.log(orders?.orderType.toLowerCase(),ordreType.toLowerCase(),'orrrrrrr');
            if( orders?.orderType.toLowerCase() == ordreType.toLowerCase() ){
              filterorder.push(orders)
            }
  
          }
          // console.log('filterorder', filterorder);
          setOrderlist(filterorder);
        }
      };
  
      client.onerror = (error) => {
        console.error('WebSocket Error:', error);
        // Handle WebSocket errors
      };
  
      client.onclose = () => {
        console.log('WebSocket Connection Closed');
        // Handle WebSocket closed
      };
  
      // Cleanup function
      return () => {
        console.log('Cleaning up WebSocket connection');
        client.close();
      };

  }

    useEffect(() => {
    connectUserSocket();
  }, []);

  // React.useEffect(() => {
  //   settradelist("");
  //   let token = localStorage.getItem("Mellifluous");
  //   if (token) {
  //     Axios.post(
  //       `${Consts.BackendUrl}/trade/tradeHistory`,
  //       { pair: 'All' },
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     )
  //       .then((res) => {
  //         let data = [];
  //         res?.data?.result.map((item, index) => {
  //           if (item.trade_at == "spot" || item.trade_at == "Spot") {
  //             if (item.status == "init" || item.status == "partially_filled") {
  //               if (item?.order_type == ordreType) {
  //                 data.push(item);
  //               }
  //             }
  //           }
  //         });
  //         console.log(data.length, "lengths")
  //         if (data.length > 0) {

  //           settradelist(data.reverse());
  //         }
  //         setLoading(false);
  //       })
  //       .catch((err) => {

  //         setLoading(false);
  //       });
  //   }
  // }, [state, selectedPairs, ordreType]);

  // const [isZero, setIsZero] = React.useState(reload);

  // React.useEffect(() => {
  //   if(isZero == 1){
  //   settradelist("");
  //   let token = localStorage.getItem("Mellifluous");
  //   if (token) {
  //     Axios.post(
  //       `${Consts.BackendUrl}/trade/tradeHistory`,
  //       { pair: 'All' },
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     )
  //       .then((res) => {
  //         let data = [];
  //         res?.data?.result.map((item, index) => {
  //           if (item.trade_at == "spot" || item.trade_at == "Spot") {
  //             if (item.status == "init" || item.status == "partially_filled") {
  //               if (item?.order_type == ordreType) {
  //                 data.push(item);
  //               }
  //             }
  //           }
  //         });
  //         console.log(data.length, "lengths")
  //         if (data.length > 0) {

  //           settradelist(data.reverse());
  //         }
  //         setLoading(false);
  //       })
  //       .catch((err) => {

  //         setLoading(false);
  //       });
  //   }
  // }
  // setIsZero(0)
  // }, [reload]);

  const header = [
    "Time",
    "Type",
    "Pair",
    "Price",
    "Remain",
    "Trade At",
    "Trade type",
    "Volume",
    "Status",
    "Action",
  ];

  // const cancelOrder = (selectedItem) => {
  //   let data = {
  //     instId: selectedItem.pair,
  //     ordId: selectedItem.order_id,
  //     // instId: "BTC-USDT",
  //     // ordId: "1252451",
  //   };

  //   Axios.post(`${Consts.BackendUrl}/trade/cancelTrade`, data, {
  //     headers: {
  //       Authorization: localStorage.getItem("Mellifluous"),
  //     },
  //   })
  //     .then((res) => {
  //       if (res.data.success) {
  //         toast.success(`${res.data.message}`, {

  //           duration: 3000,
  //           position: "top-center",

  //           // Styling
  //           style: {
  //             padding: "1rem",
  //             fontSize: "15px",
  //             color: "green",
  //             fontWeight: "bold",
  //           },
  //           className: "",

  //           // Custom Icon
  //           icon: "👏",

  //           // Change colors of success/error/loading icon
  //           iconTheme: {
  //             primary: "#000",
  //             secondary: "#fff",
  //           },

  //           // Aria
  //           ariaProps: {
  //             role: "status",
  //             "aria-live": "polite",
  //           },
  //         });
  //         window.location.reload();
  //         setTimeout(() => {
  //           setState(!state);
  //         }, 1000);
  //       } else {

  //         toast.error(`${res.data.message}`, {

  //           duration: 3000,
  //           position: "top-center",

  //           // Styling
  //           style: {
  //             padding: "1rem",
  //             fontSize: "15px",
  //             color: "red",
  //             fontWeight: "bold",
  //           },
  //           className: "",

  //           // Custom Icon
  //           icon: "",

  //           // Change colors of success/error/loading icon
  //           iconTheme: {
  //             primary: "#000",
  //             secondary: "#fff",
  //           },

  //           // Aria
  //           ariaProps: {
  //             role: "status",
  //             "aria-live": "polite",
  //           },
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const bybitcancelOrder = async(selectedItem)=>{
    try{
      let params = {
        symbol:selectedItem?.symbol,
        orderId:selectedItem?.orderId
      }
      // console.log(data,'datasaw')

      const { data } = await Axios.post(`/bybit/cancelorder`, params, {
            headers: {
              Authorization: localStorage.getItem("Mellifluous"),
            },
          })
          console.log(data,'cancelorder')
          // alert('outsideIF')
          if(data?.success){
            // alert('IF')
            // console.log(cancelorder?.data?.result,'cancelorderreault')
            setCancelOrder(data?.result)
            // alert('elseeeIF')
            // toast.success(cancelorder?.message)
            toast.success(`${data?.message}`, {

              duration: 5000,
              position: "top-center",

              // Styling
              style: {
                padding: "1rem",
                fontSize: "15px",
                color: "green",
                fontWeight: "bold",
              },
              className: "",

              // Custom Icon
              icon: "👏",

              // Change colors of success/error/loading icon
              iconTheme: {
                primary: "#000",
                secondary: "#fff",
              },

              // Aria
              ariaProps: {
                role: "status",
                "aria-live": "polite",
              },
            });

          }else{
            toast.error(`${data?.message}`,{
            // toast.error(cancelorder?.message, {

              duration: 5000,
              position: "top-center",

              // Styling
              style: {
                padding: "1rem",
                fontSize: "15px",
                color: "red",
                fontWeight: "bold",
              },
              className: "",

              // Custom Icon
              // icon: "👏",

              // Change colors of success/error/loading icon
              iconTheme: {
                primary: "red",
                secondary: "#fff",
              },

              // Aria
              ariaProps: {
                role: "status",
                "aria-live": "polite",
              },
            });
          }

    }catch(error){
      console.log(error,"error")
    } finally {
      getUserOpenOrders();
    }
   
  }

  const getUserOpenOrders = async() => {
    // alert(selectedPairs);

    const { data } = await Axios.post(`/bybit/getopenorders`,{ category : 'spot', pair : selectedPairs }, {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      }
    })

    if(data?.success){
      setOrderlist(data?.result);
    }

  }

  useEffect(() => {
    getUserOpenOrders();
  }, [selectedPairs])

  return (
    <>
    <TableContainer>

      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        className="table-style-open-order"
      >

        <TableHead>
          <TableRow>
            {header.map((item, index) => {
              return (
                <TableCell
                  sx={{ fontWeight: "500", fontSize: "16px" }}
                  key={index}
                >
                  {item}{" "}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        {orderlist && (
          <TableBody>
            {/* {console.log(orderlist, "orderlist")} */}

            {orderlist?.map((row,index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  {/* {console.log(row, "rowsss")} */}

                  {row?.createdTime
                    ? new Date(Number(row?.createdTime)).toLocaleString()
                    : "-"}
                </TableCell>
                <TableCell>{row.orderType ? row.orderType : "-"}</TableCell>
                <TableCell>{row.symbol ? row.symbol : "-"}</TableCell>
                <TableCell
                  sx={{
                    color: `${row.side == "buy"
                      ? "#25DEB0 !important"
                      : "#CA3F64 !important"
                      }`,
                  }}
                >
                  {row.price ? row.price : "0"}
                </TableCell>
                <TableCell>{row.remaining ? row.remaining : "0"}</TableCell>
                <TableCell>{row.trade_at ? row.trade_at : "spot"}</TableCell>
                <TableCell
                  sx={{
                    color: `${row.side == "buy"
                      ? "#25DEB0 !important"
                      : "#CA3F64 !important"
                      }`,
                  }}
                >
                  {row.side ? row.side : "-"}
                </TableCell>
                <TableCell>{row.qty ? row.qty : "-"}</TableCell>
                <TableCell>{row.orderStatus ? 'init' : "-"}</TableCell>
                <TableCell>
                  <Button
                    // onClick={() => {
                    //   cancelOrder(row);
                    // }}
                    onClick={() => {
                      bybitcancelOrder(row);
                    }}
                    variant="contained"
                    style={{ fontSize: "10px" }}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>

      {loading && (
        <div style={{ width: "80%", padding: "1rem" }}>
          <CircularProgress size={"60"} />
        </div>
      )}

      {!loading && !orderlist && (
        <div style={{ backgroundColor: "lightgrey" }}>
          <h5 style={{ padding: "1rem", color: "black" }}>Data Not Found</h5>
        </div>
      )}
    </TableContainer>
    </>
  );
}
