import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import "./BasicBody.css";
import TradingViewWidget from "./TradingViewWidget";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import SellingTable from "./SellingTable";
import BuyingTable from "./BuyingTable";
import OpenOrderTab from "./OpenOrderTab";
import BuySell from "./BuySell";
import TopMovers from "./TopMovers";
import Axios from "../../Axios";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AdvanceMarketTab from "./AdvanceMarketTab";
import TextField from "@mui/material/TextField";
import { useLocation } from "react-router-dom";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import TradeViewMain from "../TradeView/TradeViewMain";
import Modal from "@mui/material/Modal";
import Consts from "../../Constansts";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";

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

var ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197");
const endpoint = Consts.bybitsocketurl;

const BasicBody = ({ data }) => {
  const [btc, setBtc] = useState();
  const [eth, setEth] = useState();
  const [xpr, setxrp] = useState();
  const [dash, setdash] = useState();
  const [buyspot, setbuyspot] = useState();
  const [sellspot, setSellspot] = useState();
  const [selected, setSelected] = useState();
  const [searchedpair, setsearchpair] = useState("");
  const classes = useStyles();

  const history = useLocation();

  const [assetList, setAssetList] = useState(["BTCUSDT", "ETHUSDT"]);
  const [value, setValue] = React.useState(0);
  const [pair, setPair] = useState("BTCUSDT");
  const [oldpair, setoldpair] = useState("");
  const [selPair, setSelPair] = useState("");
  const [ers, seters] = useState();

  const [selec, setSelc] = useState("")
  const [selec1, setSelc1] = useState("BTCUSDT")

  const [reload, setReload] = useState(0);

  const handleReload = (value) => {
    setReload(value)
    // alert(value)
  }

  const futurepairs = () => {
    Axios.get("/assets/getfuturepairs", {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      },
    })
      .then((res) => {
        let finds;
        res.data.result[0].data.find((item) => {
          if (item.instFamily == "BTCUSDT") {
            finds = item.instId;
          }
        });
        if (finds) {
          setPair(finds);
        }
      })
      .catch((err) => {
        seters(err?.response?.data?.message);
      });
  };

  React.useEffect(() => {
    futurepairs();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const datas = {
    op: "subscribe",
    args: [
      {
        channel: "index-tickers",
        instId: `${selPair.split("-")[0]}-${selPair.split("-")[1]}`,
      },
      {
        channel: "books",
        instId: `${selPair.split("-")[0]}-${selPair.split("-")[1]}`,
      },
    ],
  };

  // const Ticker = () => {
  //   ws.onopen = (event) => {
  //     ws.send(JSON.stringify(datas));
  //   };

  //   ws.onmessage = (event) => {
  //     const response = JSON.parse(event.data);

  //     try {
  //       if (response?.arg?.channel != "books") {
  //         // setBtc(response?.data[0]);
  //       } else {
  //         if (response?.data[0]?.asks.length > 0) {
  //           if (
  //             response?.data[0]?.asks.slice(0, 1)[0] &&
  //             response?.data[0]?.asks.slice(0, 1)[0][0] != "0" &&
  //             response?.data[0]?.asks.slice(0, 1)[0][1] != "0" &&
  //             response?.data[0]?.asks.slice(0, 1)[0][3] != "0"
  //           ) {
  //             let values = response?.data[0]?.asks.slice(0, 1)[0];
  //             values.push(response?.arg?.instId);
  //             // setSellspot(values);
  //           }
  //         }
  //         if (response?.data[0]?.bids.length > 0) {
  //           if (
  //             response?.data[0]?.bids.slice(0, 1)[0] &&
  //             response?.data[0]?.bids.slice(0, 1)[0][0] != "0" &&
  //             response?.data[0]?.bids.slice(0, 1)[0][1] != "0" &&
  //             response?.data[0]?.bids.slice(0, 1)[0][3] != "0"
  //           ) {
  //             let values = response?.data[0]?.bids.slice(0, 1)[0];
  //             values.push(response?.arg?.instId);
  //             // setbuyspot(values);
  //             // {console.log(values,"open3333")}
  //           }
  //         }
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  // };

  // useEffect(() => {
  //   setSelPair(pair);
  // }, [pair]);

  // useEffect(() => {
  //   Ticker();
  //   return () => {
  //     ws.close();
  //     ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197");
  //   };
  // }, [selPair]);

  useEffect(() => {
    if (oldpair) {
      const data = {
        op: "unsubscribe",
        args: [
          {
            channel: "index-tickers",
            instId: `${pair.split("-")[0]}-${pair.split("-")[1]}`,
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
    setoldpair(`${pair.split("-")[0]}-${pair.split("-")[1]}`);
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
    if (history.state) {
      setPair(history.state?.pairs);
    }
  }, [history.state]);

  useEffect(() => {
    getAllTradePairs();
  }, []);

  const selectPairsss = (data) => {
    // console.log(data,'fasdfsdf')
    setSelc(data)
  }

  useEffect(() => {
    if (selec != '') {
      setSelc1(selec)
    }

  }, [selec])

  useEffect(() => {
    var symbol = pair
    // symbol = symbol.replace('-', '');
    const client = new WebSocket(endpoint);

    // console.log('Attempting to connect to WebSocket', endpoint);

    client.onopen = () => {
      // console.log('WebSocket Client Connected');
      setInterval(() => {
        client.send('ping'); // Send ping to keep connection alive
      }, 30000);

      client.send(JSON.stringify({ op: 'subscribe', args: [`orderbook.${200}.${symbol}`] }));
    };

    client.onmessage = (event) => {
      // setTimeout(() => {
      const response = JSON.parse(event.data);
      // console.log('Message received from socket FUTURE', response );
      // Handle incoming messages from WebSocket

      if (response?.data?.b.length > 0) {

        if (response?.data?.b[0] != 0 && response?.data?.b[1] != 0) {
          var values = response?.data?.b[0];
          values.push(response?.data?.s);
          // console.log(values,'REDRESPONSEFUTURE');
          setbuyspot(values);
        }

        if (response?.data?.a[0] != 0 && response?.data?.a[1] != 0) {
          var values1 = response?.data?.a[0];
          values.push(response?.data?.s);
          // console.log(values1,'REDRESPONSEFUTURE');
          setSellspot(values1);
        }

      }
      // }, 2000)

    };

    client.onclose = () => {
      // console.log('WebSocket Connection Closed');
      // Handle WebSocket closed
    };

    client.onerror = (error) => {
      console.error('WebSocket Error:', error);
      // Handle WebSocket errors
    };

    // Cleanup function
    return () => {
      // console.log('Cleaning up WebSocket connection');
      client.close();
    };
  }, [pair]);


  const handleOrderBookData = async () => {
    try {

      const { data } = await Axios.post(
        `/bybit/orderbook`,
        { type: 'linear', ccy: pair },
        {
          headers: {
            Authorization: localStorage?.getItem("Mellifluous"),
          },
        }
      );
      if (data?.success) {
        // console.log(data,'DATA-ORDERBOOK');
        if (data?.result.length > 1) {
          setBtc(data?.result)
        } else {
          setBtc(data?.result[0])
        }

      } else {
        setBtc([])
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleOrderBookData()
  }, [pair])

  const [open, setOpen] = useState(false);


  const handleClearClick = () => {
    setsearchpair('')
  }

  return (
    <div className="dashboard-body spot-body basic-page-body">
      <Toaster />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="top-part-all-page basic-page-top-part">
                  {/* <div className="top-col-1">
                    <span></span>
                    <span></span>
                  </div>
                  <div className="top-col-2">
                    <span></span>
                    <span></span>
                  </div> */}
                  <div className="top-col-4 comon-flex-top-bot-style">
                    <span style={{ textAlign: "left" }}>Future</span>
                    <div
                      className="iconDiv"
                      onClick={() => {
                        setOpen(true);
                        setsearchpair('')
                      }}
                    >
                      {" "}
                      <span style={{ color: "#25DEB0" }}>{pair} </span>
                      <ArrowDropDownIcon />
                    </div>
                    <Modal
                      open={open}
                      onClose={() => {
                        // getAllTradePairs();
                        setOpen(false);
                      }}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      className="account-qr-code-pop-up-modal"
                    >
                      <Box id="account-qr-code-pop-up-modal-ids">
                        <div
                          className="menu-pair-heads"
                          style={{ "flex-direction": "column" }}
                        >

                          <Grid container spacing={5} className="basic-body-container">

                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                              className="market-basic-left-block"
                              id="market-basic-left-block-id-left"
                            >
                              <h5 className="market-advance">Markets</h5>
                              <div className="advance-search">
                                <TextField
                                  id="outlined-basic"
                                  label="Search"
                                  variant="outlined"
                                  value={searchedpair}
                                  onChange={(e) => {
                                    // console.log(e.target.value.toUpperCase(), 'e.target.value');
                                    setsearchpair(e.target.value.toUpperCase());
                                  }}
                                />
                              </div>
                              {/* <IconButton
                                type="button"
                                sx={{ p: "10px" }}
                                aria-label="search"
                                onClick={handleClearClick}
                              >
                                <CloseIcon />
                              </IconButton> */}
                              <AdvanceMarketTab pairs={pair} searchpair={searchedpair} selectPairsss={selectPairsss} />
                            </Grid>

                          </Grid>
                        </div>
                      </Box>
                    </Modal>
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
                    >{`${btc?.openInterestValue
                      ? `${Number(btc?.openInterestValue).toLocaleString()}`
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
                    // >{`${btc?.idxPx
                    //     ? findPercentage(
                    //       Number(btc?.idxPx),
                    //       Number(btc?.open24h)
                    //     )
                    //     : 0
                    //   }%`}</span>
                    >{`${btc?.price24hPcnt
                      ? btc?.price24hPcnt
                      : 0
                      }%`}</span>
                  </div>
                  <div className="top-col-4 comon-flex-top-bot-style">
                    {/* <span>{pair ? pair.split("-")[0] : "USD"}</span> */}
                    <span>{pair ? pair.slice(0, -4) : "USD"}</span>
                    {/* <span>{`${btc?.idxPx
                        ? `${Number(btc?.idxPx).toFixed(3).toLocaleString()}`
                        : "0"
                      }`}</span> */}
                    <span>{`${buyspot?.length > 0
                      ? `${Number(buyspot[0]).toFixed(3).toLocaleString()}`
                      : "0"
                      }`}</span>
                  </div>
                  <div className="top-col-5 comon-flex-top-bot-style">
                    <span>24h low</span>
                    <span>{`${btc?.lowPrice24h
                      ? `${Number(btc?.lowPrice24h).toLocaleString()}`
                      : "0"
                      }`}</span>
                  </div>
                  <div className="top-col-6 comon-flex-top-bot-style">
                    <span>24h high</span>
                    <span>{`${btc?.highPrice24h
                      ? `${Number(btc?.highPrice24h).toLocaleString()}`
                      : "0"
                      }`}</span>
                  </div>
                  <div className="top-col-7 comon-flex-top-bot-style">
                    {/* <span>24h volume({pair.split("-")[0]})</span> */}
                    <span>24h volume({pair})</span>
                    <span>{`${btc?.volume24h
                      ? `${Number(btc?.volume24h).toLocaleString()}`
                      : "0"
                      }`}</span>
                  </div>

                  {/* <div className='top-col-8 comon-flex-top-bot-style'><span>24h turnover(USDC)</span><span>0.00</span></div> */}
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={5} className="basic-body-container">
              {/* 
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={4}
                xl={3}
                className="market-basic-left-block"
                id="market-basic-left-block-id-left"
              >
                <h5 className="market-advance">Markets</h5>
                <div className="advance-search">
                  <TextField
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    onChange={(e) => {
                      setsearchpair(e.target.value.toUpperCase());
                    }}
                  />
                </div>
                <AdvanceMarketTab pairs={pair} searchpair={searchedpair} selectPairsss={selectPairsss} />
              </Grid> */}

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={4}
                xl={6}
                id="basic-graph-chart-top-bottom"
              >
                <Item
                  className={classes.dashboarbodycls}
                  id="basic-graph-chart"
                >
                  {selec1 && <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        className="spot-graph-chart-tab"
                      >
                        <Tab label="Chart" {...a11yProps(0)} />
                        <Tab label="Overview" {...a11yProps(1)} />
                        {/* <div id="open1">
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
                        </div> */}
                      </Tabs>
                    </Box>
                    <TabPanel
                      value={value}
                      index={0}
                      className="spot-graph-chart-tab-content"
                    >
                      {/* {console.log(selec1,'selec')} */}
                      {selec1 ? <TradingViewWidget selec={selec1 != '' && selec1} /> : <></>}
                      {/* <TradeViewMain pair={pair} /> */}
                    </TabPanel>
                    <TabPanel
                      value={value}
                      index={1}
                      className="spot-graph-chart-tab-content"
                    >
                      {selec1 && <TradingViewWidget pair={selec1} />}
                      {/* <TradeViewMain pair={pair} /> */}
                    </TabPanel>
                  </Box>}

                </Item>


              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                id="order-book-part-basic"
              >
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

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                id="order-book-part-basic"
                className="order-book-part-basic-right"
              >

                <Item
                  className={classes.dashboarbodycls}
                  id="sell-buy-form-outer-id"
                >
                  <BuySell
                    selected={selected}
                    pair={pair}
                    market={btc?.idxPx}
                    reload={handleReload}
                  />
                  {/* <TopMovers/> */}
                </Item>
              </Grid>

            </Grid>
            <Grid container spacing={0}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                id="open-order-id-outer"
              >
                <Item className={classes.dashboarbodycls}>
                  <OpenOrderTab selected={selected} selectedPairs={pair} reload={reload} data={data} />
                </Item>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default BasicBody;
