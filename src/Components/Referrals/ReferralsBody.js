import React,{ useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Axios from "../../Axios";
import Consts from "../../Constansts";
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import inviteslash from '../../images/invite-slash.png'
import inviteleft from '../../images/invite-left.png'
import inviteafriend from '../../images/invite-a-friend.png'
import introrefreetrade from '../../images/introrefree-trade.png'
import inviteandearn from '../../images/invite-and-earn.png'
import arrowinvite from '../../images/arrow-invite.png'
import commissiontiershadow from '../../images/commission-tier-shadow.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';
import Constant from "../../Constansts";

import './ReferralsBody.css'

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
    backItem:{
      marginBottom:'30px !important'
    },
    invitefriendsleft: {
        padding: '24px 44px',
        backgroundImage: `url(${inviteleft})`,
        backgroundPosition: 'center', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        borderRadius: '30px',
        // background: 'rgba(217, 217, 217, 0.1)',
        // borderRadius: '30px',
        // filter: 'blur(0.5px)',
        '& h1': {
            fontSize: '48px',
            color: '#fff',
            textAlign: 'left'
        },
        '& h5': {
            fontSize: '20px',
            color: '#fff',
            textAlign: 'left',
            marginBottom: '10px'
        },
        '& p': {
            color: '#ADB1B8',
            fontSize: '18px',
            lineHeight: '30px',
            textAlign: 'left',
            marginTop: '10px'
        },
        "@media (max-width: 767.98px)": {
          padding: "15px !important",
        }
    },
    backItem: {
      marginBottom: '30px !important',
      textAlign:'left',
    },
    invitefriendsoutercontainer: {        
        background: 'radial-gradient(35.18% 134.17% at 50% 50%, rgba(41, 197, 161, 0.2) 0%, rgba(28, 112, 99, 0.2) 100%)',
        border: '1px solid #25DEB0',
        backdropFilter: 'blur(2px)',
        borderRadius: '30px',
        position: 'relative',
        overflow: 'hidden'
    },
    invitefriendsouter: {
        padding: '30px 40px',
        "@media (max-width: 767.98px)": {
          padding: "15px !important",
        },
    },
    commonclscommsntiers: {
        background: 'radial-gradient(35.18% 134.17% at 50% 50%, rgba(41, 197, 161, 0.2) 0%, rgba(28, 112, 99, 0.2) 100%)',
        border: '1px solid #25DEB0',
        backdropFilter: 'blur(2px)',
        borderRadius: '30px',
        padding: '40px 30px',
        margin:'40px 0 !important',
        position: 'relative !important',
        '&::before': {
            content: '""',
            position:'absolute',
            bottom:'-50px',
            left: '0px',
            width: '100%',
            height: '50px',
            backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${commissiontiershadow})`
        },
        '&::after': {
            content: '""',
            position:'absolute',
            top:'0px',
            left: '-13px',
            width: '100%',
            height: '100%',
            backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${inviteslash})`
        }
    }
  });
  
const ReferralsBody = () => {

  const classes = useStyles();
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate()
useEffect(()=>{
  console.log("Referrals}")
  getMydetail()
},[])
const getMydetail = async () => {
  try {
    await Axios.get(`${Consts.BackendUrl}/users/get_profile`, {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      },
    }).then((res) => {
      if (res?.status === 200) {
       
          console.log(res?.data);
          setUser(res?.data)
          setLoading(false);
      
      }
      console.log(res.data)
      setLoading(false);
    })
  } catch (error) {
    setLoading(false);
  }
  
}

  return (
    <div className='referrals-body-content'>
      
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3} className={classes.backItem}>
        <Button
                className="back-icon-page"
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={() => {
                  navigate(`${Constant.route}/`);
                }}
              >
                Back
              </Button>
        </Grid>
        </Grid>
        <Grid container spacing={0}>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
       
        <Grid container spacing={0} className={classes.invitefriendsoutercontainer}>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8} className={classes.invitefriendsouter}>
        <div className={classes.invitefriendsleft}>
        <h5>Your Refferal Code : {user?.referral_code}</h5>
        <h1>Invite Friends and Earn Commissions!</h1>
        <p>Earn up to 30% commission from every trade completed by your<br></br> referees (you can also earn commissions from referees of previous<br></br> program. Please read up on program rules.)</p>
        <div className='view-rules-btn'><Button variant="outlined" endIcon={<ArrowForwardIosIcon />}>View Rules</Button></div>
        </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4} id="invitefriendsright">
        <div className='inviteslash'><img src={inviteslash}/></div>
        <div className='referal-code-link-outer'>
        <h5>Generate Invite Code and Link</h5>
        <div className='My-Commission'><label>My Commission</label><span>20%</span></div>
        <div className='refer-code'>
            <label>Referral Code</label>
        </div>
        <div className='refer-link'>
            <label>Referral Link</label>
        </div>
        <Button className='invite-friends-button' variant="contained" endIcon={<ArrowForwardIcon />}>Invite Friends</Button>
        </div>
        </Grid>
        </Grid>

        <Grid container spacing={0} className={classes.threeblockcommonclsouter}>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4} className='three-block-common-cls'>
            <div className='inviteafriend'><img src={inviteafriend} alt="inviteafriend"/></div>
            <span>Invite Friends to Deposit</span>
            <p>Invite your friend to sign up via your referral link and get them to deposit at least $100 worth of asset(s) within seven (7) days of signing up. You'll each receive a 10 USDT reward.</p>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4} className='three-block-common-cls'>
            <div className='introrefreetrade'><img src={introrefreetrade} alt="introrefreetrade"/></div>
            <span>Referee Trade</span>
            <p>Get your referee to trade at least $500 on within 30 days of signing up. You'll each receive a 15 USDT reward.</p>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4} className='three-block-common-cls'>
            <div className='inviteandearn'><img src={inviteandearn} alt="inviteandearn"/></div>
            <span>Trade More, Earn More</span>
            <p>When your referee accumulates a trading volume of at least $10,000, you'll each receive a Mystery Box worth up to 1,000 USDT.</p>
        </Grid>
        </Grid>

        <Grid container spacing={0} className='commission-tiers-section'>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <h2>Commission Tiers</h2>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className={classes.commonclscommsntiers} >
            <div className='percentage-commission'><label>20</label><span>%</span></div>
            <div className='percentage-commission-para'><p>Invite 0 or more qualified referees</p></div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={1} xl={1}></Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className={classes.commonclscommsntiers} >
            <div className='percentage-commission'><label>25</label><span>%</span></div>
            <div className='percentage-commission-para'><p>Invite 5 or more qualified referees</p></div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={1} xl={1}></Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className={classes.commonclscommsntiers} >
            <div className='percentage-commission'><label>30</label><span>%</span></div>
            <div className='percentage-commission-para'><p>Invite 100 or more qualified referees, or achieve at least $15 million in Derivatives trading volume through your referees in a quarter.</p></div>
        </Grid>
        </Grid>

        </Grid>

        </Grid>

        </Box>


    </div>
  )
}

export default ReferralsBody
