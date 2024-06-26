import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../../Axios";
import { Slider, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InputLabel, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Consts from "../../Constansts";
import { useNavigate } from "react-router-dom";



const ThumbSlider = styled(Slider)(({ theme }) => ({
  marginTop: 10,
  '& .MuiSlider-thumb': {
    color: 'black',
    transform: 'rotate(45deg)',
    width: 12,
    height: 12,
    marginTop: '-8px',
    border: '3px solid #b7bdc6',
    borderRadius: '2px',
    '&:focus, &:hover, &$active': {
      boxShadow: 'none',
      transform: 'rotate(-45deg)',
    },
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#474d57'
  },
  '& .MuiSlider-root': {
    color: '#b7bdc6'
  },
  '& .MuiSlider-track': {
    color: '#b7bdc6'
  },
  '& .MuiSlider-valueLabel': {
    top: '-30px',
    transform: 'rotate(-45deg)',
    backgroundColor: 'transparent',
  },
  '& .MuiSlider-valueLabel.MuiSlider-valueLabelOpen': {
    transform: 'rotate(-45deg)',
  },
  '& .MuiSlider-mark': {
    // backgroundColor:'black',
    color: 'black',
    transform: 'rotate(45deg)',
    width: 8,
    height: 8,
    marginTop: '-4px',
    border: '2px solid #474d57',
    '&:hover': {
      backgroundColor: '#474d57',
      border: '2px solid black',
    },
    '& $active': {
      backgroundColor: '#474d57',
      border: '2px solid black',
    },
    '&:focus': {
      border: '2px solid black',
    },
    '&:active': {
      border: '2px solid black',
    }
  }
}));




const ValueLabelComponent = (props) => {
  const { value } = props;
  return (
    <div>
      <span>{value}%</span>

    </div>
  );
};

function valuetext(value) {
  return `${value}°C`;
}


const BuyFormInner = ({ selected, pair, index, market, ordertype,lever, labe, reload }) => {
  // console.log(selected.price, pair, index, ordertype, labe,lever,'COPMPLETEF');
  const user = JSON.parse(window.localStorage.getItem("users"))
  const [price, setPrice] = React.useState();
  const [Amount, setAmount] = React.useState();
  const [total, settotal] = React.useState();
  const [value, setValue] = React.useState();
  const [sli, setSli] = React.useState(0)
  const Amountref = useRef()
  const [load, setload] = useState(true)
  const [takeProfit, setTakeProfit] = React.useState('');
  const [isCheckedTakeProfit, setCheckedTakeProfit] = useState(false);
  const [isCheckedReduceOnly, setCheckedReduceOnly] = useState(false);
  const [isCheckedStopLoss, setCheckedStopLoss] = useState(false);
  const [balance, setBalance] = useState()
  const [activeClass, setActiveClass] = useState("1");
  const [kycsubmit, setkycsubmit] = React.useState(false);
  const [buyShow, setBuyShow] = React.useState(false);
  const navigate = useNavigate();
  const [maxbuy, setMaxbuy] = useState();
  const [quantity, setQuantity] = React.useState(0.01);
  const [maxquantity, setMaxQuantity] = React.useState(0.01);

  const TP = useRef('');
  const SL = useRef('');

  const percentageValue = async (e) => {
    setActiveClass(e.target.id);
  }

  const handleChangeTakeProfit = () => {
    setCheckedTakeProfit(!isCheckedTakeProfit);
  };

  const handleChangeReduceOnly = () => {
    setCheckedReduceOnly(!isCheckedReduceOnly);
  };

  const handleChangeStopLoss = () => {
    setCheckedStopLoss(!isCheckedStopLoss);
  };
  const handleTakeProfit = (event) => {
    setTakeProfit(event.target.value);
  };

  React.useEffect(() => {

    if (selected) {
      setPrice(selected.price);
      // setAmount(selected.amount);
      // settotal(selected.total);
    }
    if (Amount !== "") {
      // console.log(Amount)
      settotal(Amount * price)
    } else {
      settotal("")
    }
  }, []);

  React.useEffect(() => {
    // console.log(Amount, "sell", selected, pair)



    if (selected) {
      setPrice(selected.price);
      // setAmount(selected.amount);
      // settotal(selected.total);
    }
    if (Amount) {
      settotal(Amountref?.current?.value * selected.price)
    } else {
      settotal("")
    }
  }, [selected]);

  useEffect(() => {
    if (Amount) {
      settotal(Amountref.current.value * selected.price)
    } else {
      settotal("")
    }
  }, [Amount])
  const handleonChange = (e) => {
    setValue(e.target.value)
    setSli(e.target.value)
  }


  const priceupdate = (event) => {

    const newValue = Math.max(0, Number(event.target.value));
    setPrice(newValue)
  };
  const Amountupdate = (event) => {
    const newValue = Math.max(0, Number(event.target.value));
    setAmount(newValue)
  };
  const totalupdate = (event) => {
    const newValue = Math.max(0, Number(event.target.value));
    settotal(newValue)
  };

  useEffect(() => {
    if (pair !== "") {
      setPrice("")
      setAmount("")
      settotal("")
    }
  }, [pair])



    

  const buytrade = async () => {
    const kycstatus = localStorage.getItem('kyc_verify')
    try {
      if(isCheckedTakeProfit == true){
        if(TP?.current?.value == '' || SL?.current?.value == ''){

        }
      }
      // const pa = pair.split('-')[2]
      // alert(pair)
      const pa = pair.split()  
      // console.log(typeof (kycstatus), "kycstatys")
      if (!buyShow && !kycsubmit) {
          toast.error(`Please submit kyc to trade`, {
            duration: 1900,
            position: "top-center",
    
            // Styling
            style: {
              backgroundColor: "#fc1922",
              padding: "1rem",
              fontSize: "15px",
              color: "white",
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
    
          setTimeout(() => {
            navigate(`${Consts.route}/kycj-verification`);

            // navigate("/kyc-verification");
          }, 1600);
        }else if(!buyShow && kycsubmit){
          toast.error(`Your KYC submission is under verification`, {
            duration: 4000,
            position: "top-center",
    
            // Styling
            style: {
              backgroundColor: "#fc1922",
              padding: "1rem",
              fontSize: "15px",
              color: "white",
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
      //   else if (Number('0') < Number(quantity)) {
      //     toast.error(`Minimum Order Quantity Should Be ${quantity}`,{
      //           // Change colors of success/error/loading icon
      //           style: {
      //             padding: "1rem",
      //             fontSize: "15px",
      //             color: "red",
      //             fontWeight: "bold",
      //           },
      //           className: "",  
    
      //           // Aria
      //           ariaProps: {
      //             role: "status",
      //             "aria-live": "polite",
      //           },
      //         })
      // }
        else {
  
        if (pa !== undefined) { 
          if (labe == "open-long") {
            if (price === "") {
              toast.error("Please Fill the Price", {

                setPairduration: 2500,
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

              // Aria
              ariaProps: {
                role: "status",
                "aria-live": "polite",
              },
            });
          } else if (value === "" || value == 0 || value == undefined) {
            toast.error("Please Fill the Amount", {
                // Change colors of success/error/loading icon
                style: {
                  padding: "1rem",
                  fontSize: "15px",
                  color: "red",
                  fontWeight: "bold",
                },
                className: "",  

                // Aria
                ariaProps: {
                  role: "status",
                  "aria-live": "polite",
                },
              });
            } else if (value === "") {
              toast.error("Please Fill the Amount", {

                setPairduration: 1500,
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

            } else {
              // const usdtBalance = parseFloat(balance?.find(item => item.symbol === "USDT")?.balance);
              const usdtBalance = balance

              const initial =  ( 3 *  Math.round((value * balance / 100)) * price ) / lever
              console.log(initial,'initial balance');
                setload(false)
              if (user.trader_type === "user") {    
                // const pair12 = pair.split('-')[1]
                const pair12 = pair.split(0,-4)
                var a = ["future-", labe]
                var b = a.join("")
                // const da = {
                //   instId: pair,
                //   tdMode: index,
                //   ccy: pair12,
                //   tag: "mk1",
                //   side: "buy",
                //   orderType: ordertype,
                //   sz: Math.round((value * usdtBalance / 100)),
                //   px: price,
                //   trade_at: b,
                //   lever: lever
                // }
                const da = {
                  istpsl: isCheckedTakeProfit,
                  instId: pair,
                  tdMode: index,
                  ccy: pair12,
                  side: "Buy",
                  orderType: ordertype,
                  sz: Number(Math.round((value * usdtBalance / 100))) > 0 ? `${Math.round((value * usdtBalance / 100))}` : '1',
                  // sz: `${25}`,
                  px: price,
                  trade_at: b,
                  lever: lever,
                  tpPrice: TP.current.value,
                  slPrice: SL.current.value
                }

                // console.log({
                //   // instId: pair.split('-'),
                //   instId: pair,
                //   tdMode: index,
                //   ccy: pair12,
                //   tag: "mk1",
                //   side: "Buy",
                //   orderType: ordertype,
                //   // sz: Math.round((value * usdtBalance / 100)),
                //   sz: `${1}`,
                //   px: price,
                //   trade_at: b,
                //   lever: lever
                // },"initial balance")
                // alert(pair)
                // const { data } = await Axios.post(`/trade/userTrade`, da, {
                const { data } = await Axios.post(`/bybit/trade`, da, {
                  headers: {
                    Authorization: localStorage.getItem("Mellifluous"),
                  }
                })
                if (data.success) {
                  setload(true)
                  toast.success(data.message, {

                    setPairduration: 2500,
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
                  setAmount("")
                  // reload(1)

                } else {
                  setload(true)
                  if(data?.message == 'ab not enough for new leverage'){
                    toast.error('Available Balance Not Enough For New Leverage', {

                      setPairduration: 2500,
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
                        primary: "red",
                        secondary: "#fff",
                      },
  
                      // Aria
                      ariaProps: {
                        role: "status",
                        "aria-live": "polite",
                      },
                    });
                  } else {
                  toast.error(data.message, {

                    setPairduration: 2500,
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
                }
              } else {

                // const pair12 = pair.split('-')[1]
                const pair12 = pair.slice(-4)
                var a = ["future-", labe]
                var b = a.join("")
                // const da = {
                //   instId: pair,
                //   tdMode: index,
                //   ccy: pair12,
                //   tag: "mk1",
                //   side: "buy",
                //   orderType: ordertype,
                //   sz: Math.round((value * usdtBalance / 100)),
                //   px: price,
                //   trade_at: b,
                //   lever: lever
                // }
                const da = {
                  istpsl: isCheckedTakeProfit,
                  instId: pair,
                  tdMode: index,
                  ccy: pair12,
                  tag: "mk1",
                  side: "Buy",
                  orderType: ordertype,
                  // sz: Math.round((value * usdtBalance / 100)),
                  sz: Number(Math.round((value * usdtBalance / 100))) > 0 ? `${Math.round((value * usdtBalance / 100))}` : '1',
                  // sz: `${20}`,
                  px: price,
                  trade_at: b,
                  lever: lever,
                  tpPrice: TP.current.value,
                  slPrice: SL.current.value
                }
                // const { data } = await Axios.post(`/trade/CreateTrade`, da, {
                const { data } = await Axios.post(`/bybit/mastertrade`, da, {
                  headers: {
                    Authorization: localStorage.getItem("Mellifluous"),
                  }
                })
                if (data.success) {
                  setload(true)
                  toast.success(data.message, {

                    setPairduration: 2500,
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
                  setAmount("")
                  // reload(1)
                } else {
                  setload(true)
                  if(data?.message == 'ab not enough for new leverage'){
                    toast.error('Available Not Enough For New Leverage', {

                      setPairduration: 2500,
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
                        primary: "red",
                        secondary: "#fff",
                      },
  
                      // Aria
                      ariaProps: {
                        role: "status",
                        "aria-live": "polite",
                      },
                    });
                  } else {
                  toast.error(data.message, {

                    setPairduration: 2500,
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
                }
              }

            }
          } else {
            if (price === "") {
              toast.error("Please Fill the Price", {

                setPairduration: 2500,
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
            } else if (value === "" || value == "0" || value == undefined) {
              toast.error("Please Fill the Amount", {
                  // Change colors of success/error/loading icon
                  style: {
                    padding: "1rem",
                    fontSize: "15px",
                    color: "red",
                    fontWeight: "bold",
                  },
                  className: "",  
  
                  // Aria
                  ariaProps: {
                    role: "status",
                    "aria-live": "polite",
                  },
                });
              }
            // else if (parseFloat(balance?.find(item => item.symbol === "USDT")?.balance || 0)) {
            // else if (parseFloat(balance)) {
            //   toast.error("Insufficient USDT balance. Please deposit funds.",{
            //     // Change colors of success/error/loading icon
            //     style: {
            //       padding: "1rem",
            //       fontSize: "15px",
            //       color: "red",
            //       fontWeight: "bold",
            //     },
            //     className: "",  

            //     // Aria
            //     ariaProps: {
            //       role: "status",
            //       "aria-live": "polite",
            //     },
            //   })
               
            // } 
            else {
              // const usdtBalance = parseFloat(balance?.find(item => item.symbol === "USDT")?.balance);
              const usdtBalance = balance
              // alert('else')
              // const { data } = await Axios.post(`/trade/positionHistory`, { id: pair }, {
              //   headers: {
              //     Authorization: localStorage.getItem("Mellifluous"),
              //   }
              // })
              // let his = data.result[0]
              if (user.trader_type === "user") {
                // alert('USER')
                var a = ["future-", labe]
                var b = a.join("")
                // const da = {
                //   instId: his?.instId,
                //   tdMode: his?.mgnMode,
                //   ccy: his?.ccy,
                //   tag: "mk1",
                //   side: "sell",
                //   orderType: ordertype,
                //   sz: Math.round( Amount * usdtBalance / 100) ,//his?.notionalUsd,
                //   px: price,
                //   trade_at: b,
                //   lever: lever
                // }
                // const da = {
                //   instId: his?.instId,
                //   tdMode: his?.mgnMode,
                //   ccy: his?.ccy,
                //   side: "sell",
                //   orderType: ordertype,
                //   sz: Math.round( Amount * usdtBalance / 100) ,//his?.notionalUsd,
                //   px: price,
                //   trade_at: b,
                //   lever: lever
                // }
                const da = {
                  istpsl: isCheckedTakeProfit,
                  instId: pair,
                  tdMode: index,
                  ccy: pair.slice(0,-4),
                  side: "Sell",
                  orderType: ordertype,
                  sz: Number(Math.round((value * usdtBalance / 100))) > 0 ? `${Math.round((value * usdtBalance / 100))}` : '1' ,//his?.notionalUsd,
                  // sz: `${20}` ,//his?.notionalUsd,
                  px: price,
                  trade_at: b,
                  lever: lever,
                  tpPrice: TP.current.value,
                  slPrice: SL.current.value
                }
                
                
                // const { data } = await Axios.post(`/trade/userTrade`, da, {
                const { data } = await Axios.post(`/bybit/trade`, da, {
                  headers: {
                    Authorization: localStorage.getItem("Mellifluous"),
                  }
                })
                if (data.success) {
                  setload(true)
                  toast.success(data.message, {

                    setPairduration: 2500,
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
                  setAmount("")
                  // reload(1)
                } else {
                  setload(true)
                  if(data?.message == 'ab not enough for new leverage'){
                    toast.error('Available Balance Not Enough For New Leverage', {

                      setPairduration: 2500,
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
                        primary: "red",
                        secondary: "#fff",
                      },
  
                      // Aria
                      ariaProps: {
                        role: "status",
                        "aria-live": "polite",
                      },
                    });
                  } else {
                  toast.error(data.message, {

                    setPairduration: 2500,
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
                }
              } else {

                // const pair12 = pair.split('-')[1]
                const pair12 = pair.slice(-4)
                var a = ["future-", labe]
                var b = a.join("")
                // const da = {
                //   instId: his?.instId,
                //   tdMode: his?.mgnMode,
                //   ccy: his?.ccy,
                //   tag: "mk1",
                //   side: "sell",
                //   orderType: ordertype,
                //   sz: his?.notionalUsd,
                //   px: price,
                //   trade_at: b,
                //   lever: lever
                // }
                // const da = {
                //   instId: pair,
                //   tdMode: index,
                //   ccy: pair.split(0,-4),
                //   side: "Sell",
                //   orderType: ordertype,
                //   sz: Math.round( Amount * usdtBalance / 100) ,//his?.notionalUsd,
                //   px: price,
                //   trade_at: b,
                //   lever: lever
                // }
                const da = {
                  instId: pair,
                  tdMode: index,
                  ccy: pair.split(0,-4),
                  side: "Sell",
                  orderType: ordertype,
                  // sz: Math.round( Amount * usdtBalance / 100) ,//his?.notionalUsd,
                  sz:`${10}`,//his?.notionalUsd,
                  px: price,
                  trade_at: b,
                  lever: lever
                }
                // const { data } = await Axios.post(`/trade/CreateTrade`, da, {
                const { data } = await Axios.post(`/bybit/mastertrade`, da, {
                  headers: {
                    Authorization: localStorage.getItem("Mellifluous"),
                  }
                })
                if (data?.success) {
                  setload(true)
                  toast.success(data?.message, {

                    setPairduration: 2500,
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
                  setAmount("")
                  // reload(1)
                } else {
                  setload(!false)
                  toast.error(data?.message, {

                    setPairduration: 2500,
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
              }
            }
          }
        } else {
          setload(true)
          toast.error("Please Select the Trade-Pair", {

            setPairduration: 2500,
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
      setload(!false)
      if (error.message == "Sz is required") {
        toast.error(" Please Enter Amount %")
      }
       else if (error.message == 'Parameter sz error'){
        toast.error("Please Fill the Amount & check your balance", {
          // Change colors of success/error/loading icon
          style: {
            padding: "1rem",
            fontSize: "15px",
            color: "red",
            fontWeight: "bold",
          },
          className: "",  

          // Aria
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      }
      else {
        toast.error(error.message, {

          setPairduration: 2500,
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
  }

  useEffect(() => {
    try {
      Axios.get(`${Consts.BackendUrl}/users/kycsybmit`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          setkycsubmit(true);
        })
        .catch((err) => {
          setkycsubmit(false);
        });

      Axios.get(`${Consts.BackendUrl}/users/kycVerify`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          setBuyShow(true);
        })
        .catch((err) => console.log(err.response));
    } catch (error) {
      console.log("🚀 ~ file: MasterTraderTab.js:248 ~ useEffect ~ error:", error)

    }

  }, []);

  // const getmyWallet = () => {
  //   try {
  //     Axios.get(`/wallet/getWalletById`, {
  //       headers: {
  //         Authorization: localStorage.getItem("Mellifluous"),
  //       },
  //     })
  //       .then((res) => {
  //         if (res?.data?.success) {
  //           // console.log(res?.data?.success, "dates")
  //           setBalance(res?.data?.result)
  //           // console.log(res?.data?.result, "respon")
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }

  const getmyWallet = async() => {
    try {
      // Axios.get(`/wallet/getWalletById`, {
     await Axios.get(`/bybit/getwallets`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          if (res?.data?.success) {
            // alert(pair)
            console.log(res,'WALLET BALANCE',pair.substring(0,pair.length - 4) );
            for (let i = 0; i < res?.data?.result.length; i++) {
              // if (res?.data?.result[i].symbol === pair.split("-")[1]) {
              //   setBalance(res?.data?.result[i].balance);
              // }
              // if (res?.data?.result[i].symbol == pair?.slice(0,- 4)) {
              //   setBalance(res?.data?.result[i].balance);
              //   console.log(res?.data?.result[i].balance,"baln")
              // }

              const coin = res?.data?.result[i]

              if (coin?.coinname == pair.slice(-4)) {
                setBalance(coin?.balance);
                // console.log(res?.data?.result[i].balance, "baln")
              }
            }
            // setBalance(res?.data?.result)

            setMaxbuy(parseFloat(Number(balance) / Number(selected.price)).toFixed(4));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getTradebalance = async () => {
    const coinee = pair.slice(-4)
    try {
      await Axios.post(`/bybit/gettradebalance`,{ pair : coinee }, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          if (res?.data?.success) {
            const tradebalance = res?.data?.result?.result?.list[0]?.coin[0]?.availableToWithdraw
              
                setBalance(tradebalance);
          
            setMaxbuy(parseFloat(Number(tradebalance ? tradebalance : 0) / Number(selected?.price)).toFixed(7));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getmyWallet()
    getTradebalance();
  }, [pair, selected])


  const getOrderQty = async () => {

    const { data } = await Axios.post(`${Consts.BackendUrl}/bybit/getpairdetailes`, { type : 'linear' , pair: pair })
       if(data?.success){
         setQuantity(Number(data?.result[0]?.lotSizeFilter?.minOrderQty))
         setMaxQuantity(data?.result[0]?.lotSizeFilter?.maxOrderQty)
       } else {
         setQuantity(0)
         setMaxQuantity(0)
       }
   }

   useEffect(()=> {
    getOrderQty()
  }, [pair])


  return (
    <>

      <div className="Form-Inner-box form-Inner-box-style future-form-block-right-part">

        {/* <label className="form-label-style">Price ({selected ? selected?.pair.split('-')[1] : "USD"})</label> */}

        <div className="price-limit-spot">
          {/* <label className="form-label-style">Price ({pair ? pair.split('-')[1] : "USD"})</label> */}
          <label className="form-label-style">Price ({pair ? pair.slice(-4) : "USD"})</label>
          <Stack alignItems="center" direction="row" className="price-input-block-outer" spacing={1}>
            <div className="">
              <TextField
                type={"number"}
                id="outlined-basic"
                variant="outlined"
                value={selected?.price}
                onChange={priceupdate}
              />
            </div>
            {/* <Button>BBO</Button> */}
          </Stack>
        </div>



        <div className="amount-limit-spot">
          {/* <label className="form-label-style">Amount ({pair ? pair.split('-')[0] : "USD"})</label> */}
          <label className="form-label-style">Amount ({pair ? pair.slice(0,-4) : "USD"})</label>
          <div className="">
            {labe === "open-long" ?

              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  type={"text"}
                  value={`${sli}%`}
                  inputRef={Amountref}
                  onChange={(e) => { handleonChange(e); Amountupdate(); }}
                  placeholder={`Min ${pair ? pair.split('-')[0] : "USD"}`}
                  // endAdornment={
                  //   <InputAdornment position="end">
                  //     Min  (<span>{pair ? pair.split('-')[0] : "USD"}</span>)
                  //   </InputAdornment>
                  // }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}

                />
              </FormControl>
              :
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  type={"text"}
                  value={`${sli}%`}
                  // inputRef={Amount}
                  // onChange={Amountupdate}
                  onChange={(e) => handleonChange(e)}
                  placeholder={`Min ${pair ? pair.split('-')[0] : "USD"}`}
                  // endAdornment={
                  //   <InputAdornment position="end">
                  //     Min  (<span>{pair ? pair.split('-')[0] : "USD"}</span>)
                  //   </InputAdornment>
                  // }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}

                />
              </FormControl>
            }

            {labe === "open-long" ? <div className="thumslider-design-class" style={{ "width": "89%" }}>
              <ThumbSlider
                aria-label="Temperature"
                defaultValue={0}
                value={value}
                onChange={(e) => handleonChange(e)}
                valueLabelDisplay="auto"
                marks={true}
                step={25}
                min={0}
                max={100}
                ValueLabelComponent={ValueLabelComponent}
              />
            </div> : <div className="thumslider-design-class" style={{ "width": "89%" }}>
              <ThumbSlider
                aria-label="Temperature"
                defaultValue={0}
                value={value}
                onChange={(e) => handleonChange(e)}
                valueLabelDisplay="auto"
                marks={true}
                step={25}
                min={0}
                max={100}
                ValueLabelComponent={ValueLabelComponent}
              />
            </div>}
          </div>
          {/* <Stack className="percentage-button-row">
<Button key={1} className={activeClass === "1" ? "active-select" : "non-active"} id={"1"} value="10" onClick={(value) => percentageValue(value)}>10%</Button>
<Button key={2} className={activeClass === "2" ? "active-select" : "non-active"} id={"2"} value="15" onClick={(value) => percentageValue(value)}>15%</Button>
<Button key={3} className={activeClass === "3" ? "active-select" : "non-active"} id={"3"} value="20" onClick={(value) => percentageValue(value)}>20%</Button>
</Stack> */}
        </div>

        {/* <div className="total-limit-spot">
          <label className="form-label-style">Total ({pair ? pair.split('-')[0] : "USD"})</label>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              value={total}
              type={"number"}
              onChange={totalupdate}
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
          </FormControl>
        </div> */}

        <div>
          {/* <div className="available-max-buy">
          <span>
            Available <span>-- USDC</span>
          </span>
          <span>
            Max buy <span>-- BTC</span>
          </span>
        </div>
        <FormGroup className="requirmnent">
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Take profit"
          />
          <FormControlLabel required control={<Checkbox />} label="Stop loss" />
        </FormGroup> */}

          <div className="available-max-block available-max-buy available-max-block-available-max-buy">
            <div className="available-max-block-left">
              <div>
                <label>Available</label>
                {balance ? 
                  <div>
                    {parseFloat(balance).toFixed(6)}{" "}
                    {pair ? pair.slice(-4) : 'USDT' }
                  </div> : 
                  <>{(0).toFixed(3)}{" "}{pair ? pair.slice(0,-4) : 'USDT' }</>
                }
                {/* {balance &&
                  balance.find((item) => item.symbol === "USDT") &&
                  balance.find((item) => item.symbol === "USDT").balance !==
                  undefined && (
                    <div>
                      {balance.find((item) => item.symbol === "USDT").balance.toFixed(3)}{" "}
                      USDT
                    </div>
                  )} */}
              </div>
              <div>
                <label>Maxbuy</label>
                {balance ?
                  <div>
                    {parseFloat(Number(balance) / Number(selected?.price)).toFixed(4) != 'NaN' ? parseFloat(Number(balance) / Number(selected?.price)).toFixed(4) : 0} {pair?.slice(0,-4)}
                  </div>
                  :
                  // <div>{0.00}{" "}{pair.split("-")[0]}</div>
                  <div>{0.00}{" "}{pair}</div>
                }
                {/* {pair &&
                  balance &&
                  balance.find((item) => item.symbol === pair.split("-")[0]) && (
                    <div> */}
                      {/* {balance.find((item) => item.symbol === pair.split("-")[0])
                          .balance}{" "} */}
                      {/* 0.000000 {pair.split("-")[0]}
                    </div>
                  )} */}
              </div>
              {/* <div><label>Availabe</label> -- USDT66</div>
          <div><label>Max buy</label> -- {`${pair ? pair.split('-')[0] : "USD"}`}</div> */}
            </div>
            <div className="available-max-block-right">
              <div className="available-max-block-right-svg"><SwapHorizIcon /></div>
              <div>
                <label>Maxsell</label>
                {balance ?
                  <div>
                    {parseFloat(Number(balance) / Number(selected?.price)).toFixed(4) != 'NaN' ? parseFloat(Number(balance) / Number(selected?.price)).toFixed(4) : 0} {pair.slice(0,-4)}
                  </div>
                  :
                  // <div>{0.00}{" "}{pair.split("-")[0]}</div>
                  <div>{0.00}{" "}{pair}</div>
                }
                {/* {pair &&
                  balance &&
                  balance.find((item) => item.symbol === pair.split("-")[0]) && (
                    <div> */}
                      {/* {balance.find((item) => item.symbol === pair.split("-")[0])
                          .balance}{" "} */}
                      {/* 0.000000 {pair.split("-")[0]}
                    </div>
                  )} */}
              </div>
            </div>
          </div>
          <div className="reduce-only-available-max-block-available-max-buy">
            {/* checked={isCheckedTakeProfit} onChange={handleChangeTakeProfit} */}
            <div className="take-profit-stop-loss-block">
              {/* <div><FormControlLabel control={<Checkbox checked={isCheckedReduceOnly} onChange={handleChangeReduceOnly} />} label="Reduce-only" /></div> */}
            </div>
          </div>

          <div className="take-profit-stop-loss-block">
            <div><FormControlLabel control={<Checkbox checked={isCheckedTakeProfit} onChange={handleChangeTakeProfit} />} label="TP/SL" /></div>
            {/* <div><FormControlLabel control={<Checkbox checked={isCheckedStopLoss} onChange={handleChangeStopLoss} />} label="Stop loss" /></div> */}
          </div>

          {isCheckedTakeProfit && (
            <div className="take-profit-stop-loss-forms take-profit-form">


              <div className="form-design-tp-sl form-design-tp-trigger-price">
                <label>TP trigger price ({`${pair ? pair.split('-')[0] : "USD"}`})</label>
                <div>
                  <TextField
                    id="outlined-basic"
                    InputProps={{ inputProps: { min: "0" } }}
                    inputRef={TP}
                  />
                  {/* <FormControl className="select-hours-outer">
                    <InputLabel id="demo-simple-select-label">Last</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={takeProfit}
                      onChange={handleTakeProfit}
                      label="Last"
                      className="select-hours-inner"
                    >
                      <MenuItem value={10}>1h</MenuItem>
                      <MenuItem value={20}>24h</MenuItem>
                      <MenuItem value={30}>7h</MenuItem>
                    </Select>
                  </FormControl> */}
                </div>
              </div>

              <div className="form-design-tp-sl form-design-tp-trigger-price">
                <label>SL trigger price ({`${pair ? pair.split('-')[0] : "USD"}`})</label>
                <div>
                  <TextField
                    id="outlined-basic"
                    InputProps={{ inputProps: { min: "0" } }}
                    inputRef={SL}
                  />
                  {/* <FormControl className="select-hours-outer">
                    <InputLabel id="demo-simple-select-label">Last</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={takeProfit}
                      onChange={handleTakeProfit}
                      label="Last"
                      className="select-hours-inner"
                    >
                      <MenuItem value={10}>1h</MenuItem>
                      <MenuItem value={20}>24h</MenuItem>
                      <MenuItem value={30}>7h</MenuItem>
                    </Select>
                  </FormControl> */}
                </div>
              </div>

            </div>
          )
          }

          {isCheckedStopLoss && (
            <div className="take-profit-stop-loss-forms stop-loss-form">


              <div className="form-design-tp-sl form-design-tp-trigger-price">
                <label>SL trigger price ({`${pair ? pair.split('-')[0] : "USD"}`})</label>
                <div>
                  <TextField
                    id="outlined-basic"
                    InputProps={{ inputProps: { min: "0" } }}
                  />
                  <FormControl className="select-hours-outer">
                    <InputLabel id="demo-simple-select-label">Last</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={takeProfit}
                      onChange={handleTakeProfit}
                      label="Last"
                      className="select-hours-inner"
                    >
                      <MenuItem value={10}>1h</MenuItem>
                      <MenuItem value={20}>24h</MenuItem>
                      <MenuItem value={30}>7h</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="form-design-tp-sl form-design-tp-order-price">
                <label>SL order price (USDT)</label>
                <div>
                  <TextField
                    id="outlined-basic"
                    InputProps={{ inputProps: { min: "0" } }}
                    value="Market"
                  />
                  <Button>Market</Button>
                </div>
              </div>

            </div>
          )
          }

          <Stack direction="row" spacing={1} className="sell-buy-btns-stack">
            <Button className="Buy-SOL" variant="contained" onClick={buytrade} disabled={!load}>
              {/* Buy (Long) <span>{selected ? selected?.pair.split('-')[1] : ""}</span> */}
              Buy (Long) <span>{selected?.pair ? selected?.pair.substring(pair.length - 4) : ""}</span>
            </Button>
            <Button className="Sell-SOL" variant="contained" onClick={buytrade} disabled={!load}>
              {/* Sell (Short) <span>{selected ? selected?.pair.split('-')[1] : ""}</span> */}
              Sell (Short) <span>{selected?.pair ? selected?.pair.substring(pair.length - 4) : ""}</span>
            </Button>
          </Stack>

          <div className="available-max-block available-max-buy available-max-block-left-right">
            <div className="available-max-block-left">
              <div>
                <label>Cost</label>

                {balance ? 
                  <div>
                    {parseFloat(balance).toFixed(3)}{" "}
                    USDT
                  </div> : 
                  <>{(0).toFixed(3)}{" "}USDT</>
                }
                {/* {balance &&
                  balance.find((item) => item.symbol === "USDT") &&
                  balance.find((item) => item.symbol === "USDT").balance !==
                  undefined && (
                    <div>
                      {balance.find((item) => item.symbol === "USDT").balance.toFixed(3)}{" "}
                      USDT
                    </div>
                  )} */}
              </div>
              <div>
                <label>Max Price</label>

                {balance ?
                  <div>
                    {parseFloat(Number(balance) / Number(selected?.price)).toFixed(4) != 'NaN' ? parseFloat(Number(balance) / Number(selected?.price)).toFixed(4) : 0} {pair.slice(0,-4)}
                  </div>
                  :
                  // <div>{0.00}{" "}{pair.split("-")[0]}</div>
                  <div>{0.00}{" "}{pair}</div>
                }
                {/* {pair &&
                  balance &&
                  balance.find((item) => item.symbol === pair.split("-")[0]) && (
                    <div> */}
                      {/* {balance.find((item) => item.symbol === pair.split("-")[0])
                          .balance}{" "} */}
                      {/* 0.000000 {pair.split("-")[0]}
                    </div>
                  )} */}
              </div>
              <div>
              <label>MinOrderQty :</label>
              <div> { Number(quantity) } </div>
              </div>
              {/* <div><label>Availabe</label> -- USDT66</div>
          <div><label>Max buy</label> -- {`${pair ? pair.split('-')[0] : "USD"}`}</div> */}
            </div>
            <div className="available-max-block-right">
              <div>
                <label>Cost</label>
                {balance ? 
                  <div>
                    {parseFloat(balance).toFixed(3)}{" "}
                    USDT
                  </div> : 
                  <>{(0).toFixed(3)}{" "}USDT</>
                }
                {/* {pair &&
                  balance &&
                  balance.find((item) => item.symbol === pair.split("-")[0]) && (
                    <div> */}
                      {/* {balance.find((item) => item.symbol === pair.split("-")[0])
                          .balance}{" "} */}
                      {/* 0.000000 {pair.split("-")[0]}
                    </div>
                  )} */}
              </div>
              <div>
                <label>Min Price</label>
                {balance ?
                  <div>
                    {parseFloat(Number(balance) / Number(selected?.price)).toFixed(4) != 'NaN' ? parseFloat(Number(balance) / Number(selected?.price)).toFixed(4) : 0} {pair.slice(0,-4)}
                  </div>
                  :
                  // <div>{0.00}{" "}{pair.split("-")[0]}</div>
                  <div>{0.00}{" "}{pair}</div>
                }
                {/* {pair &&
                  balance &&
                  balance.find((item) => item.symbol === pair.split("-")[0]) && (
                    <div> */}
                      {/* {balance.find((item) => item.symbol === pair.split("-")[0])
                          .balance}{" "} */}
                      {/* 0.000000 {pair.split("-")[0]}
                    </div>
                  )} */}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default BuyFormInner;
