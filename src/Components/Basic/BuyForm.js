import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Buyformtab from './buyformtab';
import Buyformtabmarket from './buyformtabmarket';
import Buyformtabstop from './buyformtabstop';
import { Slider, RangeSlider } from 'rsuite' 
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {TextField, InputLabel} from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px !important',
  bgcolor: '#0b1b1d !important',
  border: '2px solid #0b1b1d !important',
  boxShadow: 24,
  p: 2,
};
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

export default function BuyForm({ selected, pair , la,market, reload }) {
  // console.log(selected, pair , la,market,  'BUY FROM');
  const [value, setValue] = React.useState(0);
  const [narmalvalues, setnormalValues] = React.useState(0);
  const [borrowvalues, setborrowValues] = React.useState(0);
  const [repayvalues, setrepayValues] = React.useState(0);
  const [listvalue, setListvalue] = React.useState(0);
  const [openLeverage, setOpenLeverage] = React.useState(false);
  const [openLeverageConfirm, setOpenLeverageConfirm] = React.useState(false);
  const [leveragePercent, setLeveragePercent] = React.useState("2");
  const [leveragePercentRate, setLeveragePercentRate] = React.useState("");
  const [isolate, setIsolate] = React.useState('cross');
  const [tpsl, setTpSl] = React.useState(10);

  const handleOpenLeverage = () => setOpenLeverage(true);
  const handleCloseLeverage = () => setOpenLeverage(false);
  const handleOpenLeverageConfirm = () => {
    setOpenLeverageConfirm(true);
    setOpenLeverage(false)
  }
  const handleCloseLeverageConfirm = () => setOpenLeverage(false);
  
 const handleLeveragePercent = async(e) => {
  // alert(e.target.value)
  setLeveragePercent(e.target.value);
  }

  const handleLeveragePercentRate = () => {
    setLeveragePercentRate(leveragePercent);
    setOpenLeverageConfirm(false);
    // console.log('newvalueip', leveragePercent)
  }

  const closeLeveragePercentRate = () => {
    // setLeveragePercentRate(leveragePercent);
    setOpenLeverageConfirm(false);
    // console.log('newvalueip', leveragePercent)
  }

  useEffect(()=>{
    setLeveragePercentRate(leveragePercent);
  },[])

  const handleInputChange = (e) => {
    setLeveragePercent(e.target.value);
  };

  const handleChanges = (event) => {
    console.log(event.target.value)
    setListvalue(event.target.value);
   setValue(event.target.value)
  };

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

  const handleChangeIsolate = (event) => {
    setIsolate(event.target.value);
  };

  const handleChangeSpTl = (event) => {
    setTpSl(event.target.value);
  };

  const buttonRight = () => {
    document.getElementById('overflow-x').scrollLeft += 500;
  };
  const buttonLeft = () => {
    document.getElementById('overflow-x').scrollLeft -= 500;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      {/* <div className='selection'>
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
        </div> */}
        <Stack className='leverage-row-stack' direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Isolated</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={isolate}
          onChange={handleChangeIsolate}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left"
            }
          }}
          // label='Isolated'
        >
          <MenuItem value={'cross'}>Cross <span>(BTCUSDT Perpetual)</span></MenuItem>
          <MenuItem value={'isolated'}>Isolated <span>(BTCUSDT Perpetual)</span></MenuItem>
          {/* <MenuItem value={'margin'}>Margin <span>mode settings</span></MenuItem> */}
        </Select>
      </FormControl>
    </Box>
    <Button className='leveragePercentRate' onClick={handleOpenLeverage}>{leveragePercentRate}</Button>
      <Modal
        open={openLeverage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='leverage-adjustment-modal'
      >
        <Box sx={style}>
          <Stack className='font-size-for-head' direction="row" justifyContent="space-between" alignItems="center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Adjust leverage
          </Typography>
          <div onClick={handleCloseLeverage}><CloseIcon/></div>
          </Stack>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className='selected-leverage'>BTCUSDT Perpetual <span>Isolated</span> </div>
            <div className='leverage-rate'>
              <label>Leverage</label>
              <TextField onChange={handleInputChange} value={leveragePercent} id="outlined-basic" variant="outlined" />
            </div>
            <div className='inner-matches-outer-inner-outer'>
            <Button id="slideLeft" onClick={buttonLeft}><ArrowLeftIcon/></Button>
            <Button id="slideRight" onClick={buttonRight}><ArrowRightIcon/></Button>
            <div className='inner-matches-outer-inner' id="overflow-x">
            <Stack direction="row">
             <Button value="1" onClick={(value) => handleLeveragePercent(value)}>1x</Button>
             <Button value="2" onClick={(value) => handleLeveragePercent(value)}>2x</Button>
             <Button value="3" onClick={(value) => handleLeveragePercent(value)}>3x</Button>
             <Button value="5" onClick={(value) => handleLeveragePercent(value)}>5x</Button>
             <Button value="10" onClick={(value) => handleLeveragePercent(value)}>10x</Button>
             <Button value="20" onClick={(value) => handleLeveragePercent(value)}>20x</Button>
             <Button value="30" onClick={(value) => handleLeveragePercent(value)}>30x</Button> 
             {/* <Button value="40.00" onClick={(value) => handleLeveragePercent(value)}>40x</Button>
             <Button value="50.00" onClick={(value) => handleLeveragePercent(value)}>50x</Button>
             <Button value="60.00" onClick={(value) => handleLeveragePercent(value)}>60x</Button>
             <Button value="70.00" onClick={(value) => handleLeveragePercent(value)}>70x</Button>
             <Button value="80.00" onClick={(value) => handleLeveragePercent(value)}>80x</Button>
             <Button value="90.00" onClick={(value) => handleLeveragePercent(value)}>90x</Button>
             <Button value="100.00" onClick={(value) => handleLeveragePercent(value)}>100x</Button> */}
             </Stack>
            </div>
            </div>
            <div className='leverage-caution-outer'>
            <div className='leverage-caution'><label>Max position size</label> 0 Contracts</div>
            <div className='leverage-caution'><label>Margin required</label> 0.00 USDT</div>
            <div className='leverage-caution'><label>High leverage. Please trade with caution</label></div>
            </div>
            <div className='cancel-confirm-buttons' >
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button onClick={handleCloseLeverageConfirm} variant="outlined">Cancel</Button>
            <Button onClick={handleOpenLeverageConfirm} variant="contained">Confirm</Button> 
            </Stack>
            </div>
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openLeverageConfirm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='leverage-adjustment-modal'
      >
        <Box sx={style}>
          <Stack className='font-size-for-head' direction="row" justifyContent="space-between" alignItems="center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Adjust leverage
          </Typography>
          <div onClick={closeLeveragePercentRate}><CloseIcon/></div>
          </Stack>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p className='para-Leverage-Confirm'>You've selected a high leverage of {leveragePercent}X, meaning the profits and losses of this position will be multiplied by {leveragePercent}X. A high leverage may expose you to a higher risk of loss or liquidation. Confirm that you want to open position with the selected leverage level?</p>
            <div className='cancel-confirm-buttons' >
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button onClick={closeLeveragePercentRate} variant="outlined">Cancel</Button>
            <Button onClick={handleLeveragePercentRate} variant="contained">Confirm</Button>
            </Stack>
            </div>
          </Typography>
        </Box>
      </Modal>
    </Stack>
        <div  className='tabsection'> 
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='lms'>
          <Tab label="Limit" {...a11yProps(0)} />
          <Tab label="Market" {...a11yProps(1)} />
          {/* <Tab label="Stop" {...a11yProps(2)} /> */}
          <FormControl fullWidth className='select-tpsl-options-form-control'>
        {/* <InputLabel id="demo-simple-select-label">Isolated</InputLabel> */}
      
        {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className='select-tpsl-options'
          value={tpsl}
          onChange={handleChangeSpTl}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left"
            }
          }}
          // label='Isolated'
        >

          <MenuItem value={10}>TP/SL</MenuItem>
          <MenuItem value={20}>Trailing stop</MenuItem>
          <MenuItem value={30}>Trigger</MenuItem>
          <MenuItem value={40}>Advanced limit</MenuItem>
          <MenuItem value={50}>Scaled Order</MenuItem>
          <MenuItem value={60}>Iceberg</MenuItem>
          <MenuItem value={70}>TWAP</MenuItem>
        </Select> */}
      </FormControl>
        </Tabs>
        </div>
      </Box>
      <TabPanel value={value} index={0}> 
      <Buyformtab selected={selected} pair={pair} index={"limit"} market={market} mgnmode={isolate} lever={leveragePercent}  lab={la} reload={reload}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Buyformtabmarket selected={selected} pair={pair} index={"market"} mgnmode={isolate} lab={la} lever={leveragePercent} market={market} reload={reload}/>
      </TabPanel>
      {/* <TabPanel value={value} index={2}> 
      <Buyformtabstop selected={selected} pair={pair} index={"stop"} lab={la} />
      </TabPanel> */}
    </Box>
  );
}