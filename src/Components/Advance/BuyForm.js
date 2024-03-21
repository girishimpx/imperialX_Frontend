import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Buyformtab from './buyformtab';
import Buyformtabmarket from './buyformtabmarket';
import Buyformtabstop from './buyformtabstop'
import { Slider, RangeSlider } from 'rsuite' 

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

export default function BuyForm({ selected, pair,market }) {
  const [value, setValue] = React.useState(0);
  const [narmalvalues, setnormalValues] = React.useState(0);
  const [borrowvalues, setborrowValues] = React.useState(0);
  const [repayvalues, setrepayValues] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const normalhandleChanges = (event, newValue) => {
    setnormalValues(newValue);
  };
  const borrowhandleChanges = (event, newValue) => {
    setborrowValues(newValue);
  };
  const repayhandleChanges = (event, newValue) => {
    setrepayValues(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='lms'>
          <Tab label="Limit" {...a11yProps(0)} />
          <Tab label="Market" {...a11yProps(1)} />
          <Tab label="Stop" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}> 
      <Buyformtab selected={selected} pair={pair} index={"limit"}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Buyformtabmarket selected={selected} pair={pair} index={"market"} market={market} />
      </TabPanel>
      <TabPanel value={value} index={2}> 
      <Buyformtabstop selected={selected} pair={pair} index={"stop"} />
      </TabPanel>
    </Box>
  );
}