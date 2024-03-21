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
import MenuItem from "@mui/material/MenuItem";
import './AdvanceBody.css'
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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

export default function BuyForm({ selected, pair,market, reload }) {
  const [value, setValue] = React.useState(0);
  const [listvalue, setListvalue] = React.useState(0);
  const [narmalvalues, setnormalValues] = React.useState(0);
  const [borrowvalues, setborrowValues] = React.useState(0);
  const [repayvalues, setrepayValues] = React.useState(0);
const [list,setList]= React.useState(['Limit','Market','Stop'])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChanges = (event) => {

    console.log(event.target.value)
    setListvalue(event.target.value);
   setValue(event.target.value)
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
        <div className='selection'>
        <Select
                              id="summary"
                              value={listvalue}
                              onChange={handleChanges}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                            >
                                  <MenuItem value={0}>Limit</MenuItem>
                                  <MenuItem value={1}>Market</MenuItem>
                                  <MenuItem value={2}>Stop</MenuItem>
                                
                            </Select>
        </div>
        <div  className='tabsection'> 
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='lms'>        
          <Tab label="Limit" {...a11yProps(0)} />
          <Tab label="Market" {...a11yProps(1)} />
          <Tab label="Stop" {...a11yProps(2)} />
        </Tabs>
        </div>
      </Box>
      <TabPanel value={value} index={0}> 
      <Buyformtab selected={selected} pair={pair} index={"limit"} market={market} reload={reload} />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Buyformtabmarket selected={selected} pair={pair} index={"market"} market={market} reload={reload} />
      </TabPanel>
      <TabPanel value={value} index={2}> 
      <Buyformtabstop selected={selected} pair={pair} index={"stop"} market={market} reload={reload} />
      </TabPanel>
    </Box>
  );
}