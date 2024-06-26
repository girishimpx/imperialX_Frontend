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
import TradeViewMain from "../TradeView/TradeViewMain";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Modal from "@mui/material/Modal";
import Classstyle from "../CopyTrade/MasterTrader.module.css";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import { Stack } from "rsuite";


const $ = window.$;

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
let ws1 = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197");
let wsfuture = new WebSocket(
  "wss://ws.okx.com:8443/ws/v5/public?brokerId=197"
);
const endpoint = consts.bybitsocketurl;

const AdvanceBody = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [pair, setPair] = useState("BTCUSDT");

  const [btc, setBtc] = useState();
  const [eth, setEth] = useState();
  const [xpr, setxrp] = useState();
  const [dash, setdash] = useState();
  const [buyspot, setbuyspot] = useState();
  const [sellspot, setSellspot] = useState();
  const [selected, setSelected] = useState();
  const [coinlist, setCoinList] = useState();
  const [oldpair, setoldpair] = useState("");
  const [pair1, setPair1] = useState("BTC-USDT");
  // const [assetList, setAssetList] = useState(["BTC-USDT", "ETH-USDT"]);
  const [assetList, setAssetList] = useState([]);
  const [searchedpair, setsearchpair] = useState("");
  const [sideData, setSideData] = useState([]);
  const [cat, setCat] = useState('USDT');
  const [inputValue, setInputValue] = useState('');



  const [selPair, setSelPair] = useState("");
  const [allpairs, setAllPairs] = useState([]);
  const [futureData, setfutureData] = useState();
  const [futureData1, setfutureData1] = useState([]);
  const [futureDataerr, setfutureDataerr] = useState();
  const [selectedpair, setselectedpair] = React.useState("FUTURES");
  const [reload, setReload] = useState(0);

  const handleReload = (value) => {
    setReload(value)
  }

  const [valuess, setValues] = React.useState(0);
  const [open, setOpen] = useState(false);

  const handleChangess = (event, newValue) => {
    setValues(newValue);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleList = (data) => {
    // console.log(data, "===datass");/
    setoldpair(pair);
    setPair(data);
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange2 = (dts) => {
    // console.log(dts, "dtsdfadsf");
    setOpen(false);
    setPair1(dts);
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
          // console.log(response.data,'Margin BOdy');
          if (response?.data?.length > 0) {
            // setBtc(response?.data[0]);
          }
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
              // setSellspot(values);
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
              // setbuyspot(values);
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
    setSelPair(pair);
  }, [pair]);

  useEffect(() => {
    Ticker();
    return () => {
      ws.close();
      ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197"); // Close the WebSocket connection on unmount
    };
  }, [selPair]);

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
    setOpen(true);
    // setoldpair(pair)
    // setPair(event.target.value);
  };

  const getAllTradePairs = async (searchedpair) => {
    searchedpair != '' ? setInputValue(searchedpair) : setInputValue('')

    try {
      const { data } = await Axios.post(
        `/bybit/getnewpairsbytype`,
        { category: cat, type: 'margin' },
        {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          },
        }
      );

      if (data?.result?.length > 0) {
        setAssetList([]);
        setAllPairs([]);
        data?.result?.forEach((element) => {
          // setAssetList((pre) => [...pre, element?.data?.instId]);
          setAllPairs((pre) => [
            ...pre,
            {
              channel: "index-tickers",
              instId: `${element?.data?.instId}`,
            },
          ]);
        });

        if (searchedpair) {
          const filtered = [];
          const use = localStorage.getItem('use')
          // for (let j = 0; j < data.result.length; j++) {
          //   const item = data.result[j];
          //   if (data.result[j].data.instId.includes(searchedpair)) {
          //     const foundPair = sideData.find((sdItem) => sdItem.symbol == item.data.instId);
          //     filtered.push({ 
          //       pairs: item.data.instId, 
          //       check: item.data?.users_id?.includes(use) == true ? item.data?.users_id.includes(use) : false,
          //       lastPrice: foundPair?.lastPrice || 0,
          //       highPrice24h: foundPair?.highPrice24h || 0,
          //     });
          //   }
          // }
          for (let j = 0; j < data.result.length; j++) {
            const item = data.result[j];
            if (item?.symbol?.includes(searchedpair)) {
              filtered.push({
                pairs: item?.symbol,
                check: item?.users_id?.includes(use) === true ? true : false,
              });
            }
          }
          setAssetList(filtered);
        } else {
          var arr = [];
          const use = localStorage.getItem('use')

          for (let index = 0; index < data?.result?.length; index++) {
            const element = data?.result[index];

            arr.push({
              pairs: element?.symbol,
              check: element?.users_id?.includes(use) === true ? true : false
            })

          }

          setAssetList(arr);

          // for (let i = 0; i < data?.result.length; i++) {
          //   const element = data?.result[i];
          //   if (element?.data?.instId?.split("-")[1] == "USDT") {
          //     const foundPair = sideData.find((sdItem) => sdItem?.symbol == element?.data?.instId);
          //     arr.push({
          //       pairs: element?.data?.instId,
          //       check: element?.data?.users_id ? element?.data?.users_id.includes(use) : false,
          //       lastPrice: foundPair?.lastPrice || 0,
          //       highPrice24h: foundPair?.highPrice24h || 0,
          //     })
          //   }
          // }
          // for (let i = 0; i < data?.result.length; i++) {
          //   const element = data?.result[i];
          //   if (element?.data?.instId?.split("-")[1] != "USDT") {
          //     const foundPair = sideData.find((sdItem) => sdItem?.symbol == element?.data?.instId);
          //     arr.push({
          //       pairs: element?.data?.instId,
          //       check: element?.data?.users_id ? element?.data?.users_id.includes(use) : false,
          //       lastPrice: foundPair?.lastPrice || 0,
          //       highPrice24h: foundPair?.highPrice24h || 0,
          //     })
          //   }

          // }
          setAssetList(arr);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const futurepairs = async () => {
    try {
      const datas = [];
      const { data } = await Axios.post(
        `/assets/futurePairs`,
        { pair: selectedpair },
        {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          },
        }
      );

      data?.result?.map((item, index) => {
        if (item.data.instFamily.split("-")[1] == "USDT") {
          datas.push(item);
        }
      });

      if (datas?.length > 0) {
        setfutureData(datas);
        setfutureData1(datas);
      }
      // console.log(futureData, "data FUTURE API1");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTradePairs();

  }, [cat]);

  useEffect(() => {
    futurepairs();
  }, []);

  const allPairdatas = {
    op: "subscribe",
    args: allpairs,
  };
  const AllTicker = () => {
    ws1.onopen = (event) => {
      ws1.send(JSON.stringify(allPairdatas));
    };

    ws1.onmessage = (event) => {
      const response = JSON.parse(event.data);

      try {
        if (response?.arg?.channel != "books") {
          //  console.log(response.data,'Spot BOdy');
          if (response?.data?.length > 0) {
            // console.log(response?.data[0], "tickes");
            let increase =
              Number(response?.data[0]?.open24h) -
              Number(response?.data[0]?.low24h);
            // console.log(
            //   "🚀 ~ file: SpotBody.js:233 ~ AllTicker ~ increase:",
            //   increase
            // );
            let price_change =
              (increase / Number(response?.data[0]?.low24h)) * 100;
            // console.log(
            //   "🚀 ~ file: SpotBody.js:234 ~ AllTicker ~ price_change:",
            //   price_change
            // );

            $(".item_" + response?.data[0]?.instId).html(
              response?.data[0]?.open24h
            );
            $(".items_" + response?.data[0]?.instId).html(
              `${price_change.toFixed(2)} %`
            );
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
  };

  useEffect(() => {
    AllTicker();
    return () => {
      ws1.close();
      ws1 = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197"); // Close the WebSocket connection on unmount
    };
  }, [allpairs]);

  const futureTicker = () => {
    let datas = {
      op: "subscribe",
      args: futureData1?.map((symbol) => ({
        channel: "tickers",
        instId: symbol.data.instId,
      })),
    };

    wsfuture.onopen = (event) => {
      wsfuture.send(JSON.stringify(datas));
    };

    wsfuture.onmessage = (event) => {
      const response = JSON.parse(event.data);

      try {
        for (let a = 0; a < futureData1.length; a++) {
          if (futureData1[a].data.instId == response.arg.instId) {
            delete futureData1[a].data.data;
            futureData1[a].data.data = response.data[0];
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
  };

  useEffect(() => {
    if (futureData?.length > 0) {
      futureTicker();
    }

    return () => {
      wsfuture.close();
      wsfuture = new WebSocket(
        "wss://ws.okx.com:8443/ws/v5/public?brokerId=197"
      );
    };
  }, [futureData]);


  const handlefavpair = async (check, value) => {
    try {

      // console.log(e.target.checked,'CHECKKKKEEEDDD');

      const addd = check
      const { data } = await Axios.post(
        `/assets/addFavPairs`,
        { pairs: value, add: addd },
        {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          },
        }
      );

      if (data?.success) {
        // toast.success(data?.message)
        getAllTradePairs()
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    var symbol = pair
    symbol = symbol.replace('-', '');
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
      setTimeout(() => {
        const response = JSON.parse(event.data);
        // console.log('Message received from socket MARGIN', response?.data);
        // Handle incoming messages from WebSocket

        if (response?.data?.b.length > 0) {

          if (response?.data?.b[0] != 0 && response?.data?.b[1] != 0) {
            var values = response?.data?.b[0];
            values.push(response?.data?.s);
            // console.log(values,'REDRESPONSEMARGIN');
            setbuyspot(values);
          }

          if (response?.data?.a[0] != 0 && response?.data?.a[1] != 0) {
            var values1 = response?.data?.a[0];
            values.push(response?.data?.s);
            // console.log(values1,'GREENRESPONSEMARGIN');
            setSellspot(values1);
          }

        }
      }, 2000)

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



  useEffect(() => {
    handleOrderBookData()
    var symbol = pair
    symbol = symbol.replace('-', '');
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
      setTimeout(() => {
        const response = JSON.parse(event.data);
        // console.log('Message received from socket SPOT', response?.data);
        // Handle incoming messages from WebSocket

        if (response?.data?.b.length > 0) {

          if (response?.data?.b[0] != 0 && response?.data?.b[1] != 0) {
            var values = response?.data?.b[0];
            values.push(response?.data?.s);
            // console.log(values,'REDRESPONSESPOT');
            setbuyspot(values);
          }

          if (response?.data?.a[0] != 0 && response?.data?.a[1] != 0) {
            var values1 = response?.data?.a[0];
            values.push(response?.data?.s);
            // console.log(values1,'GREENRESPONSESPOT');
            setSellspot(values1);
          }

        }
      }, 2000)

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
        { type: 'spot', ccy: pair },
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

  const handleAllOrderBookData = async () => {
    try {

      const { data } = await Axios.post(
        `/bybit/orderbook`,
        { type: 'spot', ccy: '' },
        {
          headers: {
            Authorization: localStorage?.getItem("Mellifluous"),
          },
        }
      );
      if (data?.success && data?.result?.length > 1) {
        // console.log(data?.result, 'RESULT');
        setSideData(data?.result);
      } else {
        setSideData([]);
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleAllOrderBookData()
  }, [pair])

  useEffect(() => {
    // handleOrderBookData()
    const client1 = new WebSocket("wss://stream.bybit.com/v5/public/spot");

    // console.log('Attempting to connect to WebSocket', endpoint);

    client1.onopen = () => {
      console.log('WebSocket Client Connected');
      setInterval(() => {
        client1.send('ping'); // Send ping to keep connection alive
      }, 30000);

      assetList?.forEach(pairData => {
        const pair = pairData?.pairs
        client1.send(JSON.stringify({ op: 'subscribe', args: [`tickers.${pair}`] }));
      });
    };

    client1.onmessage = (event) => {
      const response = JSON.parse(event.data);

      if (response) {
        let increase =
          Number(response?.data?.highPrice24h) -
          Number(response?.data?.lowPrice24h);
        let price_change =
          (increase / Number(response?.data?.lowPrice24h)) * 100;

        $(".item_" + response?.data?.symbol).html(
          response?.data?.highPrice24h
        );
        $(".items_" + response?.data?.symbol).html(
          `${response?.data?.price24hPcnt} %`
        );
      }

    };

    client1.onclose = () => {
      // console.log('WebSocket Connection Closed');
      // Handle WebSocket closed
    };

    client1.onerror = (error) => {
      console.error('WebSocket Error:', error);
      // Handle WebSocket errors
    };

    return () => {
      // console.log('Cleaning up WebSocket connection');
      client1.close();
      // const client1 = new WebSocket(endpoint1);
    };
  }, [assetList]);

  const handleClearClick = () => {
    getAllTradePairs();
    setInputValue('');
  }


  return (
    <div className="dashboard-body spot-body spot-body-content advance-body-part">
      <Toaster />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="top-part-all-page basic-page-top-part">
                  <div className="top-col-1">
                    {/* <span></span>
                    <span></span> */}
                  </div>

                  <div className="top-col-4 comon-flex-top-bot-style">
                    {/* <span></span>
                <span></span> */}
                    <span style={{ textAlign: "left" }}>Margin</span>
                    <div
                      className="iconDiv"
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      {" "}
                      <span style={{ color: "#25DEB0" }}>{pair} </span>
                      <ArrowDropDownIcon />
                    </div>
                    <Modal
                      open={open}
                      onClose={() => {
                        getAllTradePairs();
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
                          <Tabs
                            value={valuess}
                            onChange={handleChangess}
                            aria-label="basic tabs example"
                            className="spot-graph-chart-tab"
                          >
                            <Tab label="Spot" {...a11yProps(0)} />
                            {/* <Tab label="Perpetual" {...a11yProps(1)} /> */}
                          </Tabs>
                          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                            <Stack>
                              <Button onClick={() => { setCat('USDT') }} className={cat === 'USDT' ? 'activecls' : null}>USDT</Button>
                              <Button onClick={() => { setCat('USDC') }} className={cat === 'USDC' ? 'activecls' : null}>USDC</Button>
                              <Button onClick={() => { setCat('BTC') }} className={cat === 'BTC' ? 'activecls' : null}>BTC</Button>
                            </Stack>
                            <Paper
                              component="form"
                              sx={{
                                p: "2px 4px",
                                display: "flex",
                                alignItems: "center",
                                width: 340,
                              }}
                            >
                              <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search"
                                value={inputValue}
                                inputProps={{
                                  "aria-label": "search google maps",
                                }}
                                onChange={(e) => {
                                  getAllTradePairs(
                                    e.target.value.toUpperCase()
                                  );
                                }}
                              />
                              <IconButton
                                type="button"
                                sx={{ p: "10px" }}
                                aria-label="search"
                                onClick={handleClearClick}
                              >
                                {/* <SearchIcon />*/}
                                <CloseIcon />
                              </IconButton>
                            </Paper>
                          </Grid>
                          <TabPanel
                            value={valuess}
                            index={0}
                            className="spot-graph-chart-tab-content"
                          >
                            <div className="menu-pair-head">
                              <div className="menu-pair-head-11">
                                Pair/24h volume
                              </div>
                              <div className="menu-pair-head-2">Last price</div>
                              <div className="menu-pair-head-3">24h change</div>
                            </div>
                            {assetList.length <= 0 ?
                              (
                                <div style={{ padding: "1rem", textAlign: 'center' }}>
                                  {/* <CircularProgress size={60} /> */}
                                  {<p>Pairs Not Found</p>}
                                </div>
                              )
                              : (assetList.map((item, index) => {
                                return (
                                  // <MenuItem key={index} value={item}>{`${item.split("-")[0]
                                  //   } - ${item.split("-")[1]}`}</MenuItem>
                                  <div key={index}
                                    // onClick={() => handleList(item?.pairs)}
                                    className="pair-menu-lists-top"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <div className="coin-block-first">
                                      {item?.check ?
                                        <StarIcon onClick={(e) => { handlefavpair(item?.check, item?.pairs) }} /> :
                                        <StarBorderIcon onClick={(e) => { handlefavpair(item?.check, item?.pairs) }} />
                                      }
                                      <div onClick={() => handleList(item?.pairs)}>{`${item?.pairs}`}</div>
                                    </div>
                                    <div className={`remove item_${item?.pairs}`} onClick={() => handleList(item?.pairs)}>{Number(item?.lastPrice ? item?.lastPrice : 0).toFixed(6)}</div>
                                    <div
                                      className={`remove high-rate items_${item?.pairs}`} onClick={() => handleList(item?.pairs)}
                                    >{Number(item?.highPrice24h ? item?.highPrice24h : 0).toFixed(6)}</div>
                                  </div>
                                );
                              }))
                            }
                          </TabPanel>
                          <TabPanel
                            value={valuess}
                            index={1}
                            className="spot-graph-chart-tab-content"
                          >
                            <div className="menu-pair-head">
                              <div className="menu-pair-head-11">
                                Pair/24h volume
                              </div>
                              <div className="menu-pair-head-2">Last price</div>
                              <div className="menu-pair-head-3">24h change</div>
                            </div>

                            {futureData1?.map((item, index) => {
                              return (
                                // <MenuItem key={index} value={item.data.instFamily}>{`${item.data.instFamily.split("-")[0]
                                //   } - ${item.split("-")[1]}`}</MenuItem>
                                <div
                                  className="pair-menu-lists-top"
                                  onClick={() => {
                                    // console.log(
                                    //   `${item?.data?.instFamily} (${item?.data?.alias == "quarter"
                                    //     ? "Qtly"
                                    //     : item?.data.alias == "next_quarter"
                                    //       ? "Bi-Qtly"
                                    //       : item?.data.alias == "this_week"
                                    //         ? "Wkly"
                                    //         : item?.data.alias == "next_week"
                                    //           ? "Bi-Wkly"
                                    //           : ""
                                    //   })`,
                                    //   "item.data.instFamily"
                                    // );
                                    handleChange2(
                                      `${item?.data?.instFamily} (${item?.data?.alias == "quarter"
                                        ? "Qtly"
                                        : item?.data.alias == "next_quarter"
                                          ? "Bi-Qtly"
                                          : item?.data.alias == "this_week"
                                            ? "Wkly"
                                            : item?.data.alias == "next_week"
                                              ? "Bi-Wkly"
                                              : ""
                                      })`
                                    );
                                  }}
                                >
                                  <div>
                                    {`${item?.data?.instFamily}`}{" "}
                                    <div
                                      id="common-color-for-rate"
                                      className={`high-rate items_${item?.data?.alias == "quarter"
                                        ? "Qtly"
                                        : item?.data.alias == "next_quarter"
                                          ? "Bi-Qtly"
                                          : item?.data.alias == "this_week"
                                            ? "Wkly"
                                            : item?.data.alias == "next_week"
                                              ? "Bi-Wkly"
                                              : ""
                                        } `}
                                    >
                                      (
                                      {`${item?.data?.alias == "quarter"
                                        ? "Qtly"
                                        : item?.data?.alias == "next_quarter"
                                          ? "Bi-Qtly"
                                          : item?.data?.alias == "this_week"
                                            ? "Wkly"
                                            : item?.data?.alias == "next_week"
                                              ? "Bi-Wkly"
                                              : ""
                                        }`}
                                      )
                                    </div>
                                  </div>
                                  <div
                                    className={`remove item_${item?.data?.instFamily}`}
                                  ></div>
                                  <div
                                    className={`remove high-rate items_${item?.data?.instFamily}`}
                                  ></div>
                                </div>
                              );
                            })}
                          </TabPanel>
                        </div>
                      </Box>
                    </Modal>
                    {/* <div id="open1">
                  <FormControl className="pair-select-top-line-row-outer" sx={{ m: 1, p: 0, minWidth: 120 }} onClick={()=>{setOpen(true)}}>
                    <span>Spot</span>
                    <Select
                      className="pair-select-top-line-row"
                      id="summary"
                      defaultValue={`${pair}`}
                      value={pair}
                      
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left"
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left"
                        }
                      }}
                    >
                      <div className="menu-pair-head">
                        <div className="menu-pair-head-1">Pair/24h volume</div>
                        <div className="menu-pair-head-2">Last price</div>
                        <div className="menu-pair-head-3">24h change</div>
                        </div>
                        {assetList.map((item, index) => {
                        return (
                          // <MenuItem key={index} value={item}>{`${item.split("-")[0]
                          //   } - ${item.split("-")[1]}`}</MenuItem>
                          <MenuItem key={index} value={item}  className="pair-menu-list-top">
                            <div>{`${item}`}</div>
                            <div className={`remove item_${item}`}></div>
                            <div className={`remove high-rate items_${item}`}></div>
                          </MenuItem>
                        );
                      })}
                     
                      
                      
                    </Select>
                    
                  </FormControl>
                 
                </div> */}
                  </div>
                  {/* <div className="top-col-2">
                    <div id="open1">
                      <FormControl className="pair-select-top-line-row-outer" sx={{ m: 1, minWidth: 120 }}>
                        <span>Spot</span>
                        <Select
                          className="pair-select-top-line-row"
                          id="summary"
                          defaultValue={`${pair}`}
                          value={pair.value}
                          onChange={handleChange1}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left"
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left"
                            }
                          }}
                        >
                          <div className="menu-pair-head">
                            <div className="menu-pair-head-1">Pair/24h volume</div>
                            <div className="menu-pair-head-2">Last price</div>
                            <div className="menu-pair-head-3">24h change</div>
                          </div>
                          {console.log(assetList, 'assetList')}
                          {assetList.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item} className="pair-menu-list-top">
                                <div>{`${item}`}</div>
                                <div className={`remove item_${item}`}></div>
                                <div className={`remove high-rate items_${item}`}></div>
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </div>

                  <div className="top-col-2">
                    <div id="open1">
                      <FormControl className="pair-select-top-line-row-outer" sx={{ m: 1, minWidth: 120 }}>
                        <span>Perpetual</span>
                        <Select
                          className="pair-select-top-line-row"
                          id="summary"
                          defaultValue={`${pair}`}
                          value={pair.value}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left"
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left"
                            }
                          }}
                        >
                          <div className="menu-pair-head">
                            <div className="menu-pair-head-1">Pair/24h volume</div>
                            <div className="menu-pair-head-2">Last price</div>
                            <div className="menu-pair-head-3">24h change</div>
                          </div>
                          {futureData?.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.data.instFamily} className="pair-menu-list-top">
                                <div>
                                  {`${item.data.instFamily}`}
                                  <div id="common-color-for-rate" className={`high-rate items_${item?.data.alias == "quarter"
                                    ? "Qtly"
                                    : item?.data.alias == "next_quarter"
                                      ? "Bi-Qtly"
                                      : item?.data.alias == "this_week"
                                        ? "Wkly"
                                        : item?.data.alias == "next_week"
                                          ? "Bi-Wkly"
                                          : ""
                                    } `}>
                                    ({`${item?.data.alias == "quarter"
                                      ? "Qtly"
                                      : item?.data.alias == "next_quarter"
                                        ? "Bi-Qtly"
                                        : item?.data.alias == "this_week"
                                          ? "Wkly"
                                          : item?.data.alias == "next_week"
                                            ? "Bi-Wkly"
                                            : ""
                                      }`})
                                  </div>
                                </div>


                                <div className={`remove item_${item.data.instFamily}`}></div>
                                <div className={`remove high-rate items_${item.data.instFamily}`}></div>
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </div> */}

                  <div className="top-col-3 comon-flex-top-bot-style">
                    <span
                      style={{
                        color: `${findPercentage(
                          Number(btc?.usdIndexPrice),
                          Number(btc?.ask1Price)
                        ) > 0
                          ? "#10D876 !important"
                          : "#CA3F64 !important"
                          }`,
                      }}
                    // >{`${btc?.open24h
                    //   ? `${Number(btc?.open24h).toLocaleString()}`
                    //   : "0"
                    //   }`}</span>
                    >{`${btc?.ask1Price
                      ? `${Number(btc?.ask1Price).toLocaleString()}`
                      : "0"
                      }`}</span>
                    <span
                      style={{
                        color: `${findPercentage(
                          Number(btc?.ask1Price),
                          Number(btc?.open24h)
                        ) > 0
                          ? "#10D876 !important"
                          : "#CA3F64 !important"
                          } `,
                      }}
                    // >{`${btc?.idxPx
                    //   ? findPercentage(
                    //     Number(btc?.ask1Price),
                    //     Number(btc?.open24h)
                    //   )
                    //   : 0
                    //   }%`}</span>
                    >{`${btc?.price24hPcnt
                      ? btc?.price24hPcnt
                      : 0
                      }%`}</span>
                  </div>
                  <div className="top-col-4 comon-flex-top-bot-style">
                    {/* <span>{pair ? pair.split("-")[0] : "USD"}</span> */}
                    <span>{pair ? pair.slice(0, -4) : "USD"}</span>
                    <span>{`${sellspot?.length > 0
                      ? `${Number(sellspot[0]).toFixed(3).toLocaleString()}`
                      : "0"
                      }`}</span>
                  </div>
                  {/* <div className="top-col-4 comon-flex-top-bot-style">
                    <span>{pair ? pair.split("-")[0] : "USD"}</span>
                    <span>{`${btc?.idxPx
                      ? `${Number(btc?.idxPx).toFixed(3).toLocaleString()}`
                      : "0"
                      }`}</span>
                  </div> */}
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
                    <span>24h volume({pair.slice(0, -4)})</span>
                    <span>{`${btc?.volume24h
                      ? `${Number(btc?.volume24h).toLocaleString()}`
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

            <Grid
              container
              spacing={0}
              className="advance-body-container spot-body-container"
            >
              {/* <Grid item xs={12} sm={12} md={12} lg={2} xl={2} id="marketTop">
                <h5 className="market-advance">Markets</h5>
                <div className="advance-search">
                  <TextField
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    onChange={(e)=>{
                   setsearchpair(e.target.value.toUpperCase())
                    }}
                  />
                </div>
                <AdvanceMarketTab pairs = {pair} searchpair={searchedpair} />
              </Grid> */}

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={7}
                xl={7}
                id="chart-top-bottom"
              >
                <Item
                  className={classes.dashboarbodycls}
                  id="basic-graph-chart"
                >
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
                      </Tabs>
                    </Box>
                    <TabPanel
                      value={value}
                      index={0}
                      className="spot-graph-chart-tab-content"
                    >
                      <TradingViewWidget data={pair} />
                      {/* <TradeViewMain pair={pair} /> */}
                    </TabPanel>
                    <TabPanel
                      value={value}
                      index={1}
                      className="spot-graph-chart-tab-content"
                    >
                      <TradingViewWidget pair={pair} />
                      {/* <TradeViewMain pair={pair} /> */}
                    </TabPanel>
                  </Box>
                </Item>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={2.4}
                xl={2.4}
                className="spot-right-order-book"
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
                md={12}
                lg={2.4}
                xl={2.4}
                className="spot-right-order-book spot-right-order-book-right"
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
                    cat={cat}
                  />
                </Item>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              className="advance-body-container-openhistory-bots spot-body-container-openhistory-bots"
            >
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Item className={classes.dashboarbodycls}>
                  <OpenOrderTab selectedPairs={pair} reload={reload} />
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
