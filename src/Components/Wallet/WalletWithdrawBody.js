import React, { useState, useEffect, useRef } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import './Wallet.css'
import TopPerformer from '../Dashboard/TopPerformer';
import WalletTable from './WalletTable';
import WalletPieChart from './WalletPieChart';
import axios from 'axios'
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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import ExplicitIcon from '@mui/icons-material/Explicit';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from '../../Axios';
import consts from '../../Constansts';
import toast from 'react-hot-toast';
import { red } from '@mui/material/colors';
import Modal from '@mui/material/Modal';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px !important',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

/** OTP */
const OtpInput = ({ length, changeOptvalue }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef(Array(length).fill(null).map(() => React.createRef()));

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Update the state with the new value
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    // Move focus to the next input if available
    if (index < length - 1 && value !== '') {
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    changeOptvalue(otp)
  }, [otp])

  const handleKeyDown = (e, index) => {
    // Move focus to the previous input if the user presses backspace
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className='otp-box-flex-row'>
      {otp.map((digit, index) => (
        <input
          className='otp-text-field'
          key={index}
          type="text"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
          ref={(el) => (inputRefs.current[index] = el)}
        />
      ))}
    </div>
  );
};



const WalletWithdrawBody = () => {
  const classes = useStyles();
  const history = useLocation()
  const navigate = useNavigate()
  const ccy = history.state
  console.log(ccy,"cccc")
  const [activeStep, setActiveStep] = React.useState(0);

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

  const [addata, setAddata] = useState([""])

  const [depositNetwork, setDepositNetwork] = React.useState('');
  const [depositTo, setDepositTo] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [amountWithdraw, setamountWithdraw] = React.useState('');
  const [feeWithdraw, setfeeWithdraw] = React.useState('');
  const [depositNetworkerr, setDepositNetworkerr] = React.useState('');
  const [depositToerr, setDepositToerr] = React.useState('');
  const [addresserr, setAddresserr] = React.useState('');
  const [amountWithdrawerr, setamountWithdrawerr] = React.useState('');
  const [feeWithdrawerr, setfeeWithdrawerr] = React.useState('');
  const [openOtpVerify, setOpenOtpVerify] = React.useState(false);
  const handleOpenOtpVerify = () => setOpenOtpVerify(true);
  const handleCloseOtpVerify = () => setOpenOtpVerify(false);

  const [otpCheck, setOtpCheck] = useState(false)

  const [otpValue, setOtpValue] = useState()

  const handleChangeDeposit = (event) => {
    setDepositToerr("")
    setDepositNetwork(event.target.value);
  };

  const handleChangeDepositTo = (event) => {
    setDepositNetworkerr("")
    setDepositTo(event.target.value);
  };

  const [addressCopy, setAddressCopy] = React.useState('');

  const handleAddressCopy = (event) => {
    setAddressCopy(event.target.value);
  };


  const handleNext = () => {
    if (depositNetwork === "") {
      setDepositToerr("Please Select Type")
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

  };

  const withdraw = async () => {
    try {

      if (depositTo === "") {
        setDepositNetworkerr("Please Select Network")
      } else if (address === "") {
        setAddresserr("Please Enter Address")
      } else if (amountWithdraw === "") {
        setamountWithdrawerr("Please Enter Amount")
      } else if (depositNetwork === 4 && feeWithdraw === "") {
        setfeeWithdrawerr("Please Enter Fee")
      }
      else {
        var payload = {}

        if (depositNetwork === 4) {
          payload = {
            "Amount": amountWithdraw,
            "Fee": feeWithdraw,
            "Dest": depositNetwork.toString(),
            "Currency": ccy?.symbol,
            "Chain": depositTo,
            "Address": address
          }
        } else {
          payload = {
            "Amount": amountWithdraw,
            "Fee": "0",
            "Dest": depositNetwork.toString(),
            "Currency": ccy?.symbol,
            "Address": address
          }
        }
        const { data } = await Axios.post(`/wallet/withdrawUser`, payload, {
          headers: {
            Authorization: window.localStorage.getItem("Mellifluous")
          }
        })
        if (data?.success === true) {
          toast.success(data?.message)
          navigate('/wallet')
        } else {
          toast.error(data?.message)
        }
      }

    } catch (error) {
      console.log("🚀 ~ file: WalletWithdrawBody.js:149 ~ withdraw ~ error:", error)
    }

  }

  const withdrawOtp = async () => {
    try {
      const { data } = await Axios.post('/wallet/withdrawOtp', "", {
        headers: { Authorization: window.localStorage.getItem("Mellifluous") }
      })
      if (data?.success === true) {
        toast.success(data?.message)
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log("🚀 ~ file: WalletWithdrawBody.js:282 ~ withdrawOtp ~ error:", error)
    }

  }

  const walletCheck = async () => {
    try {
      var otps
      for (let i = 0; i < otpValue.length; i++) {
        const element = otpValue[i];
        if (i == 0) {
          otps = element
        } else {
          otps += element
        }

      }
      const { data } = await Axios.post('/wallet/withDrawCheckOTP', {
        withdrawOtp: otps
      })
      if (data?.success === true) {
        toast.success(data?.message)
        setOtpCheck(true)
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log("🚀 ~ file: WalletWithdrawBody.js:308 ~ walletCheck ~ error:", error)
    }
  }

  useEffect(() => {
    if (otpValue?.length > 0) {
      if (otpValue[5] != "") {
        walletCheck()
      }
    }
  }, [otpValue])

  const getaddress = async () => {
    const data = await Axios.post(`${consts.BackendUrl}/wallet/getWalletaddressById`, { ccy: ccy }, {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      },
    })
    console.log(data,"adddddadadadaa")
    if (data?.data?.result?.length > 0) {
      setAddata(data?.data?.result)
    } else {
      setAddata(null)
    }
  }
  useEffect(() => {
    getaddress()
  }, [ccy])

  const changeOptvalue = (data) => {
    setOtpValue(data)
  }

  // useEffect(()=>{
  //   RequestApp()
  // },[])    
  return (
    <div className='Wallet-Body-Page Wallet-deposit-Body-Page'>
      <Box sx={{ flexGrow: 1 }}>
      
      <Button onClick={() => navigate(-1)} className='back-button-style' variant="text"><ArrowBackIcon/>Back</Button>

        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.walletbodycls}>
              <h3 className='welcome-msg'>Withdraw</h3>
            </Item>
          </Grid>
        </Grid>

        <Grid container spacing={0} id='balance-blocks-trade-view'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.tradeview}>
            <Item className={classes.tradeviewinner}>
              <Box className="stepper-crypto-block" sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {/* {steps.map((step, index) => ( */}
                  <Step>
                    <StepLabel>
                      Select cryto to withdraw
                    </StepLabel>
                    <StepContent>
                      <Box sx={{ minWidth: 120 }}>
                        {/* <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select Crypto</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>USDT</MenuItem>
                            <MenuItem value={20}>USDC</MenuItem>
                            <MenuItem value={30}>BTC</MenuItem>
                            <MenuItem value={40}>ETH</MenuItem>
                            <MenuItem value={50}>OKB</MenuItem>
                          </Select>
                        </FormControl> */}
                        <TextField fullWidth id="outlined-basic" label="Crypto" variant="outlined" value={ccy?.symbol} />
                      </Box>

                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select withdrawal network</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={depositNetwork}
                            onChange={handleChangeDeposit}
                          >
                            <MenuItem value={4}>On-chain</MenuItem>
                            <MenuItem value={3}>Internal (free)</MenuItem>
                          </Select>
                        </FormControl>
                        {depositToerr !== "" ? <div style={{ color: 'red' }} >{depositToerr}</div> : <></>}
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
                  </Step>

                  <Step>
                    <StepLabel>
                      Withdrawal details
                    </StepLabel>
                    <StepContent>
                      <p>Ensure the {ccy?.symbol} network you have selected is supported by the depositing platform, otherwise you will lose your assets</p>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select the {ccy?.symbol} withdrawal network</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={depositTo}
                            onChange={handleChangeDepositTo}
                          >
                            {addata?.map((row, index) => {
                              return (
                                <MenuItem value={row?.chain} >{row?.chain}</MenuItem>
                              );
                            })}
                            {console.log(addata,"ddddddd")}
                          </Select>
                          {depositNetworkerr !== "" ? <div style={{ color: 'red' }} >{depositNetworkerr}</div> : <></>}
                        </FormControl>
                        <div className='amount-withdrawal-part address-domain-part'>
                          <label className='amount-withdrawal-part-label'>{ccy?.symbol} address/domain</label>
                          <span className='amount-withdrawal-part-enable'><label>Enable allowlist to protect your assets</label> <Button>Enable</Button></span>
                          <div className='amount-withdrawal-part-field'><TextField id="outlined-basic" label="Enter an address or choose from address book" variant="outlined" onChange={(e) => { setAddress(e.target.value); setAddresserr("") }} /></div>
                          {addresserr !== "" ? <div style={{ color: 'red' }} >{addresserr}</div> : <></>}
                        </div>
                        <div className='amount-withdrawal-part'>
                          <label className='amount-withdrawal-part-label'>Amount</label>
                          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <OutlinedInput
                              id="outlined-adornment-weight"
                              endAdornment={<InputAdornment position="end">{ccy?.symbol}</InputAdornment>}
                              aria-describedby="outlined-weight-helper-text"
                              inputProps={{
                                'aria-label': 'weight',
                              }}
                              onChange={(e) => { setamountWithdraw(e.target.value); setamountWithdrawerr("") }}
                            />
                          </FormControl>

                          <span><label>Available:</label> 10.987654231 {ccy?.symbol}</span>
                          {amountWithdrawerr !== "" ? <div style={{ color: 'red' }} >{amountWithdrawerr}</div> : <></>}
                        </div>

                        {otpCheck === false &&
                          <div className='amount-withdrawal-part' style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <div className='otp-send-verify'>
                              <label className='amount-withdrawal-part-label'>Please enter you 6 digit OTP to withdraw</label>
                              <Button className='otp-verify-submit' variant="text" onClick={() => { withdrawOtp() }} >Send OTP</Button>
                            </div>
                            <OtpInput length={6} changeOptvalue={changeOptvalue} />
                          </div>
                        }

                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <div>
                          {otpCheck === true &&
                            <Button
                              variant="contained"
                              onClick={withdraw}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Submit
                            </Button>
                          }
                          <Modal
                            open={openOtpVerify}
                            onClose={handleCloseOtpVerify}
                            className='otp-verify-modal'
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style} className='otp-verify-modal-box'>
                              <Typography id="modal-modal-title" variant="h6" component="h2">
                                OTP Verification
                              </Typography>
                              <Typography className='otp-verify-box' id="modal-modal-description" sx={{ mt: 1 }}>
                                Please enter your OTP to withdraw
                              </Typography>
                              <Typography className='otp-verify-box' id="modal-modal-description-1" sx={{ mt: 1 }}>
                                <TextField id="outlined-basic" variant="outlined" />
                              </Typography>
                              <Typography className='otp-verify-box' id="modal-modal-description-2" sx={{ mt: 2 }}>
                                <Button className='otp-verify-submit' variant="contained">Submit</Button>
                              </Typography>
                            </Box>
                          </Modal>
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                  {/* ))} */}
                </Stepper>
                {/* {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )} */}
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

export default WalletWithdrawBody
