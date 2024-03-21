import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";
import Axios from '../../Axios'

 

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

export default function BuySell({ selected, pair,market }) {
  const [value, setValue] = React.useState(0);
  
  


 


  React.useEffect(() => {
    if (selected) {
      // console.log("selected",selected,"Selected")
      if (selected?.from == "buy") {
        setValue(1);
      } else {
        setValue(0);
      }
    }
  }, [selected]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <div className='buy-sell-part-top'>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='buy-green-sell-red'>
            <Tab className='buy-green' label="Buy" {...a11yProps(0)} />
            <Tab className='sell-red' label="Sell" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <BuyForm selected={selected?.from === "sell" ? selected : ""} pair={pair} market={market} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SellForm selected={selected?.from === "buy" ? selected : ""} pair={pair} market={market} />
        </TabPanel>
      </Box>
    </div>
  );
}
 