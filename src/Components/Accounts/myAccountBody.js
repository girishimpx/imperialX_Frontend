import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import './Account.css'
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import circledoublecolor from "../../images/circle-double-color.png";
import graphcopytrade from "../../images/graph-copy-trade.png";
import tetherseeklogo from "../../images/tether-seeklogo.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import inviteslash from "../../images/invite-slash.png";
import inviteleft from "../../images/invite-left.png";
import commissiontiershadow from "../../images/commission-tier-shadow.png";
import copytradebanner from "../../images/copy-trade-rght-img-banner.png";
import "./Account.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  dashboarbodycls: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
  invitefriendsleft: {
    padding: "24px 44px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "30px",
    // background: 'rgba(217, 217, 217, 0.1)',
    // borderRadius: '30px',
    // filter: 'blur(0.5px)',
    "& h1": {
      fontSize: "44px",
      color: "#fff",
      textAlign: "left",
    },
    "& p": {
      color: "#ADB1B8",
      fontSize: "22px",
      lineHeight: "30px",
      textAlign: "left",
      marginTop: "10px",
    },
    "@media (max-width: 767.98px)": {
      padding: "15px !important",
    },
  },
  invitefriendsoutercontainer: {
   backgroundColor:'black ',
    border: "1px solid #25DEB0",
    backdropFilter: "blur(2px)",
    borderRadius: "30px",
    position: "relative",
    overflow: "hidden",
  },
  invitefriendsouter: {
    padding: "30px 40px",
    "@media (max-width: 767.98px)": {
      padding: "15px !important",
    },
  },
  commonclscommsntiers: {
   backgroundColor:'black ',
    border: "1px solid #25DEB0",
    backdropFilter: "blur(2px)",
    borderRadius: "30px",
    padding: "40px 30px",
    margin: "40px 0 !important",
    position: "relative !important",
    "&::before": {
      content: '""',
      position: "absolute",
      bottom: "-50px",
      left: "0px",
      width: "100%",
      height: "50px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
     
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: "0px",
      left: "-13px",
      width: "100%",
      height: "100%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      // backgroundImage: `url(${inviteslash})`,
    },
  },
});

