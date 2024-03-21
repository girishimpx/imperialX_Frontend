import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BuyFormInner from './BuyFormInner';

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

const Buyformtab = ({ selected, pair,index , lever, lab, mgnmode, reload }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <>
    {/* <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='rms'>
    <Tab label="Cross" {...a11yProps(0)} />
    <Tab label="Isolated" {...a11yProps(1)} />
  </Tabs> */}
  {/* <TabPanel value={value} index={0}> */}
    <BuyFormInner selected={selected} pair={pair} index={mgnmode} lever={lever} ordertype={index} labe={lab} reload={reload} />
  {/* </TabPanel>
  <TabPanel value={value} index={1}>
    <BuyFormInner selected={selected} pair={pair} index={'isolated'} ordertype={index} labe={lab}/>
  </TabPanel> */}
  </>
  )
}

export default Buyformtab