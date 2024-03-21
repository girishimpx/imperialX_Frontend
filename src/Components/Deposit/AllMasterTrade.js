import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllMasterTradeTable from './AllMasterTradeTable';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

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

export default function AllMasterTrade() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ width: '100%' }}>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

        <Tabs aria-label="basic tabs example" id="tabstylecrypto" className='all-master-tabs-outer' value={value} onChange={handleChange} >
          <Tab label="7D" {...a11yProps(0)} />
          <Tab label="Trader Rank" {...a11yProps(1)} />
          <Tab label="Trader Type" {...a11yProps(2)} />
          <Tab label="Country" {...a11yProps(3)} />
          <Tab label="Trader Badge" {...a11yProps(4)} />
          <Tab label="Available Master Traders" {...a11yProps(5)} />
        </Tabs>

      </Box>


      <TabPanel value={value} index={0}>
        <AllMasterTradeTable/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <AllMasterTradeTable/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <AllMasterTradeTable/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <AllMasterTradeTable/>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <AllMasterTradeTable/>
      </TabPanel>
      <TabPanel value={value} index={5}>
      <AllMasterTradeTable/>
      </TabPanel>

      
    </Box>
  );
}