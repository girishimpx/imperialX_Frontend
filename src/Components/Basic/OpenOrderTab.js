import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import OpenOrderTable from './OpenOrderTable';
import FutureHistory from './FutureHistory';
import CompleteAndCancelList from './complete&cancelList';
import PositionHistory from './PositionHistory';
import PositionOrder from './positionOrder';
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

export default function OpenOrderTab({ selectedPairs, selected, reload, data }) {
  const [value, setValue] = React.useState(0);
  const [order, setOrder] = React.useState("limit");
  const [count, setcount] = React.useState(0);


  const positionnumber = (data) => {
    setcount(data)
  }

  const updatePositionLengthFromChild = () => {
    alert('calling Position function');
  }


  const getdatas = async () => {
    try {

      const { data } = await Axios.post(`/trade/positionHistory`, { id: selectedPairs }, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        }
      })

      setcount(data?.result?.length)

    } catch (error) {
      console.log(error)
    }

  }
  React.useEffect(() => {
    getdatas()
  }, [selectedPairs])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='spot-graph-chart-tab grey'>
          <Tab label="Open orders" {...a11yProps(0)} />
          <Tab label="Order history" {...a11yProps(1)} />
          <Tab label={`Positions ${count ? count : 0}`} {...a11yProps(2)} />
          {/* <Tab label="Position History" {...a11yProps(3)} /> */}
          <Tab label="Bots" {...a11yProps(4)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Stack spacing={2} direction="row" className='filter-buttons-open-order'>
          <Button variant={order == "limit" ? "contained" : "outlined"} onClick={() => {
            setOrder("limit")
          }}> Limit </Button>
          <Button variant={order != "limit" ? "contained" : "outlined"} onClick={() => {
            setOrder("market")
          }}>Market</Button>
        </Stack>
        <OpenOrderTable selectedPairs={selectedPairs} reload={reload} ordreType={order} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Stack spacing={2} direction="row" className='filter-buttons-open-order'>
          <Button variant={order == "limit" ? "contained" : "outlined"} onClick={() => {
            setOrder("limit")
          }}> Limit </Button>
          <Button variant={order != "limit" ? "contained" : "outlined"} onClick={() => {
            setOrder("market")
          }}>Market</Button>
        </Stack>
        <CompleteAndCancelList selectedPairs={selectedPairs} orderType={order} coinName={data} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        {/* <OpenOrderTable selectedPairs={selectedPairs} /> */}
        <FutureHistory selected={selectedPairs} positionnumber={positionnumber} />
      </TabPanel>

      {/* <TabPanel value={value} index={3}>
        <Stack spacing={2} direction="row" className='filter-buttons-open-order'>
          <Button variant={order == "limit" ? "contained" : "outlined"} onClick={() => {
            setOrder("limit")
          }}> Limit </Button>
          <Button variant={order != "limit" ? "contained" : "outlined"} onClick={() => {
            setOrder("market")
          }}>Market</Button>
        </Stack> */}
        {/* <OpenOrderTable selectedPairs={selectedPairs} /> */}
        {/* <PositionOrder selectedPairs={selectedPairs} orders={order}/>
      </TabPanel> */}
      
      <TabPanel value={value} index={4}>
        <Stack spacing={2} direction="row" className='filter-buttons-open-order'>
          <Button variant={order == "limit" ? "contained" : "outlined"} onClick={() => {
            setOrder("limit")
          }}> Limit </Button>
          <Button variant={order != "limit" ? "contained" : "outlined"} onClick={() => {
            setOrder("market")
          }}>Market</Button>
        </Stack>
        <OpenOrderTable selectedPairs={selectedPairs} ordreType={order} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Stack spacing={2} direction="row" className='filter-buttons-open-order'>
          <Button variant={order == "limit" ? "contained" : "outlined"} onClick={() => {
            setOrder("limit")
          }}> Limit </Button>
          <Button variant={order != "limit" ? "contained" : "outlined"} onClick={() => {
            setOrder("market")
          }}>Market</Button>
        </Stack>
        <OpenOrderTable selectedPairs={selectedPairs} ordreType={order} />
      </TabPanel>
    </Box>
  );
}