import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SellFormInner from './SellFormInner';

function TabPanel(props) {
  const { children, value, index, market, ...other } = props;

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

const Sellformtab = ({ selected, pair,index, market, reload, cat }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <>
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='rms'>
    <Tab label="Cross" {...a11yProps(0)} />
    <Tab label="Isolated" {...a11yProps(1)} />
    {/* <Tab label="Repay" {...a11yProps(2)} /> */}
  </Tabs>
  <TabPanel value={value} index={0}>
  <SellFormInner selected={selected} pair={pair} index={'cross'} ordertype={index} market={market} reload={reload} cat={cat}/>
  </TabPanel>
  <TabPanel value={value} index={1}>
    <SellFormInner selected={selected} pair={pair} index={'isolated'} ordertype={index} market={market} cat={cat}/>
  </TabPanel>
  {/* <TabPanel value={value} index={2}>
    <SellFormInner selected={selected} pair={pair} index={"stop"}  />
  </TabPanel> */}
  </>
  )
}

export default Sellformtab