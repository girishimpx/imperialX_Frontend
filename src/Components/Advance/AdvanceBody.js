import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import "./AdvanceBody.css";
import TradingViewWidget from "./TradingViewWidget";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import SellingTable from "./SellingTable";
import BuyingTable from "./BuyingTable";
import OpenOrderTab from "./OpenOrderTab";
import BuySell from "./BuySell";
import TextField from "@mui/material/TextField";
import AdvanceMarketTab from "./AdvanceMarketTab";
import Axios from "../../Axios";
import consts from "../../Constansts";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast, Toaster, ToastBar } from "react-hot-toast";

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
});

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

let ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197");
const AdvanceBody = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [pair, setPair] = useState("BTC-USDT");

  const [btc, setBtc] = useState();
  const [eth, setEth] = useState();
  const [xpr, setxrp] = useState();
  const [dash, setdash] = useState();
  const [buyspot, setbuyspot] = useState();
  const [sellspot, setSellspot] = useState();
  const [selected, setSelected] = useState();
  const [coinlist, setCoinList] = useState();
  const [oldpair, setoldpair] = useState("");
  const [assetList, setAssetList] = useState(["BTC-USDT", "ETH-USDT"]);
  const [searchedpair, setsearchpair] = useState('');

  const [selPair, setSelPair] = useState("")


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const datas = {
    op: "subscribe",
    args: [
      {
        channel: "index-tickers",
        instId: `${selPair}`,
      },
      {
        channel: "books",
        instId: `${selPair}`,
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
        if (response?.arg?.channel != "books") {
          setBtc(response?.data[0]);
        } else {
          if (response?.data[0]?.asks.length > 0) {
            if (
              response?.data[0]?.asks.slice(0, 1)[0] &&
              response?.data[0]?.asks.slice(0, 1)[0][0] != "0" &&
              response?.data[0]?.asks.slice(0, 1)[0][1] != "0" &&
              response?.data[0]?.asks.slice(0, 1)[0][3] != "0"
            ) {
              let values = response?.data[0]?.asks.slice(0, 1)[0];
              values.push(response?.arg?.instId);
              setSellspot(values);
              // {console.log(values,"open22222")}
            }
          }
          if (response?.data[0]?.bids.length > 0) {
            if (
              response?.data[0]?.bids.slice(0, 1)[0] &&
              response?.data[0]?.bids.slice(0, 1)[0][0] != "0" &&
              response?.data[0]?.bids.slice(0, 1)[0][1] != "0" &&
              response?.data[0]?.bids.slice(0, 1)[0][3] != "0"
            ) {
              let values = response?.data[0]?.bids.slice(0, 1)[0];
              values.push(response?.arg?.instId);
              setbuyspot(values);
              // {console.log(values,"open3333")}
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
  };

  useEffect(() => {
    setSelPair(pair)

  }, [pair]);

  useEffect(() => {
    Ticker();
    return () => {
      ws.close();
      ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197"); // Close the WebSocket connection on unmount
    };
  }, [selPair])





  useEffect(() => {
    if (oldpair) {
      const data = {
        op: "unsubscribe",
        args: [
          {
            channel: "index-tickers",
            instId: `${pair}`,
          },
          {
            channel: "books",
            instId: `${oldpair}`,
          },
        ],
      };
      ws.onopen = (event) => {
        ws.send(JSON.stringify(data));
        ws.send(JSON.stringify(datas));
      };
    }
  }, [oldpair]);






  const findPercentage = (lp, op) => {
    let increase = lp - op;
    let price_change = (increase / op) * 100;
    return price_change.toFixed(2);
  };

  const handleChange1 = (event) => {
    setoldpair(pair);
    setPair(event.target.value);
  };




  const getAllTradePairs = async () => {
    try {
      const { data } = await Axios.get(
        `/assets/getalltradepair`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          },
        }
      );

      if (data?.result?.length > 0) {
        setAssetList([]);
        data?.result?.forEach((element) => {
          setAssetList((pre) => [...pre, element?.tradepair]);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTradePairs();

  }, []);

  return (
    <div className="dashboard-body spot-body advance-body-part">
      <Toaster />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="top-part-all-page basic-page-top-part">
                  <div className="top-col-1">
                    <span></span>
                    <span></span>
                  </div>
                  <div className="top-col-2">
                    <span></span>
                    <span></span>
                  </div>
                  <div className="top-col-3 comon-flex-top-bot-style">
                    <span
                      style={{
                        color: `${findPercentage(
                          Number(btc?.idxPx),
                          Number(btc?.open24h)
                        ) > 0
                          ? "#10D876 !important"
                          : "#CA3F64 !important"
                          }`,
                      }}
                    >{`${btc?.open24h
                      ? `${Number(btc?.open24h).toLocaleString()}`
                      : "0"
                      }`}</span>
                    <span
                      style={{
                        color: `${findPercentage(
                          Number(btc?.idxPx),
                          Number(btc?.open24h)
                        ) > 0
                          ? "#10D876 !important"
                          : "#CA3F64 !important"
                          } `,
                      }}
                    >{`${btc?.idxPx
                      ? findPercentage(
                        Number(btc?.idxPx),
                        Number(btc?.open24h)
                      )
                      : 0
                      }%`}</span>
                  </div>
                  <div className="top-col-4 comon-flex-top-bot-style">
                    <span>{pair ? pair.split("-")[0] : "USD"}</span>
                    <span>{`${btc?.idxPx
                      ? `${Number(btc?.idxPx).toFixed(5).toLocaleString()}`
                      : "0"
                      }`}</span>
                  </div>
                  <div className="top-col-5 comon-flex-top-bot-style">
                    <span>24h low</span>
                    <span>{`${btc?.low24h
                      ? `${Number(btc?.low24h).toLocaleString()}`
                      : "0"
                      }`}</span>
                  </div>
                  <div className="top-col-6 comon-flex-top-bot-style">
                    <span>24h high</span>
                    <span>{`${btc?.high24h
                      ? `${Number(btc?.high24h).toLocaleString()}`
                      : "0"
                      }`}</span>
                  </div>
                  <div className="top-col-7 comon-flex-top-bot-style">
                    <span>24h volume({pair.split("-")[0]})</span>
                    <span>{`${btc?.open24h
                      ? `${Number(btc?.open24h).toLocaleString()}`
                      : "0"
                      }`}</span>
                  </div>
                  {/* <div className="top-col-8 comon-flex-top-bot-style">
                <span>24h turnover({pair.split('-')[1]})</span>
                <span>0.00</span>
              </div> */}
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={0} className="advance-body-container">

              <Grid item xs={12} sm={12} md={12} lg={2} xl={2} id="marketTop">
                <h5 className="market-advance">Markets</h5>
                <div className="advance-search">
                  <TextField
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    onChange={(e) => {
                      setsearchpair(e.target.value.toUpperCase())
                    }}
                  />
                </div>
                <AdvanceMarketTab pairs={pair} searchpair={searchedpair} />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={7.5} xl={7.5} id="chart-top-bottom">
                <Item className={classes.dashboarbodycls} id="basic-graph-chart">
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        className="spot-graph-chart-tab"
                      >
                        <Tab label="Chart" {...a11yProps(0)} />
                        <Tab label="Overview" {...a11yProps(1)} />
                        <div id="open1">
                          <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <Select
                              id="summary"
                              defaultValue={`${pair}`}
                              value={pair.value}
                              onChange={handleChange1}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              {assetList.map((item, index) => {
                                return (
                                  // <MenuItem key={index} value={item}>{`${item.split("-")[0]
                                  //   } - ${item.split("-")[1]}`}</MenuItem>
                                  <MenuItem
                                    key={index}
                                    value={item}
                                  >{`${item}`}</MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </div>
                      </Tabs>
                    </Box>
                    <TabPanel
                      value={value}
                      index={0}
                      className="spot-graph-chart-tab-content"
                    >
                      <TradingViewWidget data={pair} />
                    </TabPanel>
                    <TabPanel
                      value={value}
                      index={1}
                      className="spot-graph-chart-tab-content"
                    >
                      <TradingViewWidget />
                    </TabPanel>
                  </Box>
                </Item>
                <Item className={classes.dashboarbodycls} id="sell-buy-form-outer-id">
                  <BuySell selected={selected} pair={pair} market={btc?.idxPx} />
                </Item>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={2.5} xl={2.5} className="spot-right-order-book">
                <h6 className="order-book-spot">Order book</h6>
                <SellingTable
                  ticker={sellspot}
                  setSelected={setSelected}
                  pair={pair}
                />
                <BuyingTable
                  ticker={buyspot}
                  setSelected={setSelected}
                  pair={pair}
                />
              </Grid>

            </Grid>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Item className={classes.dashboarbodycls}>
                  <OpenOrderTab selectedPairs={pair} />
                </Item>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdvanceBody;
