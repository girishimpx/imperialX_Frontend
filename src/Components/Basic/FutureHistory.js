import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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


import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";


export default function FutureHistory({ selected,positionnumber }) {
  const user = JSON.parse(window.localStorage.getItem("users"))
  const [amountOpnOrder, setAmountOpnOrder] = React.useState('market');
  const [amountOpnOrder1, setAmountOpnOrder1] = React.useState(100);

  


  const [val, setval] = useState('')

  const handleChange = (event) => {
    setval('')
    setAmountOpnOrder(event.target.value);
  };

  const handleChange1 = (event) => {
    setAmountOpnOrder1(event.target.value);
  };

  const [datas, setDatas] = useState([])
  const getdatas = async () => {
    try {
      console.log(selected)
      const { data } = await Axios.post(`/trade/positionHistory`, { id: selected }, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        }
      })
      setDatas(data.result)
      
      
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getdatas()
  }, [selected])

  useEffect(() => {
    if (amountOpnOrder !== 'market') {
      setval(selected.price)
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
         icon:"",

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


  return (
    <TableContainer>
      
      {datas?.map((item, index) => {
        return (
          <div className='full-his'>
            <div className='top-group'>
              <span className='fu-pairs'>{item?.instId}</span>
              <span className='fu-type'>{item?.mgnMode}</span>
              <span className={item?.posSide === "long" ? 'fu-lo green-spot' : 'fu-lo red-spot'}>{item?.posSide} {item?.lever}x</span>
            </div>
            <div className='middle-group'>
              <div className='middle-first'>
                <div className='first'><label>Size</label> <span>{parseFloat(item?.notionalUsd).toFixed(2)} {item?.ccy}</span></div>
                <div className='first'> <label>Entry Price</label> <span>{item?.avgPx}</span></div>
              </div>
              <div>
                <div className='first'><label>Margin</label> <span>{item?.imr === "" ? parseFloat(item?.margin).toFixed(2) : parseFloat(item?.imr).toFixed(2)} {item?.ccy}</span></div>
                <div className='first'> <label>Mark Price</label> <span>{item?.last}</span></div>
              </div>
              <div>
                <div className='first'><label>Margin level</label> <span>7845 USDT</span></div>
                <div className='first'> <label>Est. liq. Price</label> <span>{parseFloat(item?.liqPx).toFixed(5)}</span></div>
              </div>
              <div>
                <div className='first'><label>PnL</label> <span className={item?.upl > 0 ? "green-spot" : "red-spot"} >{parseFloat(item?.upl).toFixed(2)} {item?.ccy}</span></div>
                <div className='first'> <label>PnL%</label> <span className={item?.upl > 0 ? "green-spot" : "red-spot"}  >{parseFloat(item?.uplRatio * 100).toFixed(2)} %</span></div>
              </div>
              <div className='middle-last'>
                {/* <TextField id="outlined-basic" className='fu-input' value="30.299" variant="outlined" /> */}

                <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className='fu-input fu-select-input'>
                  <InputLabel id="demo-select-small-label">Amount</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={amountOpnOrder}
                    label="Amount"
                    onChange={handleChange}
                  >
                    <MenuItem value={'market'}>Market</MenuItem>
                    <MenuItem value={'limit'}>{val !== '' ? val : "Last"}</MenuItem>
                  </Select>
                </FormControl>


                <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className='fu-input fu-select-input'>
                  <InputLabel id="demo-select-small-label">Amount</InputLabel>
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
                </FormControl>
                <button className='fu-btn' onClick={() => { createTrade(item) }}>Close</button>
                <button className='fu-btn' onClick={() => { createTrade1(item) }}>Close All</button>
              </div>
            </div>
            <div className='bottom-group'>
              <span>TP/SL</span>
              <span>Add+</span>
            </div>
          </div>
        )
      })}

      {datas?.length > 0 ? <></> : <div style={{ backgroundColor: "lightgrey" }}>
        <h5 style={{ padding: "1rem", color: "black" }}>Data Not Found</h5>
      </div>}
    </TableContainer >
  );
}