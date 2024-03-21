import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllMasterTradeTable from './AllMasterTradeTable';
import Consts from "../../Constansts";
import Axios from "../../Axios";
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

export default function AllMasterTrade(searchName) {
  const [value, setValue] = React.useState(5);
  const [master, setMasters] = React.useState();
  const [loading, setLoading] = React.useState(true);

     const getMasters = async () => {
       try {
         await Axios.post(`${Consts.BackendUrl}/users/getMastersbyQuery`,{}, {
           headers: {
             Authorization: localStorage.getItem("Mellifluous"),
           },
         }).then((res) => {
           if (res?.data?.success) {
            
               console.log(res?.data?.result,"data1");
               setMasters(res?.data?.result)
               setLoading(false);
           
           }
           setLoading(false);
         })
       } catch (error) {
         setLoading(false);
       }
       
     }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

  React.useEffect(() => {
    getMasters()
     }, []);


  return (
    <Box sx={{ width: '100%' }}>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

        <Tabs aria-label="basic tabs example" id="tabstylecrypto" className='all-master-tabs-outer' value={value} onChange={handleChange} >
          <Tab sx={{color:"white"}} label="7D" {...a11yProps(0)}  />
          <Tab sx={{color:"white"}} label="Trader Rank" {...a11yProps(1)} />
          <Tab sx={{color:"white"}} label="Trader Type" {...a11yProps(2)} />
          <Tab sx={{color:"white"}} label="Country" {...a11yProps(3)} />
          <Tab sx={{color:"white"}} label="Trader Badge" {...a11yProps(4)}  />
          <Tab label="Available Master Traders" {...a11yProps(5)} />
        </Tabs>

      </Box>


      <TabPanel value={value} index={0}>
        NO DATA
      </TabPanel>
      <TabPanel value={value} index={1}>
      NO DATA
      </TabPanel>
      <TabPanel value={value} index={2}>
      NO DATA
      </TabPanel>
      <TabPanel value={value} index={3}>
      NO DATA
      </TabPanel>
      <TabPanel value={value} index={4}>
      NO DATA
      </TabPanel>
      <TabPanel value={value} index={5}>
      <AllMasterTradeTable searchName={searchName}/>
      </TabPanel>

      
    </Box>
  );
}