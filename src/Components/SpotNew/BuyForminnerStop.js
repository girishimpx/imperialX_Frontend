import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Button from "@mui/material/Button";
import Axios from "../../Axios";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Consts from "../../Constansts";
import { useNavigate } from "react-router-dom";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";


// import { Slider, RangeSlider, Stack } from "rsuite";
import { styled } from '@mui/material/styles';
import { Slider, Tooltip, Stack } from '@mui/material';


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


const BuyForminnerStop = ({ selected, pair, index, market, reload }) => {
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
  const [pm, setPm] = useState()
  const [buyShow,setBuyShow]= React.useState(false);
  const [kycsubmit, setkycsubmit] = React.useState(false);
  const navigate = useNavigate();



  const handleSliderChange = async (event, data) => {
    const bs = parseFloat(balance?.find((item) => item.symbol === "USDT")?.balance).toFixed(2)
    const da = data / 100 * bs
    parseFloat()
    console.log(da, 'aidugoi[p');
    setSliderValue(da);
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
    console.log("sell", selected, pair)


    if (selected) {
      setPrice(selected.price);
      // setAmount(selected.amount);
      // settotal(selected.total);
    }
    if (Amount !== "") {
      console.log(Amount)
      settotal(Amount * price)
    } else {
      settotal("")
    }
  }, []);

  React.useEffect(() => {
    console.log("sell", selected, pair)


    if (selected) {
      setPrice(selected.price);
      // setAmount(selected.amount);
      // settotal(selected.total);
    }
    if (Amount !== "") {
      console.log(Amountref.current.value)
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
    // setload(false)
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
      }
      //   const { data } = await Axios.post(`/trade/CreateTrade`, {
      //     instId: "XRP-USDT",
      //     tdMode : "cash",
      //     ccy : "USDT",
      //     tag : "Master-trade",
      //     side : "buy",
      //     orderType : "limit",
      //     sz : "0.1",
      //     px : "1000",
      //     trade_at : "spot"
      //   }, {
      //     headers: {
      //       Authorization: localStorage.getItem("Mellifluous"),
      //     }
      //   })
      //   console.log(data,"trade");
    } catch (error) {
      console.log(error, "error");
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

  useEffect(() => {
    setPm(market)
  }, [market])

  return (
    <div className="Form-Inner-box form-Inner-box-style buy-form-inner-stop-tab">

      {/* <label className="form-label-style">Price ({selected ? selected?.pair.split('-')[1] : "USD"})</label> */}
    {console.log(selected,'wesxrctfvhyudtrtfbhyunj',sliderValue)}
      <Stack direction="column" spacing={10}>
        <div className="price-limit-spot">
          <label className="form-label-style">Price ({pair ? pair.split('-')[1] : "USD"})</label>
          <div className="">
          {pm === undefined && <TextField
              type={"number"}
              id="outlined-basic"
              variant="outlined"
              defaultValue={selected.price}
              value={selected.price}
              InputProps={{ inputProps: { min: "0" } }}
              onChange={priceupdate}
            />}
            {pm && <TextField
                type={"number"}
                id="outlined-basic"
                variant="outlined"
                defaultValue={price ? price :pm}
                value={price ? price :pm}
                InputProps={{ inputProps: { min: "0" } }}
                onChange={priceupdate}
              />}
          </div>
        </div>

        <div className="amount-limit-spot">
          <label className="form-label-style">Amount ({pair ? pair.split('-')[0] : "USD"})</label>
          <div className="amount-block-bottom-10px">
            <TextField
              type={"number"}
              id="valuechange"
              value={sliderValue}
              onChange={(event) => setSliderValue(event.target.value)}
              InputProps={{ inputProps: { min: "0" } }}
              inputRef={Amountref}
              // onChange={Amountupdate}
              placeholder={`Min Stop ${pair ? pair.split('-')[0] : "USD"}`}
            />
            {/* <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  type={"number"}
                  value={Amount}
                  InputProps={{ inputProps: { min: "0" } }}
                  inputRef={Amountref}
                  onChange={Amountupdate}
                  endAdornment={
                    <InputAdornment position="end" InputProps={{ inputProps: { min: "0" } }} >
                      Min  (<span>{pair ? pair.split('-')[0] : "USD"}</span>)
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}

                />
              </FormControl> */}

            {/* <Slider defaultValue={0} min={0} step={25} max={100} graduated /> */}
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

      {/* <div style={{ "width": "98%" }}>
          <ThumbSlider
            aria-label="Temperature"
            defaultValue={0}
            value={value}
            onChange={(e) => handleonChange(e)}
            valueLabelDisplay="auto"
            marks={true}
            step={10}
            min={0}
            max={20}
            ValueLabelComponent={ValueLabelComponent}
          />
        </div> */}
      <div className="total-limit-spot">
        <label className="form-label-style">Total ({pair ? pair.split('-')[1] : "USD"})</label>
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

        {/* <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <OutlinedInput
            value={total}
            type={"number"}
            onChange={totalupdate}
            id="outlined-adornment-weight"
            InputProps={{ inputProps: { min: "0" } }}
            endAdornment={<InputAdornment position="end">{pair ? pair.split('-')[1] : "USD"}</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
        </FormControl> */}

        {/* <div className="available-max-buy">
          <span>
            Available <span>-- USDC</span>
          </span>
          <span>
            Max buy <span>-- BTC</span>
          </span>
        </div> */}
        {/* <FormGroup className="requirmnent">
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Take profit"
          />
          <FormControlLabel required control={<Checkbox />} label="Stop loss" />
        </FormGroup> */}
        <div className="available-max-block available-max-buy">
          <div className="available-max-block-left">
            <div><label>Availabe</label>
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
            <div><label>Maxbuy</label>
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
            {/* <div><label>Availabe</label> -- USDT</div>
          <div><label>Max buy</label> -- {pair ? pair.split('-')[0] : "USD"}</div> */}
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
        <Button className="Buy-SOL" variant="contained" onClick={buytrade} disabled={!load}>
          Buy ({selected ? selected?.pair.split('-')[0] : ""})
        </Button>
      </div>
    </div>
  );
};

export default BuyForminnerStop;
