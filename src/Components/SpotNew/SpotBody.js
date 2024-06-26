import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import "./SpotBody.css";
import Classstyle from "../CopyTrade/MasterTrader.module.css";
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
import Consts from "../../Constansts";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AdvanceMarketTab from "../Advance/AdvanceMarketTab";
import TextField from "@mui/material/TextField";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import TradeView from "./TradeView";
import TradeViewMain from "../TradeView/TradeViewMain";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import CircularProgress from "@mui/material/CircularProgress";
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

  select: {
    background: "#F5F6F9",
    paddingLeft: 24,
    paddingTop: 14,
    paddingBottom: 15,
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
var ws1 = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197");
let wsfuture = new WebSocket(
  "wss://ws.okx.com:8443/ws/v5/public?brokerId=197"
);
const endpoint = Consts.spotsocketurl;  // ENDPOINT FOR WEBSOCKET (order book)
const endpoint1 = Consts.spotsocketurl;

const SpotBody = ({ coinName }) => {
  // console.log(coinName, 'namess');

  useEffect(() => {
    if (coinName != undefined && coinName != '') {
      setPair(coinName + 'USDT')
    }
  }, [coinName])

  const [btc, setBtc] = useState();
  const [sideData, setSideData] = useState([]);
  const [eth, setEth] = useState();
  const [xpr, setxrp] = useState();
  const [dash, setdash] = useState();
  const [buyspot, setbuyspot] = useState();
  const [cat, setCat] = useState('USDT');
  const [sellspot, setSellspot] = useState([]);
  const [selected, setSelected] = useState();
  const [searchedpair, setsearchpair] = useState("");
  const classes = useStyles();
  const [assetList, setAssetList] = useState([]);
  // const [assetList, setAssetList] = useState(["BTCUSDT", "ETHUSDT"]);
  const [value, setValue] = React.useState(0);
  const [valuess, setValues] = React.useState(0);

  const [pair, setPair] = useState("BTCUSDT");
  // const [pair, setPair] = useState("BTC-USDT");
  const [pair1, setPair1] = useState("BTC-USDT");
  const [oldpair, setoldpair] = useState("");
  const [selPair, setSelPair] = useState("");
  const [open, setOpen] = useState(false);
  const [allpairs, setAllPairs] = useState([]);
  const [futureData, setfutureData] = useState();
  const [futureData1, setfutureData1] = useState();
  const [futureDataerr, setfutureDataerr] = useState();
  const [selectedpair, setselectedpair] = React.useState("FUTURES");
  const [results, setResults] = useState([]);
  const [sliceResult, setSliceResult] = useState([]);
  const [datas1, setdatas1] = useState();
  const [all, setall] = useState();
  const [searched, setsearched] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [logos, setlogos] = useState([]);
  const [rows, setRows] = useState([]);
  const [reload, setReload] = useState(0);
  const [loadpairs, setLoadPAirs] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleReload = (value) => {
    setReload(value)
  }

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

  // const history = useLocation();

  // useEffect(() => {
  // console.log(history?.state?.selectedMarket,'HISTORY STATE');
  //     if (history?.state?.selectedMarket !== '' || undefined) {
  //       console.log(typeof (history?.state?.selectedMarket,'HISTORY STATE'));
  //         setPair(history?.state?.selectedMarket)
  //       }
  //       else{
  //         setPair("BTC-USDT")
  //       }
  // }, []);

  useEffect(() => {
    setSelPair(pair);
  }, [pair]);

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

  const allPairdatas = {
    op: "subscribe",
    args: allpairs,
  };

  const handleChangess = (event, newValue) => {
    setValues(newValue);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const AllTicker = () => {
    ws1.onopen = (event) => {
      ws1.send(JSON.stringify(allPairdatas));
    };

    ws1.onmessage = (event) => {
      const response = JSON.parse(event.data);

      try {
        if (response?.arg?.channel != "books") {
          if (response?.data?.length > 0) {
            let increase =
              Number(response?.data[0]?.open24h) -
              Number(response?.data[0]?.low24h);
            let price_change =
              (increase / Number(response?.data[0]?.low24h)) * 100;

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

  // useEffect(() => {
  //   AllTicker();

  //   return () => {
  //     ws1.close();
  //     ws1 = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197"); // Close the WebSocket connection on unmount
  //   };
  // }, [allpairs]);

  const Ticker = () => {
    ws.onopen = (event) => {
      ws.send(JSON.stringify(datas));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);

      try {
        if (response?.arg?.channel != "books") {
          //  console.log(response?.data[0],'Spot BOdy1');
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
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
  };

  useEffect(() => {
    Ticker();
    return () => {
      ws.close();
      ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197"); // Close the WebSocket connection on unmount
    };
  }, [selPair]);

  const findPercentage = (lp, op) => {
    let increase = lp - op;
    let price_change = (increase / op) * 100;
    return price_change.toFixed(2);
  };

  const handleList = (data) => {
    setoldpair(pair);
    setPair(data);
    setOpen(false);
  };

  const handleChange1 = (event) => {
    setOpen(true);
    // setoldpair(pair)
    // setPair(event.target.value);
  };

  const handleChange2 = (dts) => {
    setOpen(false);
    setPair1(dts);
  };

  // const getAllTradePairs = async () => {
  //   try {
  //     const { data } = await Axios.get(`/assets/getalltradepair`, {}, {
  //       headers: {
  //         Authorization: localStorage.getItem("Mellifluous"),
  //       }
  //     })

  //     if (data?.result?.length > 0) {
  //       setAssetList([])
  //       setAllPairs([])
  //       data?.result?.forEach(element => {
  //         setAssetList((pre) => [...pre, element?.tradepair])
  //         setAllPairs((pre) => [...pre, {
  //           channel: "index-tickers",
  //           instId: '' + element?.tradepair,
  //         },])
  //       });
  //     }
  //     console.log(allpairs, 'allpairs');
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  var arr = [];
  const getAllTradePairs = async (searchedpair) => {
    setLoadPAirs(true)
    searchedpair != '' ? setInputValue(searchedpair) : setInputValue('')
    try {
      const { data } = await Axios.post(
        `/bybit/getnewpairsbytype`,
        { category: cat, type: 'spot' },
        {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          },
        }
      );

      if (data?.result?.length > 0) {
        setAssetList([]);
        setAllPairs([]);

        // data?.result?.forEach((element) => {
        // setAllPairs((pre) => [
        //   ...pre,
        //   {
        //     channel: "index-tickers",
        //     instId: "" + element?.data?.instId,
        //   },
        // ]);
        // });

        if (searchedpair) {
          const filtered = [];
          const use = localStorage.getItem('use');

          // for (let j = 0; j < data.result.length; j++) {
          //   const item = data.result[j];
          //   if (item.data.instId.includes(searchedpair)) {
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
                check: item?.data?.users_id?.includes(use) === true ? true : false,
              });
            }
          }

          setAssetList(filtered);
        } else {
          const arr = [];
          const use = localStorage.getItem('use');

          for (var i = 0; i < data?.result?.length; i++) {
            const element = data.result[i];

            arr.push({
              pairs: element?.symbol,
              check: element?.users_id?.includes(use) === true ? true : false
            })

          }

          setAssetList(arr);

          // for (let i = 0; i < data.result.length; i++) {
          //   const element = data.result[i];
          //   console.log(element,'*****ele');

          // if (element?.data?.instId?.split("-")[1] == "USDT") {
          // const foundPair = sideData.find((sdItem) => sdItem?.symbol == element?.data?.instId);
          // console.log(foundPair,'FPAIR')
          // alert(foundPair?.lowPrice24h)
          //     arr.push({
          //       pairs: element?.symbol,
          //       check: element?.users_id?.includes(use) == true ? element.data?.users_id.includes(use) : false,
          //     });
          // }
          // }

          // for (let i = 0; i < data.result.length; i++) {
          //   const element = data.result[i];
          //   if (element?.data?.instId?.split("-")[1] != "USDT") {
          //     const foundPair = sideData.find((sdItem) => sdItem?.symbol == element?.data?.instId);
          // console.log(foundPair,"ramesh")
          //     arr.push({
          //       pairs: `${element?.baseCoin}/${element?.quoteCoin}`,
          //       check: element?.users_id?.includes(use) == true ? element?.data?.users_id.includes(use) : false,
          // lastPrice: foundPair?.lastPrice || 0,
          // highPrice24h: foundPair?.highPrice24h || 0,
          //     });
          //   }
          // }

          setAssetList(arr);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadPAirs(false)
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
        if (item?.data?.instFamily?.split("-")[1] == "USDT") {
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

  const getAssets = async () => {
    try {
      setRows([]);
      setdatas1("");
      const { data } = await Axios.post(
        `/assets/marketPairs`,
        { type: "spot" },
        {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          },
        }
      );
      const logos = await Axios.get(`/assets/getAssetIcon`);
      setlogos(logos);
      if (searched) {
        const filtered = [];
        for (let j = 0; j < data.result.length; j++) {
          if (data.result[j].data.instId.includes(searched)) {
            filtered.push(data.result[j]);
          }
        }
        setall(filtered);
      } else {
        var sparr = [];
        for (let i = 0; i < data?.result.length; i++) {
          if (data?.result[i].data.instId.split("-")[1] === "USDT") {
            sparr.push(data?.result[i]);
          }
        }
        setall(sparr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (all?.length > 0) {
  //     setdatas1();
  //     const dt = {
  //       op: "subscribe",
  //       args: [],
  //     };

  //     for (let i = 0; i < all?.length; i++) {
  //       const dts = {
  //         instId: all[i]?.data?.instId,
  //         image: all[i]?.data?.image,
  //         high: "0",
  //         change: "0",
  //         low: "0",
  //         short: "0",
  //         long: "0",
  //         vitamin: "0",
  //       };

  //       setRows((pre) => [...pre, dts]);
  //     }

  //     for (let i = 0; i < 10; i++) {
  //       dt?.args?.push({
  //         channel: "tickers",
  //         instId: all[i]?.data?.instId,
  //       });
  //     }
  //     setdatas1(dt);
  //   }
  // }, [all, searched]);

  // useEffect(() => {
  //   if (page * rowsPerPage > 0) {
  //     wss.onopen = (event) => {
  //       wss.send(
  //         JSON.stringify({
  //           op: "unsubscribe",
  //           args: datas.args,
  //         })
  //       );
  //     };
  //     const dt = {
  //       op: "subscribe",
  //       args: [],
  //     };
  //     setdatas1();
  //     for (let i = page + rowsPerPage; i < (page + 1) * rowsPerPage; i++) {
  //       dt?.args?.push({
  //         channel: "tickers",
  //         instId: all[i]?.data?.instId,
  //       });
  //     }
  //     setdatas1(dt);
  //   }
  // }, [page, rowsPerPage]);

  // const socket = async () => {
  //   wss.onopen = (event) => {
  //     wss.send(JSON.stringify(datas));
  //   };

  //   wss.onmessage = (event) => {
  //     const response = JSON.parse(event.data);
  //     try {
  //       const isdata = "classgreens";
  //       const isdata1 = "classreds";
  //       const increase = response?.data[0]?.last - response?.data[0]?.open24h;
  //       const price_change = (increase / response?.data[0]?.open24h) * 100;
  //       $(`.price-${response?.data[0]?.instId}`).html(response?.data[0]?.last);
  //       $(`.high-${response?.data[0]?.instId}`).html(
  //         response?.data[0]?.high24h
  //       );
  //       $(`.low-${response?.data[0]?.instId}`).html(response?.data[0]?.low24h);
  //       $(`.volume-${response?.data[0]?.instId}`).html(
  //         response?.data[0]?.vol24h
  //       );
  //       // $(`.change-${response?.data[0]?.instId}`).html(<span style={{ color: "green" }}>{parseFloat(price_change).toFixed(2)}%</span>)
  //       $(`.change-${response?.data[0]?.instId}`).html(
  //         parseFloat(price_change).toFixed(2) > 0
  //           ? '<span class="' +
  //               isdata +
  //               '">' +
  //               parseFloat(price_change).toFixed(2) +
  //               "% </span>"
  //           : '<span class="' +
  //               isdata1 +
  //               '">' +
  //               parseFloat(price_change).toFixed(2) +
  //               "% </span>"
  //       );

  //       $(`.ts-${response?.data[0]?.instId}`).html(response?.data[0]?.ts);
  //       // rows.map(item => {
  //       //   if(item.name === response.data[0].instId)
  //       //   setSelected(item)
  //       //   console.log(item.name,response.data[0].instId,response.data[0].askSz,"price");
  //       //   item.price =response.data[0].askSz
  //       //   setSelected(item)
  //       // })

  //       // rows?.forEach((element) => {
  //       //   if (element?.name === response?.data[0]?.instId) {
  //       //     console.log(response?.data[0]?.askSz, "adf")
  //       //     element.price = response?.data[0]?.askSz
  //       //   }
  //       // })

  //       // setRows(
  //       //   rows?.map((item) => {
  //       //     if (item?.name === response?.data[0]?.instId) {
  //       //       return [...rows, { name: item?.name, price: response?.data[0]?.askSz }]
  //       //     }
  //       //   })
  //       // )

  //       // if (rows !== undefined) {
  //       //   const newlist = rows.map((item) => {
  //       //     if (item?.name === response?.data[0]?.instId) {
  //       //       const update = { name: item?.name, price: response?.data[0]?.askSz }
  //       //       return update
  //       //     }
  //       //   })
  //       //   setRows(newlist)
  //       // }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  // };

  // useEffect(() => {
  //   getAssets();
  // }, [searched]);

  // useEffect(() => {
  //   if (datas1?.args?.length > 0) {
  //     wss.close();
  //     wss = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197"); // Close the WebSocket connection on unmount
  //     socket();
  //   }
  // }, [datas1, searched]);

  // useEffect(() => {
  //   if (all?.length > 0) {
  //     setdatas1();
  //     const dt = {
  //       op: "subscribe",
  //       args: [],
  //     };

  //     for (let i = 0; i < all?.length; i++) {

  //       const dts = {
  //         instId: all[i]?.data?.instId,
  //         image: all[i]?.data?.image,
  //         high: "0",
  //         change: "0",
  //         low: "0",
  //         short: "0",
  //         long: "0",
  //         vitamin: "0",
  //       };

  //       // setRows((pre) => [...pre, dts]);
  //     }

  //     for (let i = 0; i < 10; i++) {
  //       dt?.args?.push({
  //         channel: "tickers",
  //         instId: all[i]?.data?.instId,
  //       });
  //     }
  //     setdatas1(dt);
  //   }
  // }, [all]);

  // const socket = async () => {
  //   ws.onopen = (event) => {
  //     ws.send(JSON.stringify(datas));
  //   };

  //   ws.onmessage = (event) => {
  //     const response = JSON.parse(event.data);
  //     try {
  //       const isdata = "classgreens";
  //       const isdata1 = "classreds";
  //       const increase = response?.data[0]?.last - response?.data[0]?.open24h;
  //       const price_change = (increase / response?.data[0]?.open24h) * 100;
  //       $(`.price-${response?.data[0]?.instId}`).html(response?.data[0]?.last);
  //       $(`.high-${response?.data[0]?.instId}`).html(
  //         response?.data[0]?.high24h
  //       );
  //       $(`.low-${response?.data[0]?.instId}`).html(response?.data[0]?.low24h);
  //       $(`.volume-${response?.data[0]?.instId}`).html(
  //         response?.data[0]?.vol24h
  //       );
  //       // $(`.change-${response?.data[0]?.instId}`).html(<span style={{ color: "green" }}>{parseFloat(price_change).toFixed(2)}%</span>)
  //       $(`.change-${response?.data[0]?.instId}`).html(
  //         parseFloat(price_change).toFixed(2) > 0
  //           ? '<span class="' +
  //           isdata +
  //           '">' +
  //           parseFloat(price_change).toFixed(2) +
  //           "% </span>"
  //           : '<span class="' +
  //           isdata1 +
  //           '">' +
  //           parseFloat(price_change).toFixed(2) +
  //           "% </span>"
  //       );

  //       $(`.ts-${response?.data[0]?.instId}`).html(response?.data[0]?.ts);
  //       // rows.map(item => {
  //       //   if(item.name === response.data[0].instId)
  //       //   setSelected(item)
  //       //   console.log(item.name,response.data[0].instId,response.data[0].askSz,"price");
  //       //   item.price =response.data[0].askSz
  //       //   setSelected(item)
  //       // })

  //       // rows?.forEach((element) => {
  //       //   if (element?.name === response?.data[0]?.instId) {
  //       //     console.log(response?.data[0]?.askSz, "adf")
  //       //     element.price = response?.data[0]?.askSz
  //       //   }
  //       // })

  //       // setRows(
  //       //   rows?.map((item) => {
  //       //     if (item?.name === response?.data[0]?.instId) {
  //       //       return [...rows, { name: item?.name, price: response?.data[0]?.askSz }]
  //       //     }
  //       //   })
  //       // )

  //       // if (rows !== undefined) {
  //       //   const newlist = rows.map((item) => {
  //       //     if (item?.name === response?.data[0]?.instId) {
  //       //       const update = { name: item?.name, price: response?.data[0]?.askSz }
  //       //       return update
  //       //     }
  //       //   })
  //       //   setRows(newlist)
  //       // }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  // };

  // useEffect(() => {
  //   if (datas?.args?.length > 0) {
  //     ws.close();
  //     ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197"); // Close the WebSocket connection on unmount
  //     socket();
  //   }
  // }, [datas]);

  const handleClearClick = () => {
    getAllTradePairs();
    setInputValue('');
  }

  useEffect(() => {
    getAllTradePairs();
  }, [cat]);

  useEffect(() => {
    futurepairs();
  }, []);

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

  const handlefavpair = async (e, check, value) => {
    try {
      e.preventDefault();

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
        getAllTradePairs()
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  useEffect(() => {
    // handleOrderBookData()
    const client1 = new WebSocket(endpoint1);

    // console.log('Attempting to connect to WebSocket', endpoint);

    client1.onopen = () => {
      // console.log('WebSocket Client Connected');
      setInterval(() => {
        client1.send('ping'); // Send ping to keep connection alive
      }, 30000);

      assetList?.forEach(pairData => {
        const pair = pairData?.pairs
        client1.send(JSON.stringify({ op: 'subscribe', args: [`tickers.${pair}`] }));
      });
    };

    client1.onmessage = (event) => {
      // setTimeout(() => {
      const response = JSON.parse(event.data);
      // console.log('DATATATATATATATA', response);

      // Handle incoming messages from WebSocket

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

      // }, 2000)

    };

    client1.onclose = () => {
      // console.log('WebSocket Connection Closed');
      // Handle WebSocket closed
    };

    // client1.onerror = (error) => {
    //   console.error('WebSocket Error:', error);
    //   // Handle WebSocket errors
    // };

    return () => {
      // console.log('Cleaning up WebSocket connection');
      client1.close();
      // const client1 = new WebSocket(endpoint1);
    };
  }, [assetList]);

  // useEffect(() => {
  //   var symbol = pair
  //   symbol = symbol.replace('-', '');
  //   const client = new WebSocket(endpoint);

  //   console.log('Attempting to connect to WebSocket', endpoint);

  //   client.onopen = () => {
  //     console.log('WebSocket Client Connected');
  //     setInterval(() => {
  //       client.send('ping'); // Send ping to keep connection alive
  //     }, 30000);

  //     client.send(JSON.stringify({ op: 'subscribe', args: [`tickers.${symbol}`] }));
  //   };

  //   client.onmessage = (event) => {

  //     const response = JSON.parse(event.data);
  //     console.log('Message received from socket HIGH & LOW', response?.data);
  //     // Handle incoming messages from WebSocket
  //     setBtc(response?.data)
  //     // if (response?.data?.b.length > 0) {

  //     //   if ( response?.data?.b[0] != 0 && response?.data?.b[1] != 0 ) {
  //     //     var values = response?.data?.b[0];
  //     //     values.push(response?.data?.s);
  //     //     console.log(values,'REDRESPONSESPOT');
  //     //     setbuyspot(values);
  //     //   }

  //     //   if ( response?.data?.a[0] != 0 && response?.data?.a[1] != 0 ) {
  //     //     var values1 = response?.data?.a[0];
  //     //     values.push(response?.data?.s);
  //     //     console.log(values1,'GREENRESPONSESPOT');
  //     //     setSellspot(values1);
  //     //   }

  //     // }

  //   };

  //   client.onclose = () => {
  //     console.log('WebSocket Connection Closed');
  //     // Handle WebSocket closed
  //   };

  //   client.onerror = (error) => {
  //     console.error('WebSocket Error:', error);
  //     // Handle WebSocket errors
  //   };

  //   // Cleanup function
  //   return () => {
  //     console.log('Cleaning up WebSocket connection');
  //     client.close();
  //   };
  // }, [pair]); 


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
        // console.log(data?.result,'RESULT');
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

  return (
    <div className="dashboard-body spot-body spot-body-content">
      <Toaster />
      <Box sx={{ flexGrow: 1 }}>
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

                <span style={{ textAlign: "left" }}>Spot</span>
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
                      <Grid item xs={12} sm={12} md={12} lg={4} xl={4} style={{ maxWidth: '100%' }}>
                        <Stack className="button-stack-coin">
                          <Button onClick={() => { setCat('USDT') }} className={cat === 'USDT' ? 'activecls' : null}>USDT</Button>
                          <Button onClick={() => { setCat('USDC') }} className={cat === 'USDC' ? 'activecls' : null}>USDC</Button>
                          <Button onClick={() => { setCat('EUR') }} className={cat === 'EUR' ? 'activecls' : null}>EUR</Button>
                          <Button onClick={() => { setCat('BTC') }} className={cat === 'BTC' ? 'activecls' : null}>BTC</Button>
                          <Button onClick={() => { setCat('ETH') }} className={cat === 'ETH' ? 'activecls' : null}>ETH</Button>
                          <Button onClick={() => { setCat('DAI') }} className={cat === 'DAI' ? 'activecls' : null}>DAI</Button>
                          <Button onClick={() => { setCat('BRZ') }} className={cat === 'BRZ' ? 'activecls' : null}>BRZ</Button>
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
                            inputProps={{ "aria-label": "search google maps" }}
                            value={inputValue}
                            onChange={(e) => {
                              getAllTradePairs(e.target.value.toUpperCase());
                            }}
                          />
                          <IconButton
                            type="button"
                            sx={{ p: "10px" }}
                            aria-label="search"
                            onClick={handleClearClick}
                          >
                            {/* <SearchIcon /> */}
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
                        {/* {console.log(assetList[0],'assertlist')} */}
                        {assetList.length <= 0 ? (
                          <div style={{ padding: "1rem", textAlign: 'center' }}>
                            {/* <CircularProgress size={60}  /> */}
                            {<p>Pairs Not Found</p>}
                          </div>
                        ) : (assetList.map((item, index) => {
                          return (
                            // <MenuItem key={index} value={item}>{`${item.split("-")[0]
                            //   } - ${item.split("-")[1]}`}</MenuItem>
                            <div
                              key={index}
                              className="pair-menu-lists-top"
                              style={{ cursor: "pointer" }}
                            >

                              <div className="coin-block-first">
                                {/* {console.log(item?.check, item?.pairs, 'logs')} */}
                                {item?.check ?
                                  <StarIcon onClick={(e) => { handlefavpair(e, item?.check, item?.pairs); setOpen(true) }} /> :
                                  <StarBorderIcon onClick={(e) => { handlefavpair(e, item?.check, item?.pairs); setOpen(true) }} />
                                }
                                {/* <input type="checkbox" checked={item?.check} onClick={(e) => { handlefavpair(e,item?.pairs) }}/> */}
                                <div onClick={() => handleList(item?.pairs)}>
                                  {`${item?.pairs}`}
                                </div>

                              </div>
                              {/* <input type="checkbox" checked={item?.check} onClick={(e) => { handlefavpair(e,item?.pairs) }}></input> */}
                              <div className={`remove item_${item?.pairs ? item?.pairs : 0}`} onClick={() => handleList(item?.pairs)}>{Number(item?.lastPrice ? item?.lastPrice : 0).toFixed(6)}</div>
                              <div
                                className={`remove high-rate items_${item?.pairs ? item?.pairs : 0}`} onClick={() => handleList(item?.pairs)}
                              >{Number(item?.highPrice24h ? item?.highPrice24h : 0).toFixed(6) || 0}</div>
                            </div>
                          );
                        }))}
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
                                //   `${item.data.instFamily} (${
                                //     item?.data.alias == "quarter"
                                //       ? "Qtly"
                                //       : item?.data.alias == "next_quarter"
                                //       ? "Bi-Qtly"
                                //       : item?.data.alias == "this_week"
                                //       ? "Wkly"
                                //       : item?.data.alias == "next_week"
                                //       ? "Bi-Wkly"
                                //       : ""
                                //   })`,
                                //   "item.data.instFamily"
                                // );
                                handleChange2(
                                  `${item.data.instFamily} (${item?.data.alias == "quarter"
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
                                {`${item.data.instFamily}`}{" "}
                                <div
                                  id="common-color-for-rate"
                                  className={`high-rate items_${item?.data.alias == "quarter"
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
                                  {`${item?.data.alias == "quarter"
                                    ? "Qtly"
                                    : item?.data.alias == "next_quarter"
                                      ? "Bi-Qtly"
                                      : item?.data.alias == "this_week"
                                        ? "Wkly"
                                        : item?.data.alias == "next_week"
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
                    <span>Perpetuals</span>
                    <Select
                      className="pair-select-top-line-row"
                      id="summary"
                      defaultValue={`${pair}`}
                      value={pair?.value}
                       onChange={ ()=>{handleChange2()}  }
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
                     
                      {futureData1?.map((item, index) => {
                        return (
                        
                          <MenuItem key={index} value={item?.data?.instFamily} className="pair-menu-list-top" onClick={() => {
                            console.log(`${item.data.instFamily} (${item?.data.alias == "quarter"
                              ? "Qtly"
                              : item?.data.alias == "next_quarter"
                                ? "Bi-Qtly"
                                : item?.data.alias == "this_week"
                                  ? "Wkly"
                                  : item?.data.alias == "next_week"
                                    ? "Bi-Wkly"
                                    : ""})`, "item.data.instFamily")
                            handleChange2(`${item.data.instFamily} (${item?.data.alias == "quarter"
                              ? "Qtly"
                              : item?.data.alias == "next_quarter"
                                ? "Bi-Qtly"
                                : item?.data.alias == "this_week"
                                  ? "Wkly"
                                  : item?.data.alias == "next_week"
                                    ? "Bi-Wkly"
                                    : ""})`)
                          }}>
                            <div>{`${item.data.instFamily}`}  <div id="common-color-for-rate" className={`high-rate items_${item?.data.alias == "quarter"
                              ? "Qtly"
                              : item?.data.alias == "next_quarter"
                                ? "Bi-Qtly"
                                : item?.data.alias == "this_week"
                                  ? "Wkly"
                                  : item?.data.alias == "next_week"
                                    ? "Bi-Wkly"
                                    : ""
                              } `} >
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
                            <div className={`remove item_${item?.data?.instFamily}`}></div>
                            <div className={`remove high-rate items_${item?.data?.instFamily}`}></div>
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
                    color: `${findPercentage(Number(btc?.idxPx), Number(btc?.open24h)) >
                      0
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
                    color: `${findPercentage(Number(btc?.ask1Price), Number(btc?.open24h)) >
                      0
                      ? "#10D876 !important"
                      : "#CA3F64 !important"
                      } `,
                  }}
                // >{`${btc?.idxPx
                //   ? findPercentage(Number(btc?.ask1Price), Number(btc?.open24h))
                //   : 0
                //   }%`}</span>
                >{`${btc?.price24hPcnt
                  ? btc?.price24hPcnt
                  : 0
                  }%`}</span>
              </div>
              <div className="top-col-4 comon-flex-top-bot-style">
                <span>{pair ? pair.split("-")[0] : "USD"}</span>
                <span>{`${sellspot?.length > 0
                  ? `${Number(sellspot[0]).toFixed(3).toLocaleString()}`
                  : "0"
                  }`}</span>
              </div>
              <div className="top-col-5 comon-flex-top-bot-style">
                <span>24h low</span>
                <span>{`${btc?.lowPrice24h ? `${Number(btc?.lowPrice24h).toLocaleString()}` : "0"
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
              {/* <div className="top-col-3 comon-flex-top-bot-style">
                <span
                  style={{
                    color: `${findPercentage(Number(btc?.idxPx), Number(btc?.open24h)) >
                      0
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
                    color: `${findPercentage(Number(btc?.idxPx), Number(btc?.open24h)) >
                      0
                      ? "#10D876 !important"
                      : "#CA3F64 !important"
                      } `,
                  }}
                >{`${btc?.idxPx
                  ? findPercentage(Number(btc?.idxPx), Number(btc?.open24h))
                  : 0
                  }%`}</span>
              </div>
              <div className="top-col-4 comon-flex-top-bot-style">
                <span>{pair ? pair.split("-")[0] : "USD"}</span>
                <span>{`${btc?.idxPx
                  ? `${Number(btc?.idxPx).toFixed(3).toLocaleString()}`
                  : "0"
                  }`}</span>
              </div>
              <div className="top-col-5 comon-flex-top-bot-style">
                <span>24h low</span>
                <span>{`${btc?.low24h ? `${Number(btc?.low24h).toLocaleString()}` : "0"
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
              </div> */}
              {/* <div className="top-col-8 comon-flex-top-bot-style">
                <span>24h turnover({pair.split('-')[1]})</span>
                <span>0.00</span>
              </div> */}
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={0} className="spot-body-container">
          {/* <Grid item xs={12} sm={12} md={12} lg={2} xl={2} id="marketTop">
            <h6 className="market-advance order-book-spot">Markets</h6>
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
          </Grid> */}

          <Grid
            item
            xs={12}
            sm={12}
            md={12} state
            lg={7}
            xl={7}
            id="chart-top-bottom"
          >
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
                  <TradingViewWidget data={pair} />
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
              market={btc?.idxPx}
            />{" "}
            {/* Red */}
            <BuyingTable
              ticker={buyspot}
              setSelected={setSelected}
              pair={pair}
              market={btc?.idxPx}
            />{" "}
            {/* Green */}
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
              <BuySell selected={selected} pair={pair} market={btc?.idxPx} reload={handleReload} cat={cat} />
            </Item>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={0}
          className="spot-body-container-openhistory-bots"
        >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {/* <TopMovers /> */}
            <Item className={classes.dashboarbodycls}>
              <OpenOrderTab selectedPairs={pair} reload={reload} />
            </Item>
          </Grid>
        </Grid>
      </Box>

      {/* {open && ( */}

      {/* )} */}
    </div>
  );
};

export default SpotBody;
