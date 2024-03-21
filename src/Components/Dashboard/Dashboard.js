import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { json, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import DasboardBody from "./DasboardBody";
import Consts from "../../Constansts";
import Axios from "../../Axios";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
  sidebarcls: {
    background: "#010712 !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    overflow: "hidden",
    position: 'sticky !important',
    top: '0px',
    padding: '0px !important',
    height: '100vh'
  },
  headercls: {
    background: "#131a26 !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    padding: "20px 55px !important",
    "& form": {
      padding: "0px !important",
      "@media (max-width: 767.98px)": {
        width: "100%",
      },
      "& button": {
        background: "#25DEB0",
        borderRadius: "0px 5px 5px 0px",
      },
    },
    "@media (max-width: 767.98px)": {
      padding: "20px !important",
    },
  },
});

const Dashboard = ({ data, setSideBarShow, sideBarShow, openSideBar, setOpenSideBar }) => {
  const [btc, setBtc] = useState();
  const [eth, setEth] = useState();
  const [xpr, setxrp] = useState();
  const [dash, setdash] = useState();
  const [btc1, setBtc1] = useState();
  const [eth1, setEth1] = useState();
  const [xpr1, setxrp1] = useState();
  const [ltc, setLtc] = useState();
  const [totalBalance, setTotalBalance] = useState();
  const history = useLocation();

  const navigate = useNavigate();

  const classes = useStyles();
  const ws = new WebSocket("wss://ws.okex.com:8443/ws/v5/public?brokerId=197");
  const datas = {
    op: "subscribe",
    args: [
      {
        channel: "index-tickers",
        instId: "BTC-USDT",
      },
      {
        channel: "index-tickers",
        instId: "ETH-USDT",
      },
      {
        channel: "index-tickers",
        instId: "XRP-USDT",
      },
      {
        channel: "index-tickers",
        instId: "LTC-USDT",
      },
    ],
  };

  const Ticker = () => {
    ws.onopen = (event) => {
      ws.send(JSON.stringify(datas));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      try {
        if (response?.arg?.instId == "BTC-USDT") {

          setBtc(response?.data[0]);
        } else if (response?.arg?.instId == "ETH-USDT") {
          setEth(response?.data[0]);
        } else if (response?.arg?.instId == "XRP-USDT") {
          setxrp(response?.data[0]);
        } else if (response?.arg?.instId == "LTC-USDT") {
          setdash(response?.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("Mellifluous")
    if (token != undefined) {
      getMydetail()
    }
  }, [])

  useEffect(() => {
    Ticker();

    return () => {
      ws.close(); // Close the WebSocket connection on unmount
    };
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
            setTotalBalance(res?.data?.total_price_in_usd)
            // console.log(res.data.total_price_in_usd,'rewrfedferwv');
            const walbal = res?.data?.result
            for (var i = 0; i < walbal.length; i++) {
              if (walbal[i].symbol === "BTC") {
                setBtc1(walbal[i].balance)
              }

              if (walbal[i].symbol === "XRP") {
                setxrp1(walbal[i].balance)
              }

              if (walbal[i].symbol === "ETH") {
                setEth1(walbal[i].balance)
              }

              if (walbal[i].symbol === "LTC") {
                setLtc(walbal[i].balance)
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


  useEffect(() => {
    if (history?.state != "null") {
      if (history?.state?.page == "exchnage") {
        toast.error(`${history?.state?.message}`, {

          duration: 3000,
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
        setTimeout(() => {
          history.state.message = "";
        }, 1000);
      }
    }
  }, []);


  const getMydetail = async () => {
    try {
      await Axios.get(`${Consts.BackendUrl}/users/get_profile`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      }).then((res) => {
        if (res?.status === 200) {

          console.log(res?.data);
          if (res?.data?.isgoogle === "true" && res?.data?.issubscribed === "false") {
            navigate("/Subscription", {
              state: {
                page: "exchange",
                message: "Please Subscribe to trade",
              },
            })
          }

        }


      })
    } catch (error) {

    }

  }



  return (
    <div>
      <Toaster />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          {/* <Grid item xs={12} sm={12} md={12} lg={2} xl={2}> */}
          <Item className={classes.sidebarcls}>
            <Sidebar
              sideBarShow={sideBarShow}
              setSideBarShow={setSideBarShow}
              openSideBar={openSideBar}
              setOpenSideBar={setOpenSideBar}
            />
          </Item>
          {/* </Grid> */}
          <Grid id={sideBarShow ? "z-index-prop-postve" : "z-index-prop-negtve"} item xs={12} sm={12} md={12} lg={10} xl={10}>
            <Item className={classes.headercls}>
              <Header
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
              />
              <DasboardBody btc={btc} eth={eth} dash={dash} xrp={xpr} btc1={btc1} eth1={eth1} xrp1={xpr1} ltc={ltc} totalBalance={totalBalance} />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
