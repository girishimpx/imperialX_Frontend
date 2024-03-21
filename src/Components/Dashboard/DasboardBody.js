import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import "./DasboardBody.css";
import TopTrading from "./TopTrading";
import AreaChart from "./AreaChart";
import RadialChart from "./RadialChart";
import TopPerformer from "./TopPerformer";
import binancecoin from "../../images/binance-coin.svg";
import backarrow from "../../images/back-arrow.svg";
import nextarrow from "../../images/Next-arrow.svg";
import symbol from "../../images/symbol.svg";
import droparrow from "../../images/Droparrow.svg";


import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import CloseIcon from "@mui/icons-material/Close";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TextField from "@mui/material/TextField";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
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

const DasboardBody = ({ btc, eth, dash, xrp, btc1, eth1, xrp1, ltc, totalBalance }) => {
  console.log(btc, eth, dash, xrp, 'dbdy')

  const findPercentage = (lp, op) => {
    let increase = lp - op;
    let price_change = (increase / op) * 100;
    return price_change.toFixed(2);
  };

  const [hoverdata, sethover] = useState();
  const user = JSON.parse(localStorage.getItem("users"));

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [openss, setOpenss] = useState(false);
  const [opensss, setOpensss] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpens = () => {
    setOpens(true);
    setOpen(false);
  };
  const handleCloses = () => setOpens(false);

  const handleOpenss = () => {
    setOpenss(true);
    setOpens(false);
  };
  const handleClosess = () => setOpenss(false);

  const handleOpensss = () => {
    setOpensss(true);
    setOpenss(false);
  };
  const handleClosesss = () => setOpensss(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="dashboard-body dashboard-main-body">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Item className={classes.dashboarbodycls}>
              <p className="welcome-msg">
                Welcome Back,{" "}
                <span>
                  {localStorage.getItem("users")
                    ? JSON.parse(localStorage.getItem("users"))?.name
                    : ""}
                </span>
              </p>
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Item className={classes.addaccount}>

              <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Item className={classes.dashboarbodycls}>
                        {user && (
                          <p className="welcome-msg">
                            Welcome Back, <span>{`${user?.name}`}</span>
                          </p>
                        )}

                        <div className="heading-account">
                          <h6 className="xchange">Form</h6>
                          <CloseIcon onClick={handleClose} />
                        </div>

                        <Grid container spacing={0} className="inner-popup">
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Item className={classes.dashboarbodycls}>
                              {/* <div className='user-icon binance'><img src={binancecoin} alt='user'/></div> */}
                              <div className="formtxt">
                                <TextField
                                  id="outlined-multiline-flexible"
                                  label="Exchange Name"
                                  multiline="multiline"
                                  className="text-field"
                                />
                              </div>

                              <div className="formtxt">
                                <TextField
                                  id="outlined-multiline-flexible"
                                  label="API Key"
                                  multiline="multiline"
                                  className="text-field"
                                />
                              </div>

                              <div className="formtxt">
                                <TextField
                                  id="outlined-multiline-flexible"
                                  label="API Name"
                                  multiline="multiline"
                                  className="text-field"
                                />
                              </div>

                              <div className="formtxt">
                                <TextField
                                  id="outlined-multiline-flexible"
                                  label="Premission"
                                  multiline="multiline"
                                  className="text-field"
                                />
                              </div>

                              <div className="text-binance">
                                <Button
                                  className="binance-btn"
                                  onClick={handleOpens}
                                >
                                  Sumbit
                                </Button>
                              </div>
                            </Item>
                          </Grid>

                          <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                            <Item className={classes.dashboarbodycls}></Item>
                          </Grid>
                        </Grid>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </Modal>

              {opens && (
                <Modal
                  open={opens}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style} className="binance-popup">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Item className={classes.dashboarbodycls}>
                          <div className="heading-account acc">
                            <CloseIcon onClick={handleCloses} />
                          </div>

                          <Grid container spacing={0} className="inner-popup">
                            <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
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
                              lg={7}
                              xl={7}
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
                                  <Item className={classes.dashboarbodycls}>
                                    <div className="text-binance">
                                      <p>QR Code</p>
                                    </div>
                                  </Item>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid container spacing={0} className="inner-popup">
                            <Grid
                              item="item"
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                            >
                              <div className="formtxt">
                                <TextField
                                  id="outlined-multiline-static"
                                  label=""
                                  className="text-field"
                                />
                              </div>

                              <div className="bck-btn">
                                {/* <Button className='chosse-btn chose'><img src={backarrow} alt='user'/>Back</Button> */}
                                <Button className="welcome-btn open">
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
            </Item>
          </Grid>
        </Grid>

        <Grid container spacing={0} id="balance-blocks">
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={3}
            xl={3}
            className={classes.blockwidthcmn}
            //onMouseLeave={() => {
            //           sethover("");
            //      }}
            onMouseEnter={() => {
              sethover("BTC-USDT");
            }}
          >
            <Item className={classes.dashboarbalancecls}>
              <div className="balance-with-percent">
                <div className="balance-left">
                  <span>BTC</span>
                  <div className="balance-amount">
                    {btc ? `$ ${Number(btc.idxPx).toLocaleString()}` : "0"}
                    {/* {btc ? btc.toFixed(7) : 0} */}
                  </div>
                </div>
                <div className="balance-percentage-right">
                  <div
                    style={{
                      color: `${findPercentage(
                        Number(btc?.idxPx),
                        Number(btc?.open24h)
                      ) > 0
                        ? "#10D876"
                        : "#CA3F64"
                        }`,
                    }}
                    className="percentage-balace-top"
                  >{`${btc?.idxPx
                    ? findPercentage(Number(btc?.idxPx), Number(btc?.open24h))
                    : 0
                    }%`}</div>
                  <div className="coin-type">USDT</div>
                </div>
              </div>
            </Item>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={3}
            xl={3}
            className={classes.blockwidthcmn}
            //onMouseLeave={() => {
            //           sethover("");
            //      }}
            onMouseEnter={() => {
              sethover("ETH-USDT");
            }}
          >
            <Item className={classes.dashboarbalancecls}>
              <div className="balance-with-percent">
                <div className="balance-left">
                  <span>ETH</span>
                  <div className="balance-amount">
                    {eth ? `$ ${Number(eth.idxPx).toLocaleString()}` : "0"}
                    {/* {eth ? eth.toFixed(7) : 0} */}
                  </div>
                </div>
                <div className="balance-percentage-right">
                  <div
                    className="percentage-balace-top"
                    style={{
                      color: `${findPercentage(
                        Number(eth?.idxPx),
                        Number(eth?.open24h)
                      ) > 0
                        ? "#10D876"
                        : "#CA3F64"
                        }`,
                    }}
                  >{`${eth?.idxPx
                    ? findPercentage(Number(eth?.idxPx), Number(eth?.open24h))
                    : 0
                    }%`}</div>
                  <div className="coin-type">USDT</div>
                </div>
              </div>
            </Item>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={3}
            xl={3}
            className={classes.blockwidthcmn}
            //onMouseLeave={() => {
            //           sethover("");
            //      }}
            onMouseEnter={() => {
              sethover("XRP-USDT");
            }}
          >
            <Item className={classes.dashboarbalancecls}>
              <div className="balance-with-percent">
                <div className="balance-left">
                  <span>XRP</span>
                  <div className="balance-amount">
                    {xrp
                      ? `$ ${Number(xrp.idxPx).toFixed(4).toLocaleString()}`
                      : "0"}
                    {/* {xrp ? xrp.toFixed(7) : 0} */}
                  </div>
                </div>
                <div className="balance-percentage-right">
                  <div
                    className="percentage-balace-top"
                    style={{
                      color: `${findPercentage(
                        Number(xrp?.idxPx),
                        Number(xrp?.open24h)
                      ) > 0
                        ? "#10D876"
                        : "#CA3F64"
                        }`,
                    }}
                  >{`${xrp?.idxPx
                    ? findPercentage(Number(xrp?.idxPx), Number(xrp?.open24h))
                    : 0
                    }%`}</div>
                  <div className="coin-type">USDT</div>
                </div>
              </div>
            </Item>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={3}
            xl={3}
            className={classes.blockwidthcmn}
            //onMouseLeave={() => {
            //           sethover("");
            //      }}
            // onMouseEnter={() => {
            //   sethover("DASH-USDT");
            // }}
            onMouseEnter={() => {
              sethover("LTC-USDT");
            }}
          >
            <Item className={classes.dashboarbalancecls}>
              <div className="balance-with-percent">
                <div className="balance-left">
                  {/* <span>DASH</span> */}
                  <span>LTC</span>
                  <div className="balance-amount">
                    {dash
                      ? `$ ${Number(dash.idxPx).toFixed(4).toLocaleString()}`
                      : "0"}
                    {/* {ltc ? ltc : 0} */}
                  </div>
                </div>
                <div className="balance-percentage-right">
                  <div
                    className="percentage-balace-top"
                    style={{
                      color: `${findPercentage(
                        Number(dash?.idxPx),
                        Number(dash?.open24h)
                      ) > 0
                        ? "#10D876"
                        : "#CA3F64"
                        }`,
                    }}
                  >{`${dash?.idxPx
                    ? findPercentage(
                      Number(dash?.idxPx),
                      Number(dash?.open24h)
                    )
                    : 0
                    }%`}</div>
                  <div className="coin-type">USDT</div>
                </div>
              </div>
            </Item>
          </Grid>
        </Grid>

        <Grid container spacing={0} id="balance-blocks-trade-view">
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={8}
            xl={8}
            className={classes.tradeview}
          >
            <Item className={classes.tradeviewinner}>
              <AreaChart hoverData={hoverdata} tradelistdata={[btc, eth, xrp, dash]} balance={[btc1, eth1, xrp1, ltc]} />
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Item className={classes.tradeviewinner}>
              <RadialChart btc={btc1} eth={eth1} xrp={xrp1} ltc={ltc} totalBalance={totalBalance} />
            </Item>
          </Grid>
        </Grid>

        <Grid container spacing={0} id="Top-performer-copy-trade">
          <div className="top-trade-tab-table">
            <h4 className="Top-performer-copy-trade-head">
              Top performer copy trade
            </h4>
            <TopPerformer />
          </div>
        </Grid>

        <Grid container spacing={0} id="Top-Trading-Plartform">
          <h4 className="Top-Trading-Plartform-head">Top Trading Plartform</h4>
          <div className="top-trade-tab-table-outer top-trade-tab-table">
            <TopTrading />
          </div>
        </Grid>
      </Box>
    </div>
  );
};

export default DasboardBody;
