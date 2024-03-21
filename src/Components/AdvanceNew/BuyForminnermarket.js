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
import { Stack } from "rsuite";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Consts from "../../Constansts";
import { useNavigate } from "react-router-dom";


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


const BuyForminnermarket = ({ selected, pair , index , ordertype,market, reload }) => {
    console.log(selected,pair,index,"market");
  const user = JSON.parse(window.localStorage.getItem("users"))
  const [price, setPrice] = React.useState(); 
  const [Amount, setAmount] = React.useState();
  const [total, settotal] = React.useState();
  const [ value,setValue] = React.useState()
  const [takeProfit, setTakeProfit] = React.useState('');
  const [isCheckedTakeProfit, setCheckedTakeProfit] = useState(false);
  const [isCheckedStopLoss, setCheckedStopLoss] = useState(false);
  const [balance, setBalance] = useState()
  const [activeClass, setActiveClass] = useState("1");
  const navigate = useNavigate();
  const [kycsubmit, setkycsubmit] = React.useState(false);
  const [buyShow,setBuyShow]= React.useState(false);
  const [leverage, setLeverage] = useState();

 const percentageValue = async(e) => {
    setActiveClass(e.target.id);
    console.log(e.target.value,"value");
    setLeverage(e.target.value)
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
    setAmount(e.target.value)
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
      }else if(Amount === "" || Amount == "0" ){
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
         icon:"",

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
      const usdtBalance = parseFloat(balance?.find(item => item.symbol === "USDT")?.balance || 0);

      // Check if the balance is sufficient
      if (usdtBalance < parseFloat(total)) {
        toast.error("Insufficient USDT balance. Please deposit funds.", {
          // ... (toast configuration)
          style: {
            padding: "1rem",
            fontSize: "15px",
            color: "red",
            fontWeight: "bold",
          },
          className: "",
        });
    }
    else {
      setload(false)
      if(user.trader_type === "user"){
        const pair12 = pair.split('-')[1]
        const  da = {
          instId: pair,
          tdMode : index,
          ccy : pair12,
          tag : "mk1",
          side : "buy",
          orderType : ordertype,
          sz : Math.round( Amount * usdtBalance / 100),
          px : market,
          trade_at : "Margin",
          lever : leverage,
          market:{market}
        }
         const { data } = await Axios.post(`/trade/userTrade`, da , {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          }
        })
        if(data){
          setload(true)
        toast.success(data.message, {
             
          duration: 5000,
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
      }else{
        setload(true)
        toast.success("Something Went Wrong", {
             
          duration: 5000,
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
      }else{
        const pair12 = pair.split('-')[1] 
        const  da = {
          instId: pair,
          tdMode : index,
          ccy : pair12,
          tag : "mk1",
          side : "buy",
          orderType : ordertype,
          sz : Math.round( Amount * usdtBalance / 100),
          px : market,
          trade_at : "Margin",
          lever : leverage,
          market:{market}
        }
         const { data } = await Axios.post(`/trade/CreateTrade`, da , {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          }
        })
        if(data){
          setload(true)
        toast.success(data.message, {
             
          duration: 5000,
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
      }else{
        setload(true)
        toast.error("Something Went Wrong", {
          
             
            duration: 5000,
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
           icon:"",
  
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
    } 

}catch (error) {
      setload(!false)
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
      } else {
      toast.error(error.response.data.message, {
           
          duration: 5000,
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
         icon:"",

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
      <Stack direction="column" spacing={10}>

      {/* <div className="price-limit-spot">
      <label className="form-label-style">Price ({pair ? pair.split('-')[1] : "USD"})</label>
      <div className="">
        <TextField
          type={"text"}
          id="outlined-basic"
          variant="outlined"
          value={selected.price}
        />
      </div>
      </div> */}

      <div className="amount-limit-spot">
      <label className="form-label-style">Amount ({pair ? pair.split('-')[0] : "USD"})</label>
      <div className="">
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            type={"text"}
            value={value ? `${value}%` : '0%'}
            inputRef={Amountref}
            onChange={Amountupdate}
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
        </div>
      </div>

      </Stack>

      <div style={{"width":"98%"}}>
     <ThumbSlider
        aria-label="Temperature"
        defaultValue={0}
       value={value}
       onChange={(e)=> handleonChange(e)}
        valueLabelDisplay="auto"
        marks={true}
        step={25}
        min={0}
        max={100}
        ValueLabelComponent={ValueLabelComponent}
      />
     </div>

     <Stack className="percentage-button-row">
        <Button key={1} className={activeClass === "1" ? "active-select" : "non-active"} id={"1"} value="2" onClick={(value) => percentageValue(value)}>2%</Button>
        <Button key={2} className={activeClass === "2" ? "active-select" : "non-active"} id={"2"} value="5" onClick={(value) => percentageValue(value)}>5%</Button>
        <Button key={3} className={activeClass === "3" ? "active-select" : "non-active"} id={"3"} value="8" onClick={(value) => percentageValue(value)}>8%</Button>
        <Button key={4} className={activeClass === "4" ? "active-select" : "non-active"} id={"4"} value="10" onClick={(value) => percentageValue(value)}>10%</Button>
        </Stack>

      <div>
        {/* <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
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
        </FormControl> */}
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

<div className="available-max-block available-max-buy">
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
                        {/* {balance.find((item) => item.symbol === pair.split("-")[0])
                          .balance}{" "} */}
                         0.000000 {pair.split("-")[0]} 
                      </div>
                    )}
          </div>
          </div>
          <div className="available-max-block-right"><SwapHorizIcon/></div>
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
          Buy {selected ? selected?.pair.split('-')[0] : ""}
        </Button>
      </div>
    </div>
    </>
  );
};

export default BuyForminnermarket;
