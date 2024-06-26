import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import noaccounts from '../../images/no-accounts.png'
import SubscriptionBody from '../Subscriptions/subscriptionbody';
import binancecoin from "../../images/binance-coin.svg";
import backarrow from "../../images/back-arrow.svg";
import nextarrow from "../../images/Next-arrow.svg";
import symbol from "../../images/symbol.svg";
import droparrow from "../../images/Droparrow.svg";
import okximage from "../../images/okximage.png";
import imperialimage from "../../images/iumperialimage.png";
import binanceImage from "../../images/binanceimage.png";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Axios from "../../Axios";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { TryOutlined } from "@mui/icons-material";
import TextField from "@mui/material/TextField";



function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const exchanges = [

  {
    exchange: "binance",
    logo: binanceImage,
    referel: "Yes",
    subaccount: "Yes",
    supportType: "Spot, USDⓈ-M, COIN-M",
  },
  {
    exchange: "imperial",
    logo: imperialimage,
    referel: "Yes",
    subaccount: "Yes",
    supportType: "Spot, USDⓈ-M, COIN-M",
  },
  {
    exchange: "okx",
    logo: okximage,
    referel: "Yes",
    subaccount: "Yes",
    supportType: "Spot, USDⓈ-M, COIN-M",
  },
];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  myaccounts: {
    marginTop: '60px !important'
  },
  dashboardcss: {
    border: "1px solid #25DEB0 !important",
    borderRadius: "30px !important",
    padding: ' 15px 20px !important',
  },
  dashboarbodycls: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
  subscriptions: {
    marginTop: '0% !important'
  },
  buttondiv: {
    marginTop: '20px',
    '& button': {
      color: 'rgba(19, 26, 38, 1)',
      fontSize: '14px',
      fontWeight: '600',
      textTransform: 'none',
      padding: '15px 60px',
      /* box-shadow:'none', */
      borderRadius: '8px',
      background: '#25DEB0 !important',
      boxShadow: '0px 2px 12px 0px rgba(139, 237, 210, 0.30)',
    },
  },
  dashboarbalancecls: {
    background:
      "radial-gradient(35.18% 134.17% at 50% 50%, rgba(41, 197, 161, 0.2) 0%, rgba(28, 112, 99, 0.2) 100%) !important",
    border: "0.926846px solid #25DEB0 !important",
    backdropFilter: "blur(1.85369px) !important",
    borderRadius: "30px !important",
    padding: "20px 23px !important",
  },
  blockwidthcmn: {
    maxWidth: "23% !important",
    margin: "40px 0 !important",
    "@media (max-width: 767.98px)": {
      maxWidth: "100% !important",
      margin: "15px 0 !important",
    },
  },
  tradeviewinner: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
  addaccount: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    border: "none !important",
    padding: "60px 0 0 0 !important",
    display: "flex",
    justifyContent: "space-around",
  },
  accpopuptitle: {
    background: "#8D7F1D !important",
    borderRadius: "15px !important",
  },
  accpopuppara: {
    background: "#131A26 !important",
    borderRadius: "15px !important",
  },
  GridPops: {
    height: "100px !important",
    padding: "20px 15px !important",
    border: "1px solid red !important",
    backdropFilter: "blur(2px) !important",
    borderRadius: "30px !important",
    overflow: "auto",
  },
  twobuttons: {
    width: "70%",
    margin: "auto",
    display: "flex",
    justifyContent: "space-around",
  },

  boxfield: {
    padding: "0px 10px",
  },
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  sidebarcls: {
    background: '#010712 !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    overflow: 'hidden',
    position: 'sticky !important',
    top: '0px',
    padding: '0px !important',
    height: '100vh'
  },
  headercls: {
    background: '#131a26 !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    padding: '20px 55px !important',
    height: "100vh !important",
    '& form': {
      padding: '0px !important',
      '@media (max-width: 767.98px)': {
        width: '100%',
      },
      '& button': {
        background: '#25DEB0',
        borderRadius: '0px 5px 5px 0px'
      }
    },
    '@media (max-width: 767.98px)': {
      padding: '20px !important',
    },
  }
});

