import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import BeatLoader from "react-spinners/MoonLoader";
import './FutureHistory.css'
import Axios from '../../Axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { parse } from '@fortawesome/fontawesome-svg-core';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CryptoJS from 'crypto-js';
import WSS from 'websocket';

import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import consts from '../../Constansts';
import { Button } from 'rsuite';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Consts from "../../Constansts";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px !important',
  bgcolor: '#252525',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function FutureHistory({ selected, positionnumber }) {
  const user = JSON.parse(window.localStorage.getItem("users"))
  const [amountOpnOrder, setAmountOpnOrder] = React.useState('Market');
  const [amountOpnOrder1, setAmountOpnOrder1] = React.useState(100);
  const [positionLength, setPositionLength] = useState(0);
  const [marketQty, setMarketQty] = useState(0);
  const [marketSize, setMarketSize] = useState(100);
  
  const [limitPrice, setLimitPrice] = useState(0);
  const [minOrder, setMinOrder] = useState(0);
  const [api, setApi] = useState('');
  const [secret, setSecret] = useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openMarket, setOpenMarket] = React.useState(false);
  const limitPric = React.useRef('')
 

  const handleOpenMarket = () => setOpenMarket(true);
  const handleCloseMarket = () => setOpenMarket(false);

  const [valueNew, setValueNew] = useState(0);
  const [limitLoad, setLimitLoad] = useState(false);
  const [marketLoad, setMarketLoad] = useState(false);
  const [marketPrice, setMarketPrice] = useState(0);
  const [marketSymbol, setMarketSymbol] = useState('');
  const [allPositionDatas, setAllPositionDatas] = useState([]);

  const handleIncrement = () => {
    setValueNew(prevValue => prevValue + 1);
  };

  const handleDecrement = () => {
    setValueNew(prevValue => prevValue - 1);
  };

  const handleChangeIncDec = (event) => {
    const newValue = event.target.value;
    if (!isNaN(newValue)) {
      setValueNew(Number(newValue));
    }
  };


  const handleMarketClose = (item) => {
    setMarketQty(item?.size);
    setMarketSize(item?.size);
    handleOpenMarket();
  }
  
  const handleLimitClose = (item) => {
    setMarketSize(item?.size);
    setMarketQty(item?.size);
    setLimitPrice(item?.avgPrice ? item?.avgPrice : item?.sessionAvgPrice);
    handleOpen();
  }

  const handleQtySize = (val) => {
    const qtySize = Math.round( marketQty * (val / 100) )
    // console.log(qtySize,'sizeofquantity');
    setMarketSize(qtySize >= minOrder ? qtySize : minOrder);
    
  }

  const [val, setval] = useState('')

  const handleChange = (event) => {
    setval('')
    setAmountOpnOrder(event.target.value);
  };

  const handleChange1 = (event) => {
    setAmountOpnOrder1(event.target.value);
  };

  const [datas, setDatas] = useState([])

  const connectUserSocket = async() => {
    var decryptedApiKey;
    var decryptedSecretKey

    try {
      
     await Axios.get(`/bybit/getuserdata`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
            // console.log(res?.data?.success,"exzi")
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
             
              setApi(decryptedApiKey);
              setSecret(decryptedSecretKey);

              // alert(decryptedApiKey);

            }
        })
        .catch((err) => {
          console.log(err,'err');
        });

    } catch (error) {
      console.log(error,'error');
    }


    const apiKey = decryptedApiKey //'jHlgwulzoxB7rbtDog';
    const apiSecret = decryptedSecretKey //'x4o1P0Qw50i0pCkczObCJkHtZQ7gUsA51GaS'
    const endpoint = 'wss://stream.bybit.com/v5/private';

    // Generate expires timestamp
    const expires = new Date().getTime() + 30000; // Example: 10 seconds from now

    // Generate signature
    const signature = CryptoJS.HmacSHA256(`GET/realtime${expires}`, apiSecret).toString();

    // Create WebSocket connection
    const client = new WSS.w3cwebsocket(endpoint);

     client.onopen = () => {
      // console.log('WebSocket Client Connected');

      // Send authentication message
      client.send(JSON.stringify({
        op: 'auth',
        args: [apiKey, expires, signature]
      }));

      // setInterval(() => {
      //   client.ping(); 
      // }, 30000);
      // client.ping();

      client.send(JSON.stringify({
        op: 'subscribe',
        args: [ "position" ]
      }));


    };
    // console.log(signature,apiKey,expires,"params")
    client.onmessage = (event) => {
      // console.log('Message received positiion:', event);
      const data = JSON.parse(event?.data);
      // console.log(data,"datasa")

      // Check if the message is an order update
      if (data?.topic === 'position' && data?.data?.length > 0) {
        const Orders = data?.data
        // console.log('Orders', Orders);
        setDatas(Orders);
        positionnumber(data?.data?.length); 
        getPositionsList();
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


  // const getdatas = async () => {
  //   try {
  //     console.log(selected)
  //     const { data } = await Axios.post(`/trade/positionHistory`, { id: selected }, {
  //       headers: {
  //         Authorization: localStorage.getItem("Mellifluous"),
  //       }
  //     })
  //     setDatas(data.result)


  //   } catch (error) {
  //     console.log(error)
  //   }

  // }

  // useEffect(() => {
  //   getdatas()
  // }, [selected])

  useEffect(() => {
    if (amountOpnOrder !== 'market') {
      setval(selected?.price)
    } else {
      setval('')
    }
  }, [selected])

  // useEffect(() => {
  //   setInterval(() => {
  //     getdatas()
  //   }, 30000)
  // }, [])





  const createTrade = async (item) => {
    try {
      var payload;
      if (item?.posSide === 'long') {
        payload = {
          instId: item?.instId,
          tdMode: item?.mgnMode,
          ccy: item?.ccy,
          tag: "mk1",
          side: "sell",
          orderType: amountOpnOrder,
          sz: parseFloat(item?.notionalUsd).toFixed(2),
          px: selected?.price === undefined ? 0 : Number(selected?.price),
          trade_at: "future-close-long",
          lever: amountOpnOrder1,
        }
      } else {
        payload = {
          instId: item?.instId,
          tdMode: item?.mgnMode,
          ccy: item?.ccy,
          tag: "mk1",
          side: "buy",
          orderType: amountOpnOrder,
          sz: parseFloat(item?.notionalUsd).toFixed(2),
          px: selected?.price === undefined ? 0 : Number(selected?.price),
          trade_at: "future-close-short",
          lever: amountOpnOrder1,
        }
      }


      if (user.trader_type === "user") {

        const { data } = await Axios.post(`/trade/userTrade`, payload, {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          }
        })
        if (data) {
          toast.success(data.message, {

            duration: 4000,
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
        } else {
          toast.success("Something Went Wrong", {

            duration: 4000,
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
        }
      } else {
        const { data } = await Axios.post(`/trade/CreateTrade`, payload, {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          }
        })
        if (data) {
          toast.success(data.message, {

            duration: 4000,
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
        } else {
          toast.error("Something Went Wrong", {

            duration: 4000,
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
            icon: "",

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
        }
      }
    } catch (error) {
      console.log(error)
    }

  }
  const createTrade1 = async (item) => {
    try {


      var payload;
      if (item?.posSide === 'long') {
        payload = {
          instId: item?.instId,
          tdMode: item?.mgnMode,
          ccy: item?.ccy,
          tag: "mk1",
          side: "sell",
          orderType: amountOpnOrder,
          sz: parseFloat(item?.notionalUsd).toFixed(2),
          px: selected?.price === undefined ? 0 : Number(selected?.price),
          trade_at: "future-close-long",
          lever: amountOpnOrder1,
        }
      } else {
        payload = {
          instId: item?.instId,
          tdMode: item?.mgnMode,
          ccy: item?.ccy,
          tag: "mk1",
          side: "buy",
          orderType: amountOpnOrder,
          sz: parseFloat(item?.notionalUsd).toFixed(2),
          px: selected?.price === undefined ? 0 : Number(selected?.price),
          trade_at: "future-close-short",
          lever: amountOpnOrder1,
        }
      }

      if (user.trader_type === "user") {

        const { data } = await Axios.post(`/trade/userTrade`, payload, {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          }
        })
        if (data) {
          toast.success(data.message, {

            duration: 4000,
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
        } else {
          toast.success("Something Went Wrong", {

            duration: 4000,
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
        }
      } else {
        const { data } = await Axios.post(`/trade/CreateTrade`, payload, {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          }
        })
        if (data) {
          toast.success(data.message, {

            duration: 4000,
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
        } else {
          toast.success("Something Went Wrong", {

            duration: 4000,
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
        }
      }
    } catch (error) {
      console.log(error)
    }

  }

  const closePositionInLimit = async(item,limitPrice) => {
    try {
      // alert(limitPrice);
      setLimitLoad(true);
      const params = {
        category : 'linear',
        price : limitPrice,
        symbol : item?.symbol,
        side : item?.side === 'Buy' ? 'Sell' : 'Buy',
        orderType : 'Limit',
        qty : marketSize,
        reduceOnly : true 
      };

      const { data } = await Axios.post(`/bybit/closeposition`,params,{
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        }
      })

      if(data?.success){
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error,'error');
    } finally {
      setLimitLoad(false);
      handleClose();
      setTimeout(() => {
      getPositionsList();
      },1000)
      
    }
   
  }

  const closePositionInMarket = async(item) => {
    try {
      setMarketLoad(true);
      const params = {
        category : 'linear',
        symbol : item?.symbol,
        side : item?.side === 'Buy' ? 'Sell' : 'Buy',
        orderType : amountOpnOrder,
        price : '123',
        qty : marketSize,
        reduceOnly : true 
      };

      const { data } = await Axios.post(`/bybit/closeposition`,params,{
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        }
      })

      if(data?.success){
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error,'error');
    } finally {
      setMarketLoad(false);
      handleCloseMarket();
      setTimeout(() => {
      getPositionsList();
      },1000)
      
    }
   
  }


  const getPositionsList = async() => {
    const { data } = await Axios.post(`/bybit/getposition`, {
            headers: {
              Authorization: localStorage.getItem("Mellifluous"),
            }
          })

          positionnumber(data?.result?.length);
          if(data?.success && data?.result?.length > 0){
            if(datas?.length == 0){
              setDatas(data?.result);
            }
          } else {
            setDatas(data?.result);
          }
  }

  const getPairDetailes = async() => {
    const { data } = await Axios.post(`/bybit/getpairdetailes`,{type : 'linear', pair : selected}, {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      }
    })
    if(data?.success){
      setMinOrder(data?.result[0].lotSizeFilter?.minOrderQty);
    }
    
  }

  const getMarketPrice = async () => {
    const endpoint = Consts.bybitsocketurl;
    const clients = new WebSocket(endpoint);
    
    // console.log(datas, 'datasdatas');

    clients.onopen = () => {
        // Send periodic pings every 30 seconds to keep the connection alive
        setInterval(() => {
            clients.send('ping');
        }, 30000);

        const subscriptions = datas
            .map(position => `publicTrade.${position?.symbol}`);

        // Construct the subscription message according to Bybit's format
        const subscriptionMessage = JSON.stringify({
            op: "subscribe",
            args: subscriptions
        });

        // console.log(subscriptionMessage, 'subscriptionMessage');

        // Send the subscription message
        clients.send(subscriptionMessage);
    };

    clients.onmessage = (event) => {
        const response = JSON.parse(event?.data);

        // Check if the response contains data and process it
        if (response?.data?.length > 0) {
            // console.log(response, 'MarketPrice');
            setMarketPrice(response?.data[0]?.p);
            setMarketSymbol(response?.data[0]?.s);
            setAllPositionDatas(response?.data);
        }
    };

    clients.onclose = () => {
        console.log('WebSocket closed');
    };

    clients.onerror = (error) => {
        console.error('WebSocket Error:', error);
    };

    // Return a function to close the WebSocket connection when needed
    return () => {
        clients.close();
    };
};

  useEffect(() => {
    getPositionsList()
    getPairDetailes()

    if(datas?.length > 0){
      getMarketPrice();
    }
 
  }, [selected, datas])


  return (
    <TableContainer>

      {datas?.map((item, index) => {
        // console.log(allPositionDatas,'allPositionDatas');
        const matchData = allPositionDatas?.find(data => data?.s == item?.symbol)
        // {console.log(matchData,'matchDataaaaa');}
        return (
          <div className='full-his'>
            <div className='top-group'>
              {/* <span className='fu-pairs'>{item?.instId}</span> */}
              <span className='fu-pairs'>{item?.symbol}</span>

              {/* <span className='fu-type'>{item?.mgnMode}</span> */}
              <span className='fu-type'>{item?.tradeMode == 0 ? 'cross' : 'isolated'}</span>

              {/* <span className={item?.posSide === "long" ? 'fu-lo green-spot' : 'fu-lo red-spot'}>{item?.posSide} {item?.lever}x</span> */}
              <span className={item?.side === "Buy" ? 'fu-lo green-spot' : 'fu-lo red-spot'}>{item?.side} {item?.leverage}x</span>

            </div>
            <div className='middle-group'>
              <div className='middle-first'>
                {/* <div className='first'><label>Size</label> <span>{parseFloat(item?.notionalUsd).toFixed(2)} {item?.ccy}</span></div> */}
                <div className='first'><label>Size</label> <span>{parseFloat(item?.size).toFixed(2)} {item?.symbol}</span></div>

                {/* <div className='first'> <label>Entry Price</label> <span>{item?.avgPx}</span></div> */}
                <div className='first'> <label>Entry Price</label> <span>{item?.sessionAvgPrice ? item?.sessionAvgPrice : item?.avgPrice}</span></div>
              </div>
              <div>
                {/* <div className='first'><label>Margin</label> <span>{item?.imr === "" ? parseFloat(item?.margin).toFixed(2) : parseFloat(item?.imr).toFixed(2)} {item?.ccy}</span></div> */}
                <div className='first'><label>Margin</label> <span>{item?.positionIM === "" ? parseFloat(item?.positionBalance).toFixed(2) : parseFloat(item?.positionIM).toFixed(2)} {item?.symbol}</span></div>

                {/* <div className='first'> <label>Mark Price</label> <span>{item?.last}</span></div> */}
                <div className='first'> <label>Mark Price</label> <span>{item?.markPrice}</span></div>

              </div>
              <div>
                <div className='first'><label>Margin level</label> <span>7845 USDT</span></div>
                {/* <div className='first'> <label>Est. liq. Price</label> <span>{parseFloat(item?.liqPx).toFixed(5)}</span></div> */}
                <div className='first'> <label>Est. liq. Price</label> <span>{item?.liqPrice != '' ? parseFloat(item?.liqPrice).toFixed(5) : '--'}</span></div>

              </div>
              <div>
                {/* <div className='first'><label>PnL</label> <span className={item?.upl > 0 ? "green-spot" : "red-spot"} >{parseFloat(item?.upl).toFixed(2)} {item?.ccy}</span></div> */}
                {/* <div className='first'><label>PnL</label> <span className={item?.unrealisedPnl >= 0 ? "green-spot" : "red-spot"} >{parseFloat((item?.unrealisedPnl)).toFixed(4)} {item?.symbol}</span></div> */}
                {/* <div className='first'><label>PnL</label> <span className={(Number(Number(marketPrice) * Number(item?.size)) - ( Number(item?.avgPrice) * Number(item?.size))) >= 0 ? "green-spot" : "red-spot"} >{ (Number(Number(marketPrice) * Number(item?.size)) - ( Number(item?.avgPrice) * Number(item?.size))).toFixed(4)} {item?.symbol}</span></div> */}
                <div className='first'><label>PnL</label> <span className={Number(Number(matchData?.p) * Number(item?.size) - Number(item?.avgPrice) * Number(item?.size)) > 0 ? "green-spot" : "red-spot"} >{ matchData ? Number(Number(matchData?.p) * Number(item?.size) - Number(item?.avgPrice) * Number(item?.size)).toFixed(4) : Number(Number(item?.markPrice) * Number(item?.size) - Number(item?.avgPrice) * Number(item?.size)).toFixed(4)} {item?.symbol}</span></div>
                
                {/* <div className='first'> <label>PnL%</label> <span className={item?.upl > 0 ? "green-spot" : "red-spot"}  >{parseFloat(item?.uplRatio * 100).toFixed(2)} %</span></div> */}
                {/* <div className='first'> <label>PnL%</label>  <span className={Number(item?.unrealisedPnl) >= 0 ? "green-spot" : "red-spot"}>{Number(item?.unrealisedPnl) > 0 && Number(item?.positionValue) > 0 ? parseFloat((parseFloat(item?.unrealisedPnl) / parseFloat(item?.positionValue)) * 100).toFixed(4) : 0} %</span></div> */}
                <div className='first'> <label>PnL%</label>  <span className={Number(item?.unrealisedPnl) >= 0 ? "green-spot" : "red-spot"}>{ Math.round(Number((Number(marketPrice) * Number(item?.size)) - ( Number(item?.avgPrice) * Number(item?.size))) / Number(item?.avgPrice))} %</span></div>

              </div>
              <div className='middle-last'>
                {/* <TextField id="outlined-basic" className='fu-input' value="30.299" variant="outlined" /> */}

                {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className='fu-input fu-select-input'>
                  <InputLabel id="demo-select-small-label">Close By</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={amountOpnOrder}
                    label="Amount"
                    onChange={handleChange}
                  >
                    <MenuItem value={'Market'}>Market</MenuItem>
                    <MenuItem value={'Limit'}>Limit</MenuItem>
                    <MenuItem value={'Limit'}>{val !== '' ? val : "Last"}</MenuItem>
                  </Select>
                </FormControl> */}
               
               <Stack direction="row" spacing={2} className='button-for-modal'>
                {/* <Button onClick={handleOpen}>Limit</Button> */}
                <Button onClick={() => { handleLimitClose(item) }}>Limit</Button> 
                <Button onClick={() => { handleMarketClose(item) }}>Market</Button>
                {/* <Button onClick={handleOpenMarket}>Market</Button> */}
                </Stack>

                <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style} className="limit-market-popup-modal-css">
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <div className='limit-close-btn'>Limit Close <HighlightOffIcon onClick={handleClose}/></div>
          </Typography>
          <div className='limit-market-flex'>
          <label>Closing Price </label>
          <Stack>
          <TextField 
          // type="number" 
          value={limitPrice} 
          ref={limitPric}
          onChange={(e) => {setLimitPrice(e.target.event)}}
          inputProps={{ style: { textAlign: 'center' },  maxLength: 6 }}
          style={{ margin: '0 10px' }}
          className='limit-textfield'
          />
          {/* <div className='inc-dec-butns-click'>
          <Button variant="contained" onClick={handleDecrement}>-</Button>
          <Button variant="contained" onClick={handleIncrement}>+</Button>
          </div> */}
          </Stack>
          </div>
          <div className='limit-market-flex'>
          <label>Closed Qty </label>
          <Stack>
          <TextField 
          // type="number" 
          value={marketSize} 
          // onChange={handleChangeIncDec}
          inputProps={{ style: { textAlign: 'center' } }}
          style={{ margin: '0 10px' }}
          className='limit-textfield'
          />
          {/* <div className='inc-dec-butns-click'>
          <Button variant="contained" onClick={handleDecrement}>-</Button>
          <Button variant="contained" onClick={handleIncrement}>+</Button>
          </div> */}
          </Stack>
          </div>
          <Stack className="range-percentage-limit-market" direction="row" spacing={2} justifyContent="space-between">
            <Button onClick={() => handleQtySize(10)}>10%</Button>
            <Button onClick={() => handleQtySize(25)}>25%</Button>
            <Button onClick={() => handleQtySize(50)}>50%</Button>
            <Button onClick={() => handleQtySize(75)}>75%</Button>
            <Button onClick={() => handleQtySize(100)}>100%</Button>
          </Stack>

          <Stack className="range-percentage-limit-market-cc" direction="row" spacing={2} justifyContent="space-between">
            <Button variant="contained" disabled={limitLoad} onClick={() => closePositionInLimit(item,limitPrice)}>{ limitLoad ? <BeatLoader size={20}/> : 'Confirm' }</Button>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>

      <Modal
        open={openMarket}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style} className="limit-market-popup-modal-css">
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <div className='limit-close-btn'>Market Close <HighlightOffIcon onClick={handleCloseMarket}/></div>
          </Typography>
          <div className='limit-market-flex'>
          <label>Closed Qty </label>
          <Stack>
          <TextField 
          // type="number" 
          value={marketSize} 
          // onChange={handleChangeIncDec}
          inputProps={{ style: { textAlign: 'center' } }}
          style={{ margin: '0 10px' }}
          className='limit-textfield'
          />
          {/* <div className='inc-dec-butns-click'>
          <Button variant="contained" onClick={handleDecrement}>-</Button>
          <Button variant="contained" onClick={handleIncrement}>+</Button>
          </div> */}
          </Stack>
          </div>
          <Stack className="range-percentage-limit-market" direction="row" spacing={2} justifyContent="space-between">
            <Button onClick={() => handleQtySize(10)}>10%</Button>
            <Button onClick={() => handleQtySize(25)}>25%</Button>
            <Button onClick={() => handleQtySize(50)}>50%</Button>
            <Button onClick={() => handleQtySize(75)}>75%</Button>
            <Button onClick={() => handleQtySize(100)}>100%</Button>
          </Stack>

          <Stack className="range-percentage-limit-market-cc" direction="row" spacing={2} justifyContent="space-between">
            <Button variant="contained" disabled={marketLoad} onClick={() => { closePositionInMarket(item) }}>{ marketLoad ? <BeatLoader size={20}/> : 'Confirm' }</Button>
            <Button variant="outlined" onClick={handleCloseMarket} >Cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </div>

    
                {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className='fu-input fu-select-input'>
                  <InputLabel id="demo-select-small-label">Quantity</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={amountOpnOrder1}
                    label="Amount"
                    onChange={handleChange1}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                </FormControl> */}
                {/* <button className='fu-btn' onClick={() => { closePositions(item) }}>Close</button> */}
                {/* <button className='fu-btn' onClick={() => { createTrade1(item) }}>Close All</button> */}
              </div>
            </div>
            {/* <div className='bottom-group'>
              <span>TP/SL</span>
              <span>Add+</span>
            </div> */}
          </div>
        )
      })}

      {datas?.length > 0 ? <></> : <div style={{ backgroundColor: "lightgrey" }}>
        <h5 style={{ padding: "1rem", color: "black" }}>Data Not Found</h5>
      </div>}
    </TableContainer >
  );
}