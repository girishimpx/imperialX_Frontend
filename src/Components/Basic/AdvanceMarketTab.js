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
let ws = new WebSocket("wss://ws.okex.com:8443/ws/v5/public?brokerId=197");
export default function AdvanceMarketTab({ pairs, searchpair, selectPairsss }) {
  const [value, setValue] = React.useState(0);
  const [selectedpair, setselectedpair] = React.useState("FUTURES");
  const [futureData, setfutureData] = useState();
  const [futureData1, setfutureData1] = useState();
  const [futureDataerr, setfutureDataerr] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const futurepairs = () => {
    try {
      Axios.post(
        "/assets/futurePairs",
        { pair: selectedpair },
        {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          },
        }
      )
        .then((res) => {
          const data = [];
          const use = localStorage.getItem('use')
          res.data?.result?.map((item, index) => {
            if (item.data.instFamily.split("-")[1] == "USDT") {
              item.data.check =  item?.data?.users_id ? item?.data?.users_id.includes(use) : false 
              data.push(item);
            }
          });

          if (data?.length > 0) {
            console.log(data,'DATA CHECk');
            setfutureData(data);
            setfutureData1(data);
          }
        })
        .catch((err) => {
          setfutureDataerr(err?.response?.data?.message);
        });
    } catch (error) {
      console.log("🚀 ~ file: AdvanceMarketTab.js:84 ~ futurepairs ~ error:", error)
    }

  };

  React.useEffect(() => {
    futurepairs();
  }, []);

  const Ticker = () => {
    let datas = {
      op: "subscribe",
      args: futureData1?.map((symbol) => ({
        channel: "tickers",
        instId: symbol.data.instId,
      })),
    };

    ws.onopen = (event) => {
      ws.send(JSON.stringify(datas));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);

      try {

        for (let a = 0; a < futureData1.length; a++) {
          if (futureData1[a].data.instId == response.arg.instId) {
            delete futureData1[a].data.data
            futureData1[a].data.data = response.data[0];
          }

        }
      } catch (err) {
        console.log(err);
      }
    };
  };
  let a = 1;
  useEffect(() => {
    if (futureData?.length > 0) {
      Ticker();
    }

    return () => {
      
        ws.close();
        ws = new WebSocket("wss://ws.okex.com:8443/ws/v5/public?brokerId=197");
  
    };
  }, [futureData]);

  const selectPair = (data)=>{
    console.log(data,'safasfd')
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
