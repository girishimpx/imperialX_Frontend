import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Axios from "../../Axios";
import Consts from "../../Constansts";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import CryptoJS from 'crypto-js';
import WebSocket from 'websocket';



function createData(time, side, oldprice, total, ordervalue, sl, reduce, status, cancel) {
  return { time, side, oldprice, total, ordervalue, sl, reduce, status, cancel };
}

const rows = [ 
  createData(1.009, 159, 6.0, 24, 4.0, 1.009, 159, 6.0, 24),
  createData(3.009, 237, 9.0, 37, 4.3, 1.009, 159, 6.0, 24),
  createData(0.345, 262, 16.0, 24, 6.0, 1.009, 159, 6.0, 24),
  createData(1.97, 305, 3.7, 67, 4.3, 1.009, 159, 6.0, 24),
  createData(0.678, 356, 16.0, 49, 3.9, 1.009, 159, 6.0, 24),
  createData(1.009, 159, 6.0, 24, 4.0, 1.009, 159, 6.0, 24),
  createData(3.009, 237, 9.0, 37, 4.3, 1.009, 159, 6.0, 24),
  createData(0.345, 262, 16.0, 24, 6.0, 1.009, 159, 6.0, 24),
  createData(1.97, 305, 3.7, 67, 4.3, 1.009, 159, 6.0, 24),
  createData(0.678, 356, 16.0, 49, 3.9, 1.009, 159, 6.0, 24),
];

