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
import { Slider, Tooltip, Stack } from "@mui/material";
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

const BuyFormInner = ({ selected, pair, index, market, onDataFromChild,reload }) => {
  const user = JSON.parse(window.localStorage.getItem("users"));
  const [price, setPrice] = React.useState();
  const [Amount, setAmount] = React.useState();
  const [total, settotal] = React.useState();
  const [buyShow,setBuyShow]= React.useState(false);
  const [takeProfit, setTakeProfit] = React.useState("");
  const [isCheckedTakeProfit, setCheckedTakeProfit] = useState(false);
  const [isCheckedStopLoss, setCheckedStopLoss] = useState(false);
  const [balance, setBalance] = useState();
  const [valueNew, setValueNew] = React.useState();
  const [sliderValue, setSliderValue] = useState();
  const [maxbuy, setMaxbuy] = useState();
  const [pm, setPm] = useState();
  const [kycsubmit, setkycsubmit] = React.useState(false);

  const navigate = useNavigate();

  const classes = useStyles();

  const handleSliderChange = async (event, data) => {
    const bs = parseFloat(Amount).toFixed(7);
    const da = Math.max(0, Number((data * bs) / 100));
    if (da > 0) {
      setSliderValue(parseFloat(da).toFixed(7));
      settotal(parseFloat(da * price).toFixed(7));
    } else {
      setSliderValue(0);
      settotal(0);
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

  const Amountref = useRef();
  // const total = useRef()
  React.useEffect(() => {
    if (selected) {
      setPrice(selected.price);
      // setAmount(selected.amount);
      // settotal(selected.total);
    }
    if (Amount !== "") {
      settotal(Amount * price);
    } else {
      settotal("");
    }
  }, []);

  React.useEffect(() => {
    if (selected) {
      setPrice(selected.price);
      // setAmount(selected.amount);
      // settotal(selected.total);
    }
    if (Amount !== "") {
      settotal(Amountref.current.value * selected.price);
    } else {
      settotal("");
    }
  }, [selected.price]);

  useEffect(() => {
    if (Amount !== "") {
      settotal(Amountref.current.value * selected.price);
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
    const da = newValue / selected.price;
    // console.log(parseFloat(da).toFixed(8), "amountjkb");
    setSliderValue(parseFloat(da).toFixed(8));
    settotal(newValue);
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
    }else if (price === "") {
        toast.error("Pelese Fill the Price", {
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
      } else if (Amount === "" || Amount === "0.0000000" ) {
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
      } else {
        const usdtBalance = balance;
        console.log("tradespot");
        setload(false);
        if (user.trader_type === "user") {
          const pair12 = pair.split("-")[1];
          const da = {
            instId: pair,
            tdMode: "cash",
            ccy: pair12,
            tag: "mk1",
            side: "buy",
            orderType: index,
            sz: sliderValue,
            px: price,
            trade_at: "spot",
            lever: "0",
          };
          {
            console.log(da, "da");
          }
          const { data } = await Axios.post(`/trade/userTrade`, da, {
            headers: {
              Authorization: localStorage.getItem("Mellifluous"),
            },
          });
          if (data) {
            setload(true);
            // setInputValue(true);
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
            // window.location.reload();
            // sendDataToParent();
            setAmount("");
            reload(1)
          } else {
            setload(true);
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
          const da = {
            instId: pair,
            tdMode: "cash",
            ccy: pair12,
            tag: "mk1",
            side: "buy",
            orderType: index,
            sz: sliderValue,
            px: price,
            trade_at: "spot",
            lever: "0",
          };
          const { data } = await Axios.post(`/trade/CreateTrade`, da, {
            headers: {
              Authorization: localStorage.getItem("Mellifluous"),
            },
          });
          if (data) {
            setload(true);
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
            // window.location.reload();
            setAmount("");
            reload(1)
          } else {
            setload(true);
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
    } catch (error) {
      setload(!false);
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
      }else{
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
            for (let i = 0; i < res?.data?.result.length; i++) {
              if (res?.data?.result[i].symbol === pair.split("-")[1]) {
                setBalance(res?.data?.result[i].balance);
              }
            }
            // setBalance(res?.data?.result)

            setMaxbuy(parseFloat(balance / selected.price).toFixed(7));
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
    getmyWallet();
    setAmount(parseFloat(balance / selected.price).toFixed(7));
    setSliderValue(parseFloat(balance / selected.price).toFixed(7));
  }, [selected]);

  useEffect(() => {
    // console.log(market, "123");
    setPm(market);
  }, [market]);

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

  return (
    <>
      <div className="Form-Inner-box form-Inner-box-style">
        {/* <label className="form-label-style">Price ({selected ? selected?.pair.split('-')[1] : "USD"})</label> */}

        <Stack direction="column" spacing={10}>
          <div className="price-limit-spot">
            {/* {console.log(market, "market")} */}
            <label className="form-label-style">
              Price ({pair ? pair.split("-")[1] : "USD"})
            </label>
            <div className="price-block-spot">
              {pm === undefined && (
                <TextField
                  type={"number"}
                  id="outlined-basic"
                  variant="outlined"
                  defaultValue={selected.price}
                  value={selected.price}
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
              <div className="price-block-spot-approx">~ ${selected.price}</div>
            </div>
          </div>

          <div className="amount-limit-spot">
            <label className="form-label-style">
              Amount ({pair ? pair.split("-")[0] : "USD"})
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
                placeholder={`Min ${pair ? pair.split("-")[0] : "USD"}`}
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
            Total ({pair ? pair.split("-")[1] : "USD"})
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
                  <label>Available</label>

                  <div>{ balance != "NaN" ? parseFloat(balance).toFixed(3) : 0} USDT</div>
                </div>

                <div>
                  <label> Maxbuy </label>
                  {pair && balance && (
                    <div>
                      {selected.amount
                        ? parseFloat(balance / selected.price).toFixed(7)
                        : 0.0}{" "}
                      {pair.split("-")[0]}
                    </div>
                  )}
                </div>
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
                label="Take profit"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCheckedStopLoss}
                    onChange={handleChangeStopLoss}
                  />
                }
                label="Stop loss"
              />
            </div>
          </div>
          {isCheckedTakeProfit && (
            <div className="take-profit-stop-loss-forms take-profit-form">
              <div className="form-design-tp-sl form-design-tp-trigger-price">
                <label>
                  TP trigger price ({`${pair ? pair.split("-")[0] : "USD"}`})
                </label>
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
          )}

          {isCheckedStopLoss && (
            <div className="take-profit-stop-loss-forms stop-loss-form">
              <div className="form-design-tp-sl form-design-tp-trigger-price">
                <label>
                  SL trigger price ({`${pair ? pair.split("-")[0] : "USD"}`})
                </label>
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
          )}

          <Button
            className="Buy-SOL"
            variant="contained"
            onClick={buytrade}
            disabled={!load}
          >
            Buy {selected ? selected?.pair.split("-")[0] : ""}
          </Button>
        </div>
      </div>
    </>
  );
};

export default BuyFormInner;
