import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useLocation} from 'react-router-dom'
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import inviteslash from "../../images/invite-slash.png";
import inviteleft from "../../images/invite-left.png";
import commissiontiershadow from "../../images/commission-tier-shadow.png";
import copytradebanner from "../../images/copy-trade-rght-img-banner.png";
import "./DepositBody.css";
import MasterTraderTab from "./MasterTraderTab";
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
    backgroundImage: `url(${inviteleft})`,
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
    background:
      "radial-gradient(35.18% 134.17% at 50% 50%, rgba(41, 197, 161, 0.2) 0%, rgba(28, 112, 99, 0.2) 100%)",
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
    background:
      "radial-gradient(35.18% 134.17% at 50% 50%, rgba(41, 197, 161, 0.2) 0%, rgba(28, 112, 99, 0.2) 100%)",
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
      backgroundImage: `url(${commissiontiershadow})`,
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
      backgroundImage: `url(${inviteslash})`,
    },
  },
});

const CopyTradeBody = () => {
  const classes = useStyles();

  return (
    
    <div className="referrals-body-content copy-trade-body-part" id="opennnnnss">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} className="Strategies-List-copytrade-block">
          <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
            <h3 className="Strategies-List-head">Deposit</h3>
          </Grid>{console.log("")}
          
        </Grid>    
        <div style={{width:"85%", margin:"auto",color:"white",textAlign:"end"}}><Button variant="contained" id="backButton" onClick={()=>{
        window.history.back();

        }} >Back</Button></div>
        <Grid container spacing={0} style={{justifyContent:"center"}}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid
              container
              spacing={0}
              className={classes.threeblockcommonclsouter}
            >
              <MasterTraderTab />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CopyTradeBody;
