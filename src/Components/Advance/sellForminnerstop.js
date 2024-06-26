
import React, { useEffect, useRef,useState} from "react";
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
  marginTop:10, 
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
  '& .MuiSlider-rail':{
    backgroundColor:'#474d57'
  },
  '& .MuiSlider-root':{
    color:'#b7bdc6'
  },
  '& .MuiSlider-track':{
    color:'#b7bdc6'
  },
  '& .MuiSlider-valueLabel' : {
    top:'-30px',
    transform: 'rotate(-45deg)',
    backgroundColor:'transparent',
  },
   '& .MuiSlider-valueLabel.MuiSlider-valueLabelOpen' : {
    transform: 'rotate(-45deg)',
  },
  '& .MuiSlider-mark' : {
    // backgroundColor:'black',
    color:'black',
    transform: 'rotate(45deg)',
    width: 8,
    height: 8,
    marginTop: '-4px',
    border: '2px solid #474d57',
    '&:hover':{
      backgroundColor:'#474d57',
      border: '2px solid black',
    },
    '& $active' : {
      backgroundColor:'#474d57',
      border: '2px solid black',
    },
    '&:focus' : {
      border: '2px solid black',
    },
    '&:active' : {
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








const SellForminnerstop = ({ selected, pair , index }) => {
    console.log(selected,pair,index,"stop");
  const user = JSON.parse(window.localStorage.getItem("users"))
  const [price, setPrice] = React.useState(); 
  const [Amount, setAmount] = React.useState();
  const [total, settotal] = React.useState();
  const [ value,setValue] = React.useState()
  const Amountref = useRef()

  const [load,setload] = useState(true)

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
  const handleonChange = (e) =>{
    setValue(e.target.value)
    console.log("Changes:",value)
    
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
    // try {
    //   if(price === ""){
    //     toast.error("Please Fill the Price", {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });
    // } else if(Amount === ""){
    //   toast.error("Please Fill the Amount", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //   });
    // } 
    // else {
    //   if(user.trader_type === "user"){
    //     const pair12 = pair.split('-')[1]
    //     const  da = {
    //       instId: pair,
    //       tdMode : "cash",
    //       ccy : pair12,
    //       tag : "mk1",
    //       side : "buy",
    //       orderType : index,
    //       sz : Amount,
    //       px : price,
    //       trade_at : "spot"
    //     }
    //      const { data } = await Axios.post(`/trade/userTrade`, da , {
    //       headers: {
    //         Authorization: localStorage.getItem("Mellifluous"),
    //       }
    //     })
    //     if(data){
    //     toast.success(data.message, {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });
    //     setAmount("")
    //   }else{
    //     toast.success("Something Went Wrong", {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });
    //   }
    //   }else{
    //     const pair12 = pair.split('-')[1]
    //     const  da = {
    //       instId: pair,
    //       tdMode : "cash",
    //       ccy : pair12,
    //       tag : "mk1",
    //       side : "buy",
    //       orderType : index,
    //       sz : Amount,
    //       px : price,
    //       trade_at : "spot"
    //     }
    //      const { data } = await Axios.post(`/trade/CreateTrade`, da , {
    //       headers: {
    //         Authorization: localStorage.getItem("Mellifluous"),
    //       }
    //     })
    //     if(data){
    //     toast.success(data.message, {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });
    //     setAmount("")
    //   }else{
    //     toast.success("Something Went Wrong", {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });
    //   }
    //   }
    // }
    // } catch (error) {
    //   toast.error(error.response.data.message, {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //   });
    // }
    setload(true)
  }
  return (
    <>
    
    <div className="Form-Inner-box">
      
      {/* <label className="form-label-style">Price ({selected ? selected?.pair.split('-')[1] : "USD"})</label> */}
      <label className="form-label-style">Price ({pair ? pair.split('-')[1] : "USD"})</label>

      <div className="">
        <TextField
          type={"number"}
          id="outlined-basic"
          variant="outlined"
          value={selected.price}
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

        <div style={{"width":"89%"}}>
     <ThumbSlider
        aria-label="Temperature"
        defaultValue={0}
       value={value}
       onChange={(e)=> handleonChange(e)}
        valueLabelDisplay="auto"
        marks={true}
        step={10}
        min={0}
        max={20}
        ValueLabelComponent={ValueLabelComponent}
      />
     </div>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <OutlinedInput
            value={total}
            type={"number"}
            onChange={totalupdate}
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">{pair ? pair.split('-')[1] : "USD"}</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
        </FormControl>
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
        <Button className="Sell-SOL Buy-SOL" variant="contained" onClick={buytrade} disabled={!load}>
          Sell {selected ? selected?.pair.split('-')[0] : ""}
        </Button>
      </div>
    </div>
    </>
  );
};

export default SellForminnerstop;
