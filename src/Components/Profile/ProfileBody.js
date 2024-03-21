import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import './ProfileBody.css'
import PropTypes from 'prop-types';
import Axios from "../../Axios";
import Consts from "../../Constansts";
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import rightmove from '../../images/right-move.png'
import midleftimg from '../../images/mid-left-img.png'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import recommmend1 from '../../images/recommmend-1.png'
import tick from "../../images/tick.svg";
import recommmend2 from '../../images/recommmend-2.png'
import recommmend3 from '../../images/recommmend-3.png'
import recommmend4 from '../../images/recommmend-4.png'
import { Link } from 'react-router-dom';
import asseteye from '../../images/asset-eye.png'
import readmorenew from '../../images/read-more-new.png'
import Announcementimg from '../../images/Announcement-img.png'

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Verified } from '@mui/icons-material';
import { faLinesLeaning } from '@fortawesome/free-solid-svg-icons';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

  const useStyles = makeStyles({
    dashboarbodycls:{
        background: 'transparent !important',
        borderRadius: '0px !important',
        boxShadow:'none !important',
    },
    highspan:{
      color:'green',
      '& ::after':{
        content:"Hidh"
      }
    },
    lowspan:{
      color:'red !important',
    '& span': {
      content: '""',
      width: '5px',
      height: '5px',
      backgroundColor: 'blue',
      borderRadius: '50%',
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  }
});
  

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

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

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

const ProfileBody = () => {


  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate()
  const [user, setUser] = React.useState();
  const [plan, setPlan] = React.useState();
  const [usd,setUsd] = React.useState()
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    console.log("Referrals}")
    getMydetail()
    getPlans()
  }, [])
  const getMydetail = async () => {
    try {
      await Axios.get(`${Consts.BackendUrl}/users/get_profile`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      }).then((res) => {
        if (res?.status === 200) {

          console.log(res?.data,'********************************');
          setUser(res?.data?.result)
          setUsd(res?.data?.total_price_in_usd)
          setLoading(false);

        }
        console.log(res?.data?.total_price_in_usd)
        setLoading(false);
      })
    } catch (error) {
      setLoading(false);
    }

  }
  const getPlans = async () => {
    try {
      await Axios.get(`${Consts.BackendUrl}/users/getmyplan`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      }).then((res) => {
        if (res?.status === 200) {

          console.log(res?.data?.result[0]);
          setPlan(res?.data?.result[0])
          setLoading(false);

        }
        console.log(res?.data?.result[0])
        setLoading(false);
      })
    } catch (error) {
      setLoading(false);
    }

  }

  return (
    <div className='dashboard-body spot-body basic-page-body'>

      <Box sx={{ flexGrow: 1 }}>
  
        <Grid container spacing={0}>


          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

    <Grid container spacing={0}>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} id="my-profile-details">
      <div className='top-part-all-page basic-page-top-part'>
         <div className='top-col-2'><div></div><span>{user?.name}</span></div>
         {/* <div className='top-col-3 comon-flex-top-bot-style'><span>USDT</span><span>{user?.referal_money ? user?.referal_money:"0"}</span></div> */}
         <div className='top-col-3 comon-flex-top-bot-style'><span>USD Balance</span><span>{usd ? usd.toFixed(2):"0"}USD</span></div>
         <div className='top-col-4 comon-flex-top-bot-style'><span>Referal Code</span><span>{user?.referral_code ? user?.referral_code :"-"}</span></div>
         <div className='top-col-4 comon-flex-top-bot-style'><span>Account Info</span><span>{user?.email}</span></div>
         <div className='top-col-5 comon-flex-top-bot-style'><span>Identity Verification</span>{user?.email_verify ?<span style={{color:"#25DEB0"}}><img src={tick} /> Verified</span>:
         <span style={{color:"red"}}>Not Verified</span>}</div>
         <div className='top-col-6 comon-flex-top-bot-style'><span>Security Level</span>
         {user?.f2A_Status === true ? <span className={classes.highspan}>High</span> : <span className={classes.lowspan}>Low</span>}
         </div>
      </div>
    </Grid>
    </Grid>

            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='margin-none'>
                <Item className={classes.dashboarbodycls} id="open-order-id-outer">
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
                      <div className='part-left-part-outer-outer'>
                        <div className='part-left-part part-top-part'>
                          <h3>30,000 USDT Deposit Blast-Off Rewards</h3>
                          <div className='redeem-block-right'>
                          <h5>{user?.redeem_points ? user?.redeem_points : "0.00"}</h5>
                        <div className='rightmove'><div className='task-right'><Button className='redeem-btn-cls-style' disabled={user?.iseligible == 'Approved' ? false : true} variant="contained" >Redeem <div><img src={rightmove} alt="rightmove" /></div></Button></div></div>
                        </div>
                        </div>
                        <div className='part-left-part part-mid-part'>
                          <div className='mid-left-img'><img src={midleftimg} alt="mid-left-img" /></div>
                          <div className='mid-right-mid'>
                            <div className='mid-right-mid-top'><span>0</span>/30000 USDT</div>
                            <span className='Rewards-Unlocked'>Rewards Unlocked</span>
                            <div className='mid-right-mid-bottom'>
                              <Stack spacing={2} direction="row" className='coin-buttons-row'>
                                <Button variant="contained">10 USDT</Button>
                                <span></span>
                                <Button variant="contained">20 USDT</Button>
                                <span></span>
                                <Button variant="contained">50 USDT</Button>
                                <span></span>
                                <Button variant="contained">100 USDT</Button>
                                <span></span>
                                <Button variant="contained">150 USDT</Button>
                              </Stack>
                            </div>
                          </div>
                        </div>
                        <div className='part-left-part part-bottom-part recommended'>
                          <h3>Recommended</h3>
                          <div className='recommend-block-outer'>

            <div className='recommend-1'>
                <div className='recommend-top-line'><div className='ec-img-new'><img src={recommmend1} alt="recommmend1"/></div><span className='rec-head-new'>SUI Liquidity Mining</span></div>
                <div className='recommend-bot-line'>24h APR: 159.5 % - 478.5 %</div>
            </div>
            <div className='recommend-2 cmn-flex-block-type'>
            <div className='recommend-block-left'><h6>Download & Trade in App Now</h6><Link>Get App</Link></div>
            <div className='recommend-block-right'><img src={recommmend3} alt="Download-&-Trade-in-App-No"/></div>
            <div className='notice-block'>Limited</div>
         </div>
         <div className='recommend-3 cmn-flex-block-type'>
           <div className='recommend-block-left'><h6>Invite friends and Earn 25 USDT Cashback and 10,000 USDT Lucky Draw</h6><Link>Invite now</Link></div>
            <div className='recommend-block-right'><img src={recommmend4} alt="Invite-friends"/></div>
            <div className='notice-block'>New</div>
         </div>
            <div className='recommend-1 recommend-4'>
                <div className='recommend-top-line'><div className='ec-img-new'><img src={recommmend2} alt="recommmend2"/></div><span className='rec-head-new'>Tools Discovery</span></div>
                <div className='recommend-bot-line'>Discover Tools Tailored to Your Trading Style</div>
            </div>
        
         </div>
         </div>
         </div>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
        <div className='complete-task'>
            <h6>Complete the following tasks to grab more rewards</h6>
            <div className='task-1 complete-common'>
               <div className='task-left'>
                <label>Deposit ≥ $100</label>
                    <div className='depoit-trade-progress'>
                    <BorderLinearProgress variant="determinate" value={50} />
                    <span>0/100 USDT</span>
                    </div>
               </div>
               <div className='task-right'><Button variant="contained">Deposit Now</Button></div>
            </div>
            <span className='add-mid-round'>Add</span>
            <div className='task-1 task-2 complete-common'>
               <div className='task-left'>
                <label>Trade ≥ $500</label>
                    <div className='depoit-trade-progress'>
                    <BorderLinearProgress variant="determinate" value={50} />
                    <span>0/500 USDT</span>
                    </div>
               </div>
               <div className='task-right'><Button variant="contained">Trade Now</Button></div>
            </div>
        </div>
        <div className='plan-task current-plan-details'>
                        <h6>Current Plan - Details</h6>
                        <div className='task-1 plan-common'>
                          <div className='task-left'>
                            <div className={classes.innerdivision}>
                              <div className={classes.heading}>

                                <Grid id="current-plan-details-left" container className={classes.price} justifyContent="center" alignItems='center'>
                                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                  {plan?.isActivate ? <h4>{plan?.planType} <span>({plan?.planMode})</span></h4> : <></>}
                                    {plan?.isActivate ? <>

                                      {plan?.planMode === "Month" ? <h1>{plan?.plans[0].per_month}</h1> : <h1>{plan?.plans[0].per_year}</h1>}
                                    </> : <Button variant="contained" onClick={() => {
                                      navigate(`${Consts.route}/my-subscription`);
                                    }}>Select Plan</Button>}

                                  </Grid>
                                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                    {plan?.planMode ? <p>{plan?.planMode}USD<br></br></p> : <></>}
                                  </Grid>
                                </Grid>

                                {plan?.isActivate ? <h6 id="current-plan-details-right">Expired On:{new Intl.DateTimeFormat("en-US", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                }).format(plan?.endDate)}</h6> : <></>}

                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

    </Grid>
    </Grid>
    </Item>
    </Grid>
    </Grid>

            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='margin-none'>
                <Item className={classes.dashboarbodycls} id="basic-graph-chart">

                  <div className='user-asset-block-dtls padding14px'>
                    <div className='asset-read-more'><label>My Assets<img src={asseteye} alt="asseteye" /></label><Link>Assets Details<img src={readmorenew} alt="read-more-new" /></Link></div>

                    <div className='flex-box-my-asset'>
                    <div className='total-asset-user'>
                      <span>Total Assets</span>
                      <label>0.00 USD</label>
                      <span>≈ 0.00000000 BTC</span>
                    </div>
                    <div className='make-first-deposit'>
                      <div className='make-deposit-inner'>
                        <span>Make your first deposit to win exclusive coupons</span>
                        <Stack spacing={2} direction="row" className='make-your-first-deposit'>
                          <Button variant="contained">Deposit</Button>
                          <Button variant="outlined">Buy Crypto</Button>
                        </Stack>
                      </div>
                    </div>
                    </div>

                  </div>

                </Item>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='margin-none' id="sell-buy-form-outer-id-grid">
                <Item className={classes.dashboarbodycls} id="sell-buy-form-outer-id">

                  <div className='user-asset-block-dtls padding14px'>
                    <div className='asset-read-more'><label>Announcements</label><Link>Read More<img src={readmorenew} alt="read-more-new" /></Link></div>
                    <div className='Announcement-img-outer'>
                      <div className="announment-block">
                        <div className='Announcement-img-inner'><img src={Announcementimg} alt="Announcement-img" /></div>
                        <h5>Upcoming Changes to Interest-Free Loan Quota for</h5>
                      </div>
                      <div className="announment-block">
                        <div className='Announcement-img-inner'><img src={Announcementimg} alt="Announcement-img" /></div>
                        <h5>[Africa Exclusive] Crypto Education Showdown: Win a</h5>
                      </div>
                      <div className="announment-block">
                        <div className='Announcement-img-inner'><img src={Announcementimg} alt="Announcement-img" /></div>
                        <h5> Launchpool: Stake BIT to Earn a Share of 900,000 SUIA!</h5>
                      </div>
                    </div>
                  </div>

                </Item>
              </Grid>
            </Grid>

          </Grid>



        </Grid>
      </Box>

    </div>
  )
}

export default ProfileBody
