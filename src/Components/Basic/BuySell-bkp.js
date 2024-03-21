import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BuyForm from './BuyForm';
import SellForm from './SellForm';
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BuySell({ selected, pair,market }) {
  const [value, setValue] = React.useState(0);
  const [valueOpen, setValueOpen] = React.useState(0);
  const [valueClose, setValueClose] = React.useState(0);


  //  React.useEffect(() => {
  //   if (selected) {
  //     // console.log("selected",selected,"Selected")
  //     if (selected?.from === "buy") {
  //       setValue(0);
  //     } else {
  //       setValue(0);
  //     }
  //   }
  // }, [selected]);

  React.useEffect(() => {
    if (selected) {
      
      if (selected?.from === "buy") {
        setValueOpen(1);
      } else {
        setValueOpen(0);
      }
    }
  }, [selected]);

  


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeOpen = (event, newValue) => {
    setValueOpen(newValue);
  };

  const handleChangeClose = (event, newValue) => {
    setValueClose(newValue);
  };
 

  return (
    <Box sx={{ width: '100%' }}>


<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>  
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='buy-green-sell-red'>
          <Tab className='buy-green outer' label="Open" {...a11yProps(0)} />
          <Tab className='sell-red outer' label="Close" {...a11yProps(1)} />
        </Tabs>
      </Box>


      <TabPanel value={value} index={0}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>  
        <Tabs value={valueOpen} onChange={handleChangeOpen} aria-label="basic tabs example" className='buy-green-sell-red'>
          <Tab className='buy-green' label="Long" {...a11yProps(0)} />
          <Tab className='sell-red' label="Short" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={valueOpen} index={0}>
          <BuyForm selected={selected?.from ==="sell" ? selected : ""} pair={pair} la={"open-long"} />
        </TabPanel>

        <TabPanel value={valueOpen} index={1}>
          <SellForm selected={selected?.from === "buy" ? selected : ""} pair={pair} la={"open-short"}/>
        </TabPanel>
        </TabPanel>




        <TabPanel value={value} index={1}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>  
        <Tabs value={valueClose} onChange={handleChangeClose} aria-label="basic tabs example" className='buy-green-sell-red'>
          <Tab className='buy-green' label="Close Long" {...a11yProps(0)} />
          <Tab className='sell-red' label="Close Short" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={valueClose} index={0}>
          <BuyForm selected={selected?.from ==="sell" ? selected : ""} pair={pair} la={"close-long"} market={market}/>
        </TabPanel>

        <TabPanel value={valueClose} index={1}>
          <SellForm selected={selected?.from === "buy" ? selected : ""} pair={pair} la={"close-short"} market={market}/>
        </TabPanel>
        </TabPanel>

      

    </Box>
  );
} 