const StatergyDetailsBody = ({sideBarShow,setSideBarShow})=> {
  const classes = useStyles();

  return (
    <div className="referrals-body-content copy-trade-body-part">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} className="Strategies-List-copytrade-block">
          <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
            <h3 className="Strategies-List-head">Exchange Account</h3>
          </Grid>
        </Grid>

        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <Grid
              container
              spacing={0}
              className={classes.invitefriendsoutercontainer}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={8}
                xl={8}
                className={classes.invitefriendsouter}
              >
                <div className={classes.invitefriendsleft}>
                  <h1 className="copy-trade-heading">
                    Improve Your Copying with Premium Ref!
                  </h1>
                  <p className="copy-trade-para">
                    Premium Ref plan makes copy trading more profitable. Just
                    create<br></br> an exchange account via our link and get the
                    benefits for free:
                  </p>
                  <ul className="copy-trade-list" id="lists">
                    <li>
                      Trade at the best price due to lowest copying time
                      difference
                    </li>
                    <li>Futures copy trading</li>
                    <li>Auto Alignment: Trader & Scheduled</li>
                    <li>Coin Black List feature</li>
                    <li>Stop Loss feature</li>
                    <li>Strategy Free Trial</li>
                    <li>Special bonuses from our partner exchanges</li>
                    <li>No limit on accounts total balance</li>
                  </ul>
                  <div className="view-rules-btn">
                    <Button
                      variant="outlined"
                      endIcon={<ArrowForwardIosIcon />}
                    >
                      get premium ref
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={4}
                xl={4}
                id="invitefriendsright"
              >
                <div className="inviteslash">
                  <img src={inviteslash} />
                </div>
                <div className="copytradebanner">
                  <img src={copytradebanner} alt="copytradebanner" />
                </div>
              </Grid>
            </Grid>
            
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Grid
              container
              spacing={0}
              className={classes.threeblockcommonclsouter}
            >
              <Grid container spacing={0} className="copytrade-contain-inner">

<Grid
  item
  xs={12}
  sm={12}
  md={12}
  lg={12}
  xl={12}
     className={classes.copytradeblock}
   >
     <div className="outer-copys-trade">
       <div className="copy-trade-row-1">
         <span className="heading-ct">eading</span>
         <div className="heading-ct-img">
           <img
             src={circledoublecolor}
             alt="circle-double-color"
           />
         </div>
       </div>
       <div className="copy-trade-row-2">
         <div className="total-profit">
           <div className="total-profit-top">
             <span>trade list</span>
           </div>
           <div className="total-profit-bottom">
             {/* {row.percentage} */}
           </div>
         </div>
         <div className="total-profit-chart">
           <img
             src={graphcopytrade}
             alt="graph-copy-trade"
           />
         </div>
       </div>
       <div className="copy-trade-row-3">
         <div className="copy-trade-row-3-col-1">
           <label>exchange</label>
           <span>
             <img
               src={circledoublecolor}
               alt="circle-double-color"
             />
             bybit
           </span>
         </div>
         <div className="copy-trade-row-3-col-2">
           <label>base coin</label>
           <span>
             {/* <img src={row.tether} alt="tether" /> */}
             type
           </span>
         </div>
         <div className="copy-trade-row-3-col-3">
           <label>rating</label>
            <span className="yellow">rating</span>
         </div>
         <div className="copy-trade-row-3-col-4">
           <label>risk</label>
           <span>risk</span>
         </div>
         <div className="copy-trade-row-3-col-5">
           <label>type</label>
           <span>type</span>
         </div>
       </div>
  


<div className="twobuttons">
        {/* {(!Wallet && !mysublist.includes(row._id.item.user._id))&&(
            <Button
            className="LocalFireDepartmentIcon-full"
            id="innerButton"
            variant="outlined"
            onClick={() => {
              handleOpen();
              setfollower_user_id(row._id.item.user._id);
            }}
            startIcon={<LocalFireDepartmentIcon />}
          >
            {" "}
            Subscribe
          </Button>
        )} */}


            <Button
            className="LocalFireDepartmentIcon-full"
            variant="outlined"
            id="innerButton"
            // onClick={() => {
              
            //   navigate(`/${Constant.route}/trader-details/${row.user._id}`)
            // }}
           // startIcon={<LocalFireDepartmentIcon />}
          >
            {" "}
            Detail
          </Button>
        
        </div>


     </div>
   </Grid>
   <Grid
  item
  xs={12}
  sm={12}
  md={12}
  lg={12}
  xl={12}
     className={classes.copytradeblock}
   >
     <div className="outer-copys-trade">
       <div className="copy-trade-row-1">
         <span className="heading-ct">eading</span>
         <div className="heading-ct-img">
           <img
             src={circledoublecolor}
             alt="circle-double-color"
           />
         </div>
       </div>
       <div className="copy-trade-row-2">
         <div className="total-profit">
           <div className="total-profit-top">
             <span>trade list</span>
           </div>
           <div className="total-profit-bottom">
             {/* {row.percentage} */}
           </div>
         </div>
         <div className="total-profit-chart">
           <img
             src={graphcopytrade}
             alt="graph-copy-trade"
           />
         </div>
       </div>
       <div className="copy-trade-row-3">
         <div className="copy-trade-row-3-col-1">
           <label>exchange</label>
           <span>
             <img
               src={circledoublecolor}
               alt="circle-double-color"
             />
             bybit
           </span>
         </div>
         <div className="copy-trade-row-3-col-2">
           <label>base coin</label>
           <span>
             {/* <img src={row.tether} alt="tether" /> */}
             type
           </span>
         </div>
         <div className="copy-trade-row-3-col-3">
           <label>rating</label>
            <span className="yellow">rating</span>
         </div>
         <div className="copy-trade-row-3-col-4">
           <label>risk</label>
           <span>risk</span>
         </div>
         <div className="copy-trade-row-3-col-5">
           <label>type</label>
           <span>type</span>
         </div>
       </div>
  


<div className="twobuttons">
        {/* {(!Wallet && !mysublist.includes(row._id.item.user._id))&&(
            <Button
            className="LocalFireDepartmentIcon-full"
            id="innerButton"
            variant="outlined"
            onClick={() => {
              handleOpen();
              setfollower_user_id(row._id.item.user._id);
            }}
            startIcon={<LocalFireDepartmentIcon />}
          >
            {" "}
            Subscribe
          </Button>
        )} */}


            <Button
            className="LocalFireDepartmentIcon-full"
            variant="outlined"
            id="innerButton"
            // onClick={() => {
              
            //   navigate(`/${Constant.route}/trader-details/${row.user._id}`)
            // }}
           // startIcon={<LocalFireDepartmentIcon />}
          >
            {" "}
            Detail
          </Button>
        
        </div>


     </div>
   </Grid>
  
</Grid>
          
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default StatergyDetailsBody;
