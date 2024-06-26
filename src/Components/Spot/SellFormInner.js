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

const SellFormInner = ({ selected, pair ,index}) => {
  const user = JSON.parse(window.localStorage.getItem("users"))
  const [price, setPrice] = React.useState();
  const [Amount, setAmount] = React.useState(); 
  const [total, settotal] = React.useState();

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
  }, [selected.price]);

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
    
    setAmount(Amountref.current.value)
    settotal(selected.price*Amountref.current.value)
    
  };
  const totalupdate = (event) => {
    const newValue = Math.max(0, Number(event.target.value));
    settotal(newValue)
  };


  const [load,setload] = useState(true)

  useEffect(() => {
    if (pair !== "") {
      setPrice("")
      setAmount("")
      settotal("")
    }
  }, [pair])

  const buytrade = async () => {
    try {
      if(price === ""){
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
    } else if(Amount === ""){
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
    else {
      setload(false)
      if(user.trader_type === "user"){
        const pair12 = pair.split('-')[1]
      const  da = {
        instId: pair,
        tdMode : "cash",
        ccy : pair12,
        tag : "mk1",
        side : "sell",
        orderType : index,
        sz : Amount,
        px : price,
        trade_at : "spot",
        lever: "0"
      }
       const { data } = await Axios.post(`/trade/userTrade`, da , {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        }
      })
      if(data){
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
      window.location.reload();
      setAmount("")
    }else{
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
      }else{
        const pair12 = pair.split('-')[1]
      const  da = {
        instId: pair,
        tdMode : "cash",
        ccy : pair12,
        tag : "mk1",
        side : "sell",
        orderType : index,
        sz : Amount,
        px : price,
        trade_at : "spot",
        lever: "0"
      }
       const { data } = await Axios.post(`/trade/CreateTrade`, da , {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        }
      })
      if(data){
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
    }else{
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
      toast.error(error.response.data.message, {
           
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
          InputProps={{ inputProps: { min: "0" } }}
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
            InputProps={{ inputProps: { min: "0" } }}
            inputRef={Amountref}
            // onChange={Amountupdate}
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

        {/* <Slider defaultValue={0} min={0} step={25} max={100} graduated /> */}
      </div>
      <div>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <OutlinedInput
            value={total}
            type={"number"}
            InputProps={{ inputProps: { min: "0" } }}
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

export default SellFormInner;
