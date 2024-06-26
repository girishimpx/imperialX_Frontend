import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Button from "@mui/material/Button";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../../Axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import { Slider, Tooltip, Stack, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Consts from "../../Constansts";


const useStyles = makeStyles({
  root: {
    width: 300,
  },
  thumb: {
    background: "red",
  },
  rail: {
    background: "#25deb0",
  },
  track: {
    background: "#25deb0",
  },
});

const ValueLabelComponent = (props) => {
  const { value } = props;
  return (
    <div>
      <span>{value}%</span>
    </div>
  );
};

const BuyFormInner = ({ selected, pair, index, market, onDataFromChild, reload, cat }) => {
  // alert(cat)
  const user = JSON.parse(window.localStorage.getItem("users"));
  const [price, setPrice] = React.useState();
  const [Amount, setAmount] = React.useState('0.0000000');
  const [total, settotal] = React.useState();
  const [buyShow, setBuyShow] = React.useState(false);
  const [takeProfit, setTakeProfit] = React.useState("");
  const [isCheckedTakeProfit, setCheckedTakeProfit] = useState(false);
  const [isCheckedStopLoss, setCheckedStopLoss] = useState(false);
  const [balance, setBalance] = useState(0);
  const [valueNew, setValueNew] = React.useState();
  const [sliderValue, setSliderValue] = useState();
  const [maxbuy, setMaxbuy] = useState();
  const [pm, setPm] = useState();
  const [kycsubmit, setkycsubmit] = React.useState(false);
  const [quantity, setQuantity] = React.useState(0.01);
  const [maxquantity, setMaxQuantity] = React.useState(0.01);
  const [basePrecision, setbasePrecision] = React.useState('0.0');
  const [quotePrecision, setquotePrecision] = React.useState('0.0');
  const [precesion, setPrecesion] = React.useState(0.01);
  const [quoteprecesion, setQuotePrecesion] = React.useState(0.01);

  const navigate = useNavigate();

  const classes = useStyles();

  const handleSliderChange = async (event, data) => {
    const bs = parseFloat(Amount).toFixed(7);
    const da = Math.max(0, Number((data * bs) / 100));
    if (da > 0) {
      setSliderValue(parseFloat(da).toFixed(precesion?.length));
      settotal(parseFloat(da * price).toFixed(quoteprecesion?.length));
    } else {
      setSliderValue(0.01);
      settotal(0.01);
    }
  };

  // Event handler for the range slider
  // const handleSliderChange = (event) => {
  //   console.log(event.target.value, "sliderValue new")
  //   setSliderValue(event.target.value);
  // };

  const handleChangeTakeProfit = () => {
    setCheckedTakeProfit(!isCheckedTakeProfit);
  };
  const handleChangeStopLoss = () => {
    setCheckedStopLoss(!isCheckedStopLoss);
  };

  const handleTakeProfit = (event) => {
    setTakeProfit(event.target.value);
  };

  const TP = useRef('');
  const SL = useRef('');
  const [tperr, setTperr] = useState('')
  const [slerr, setSlerr] = useState('')

  const Amountref = useRef('0.0000000');
  // const total = useRef()
  React.useEffect(() => {
    if (selected) {
      setPrice(selected?.price);
      // setAmount(selected.amount);
      // settotal(selected.total);
    }
    if (Amount !== "") {
      settotal((Amount * price).toFixed(quoteprecesion?.length));
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
    if (Amount !== "") {
      settotal((Amountref.current.value * selected?.price).toFixed(quoteprecesion?.length));
    } else {
      settotal("");
    }
  }, [selected?.price]);

  useEffect(() => {
    if (Amount !== "") {
      settotal((Amountref.current.value * selected?.price).toFixed(quoteprecesion?.length));
    } else {
      settotal("");
    }
  }, [Amount]);

  const handleonChange = (e) => {
    setValueNew(e.target.value);
  };

  const priceupdate = (event) => {
    const newValue = Math.max(0, Number(event.target.value));

    // setPrice((prev) => { return prev, event.target.value })
    setPrice(newValue);
  };
  const Amountupdate = (event) => {
    const newValue = Math.max(0, Number(event.target.value));

    // setAmount((prev) => { return prev, event.target.value })
    setAmount(newValue);
  };
  const totalupdate = (event) => {
    const newValue = Math.max(0, Number(event.target.value));
    const da = newValue / selected?.price;
    // console.log(parseFloat(da).toFixed(8), "amountjkb");
    setSliderValue(parseFloat(da).toFixed(precesion?.length));
    settotal(newValue.toFixed(quoteprecesion?.length));
  };
  const [load, setload] = useState(true);
  useEffect(() => {
    if (pair !== "") {
      setPrice("");
      setAmount("");
      settotal("");
    }
  }, [pair]);

  const getdatas = async () => {

    await Axios.post(`${Consts.BackendUrl}/trade/tradeHistory`, { pair: pair }, {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      },
    })
      .then((res) => {
        console.log(res, 'res');
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
        console.log(err, 'error');
      });
  }

  const buytrade = async () => {
    
    try {
      if(isCheckedTakeProfit === true){
        if(TP?.current?.value == '' || SL?.current?.value == ''){

          toast.error('Please Provide TP/SL price',{
            style: {
            padding: "1rem",
            fontSize: "15px",
            color: "red",
            fontWeight: "bold",
          },})
          return;
        } 
        
      }
      // const kycstatus = localStorage.getItem('kyc_verify')
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

      } else if (!buyShow && kycsubmit) {
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
       else if (Amount == "" || Amount == "0.0000000" ) {
        toast.error("Please Fill the Amount", {
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
      else if (Number(sliderValue) < Number(quantity)) {
        toast.error(`Minimum Order Quantiy Is ${quantity}` , {

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
      else {
        const usdtBalance = balance;
        // precesion = basePrecision.split('.')[1]
        // console.log("tradespot");
        setload(false);
        if (user.trader_type === "user") {
          // const pair12 = pair.split("-")[1];
          const pair12 = pair.slice(-cat?.length);
          var da = {};
          if(isCheckedTakeProfit == true){
            // alert(TP?.current?.value)
            da = {
              istpsl : isCheckedTakeProfit,
              instId: pair,
              side:'buy',
              orderType: index,
              px: price,
              sz: sliderValue != 'NaN' ? `${Number(sliderValue).toFixed(precesion?.length)}` : '1',
              trade_at:'spot',
              lever:'0',
              tpPrice: `${TP?.current?.value}`,
              slPrice: `${SL?.current?.value}`,
              tpOrderType:'Limit',
              timeInForce:'GTC',
              slOrderType:'Limit',
              tpLimitPrice: `${TP?.current?.value}`,
              slLimitPrice: `${SL?.current?.value}`
            };
          } else {
            da = {
              instId: pair,
              tdMode: "cash",
              ccy: pair12,
              tag: "mk1",
              side: "buy",
              orderType: index,
              sz:  sliderValue != 'NaN' ? `${Number(sliderValue).toFixed(precesion?.length)}` : '1',
              px: price,
              trade_at: "spot",
              lever: "0",
              istpsl : isCheckedTakeProfit
            };
          }
           
          // const da = {
          //   instId: pair,
          //   ccy: pair12,
          //   side: "buy",
          //   orderType: index,
          //   sz: `${sliderValue}`,
          //   px: `${price}`,
          //   // px: `${63,277}`,
          //   trade_at: "spot",
          //   lever: "0",
          // };
          {
            console.log(da, "da");
          }
          const { data } = await Axios.post(`/bybit/trade`, da, {
            headers: {
              Authorization: localStorage.getItem("Mellifluous"),
            },
          });
          if (data?.success) {
            setload(true);
            // setInputValue(true);
            toast.success(data?.message, {
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
            // window.location.reload();
            // sendDataToParent();
            setAmount("");
            reload(1)
          } else {
            setload(true);
            if(data?.message == 'Order quantity exceeded lower limit.'){
              toast.error(`Minimum Order quantity should be ${quantity}`, {
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
            } else {
            toast.error(data?.message, {
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
          // const pair12 = pair.split("-")[1];
          const pair12 = pair.slice(-cat?.length);
          // const da = {
          //   instId: pair,
          //   tdMode: "cash",
          //   ccy: pair12,
          //   tag: "mk1",
          //   side: "buy",
          //   orderType: index,
          //   sz: sliderValue,
          //   px: price,
          //   trade_at: "spot",
          //   lever: "0",
          // };
          if(isCheckedTakeProfit == true){
            da = {
              istpsl : isCheckedTakeProfit,
              tdMode: "cash",
              ccy: pair12,
              instId: pair,
              side:'buy',
              orderType: index,
              px: price,
              sz: sliderValue != 'NaN' ? `${Number(sliderValue).toFixed(precesion?.length)}` : '1',
              trade_at:'spot',
              lever:'0',
              tpPrice: `${TP?.current?.value}`,
              slPrice: `${SL?.current?.value}`,
              tpOrderType:'Limit',
              timeInForce:'GTC',
              slOrderType:'Limit',
              tpLimitPrice: `${TP?.current?.value}`,
              slLimitPrice: `${SL?.current?.value}`
            };
          } else {
             da = {
            instId: pair,
            tdMode: "cash",
            ccy: pair12,
            tag: "mk1",
            side: "buy",
            orderType: index,
            sz: sliderValue != 'NaN' ? `${Number(sliderValue).toFixed(precesion?.length)}` : '1',
            // sz: `${20}`,
            px: price,
            trade_at: "spot",
            lever: "0",
          };
        }
          // const { data } = await Axios.post(`/trade/CreateTrade`, da, {
          const { data } = await Axios.post(`/bybit/mastertrade`, da, {
            headers: {
              Authorization: localStorage.getItem("Mellifluous"),
            },
          });
          if (data?.success) {
            setload(true);
            toast.success(data?.message, {
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
            // window.location.reload();
            getTradebalance();
            setAmount("");
            reload(1)
          } else {
            setload(true);
            toast.error(data?.message, {
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
    } catch (error) {
      setload(!false);
      // if (error.response.data.message == 'Parameter sz error'){
      if (error?.message == 'Parameter sz error') {
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
      } else {
        // toast.error(error?.response?.data?.message, {
        toast.error(error?.message, {
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

  const getmyWallet = async () => {
    try {
      await Axios.get(`/bybit/getwallets`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          if (res?.data?.success) {
            // console.log(res, 'WALLET BALANCE', pair.substring(0, pair.length - 4), pair);
            for (let i = 0; i < res?.data?.result.length; i++) {
              // if (res?.data?.result[i].symbol === pair.split("-")[1]) {
              //   setBalance(res?.data?.result[i].balance);
              // }
              // if ( res?.data?.result[i].coinname == pair?.substring(0,- 4) && res?.data?.result[i].symbol == pair?.slice(- 4) ) {
              //   setBalance(res?.data?.result[i].balance);
              //   console.log(res?.data?.result[i].balance,"baln")
              // }
              // if (res?.data?.result[i].coinname == pair?.slice(0, - 4)) {
              //   setBalance(res?.data?.result[i].balance);
              //   // console.log(res?.data?.result[i].balance, "baln")
              // }
              const coin = res?.data?.result[i]

              if (coin?.coinname == cat) {
                setBalance(coin?.balance);
                // console.log(res?.data?.result[i].balance, "baln")
              }

            }
            // setBalance(res?.data?.result)

            setMaxbuy(parseFloat(Number(balance) / Number(selected?.price)).toFixed(7));
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
    try {
      await Axios.post(`/bybit/gettradebalance`,{ pair : cat }, {
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
    // getmyWallet();
    getTradebalance();
    setAmount(parseFloat(balance / selected?.price).toFixed(7) || '0');
    setSliderValue(parseFloat(balance / selected?.price).toFixed(precesion?.length) || '0');
  }, [selected, pair]);

  useEffect(() => {
    // console.log(market, "123");
    setPm(market);
  }, [market]);

  useEffect(()=> {
    setPrecesion(basePrecision.split('.')[1])
    setQuotePrecesion(quotePrecision.split('.')[1])
  },[basePrecision])

  // useEffect(() => {
  //   console.log(pair,'pair');
  //   setPrice('')
  //   if(selected.price === '' || undefined ){
  //     setPm(market)
  //   }
  //   if(selected !== '' || undefined  ){
  //     setPm(undefined)
  //   }

  // }, [market])


  const getOrderQty = async () => {

   const { data } = await Axios.post(`${Consts.BackendUrl}/bybit/getpairdetailes`, { type : 'spot' , pair: pair })
      if(data?.success){
        setQuantity(data?.result[0]?.lotSizeFilter?.minOrderQty);
        setMaxQuantity(data?.result[0]?.lotSizeFilter?.maxOrderQty);
        setquotePrecision(data?.result[0]?.lotSizeFilter?.quotePrecision);
        setbasePrecision(data?.result[0]?.lotSizeFilter?.basePrecision);
      } else {
        setQuantity(0);
        setMaxQuantity(0);
        setquotePrecision(0);
        setbasePrecision(0);
      }
  }

  useEffect(()=> {
    getOrderQty()
  }, [pair])

  return (
    <>
      <div className="Form-Inner-box form-Inner-box-style">
        {/* <label className="form-label-style">Price ({selected ? selected?.pair.split('-')[1] : "USD"})</label> */}

        <Stack direction="column" spacing={10}>
          <div className="price-limit-spot">
            {/* {console.log(market, "market")} */}
            <label className="form-label-style">
              {/* Price ({pair ? pair.split("-")[1] : "USD"}) */}
              {/* {console.log(cat,cat?.length,'CAT')} */}
              Price ({pair ? pair.slice(-cat?.length) : "USD"})
            </label>
            <div className="price-block-spot">
              {pm === undefined && (
                <TextField
                  type={"number"}
                  id="outlined-basic"
                  variant="outlined"
                  defaultValue={selected?.price}
                  value={selected?.price}
                  InputProps={{ inputProps: { min: "0" } }}
                  onChange={priceupdate}
                />
              )}
              {pm && (
                <TextField
                  type={"number"}
                  id="outlined-basic"
                  variant="outlined"
                  defaultValue={price ? price : pm}
                  value={price ? price : pm}
                  InputProps={{ inputProps: { min: "0" } }}
                  onChange={priceupdate}
                />
              )}
              <div className="price-block-spot-approx">~ ${selected?.price}</div>
            </div>
          </div>

          <div className="amount-limit-spot">
            <label className="form-label-style">
              {/* Amount ({pair ? pair.split("-")[0] : "USD"}) */}
              Amount ({pair ? pair.slice(0, -cat?.length) : "USD"})
            </label>
            <div className="amount-block-bottom-10px">
              <TextField
                type={"number"}
                id="valuechange"
                value={sliderValue}
                // onChange={(event) => setSliderValue(event.target.value)}
                InputProps={{ inputProps: { min: "0" } }}
                inputRef={Amountref}
                onChange={Amountupdate}
                // placeholder={`Min ${pair ? pair.split("-")[0] : "USD"}`}
                placeholder={`Min ${pair ? pair.slice(0, -cat?.length) : "USD"}`}
              />
            </div>
          </div>
        </Stack>
        <Slider
          // classes={{
          //   thumb: classes.thumb,
          //   rail: classes.rail,
          //   track: classes.track,
          //   valueLabel: classes.valueLabel,
          // }}

          sx={{
            "& .MuiSlider-thumb": {
              color: "#25DEB0",
            },
            "& .MuiSlider-track": {
              color: "#25DEB0",
            },
            "& .MuiSlider-rail": {
              color: "#25DEB0",
            },
            "& .MuiSlider-active": {
              color: "#25DEB0",
            },
          }}
          defaultValue={100}
          Value={sliderValue}
          onChange={handleSliderChange}
          aria-label="Default"
        />

        <div className="total-limit-spot">
          <label className="form-label-style">
            {/* Total ({pair ? pair.split("-")[1] : "USD"}) */}
            Total ({pair ? pair.slice(-cat?.length) : "USD"})
          </label>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              value={total}
              type={"number"}
              InputProps={{ inputProps: { min: "0" } }}
              onChange={totalupdate}
              id="outlined-adornment-weight"
              // endAdornment={<InputAdornment position="end">{pair ? pair.split('-')[1] : "USD"}</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
          </FormControl>

          <div className="available-max-block available-max-buy">
            <div className="available-max-block-left">
              <>
                <div>
                  <label>Available </label>
                  {balance ?
                    <div>
                      {parseFloat(balance).toFixed(6)}{" "}
                      {pair ? pair.slice(-cat?.length) : 'USDT' }
                    </div> :
                    <>{(0).toFixed(3)}{" "}{pair ? pair.slice(-cat?.length) : 'USDT'}</>
                  }

                  {/* <div>{ balance != "NaN" ? parseFloat(balance).toFixed(3) : 0} USDT</div> */}
                </div>

                <div>
                  <label>Maxbuy</label>
                  {balance ?
                    <div>
                      {parseFloat(Number(balance) / Number(selected?.price)).toFixed(7) != 'NaN' ? parseFloat(Number(balance) / Number(selected?.price)).toFixed(7) : 0} {pair.slice(0, -cat?.length)}
                    </div>
                    :
                    // <div>{0.00}{" "}{pair.split("-")[0]}</div>
                    <div>{0.00}{" "}{pair.slice(0, -cat?.length)}</div>
                  }
                </div>
                <div>
                <label>MinOrderQty :</label>  
                <div> { Number(quantity).toFixed(6) } </div>
                </div>
                

                {/* <div>
                  <label> Maxbuy </label>
                  {pair && balance && (
                    <div>
                      {selected.amount
                        ? parseFloat(balance / selected.price).toFixed(7)
                        : 0.0}{" "} */}
                {/* {pair.split("-")[0]} */}
                {/* {pair.slice(0,-4)}
                    </div>
                  )}
                </div> */}
              </>
            </div>

            <div className="available-max-block-right">
              <SwapHorizIcon />
            </div>
          </div>

          <div className="take-profit-stop-loss-block">
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCheckedTakeProfit}
                    onChange={handleChangeTakeProfit}
                  />
                }
                label="TP/SL"
              />
            </div>
            {/* <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCheckedStopLoss}
                    onChange={handleChangeStopLoss}
                  />
                }
                label="Stop loss"
              />
            </div> */}
          </div>
          {isCheckedTakeProfit && (
            <div className="take-profit-stop-loss-forms take-profit-form">
              <div className="form-design-tp-sl form-design-tp-trigger-price">
                <label>
                  TP trigger price ({`${pair ? pair.slice(0, -cat?.length) : "USD"}`})
                </label>
                <div>
                  <TextField
                    id="outlined-basic"
                    InputProps={{ inputProps: { min: "0" } }}
                    inputRef={TP}
                    type="number"
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

              {/* <div className="form-design-tp-sl form-design-tp-order-price">
                <label>TP order price (USDT)</label>
                <div>
                  <TextField
                    id="outlined-basic"
                    InputProps={{ inputProps: { min: "0" } }}
                    value="Market"
                  />
                  <Button>Market</Button>
                </div>
              </div> */}
            </div>
          )}

          {isCheckedTakeProfit && (
            <div className="take-profit-stop-loss-forms stop-loss-form">
              <div className="form-design-tp-sl form-design-tp-trigger-price">
                <label>
                  SL trigger price ({`${pair ? pair.slice(0, -cat?.length) : "USDT"}`})
                </label>
                <div>
                  <TextField
                    id="outlined-basic"
                    InputProps={{ inputProps: { min: "0" } }}
                    inputRef={SL}
                    type="number"
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

              {/* <div className="form-design-tp-sl form-design-tp-order-price">
                <label>SL order price (USDT)</label>
                <div>
                  <TextField
                    id="outlined-basic"
                    InputProps={{ inputProps: { min: "0" } }}
                    value="Market"
                  />
                  <Button>Market</Button>
                </div>
              </div> */}
            </div>  
          )}

          <Button
            className="Buy-SOL"
            variant="contained"
            onClick={buytrade}
            disabled={!load}
          >
            {/* Buy {selected ? selected?.pair.split("-")[0] : ""} */}
            Buy {pair ? pair.slice(0, -cat?.length) : ""}
          </Button>
        </div>
      </div>
    </>
  );
};

export default BuyFormInner;
