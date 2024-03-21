import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { BorderBottom } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";
import Consts from "../../Constansts";

import coinone from "../../images/coin-1.png";
import cointwo from "../../images/coin-2.png";
import cointhree from "../../images/coin-3.png";
import coinfour from "../../images/coin-4.png";
import coinfive from "../../images/coin-5.png";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  walletbodycls: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
  walletbalancecls: {

    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
  tradeviewinner: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
  walletcls: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
  table: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    color: "#fff !important",
  },
  tablebody: {
    color: "#fff !important",
  },
});

// sx={{ minWidth: 650 }}
export default function WalletTable() {
  const classes = useStyles();
  const [coinsList, setCoinsList] = useState();
  const [load, setLoad] = useState(true);
  const [time, setTime] = useState(true);
  const history = useLocation();
  const [depositShow,setDepositShow] =useState(false)
  const [kycsubmit, setkycsubmit] = useState(false);
  const navigate = useNavigate();




  const coinfinding = async () => {
    if (localStorage.getItem("Mellifluous")) {
      await Axios.get(`${Consts.BackendUrl}/wallet/getWalletById`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          console.log(res,"resonanxe")
          setCoinsList(res?.data?.result);
          setLoad(false);
        })
        .catch((err) => {
          setLoad(false);
        });
    }
  };

  useEffect(() => {
    coinfinding();
  }, [time]);

  setInterval(() => {
    setTime(!time)
  }, 60000)

  const handleDepositClick = (row) => {
    if (!depositShow && !kycsubmit) {
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
    }else if(!depositShow && kycsubmit){
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
  }else {
    navigate(`${Consts.route}/wallet-deposit`,{state: row})
    }


    
}
const handleWithdrawClick = (row) => {
  if (!depositShow && !kycsubmit) {
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
  }else if(!depositShow && kycsubmit){
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
}else {
  navigate(`${Consts.route}/wallet-withdraw`,{state:row})
  }


  
}
const handleTransferClick = () => {
  if (!depositShow && !kycsubmit) {
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
  }else if(!depositShow && kycsubmit){
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
}else {
  navigate(`${Consts.route}/transfer`)
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
        console.log(res?.data?.message,"resessss")
        setkycsubmit(res?.data?.success);
      })
      .catch((err) => {
        setkycsubmit(err?.data?.success);
      });

    Axios.get(`${Consts.BackendUrl}/users/kycVerify`, {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      },
    })
      .then((res) => {
        console.log(res,"resgfgfgf")
        setDepositShow(res?.data?.success);
      })
      .catch((err) => console.log(err.response));
  } catch (error) {
    console.log("🚀 ~ file: MasterTraderTab.js:248 ~ useEffect ~ error:", error)

  }

}, []);


  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table aria-label="simple table" id="common-color-white">
        <TableHead className={classes.tableheader}>
          <TableRow>
            <TableCell style={{textAlign: "center"}}>Coin</TableCell>
            <TableCell style={{textAlign: "center"}} align="start">Balance</TableCell>
            <TableCell style={{textAlign: "center"}} align="start">Frozen Balance</TableCell>
            {/* <TableCell align="start">Margin Sell</TableCell> */}
            <TableCell style={{textAlign: "center"}} align="start">Margin Balance</TableCell>
            <TableCell style={{textAlign: "center"}} align="right">Action</TableCell>
          </TableRow>
        </TableHead>

        {coinsList?.length > 0 && (

          <TableBody className={classes.tablebody}>
            
            {coinsList?.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  color: "red !important",
                }}
                
              >
                              {console.log(row.symbol,"roesssss")}

                <TableCell align="center" scope="row" className="pair-coin">
                  <div className="pair-coin-coins" style={{ color: "white" }}>
                    <div className="coinimg">
                      <img src={row?.asset_id?.image} alt="coin-img" />
                    </div>
                    {row?.asset_id?.symbol}{" "} 
                  </div>
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                  {Number(row?.balance).toFixed(6).toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  <span
                    style={
                      row?.escrow_balance < 0
                        ? { color: "#F44D4D !important" }
                        : { color: "#00B881 !important" }
                    }
                  >
                    {Number(row?.escrow_balance).toFixed(6).toLocaleString()}
                  </span>
                </TableCell>
                {/* <TableCell align="left" style={{ color: "red !important" }}>
                  
                  {row?.max_loan.length > 0 ? <span> {Number(row?.max_loan[0].maxLoan).toFixed(6).toLocaleString()} </span>  :"0"}
                  </TableCell> */}

                <TableCell align="center" style={{ color: "red !important" }}>

                  {row?.margin_loan ? <span> {Number(row?.margin_loan).toFixed(6).toLocaleString()} </span> : "0"}
                </TableCell>

                <TableCell>
                  <Stack spacing={2} direction="row" justifyContent='center'>
                    {console.log(row,"gsfdgf")}
                    <div state={row}>
                      {" "}
                      <Button className="Deposit" variant="contained" onClick={()=>{handleDepositClick(row.symbol)}} >
                        Deposit
                      </Button>
                    </div>
                    <div state={row}>
                      {" "}
                      <Button className="Withdraw" variant="contained" onClick={()=>{handleWithdrawClick(row.symbol)}} >
                        Withdraw
                      </Button>
                    </div>
                    <div state={row}>
                      {" "}
                      <Button className="Trade" variant="contained" onClick={()=>{handleTransferClick()}} >
                        Transfer
                      </Button>
                    </div>
                    <Link to="/spot">
                      <Button className="Trade" variant="contained">
                        Trade
                      </Button>
                    </Link>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      {load && (
        <div
          style={{ textAlign: "center", padding: "2rem", marginTop: "3rem" }}
        >
          {" "}
          <CircularProgress size={50} />
          <h5 style={{ color: "white" }}>Loading..</h5>
        </div>
      )}
      {!coinsList && !load && (
        <div style={{ backgroundColor: "lightgrey", borderRadius: "10px" }}>
          <h5 style={{ color: "black", padding: "1rem" }}>Data Not Found</h5>
        </div>
      )}
    </TableContainer>
  );
}
