import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import { json, useNavigate } from "react-router-dom";
import AppsIcon from "@mui/icons-material/Apps";
import { styled } from "@mui/material/styles";
import QR_Code from '../../images/QR_Code.png'
import Constant from "../../Constansts";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles, withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import circledoublecolor from "../../images/circle-double-color.png";
import graphcopytrade from "../../images/graph-copy-trade.png";
import tetherseeklogo from "../../images/tether-seeklogo.png";
import AllMasterTrade from "./AllMasterTrade";
import Axios from "../../Axios";
import Consts from "../../Constansts";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";

import "./CopyTrade.css";
import nextarrow from "../../images/Next-arrow.svg";
import Classstyle from "./MasterTrader.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { toast, Toaster, ToastBar } from "react-hot-toast";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const WhiteCheckbox = withStyles({
  root: {
    color: '#fff', // White border color when the checkbox is not checked
    '&$checked': {
      color: '#fff', // White border color when the checkbox is checked
    },
  },
  checked: {}, // Empty object to match the 'checked' class
})(Checkbox);
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  copytradetabsinner: {
    "& button": {
      textTransform: "capitalize !important",
      color: "#fff !important",
      fontWeight: 600,
      fontSize: "20px !important",
    },
  },
  copytradesearch: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "10px",
    "& button": {
      height: "44px",
      textTransform: "capitalize !important",
      backgroundColor: "#25DEB0 !important",
    },
  },
  dashboarbodycls: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
  dashboarbalancecls: {
    background:
      "radial-gradient(35.18% 134.17% at 50% 50%, rgba(41, 197, 161, 0.2) 0%, rgba(28, 112, 99, 0.2) 100%) !important",
    border: "0.926846px solid #25DEB0 !important",
    backdropFilter: "blur(1.85369px) !important",
    borderRadius: "30px !important",
    padding: "20px 23px !important",
  },
  blockwidthcmn: {
    maxWidth: "23% !important",
    margin: "40px 0 !important",
    "@media (max-width: 767.98px)": {
      maxWidth: "100% !important",
      margin: "15px 0 !important",
    },
    "@media (min-width: 768px) and (max-width: 991.98px)": {
      maxWidth: "48% !important",
      margin: "15px 0 !important",
    },
  },
  tradeviewinner: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
  addaccount: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    border: "none !important",
    padding: "60px 0 0 0 !important",
    display: "flex",
    justifyContent: "end",
  },
  accpopuptitle: {
    background: "#8D7F1D !important",
    borderRadius: "15px !important",
  },
  accpopuppara: {
    background: "#131A26 !important",
    borderRadius: "15px !important",
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function createData(heading, percentage, rating, risk, type, tether, _id) {
  return { heading, percentage, rating, risk, type, tether, _id };
}

let rows = [];

export default function MasterTraderTab() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [masters, setMasters] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [Wallet, setWallet] = React.useState(false);
  const [masterList, setMasterList] = React.useState();
  const [mysublist, setmysublist] = React.useState([]);
  const [kycsubmit, setkycsubmit] = React.useState(false);
  const [copytradeShow, setcopytradeShow] = React.useState(false);
  const [searchName, setSearchname] = React.useState()
  const [imperailbox, setimperailbox] = React.useState(false);
  const [binancebox, setbinancebox] = React.useState(false);
  const [okxbox, setokxbox] = React.useState(false);
  const [subadscribeShow,setSubscribeShow] = React.useState(false);

  console.log(imperailbox,
    binancebox,
    okxbox)

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
          setcopytradeShow(true);
          setSubscribeShow(true)
        })
        .catch((err) => console.log(err.response));
    } catch (error) {
      console.log("🚀 ~ file: MasterTraderTab.js:248 ~ useEffect ~ error:", error)

    }

  }, []);

  const [age, setAge] = React.useState("");

  const handleChange12 = (event) => {
    setAge(event.target.value);
  };
  const navigate = useNavigate();
  React.useEffect(() => {
    Axios.get(`${Consts.BackendUrl}/wallet/getWalletById`, {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      },
    })
      .then((res) => {
        setWallet(true);
      })
      .catch((err) => {
        setWallet(false);
      });
  }, []);
  const [hide, sethide] = React.useState(false);
  let User = JSON.parse(localStorage.getItem("users"));

  const requestexist = () => {
    if (User.trader_type == "master") {
      sethide(true);
    } else {
      Axios.get(`${Consts.BackendUrl}/users/getMasterRequestsUser`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          sethide(true);
        })
        .catch((err) => {
          console.log(err, "open errort");
        });
    }
  };

  React.useEffect(() => {
    requestexist();
    Axios.get(`${Consts.BackendUrl}/trade/getMysubscription`, {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      },
    })
      .then((res) => {
        if (res.data.success) {
          res.data.result[0].follower_user_id.map((item, index) => {
            setmysublist((prev) => [...prev, item.follower_id]);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    rows = [];
    getUsers()
  }, []);
  const getUsers = async () => {
    rows = [];
    await Axios.post(`${Consts.BackendUrl}/users/getMastersbyQuery`, {}, {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      },
    }).then((res) => {
      if (res?.data?.success) {
        console.log("data", res.data.result)
        setMasters(res.data.result);

        res?.data?.result.map((item, index) => {
          rows.push(
            createData(
              item.master.name,
              item.tradeList,
              6.4,
              7.2,
              "USDT",
              tetherseeklogo,
              { item }
            )
          );
        });
      }
      setLoading(false);
    });
  }

  const getUser = async (name) => {
    rows = [];
    await Axios.post(`${Consts.BackendUrl}/users/getMastersbyQuery`,
      {
        name: name
      }, {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      },
    }).then((res) => {
      if (res?.data?.success) {
        setMasters(res.data.result);
        console.log("data", res.data.result)
        res?.data?.result.map((item, index) => {
          rows.push(
            createData(
              item.master.name,
              item.tradeList,
              6.4,
              7.2,
              "USDT",
              tetherseeklogo,
              { item }
            )
          );
        });
        console.log("datas", rows)
      }
      setLoading(false);
    });
  }
  const onNamechange = (value) => {

    if (!value) {
      console.log("no value")
      getUsers()
    }
    else {
      console.log("Change Name", value)
      getUser(value)
    }
  }


  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [openss, setOpenss] = useState(false);
  const [opensss, setOpensss] = useState(false);

  const [exchange, setexchange] = useState();
  const [follower_user_id, setfollower_user_id] = useState();
  const [apikey, setapikey] = useState();
  const [secretkey, setsecretkey] = useState();
  const [api_name, setapi_name] = useState();
  const [permission, setpermission] = useState();
  const [amount, setamount] = useState();
  const [passphrase, setpassphrase] = useState();
  const [exchangeerr, setexchangeerr] = useState();
  const [follower_user_iderr, setfollower_user_iderr] = useState();
  const [apikeyerr, setapikeyerr] = useState();
  const [secretkeyerr, setsecretkeyerr] = useState();
  const [api_nameerr, setapi_nameerr] = useState();
  const [permissionerr, setpermissionerr] = useState();
  const [amounterr, setamounterr] = useState();
  const [passphraseerr, setpassphraseerr] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpens = () => {
    //validation

    if (!exchange) {
      setexchangeerr("* Exchange Required");
    } else if (!apikey) {
      setapikeyerr("* Apikey Required");
    } else if (!secretkey) {
      setsecretkeyerr("* SecretKey Required");
    } else if (!passphrase) {
      setpassphraseerr("* Passphrase Required");
    } else if (!api_name) {
      setapi_nameerr("* Api_name Required");
    } else if (!permission) {
      setpermissionerr("* Permission Required");
    } else {
      setOpens(true);
      setOpen(false);
    }
  };
  const handleCloses = () => setOpens(false);

  const checkCopytrade = (data) => {
    // const kycstatus = localStorage.getItem('kyc_verify')
    if (!subadscribeShow && !kycsubmit) {
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

    }else if(!subadscribeShow && kycsubmit){
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
    } else {
      Axios.get(`${Consts.BackendUrl}/trade/CheckTradeDetail`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          handleOpen();
          setfollower_user_id(data);
        })
        .catch((err) => {
          navigate("/Subscription", {
            state: {
              page: "exchange",
              message: "Please Subscribe to trade",
            },
          });
        });

    }
  };

  const handleClosess = () => setOpenss(false);
  const onPay = () => {

    if (!amount) {
      setamounterr("* Amount Required");
    } else if (amount <= 0) {
      setamounterr("* Amount must be valid");
    } else {
      const data = {
        follower_id: follower_user_id,
        amount: amount,
      };

      Axios.post(`${Consts.BackendUrl}/trade/addsubscriber`, data, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          if (res.data.success) {
            setWallet(true);
            toast.success(`${res.data.message}`, {

              duration: 3000,
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
            setTimeout(() => {
              // handleClose();
              // handleCloses();
              window.location.reload();
            }, 1500);
          } else {
            toast.error(`${res.data.message}`, {

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
            // setTimeout(()=>{
            //   handleClose()
            //   handleCloses()
            //     },1500)
          }
        })
        .catch((err) => console.log(err, "err"));

      setexchange("");
      setapikey("");
      setsecretkey("");
      setapi_name("");
      setpermission("");
      setamount("");
      setpassphrase("");
    }
  };

  const handleOpensss = () => {
    setOpensss(true);
    setOpenss(false);
  };
  const handleClosesss = () => setOpensss(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    //  setExpanded(isExpanded ? panel : false);
  };

  const myStyle = {
    color: "red !important",
  };

  const axioscall = () => {
    if (!copytradeShow && !kycsubmit) {
      toast.error(`Please submit kyc to get master request`, {
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
    } else if (!copytradeShow && kycsubmit) {
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
    } else if ((copytradeShow && !kycsubmit) || (copytradeShow && kycsubmit)) {
      Axios.get(`${Consts.BackendUrl}/users/mademasterRequest`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          toast.success(`${res?.data.message}`, {
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
          setTimeout(() => { }, 2000);
        })
        .catch((err) => {
          toast.error(`${err.response.data.message}`, {
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
        });
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <Toaster />

        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={0} className="copytrade-contain">
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                className={classes.copytradetabs}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="icon position tabs example"
                  className={classes.copytradetabsinner}
                  id="copy-trade-tabs-inner"
                >
                  <Tab
                    {...a11yProps(0)}
                    icon={<LocalFireDepartmentIcon />}
                    iconPosition="start"
                    label="Top Master Traders"
                  />
                  <Tab
                    {...a11yProps(1)}
                    icon={<AppsIcon />}
                    iconPosition="start"
                    label="All Master Traders"
                  />
                </Tabs>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                className={classes.copytradesearch}
                id="copytradesearch"
              >
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 400,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ "aria-label": "search google maps" }}
                    onChange={(e) => { onNamechange(e.target.value); setSearchname(e.target.value) }}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>

                {User.trader_type != "master" ? (
                  !hide ? (
                    <Button onClick={axioscall} variant="contained">
                      Join as a Trader
                    </Button>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </Grid>
            </Grid>

            <Grid
              container
              spacing={0}
              className="copytrade-contain-tab-content"
            >
              <TabPanel
                value={value}
                index={0}
                className="all-master-trade-table"
              >
                <Grid container spacing={0} className="copytrade-contain-inner">
                  {!loading &&
                    rows.length > 0 &&
                    rows.map((row) => (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={rows.length > 1 ? 4 : 8}
                        xl={rows.length > 1 ? 4 : 8}
                        className={classes.copytradeblock}
                      >
                        <div className="outer-copy-trade">
                          <div className="copy-trade-row-1">
                            <span className="heading-ct">{row.heading}</span>
                            <div className="heading-ct-img">
                              <img
                                src={circledoublecolor}
                                alt="circle-double-color"
                              />
                            </div>
                          </div>
                          <div className="copy-trade-row-2">
                            <div className="total-profit">
                              <div className="total-profit-top">
                                <span>trade list</span>
                              </div>
                              <div className="total-profit-bottom">
                                {row.percentage}
                              </div>
                            </div>
                            <div className="total-profit-chart">
                              <img
                                src={graphcopytrade}
                                alt="graph-copy-trade"
                              />
                            </div>
                          </div>
                          <div className="copy-trade-row-3">
                            <div className="copy-trade-row-3-col-1">
                              <label>exchange</label>
                              <span>
                                <img
                                  src={circledoublecolor}
                                  alt="circle-double-color"
                                />
                                bybit
                              </span>
                            </div>
                            <div className="copy-trade-row-3-col-2">
                              <label>base coin</label>
                              <span>
                                <img src={row.tether} alt="tether" />
                                {row.type}
                              </span>
                            </div>
                            <div className="copy-trade-row-3-col-3">
                              <label>rating</label>
                              <span className="yellow">{row.rating}</span>
                            </div>
                            <div className="copy-trade-row-3-col-4">
                              <label>risk</label>
                              <span>{row.risk}</span>
                            </div>
                            <div className="copy-trade-row-3-col-5">
                              <label>type</label>
                              <span>{row.type}</span>
                            </div>
                          </div>

                          <div className="twobuttons">
                            {/* {!Wallet && */}
                            {/* {row._id.item.user._id !== User._id?  !mysublist.includes(row._id.item.user._id) } */}
                            {
                              User.trader_type !== 'master' ?
                                (row._id.item.master._id != User._id ? (
                                  mysublist.length > 0 ? (
                                    !mysublist.includes(row._id.item.master._id) ? (
                                      <Button
                                        className="LocalFireDepartmentIcon-full"
                                        id="innerButton"
                                        variant="outlined"
                                        onClick={() => {
                                          checkCopytrade(row._id.item.master._id);
                                        }}
                                        startIcon={<LocalFireDepartmentIcon />}
                                      >
                                        {" "}
                                        Subscribe
                                      </Button>
                                    ) : null
                                  ) : (
                                    <Button
                                      className="LocalFireDepartmentIcon-full"
                                      id="innerButton"
                                      variant="outlined"
                                      onClick={() => {
                                        checkCopytrade(row._id.item.master._id);
                                      }}
                                      startIcon={<LocalFireDepartmentIcon />}
                                    >
                                      {" "}
                                      Subscribe
                                    </Button>
                                  )
                                ) : null) : null}

                            <Button
                              className="LocalFireDepartmentIcon-full"
                              variant="outlined"
                              id="innerButton"
                              onClick={() => {
                                navigate(
                                  `/trader-details/${row?._id?.item?.master?._id}`
                                );
                              }}
                              startIcon={<LocalFireDepartmentIcon />}
                            >
                              {" "}
                              Detail
                            </Button>
                          </div>
                        </div>

                        {open && (
                          <Modal
                            open={open}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            className="account-qr-code-pop-up-modal"
                          >
                            <Box id="account-qr-code-pop-up-modal-id" sx={style} className={Classstyle.modal}>
                              <Grid container spacing={0}>
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                >
                                  <Item className={classes.dashboarbodycls}>
                                    <div className={classes.fixedIcon}>
                                      <div className="heading-account acc">
                                        <CloseIcon
                                          onClick={() => {
                                            handleClose();
                                          }}
                                        />
                                      </div>
                                    </div>

                                    <Grid
                                      container
                                      spacing={0}
                                      style={{ "justify-content": "center" }}
                                      className="inner-popup"
                                    >
                                      <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={6}
                                        xl={6}
                                      >
                                        <Grid
                                          container="container"
                                          spacing={0}
                                          className="inner-popup leftside-binace"
                                        >
                                          <div className="sub-head">
                                            <h4>Account</h4>
                                            <p>9.99000999</p>
                                          </div>
                                        </Grid>
                                      </Grid>

                                      <Grid
                                        item="item"
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={6}
                                        xl={6}
                                        className="rightside-binace"
                                      >
                                        <Grid
                                          container="container"
                                          spacing={0}
                                          className="inner-popup "
                                        >
                                          <Grid
                                            item="item"
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                          >
                                            <Item
                                              className={
                                                classes.dashboarbodycls
                                              }
                                            >
                                              <div className="text-binance">
                                                <p>QR Code</p>
                                                <div className="QR_Code-code"><img src={QR_Code} alt="QR_Code" /></div>
                                              </div>
                                            </Item>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>

                                    <Grid
                                      container
                                      spacing={0}
                                      className="inner-popup"
                                    >
                                      <Grid
                                        item="item"
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        xl={12}
                                      >

                                        {/* <div className="FORMGROUP">
  <h5>Which you want to subscribe with this master</h5>
  <div style={{textAlign:"start"}}>
      <p><input onClick={()=>{setimperailbox(!imperailbox)}} type="checkbox" class="custom-checkbox" checked={imperailbox}/>  Imperial</p>
      <p><input onClick={()=>{setbinancebox(!binancebox)}} type="checkbox" class="custom-checkbox" checked={binancebox} />  Binance</p>
      <p><input onClick={()=>{setokxbox(!okxbox)}} type="checkbox" class="custom-checkbox" checked={okxbox} />  Okx </p>
      </div>
    </div> */}
                                        <div className="formtxt formtxt-textfield">
                                          <TextField
                                            id="outlined-multiline-static"
                                            label="Amount"
                                            name="amount"
                                            value={amount}
                                            type={"number"}
                                            className="text-field"
                                            onChange={(e) => {
                                              setamounterr("");
                                              setamount(e.target.value);
                                            }}
                                          />
                                          {amounterr && (
                                            <p
                                              style={{
                                                padding: ".5rem",
                                                color: "#f85656",
                                                textAlign: "center",
                                              }}
                                            >
                                              {amounterr}
                                            </p>
                                          )}
                                        </div>

                                        <div className="bck-btn">
                                          <Button
                                            className="welcome-btn open"
                                            onClick={() => {
                                              onPay();
                                            }}
                                          >
                                            Pay
                                            <img src={nextarrow} alt="user" />
                                          </Button>
                                        </div>
                                      </Grid>
                                    </Grid>
                                  </Item>
                                </Grid>
                              </Grid>
                            </Box>
                          </Modal>
                        )}
                      </Grid>
                    ))}
                </Grid>
                {!loading && rows.length <= 0 && (
                  <div style={{ padding: "1rem", color: "#25DEB0" }}>
                    <h4 style={{ width: "70%", marginLeft: "29%" }}>
                      Data not found
                    </h4>
                  </div>
                )}
                {loading && (
                  <div style={{ padding: "2rem" }}>
                    <div style={{ width: "70%", marginLeft: "29%" }}>
                      <CircularProgress size={60} />
                    </div>
                  </div>
                )}

                <Grid container spacing={0} className="copytrade-contain-inner">
                  <h3 className="Top-Traders-copy-trade">Top Traders</h3>
                  {!loading &&
                    rows.length > 0 &&
                    rows.map((row) => (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={rows.length > 1 ? 4 : 8}
                        xl={rows.length > 1 ? 4 : 8}
                        className={classes.copytradeblock}
                      >
                        <div className="outer-copy-trade">
                          <div className="copy-trade-row-1">
                            <span className="heading-ct">{row.heading}</span>
                            <div className="heading-ct-img">
                              <img
                                src={circledoublecolor}
                                alt="circle-double-color"
                              />
                            </div>
                          </div>
                          <div className="copy-trade-row-2">
                            <div className="total-profit">
                              <div className="total-profit-top">
                                <span>trade list</span>
                              </div>
                              <div className="total-profit-bottom">
                                {row.percentage}
                              </div>
                            </div>
                            <div className="total-profit-chart">
                              <img
                                src={graphcopytrade}
                                alt="graph-copy-trade"
                              />
                            </div>
                          </div>
                          <div className="copy-trade-row-3">
                            <div className="copy-trade-row-3-col-1">
                              <label>exchange</label>
                              <span>
                                <img
                                  src={circledoublecolor}
                                  alt="circle-double-color"
                                />
                                bybit
                              </span>
                            </div>
                            <div className="copy-trade-row-3-col-2">
                              <label>base coin</label>
                              <span>
                                <img src={row.tether} alt="tether" />
                                {row.type}
                              </span>
                            </div>
                            <div className="copy-trade-row-3-col-3">
                              <label>rating</label>
                              <span className="yellow">{row.rating}</span>
                            </div>
                            <div className="copy-trade-row-3-col-4">
                              <label>risk</label>
                              <span>{row.risk}</span>
                            </div>
                            <div className="copy-trade-row-3-col-5">
                              <label>type</label>
                              <span>{row.type}</span>
                            </div>
                          </div>

                          <div className="twobuttons">
                            {/* {!Wallet && */}
                            {/* {row._id.item.user._id !== User._id?  !mysublist.includes(row._id.item.user._id) } */}
                            {row._id.item.master._id != User._id ? (
                              mysublist.length > 0 ? (
                                !mysublist.includes(row._id.item.master._id) ? (
                                  <Button
                                    className="LocalFireDepartmentIcon-full"
                                    id="innerButton"
                                    variant="outlined"
                                    onClick={() => {
                                      checkCopytrade(row._id.item.master._id);
                                    }}
                                    startIcon={<LocalFireDepartmentIcon />}
                                  >
                                    {" "}
                                    Subscribe
                                  </Button>
                                ) : null
                              ) : (
                                <Button
                                  className="LocalFireDepartmentIcon-full"
                                  id="innerButton"
                                  variant="outlined"
                                  onClick={() => {
                                    checkCopytrade(row._id.item.master._id);
                                  }}
                                  startIcon={<LocalFireDepartmentIcon />}
                                >
                                  {" "}
                                  Subscribe
                                </Button>
                              )
                            ) : null}

                            <Button
                              className="LocalFireDepartmentIcon-full"
                              variant="outlined"
                              id="innerButton"
                              onClick={() => {
                                navigate(
                                  `/trader-details/${row?._id?.item?.master?._id}`
                                );
                              }}
                              startIcon={<LocalFireDepartmentIcon />}
                            >
                              {" "}
                              Detail
                            </Button>
                          </div>
                        </div>
                      </Grid>
                    ))}
                </Grid>
                {!loading && rows.length <= 0 && (
                  <div style={{ padding: "1rem", color: "#25DEB0" }}>
                    <h4 style={{ width: "70%", marginLeft: "29%" }}>
                      Data not found
                    </h4>
                  </div>
                )}
                {loading && (
                  <div style={{ padding: "2rem" }}>
                    <div style={{ width: "70%", marginLeft: "29%" }}>
                      <CircularProgress size={60} />
                    </div>
                  </div>
                )}
              </TabPanel>

              <TabPanel
                value={value}
                index={1}
                className="all-master-trade-table"
              >
                <AllMasterTrade searchName={searchName} />
              </TabPanel>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
