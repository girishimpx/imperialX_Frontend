import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Consts from "../../Constansts";
import { Select, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./subscription.css";
import binancecoin from "../../images/binance-coin.svg";
import backarrow from "../../images/back-arrow.svg";
import nextarrow from "../../images/Next-arrow.svg";
import symbol from "../../images/symbol.svg";
import droparrow from "../../images/Droparrow.svg";
import okximage from "../../images/okximage.png";
import imperialimage from "../../images/iumperialimage.png";
import binanceImage from "../../images/binanceimage.png";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Axios from "../../Axios";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { TryOutlined } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import SubscribePage from "../subscribeFourtpage/subscribebody";
import Searchpage from "../subscribeFourtpage/subscribebody1";
import classestyle from "./subscribe.module.css";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Constant from "../../Constansts";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Subscribebody from "../subscribeFourtpage/subscribebody";
import { useLocation } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  tableContainer: {
    background: "transparent !important",
    marginTop: "6%",
    // border: "1px solid #25DEB0 !important",
  },
  tablestructre: {
    "& th": {
      color: "#FFF",
      borderBottom: "1px solid rgb(58 57 57) !important",
      whiteSpace: "nowrap",
    },
    // "& th:first-child": {
    //  width:'40% !important'
    // },
    "& td": {
      color: "#FFF",
      borderBottom: "1px solid rgb(58 57 57) !important",
      whiteSpace: "nowrap",
      "& button": {
        margin: "0px 10px !important",
      },
    },
  },
  bgwhite: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
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
    justifyContent: "space-around",
  },
  accpopuptitle: {
    background: "rgba(255, 199, 0, 0.51) !important",
    borderRadius: "15px !important",
  },
  accpopuppara: {
    background: "#131A26 !important",
    borderRadius: "15px !important",
  },
  GridPops: {
    height: "100px !important",
    //padding: "20px 15px !important",
    border: "1px solid red !important",
    backdropFilter: "blur(2px) !important",
    borderRadius: "30px !important",
    overflow: "auto",
  },
  twobuttons: {
    width: "70%",
    margin: "auto",
    display: "flex",
    justifyContent: "space-around",
  },
  boxfield: {
    padding: "0px 10px",
  },
  trades: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "white",
  }
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

