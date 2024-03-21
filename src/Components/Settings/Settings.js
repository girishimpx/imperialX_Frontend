import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import mastertraderjoin from '../../images/master-trader-join.png'
import './Settings.css'
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import SendIcon from '@mui/icons-material/Send';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';
import userimage from '../../images/user-image.jpg'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
    sidebarcls:{
      background: '#010712 !important',
        borderRadius: '0px !important',
        boxShadow:'none !important',
        overflow: 'hidden',
        position: 'sticky !important',
        top: '0px',
        padding:'0px !important',
        height: '100vh'
    },
    headercls: {
        background: '#131a26 !important',
        borderRadius: '0px !important',
        boxShadow:'none !important',
        padding:'20px 55px !important',
        '& form':{
          padding:'0px !important',
          '@media (max-width: 767.98px)' : {
            width: '100%',
          },
          '& button': {
            background: '#25DEB0',
            borderRadius: '0px 5px 5px 0px'
          }
        },
        '@media (max-width: 767.98px)' : {
          padding: '20px !important',
        },
    },
    modalpaybox: {
        '& > div': {
        height: "auto !important"
        }
    },
    accountpricepopupinner: {
        background: 'transparent !important',
        borderRadius: '0px !important',
        boxShadow:'none !important',
    },
    modalpayboxinner: {
        padding:'30px !important'
    },
    additems: {
        background: 'transparent !important',
        borderRadius: '0px !important',
        boxShadow:'none !important',
        '& fieldset': {
            border: '1px solid #ccc !important',
            borderRadius: '10px !important',
            width:'100%'
        },
        '& input':{
            width:'100%'
        },
        '& label':{
            color: '#fff',
            backgroundColor: 'transparent',
        },
        '& > div': {
            width:'100%'
        }
    }
  });


const Settings = ({setSideBarShow, sideBarShow}) => {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
 
  const [addMasterTrader, setAddMasterTrader] = React.useState(false);

  const handleOpenMasterTrader = () => setAddMasterTrader(true);
  const handleCloseMasterTrader = () => setAddMasterTrader(false);
  


  return (
    <div className='basic-exchange-page'>
     
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0}>
    {/* <Grid item xs={12} sm={12} md={12} lg={2} xl={2}> */}
    <Item className={classes.sidebarcls}>
        <Sidebar sideBarShow={sideBarShow} setSideBarShow={setSideBarShow} />
    </Item>
    {/* </Grid> */}
    <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
      
    <Item className={classes.headercls}>
      <Header sideBarShow={sideBarShow} setSideBarShow={setSideBarShow} />
      <Grid container spacing={0}>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='jmt-common-bg'>
      <div className='master-trader-join'>
         <div className='mastertraderjoin'><img src={mastertraderjoin} alt="mastertraderjoin"/></div>
         <p>Wants to become a master trader!</p>
         <div className='master-trader-join-btn'><Button onClick={handleOpen} variant="contained">Join as a Master Trader</Button></div>
         <div className='pay-input-select'>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Exchange</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Imperial</MenuItem>
          <MenuItem value={20}>Binance</MenuItem>
        </Select>
      </FormControl>
                <Button variant="contained" endIcon={<AddCircleOutlineIcon />} onClick={handleOpenMasterTrader}>Add</Button>
            </div>
      </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='jmt-common-bg right-blllocckk'>
      <div className='master-trader-join'>
        <h3>Following</h3>
        <ul className='ticket'>
            <li><span>Master Trade 1</span><span><DeleteIcon/></span></li>
            <li><span>Master Trade 2</span><span><DeleteIcon/></span></li>
            <li><span>Master Trade 3</span><span><DeleteIcon/></span></li>
            <li><span>Master Trade 4</span><span><DeleteIcon/></span></li>
        </ul>
     </div>
      </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
        <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <div className='userimage'><img src={userimage} alt={userimage}/></div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <div className='trader-type-label-badge'>User Trader</div>
        </Grid>
        </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <Button variant="contained">Copy Trading</Button>
          <Button variant="outlined">Exchange</Button>
        </Grid>
      </Grid>
    </Item>

    </Grid>
    </Grid>
    </Box>

    <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modalpaybox}
      >
        <Box sx={style} className={classes.modalpayboxinner}>
            <div className="modal-close-icon" onClick={handleClose}>
                <HighlightOffIcon/>
            </div>
            <Grid container spacing={0} className='contain-account-qr-code'>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.accountpricepopup}>
            <Item className={classes.accountpricepopupinner}>
                <div className='account-inner'>
                   <h6>Account</h6>
                   <span>9.99000999</span>
                </div>
            </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='Qr-code-pop-up'>
            <Item className={classes.accountpricepopupinner}>
                <div className='account-price-popup-inner'>
                <h6>QR Code</h6>
                </div>
            </Item>
            </Grid>
            </Grid>
            <Grid container spacing={0} className='pay-input-container'>
            <div className='pay-input'>
                <TextField id="outlined-basic" label="Amount" variant="outlined" placeholder='Amount' />
                <Button variant="contained" endIcon={<SendIcon />}>Pay</Button>
            </div>
            </Grid>
        </Box>
      </Modal>

      <Modal
        open={addMasterTrader}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modalpaybox}
      >
        <Box sx={style} className={classes.modalpayboxinner}>
        <div className="modal-close-icon" onClick={handleCloseMasterTrader}>
                <HighlightOffIcon/>
            </div>
            <Grid container spacing={0} className='contain-account-qr-code'>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Item className={classes.additems}>
            <TextField id="outlined-basic" label="API Key" variant="outlined" />
            </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Item className={classes.additems}>
            <TextField id="outlined-basic" label="Secret Key" variant="outlined" />
            </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Item className={classes.additems}>
            <TextField id="outlined-basic" label="API Name" variant="outlined" />
            </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Item className={classes.additems}>
            <TextField id="outlined-basic" label="Permission" variant="outlined" />
            </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Item className={classes.additems}>
            <TextField id="outlined-basic" label="Exchange" variant="outlined" />
            </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Item className={classes.additems}>
            <TextField id="outlined-basic" label="Pass Phase" variant="outlined" />
            </Item>
            </Grid>
            </Grid>
            <div className='submit-api-key-master-trade'><Button className='' variant="contained">Submit</Button></div>
        </Box>
      </Modal>

    </div>
  )
}

export default Settings
