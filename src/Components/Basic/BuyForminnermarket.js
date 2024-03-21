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
import { Slider, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Stack } from "rsuite";
import Consts from "../../Constansts";
import { useNavigate } from "react-router-dom";


const ThumbSlider = styled(Slider)(({ theme }) => ({
  marginTop: 10,
  "& .MuiSlider-thumb": {
    color: "black",
    transform: "rotate(45deg)",
    width: 12,
    height: 12,
    marginTop: "-8px",
    border: "3px solid #b7bdc6",
    borderRadius: "2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "none",
      transform: "rotate(-45deg)",
    },
  },
  "& .MuiSlider-rail": {
    backgroundColor: "#474d57",
  },
  "& .MuiSlider-root": {
    color: "#b7bdc6",
  },
  "& .MuiSlider-track": {
    color: "#b7bdc6",
  },
  "& .MuiSlider-valueLabel": {
    top: "-30px",
    transform: "rotate(-45deg)",
    backgroundColor: "transparent",
  },
  "& .MuiSlider-valueLabel.MuiSlider-valueLabelOpen": {
    transform: "rotate(-45deg)",
  },
  "& .MuiSlider-mark": {
    // backgroundColor:'black',
    color: "black",
    transform: "rotate(45deg)",
    width: 8,
    height: 8,
    marginTop: "-4px",
    border: "2px solid #474d57",
    "&:hover": {
      backgroundColor: "#474d57",
      border: "2px solid black",
    },
    "& $active": {
      backgroundColor: "#474d57",
      border: "2px solid black",
    },
    "&:focus": {
      border: "2px solid black",
    },
    "&:active": {
      border: "2px solid black",
    },
  },
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

const BuyForminnermarket = ({
  selected,
  pair,
  index,
  ordertype,
  labe,
  market,
  lever,
  reload
}) => {
  const user = JSON.parse(window.localStorage.getItem("users"));
  const [price, setPrice] = React.useState();
  const [Amount, setAmount] = React.useState();
  const [total, settotal] = React.useState();
  const [value, setValue] = React.useState();
  const [sli, setSli] = React.useState(0);
  const [takeProfit, setTakeProfit] = React.useState('');
  const [isCheckedTakeProfit, setCheckedTakeProfit] = useState(false);
  const [isCheckedStopLoss, setCheckedStopLoss] = useState(false);
  const [balance, setBalance] = useState()
  const [activeClass, setActiveClass] = useState("1");
  const [isCheckedReduceOnly, setCheckedReduceOnly] = useState(false);
  const navigate = useNavigate();
  const [kycsubmit, setkycsubmit] = React.useState(false);
  const [buyShow,setBuyShow]= React.useState(false);


  const handleChangeReduceOnly = () => {
    setCheckedReduceOnly(!isCheckedReduceOnly);
  };

 const percentageValue = async(e) => {
    setActiveClass(e.target.id);
    console.log(e.target.value,"value");
  }

  const handleChangeTakeProfit = () => {
    setCheckedTakeProfit(!isCheckedTakeProfit);
  };
  const handleChangeStopLoss = () => {
    setCheckedStopLoss(!isCheckedStopLoss);
  };
  const handleTakeProfit = (event) => {
    setTakeProfit(event.target.value);
  };

  const Amountref = useRef(0);

  const [load, setload] = useState(true);

  React.useEffect(() => {
    if (selected) {
      setPrice(selected.price);
      // setAmount(selected.amount);
      // settotal(selected.total);
    }
    if (Amount !== "" && Amount != " ") {
      settotal(Amount * price);
    } else {
      settotal("");
    }
  }, []);

  React.useEffect(() => {
    if (selected) {
      setPrice(selected?.price);
      // setAmount(selected.amount);
      // settotal(selected.total);
    }
    if (Amount != "" && Amount != " " && Amountref?.current?.value !== "") {
      settotal(Amountref?.current?.value * selected?.price);
    } else {
      settotal("");
    }
  }, [selected]);

  useEffect(() => {
    if (Amount !== "" && Amountref?.current?.value !== "") {
      settotal(Amountref?.current?.value * selected?.price);
    } else {
      settotal("");
    }
  }, [Amount]);
  const handleonChange = (e) => {
    setValue(e.target.value);
    setSli(e.target.value);
    setAmount(e.target.value)
  };

  const priceupdate = (event) => {
    const newValue = Math.max(0, Number(event.target.value));
    setPrice(newValue);
  };
  const Amountupdate = (event) => {
    const newValue = Math.max(0, Number(event.target.value));
    setAmount(newValue);
  };
  const totalupdate = (event) => {
    const newValue = Math.max(0, Number(event.target.value));
    settotal(newValue);
  };

  useEffect(() => {
    if (pair !== "") {
      setPrice("");
      setAmount("");
      settotal("");
    }
  }, [pair]);

  const getdatas = async () => {

    await Axios.post(`${Consts.BackendUrl}/trade/tradeHistory`,{pair:pair},{
         headers: {
           Authorization: localStorage.getItem("Mellifluous"),
         },
       })
         .then((res) => {
           console.log(res,'res');
           // let data = [];
           // res?.data?.result.map((item, index) => {
           //   if(item.trade_at == "future" || item.trade_at == "Future"){
           //   if (item.status == "init" || item.status == "partially_filled") {
           //     data.push(item);
           //   }
           // }
           // });
           // if (data.length > 0) {
           //   settradelist(data.reverse());
           // }
           // setLoading(false);
         })
         .catch((err) => {
     console.log(err,'error');          
         });
       }

  const buytrade = async () => {
    try {
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
          navigate("/kycj-verification");
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
      } else if (price === "") {
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
    }
      else {
        const pa = pair.split("-")[2];
        if (pa !== undefined) {
          if (labe === "open-long") {
  
            if (Amount == "" || Amount == "0") {
  
              toast.error("Please Fill the Amount", {
                duration: 1500,
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
              const usdtBalance = parseFloat(balance?.find(item => item.symbol === "USDT")?.balance);
  
              const initial =  ( 1000 * 0.000001 * price ) / lever
              // console.log(initial,
              //   {  instId: pair,
              //     tdMode: index,
              //     // ccy: pair12,
              //     tag: "mk1",
              //     side: "buy",
              //     orderType: ordertype,
              //     sz: Math.round( Amount * usdtBalance / 100),
              //     // sz:0.000001,
              //     px: market,
              //     trade_at: b,
              //     lever: lever},
                
              //   'initial balance');
              console.log(2)
              setload(false);
              if (user.trader_type === "user") {
                const pair12 = pair.split("-")[1];
                var a = ["future-", labe];
                var b = a.join("");
                const da = {
                  instId: pair,
                  tdMode: index,
                  ccy: pair12,
                  tag: "mk1",
                  side: "buy",
                  orderType: ordertype,
                  sz: Math.round( Amount * usdtBalance / 100),
                  px: market,
                  trade_at: b,
                  lever: lever,
                  // market: { market },
                  // instId: pair,
                  // tdMode: index,
                  // ccy: pair12,
                  // tag: "mk1",
                  // side: "buy",
                  // orderType: ordertype,
                  // sz: Math.round( Amount * usdtBalance / 100) ,
                  // px:  market, //"0",
                  // trade_at: b,
                  // lever: value,
                };
                const { data } = await Axios.post(`/trade/userTrade`, da, {
                  headers: {
                    Authorization: localStorage.getItem("Mellifluous"),
                  },
                });
                if (data) {
                  setTimeout(() => { setload(!false); }, 500)
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
                  setAmount("");
                  reload(1)
                } else {
                  setTimeout(() => { setload(!false); }, 500)
                  toast.success("Something Went Wrong", {
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
                }
              } else {
                const pair12 = pair.split("-")[1];
                var a = ["future-", labe];
                var b = a.join("");
                const da = {
                  instId: pair,
                  tdMode: index,
                  ccy: pair12,
                  tag: "mk1",
                  side: "buy",
                  orderType: ordertype,
                  sz: Math.round( Amount * usdtBalance / 100),
                  px: market,
                  trade_at: b,
                  lever: value,
                  market: { market },
                };
                const { data } = await Axios.post(`/trade/CreateTrade`, da, {
                  headers: {
                    Authorization: localStorage.getItem("Mellifluous"),
                  },
                });
                if (data) {
                  setTimeout(() => { setload(!false); }, 500)
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
                  setAmount("");
                  reload(1)
                } else {
                  setTimeout(() => { setload(!false); }, 500)
                  toast.success("Something Went Wrong", {
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
                }
              }
  
  
  
            }
          } else {
            if (Amount == "" || Amount == "0") {
  
              toast.error("Please Fill the Amount", {
                duration: 1500,
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
            }  else if (parseFloat(balance?.find(item => item.symbol === "USDT")?.balance || 0)) {
              toast.error("Insufficient USDT balance. Please deposit funds.",{
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
              })
               
            } else{

              const usdtBalance = parseFloat(balance?.find(item => item.symbol === "USDT")?.balance);

            const { data } = await Axios.post(
              `/trade/positionHistory`,
              { id: pair },
              {
                headers: {
                  Authorization: localStorage.getItem("Mellifluous"),
                },
              }
            );
            let his = data.result[0];
            if (user.trader_type === "user") {
              var a = ["future-", labe];
              var b = a.join("");
              const da = {
                instId: his?.instId,
                tdMode: his?.mgnMode,
                ccy: his?.ccy,
                tag: "mk1",
                side: "sell",
                orderType: ordertype,
                sz: Math.round( Amount * usdtBalance / 100) ,//parseFloat(his?.notionalUsd).toFixed(2),
                px: market,
                trade_at: b,
                lever: lever,
              };
              const { data } = await Axios.post(`/trade/userTrade`, da, {
                headers: {
                  Authorization: localStorage.getItem("Mellifluous"),
                },
              });
              
              if (data) {
                setTimeout(() => { setload(!false); }, 500)
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
                setAmount("");
                reload(1)
              } else {
                setTimeout(() => { setload(!false); }, 500)
                toast.success("Something Went Wrong", {
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
              }
            } else {
              const pair12 = pair.split("-")[1];
              var a = ["future-", labe];
              var b = a.join("");
              const da = {
                instId: his?.instId,
                tdMode: his?.mgnMode,
                ccy: his?.ccy,
                tag: "mk1",
                side: "sell",
                orderType: ordertype,
                sz: Math.round( Amount * usdtBalance / 100) ,//parseFloat(his?.notionalUsd).toFixed(2),
                px: market,
                trade_at: b,
                lever: lever,
              };
              const { data } = await Axios.post(`/trade/CreateTrade`, da, {
                headers: {
                  Authorization: localStorage.getItem("Mellifluous"),
                },
              });
              if (data) {
                setTimeout(() => { setload(!false); }, 500)
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
                setAmount("");
                reload(1)
              } else {
                setTimeout(() => { setload(!false); }, 500)
                toast.error("Something Went Wrong", {
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
              }
            }
          }
        }} else {
          setTimeout(() => { setload(!false); }, 500)
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
       if (error.response.data.message == 'Parameter sz error'){
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
        setTimeout(() => { setload(!false); }, 500)
      } else {
      setTimeout(() => { setload(!false); }, 500)
      toast.error(error.response.data.message, {

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
  };

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

  const getmyWallet = () => {
    try {
      Axios.get(`/wallet/getWalletById`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          if (res?.data?.success) {
            console.log(res?.data?.success, "dates")
            setBalance(res?.data?.result)
            console.log(res?.data?.result, "respon")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    getmyWallet()

  }, [])
  return (
    <>

      <div className="Form-Inner-box form-Inner-box-style future-form-block-right-part">
        {/* <label className="form-label-style">Price ({selected ? selected?.pair.split('-')[1] : "USD"})</label> */}

        {/* <div className="price-limit-spot">
        <label className="form-label-style">
          Price ({pair ? pair.split("-")[1] : "USD"})
        </label>
        <div className="">
          <TextField
            type={"text"}
            id="outlined-basic"
            variant="outlined"
            value="Market price"
          />
        </div>
        </div> */}

<div className="price-limit-spot">
          <label className="form-label-style">Price ({pair ? pair.split('-')[1] : "USD"})</label>
          <div className="">
            <TextField
              type={"number"}
              id="outlined-basic"
              variant="outlined"
              value={selected?.price ? selected?.price : ''}
              onChange={priceupdate}
            />
          </div>
        </div>

        <div className="amount-limit-spot">
          <label className="form-label-style">
            Amount ({pair ? pair.split("-")[0] : "USD"})
          </label>
          <div className="">
            {labe === "open-long" ? (
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  type={"number"}
                  value={value}
                  inputRef={Amountref}
                  onChange={Amountupdate}
                  placeholder={`Min ${pair ? pair.split('-')[0] : "USD"}`}
                  // endAdornment={
                  //   <InputAdornment position="end">
                  //     Min (<span>{pair ? pair.split("-")[0] : "USD"}</span>)
                  //   </InputAdornment>
                  // }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
              </FormControl>
            ) : (
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
                  //     Min (<span>{pair ? pair.split("-")[0] : "USD"}</span>)
                  //   </InputAdornment>
                  // }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
              </FormControl>
            )}

            {labe === "open-long" ? (
              <div className="thumslider-design-class" style={{ width: "98%" }}>
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
              </div>
            ) : (
              <div className="thumslider-design-class" style={{ width: "98%" }}>
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
              </div>
            )}
          </div>
{/* <Stack className="percentage-button-row">
<Button key={1} className={activeClass === "1" ? "active-select" : "non-active"} id={"1"} value="10" onClick={(value) => percentageValue(value)}>10%</Button>
<Button key={2} className={activeClass === "2" ? "active-select" : "non-active"} id={"2"} value="15" onClick={(value) => percentageValue(value)}>15%</Button>
<Button key={3} className={activeClass === "3" ? "active-select" : "non-active"} id={"3"} value="20" onClick={(value) => percentageValue(value)}>20%</Button>
</Stack> */}
        </div>


        <div>

          <div className="available-max-block available-max-buy available-max-block-available-max-buy">
            <div className="available-max-block-left">
              <div>
                <label>Availabe</label>
                {balance &&
                  balance.find((item) => item.symbol === "USDT") &&
                  balance.find((item) => item.symbol === "USDT").balance !==
                  undefined && (
                    <div>
                      {balance.find((item) => item.symbol === "USDT").balance.toFixed(3)}{" "}
                      USDT
                    </div>
                  )}
              </div>
              <div>
                <label>Maxbuy</label>
                {pair &&
                  balance &&
                  balance.find((item) => item.symbol === pair.split("-")[0]) && (
                    <div>
                      0.000000 {pair.split("-")[0]}
                      {/* {balance.find((item) => item.symbol === pair.split("-")[0])
                          .balance}{" "} */}

                    </div>
                  )}
              </div>
            </div>
            <div className="available-max-block-right">
            <div className="available-max-block-right-svg"><SwapHorizIcon /></div>
              <div>
                <label>Maxsell</label>
                {pair &&
                  balance &&
                  balance.find((item) => item.symbol === pair.split("-")[0]) && (
                    <div>
                      {/* {balance.find((item) => item.symbol === pair.split("-")[0])
                          .balance}{" "} */}
                      0.000000 {pair.split("-")[0]}
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="reduce-only-available-max-block-available-max-buy">
          {/* checked={isCheckedTakeProfit} onChange={handleChangeTakeProfit} */}
          <div className="take-profit-stop-loss-block">
          <div><FormControlLabel control={<Checkbox checked={isCheckedReduceOnly} onChange={handleChangeReduceOnly}/>} label="Reduce-only" /></div>
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

            </div>
          )
          }

          {/* <Button
            className="Buy-SOL"
            variant="contained"
            onClick={buytrade}
            disabled={!load}
          >
            Longs {selected ? selected?.pair.split("-")[1] : ""}
          </Button> */}

<Stack direction="row" spacing={4} className="sell-buy-btns-stack">
          <Button className="Buy-SOL" variant="contained" onClick={buytrade} disabled={!load}>
            Buy (Long){selected ? selected?.pair.split('-')[1] : ""}
          </Button>
          <Button className="Sell-SOL" variant="contained" onClick={buytrade} disabled={!load}>
            Sell (Short){selected ? selected?.pair.split('-')[1] : ""}
          </Button>
          </Stack>

          <div className="available-max-block available-max-buy available-max-block-left-right">
            <div className="available-max-block-left">
              <div>
                <label>Cost</label>
                {balance &&
                  balance.find((item) => item.symbol === "USDT") &&
                  balance.find((item) => item.symbol === "USDT").balance !==
                  undefined && (
                    <div>
                      {balance.find((item) => item.symbol === "USDT").balance.toFixed(3)}{" "}
                      USDT
                    </div>
                  )}
              </div>
              <div>
                <label>Max Price</label>
                {pair &&
                  balance &&
                  balance.find((item) => item.symbol === pair.split("-")[0]) && (
                    <div>
                      {/* {balance.find((item) => item.symbol === pair.split("-")[0])
                          .balance}{" "} */}
                      0.000000 {pair.split("-")[0]}
                    </div>
                  )}
              </div>
              {/* <div><label>Availabe</label> -- USDT66</div>
          <div><label>Max buy</label> -- {`${pair ? pair.split('-')[0] : "USD"}`}</div> */}
            </div>
            <div className="available-max-block-right">
            <div>
                <label>Cost</label>
                {pair &&
                  balance &&
                  balance.find((item) => item.symbol === pair.split("-")[0]) && (
                    <div>
                      {/* {balance.find((item) => item.symbol === pair.split("-")[0])
                          .balance}{" "} */}
                      0.000000 {pair.split("-")[0]}
                    </div>
                  )}
              </div>
              <div>
                <label>Min Price</label>
                {pair &&
                  balance &&
                  balance.find((item) => item.symbol === pair.split("-")[0]) && (
                    <div>
                      {/* {balance.find((item) => item.symbol === pair.split("-")[0])
                          .balance}{" "} */}
                      0.000000 {pair.split("-")[0]}
                    </div>
                  )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default BuyForminnermarket;
