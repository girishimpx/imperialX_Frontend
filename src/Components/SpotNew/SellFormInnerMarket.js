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
// import { Stack } from "rsuite";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import { Slider, Tooltip, Stack } from '@mui/material';
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

const SellFormInnerMarket = ({ selected, pair, index, market, reload }) => {
  const user = JSON.parse(window.localStorage.getItem("users"))
  const [price, setPrice] = React.useState();
  const [Amount, setAmount] = React.useState();
  const [total, settotal] = React.useState();
  const [load, setload] = useState(true)
  const [takeProfit, setTakeProfit] = React.useState('');
  const [isCheckedTakeProfit, setCheckedTakeProfit] = useState(false);
  const [isCheckedStopLoss, setCheckedStopLoss] = useState(false);
  const [balance, setBalance] = useState()
  const [value, setValue] = React.useState()
  const [sliderValue, setSliderValue] = useState();
  const [kycsubmit, setkycsubmit] = React.useState(false);
  const [sellShow,setSellShow]= React.useState(false);
  const navigate = useNavigate();


  const handleSliderChange = async (event, data) => {
    const bs = parseFloat(balance).toFixed(7)
    const da = (data / 100 * bs)
    parseFloat()

    setSliderValue(parseFloat(da).toFixed(7));
  };


  const handleChangeTakeProfit = () => {
    setCheckedTakeProfit(!isCheckedTakeProfit);
  };
  const handleChangeStopLoss = () => {
    setCheckedStopLoss(!isCheckedStopLoss);
  };

  const handleTakeProfit = (event) => {
    setTakeProfit(event.target.value);
  };

  const Amountref = useRef()
  // const total = useRef()
  React.useEffect(() => {


    if (selected) {
      setPrice(selected.price);
      // setAmount(selected.amount);
      // settotal(selected.total);
    }
    if (Amount !== "") {
      settotal(Amount * price)
    } else {
      settotal("")
    }
  }, []);

  React.useEffect(() => {


    if (selected) {
      setPrice(selected.price);
      // setAmount(selected.amount);
      // settotal(selected.total);
    }
    if (Amount !== "") {
      settotal(Amountref.current.value * selected.price)
    } else {
      settotal("")
    }
  }, [selected]);

  useEffect(() => {
    if (Amount !== "") {
      settotal(Amountref.current.value * selected.price)
    } else {
      settotal("")
    }
  }, [Amount])

  const handleonChange = (e) => {
    setValue(e.target.value)
  }

  // const priceupdate = (event) => {

  //   setPrice((prev) => { return prev, event.target.value })
  // };
  const Amountupdate = (event) => {
    const newValue = Math.max(0, Number(event.target.value));
    setAmount(Amountref.current.value)
    settotal(selected.price * Amountref.current.value)
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
    try {
      // console.log(Amountref.current.value, "amounr");
      if (!sellShow && !kycsubmit) {
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
      }else if(!sellShow && kycsubmit){
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
      }else if(Amountref === "") {
        toast.error("Pelese Fill the Amount", {

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
      } else {
        const usdtBalance = parseFloat(balance || 0);
        const pairName = pair ? pair.split("-")[0] : "USD"



        setload(false)
        if (user.trader_type === "user") {
          const pair12 = pair.split('-')[1]
          const da = {
            instId: pair,
            tdMode: "cash",
            ccy: pair12,
            tag: "mk1",
            side: "sell",
            orderType: index,
            sz: Amountref.current.value,
            px: "1",
            trade_at: "spot",
            lever: "0",
            market: market
          }
          const { data } = await Axios.post(`/trade/userTrade`, da, {
            headers: {
              Authorization: localStorage.getItem("Mellifluous"),
            }
          })
          if (data) {
            setload(true)
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
            setAmount("")
            reload(1)
          } else {
            setload(true)
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
          const pair12 = pair.split('-')[1]
          const da = {
            instId: pair,
            tdMode: "cash",
            ccy: pair12,
            tag: "mk1",
            side: "sell",
            orderType: index,
            sz: Amountref.current.value,
            px: "1",
            trade_at: "spot",
            lever: "0",
            market: market
          }
          const { data } = await Axios.post(`/trade/CreateTrade`, da, {
            headers: {
              Authorization: localStorage.getItem("Mellifluous"),
            }
          })
          if (data) {
            setload(true)
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
            setAmount("")
            reload(1)
          } else {
            setload(true)
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


      }
    } catch (error) {
      setload(!false)
      if (error.response.data.message == 'Parameter sz error'){
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
      console.log(error, "err");
      toast.error(error?.response?.data?.message, {

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
          setSellShow(true);
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

            for (let i = 0; i < res?.data?.result.length; i++) {
              if (res?.data?.result[i].symbol === pair.split("-")[0]) {
                setBalance(res?.data?.result[i].balance)
                setSliderValue(res?.data?.result[i].balance)
              }
            }
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

      <div className="Form-Inner-box form-Inner-box-style">
        <Stack direction="column" spacing={10}>


          <div className="amount-limit-spot">
            <label className="form-label-style">Amount ({pair ? pair.split('-')[0] : "USD"})</label>
            <div className="">
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <OutlinedInput
                  type={"number"}
                  id="valuechange"
                  value={sliderValue}
                  // onChange={(event) => setSliderValue(event.target.value)}
                  InputProps={{ inputProps: { min: "0" } }}
                  inputRef={Amountref}
                  onChange={Amountupdate}
                  placeholder={`Min ${pair ? pair.split('-')[0] : "USD"}`}

                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}

                />
              </FormControl>

            </div>
          </div>
        </Stack>

        <Slider
          sx={{
            '& .MuiSlider-thumb': {
              color: "#25DEB0"
            },
            '& .MuiSlider-track': {
              color: "#25DEB0"
            },
            '& .MuiSlider-rail': {
              color: "#25DEB0"
            },
            '& .MuiSlider-active': {
              color: "#25DEB0"
            }
          }}
          defaultValue={100} value={sliderValue} onChange={handleSliderChange} aria-label="Default" />



        <div>


          <div className="available-max-block available-max-buy">
            <div className="available-max-block-left">
              <div>
                <label>Availabe</label>
                {pair &&
                  balance &&
                  <div>
                    {balance.toFixed(3)}{" "}
                    {pair.split("-")[0]}
                  </div>
                }
              </div>
              <div>
                <label>Maxsell</label>
                {market ?
                  <div>
                    {parseFloat(balance * market).toFixed(7)}{" "} {pair.split("-")[1]}
                  </div>
                  :
                  <div>{0.00}{" "}{pair.split("-")[1]}</div>
                }

              </div>
            </div>
            <div className="available-max-block-right"><SwapHorizIcon /></div>
          </div>

          <div className="take-profit-stop-loss-block">
            <div><FormControlLabel control={<Checkbox checked={isCheckedTakeProfit} onChange={handleChangeTakeProfit} />} label="Take profit" /></div>
            <div><FormControlLabel control={<Checkbox checked={isCheckedStopLoss} onChange={handleChangeStopLoss} />} label="Stop loss" /></div>
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

              <div className="form-design-tp-sl form-design-tp-order-price">
                <label>TP order price (USDT)</label>
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

          <Button className="Sell-SOL Buy-SOL" variant="contained" onClick={buytrade} disabled={!load}>
            Sell {selected ? selected?.pair.split('-')[0] : ""}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SellFormInnerMarket;
