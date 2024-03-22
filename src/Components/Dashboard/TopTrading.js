import * as React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import charttrendone from "../../images/chart-trend-1.png";
import charttrendtwo from "../../images/chart-trend-2.png";
import charttrendthree from "../../images/chart-trend-3.png";
import charttrendfour from "../../images/chart-trend-4.png";
import charttrendfive from "../../images/chart-trend-5.png";
import Axios from "../../Axios";

import coinone from "../../images/coin-1.png";
import cointwo from "../../images/coin-2.png";
import cointhree from "../../images/coin-3.png";
import Dashcoin from "../../images/coin-stat-4.png";
import LTCCOIN from "../../images/litecoin-ltc-logo.png";
import { FirstPage } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  tabmain: {},
  tabletoptrade: {
    background: "transparent !important",
    boxShadow: "none !important",
    "& th": {
      color: "#8B95A3 !important",
      border: "none !important",
      whiteSpace: "nowrap",
    },
    "& td": {
      color: "#fff !important",
      border: "none !important",
      paddingTop: "2px",
      paddingBottom: "2px",
    },
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

function createData(coinimg, coins, coinpair, lastprice, hours, trend) {
  return { coinimg, coins, coinpair, lastprice, hours, trend };
}

export default function TopTrading() {
  const [btc, setBtc] = React.useState();
  const [eth, setEth] = React.useState();
  const [xpr, setxrp] = React.useState();
  const [dash, setdash] = React.useState();

  const [btc1, setBtc1] = React.useState();
  const [eth1, setEth1] = React.useState();
  const [xpr1, setxrp1] = React.useState();
  const [dash1, setdash1] = React.useState();

  const [value, setValue] = React.useState(0);
  let pairslist = [];

  const findPercentage = (lp, op) => {
    let increase = lp - op;
    let price_change = (increase / op) * 100;
    return price_change.toFixed(2);
  };

  const rows = [
    createData(
      coinone,
      "BTC",
      "USDT",
      `${value == 0 ? btc != undefined
        ? `${Number(btc?.idxPx).toLocaleString()}`
        : "0" : btc1 != undefined
        ? `${Number(btc1?.last).toLocaleString()}`
        : "0"
      }`,
      `${value == 0
        ? btc?.idxPx
          ? findPercentage(Number(btc?.idxPx), Number(btc?.open24h))
          : "0"
        : btc1?.last
          ? findPercentage(Number(btc1?.last), Number(btc1?.open24h))
          : "0"
      }`,
      `${value == 0
        ? btc?.idxPx
          ? findPercentage(Number(btc?.idxPx), Number(btc?.open24h)) > 0
            ? charttrendone
            : charttrendtwo
          : charttrendone
        : btc1?.last
          ? findPercentage(Number(btc1?.last), Number(btc1?.open24h)) > 0
            ? charttrendone
            : charttrendtwo
          : charttrendone
      }`
    ),

    createData(
      cointwo,
      "ETH",
      "USDT",
      `${value == 0 ? eth != undefined
        ? `${Number(btc?.idxPx).toLocaleString()}`
        : "0" : eth1 != undefined
        ? `${Number(eth1?.last).toLocaleString()}`
        : "0"
      }`,
      `${value == 0
        ? eth?.idxPx
          ? findPercentage(Number(eth?.idxPx), Number(eth?.open24h))
          : "0"
        : eth1?.last
          ? findPercentage(Number(eth1?.last), Number(eth1?.open24h))
          : "0"
      }`,
      `${value == 0
        ? eth?.idxPx
          ? findPercentage(Number(eth?.idxPx), Number(eth?.open24h)) > 0
            ? charttrendone
            : charttrendtwo
          : charttrendone
        : eth1?.last
          ? findPercentage(Number(eth1?.last), Number(eth1?.open24h)) > 0
            ? charttrendone
            : charttrendtwo
          : charttrendone
      }`
    ),

    createData(
      cointhree,
      "XRP",
      "USDT",
      `${value == 0 ? xpr != undefined
        ? `${Number(xpr?.idxPx).toLocaleString()}`
        : "0" : xpr1 != undefined
        ? `${Number(xpr1?.last).toLocaleString()}`
        : "0"
      }`,
      `${value == 0
        ? xpr?.idxPx
          ? findPercentage(Number(xpr?.idxPx), Number(xpr?.open24h))
          : "0"
        : xpr1?.last
          ? findPercentage(Number(xpr1?.last), Number(xpr1?.open24h))
          : "0"
      }`,
      `${value == 0
        ? xpr?.idxPx
          ? findPercentage(Number(xpr?.idxPx), Number(xpr?.open24h)) > 0
            ? charttrendone
            : charttrendtwo
          : charttrendone
        : xpr1?.last
          ? findPercentage(Number(xpr1?.last), Number(xpr1?.open24h)) > 0
            ? charttrendone
            : charttrendtwo
          : charttrendone
      }`
    ),

    createData(
      value == 0 ? Dashcoin : LTCCOIN,
      value == 0 ? "DASH" : "LTC",
      "USDT",
      `${value == 0 ? dash != undefined
        ? `${Number(dash?.idxPx).toLocaleString()}`
        : "0" : dash1 != undefined
        ? `${Number(dash1?.last).toLocaleString()}`
        : "0"
      }`,
      `${value == 0
        ? dash?.idxPx
          ? findPercentage(Number(dash?.idxPx), Number(dash?.open24h))
          : "0"
        : dash1?.last
          ? findPercentage(Number(dash1?.last), Number(dash1?.open24h))
          : "0"
      }`,
      `${value == 0
        ? dash?.idxPx
          ? findPercentage(Number(dash?.idxPx), Number(dash?.open24h)) > 0
            ? charttrendone
            : charttrendtwo
          : charttrendone
        : dash1?.last
          ? findPercentage(Number(dash1?.last), Number(dash1?.open24h)) > 0
            ? charttrendone
            : charttrendtwo
          : charttrendone
      }`
    ),
  ];

  let ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197");

  const Ticker = () => {
    let datas = {
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
          instId: "DASH-USDT",
        },
        {
          channel: "tickers",
          instId: pairslist[0]?.instId,
        },
        {
          channel: "tickers",
          instId: pairslist[1]?.instId,
        },
        {
          channel: "tickers",
          instId: pairslist[2]?.instId,
        },
        {
          channel: "tickers",
          instId: pairslist[3]?.instId,
        },
      ],
    };

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
        } else if (response?.arg?.instId == "DASH-USDT") {
          setdash(response?.data[0]);
        } else if (
          response?.arg?.channel == "tickers" &&
          response?.arg?.instId.split("-")[0] == "BTC"
        ) {
          setBtc1(response?.data[0]);
        } else if (
          response?.arg?.channel == "tickers" &&
          response?.arg?.instId.split("-")[0] == "ETH"
        ) {
          setEth1(response?.data[0]);
        } else if (
          response?.arg?.channel == "tickers" &&
          response?.arg?.instId.split("-")[0] == "XRP"
        ) {
          setxrp1(response?.data[0]);
        } else if (
          response?.arg?.channel == "tickers" &&
          response?.arg?.instId.split("-")[0] == "LTC"
        ) {
          setdash1(response?.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
  };

  useEffect(() => {

    if (localStorage.getItem("Mellifluous")) {
      try {
        (async () => {

          let getdata = await Axios.post(
            "/assets/futurePairs",
            { pair: "FUTURES" },
            {
              headers: {
                Authorization: localStorage.getItem("Mellifluous"),
              },
            }
          );
          if (getdata?.data) {
            let BTC = getdata.data.result.find((item) => {
              return item.data.instFamily == "BTC-USDT";
            });
            let ETH = getdata.data.result.find((item) => {
              return item.data.instFamily == "ETH-USDT";
            });
            let XRP = getdata.data.result.find((item) => {
              return item.data.instFamily == "XRP-USDT";
            });
            let LTC = getdata.data.result.find((item) => {
              return item.data.instFamily == "LTC-USDT";
            });
            let coinname = [];
            pairslist[0] = BTC.data;
            pairslist[1] = ETH.data;
            pairslist[2] = XRP.data;
            pairslist[3] = LTC.data;
            Ticker();
          }
        })();
      } catch (error) {
        console.log("🚀 ~ file: TopTrading.js:373 ~ useEffect ~ error:", error)

      }

    } else {
      Ticker();
    }



    return () => {
      ws.close(); // Close the WebSocket connection on unmount
      ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197");
    };
  }, []);



  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          className={classes.tabmain}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Hot Spot" {...a11yProps(0)} />
          {localStorage.getItem("Mellifluous") && <Tab label="Hot Futures" {...a11yProps(1)} />}
          {localStorage.getItem("Mellifluous") && <Tab label="24H Volume" {...a11yProps(2)} />}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TableContainer component={Paper} className={classes.tabletoptrade}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Pair</TableCell>
                <TableCell align="left">Last Price</TableCell>
                <TableCell align="left">24h Change</TableCell>
                <TableCell align="left">Trend</TableCell>
                <TableCell align="left">Trade </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row" className="pair-coin">
                    <div className="pair-coin-coins">
                      <div className="coinimg">
                        <img src={row.coinimg} alt="coin-img" />
                      </div>
                      {row.coins}{" "}
                      <span className="coinpair-pair">/{row.coinpair}</span>
                    </div>
                  </TableCell>
                  <TableCell align="left">{row.lastprice}</TableCell>
                  <TableCell align="left">
                    <span
                      style={
                        row.hours > 0
                          ? { color: "#10D876" }
                          : { color: "#CA3F64" }
                      }
                    >
                      {row.hours}%
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    <img src={row.trend} />
                  </TableCell>
                  <TableCell align="left">
                    <Link to="/spot" className="trade-button">Trade</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableContainer component={Paper} className={classes.tabletoptrade}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Pair</TableCell>
                <TableCell align="left">Last Price</TableCell>
                <TableCell align="left">24h Change</TableCell>
                <TableCell align="left">Trend</TableCell>
                <TableCell align="left">Trade </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row" className="pair-coin">
                    <div className="pair-coin-coins">
                      <div className="coinimg">
                        <img src={row.coinimg} alt="coin-img" />
                      </div>
                      {row.coins}{" "}
                      <span className="coinpair-pair">/{row.coinpair}</span>
                    </div>
                  </TableCell>
                  <TableCell align="left">{row.lastprice}</TableCell>
                  <TableCell align="left">
                    <span
                      style={
                        row.hours > 0
                          ? { color: "#10D876" }
                          : { color: "#CA3F64" }
                      }
                    >
                      {row.hours}%
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    <img src={row.trend} />
                  </TableCell>
                  <TableCell align="left">
                    <Link to="/spot" className="trade-button">Trade</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TableContainer component={Paper} className={classes.tabletoptrade}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Pair</TableCell>
                <TableCell align="left">Last Price</TableCell>
                <TableCell align="left">24h Change</TableCell>
                <TableCell align="left">Trend</TableCell>
                <TableCell align="left">Trade </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row" className="pair-coin">
                    <div className="pair-coin-coins">
                      <div className="coinimg">
                        <img src={row.coinimg} alt="coin-img" />
                      </div>
                      {row.coins}{" "}
                      <span className="coinpair-pair">/{row.coinpair}</span>
                    </div>
                  </TableCell>
                  <TableCell align="left">{row.lastprice}</TableCell>
                  <TableCell align="left">
                    <span
                      style={
                        row.hours > 0
                          ? { color: "#10D876" }
                          : { color: "#CA3F64" }
                      }
                    >
                      {row.hours}%
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    <img src={row.trend} />
                  </TableCell>
                  <TableCell align="left">
                    <Link to="/spot" className="trade-button">Trade</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Box>
  );
}
