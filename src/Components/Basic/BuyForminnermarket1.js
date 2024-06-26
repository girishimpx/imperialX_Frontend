
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








const BuyForminnermarket = ({ selected, pair, index, ordertype, labe, market }) => {
  const user = JSON.parse(window.localStorage.getItem("users"))
  const [price, setPrice] = React.useState();
  const [Amount, setAmount] = React.useState();
  const [total, settotal] = React.useState();
  const [value, setValue] = React.useState()
  const [sli, setSli] = React.useState(0)
  const Amountref = useRef()



  const [load, setload] = useState(true)


  React.useEffect(() => {
    if (selected) {
      setPrice(selected.price);
      // setAmount(selected.amount);
      // settotal(selected.total);
    }
    if (Amount !== "" && Amount != " ") {

      settotal(Amount * price)
    } else {
      settotal("")
    }
  }, []);

  React.useEffect(() => {


    if (selected) {
      setPrice(selected?.price);
      // setAmount(selected.amount);
      // settotal(selected.total);
    }
    if (Amount != "" && Amount != " ") {
      settotal(Amountref?.current?.value * selected?.price)
    } else {
      settotal("")
    }
  }, [selected]);

  useEffect(() => {
    if (Amount !== "") {
      settotal(Amountref?.current?.value * selected?.price)
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
    const newValue = Math.max(0, Number(event.target.value))
    setAmount(newValue)
  };
  const totalupdate = (event) => {
    const newValue = Math.max(0, Number(event.target.value))
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
      const pa = pair.split('-')[2]
      if (pa !== undefined) {
        if (labe === "open-long") {

          if (Amount == "") {

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
          }
          else {
            setload(false)
            if (user.trader_type === "user") {
              const pair12 = pair.split('-')[1]
              var a = ["future-", labe]
              var b = a.join("")
              const da = {
                instId: pair,
                tdMode: index,
                ccy: pair12,
                tag: "mk1",
                side: "buy",
                orderType: ordertype,
                sz: Amount,
                px: "0",
                trade_at: b,
                lever: value,
                market: { market }
              }
              const { data } = await Axios.post(`/trade/userTrade`, da, {
                headers: {
                  Authorization: localStorage.getItem("Mellifluous"),
                }
              })
              if (data) {
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
              } else {
                setload(true)
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
              const pair12 = pair.split('-')[1]
              var a = ["future-", labe]
              var b = a.join("")
              const da = {
                instId: pair,
                tdMode: index,
                ccy: pair12,
                tag: "mk1",
                side: "buy",
                orderType: ordertype,
                sz: Amount,
                px: "0",
                trade_at: b,
                lever: value,
                market: { market }
              }
              const { data } = await Axios.post(`/trade/CreateTrade`, da, {
                headers: {
                  Authorization: localStorage.getItem("Mellifluous"),
                }
              })
              if (data) {
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
              } else {
                setload(true)
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
          const { data } = await Axios.post(`/trade/positionHistory`, { id: pair }, {
            headers: {
              Authorization: localStorage.getItem("Mellifluous"),
            }
          })
          let his = data.result[0]
          if (user.trader_type === "user") {
            var a = ["future-", labe]
            var b = a.join("")
            const da = {
              instId: his?.instId,
              tdMode: his?.mgnMode,
              ccy: his?.ccy,
              tag: "mk1",
              side: "sell",
              orderType: ordertype,
              sz: parseFloat(his?.notionalUsd).toFixed(2),
              px: "0",
              trade_at: b,
              lever: value
            }
            const { data } = await Axios.post(`/trade/userTrade`, da, {
              headers: {
                Authorization: localStorage.getItem("Mellifluous"),
              }
            })
            if (data) {
              setload(!false)
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
            } else {
              setload(!false)
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

            const pair12 = pair.split('-')[1]
            var a = ["future-", labe]
            var b = a.join("")
            const da = {
              instId: his?.instId,
              tdMode: his?.mgnMode,
              ccy: his?.ccy,
              tag: "mk1",
              side: "sell",
              orderType: ordertype,
              sz: parseFloat(his?.notionalUsd).toFixed(2),
              px: "0",
              trade_at: b,
              lever: value
            }
            const { data } = await Axios.post(`/trade/CreateTrade`, da, {
              headers: {
                Authorization: localStorage.getItem("Mellifluous"),
              }
            })
            if (data) {
              setload(!false)
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
            } else {
              setload(!false)
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
      } else {
        setload(!false)
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
    } catch (error) {
      // toast.error(error.response.data.message, {

      //     setPairduration: 2500,
      //     position: "top-center",

      //     // Styling
      //     style: {
      //       padding: "1rem",
      //       fontSize: "15px",
      //       color: "green",
      //       fontWeight: "bold",
      //     },
      //     className: "",

      //     // Custom Icon
      //    icon:"",

      //     // Change colors of success/error/loading icon
      //     iconTheme: {
      //       primary: "#000",
      //       secondary: "#fff",
      //     },

      //     // Aria
      //     ariaProps: {
      //       role: "status",
      //       "aria-live": "polite",
      //     },
      //   });
    }
  }
  return (
    <>

      <div className="Form-Inner-box">
        {/* <label className="form-label-style">Price ({selected ? selected?.pair.split('-')[1] : "USD"})</label> */}
        <label className="form-label-style">Price ({pair ? pair.split('-')[1] : "USD"})</label>

        <div className="">
          <TextField
            type={"text"}
            id="outlined-basic"
            variant="outlined"
            value="Market price"
          />
        </div>
        <label className="form-label-style">Amount ({pair ? pair.split('-')[0] : "USD"})</label>
        <div className="">

          {labe === "open-long" ? <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              type={"number"}
              value={Amount}
              inputRef={Amountref}
              onChange={Amountupdate}
              endAdornment={
                <InputAdornment position="end">
                  Min  (<span>{pair ? pair.split('-')[0] : "USD"}</span>)
                </InputAdornment>
              }
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
                endAdornment={
                  <InputAdornment position="end">
                    Min  (<span>{pair ? pair.split('-')[0] : "USD"}</span>)
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}

              />
            </FormControl>
          }

          {labe === "open-long" ? <div style={{ "width": "89%" }}>
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
          </div> : <div style={{ "width": "89%" }}>
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
        <div>

          <Button className="Buy-SOL" variant="contained" onClick={buytrade} disabled={!load}>
            Long {selected ? selected?.pair.split('-')[1] : ""}
          </Button>
        </div>
      </div>
    </>
  );
};

export default BuyForminnermarket;
