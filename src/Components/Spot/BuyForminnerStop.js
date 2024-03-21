import React, { useEffect, useRef,useState} from "react";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Axios from "../../Axios";

import { Slider, RangeSlider } from "rsuite";

const BuyForminnerStop = ({ selected, pair , index }) => {
  const [price, setPrice] = React.useState();
  const [Amount, setAmount] = React.useState();
  const [total, settotal] = React.useState();
  const [load,setload] = useState(true)
  const Amountref = useRef()
  // const total = useRef()
  React.useEffect(() => {
    console.log("sell",selected, pair)
    
      
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
    console.log("sell",selected, pair)
    
      
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
    setload(false)
    try {
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
      console.log(error,"error");
    }
  }

  return (
    <div className="Form-Inner-box">

      {/* <label className="form-label-style">Price ({selected ? selected?.pair.split('-')[1] : "USD"})</label> */}
      <label className="form-label-style">Price ({pair ? pair.split('-')[1] : "USD"})</label>

      <div className="">
        <TextField
          type={"number"}
          id="outlined-basic"
          variant="outlined"
          value={selected.price}
          InputProps={{ inputProps: { min: "0" } }}
          onChange={priceupdate}
        />
      </div>
      <label className="form-label-style">Amount ({pair ? pair.split('-')[0] : "USD"})</label>
      <div className="">
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            type={"number"}
            value={Amount}
            InputProps={{ inputProps: { min: "0" } }}
            inputRef={Amountref}
            // onChange={Amountupdate}
            onChange={Amountupdate}
            endAdornment={
              <InputAdornment position="end">
                Minstop<span>{pair ? pair.split('-')[0] : "USD"}</span>
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}

          />
        </FormControl>

        {/* <Slider defaultValue={0} min={0} step={25} max={100} graduated /> */}
      </div>
      <div>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
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
        </FormControl>
        <div className="available-max-buy">
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
        </FormGroup>
        <Button className="Buy-SOL" variant="contained" onClick={buytrade} disabled={!load}>
          Buy ({selected ? selected?.pair.split('-')[0] : ""})
        </Button>
      </div>
    </div>
  );
};

export default BuyForminnerStop;