const DasboardBody = ({ sideBarShow, setSideBarShow, add, getSubscription }) => {
  const classes = useStyles();
  const [adds, setadd] = useState(true);
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [openss, setOpenss] = useState(false);
  const [opensss, setOpensss] = useState(false);
  const [mylist, setMylist] = useState([]);
  const [mylist1, setMylist1] = useState();
  const [selected, setselected] = useState();
  const [selected1, setselected1] = useState();
  const [page1, setpage1] = useState(false);
  const [page2, setpage2] = useState(false);
  const [Edit, setEdit] = useState(false);
  const [wait, setWait] = useState(false);
  const [imperial, setimperial] = useState(true);
  const [binance, setbinance] = useState(true);
  const [okx, setokx] = useState(true);
  const [not, setnot] = useState(false);
  const [change, setchange] = useState(false);
  const [errs, seterrs] = useState();
  const [dense, setDense] = React.useState(false);
  const history = useLocation();
  const tokenCheck = window.localStorage.getItem("Mellifluous");
  const exchanges = [

    {
      exchange: "binance",
      logo: binanceImage,
      referel: "Yes",
      subaccount: "Yes",
      supportType: "Spot, USDⓈ-M, COIN-M",
      status: binance,
    },
    {
      exchange: "imperial",
      logo: imperialimage,
      referel: "Yes",
      subaccount: "Yes",
      supportType: "Spot, USDⓈ-M, COIN-M",
      status: imperial,
    },
    {
      exchange: "okx",
      logo: okximage,
      referel: "Yes",
      subaccount: "Yes",
      supportType: "Spot, USDⓈ-M, COIN-M",
      status: okx,
    },
  ];
  const [exchange, setexchange] = useState(selected);
  console.log(add, "page")
  const [apikey, setapikey] = useState('');
  const [trades, setTrades] = useState([])
  const [secretkey, setsecretkey] = useState('');
  const [api_name, setapi_name] = useState('');
  const [permission, setpermission] = useState('');
  // const [open, setOpen] = useState(true);
  const [amount, setamount] = useState('');
  const [passphrase, setpassphrase] = useState('');
  const [exchangeerr, setexchangeerr] = useState();

  const [img, setimg] = useState()

  const [apikeyerr, setapikeyerr] = useState();
  const [secretkeyerr, setsecretkeyerr] = useState();
  const [api_nameerr, setapi_nameerr] = useState();
  const [permissionerr, setpermissionerr] = useState();
  const [where, setwhere] = useState();

  //const [errs, seterrs] = useState();
  const [passphraseerr, setpassphraseerr] = useState();
  const navigate = useNavigate();
  //const [wait, setWait] = useState(false);
  const [spot, setspot] = useState(false);
  const [margin, setmargin] = useState(false);
  const [future, setfuture] = useState(false);
  const [userData, setUserdata] = useState({});
  var referaldeposit;
  useEffect(() => {
    console.log(selected)
    referaldeposit = window.localStorage.getItem("referaldeposit")
  }, []);

  const handleApiKeyChange = (e) => {
    console.log("asdasfd")
    const newApikey = e.target.value;
    setapikey(newApikey); // Update the apikey state with the new value
  };

  const onSubscribe = () => {
    if (!exchange) {
      setexchangeerr("* Exchange Required");
    } else if (!apikey) {
      setapikeyerr("* Apikeyasdf Required");
    } else if (!secretkey) {
      setsecretkeyerr("* SecretKey Required");
    } else if (!passphrase) {
      setpassphraseerr("* Passphrase Required");
    } else if (!api_name) {
      setapi_nameerr("* Api_name Required");
    } else if (!permission) {
      setpermissionerr("* Permission Required");
    } else if (!spot && !margin && !future) {
      setfuture("atleast any one of above sholud be checked");
    } else {
      setWait(true);
      const data = {
        exchange: exchange,
        apikey: apikey,
        secretkey: secretkey,
        api_name: api_name,
        permission: permission,
        passphrase: passphrase,
        follower_user_id: "null",
        amount: "null",
        spot,
        margin,
        future
      };

      Axios.post(`${Consts.BackendUrl}/trade/createSubscription`, data, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          if (res.data.success) {
            toast.success("Subscription added successfully", {
              duration: 1400,
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
            setTimeout(() => {
              setexchange("");
              setapikey("");
              setsecretkey("");
              setapi_name("");
              setpermission("");
              setpassphrase("");
              // window.location.href = '/';
              navigate(`/`)

              setOpen(false);
              setWait(false);
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
              setOpen(false);
              setWait(false);
            }, 1500);
          }
        })
        .catch((err) => {
          seterrs(err);
        });
    }
  };

  // const handleClose = () => {
  //   setOpen(false);
  //   setexchange("");
  //   setapikey("");
  //   setsecretkey("");
  //   setapi_name("");
  //   setpermission("");
  //   setamount("");
  //   setpassphrase("");
  // };
  const handleEdit = () => {
    setEdit(false)
  }
  const gettSelected = () => {
    setTrades([])
    getMysubscription()
  }
  const getMysubscription = () => {
    try {
      const trade = []
      Axios.get(`/trade/getMysubscription`, {
        headers: {
          Authorization: tokenCheck,
        },
      })
        .then((res) => {
          if (res.data.success) {
            res.data.result.map((item) => {
              if (item.exchange == "imperial") {
                setimperial(item.status);
              }
              if (item.exchange == "binance") {
                setbinance(item.status);
              }
              if (item.exchange == "okx") {
                setokx(item.status);
              }
            });

            setMylist1(res.data.result);

            res.data.result.map((item, index) => {

              mylist.push(item.exchange);
              console.log(item.trade_status, index, "Tradesss")
              trade.push(item.trade_status)

            });
            setTrades(trade)

            // console.log(trade,"Tradesss")
            if (res.data.result.length >= exchanges.length) {
              setnot(true);
            }
          }
        })
        .catch((err) => console.log(err.response.data));
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setMylist1("");
    getMysubscription()

  }, [change]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setEdit(false);
    setOpen(false);
  };

  const handleOpens = () => {
    setOpens(true);
    setOpen(false);
  };
  const handleOpens1 = () => {
    setOpens(false);
    setOpen(true);
  };
  const handleCloses = () => setOpens(false);

  const handleOpenss = () => {
    setOpenss(true);
    setOpens(false);
  };
  const handleOpenss1 = () => {
    setOpenss(false);
    setOpens(TryOutlined);
  };
  const handleClosess = () => setOpenss(false);

  const handleOpensss = () => {
    setOpensss(true);
    setOpenss(false);
  };
  const handleOpensss1 = () => {
    setOpensss(!true);
    setOpenss(!false);
  };
  const handleClosesss = () => setOpensss(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const status_changeApi = (exchange, status) => {
    console.log(exchange, status);
    Axios.post(
      `/trade/account_status`,
      { exchange, status },
      {
        headers: {
          Authorization: tokenCheck,
        },
      }
    )
      .then((res) => {
        toast.success(res.data.message, {
          duration: 2000,
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
        
        setTimeout(() => {
          setchange(!change);
          if(window.localStorage.getItem("referaldeposit") == 'null'){
            navigate(`${Consts.route}/wallet`);
          }
        }, 800);
      })
      .catch((err) => seterrs(err));
  };

  return (
    <div className="dashboard-body">
      <Toaster />
      <Box sx={{ flexGrow: 1 }} className={classes.dashboardcss}>
        <Grid item={true} xs={12} sm={12} md={12} lg={12} xl={12}>
          <Item className={classes.dashboarbodycls}>
            {add === undefined ? (
              <div style={{ color: "white" }}>



                   <Grid
                      container
                      spacing={0}
                      className="inner-popup table-heading-style"
                    >

                      <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={2}>
                        <Item className={classes.dashboarbodycls}>
                        <div className="text-binance">
                            <span>Exchange Name</span>
                          </div>
                        </Item>
                      </Grid>

                      <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={2}>
                        <Item className={classes.dashboarbodycls}>
                          <div className="text-binance">
                            <span>Referral Bonus</span>
                          </div>
                        </Item>
                      </Grid>

                      <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={2}>
                        <Item className={classes.dashboarbodycls}>
                          <div className="text-binance">
                            <span>Subaccounts</span>
                          </div>
                        </Item>
                      </Grid>

                      <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={2}>
                        <Item className={classes.dashboarbodycls}>
                          <div className="text-binance">
                            <span>Exchange</span>
                          </div>
                        </Item>
                      </Grid>

                      <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={2}>
                        <Item className={classes.dashboarbodycls}>
                          <div className="text-binance">
                            <span>Supported Types</span>
                          </div>
                        </Item>
                      </Grid>

                      <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={2}>
                      <Item className={classes.dashboarbodycls}>
                          <div className="text-binance action-column-table-last">
                            <span>Action</span>
                          </div>
                        </Item>
                      </Grid>

                    </Grid>




                
                {exchanges?.map((item, index) => {
                  return (
                    <Grid
                      key={index}
                      container
                      spacing={0}
                      className="inner-popup inner-popup-data-subscription"
                    >

                      <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={mylist.includes(item.exchange) ? 2 : 2}>
                        <Item className={classes.dashboarbodycls}>
                          <div className="table-user-icon-only user-icon binance">
                            <img src={item.logo} alt="user" />
                          </div>
                        </Item>
                      </Grid>

                      <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={mylist.includes(item.exchange) ? 2 : 2}>
                        <Item className={classes.dashboarbodycls}>
                          <div className="text-binance">
                            <p>{item.referel}</p>
                          </div>
                        </Item>
                      </Grid>

                      <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={2}>
                        <Item className={classes.dashboarbodycls}>
                          <div className="text-binance">
                            <p>{item.subaccount}</p>
                          </div>
                        </Item>
                      </Grid>

                      <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={2}>
                        <Item className={classes.dashboarbodycls}>
                          <div className="text-binance">
                            <p>{item.exchange}</p>
                          </div>
                        </Item>
                      </Grid>

                      <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={2}>
                        <Item className={classes.dashboarbodycls}>
                          <div className="text-binance supportType">
                            <p>{item.supportType}</p>
                          </div>
                        </Item>
                      </Grid>

                      <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={2}>
                        <Item className={classes.dashboarbodycls}>
                          <div className="text-binance flex-edit-enable-como">
                            {mylist?.length > 0 ? (
                              mylist.includes(item.exchange) ? (
                                <div className={classes.twobuttons}>


                                  <div className={classes.boxfield}>
                                    <Button
                                      style={{ padding: "6px !important" }}

                                      className="edit-btn"
                                      onClick={async (e) => {
                                        setselected(item.exchange);
                                        setselected1("");
                                        let app = mylist1.filter((x, y) => {
                                          if (x.exchange == item.exchange) {
                                            return x;
                                          }
                                        });
                                        if (app) {
                                          setselected1(app[0]);
                                          setEdit(true);
                                          //setOpen(true)
                                        }
                                      }}
                                    >
                                      Edit
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <Button
                                  style={{ padding: "6px !important" }}

                                  className="edit-btn"
                                  onClick={(e) => {
                                    setselected(item.exchange);
                                    handleOpens();
                                  }}
                                >
                                  Subscribe
                                </Button>
                              )
                            ) : (
                              <Button
                                style={{ padding: "6px !important" }}

                                className="edit-btn"
                                onClick={(e) => {
                                  setselected(item.exchange);
                                  handleOpens();
                                }}
                              >
                                Subscribe
                              </Button>
                            )}

                          {mylist?.length > 0 && mylist.includes(item.exchange) && (
                            <div className="text-binance">
                              {mylist?.length > 0 &&
                                mylist.includes(item.exchange) && (
                                  <div className={classes.twobuttons}>
                                    <div className={classes.boxfield}>
                                      {/* <span>status</span> */}

                                      {item.status ? (
                                        <Button
                                          style={{ padding: "6px !important" }}

                                          className="subscribed-btn"
                                          id="removeWidth"
                                          onClick={() => {
                                            status_changeApi(
                                              item.exchange,
                                              !item.status
                                            );
                                          }}
                                        >
                                          Disable
                                        </Button>
                                      ) : (
                                        <Button
                                          style={{ padding: "6px !important" }}

                                          className="subscribed-btn"
                                          id="removeWidth"
                                          onClick={() => {
                                            status_changeApi(
                                              item.exchange,
                                              !item.status
                                            );

                                          }}
                                        >
                                          Enable
                                        </Button>
                                      )}

                                    </div>
                                  </div>
                                )}
                            </div>
                          
                          )}
                          </div>
                        </Item>
                      </Grid>
        
                    </Grid>
                  );
                })}

                {Edit && (
                  <Modal
                    open={Edit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Grid container spacing={0}>
                        <Grid item={true} xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Item className={classes.dashboarbodycls}>
                            <div className="heading-account">
                              <h6 className="xchange">
                                Your Exchange Account List
                              </h6>
                              <CloseIcon onClick={handleClose} />
                            </div>

                            <Searchpage
                              selected={selected}
                              selected1={selected1}
                            />

                            {!mylist1 && (
                              <h5 style={{ color: "white", marginTop: "10vh" }}>
                                You have Not Subscribed Any Subscription Yet
                              </h5>
                            )}
                          </Item>
                        </Grid>
                      </Grid>
                    </Box>
                  </Modal>
                )}

                {open && (
                  <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Grid container spacing={0}>
                        <Grid item={true} xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Item className={classes.dashboarbodycls}>
                            <div className="heading-account">
                              <h6 className="xchange">
                                Add New Exchange Account
                              </h6>
                              <CloseIcon onClick={handleClose} />
                            </div>

                            {not && (
                              <h5 style={{ color: "white", marginTop: "10vh" }}>
                                You have Subscribed All Subscription
                                Successfully
                              </h5>
                            )}
                          </Item>
                        </Grid>
                      </Grid>
                    </Box>
                  </Modal>
                )}

                {opens && (
                  <Modal
                    open={opens}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style} className="binance-popup">
                      <Grid container spacing={0} className="GridPops">
                        <Grid item={true} xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Item className={classes.dashboarbodycls}>
                            <div className="heading-account">
                              <div className="user-icon binance">
                                <img src={binancecoin} alt="user" />
                              </div>
                              <CloseIcon onClick={handleCloses} />
                            </div>

                            <Grid container spacing={0} className="inner-popup">
                              <Grid item={true} xs={12} sm={12} md={12} lg={7} xl={7}>
                                <Grid
                                  container="container"
                                  spacing={0}
                                  className="inner-popup leftside-binace"
                                >
                                  <Grid
                                    item={true}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={4}
                                    xl={4}
                                  >
                                    <Item className={classes.dashboarbodycls}>
                                      <div className="text-binance active">
                                        <span>1 Step</span>
                                        <p>Create Account</p>
                                      </div>
                                    </Item>
                                  </Grid>

                                  <Grid
                                    item={true}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={4}
                                    xl={4}
                                  >
                                    <Item className={classes.dashboarbodycls}>
                                      <div className="text-binance inactive">
                                        <span>2 Step</span>
                                        <p>Create API Key</p>
                                      </div>
                                    </Item>
                                  </Grid>

                                  <Grid
                                    item={true}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={4}
                                    xl={4}
                                  >
                                    <Item className={classes.dashboarbodycls}>
                                      <div className="text-binance">
                                        <span>3 Step</span>
                                        <p>Enter Your Key</p>
                                      </div>
                                    </Item>
                                  </Grid>

                                  <div className="sub-head">
                                    <h4>Create Account</h4>
                                    <p>
                                      Go to Binance Register page and create an
                                      account.
                                    </p>
                                    <p>
                                      Don’t forget to enable two-factor
                                      authentication in the end of registration
                                      process. It’s a mandatory requirement for
                                      an API key creation.
                                    </p>
                                    <Button
                                      style={{ padding: "6px !important" }}

                                      className="chosse-btn chose"
                                      onClick={handleOpens1}
                                    >
                                      <img src={backarrow} alt="user" />
                                      Back
                                    </Button>
                                    <Button
                                      style={{ padding: "6px !important" }}

                                      className="subscribed-btn open"
                                      onClick={handleOpenss}
                                    >
                                      Next step
                                      <img src={nextarrow} alt="user" />
                                    </Button>
                                  </div>
                                </Grid>
                              </Grid>

                              <Grid
                                item={true}
                                xs={12}
                                sm={12}
                                md={12}
                                lg={5}
                                xl={5}
                                className="rightside-binace"
                              >
                                <Grid
                                  container="container"
                                  spacing={0}
                                  className="inner-popup "
                                >
                                  <Grid
                                    item={true}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                  >
                                    <Item className={classes.dashboarbodycls}>
                                      <div className="text-binance">
                                        <p>Subaccount</p>
                                        <span>
                                          To maximize copy trading
                                          effectiveness, we recommend using a
                                          subaccount dedicated to one particular
                                          strategy. You should not do any other
                                          trading activity on this subaccount.
                                        </span>
                                      </div>
                                    </Item>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Item>
                        </Grid>
                      </Grid>
                    </Box>
                  </Modal>
                )}

                {openss && (
                  <Modal
                    open={openss}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style} className="binance-popup">
                      <Grid container className="GridPops" spacing={0}>
                        <Grid item={true} xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Item className={classes.dashboarbodycls}>
                            <div className="heading-icon">
                              <div className="heading-account">
                                <h6 className="xchange">Add Binance API Key</h6>
                              </div>
                              <CloseIcon onClick={handleClosess} />
                            </div>

                            <Grid container spacing={0} className="inner-popup">
                              <Grid item={true} xs={12} sm={12} md={12} lg={7} xl={7}>
                                <Grid
                                  container="container"
                                  spacing={0}
                                  className="inner-popup leftside-binace"
                                >
                                  <Grid
                                    item={true}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={4}
                                    xl={4}
                                  >
                                    <Item className={classes.dashboarbodycls}>
                                      <div className="text-binance inactive">
                                        <span>1 Step</span>
                                        <p>Create Account</p>
                                      </div>
                                    </Item>
                                  </Grid>

                                  <Grid
                                    item={true}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={4}
                                    xl={4}
                                  >
                                    <Item className={classes.dashboarbodycls}>
                                      <div className="text-binance active">
                                        <span>2 Step</span>
                                        <p>Create API Key</p>
                                      </div>
                                    </Item>
                                  </Grid>

                                  <Grid
                                    item={true}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={4}
                                    xl={4}
                                  >
                                    <Item className={classes.dashboarbodycls}>
                                      <div className="text-binance inactive">
                                        <span>3 Step</span>
                                        <p>Enter Your Key</p>
                                      </div>
                                    </Item>
                                  </Grid>

                                  <div className="sub-head">
                                    <h4>Add Binance API Key</h4>

                                    <p>
                                      1. Log in to your Binance account. Go to
                                      Profile API Management page and click the
                                      "Create API" button.
                                    </p>
                                    <p>
                                      2. Select the “System generated API key”
                                      option. Enter your API key label and pass
                                      the Security verification.
                                    </p>
                                    <div className="yellow-card">
                                      <div className="symbol">
                                        <img src={symbol} alt="user" />
                                        <p>
                                          Be advised Do not close or reload the
                                          page, otherwise Secret Key will be
                                          hidden once and forever.
                                        </p>
                                      </div>
                                    </div>
                                    <p>
                                      3. Hit the ‘Edit restriction' button and
                                      select the following checkboxes:
                                    </p>
                                    <p>For Stop trading:</p>
                                    <ul>
                                      <li>Enable Spot & Margin Trading</li>
                                    </ul>
                                    <p>For Spot and Futures trading:</p>
                                    <ul>
                                      <li>Enable Spot & Margin Trading</li>
                                      <li>Enable Futures</li>
                                      <li>Permits Universal Transfer</li>
                                    </ul>

                                    <div className="accordion-popup">
                                      <Accordion
                                        expanded={expanded === "panel1"}
                                        onChange={handleChange("panel1")}
                                        className={classes.accpopuptitle}
                                      >
                                        <AccordionSummary
                                          expandIcon={
                                            <img src={droparrow} alt="user" />
                                          }
                                          aria-controls="panel1bh-content"
                                          id="panel1bh-header"
                                          className={classes.accpopuppara}
                                        >
                                          <Typography
                                            sx={{ width: "33%", flexShrink: 0 }}
                                          >
                                            General settings
                                          </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Typography>
                                            Nulla facilisi. Phasellus
                                            sollicitudin nulla et quam mattis
                                            feugiat. Aliquam eget maximus est,
                                            id dignissim quam.
                                          </Typography>
                                        </AccordionDetails>
                                      </Accordion>
                                    </div>
                                    <p>
                                      4. Switch the ‘Restrict access to trusted
                                      IPs only’ radio button, return to
                                      Coinmatics website tab and click the “Copy
                                      IP” button, enter them to the field on
                                      Binance and click the “Confirm” button.
                                    </p>

                                    <div className="yellow-card">
                                      <div className="symbol">
                                        <img src={symbol} alt="user" />
                                        <p>
                                          Be advised Do not close or reload the
                                          page, otherwise Secret Key will be
                                          hidden once and forever.
                                        </p>
                                      </div>
                                    </div>

                                    <Button
                                      style={{ padding: "6px !important" }}

                                      className="chosse-btn chose"
                                      onClick={handleOpenss1}
                                    >
                                      <img src={backarrow} alt="user" />
                                      Back
                                    </Button>
                                    <Button
                                      style={{ padding: "6px !important" }}

                                      className="subscribed-btn open"
                                      onClick={handleOpensss}
                                    >
                                      Next step
                                      <img src={nextarrow} alt="user" />
                                    </Button>
                                  </div>
                                </Grid>
                              </Grid>

                              <Grid
                                item={true}
                                xs={12}
                                sm={12}
                                md={12}
                                lg={5}
                                xl={5}
                                className="rightside-binace"
                              >
                                <Grid
                                  container="container"
                                  spacing={0}
                                  className="inner-popup "
                                >
                                  <Grid
                                    item={true}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                  >
                                    <Item className={classes.dashboarbodycls}>
                                      <div className="text-binance">
                                        <p>Subaccount</p>
                                        <span>
                                          To maximize copy trading
                                          effectiveness, we recommend using a
                                          subaccount dedicated to one particular
                                          strategy. You should not do any other
                                          trading activity on this subaccount.
                                        </span>
                                      </div>
                                    </Item>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Item>
                        </Grid>
                      </Grid>
                    </Box>
                  </Modal>
                )}

                {opensss && (
                  <Modal
                    open={opensss}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style} className="binance-popup">
                      <Grid container className="GridPops" spacing={0}>
                        <Grid item={true} xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Item className={classes.dashboarbodycls}>
                            <div className="heading-icon">
                              <div className="heading-account">
                                <div className="user-icon binance">
                                  <img src={binancecoin} alt="user" />
                                </div>
                              </div>
                              <CloseIcon onClick={handleClosesss} />
                            </div>

                            <Grid container spacing={0} className="inner-popup">
                              <Grid item={true} xs={12} sm={12} md={12} lg={7} xl={7}>
                                <Grid
                                  container="container"
                                  spacing={0}
                                  className="inner-popup leftside-binace"
                                >
                                  <Grid
                                    item={true}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={4}
                                    xl={4}
                                  >
                                    <Item className={classes.dashboarbodycls}>
                                      <div className="text-binance inactive">
                                        <span>1 Step</span>
                                        <p>Create Account</p>
                                      </div>
                                    </Item>
                                  </Grid>

                                  <Grid
                                    item={true}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={4}
                                    xl={4}
                                  >
                                    <Item className={classes.dashboarbodycls}>
                                      <div className="text-binance inactive">
                                        <span>2 Step</span>
                                        <p>Create API Key</p>
                                      </div>
                                    </Item>
                                  </Grid>

                                  <Grid
                                    item={true}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={4}
                                    xl={4}
                                  >
                                    <Item className={classes.dashboarbodycls}>
                                      <div className="text-binance active">
                                        <span>3 Step</span>
                                        <p>Enter Your Key</p>
                                      </div>
                                    </Item>
                                  </Grid>

                                  <div className="sub-head">
                                    <h4>Enters Your Key</h4>

                                    <SubscribePage selected={selected} />


                                    <Button
                                      style={{ padding: "6px !important" }}

                                      className="chosse-btn chose"
                                      onClick={handleOpensss1}
                                    >
                                      <img src={backarrow} alt="user" />
                                      Back
                                    </Button>
                                  </div>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Item>
                        </Grid>
                      </Grid>
                    </Box>
                  </Modal>
                )}
              </div>
            ) : (
              <div>
                {add === false ? (
                  <>
                    <div style={{ color: "white" }}>
                      {exchanges
                        .filter(
                          (exchange) => !mylist.includes(exchange.exchange)
                        )
                        ?.map((item, index) => {
                          return (
                            <Grid
                              key={index}
                              container
                              spacing={0}
                              className="inner-popup"
                            >
                              <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={2}>
                                <Item className={classes.dashboarbodycls}>
                                  <div className="table-user-icon user-icon binance">
                                    <img src={item.logo} alt="user" />
                                  </div>
                                </Item>
                              </Grid>

                              <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={2}>
                                <Item className={classes.dashboarbodycls}>
                                  <div className="text-binance">
                                    <span>Referral Bonus</span>
                                    <p>{item.referel}</p>
                                  </div>
                                </Item>
                              </Grid>

                              <Grid item={true} xs={12} sm={12} md={12} lg={1} xl={1}>
                                <Item className={classes.dashboarbodycls}>
                                  <div className="text-binance">
                                    <span>Subaccounts</span>
                                    <p>{item.subaccount}</p>
                                  </div>
                                </Item>
                              </Grid>

                              <Grid item={true} xs={12} sm={12} md={12} lg={1} xl={1}>
                                <Item className={classes.dashboarbodycls}>
                                  <div className="text-binance">
                                    <span>Exchange</span>
                                    <p>{item.exchange}</p>
                                  </div>
                                </Item>
                              </Grid>

                              <Grid item={true} xs={12} sm={12} md={12} lg={3} xl={3}>
                                <Item className={classes.dashboarbodycls}>
                                  <div className="text-binance">
                                    <span>Supported Types</span>
                                    <p>{item.supportType}</p>
                                  </div>
                                </Item>
                              </Grid>

                              <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={2}>
                                <Item className={classes.dashboarbodycls}>
                                  <div className="text-binance">
                                    {mylist?.length > 0 ? (
                                      mylist.includes(item.exchange) ? (
                                        <div className={classes.twobuttons}>


                                          <div className={classes.boxfield}>
                                            <Button
                                              style={{ padding: "6px !important" }}

                                              className="edit-btn"
                                              onClick={async (e) => {
                                                setselected(item.exchange);
                                                setselected1("");
                                                let app = mylist1.filter(
                                                  (x, y) => {
                                                    if (
                                                      x.exchange ==
                                                      item.exchange
                                                    ) {
                                                      return x;
                                                    }
                                                  }
                                                );
                                                if (app) {
                                                  setselected1(app[0]);
                                                  setEdit(true);
                                                  //setOpen(true)
                                                }
                                              }}
                                            >
                                              Edit
                                            </Button>
                                          </div>
                                        </div>
                                      ) : (
                                        <Button
                                          style={{ padding: "6px !important" }}

                                          className="edit-btn"
                                          onClick={(e) => {
                                            setselected(item.exchange);
                                            handleOpens();
                                          }}
                                        >
                                          Subscribe
                                        </Button>
                                      )
                                    ) : (
                                      <Button
                                        style={{ padding: "6px !important" }}

                                        className="edit-btn"
                                        onClick={(e) => {
                                          setselected(item.exchange);
                                          handleOpens();
                                        }}
                                      >
                                        Subscribe
                                      </Button>
                                    )}
                                  </div>
                                </Item>
                              </Grid>
                            </Grid>
                          );
                        })}

                      {Edit && (
                        <Modal
                          open={Edit}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
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
                                  <div className="heading-account">
                                    <h6 className="xchange">
                                      Your Exchange Account List
                                    </h6>
                                    <CloseIcon onClick={handleClose} />
                                  </div>

                                  <Searchpage
                                    selected={selected}
                                    selected1={selected1}
                                  />

                                  {!mylist1 && (
                                    <h5
                                      style={{
                                        color: "white",
                                        marginTop: "10vh",
                                      }}
                                    >
                                      You have Not Subscribed Any Subscription
                                      Yet
                                    </h5>
                                  )}
                                </Item>
                              </Grid>
                            </Grid>
                          </Box>
                        </Modal>
                      )}

                      {open && (
                        <Modal
                          open={open}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
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
                                  <div className="heading-account">
                                    <h6 className="xchange">
                                      Add New Exchange Account
                                    </h6>
                                    <CloseIcon onClick={handleClose} />
                                  </div>

                                  {not && (
                                    <h5
                                      style={{
                                        color: "white",
                                        marginTop: "10vh",
                                      }}
                                    >
                                      You have Subscribed All Subscription
                                      Successfully
                                    </h5>
                                  )}
                                </Item>
                              </Grid>
                            </Grid>
                          </Box>
                        </Modal>
                      )}

                      {opens && (
                        <Modal
                          open={opens}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style} className="binance-popup">
                            <Grid container spacing={0} className="GridPops">
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Item className={classes.dashboarbodycls}>
                                  <div className="heading-account">
                                    <div className="user-icon binance">
                                      {/* <img src={img} alt="user" /> */}
                                      {selected === 'binance' ? <img src={binancecoin} alt="user" /> :
                                        <>
                                          {selected === 'okx' ? <img src={okximage} alt="user" /> : <img src={imperialimage} alt="user" />}
                                        </>}

                                    </div>
                                    <CloseIcon onClick={handleCloses} />
                                  </div>

                                  <Grid
                                    container
                                    spacing={0}
                                    className="inner-popup"
                                  >
                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={7}
                                      xl={7}
                                    >
                                      <Grid
                                        container="container"
                                        spacing={0}
                                        className="inner-popup leftside-binace"
                                      >
                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance active">
                                              <span>1 Step</span>
                                              <p>Create Account</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance inactive">
                                              <span>2 Step</span>
                                              <p>Create API Key</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance">
                                              <span>3 Step</span>
                                              <p>Enter Your Key</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <div className="sub-head">
                                          <h4>Create Account</h4>
                                          <p>
                                            Go to {selected.charAt(0).toUpperCase() + selected.slice(1)} Register page and
                                            create an account.
                                          </p>
                                          <p>
                                            Don’t forget to enable two-factor
                                            authentication in the end of
                                            registration process. It’s a
                                            mandatory requirement for an API key
                                            creation.
                                          </p>
                                          <Button
                                            style={{ padding: "6px !important" }}

                                            className="chosse-btn chose"
                                            onClick={handleOpens1}
                                          >
                                            <img src={backarrow} alt="user" />
                                            Back
                                          </Button>
                                          <Button
                                            style={{ padding: "6px !important" }}

                                            className="subscribed-btn open"
                                            onClick={handleOpenss}
                                          >
                                            Next step
                                            <img src={nextarrow} alt="user" />
                                          </Button>
                                        </div>
                                      </Grid>
                                    </Grid>

                                    <Grid
                                      item="item"
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={5}
                                      xl={5}
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
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance">
                                              <p>Subaccount</p>
                                              <span>
                                                To maximize copy trading
                                                effectiveness, we recommend
                                                using a subaccount dedicated to
                                                one particular strategy. You
                                                should not do any other trading
                                                activity on this subaccount.
                                              </span>
                                            </div>
                                          </Item>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Item>
                              </Grid>
                            </Grid>
                          </Box>
                        </Modal>
                      )}

                      {openss && (
                        <Modal
                          open={openss}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style} className="binance-popup">
                            <Grid container className="GridPops" spacing={0}>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Item className={classes.dashboarbodycls}>
                                  <div className="heading-icon">
                                    <div className="heading-account">
                                      <h6 className="xchange">
                                        Add {selected.charAt(0).toUpperCase() + selected.slice(1)} API Key
                                      </h6>
                                    </div>
                                    <CloseIcon onClick={handleClosess} />
                                  </div>

                                  <Grid
                                    container
                                    spacing={0}
                                    className="inner-popup"
                                  >
                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={7}
                                      xl={7}
                                    >
                                      <Grid
                                        container="container"
                                        spacing={0}
                                        className="inner-popup leftside-binace"
                                      >
                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance inactive">
                                              <span>1 Step</span>
                                              <p>Create Account</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance active">
                                              <span>2 Step</span>
                                              <p>Create API Key</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance inactive">
                                              <span>3 Step</span>
                                              <p>Enter Your Key</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <div className="sub-head">
                                          <h4>Add {selected.charAt(0).toUpperCase() + selected.slice(1)} API Key</h4>

                                          <p>
                                            1. Log in to your {selected.charAt(0).toUpperCase() + selected.slice(1)} account.
                                            Go to Profile API Management page
                                            and click the "Create API" button.
                                          </p>
                                          <p>
                                            2. Select the “System generated API
                                            key” option. Enter your API key
                                            label and pass the Security
                                            verification.
                                          </p>
                                          <div className="yellow-card">
                                            <div className="symbol">
                                              <img src={symbol} alt="user" />
                                              <p>
                                                Be advised Do not close or
                                                reload the page, otherwise
                                                Secret Key will be hidden once
                                                and forever.
                                              </p>
                                            </div>
                                          </div>
                                          <p>
                                            3. Hit the ‘Edit restriction' button
                                            and select the following checkboxes:
                                          </p>
                                          <p>For Stop trading:</p>
                                          <ul>
                                            <li>
                                              Enable Spot & Margin Trading
                                            </li>
                                          </ul>
                                          <p>For Spot and Futures trading:</p>
                                          <ul>
                                            <li>
                                              Enable Spot & Margin Trading
                                            </li>
                                            <li>Enable Futures</li>
                                            <li>Permits Universal Transfer</li>
                                          </ul>

                                          <div className="accordion-popup">
                                            <Accordion
                                              expanded={expanded === "panel1"}
                                              onChange={handleChange("panel1")}
                                              className={classes.accpopuptitle}
                                            >
                                              <AccordionSummary
                                                expandIcon={
                                                  <img
                                                    src={droparrow}
                                                    alt="user"
                                                  />
                                                }
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                                className={classes.accpopuppara}
                                              >
                                                <Typography
                                                  sx={{
                                                    width: "33%",
                                                    flexShrink: 0,
                                                  }}
                                                >
                                                  General settings
                                                </Typography>
                                              </AccordionSummary>
                                              <AccordionDetails>
                                                <Typography>
                                                  Nulla facilisi. Phasellus
                                                  sollicitudin nulla et quam
                                                  mattis feugiat. Aliquam eget
                                                  maximus est, id dignissim
                                                  quam.
                                                </Typography>
                                              </AccordionDetails>
                                            </Accordion>
                                          </div>
                                          <p>
                                            4. Switch the ‘Restrict access to
                                            trusted IPs only’ radio button,
                                            return to Coinmatics website tab and
                                            click the “Copy IP” button, enter
                                            them to the field on {selected.charAt(0).toUpperCase() + selected.slice(1)} and
                                            click the “Confirm” button.
                                          </p>

                                          <div className="yellow-card">
                                            <div className="symbol">
                                              <img src={symbol} alt="user" />
                                              <p>
                                                Be advised Do not close or
                                                reload the page, otherwise
                                                Secret Key will be hidden once
                                                and forever.
                                              </p>
                                            </div>
                                          </div>

                                          <Button
                                            style={{ padding: "6px !important" }}

                                            className="chosse-btn chose"
                                            onClick={handleOpenss1}
                                          >
                                            <img src={backarrow} alt="user" />
                                            Back
                                          </Button>
                                          <Button
                                            style={{ padding: "6px !important" }}

                                            className="subscribed-btn open"
                                            onClick={handleOpensss}
                                          >
                                            Next step
                                            <img src={nextarrow} alt="user" />
                                          </Button>
                                        </div>
                                      </Grid>
                                    </Grid>

                                    <Grid
                                      item="item"
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={5}
                                      xl={5}
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
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance">
                                              <p>Subaccount</p>
                                              <span>
                                                To maximize copy trading
                                                effectiveness, we recommend
                                                using a subaccount dedicated to
                                                one particular strategy. You
                                                should not do any other trading
                                                activity on this subaccount.
                                              </span>
                                            </div>
                                          </Item>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Item>
                              </Grid>
                            </Grid>
                          </Box>
                        </Modal>
                      )}

                      {opensss && (
                        <Modal
                          open={opensss}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style} className="binance-popup">
                            <Grid container className="GridPops" spacing={0}>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Item className={classes.dashboarbodycls}>
                                  <div className="heading-icon">
                                    <div className="heading-account">
                                      <div className="user-icon binance">
                                        {/* <img src={binancecoin} alt="user" /> */}
                                        {selected === 'binance' ? <img src={binancecoin} alt="user" /> :
                                          <>
                                            {selected === 'okx' ? <img src={okximage} alt="user" /> : <img src={imperialimage} alt="user" />}
                                          </>}
                                      </div>
                                    </div>
                                    <CloseIcon onClick={handleClosesss} />
                                  </div>

                                  <Grid
                                    container
                                    spacing={0}
                                    className="inner-popup"
                                  >
                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={7}
                                      xl={7}
                                    >
                                      <Grid
                                        container="container"
                                        spacing={0}
                                        className="inner-popup leftside-binace"
                                      >
                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance inactive">
                                              <span>1 Step</span>
                                              <p>Create Account</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance inactive">
                                              <span>2 Step</span>
                                              <p>Create API Key</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance active">
                                              <span>3 Step</span>
                                              <p>Enter Your Key</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <div className="sub-head">
                                          <h4>Enter Your Keys</h4>

                                          <div
                                            style={{ width: "100%" }}
                                            className="SubscribePage"
                                          >
                                            <SubscribePage
                                              selected={selected}
                                            />
                                          </div>

                                          <Button
                                            style={{ padding: "6px !important" }}

                                            className="chosse-btn chose"
                                            onClick={handleOpensss1}
                                          >
                                            <img src={backarrow} alt="user" />
                                            Back
                                          </Button>
                                        </div>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Item>
                              </Grid>
                            </Grid>
                          </Box>
                        </Modal>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ color: "white" }}>
                      {exchanges
                        .filter((exchange) =>
                          mylist.includes(exchange.exchange)
                        )
                        ?.map((item, index) => {
                          return (
                            <Grid
                              key={index}
                              container
                              spacing={0}
                              className="inner-popup"
                            >
                              <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={2}>
                                <Item className={classes.dashboarbodycls}>
                                  <div className="user-icon binance">
                                    <img src={item.logo} alt="user" />
                                  </div>
                                </Item>
                              </Grid>

                              <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={2}>
                                <Item className={classes.dashboarbodycls}>
                                  <div className="text-binance">
                                    <span>Referral Bonus</span>
                                    <p>{item.referel}</p>
                                  </div>
                                </Item>
                              </Grid>

                              <Grid item={true} xs={12} sm={12} md={12} lg={1} xl={1}>
                                <Item className={classes.dashboarbodycls}>
                                  <div className="text-binance">
                                    <span>Subaccounts</span>
                                    <p>{item.subaccount}</p>
                                  </div>
                                </Item>
                              </Grid>

                              <Grid item={true} xs={12} sm={12} md={12} lg={1} xl={1}>
                                <Item className={classes.dashboarbodycls}>
                                  <div className="text-binance">
                                    <span>Exchange</span>
                                    <p>{item.exchange}</p>
                                  </div>
                                </Item>
                              </Grid>

                              <Grid item={true} xs={12} sm={12} md={12} lg={3} xl={3}>
                                <Item className={classes.dashboarbodycls}>
                                  <div className="text-binance">
                                    <span>Supported Types</span>
                                    <p>{item.supportType}</p>
                                  </div>
                                </Item>
                              </Grid>

                              <Grid item={true} xs={12} sm={12} md={12} lg={2} xl={2}>
                                <Item className={classes.dashboarbodycls}>
                                  <div className="text-binance">
                                    {mylist?.length > 0 ? (
                                      mylist.includes(item.exchange) ? (
                                        <div className={classes.twobuttons}>


                                          <div className={classes.boxfields}>
                                            {console.log(trades[index], index, "Tradesss")}
                                            {trades[index] === "enable" ?
                                              <div className={classes.trades}>
                                                <h5 style={{ "marginBottom": "10px" }}> Enabled </h5>
                                                <Button
                                                  style={{ padding: "6px !important" }}

                                                  className="edit-btn"
                                                  onClick={async (e) => {
                                                    setselected(item.exchange);
                                                    setselected1("");
                                                    let app = mylist1.filter(
                                                      (x, y) => {
                                                        if (
                                                          x.exchange ==
                                                          item.exchange
                                                        ) {
                                                          return x;
                                                        }
                                                      }
                                                    );
                                                    if (app) {
                                                      setselected1(app[0]);
                                                      setEdit(true);
                                                      //setOpen(true)
                                                    }
                                                  }}
                                                >
                                                  Edit
                                                </Button>
                                              </div>
                                              :
                                              <div className={classes.trades}>
                                                <h5 style={{ "marginBottom": "10px" }}> Disabled </h5>
                                                <Button
                                                  style={{ padding: "6px !important" }}

                                                  className="edit-btn"
                                                  onClick={async (e) => {
                                                    setselected(item.exchange);
                                                    setselected1("");
                                                    let app = mylist1.filter(
                                                      (x, y) => {
                                                        if (
                                                          x.exchange ==
                                                          item.exchange
                                                        ) {
                                                          return x;
                                                        }
                                                      }
                                                    );
                                                    if (app) {
                                                      console.log(app[0], "app")
                                                      setselected1(app[0]);
                                                      setEdit(true);
                                                      //setOpen(true)
                                                    }
                                                  }}
                                                >
                                                  Enable
                                                </Button>
                                              </div>
                                            }

                                          </div>
                                        </div>
                                      ) : (
                                        <Button
                                          style={{ padding: "6px !important" }}

                                          className="edit-btn"
                                          onClick={(e) => {
                                            setselected(item.exchange);
                                            handleOpens();
                                          }}
                                        >
                                          Subscribe
                                        </Button>
                                      )
                                    ) : (
                                      <Button
                                        style={{ padding: "6px !important" }}

                                        className="edit-btn"
                                        onClick={(e) => {
                                          setselected(item.exchange);
                                          handleOpens();
                                        }}
                                      >
                                        Subscribe
                                      </Button>
                                    )}
                                  </div>
                                </Item>
                              </Grid>
                            </Grid>
                          );
                        })}

                      {Edit && (
                        <Modal
                          open={Edit}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
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
                                  <div className="heading-account">
                                    <h6 className="xchange">
                                      Your Exchange Account List
                                    </h6>
                                    <CloseIcon onClick={handleClose} />
                                  </div>

                                  <Searchpage
                                    selected={selected}
                                    selected1={selected1}
                                    gettSelected={gettSelected}
                                    handleEdit={handleEdit}
                                    getSubscription={getSubscription}
                                  />

                                  {!mylist1 && (
                                    <h5
                                      style={{
                                        color: "white",
                                        marginTop: "10vh",
                                      }}
                                    >
                                      You have Not Subscribed Any Subscription
                                      Yet
                                    </h5>
                                  )}
                                </Item>
                              </Grid>
                            </Grid>
                          </Box>
                        </Modal>
                      )}

                      {open && (
                        <Modal
                          open={open}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
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
                                  <div className="heading-account">
                                    <h6 className="xchange">
                                      Add New Exchange Account
                                    </h6>
                                    <CloseIcon onClick={handleClose} />
                                  </div>

                                  {not && (
                                    <h5
                                      style={{
                                        color: "white",
                                        marginTop: "10vh",
                                      }}
                                    >
                                      You have Subscribed All Subscription
                                      Successfully
                                    </h5>
                                  )}
                                </Item>
                              </Grid>
                            </Grid>
                          </Box>
                        </Modal>
                      )}

                      {opens && (
                        <Modal
                          open={opens}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style} className="binance-popup">
                            <Grid container spacing={0} className="GridPops">
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Item className={classes.dashboarbodycls}>
                                  <div className="heading-account">
                                    <div className="user-icon binance">
                                      <img src={binancecoin} alt="user" />
                                    </div>
                                    <CloseIcon onClick={handleCloses} />
                                  </div>

                                  <Grid
                                    container
                                    spacing={0}
                                    className="inner-popup"
                                  >
                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={7}
                                      xl={7}
                                    >
                                      <Grid
                                        container="container"
                                        spacing={0}
                                        className="inner-popup leftside-binace"
                                      >
                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance active">
                                              <span>1 Step</span>
                                              <p>Create Account</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance inactive">
                                              <span>2 Step</span>
                                              <p>Create API Key</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance">
                                              <span>3 Step</span>
                                              <p>Enter Your Key</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <div className="sub-head">
                                          <h4>Create Account</h4>
                                          <p>
                                            Go to {selected.charAt(0).toUpperCase() + selected.slice(1)} Register page and
                                            create an account.
                                          </p>
                                          <p>
                                            Don’t forget to enable two-factor
                                            authentication in the end of
                                            registration process. It’s a
                                            mandatory requirement for an API key
                                            creation.
                                          </p>
                                          <Button
                                            style={{ padding: "6px !important" }}

                                            className="chosse-btn chose"
                                            onClick={handleOpens1}
                                          >
                                            <img src={backarrow} alt="user" />
                                            Back
                                          </Button>
                                          <Button
                                            style={{ padding: "6px !important" }}

                                            className="subscribed-btn open"
                                            onClick={handleOpenss}
                                          >
                                            Next step
                                            <img src={nextarrow} alt="user" />
                                          </Button>
                                        </div>
                                      </Grid>
                                    </Grid>

                                    <Grid
                                      item="item"
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={5}
                                      xl={5}
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
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance">
                                              <p>Subaccount</p>
                                              <span>
                                                To maximize copy trading
                                                effectiveness, we recommend
                                                using a subaccount dedicated to
                                                one particular strategy. You
                                                should not do any other trading
                                                activity on this subaccount.
                                              </span>
                                            </div>
                                          </Item>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Item>
                              </Grid>
                            </Grid>
                          </Box>
                        </Modal>
                      )}

                      {openss && (
                        <Modal
                          open={openss}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style} className="binance-popup">
                            <Grid container className="GridPops" spacing={0}>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Item className={classes.dashboarbodycls}>
                                  <div className="heading-icon">
                                    <CloseIcon onClick={handleClosess} />
                                  </div>
                                  <div className="heading-account">
                                    <h6 className="xchange">
                                      Add {selected.charAt(0).toUpperCase() + selected.slice(1)} API Key
                                    </h6>
                                  </div>

                                  <Grid
                                    container
                                    spacing={0}
                                    className="inner-popup"
                                  >
                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={7}
                                      xl={7}
                                    >
                                      <Grid
                                        container="container"
                                        spacing={0}
                                        className="inner-popup leftside-binace"
                                      >
                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance inactive">
                                              <span>1 Step</span>
                                              <p>Create Account</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance active">
                                              <span>2 Step</span>
                                              <p>Create API Key</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance inactive">
                                              <span>3 Step</span>
                                              <p>Enter Your Key</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <div className="sub-head">
                                          <h4>Add Binance API Key</h4>

                                          <p>
                                            1. Log in to your Binance account.
                                            Go to Profile API Management page
                                            and click the "Create API" button.
                                          </p>
                                          <p>
                                            2. Select the “System generated API
                                            key” option. Enter your API key
                                            label and pass the Security
                                            verification.
                                          </p>
                                          <div className="yellow-card">
                                            <div className="symbol">
                                              <img src={symbol} alt="user" />
                                              <p>
                                                Be advised Do not close or
                                                reload the page, otherwise
                                                Secret Key will be hidden once
                                                and forever.
                                              </p>
                                            </div>
                                          </div>
                                          <p>
                                            3. Hit the ‘Edit restriction' button
                                            and select the following checkboxes:
                                          </p>
                                          <p>For Stop trading:</p>
                                          <ul>
                                            <li>
                                              Enable Spot & Margin Trading
                                            </li>
                                          </ul>
                                          <p>For Spot and Futures trading:</p>
                                          <ul>
                                            <li>
                                              Enable Spot & Margin Trading
                                            </li>
                                            <li>Enable Futures</li>
                                            <li>Permits Universal Transfer</li>
                                          </ul>

                                          <div className="accordion-popup">
                                            <Accordion
                                              expanded={expanded === "panel1"}
                                              onChange={handleChange("panel1")}
                                              className={classes.accpopuptitle}
                                            >
                                              <AccordionSummary
                                                expandIcon={
                                                  <img
                                                    src={droparrow}
                                                    alt="user"
                                                  />
                                                }
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                                className={classes.accpopuppara}
                                              >
                                                <Typography
                                                  sx={{
                                                    width: "33%",
                                                    flexShrink: 0,
                                                  }}
                                                >
                                                  General settings
                                                </Typography>
                                              </AccordionSummary>
                                              <AccordionDetails>
                                                <Typography>
                                                  Nulla facilisi. Phasellus
                                                  sollicitudin nulla et quam
                                                  mattis feugiat. Aliquam eget
                                                  maximus est, id dignissim
                                                  quam.
                                                </Typography>
                                              </AccordionDetails>
                                            </Accordion>
                                          </div>
                                          <p>
                                            4. Switch the ‘Restrict access to
                                            trusted IPs only’ radio button,
                                            return to Coinmatics website tab and
                                            click the “Copy IP” button, enter
                                            them to the field on Binance and
                                            click the “Confirm” button.
                                          </p>

                                          <div className="yellow-card">
                                            <div className="symbol">
                                              <img src={symbol} alt="user" />
                                              <p>
                                                Be advised Do not close or
                                                reload the page, otherwise
                                                Secret Key will be hidden once
                                                and forever.
                                              </p>
                                            </div>
                                          </div>

                                          <Button
                                            style={{ padding: "6px !important" }}

                                            className="chosse-btn chose"
                                            onClick={handleOpenss1}
                                          >
                                            <img src={backarrow} alt="user" />
                                            Back
                                          </Button>
                                          <Button
                                            style={{ padding: "6px !important" }}

                                            className="subscribed-btn open"
                                            onClick={handleOpensss}
                                          >
                                            Next step
                                            <img src={nextarrow} alt="user" />
                                          </Button>
                                        </div>
                                      </Grid>
                                    </Grid>

                                    <Grid
                                      item="item"
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={5}
                                      xl={5}
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
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance">
                                              <p>Subaccount</p>
                                              <span>
                                                To maximize copy trading
                                                effectiveness, we recommend
                                                using a subaccount dedicated to
                                                one particular strategy. You
                                                should not do any other trading
                                                activity on this subaccount.
                                              </span>
                                            </div>
                                          </Item>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Item>
                              </Grid>
                            </Grid>
                          </Box>
                        </Modal>
                      )}

                      {opensss && (
                        <Modal
                          open={opensss}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style} className="binance-popup">
                            <Grid container className="GridPops" spacing={0}>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Item className={classes.dashboarbodycls}>
                                  <div className="heading-icon">
                                    <div className="user-icon binance">
                                      <img src={binancecoin} alt="user" />
                                    </div>
                                    <CloseIcon onClick={handleClosesss} />
                                  </div>
                                  <div className="heading-account">
                                    <div className="user-icon binance">
                                      <img src={binancecoin} alt="user" />
                                    </div>
                                  </div>

                                  <Grid
                                    container
                                    spacing={0}
                                    className="inner-popup"
                                  >
                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={7}
                                      xl={7}
                                    >
                                      <Grid
                                        container="container"
                                        spacing={0}
                                        className="inner-popup leftside-binace"
                                      >
                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance inactive">
                                              <span>1 Step</span>
                                              <p>Create Account</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance inactive">
                                              <span>2 Step</span>
                                              <p>Create API Key</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <Grid
                                          item="item"
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          lg={4}
                                          xl={4}
                                        >
                                          <Item
                                            className={classes.dashboarbodycls}
                                          >
                                            <div className="text-binance active">
                                              <span>3 Step</span>
                                              <p>Enter Your Key</p>
                                            </div>
                                          </Item>
                                        </Grid>

                                        <div className="sub-head">
                                          <h4>Entesr Your Key</h4>

                                          <div
                                            style={{ width: "100%" }}
                                            className="SubscribePage"
                                          >
                                            <SubscribePage
                                              selected={selected}
                                            />
                                          </div>

                                          <Button
                                            style={{ padding: "6px !important" }}

                                            className="chosse-btn chose"
                                            onClick={handleOpensss1}
                                          >
                                            <img src={backarrow} alt="user" />
                                            Back
                                          </Button>
                                        </div>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Item>
                              </Grid>
                            </Grid>
                          </Box>
                        </Modal>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </Item>
        </Grid>
      </Box>
    </div>
  );
};

export default DasboardBody;
