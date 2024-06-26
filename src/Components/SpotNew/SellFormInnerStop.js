import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Axios from "../../Axios";
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

const SellFormInnerStop = ({ selected, pair, index, market, reload, cat }) => {
  const [price, setPrice] = React.useState();
  const [Amount, setAmount] = React.useState();
  const [total, settotal] = React.useState();
  const [value, setValue] = React.useState()
  const [load, setload] = useState(true)
  const [sliderValue, setSliderValue] = useState();
  const [pm, setPm] = useState()

  const handleSliderChange = async (event, data) => {
    // const bs = parseFloat(balance?.find((item) => item.symbol === "USDT")?.balance).toFixed(2)
    const bs = balance
    const da = data / 100 * bs
    parseFloat()
    console.log(da, 'aidugoi[p');
    setSliderValue(da);
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
    setAmount(Amountref.current.value)
    settotal(selected.price * Amountref.current.value)
    console.log(price, Amountref.current.value, total)
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
      // const { data } = await Axios.post(`/trade/CreateTrade`, {
      //   instId: "XRP-USDT",
      //   tdMode : "cash",
      //   ccy : "USDT",
      //   tag : "Master-trade",
      //   side : "buy",
      //   orderType : "limit",
      //   sz : "0.1",
      //   px : "1000",
      //   trade_at : "spot"
      // }, {
      //   headers: {
      //     Authorization: localStorage.getItem("Mellifluous"),
      //   }
      // })
    } catch (error) {
      console.log(error, "error");
    }
  }

  useEffect(() => {
    setPm(market)
  }, [market])

  return (
    <div className="Form-Inner-box">

      {/* <label className="form-label-style">Price ({selected ? selected?.pair.split('-')[1] : "USD"})</label> */}
      <label className="form-label-style">Price ({pair ? pair.slice(-cat?.length) : "USD"})</label>

      <div className="">
      {pm === undefined &&  <TextField
          type={"number"}
          id="outlined-basic"
          variant="outlined"
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
      <label className="form-label-style">Amount ({pair ? pair.split(0, -cat?.length) : "USD"})</label>
      <div className="">
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <OutlinedInput
            type={"number"}
            id="valuechange"
            value={sliderValue}
            onChange={(event) => setSliderValue(event.target.value)}
            InputProps={{ inputProps: { min: "0" } }}
            inputRef={Amountref}
            // onChange={Amountupdate}
            // onChange={Amountupdate}
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

      {/* <div style={{ "width": "89%" }}>
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
      <div>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <OutlinedInput
            value={total}
            type={"number"}
            InputProps={{ inputProps: { min: "0" } }}
            onChange={totalupdate}
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">{pair ? pair.slice(-cat?.length) : "USD"}</InputAdornment>}
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
            Max buy <span>-- {pair ? pair.split(0, -cat?.length) : "USD"}</span>
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
          Sell {selected ? selected?.pair.split(0, -cat?.length) : ""}
        </Button>
      </div>
    </div>
  );
};

export default SellFormInnerStop;
