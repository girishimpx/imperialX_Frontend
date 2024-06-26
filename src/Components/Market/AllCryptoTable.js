/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Axios from "../../Axios";
import { useEffect } from "react";
import { useState } from "react";
import AxiosToken from "../../Axiostoken";
// import WebSocket from 'websocket';
import CircularProgress from "@mui/material/CircularProgress";
import WebSocket from 'websocket';


// var ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=198");

const useStyles = makeStyles({
  tablestructre: {
    "& th": {
      color: "#FFF",
      borderBottom: "1px solid rgb(58 57 57) !important",
      whiteSpace: "nowrap",
    },
    "& td": {
      color: "#FFF",
      borderBottom: "1px solid rgb(58 57 57) !important",
      whiteSpace: "nowrap",
    },
  },
  bgwhite: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
});

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "change",
    numeric: true,
    disablePadding: false,
    label: "change%",
  },
  {
    id: "1hr",
    numeric: true,
    disablePadding: false,
    label: "24high",
  },
  {
    id: "24h Volume",
    numeric: true,
    disablePadding: false,
    label: "24low",
  },
  {
    id: "Market Cap",
    numeric: true,
    disablePadding: false,
    label: "Volume",
  },
  {
    id: "Total Supply",
    numeric: true,
    disablePadding: false,
    label: "Total Supply",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  
  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function AllCryptoTable({ values, searchedvalue }) {
  // console.log(searchedvalue,values,"ïncomedara")
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [logos, setlogos] = useState([])
  const [rows, setRows] = useState([]);
  const [datas, setdatas] = useState();
  const [oldPairs, setOldPairs] = useState();
  const [all, setall] = useState();
  const navigate = useNavigate();
  const [sidedata, setSideData] = useState();
  const [load, setLoad] = React.useState(false);
  const [client, setClient] = useState();

  


  // const rows = [
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  // ];

  // const getAssets = async () => {
  //   try {
  //     const { data } = await Axios.post(
  //       '/assets/marketPairs', { type: "SPOT" },
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("Mellifluous"),
  //         },
  //       }
  //     );
  //     const dt = data.result
  //     setRows([])
  //     for (let i = 0; i < dt.length; i++) {
  //       const dts = {
  //         instId: dt[i].data.instId,
  //         high: "0",
  //         low: "0",
  //         short: "0",
  //         long: "0",
  //         vitamin: "0"
  //       }
  //       setRows((pre) => [...pre, dts])
  //     }
  //     socketConnect(dt)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getAssets()
  //   return () => ws.close()
  // }, [])

  // useEffect(() => {
  //   console.log(dat, "sta")
  //   if (dat !== []) {
  //     socketConnect()
  //   }
  // }, [dat])

  // const socketConnect = (dat) => {
  //   var datas1 = {
  //     op: "subscribe",
  //     args: [
  //     ]
  //   }
  //   for (let i = 0; i < dat.length; i++) {
  //     datas1.args.push({
  //       "channel": "tickers",
  //       "instId": "XRP-USDT"
  //     })
  //   }
  //   setdatas(datas1)
  // }

  // const Ticker = () => {
  //   ws.onopen = (event) => {
  //     ws.send(JSON.stringify(datas));
  //   };
  //   console.log("ticker")
  //   ws.onmessage = (event) => {
  //     const response = JSON.parse(event.data);
  //     try {
  //       if (response?.arg?.channel === "tickers") {
  //         // setBtc(response?.data[0]);
  //         if (response?.data?.length > 0) {
  //           rows?.forEach((element) => {
  //             if ("XRP-USDT" === response?.data[0]?.instId) {
  //               element.high = response?.data[0]?.last
  //               element.low = response?.data[0]?.high24h
  //               element.carbs = response?.data[0]?.low24h
  //               element.protein = response?.data[0]?.vol24h
  //               element.vitamin = response?.data[0]?.ts
  //             }
  //           })
  //           // for (let i = 0; i < 10; i++) {
  //           //   setdat(pre => {
  //           //     if (pre?.instId === response?.data[0]?.instId) {
  //           //       return [{
  //           //         instId: pre?.instId,
  //           //         high: response?.data[0]?.instId,
  //           //         low: "",
  //           //         short: "",
  //           //         long: ""
  //           //       }]
  //           //     }
  //           //   }
  //           //   )
  //           // }
  //         }
  //       }
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   };
  // };

  // useEffect(() => {
  //   console.log(datas?.args?.length, "len")
  //   if (datas?.args?.length > 0) {
  //     ws.close();
  //     ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197");
  //     Ticker()
  //   }
  // }, [datas]);

  const getAssets = async () => {
    setLoad(true)
    try {
      setRows([]);
      setdatas("");
      const { data } = await Axios.post(
        `/assets/marketPairs`,
        // { type: "all" },
        { type: values },
        {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          },
        }
      );
      // const logos = await Axios.get(
      //   `/assets/getAssetIcon`
      // )
      // setlogos(logos)
      if (searchedvalue) {
        const filtered = [];
        for (let j = 0; j < data.result.length; j++) {
          if (data.result[j].data.instId.includes(searchedvalue)) {
            // if (data?.result[j].data.instId.slice(-4) === 'USDT') {
              filtered.push(data.result[j]);
          }
        }
        setall(filtered);
      } else {
        var sparr = []
        for (let i = 0; i < data?.result.length; i++) {
          // if (data?.result[i].data.instId.split("-")[1] === "USDT") {
          //   sparr.push(data?.result[i]);
          // }
          if (data?.result[i].data.instId.slice(-4) === 'USDT') {
            sparr.push(data?.result[i]);
          }
        }
        setall(sparr)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false)
    }

  };


  // useEffect(() => {
  //   // const processedSymbols = new Set(); // Keep track of processed symbols

  //   if (all?.length > 0) {
  //     const spotEndpoint = 'wss://stream.bybit.com/v5/public/spot';
  //     const futuresEndpoint = 'wss://stream.bybit.com/v5/public/linear';
  
  //     // const spotClient = new WebSocket(spotEndpoint);
  //     // const futuresClient = new WebSocket(futuresEndpoint);
  //     const spotClient = new WebSocket.w3cwebsocket(spotEndpoint);
  //     const futuresClient = new WebSocket.w3cwebsocket(futuresEndpoint);

  
  //     const subscribeToPairs = (client, pairs) => {
  //       pairs.forEach(pairData => {
  //         const pair = pairData?.data?.instId;
  //         client.send(JSON.stringify({ op: 'subscribe', args: [`tickers.${pair}`] }));
  //       });
  //     };


  
  //     // Spot WebSocket
  //     if (values === 'SPOT' || values === 'all') {
  //       spotClient.onopen = () => {
  //         console.log('Spot WebSocket Client Connected');
  //         const spotPairsToSubscribe = all?.slice(0, 548);
  //         subscribeToPairs(spotClient, spotPairsToSubscribe);
  //       };
  
  //       spotClient.onmessage = (event) => {
  //         // Spot message handling logic
  //         // console.log('Message received:', event.data);
  //       const data = JSON.parse(event.data);
  //       // console.log(data, 'datassd');
  //       if (data?.topic && data?.data) {
  //         const symbol = data?.topic?.split('.')[1];
  //         // console.log(symbol,"symbol")
  //         // if (!processedSymbols.has(symbol)) { // Check if symbol has already been processed
  //         //   processedSymbols.add(symbol); // Add symbol to processed set
  //         const response = data?.data;
  //         // console.log(response,"responsees")


  //         const increase = response.lastPrice - response.highPrice24h;
  //         const price_change = (increase / response.highPrice24h) * 100;

  //         $(`.price-${symbol}`).html(response?.lastPrice);
  //         $(`.high-${symbol}`).html(response?.highPrice24h);
  //         $(`.low-${symbol}`).html(response?.lowPrice24h);
  //         $(`.volume-${symbol}`).html(parseFloat(response?.volume24h).toFixed(2));
  //         $(`.change-${symbol}`).html(
  //           parseFloat(response?.price24hPcnt).toFixed(2) > 0
  //             ? `<span class="classgreens">${parseFloat(response?.price24hPcnt).toFixed(2)}%</span>`
  //             : `<span class="classreds">${parseFloat(response?.price24hPcnt).toFixed(2)}%</span>`
  //         );
  //         $(`.ts-${symbol}`).html(parseFloat(response?.turnover24h).toFixed(2));
  //       // }
  //       }

  //       };
  
  //       spotClient.onerror = (error) => {
  //         console.error('Spot WebSocket Error:', error);
  //       };
  
  //       spotClient.onclose = () => {
  //         console.log('Spot WebSocket Connection Closed');
  //       };
  //     }
  
  //     // Futures WebSocket
  //     if (values === 'FUTURES' || values === 'all') {
  //       futuresClient.onopen = () => {
  //         console.log('Futures WebSocket Client Connected');
  //         const futuresPairsToSubscribe = all?.slice(0, 367);
  //         subscribeToPairs(futuresClient, futuresPairsToSubscribe);
  //       };
  
  //       futuresClient.onmessage = (event) => {
  //         // Futures message handling logic
  //         console.log('Message received:', event.data);
  //       const data = JSON.parse(event.data);
  //       // console.log(data, 'alldatasss');
  //       if (data?.topic && data?.data) {
  //         const symbol = data?.topic?.split('.')[1];
  //         // console.log(symbol, "symbol")
  //         // if (!processedSymbols.has(symbol)) { // Check if symbol has already been processed
  //         //   processedSymbols.add(symbol); // Add symbol to processed set
  //         const response = data?.data;
  //         // console.log(response, "responsees")
  //         if (
  //           'volume24h' in response &&
  //           'price24hPcnt' in response &&
  //           'turnover24h' in response
  //         ) {


  //         const increase = response.lastPrice - response.highPrice24h;
  //         const price_change = (increase / response.highPrice24h) * 100;
  //         const changeValue = parseFloat(response?.price24hPcnt).toFixed(2);
  //         const changeHtml = isNaN(changeValue) ? '0' : (changeValue > 0 ? `<span class="classgreens">${changeValue}%</span>` : `<span class="classreds">${changeValue}%</span>`);

  //         $(`.price-${symbol}`).html(response?.ask1Price);
  //         $(`.high-${symbol}`).html(response?.highPrice24h);
  //         $(`.low-${symbol}`).html(response?.lowPrice24h);
  //         $(`.volume-${symbol}`).html(response?.volume24h);
  //         $(`.change-${symbol}`).html(changeHtml);
  //         // $(`.change-${symbol}`).html(
  //         //   parseFloat(response?.price24hPcnt).toFixed(2) > 0
  //         //     ? `<span class="classgreens">${parseFloat(response?.price24hPcnt).toFixed(2)}%</span>`
  //         //     : `<span class="classreds">${parseFloat(response?.price24hPcnt).toFixed(2)}%</span>`
  //         // );
  //         $(`.ts-${symbol}`).html(response?.turnover24h);
  //       // }
  //     }
  //   }


  //       };
  
  //       futuresClient.onerror = (error) => {
  //         console.error('Futures WebSocket Error:', error);
  //       };
  
  //       futuresClient.onclose = () => {
  //         console.log('Futures WebSocket Connection Closed');
  //       };
  //     }
  
  //     // Cleanup function
  //     return () => {
  //       console.log('Cleaning up WebSocket connections');
  //       spotClient.close();
  //       futuresClient.close();
  //     };
  //   }
  // }, [all, searchedvalue, values]);

  const Ticker = () => {

    let endpoint;
    let pairsToSubscribeCount;
    if (all?.length > 0 && values === 'all') {
      endpoint = 'wss://stream.bybit.com/v5/public/spot';
      pairsToSubscribeCount = 548;
    } else if (all?.length > 0 && values === 'all') {
      endpoint = 'wss://stream.bybit.com/v5/public/linear';
      pairsToSubscribeCount = 367;
    } else {
      // No action needed if values don't match SPOT or FUTURES
      return;
    }

    const client = new WebSocket.w3cwebsocket(endpoint);

    client.onopen = () => {
      // console.log('WebSocket Client Connected');
      // const pairsToSubscribe = all?.slice(page, rowsPerPage);
      const start = page * rowsPerPage;
      const end = start + rowsPerPage;
      const pairsToSubscribe = all.slice(start, end);

      pairsToSubscribe.forEach(pairData => {
        const pair = pairData?.data?.instId;
        client.send(JSON.stringify({ op: 'subscribe', args: [`tickers.${pair}`] }));
      });
    };

    client.onmessage = (event) => {
      // console.log('Message received:', event.data);
      const data = JSON.parse(event.data);
      if (data?.topic && data?.data) {
        const symbol = data?.topic?.split('.')[1];
        const response = data?.data;

        let priceHtml;
        if (values === 'all') {
          const increase = response.lastPrice - response.highPrice24h;
          const price_change = (increase / response.highPrice24h) * 100;
          priceHtml = parseFloat(response?.price24hPcnt).toFixed(2) > 0 ?
            `<span class="classgreens">${parseFloat(response?.price24hPcnt).toFixed(2)}%</span>` :
            `<span class="classreds">${parseFloat(response?.price24hPcnt).toFixed(2)}%</span>`;
        } else if (values === 'all') {
          if (
            'volume24h' in response &&
            'price24hPcnt' in response &&
            'turnover24h' in response
            // !isNaN(response?.volume24h) &&
            // !isNaN(response?.turnover24h)
          ) {
            const increase = response.lastPrice - response.prevPrice24h;
            const price_change = (increase / response.prevPrice24h) * 100;
            const changeValue = parseFloat(response?.price24hPcnt).toFixed(2);
            const changeHtml = isNaN(changeValue) ? '0' :
              (changeValue > 0 ? `<span class="classgreens">${changeValue}%</span>` :
                `<span class="classreds">${changeValue}%</span>`);
            priceHtml = changeHtml;
          }
        }

        $(`.price-${symbol}`).html(response?.lastPrice);
        $(`.high-${symbol}`).html(response?.highPrice24h);
        $(`.low-${symbol}`).html(response?.lowPrice24h);
        // $(`.volume-${symbol}`).html(parseFloat(response?.volume24h).toFixed(2));
        if (response?.volume24h) {
          $(`.volume-${symbol}`).html(isNaN(response?.volume24h) ? '0' : parseFloat(response?.volume24h).toFixed(2));

        }
        $(`.change-${symbol}`).html(priceHtml);
        // $(`.ts-${symbol}`).html(parseFloat(response?.turnover24h).toFixed(2));
        if (response?.turnover24h) {
          $(`.ts-${symbol}`).html(isNaN(response?.turnover24h) ? '0' : parseFloat(response?.turnover24h).toFixed(2));

        }

      }
    };

    client.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    client.onclose = () => {
      console.log('WebSocket Connection Closed');
    };

    return () => {
      console.log('Cleaning up WebSocket connection');
      // client.close();
    };
  }
  





  // const setAssetsData = async () => {
  //   const asstype = values == "FUTURES" ? "linear" : values != '' ? values : "spot"

  //   try {

  //     const { data } = await Axios.post(
  //       `/bybit/orderbook`, 
  //       { type: `${asstype}`, ccy: '' },
  //       {
  //         headers: {
  //           Authorization: localStorage?.getItem("Mellifluous"),
  //         },
  //       }
  //     );
  //     if (data?.success && data?.result?.length > 1) {
  //       console.log(data?.result,'RESULT');
  //       setSideData(data?.result);
  //     } else {
  //       setSideData([]);
  //     }
    
  //   } catch (error) {
  //     console.log(error);
  //   }
    
  // };


  // useEffect(() => {
  //   if (all?.length > 0) {
  //     setdatas();
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
  //     setdatas(dt);
  //   }
  // }, [all, searchedvalue]);


  // useEffect(() => {
  //   if (all?.length > 0) {
  //     const dt = {
  //       op: "subscribe",
  //       args: [],
  //     };

  //     // Subscribe to WebSocket channels for all pairs in 'all'
  //     all?.forEach(pairData => {
  //       const pair = pairData?.data?.instId;
  //       dt?.args.push({ channel: "tickers", instId: pair });
  //     });

  //     setRows(dt); // Set subscription data for WebSocket

  //     // Initialize rows with default values
  //     const initialRows = all?.map(pairData => {

  //       return {
  //         instId: pairData?.data?.instId,
  //         high: "0",
  //         low: "0",
  //         short: "0",
  //         long: "0",
  //         vitamin: "0",
  //         // Add more fields if needed
  //       };
  //     });
  //     console.log(initialRows, "initialRowsss")
  //     setRows(initialRows);
  //   }
  // }, [all, searchedvalue]);

  useEffect(() => {
    if (all?.length > 0) {
      const initialRows = all?.map(pairData => {
        return {
          instId: pairData?.data?.instId,
          high: "0",
          low: "0",
          short: "0",
          long: "0",
          vitamin: "0",
        };
      });
      setRows(initialRows);
      const dt = {
        op: "subscribe",
        args: [],
      };
      for (let i = page * rowsPerPage; i < (page + 1) * rowsPerPage && i < all.length; i++) {
        dt?.args?.push({ channel: "tickers", instId: all[i]?.data?.instId });
      }
      setdatas(dt);
    }
  }, [all, searchedvalue, page, rowsPerPage]);

  // useEffect(() => {
  //   if (page * rowsPerPage > 0) {
  //     ws.onopen = (event) => {
  //       ws.send(
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
  //     setdatas();
  //     for (let i = page + rowsPerPage; i < (page + 1) * rowsPerPage; i++) {
  //       dt?.args?.push({
  //         channel: "tickers",
  //         instId: all[i]?.data?.instId,
  //       });
  //     }
  //     setdatas(dt);
  //   }
  // }, [page, rowsPerPage]);
  

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

  useEffect(() => {
    getAssets();
  }, [searchedvalue]);

  // useEffect(() => {
  //   // if(all?.length > 0){
  //     setAssetsData();
  //   // }
  // }, [searchedvalue]);


  // useEffect(() => {
  //   if (datas?.args?.length > 0) {
  //     ws.close();
  //     ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197"); // Close the WebSocket connection on unmount
  //     socket();
  //   }
  // }, [datas, searchedvalue]);

  useEffect(() => {
    if (datas?.args?.length > 0) {
      // console.log(datas, "datasaaa")
      // alert('iscoming')
      // Close the current WebSocket connection
      if (client) {
        client.close();
      }
      // Define the endpoint based on some criteria, such as the value of 'values'
      let endpoint;
      if (values === 'all') {
        endpoint = 'wss://stream.bybit.com/v5/public/spot';
      } else if (values === 'all') {
        endpoint = 'wss://stream.bybit.com/v5/public/linear';
      }

      // Establish a new WebSocket connection with the selected endpoint
      const newClient = new WebSocket.w3cwebsocket(endpoint);

      // Set the new WebSocket client
      setClient(newClient);
      // Initialize WebSocket event handlers
      Ticker();
    }
  }, [datas, searchedvalue, values, page, rowsPerPage]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const classes = useStyles();
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }} className={classes.bgwhite}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            className={classes.tablestructre}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

            <TableBody>
            {load ?
                (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : visibleRows?.length > 0 ?
                  (
              visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={() => { navigate(`/spot`) }}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <div className="img-div">
                        {row?.instId?.split("-")[2] ? (
                          <> { /*<div className="crypto-coin-size"><img src={row?.image} alt='coins' /></div> */}{`${row?.instId?.split("-")[0]}-${row?.instId?.split("-")[2]
                            }`}</>
                        ) : (
                          <>  {/*<div className="crypto-coin-size"><img src={row?.image} alt='coins' /></div> */}{row?.instId?.split("-")[0]}</>
                        )}
                      </div>
                    </TableCell>
                    <TableCell align="left" className={`price-${row?.instId}`}>
                    {row.price ? row?.price : '0'}
                    </TableCell>
                    <TableCell align="left" className={`change-${row?.instId}`}>
                    {row?.change ? row?.change : '0'}
                    </TableCell>
                    <TableCell align="left" className={`high-${row?.instId}`}>
                      {row?.high ? row?.high : '- -'}
                    </TableCell>
                    <TableCell align="left" className={`low-${row?.instId}`}>
                      {row?.low ? row?.low : '- -'}
                    </TableCell>
                    <TableCell align="left" className={`volume-${row?.instId}`}>
                      {row?.long ? row?.long : '- -'}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={`ts-${row?.instId}`}
                      style={{ color: "green" }}
                    >
                      {row?.vitamin ? row?.vitamin : '- -'} 
                    </TableCell>
                  </TableRow>
                );
              })) :
              (<TableRow>
                <TableCell colSpan={7} align="center" style={{ color: "#25deb0" }}>
                  No Pairs Found
                </TableCell>
              </TableRow>)
          }
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
