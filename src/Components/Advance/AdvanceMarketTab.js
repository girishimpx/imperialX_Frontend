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
export default function AdvanceMarketTab({ pairs, searchpair }) {
  const [value, setValue] = React.useState(0);
  const [selectedpair, setselectedpair] = React.useState("FUTURES");
  const [futureData, setfutureData] = useState([]);
  const [futureData1, setfutureData1] = useState([]);
  const [futureDataerr, setfutureDataerr] = useState();
  const [newPair, setNewPair] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const futurepairs = async () => {
    try {
     const {data}  = await Axios.get(
        `/assets/getalltradepair`,
        {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          },
        }
      )
        // console.log(data?.result,"datass")
        if(data?.success === true){
          setNewPair(data?.result)
        }
        // .then((data) => {
        //   console.log(data.data.result,'*****************');
        //   // const data = [];
        //   // res.data?.result?.map((item, index) => {
        //   //   if (item.data.instFamily.split("-")[1] == "USDT") {

        //   //     data.push(item);
        //   //   }
        //   // });
        //   // data.push(res.data.result);
        //   // console.log(data.data.result,'respo');
        //   setfutureData(data.data.result);
        //   setfutureData1(data.data.result);
          // if (data?.length > 0) {
          //   console.log(data,'DATaaaaaa');
          //   setfutureData(res.data.result);
          //   setfutureData1(res.data.result);
         
          // }
        // })
        // .catch((err) => {
        //   setfutureDataerr(err?.response?.data?.message);
        // });
    } catch (error) {
      console.log("🚀 ~ file: AdvanceMarketTab.js:84 ~ futurepairs ~ error:", error)
    }

  };
  React.useEffect(() => {
    futurepairs();
  }, []);

  const Ticker = () => {
    // console.log(newPair,'spot ticker')
    // console.log(newPair,'ramesh');
    // newPair?.map((symbol) =>{
    //   console.log(symbol,'symbol');
    // })

    

    let datas = {
      op: "subscribe",
      args: newPair?.map((symbol) => ({
        channel: "tickers",
        instId: symbol?.tradepair,
      })),
    };
    // console.log(datas,'datas123');

    ws.onopen = (event) => {
      // ws.send(JSON.stringify(datas1));
      ws.send(JSON.stringify(datas));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      // console.log(response,'resssss');
      try {
        for (let a = 0; a < newPair.length; a++) {
          if (newPair[a]?.tradepair == response?.arg?.instId) {
            // console.log(newPair[a].tradepair,'newPair for');
             delete newPair[a]?.data
            newPair[a] = response?.data[0];
          }

        }
        //  console.log(newPair,'response23');
      } catch (err) {
        console.log(err,'errorsss');
      }
    };
  };
  let a = 1;
  useEffect(() => {
    // console.log(newPair,"checks")
   
    if (newPair?.length > 0) {
       Ticker();
    }

    return () => {
      
        ws.close();
        ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197");
    
    };
  }, [newPair]);

//   useEffect(()=>{

//   <AdvanceMarketTable
//   futurevalue={newPair}
//   searchpair={searchpair}
// />

//   },[newPair])

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
            <Tab label="Spot" {...a11yProps(0)} />
            {/* <Tab label="Top" {...a11yProps(1)} />
          <Tab label="Meme" {...a11yProps(2)} />
          <Tab label="Hong Kong Concept" {...a11yProps(3)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {
            newPair.length > 0 ?
            <AdvanceMarketTable
            futurevalue={newPair}
            searchpair={searchpair}
          />
          :
          <AdvanceMarketTable
          futurevalue={newPair}
          searchpair={searchpair}
        /> 
          }
         
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