export default function   OpenOrderTable({selectedPairs, reload, ordreType}) {


  const [loading, setLoading] = React.useState(true);
  const [tradelist, settradelist] = React.useState();
  const [state, setState] = React.useState(false);
  const [pair,sertPair] = React.useState("All");
  const [orderlist, setOrderlist] = React.useState([]); // eslint-disable-
  // console.log(ordreType, "adouygfipadgi");

  const [cancelorder, setCancelOrder] = React.useState();


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

     const expires = new Date().getTime() + 30000; // Example: 10 seconds from now

    // Generate signature
    const signature = CryptoJS.HmacSHA256(`GET/realtime${expires}`, apiSecret).toString();

    // Create WebSocket connection
    const client = new WebSocket.w3cwebsocket(endpoint);

    client.onopen = () => {
      // console.log('WebSocket Client Connected');

      // Send authentication message
      client.send(JSON.stringify({
        op: 'auth',
        args: [apiKey, expires, signature]
      }));

      client.send(JSON.stringify({
        op: 'subscribe',
        args: [
          'order',
          // Add more topics as needed
        ]
      }));
    };
    // console.log(signature,apiKey,expires,"params")
    client.onmessage = (event) => {
      // console.log('Message received:', event.data);
      const data = JSON.parse(event.data);

      // Check if the message is an order update
      console.log(data,'openorderdata');
      if (data?.topic == "order" && data?.data?.length > 0) {
        const filterorder = []
        for(let i =0; i < data?.data.length; i++){
          const orders = data?.data[i]
          console.log('Orders', orders);
          // if(orders?.symbol == selectedPairs && orders?.orderType == ordreType){
          //   filterorder.push(orders)
          // }
          // console.log(ordreType,orders?.orderType.toLowerCase(),'orderrr');
          if(orders?.orderType.toLowerCase() == ordreType.toLowerCase()){
            filterorder.push(orders)
          }

        }
        // console.log('filterorder', filterorder);
        setOrderlist(filterorder);
      }
    };

    client.onerror = (error) => {
      // console.error('WebSocket Error:', error);
      // Handle WebSocket errors
    };

    client.onclose = () => {
      // console.log('WebSocket Connection Closed');
      // Handle WebSocket closed
    };

    // Cleanup function
    return () => {
      // console.log('Cleaning up WebSocket connection');
      client.close();
    };

  }


  useEffect(() => {
  connectUserSocket();
}, []);


  // React.useEffect(() => {
  //   let token = localStorage.getItem("Mellifluous");
  //   if (token) {
  //     Axios.post(`${Consts.BackendUrl}/trade/tradeHistory`,{pair:selectedPairs},{
  //       headers: {
  //         Authorization: token,
  //       },
  //     })
  //       .then((res) => {
  //         console.log(res, 'tradeHistory'	);
  //         let data = [];
  //         res?.data?.result.map((item, index) => {
  //           if(item.trade_at == "future" || item.trade_at == "Future"){
  //           if (item.status == "init" || item.status == "partially_filled") {
  //             data.push(item);
  //           }
  //         }
  //         });
  //         if (data.length > 0) {
  //           settradelist(data.reverse());
  //         }
  //         setLoading(false);
  //       })
  //       .catch((err) => {
          
  //         setLoading(false); 
  //       });
  //   }
  // }, [state,selectedPairs]);
  
  const [isZero, setIsZero] = React.useState(reload);

  // React.useEffect(() => {
  //   if(isZero == 1){
  //   let token = localStorage.getItem("Mellifluous");
  //   if (token) {
  //     Axios.post(`${Consts.BackendUrl}/trade/tradeHistory`,{pair:selectedPairs},{
  //       headers: {
  //         Authorization: token,
  //       },
  //     })
  //       .then((res) => {
  //         console.log(res, 'tradeHistory'	);
  //         let data = [];
  //         res?.data?.result.map((item, index) => {
  //           if(item.trade_at == "future" || item.trade_at == "Future"){
  //           if (item.status == "init" || item.status == "partially_filled") {
  //             data.push(item);
  //           }
  //         }
  //         });
  //         if (data.length > 0) {
  //           settradelist(data.reverse());
  //         }
  //         setLoading(false);
  //       })
  //       .catch((err) => {
          
  //         setLoading(false); 
  //       });
  //   }
  //   setIsZero(0)
  // }
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
  //     // instId:"BTC-USDT",
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
           
  //         duration: 3000,
  //         position: "top-center",

  //         // Styling
  //         style: {
  //           padding: "1rem",
  //           fontSize: "15px",
  //           color: "green",
  //           fontWeight: "bold",
  //         },
  //         className: "",

  //         // Custom Icon
  //         icon: "👏",

  //         // Change colors of success/error/loading icon
  //         iconTheme: {
  //           primary: "#000",
  //           secondary: "#fff",
  //         },

  //         // Aria
  //         ariaProps: {
  //           role: "status",
  //           "aria-live": "polite",
  //         },
  //       });
  //         setTimeout(() => {
  //           setState(!state);
  //         }, 1000);
  //       } else {
        
  //         toast.error(`${res.data.message}`, {
           
  //         duration: 4000,
  //         position: "top-center",

  //         // Styling
  //         style: {
  //           padding: "1rem",
  //           fontSize: "15px",
  //           color: "red",
  //           fontWeight: "bold",
  //         },
  //         className: "",

  //         // Custom Icon
  //        icon:"",

  //         // Change colors of success/error/loading icon
  //         iconTheme: {
  //           primary: "#000",
  //           secondary: "#fff",
  //         },

  //         // Aria
  //         ariaProps: {
  //           role: "status",
  //           "aria-live": "polite",
  //         },
  //       });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err?.rtesponse?.data?.message);
  //     });
  // };


  const bybitcancelOrder = async(selectedItem)=>{
    try{
      let params = {
        category: 'linear',
        symbol:selectedItem.symbol,
        orderId:selectedItem.orderId
      }
      // console.log(params,'datasaw')

      const { data } = await Axios.post(`/bybit/cancelorder`, params, {
            headers: {
              Authorization: localStorage.getItem("Mellifluous"),
            },
          })
          // console.log(data,'cancelorder')
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
            setTimeout(() => {
              openordersbyPairs();
            }, 2000)
    }
   
  }


  const openordersbyPairs = async() => {
    const { data } = await Axios.post(`/bybit/getopenorders`,{pair : selectedPairs}, {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      }
    })

   
    if(data?.success && data?.result?.length > 0){
      const filterorder = []

      for(let i =0; i < data?.result.length; i++){
        const orders = data?.result[i]
        // console.log('Orders1', orders);
        // if(orders?.symbol == selectedPairs && orders?.orderType == ordreType){
        //   filterorder.push(orders)
        // }
        // console.log(ordreType,orders?.orderType.toLowerCase(),'orderrr');
        if(orders?.orderType.toLowerCase() == ordreType.toLowerCase()){
          filterorder.push(orders)
        }

      }

      if(filterorder?.length > 0){
        setOrderlist(filterorder);
      }
      
    } else if (data?.success && data?.result?.length <= 0) {
      setOrderlist([]);
    }
  }

  useEffect(() => {
    openordersbyPairs();
  }, [selectedPairs])

  const getUserOpenOrders = async() => {
    // alert(selectedPairs);

    const { data } = await Axios.post(`/bybit/getopenorders`,{ category : 'linear', pair : selectedPairs }, {
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
    <TableContainer>
      {/* {console.log(orderlist,'orderlistttt')} */}
      <Table sx={{ minWidth: 650 }} aria-label="simple table" className='table-style-open-order'>
      <TableHead>
          <TableRow>
            {header.map((item, index) => {
              return <TableCell sx={{fontWeight:"500",fontSize:"16px"}} key={index}>{item} </TableCell>;
            })}
          </TableRow>
        </TableHead>
        {orderlist && (
          <TableBody>
            {orderlist.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  {row.createdTime
                    ? new Date(row.createdTime  / 1000).toLocaleString()
                    : "-"}
                </TableCell>
                <TableCell>{row?.orderType ? row?.orderType : "-"}</TableCell>
                <TableCell>{row?.symbol ? row?.symbol : "-"}</TableCell>
                <TableCell sx={{color:`${row?.side=="buy" ? "#25DEB0 !important" : "#CA3F64 !important"}`}}>{row?.price ? row?.price : "0"}</TableCell>
                <TableCell>{row?.remaining ? row?.remaining : "0"}</TableCell>
                <TableCell>{row?.trade_at ? row?.trade_at : "-"}</TableCell>
                <TableCell sx={{color:`${row?.side=="buy" ? "#25DEB0 !important" : "#CA3F64 !important"}`}}>{row?.side ? row?.side : "-"}</TableCell>
                <TableCell>{row?.qty ? row?.qty : "-"}</TableCell>
                <TableCell>{row?.orderStatus ? row?.orderStatus : "-"}</TableCell>
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

      { !orderlist && (
        <div style={{ backgroundColor: "lightgrey" }}>
          <h5 style={{ padding: "1rem", color: "black" }}>Data Not Found</h5>
        </div>
      )}
    </TableContainer>
  );
}