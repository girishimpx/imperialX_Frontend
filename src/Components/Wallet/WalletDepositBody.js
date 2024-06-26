import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import './Wallet.css'
import TopPerformer from '../Dashboard/TopPerformer';
import WalletTable from './WalletTable';
import WalletPieChart from './WalletPieChart';
// import axios from 'axios'
import CryptoJS from "crypto-js";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QR_Code from '../../images/QR_Code.png'
import { useLocation, useNavigate } from 'react-router-dom';
import Consts from '../../Constansts';
import Axios from '../../Axios';
import TextField from '@mui/material/TextField';
import clipboardCopy from "clipboard-copy";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { QRCodeSVG } from "qrcode.react";
// import Button from '@mui/material/Button';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const steps = [
  {
    label: 'Select cryto to deposit'
  },
  {
    label: 'Deposit details',
  }
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
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
  walletbodycls: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
  },
  walletbalancecls: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
  },
  tradeviewinner: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
  },
  walletcls: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
  }
});

const WalletDepositBody = ({ status }) => {
  const classes = useStyles();
  const [addata, setAddata] = useState([""])
  const [cadd, setCadd] = useState("")
  const [depositNetwork, setDepositNetwork] = React.useState('');
  const [deperr, setDeperr] = useState('');
  const history = useLocation()
  const navigate = useNavigate()
  const ccy = history?.state?.symbol
  const coinName = history?.state?.coinname
  console.log(ccy, "depositedata123", history);

  const getaddress = async () => {
    const data = await Axios.post(`${Consts.BackendUrl}/wallet/getWalletaddressById`, { ccy: coinName }, {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      },
    })
    console.log(data, "satassss")
    if (data?.data?.result?.length > 0) {
      setAddata(data?.data?.result[0].mugavari)
    } else {

      setAddata(null)
    }
  }
  useEffect(() => {
    getaddress()
  }, [ccy, status])


  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {

    if (depositNetwork === "") {
      setDeperr("Select Network")
    } else {
      for (let i = 0; i < addata.length; i++) {
        if (addata[i].chain === depositNetwork) {
          setCadd(addata[i].address)
        }
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };


  const submit = () => {
    navigate('/wallet')
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const handleChangeDeposit = (event) => {
    setDepositNetwork(event.target.value);
  };

  const [depositTo, setDepositTo] = React.useState('');

  const handleChangeDepositTo = (event) => {
    setDepositTo(event.target.value);
  };

  const [addressCopy, setAddressCopy] = React.useState('');

  const handleAddressCopy = (event) => {
    setAddressCopy(event.target.value);
  };

  const handleCopy = (status) => {
    clipboardCopy(status);
    toast.sussess("code copied", {

      duration: 800,
      position: "top-center",

      // Styling
      style: {
        padding: "1rem",
        fontSize: "15px",
        color: "green",
        fontWeight: "bold",
      },
      className: "",

      // Custom Icon
      icon: "👏",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  };

  // useEffect(()=>{
  //   RequestApp()
  // },[])    
  return (
    <div className='Wallet-Body-Page Wallet-deposit-Body-Page'>
      <Toaster />
      <Box sx={{ flexGrow: 1 }}>

        <Button onClick={() => navigate(-1)} className='back-button-style' variant="text"><ArrowBackIcon />Back</Button>

        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.walletbodycls}>
              <h3 className='welcome-msg'>Deposit</h3>
            </Item>
          </Grid>
        </Grid>

        <Grid container spacing={0} id='balance-blocks-trade-view'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.tradeview}>
            <Item className={classes.tradeviewinner}>
              <Box className="stepper-crypto-block" sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  <Step>
                    <StepLabel>
                      Select cryto to deposit
                    </StepLabel>
                    <StepContent>
                      <Box sx={{ minWidth: 120 }}>
                        <TextField fullWidth id="outlined-basic" label="Crypto" variant="outlined" value={coinName} />
                      </Box>

                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select USDT deposit network</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={depositNetwork}
                            onChange={handleChangeDeposit}
                          >

                            {addata?.map((row, index) => {
                              return (
                                <MenuItem value={row?.chain} >{row?.chain}</MenuItem>
                              );

                            })}
                            {console.log(addata, "addddddddd")}

                          </Select>
                          {deperr != "" ?
                            <label className='error-msg-color'>{deperr}</label> :
                            <></>
                          }
                        </FormControl>

                      </Box>


                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Continue
                          </Button>
                        </div>
                      </Box>
                    </StepContent>
                    {depositNetwork &&
                      <label className='select-option-chain-label'>Deposit : {depositNetwork}</label>
                    }
                  </Step>

                  <Step>
                    <StepLabel>
                      Deposit details
                    </StepLabel>
                    <StepContent>
                      <p><strong>Important:</strong> only send {depositNetwork} to this address, you will lose your assets if you send any other crypto</p>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Deposit to</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={10}
                            onChange={handleChangeDepositTo}
                          >
                            <MenuItem value={10}>Funding</MenuItem>
                            {/* <MenuItem value={20}>Trading</MenuItem> */}
                          </Select>
                        </FormControl>
                        <strong className='strong-tad-block-style'>Scan the QR code or copy the information below to the platform you're withdrawing from</strong>
                        <p className='p-tad-block-style'>We don't accept deposits from block rewards, Binance Smart Chain (BSC), and Huobi ECO Chain (HECO) yet</p>
                        <div className='qr-code-info-copy-scan'>
                          <div>
                            <div className='address-label'><label>USDT address</label></div>
                            <TextField fullWidth id="outlined-basic" label="Crypto" variant="outlined" value={cadd} />
                            <div className='copy-address-button'><Button variant="text" onClick={() => handleCopy(cadd)}><ContentCopyIcon />Copy</Button></div>
                          </div>
                          <div className='QR_Code_img-outer'><div className='QR_Code_img'><QRCodeSVG value={cadd} /></div><label>{depositNetwork}</label></div>
                        </div>
                        <div className='deposit-detail-table-block'>
                          <div className='deposit-detail-table-block-inner'><span>Minimum deposit</span><strong> 0.5 {depositNetwork}</strong></div>
                          <div className='deposit-detail-table-block-inner'><span>Deposit arrival</span><strong> 2 confirmation(s)</strong></div>
                          <div className='deposit-detail-table-block-inner'><span>Withdrawal unlock</span><strong> 4 confirmation(s)</strong></div>
                          {/* <div className='deposit-detail-table-block-inner'><span>Contract information</span><strong> Ends c65c50</strong></div> */}
                        </div>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            onClick={submit}
                          >
                            Submit
                          </Button>
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                </Stepper>
              </Box>
            </Item>
          </Grid>
        </Grid>



        <Grid container spacing={0} id='Top-Trading-Plartform'>

        </Grid>

      </Box>
    </div>
  )
}

export default WalletDepositBody