const ExchangeAccountBody = ({ sideBarShow, setSideBarShow }) => {

  const [value, setValue] = React.useState(0);
  const [valueInnerTab, setValueInnerTab] = React.useState(0);
  const classes = useStyles();
  const [active, setactive] = useState(0)
  const [connected, setconnected] = useState(0)
  const [stop, setstop] = useState(0)
  const [add, setAdd] = useState(true)
  const [balance, setBalance] = useState()
  const [btcbalance, setbtcBalance] = useState()

  React.useEffect(() => {
    Mysubscription()
    getmyWallet()
  }, []);

  const Mysubscription = () => {
    try {
      Axios.get(`/trade/getMysubscription`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          console.log(res.data)
          setconnected(0)
          setconnected(res.data.result.length)
          res.data.result.map((item, index) => {
            if (item.status) {
              console.log(res?.data?.enableLength, "Enable")
              setactive(res?.data?.enableLength)
              setstop(res?.data?.disableLength)
            } else {
              setactive(res?.data?.enableLength)
              setstop(res?.data?.disableLength)
            }

          })
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error)
    }
  }
  const getSubscription = () => {
    Mysubscription()
    getmyWallet()
  }
  const getmyWallet = async () => {
    try {
      await Axios.get(`/bybit/getwallets`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          if (res?.data?.success) {
            for (let i = 0; i < res?.data?.result.length; i++) {
              setBalance(res?.data?.result[i].balance);
              setbtcBalance(res?.data?.result[1].balance)
              console.log(res?.data?.result[i].balance, "baln")
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  // const getmyWallet = () => {
  //   try {
  //     Axios.get(`/wallet/getWalletById`, {
  //       headers: {
  //         Authorization: localStorage.getItem("Mellifluous"),
  //       },
  //     })
  //       .then((res) => {
  //         if (res?.data?.success) {
  //           console.log(res?.data?.total_price_in_usd)

  //           setBalance(res?.data?.total_price_in_usd)
  //           setbtcBalance(res?.data?.result[1].balance)
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }
  const tokenCheck = window.localStorage.getItem("Mellifluous");


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeInnerTab = (event, newValue) => {
    setValueInnerTab(newValue);
  };

  return (
    <div className='ExchangeAccountBody'>

      <Box sx={{ flexGrow: 1 }}>
        <h3>Exchange Accounts</h3>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={7} lg={8} xl={8}>
            <Item className={classes.sidebarcls} id="Exchange-Accounts-top-left">
              <div className='btc-usdt-outer'>
                <h4>Balance on All Accounts</h4>
                <div className='btc-usdt-tabs'>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" id="main-top-tab">
                        <Tab label="USDT" {...a11yProps(0)} />

                      </Tabs>
                    </Box>
                  </Box>
                </div>
              </div>
              <CustomTabPanel value={value} index={0} id="Exchange-Accounts-top-left-inner">
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={valueInnerTab} onChange={handleChangeInnerTab} aria-label="basic tabs example">
                      <Tab label="Day" {...a11yProps(0)} />
                      <Tab label="Week" {...a11yProps(1)} />
                      <Tab label="Month" {...a11yProps(2)} />
                      <Tab label="3 Months" {...a11yProps(3)} />
                      <Tab label="6 Months" {...a11yProps(4)} />
                      <Tab label="Year" {...a11yProps(5)} />

                    </Tabs>
                  </Box>
                  <CustomTabPanel value={valueInnerTab} index={0}>
                    {balance ? Number(balance).toFixed(4) : 0} USDT
                  </CustomTabPanel>
                  <CustomTabPanel value={valueInnerTab} index={1}>
                    Week
                  </CustomTabPanel>
                  <CustomTabPanel value={valueInnerTab} index={2}>
                    Month
                  </CustomTabPanel>
                  <CustomTabPanel value={valueInnerTab} index={3}>
                    3 Months
                  </CustomTabPanel>
                  <CustomTabPanel value={valueInnerTab} index={4}>
                    6 Months
                  </CustomTabPanel>
                  <CustomTabPanel value={valueInnerTab} index={5}>
                    Year
                  </CustomTabPanel>

                </Box>
              </CustomTabPanel>

              <div className='btc-usdt-outer-bottom'>
                <div className='flex-box-left-1'><span>Change</span>-</div>
                <div className='flex-box-left-1'><span>Plan Limit</span><label>1'000.00 USDT</label></div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={4} xl={4}>
            <Item className={classes.headercls} id="account-connect-id">
              <div className='staus-block-right'>
                <div className='ac-block'><span>{connected}</span><label>Accounts Connected</label></div>
                <div className='active-stoped'>
                  <div className='active-stop-block green'><span>{active}</span> Active</div>
                  <div className='active-stop-block orange'><span>{stop}</span> Stopped</div>
                </div>
                {add ? <Button className='Add-Account-btn' variant="contained" onClick={() => { setAdd(false) }}>Add Account</Button> :
                  <Button className='Add-Account-btn' variant="contained" onClick={() => { setAdd(true) }}>My Account</Button>}
              </div>
            </Item>
            <Item className={classes.headercls} id="portfolio-connect-id">
              <div className='portfolio-block-right'>
                <h4>Portfolio</h4>
              </div>
            </Item>




          </Grid>
        </Grid>
      </Box>
      <div></div>
      <h3 className={classes.myaccounts}>My Accounts</h3>

      <div className="dashboard-body">
        <Box sx={{ flexGrow: 1 }} className={classes.dashboardcss}>
          <div className={classes.subscriptions}>
            <SubscriptionBody sideBarShow={sideBarShow}
              setSideBarShow={setSideBarShow} add={add} getSubscription={getSubscription} />
          </div>
          <div className={classes.buttondiv}>
            {add ? <Button className='Add-Account-btn' variant="contained" onClick={() => { setAdd(false) }}>Add Account</Button> :
              <Button className='Add-Account-btn' variant="contained" onClick={() => { setAdd(true) }}>My Account</Button>}
          </div>


        </Box>
      </div>





    </div>
  )
}

export default ExchangeAccountBody
