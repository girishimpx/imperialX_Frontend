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
import { useLocation } from "react-router-dom";
import coinone from "../../images/coin-1.png";
import cointwo from "../../images/coin-2.png";
import cointhree from "../../images/coin-3.png";
import Dashcoin from "../../images/coin-stat-4.png";
import LTCCOIN from "../../images/litecoin-ltc-logo.png";
import { FirstPage } from "@mui/icons-material";
import Consts from "../../Constansts";

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
  const [LTC, setLTC] = React.useState();
  const [btc1, setBtc1] = React.useState();
  const [eth1, setEth1] = React.useState();
  const [xpr1, setxrp1] = React.useState();
  const [dash1, setdash1] = React.useState();

  const [value, setValue] = React.useState(0);
  let pairslist = [];

  const endpoint = Consts.spotsocketurl;  // ENDPOINT FOR WEBSOCKET (order book)

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
        ? `${Number(btc?.lastPrice).toLocaleString()}`
        : "0"
        : btc != undefined
          ? `${Number(btc?.lastPrice).toLocaleString()}`
          : "0"
      }`,
      `${value == 0
        ? btc?.price24hPcnt
          ?
          `${Number(btc?.price24hPcnt).toFixed(4)}`
          //  findPercentage(Number(btc?.idxPx), Number(btc?.open24h))
          : "0"
        : btc?.price24hPcnt
          ? `${Number(btc?.price24hPcnt).toFixed(4)}`
          // findPercentage(Number(btc1?.last), Number(btc1?.open24h))
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
        ? `${Number(eth?.lastPrice).toLocaleString()}`
        : "0" :
        eth != undefined
          ? `${Number(eth?.lastPrice).toLocaleString()}`
          : "0"
      }`,
      `${value == 0
        ? eth?.price24hPcnt
          ?
          `${Number(eth?.price24hPcnt).toFixed(4)}`
          // findPercentage(Number(eth?.idxPx), Number(eth?.open24h))
          : "0"
        : eth?.price24hPcnt
          ? `${Number(eth?.price24hPcnt).toFixed(4)}`
          // findPercentage(Number(eth1?.last), Number(eth1?.open24h))
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
        ? `${Number(xpr?.lastPrice).toLocaleString()}`
        : "0" :
        xpr != undefined
          ? `${Number(xpr?.lastPrice).toLocaleString()}`
          : "0"
      }`,
      `${value == 0
        ? xpr?.price24hPcnt ?
          `${Number(xpr?.price24hPcnt).toFixed(4)}`
          // findPercentage(Number(xpr?.idxPx), Number(xpr?.open24h))
          : "0"
        : xpr?.price24hPcnt
          ? `${Number(xpr?.price24hPcnt).toFixed(4)}`
          // findPercentage(Number(xpr1?.last), Number(xpr1?.open24h))
          : "0"
      } `,
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
      } `
    ),

    createData(
      value == 0 ? Dashcoin : LTCCOIN,
      value == 0 ? "DASH" : "LTC",
      "USDT",
      `${value == 0 ? dash != undefined
        ? `${Number(dash?.lastPrice).toLocaleString()}`
        : "0" :
        LTC != undefined
          ? `${Number(LTC?.lastPrice).toLocaleString()}`
          : "0"
      } `,
      `${value == 0
        ? dash?.price24hPcnt
          ? `${Number(dash?.price24hPcnt).toFixed(4)}`
          // findPercentage(Number(dash?.idxPx), Number(dash?.open24h))
          : "0" :
        LTC?.price24hPcnt
          ? `${Number(LTC?.price24hPcnt).toFixed(4)}`
          //  findPercentage(Number(dash1?.last), Number(dash1?.open24h))
          : "0"
      } `,
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
      } `
    ),
  ];



  // let ws = new WebSocket("wss://stream.bybit.com/v5/public/spot");
  let ws = new WebSocket(endpoint);
  const Ticker = () => {
    let coinArray = ["BTCUSDT", "ETHUSDT", "XRPUSDT", "DASHUSDT", "LTCUSDT"]
    // console.log(coinArray, 'coinarray');

    ws.onopen = (event) => {
      for (let i = 0; i < coinArray.length; i++) {
        let datas = {
          op: 'subscribe',
          args: [`tickers.${coinArray[i]}`]
        };
        // console.log(datas, 'datas');
        ws.send(JSON.stringify(datas));
      }

    };


    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      // console.log(response, 'response');

      try {
        if (response?.topic == "tickers.BTCUSDT") {
          setBtc(response?.data);
        }
        else if (response?.topic == "tickers.ETHUSDT") {
          setEth(response?.data);
        } else if (response?.topic == "tickers.XRPUSDT") {
          setxrp(response?.data);
        } else if (response?.topic == "tickers.DASHUSDT") {
          setdash(response?.data);
        }
        else if (response?.topic == "tickers.LTCUSDT") {
          setLTC(response?.data);
        }

        ws.onerror = (error) => {
          console.error('WebSocket Error:', error);
          // Handle WebSocket errors
        };
      } catch (err) {
        console.log(err);
      }
    }

  };

  useEffect(() => {
    Ticker();
    return () => {
      ws.close();
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
                    {/* <Link to="/spot" className="trade-button"> */}
                    <Link
                      className="trade-button"
                      to={'/spot'}
                      state={{
                        name: row.coins,
                      }}
                    >
                      Trade
                    </Link>
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
                    {/* <Link to="/spot" className="trade-button"> */}
                    <Link
                      className="trade-button"
                      to={'/spot'}
                      state={{
                        name: row.coins,
                      }}
                    >
                      Trade</Link>
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
                      {/* {console.log(row.coins, 'coins')} */}
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

                    <Link
                      className="trade-button"
                      to={'/spot'}
                      state={{
                        name: row.coins,
                      }}
                    >
                      Trade
                    </Link>

                    {/* <Link to="/spot" className="trade-button" > */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Box >
  );
}
