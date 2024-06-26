import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AdvanceMarketTable from "./AdvanceMarketTable";
import Axios from "../../Axios";
import { LocalCafe } from "@mui/icons-material";
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
export default function AdvanceMarketTab({ pairs, searchpair, selectPairsss }) {
  const [value, setValue] = React.useState(0);
  const [selectedpair, setselectedpair] = React.useState("FUTURES");
  const [futureData, setfutureData] = useState();
  const [futureData1, setfutureData1] = useState([]);
  const [futureDataerr, setfutureDataerr] = useState();
  const [loader, setLoader] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // console.log(searchpair, 'serachpair');

  const futurepairs = () => {
    try {
      setLoader(true)
      Axios.post(
        "/bybit/getnewpairsbytype",
        { type: 'linear' },
        {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          },
        }
      )
        .then((res) => {
          const data = [];
          const use = localStorage.getItem('use')
          // console.log(res,'FUTUREEEEEEEEEE');
          res.data?.result?.map((item, index) => {
            // if (item.data.instFamily.split("-")[1] == "USDT") {
            //   item.data.check =  item?.data?.users_id ? item?.data?.users_id.includes(use) : false 
            //   data.push(item);
            // }
            data.push({
              pairs: item?.symbol,
              check: item?.users_id?.includes(use) === true ? true : false
            })
          });

          if (data?.length > 0) {
            // console.log(data, 'DATA CHECk');
            if (searchpair == '') {
              // console.log('if');
              setfutureData1(data);
              setfutureData(data);
            }
            else {
              // console.log('else');
              const pair = data.filter((data => data.pairs.includes(searchpair)))
              setfutureData(pair)
              setfutureData1(pair)
            }
            setLoader(false)
          }
        })
        .catch((err) => {
          setfutureDataerr(err?.response?.data?.message);
          setLoader(false)
        });
    } catch (error) {
      console.log("🚀 ~ file: AdvanceMarketTab.js:84 ~ futurepairs ~ error:", error)
    }

  };

  React.useEffect(() => {
    futurepairs();
  }, [searchpair]);


  const handleAllOrderBookData = async () => {
    try {

      const { data } = await Axios.post(
        `/bybit/orderbook`,
        { type: 'linear', ccy: '' },
        {
          headers: {
            Authorization: localStorage?.getItem("Mellifluous"),
          },
        }
      );
      if (data?.success && data?.result?.length > 1) {
        // console.log(data?.result, 'LINEARRESULT');
        // setSideData(data?.result);

        var updatedData = futureData1.map(item => {

          const matchedCcy = data.result.find(futitems => futitems.symbol === item?.data?.instId);

          if (matchedCcy) {

            return {
              ...item,
              percentage: matchedCcy?.price24hPcnt,
              high: matchedCcy?.highPrice24h,
              low: matchedCcy?.lowPrice24h,
            };

          }
          return item;

        })
        setfutureData1(updatedData);
      } else {
        // setSideData([]);
        setfutureData1([]);
      }

    } catch (error) {
      console.log(error);
    }
  }

  // React.useEffect(() => {
  //   if(futureData1.length > 0) {
  //     handleAllOrderBookData();
  //   }
  // }, [futureData1]);
  // const Ticker = () => {
  //   let datas = {
  //     op: "subscribe",
  //     args: futureData1?.map((symbol) => ({
  //       channel: "tickers",
  //       instId: symbol.data.instId,
  //     })),
  //   };

  //   ws.onopen = (event) => {
  //     ws.send(JSON.stringify(datas));
  //   };

  //   ws.onmessage = (event) => {
  //     const response = JSON.parse(event.data);

  //     try {

  //       for (let a = 0; a < futureData1.length; a++) {
  //         if (futureData1[a].data.instId == response.arg.instId) {
  //           delete futureData1[a].data.data
  //           futureData1[a].data.data = response.data[0];
  //         }

  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  // };
  let a = 1;
  // useEffect(() => {
  //   if (futureData?.length > 0) {
  //     Ticker();
  //   }

  //   return () => {

  //       ws.close();
  //       ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197");

  //   };
  // }, [futureData]);

  const selectPair = (data) => {
    // console.log(data,'safasfd')
    selectPairsss(data)
  }

  return (
    <>
      <Box
        sx={{ width: "100%", maxHeight: "50%", overflow: "auto" }}
        className="market-coins-table-outer"
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="market-tab-advance"
            style={{ position: "sticky" }}
          >
            <Tab label="Future" {...a11yProps(0)} />
            {/* <Tab label="Top" {...a11yProps(1)} />
          <Tab label="Meme" {...a11yProps(2)} />
          <Tab label="Hong Kong Concept" {...a11yProps(3)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AdvanceMarketTable
            futurevalue={futureData1}
            searchpair={searchpair}
            selectPair={selectPair}
            futurepairs={futurepairs}
            loader={loader}
          />
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
        <AdvanceMarketTable pairs = {pairs}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
       <AdvanceMarketTable pairs = {pairs}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
       <AdvanceMarketTable pairs = {pairs}/>
      </TabPanel> */}
      </Box>
    </>
  );
}
