import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import dashboard from "../../images/dashboard.svg";
import market from "../../images/market.svg";
import exchange from "../../images/exchange.svg";
import copytrade from "../../images/copy-trade.svg";
import Ethereum from "../../images/Ethereum.svg";
import Analytics from "../../images/Analytics.svg";
import AccountPng from "../../images/acc2png.png";
import logominimize from "../../images/logo-minimize.png";
import referal from "../../images/referal.svg";
import subscribe from "../../images/subscribe.svg";
import account from "../../images/account.svg";
import historyicon from "../../images/history.svg";
import Wallets from "../../images/billfold.png";
import customerservice from "../../images/customer-service.svg";
import setting from "../../images/setting.svg";
import dropdownicon from "../../images/dropdown-icon.png";
import Constant from "../../Constansts";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Axios from "axios";
import Consts from "../../Constansts";
import KYC from "../KYCForm/KYCForm";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import spoticon from '../../images/spot-icon.png'
import marginicon from '../../images/margin-icon.png'
import futureicon from '../../images/future-icon.png'
import exchangeaccicon from '../../images/exchange-account-icon.png'
import strategiesicon from '../../images/strategies-icon.png'
import subscriptionicon from '../../images/subscription-icon.png'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  position: 'sticky',
  right: '-20px',
  background: '#ccc',
  top: '0%',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  flexcls: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "45px",
    alignItems: "center",
  },

  sidebarclsinner: {
    // width: "17%",
    // position: "fixed",
    height: "100%",
    background: "#010712 !important",
    // left: "0px",
    // top: "0px",
    overflow: 'auto',
    paddingTop: '20px',
    paddingRight: '15px',
    "& nav": {
      "& ul": {
        "& li": {
          "& span": {
            "@media (max-width: 1199.98px)": {
              fontSize: '1rem !important'
            }
          },
        },
      },
    },

    "@media (max-width: 1199.98px)": {
      width: "100%",
      zIndex: 9,
      left: "-100%",
      transition: "all 0.3s ease-in-out",
      paddingTop: '20px',
    },
  },
  closeiconresponsive: {
    "& svg": {
      display: "none",
      "@media (max-width: 1199.98px)": {
        display: "block !important",
      },
    },
  },
});

const Sidebar = ({ setSideBarShow, sideBarShow, openSideBar, setOpenSideBar }) => {
  const classes = useStyles();
  const token = localStorage.getItem("Mellifluous");
  const history = useLocation();
  const [drop, setDrop] = React.useState(false);
  const [drop1, setDrop1] = React.useState(false);
  const [drop2, setDrop2] = React.useState(false);
  const [dropAccount, setDropAccount] = React.useState(false);
  const [walletExist, setWalletExist] = React.useState(false);
  const [copytradeShow, setcopytradeShow] = React.useState(false);
  const [kycsubmit, setkycsubmit] = React.useState(false);
  const [error, setError] = React.useState();

  const theme = useTheme();
  const navigate = useNavigate();

  const MobileMenuClose = () => {
    setSideBarShow(true)
  }

  const walletfunction = () => {
    Axios.get(`${Consts.BackendUrl}/bybit/getwallets`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) =>
        res?.data?.result?.length > 0 ? setWalletExist(true) : null
      )
      .catch((err) => setError(err.response));
  };

  useEffect(() => {
    try {
      Axios.get(`${Consts.BackendUrl}/users/kycsybmit`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          setkycsubmit(true);
        })
        .catch((err) => {
          setkycsubmit(false);
        });
    } catch (error) {
      console.log("🚀 ~ file: Sidebar.js:117 ~ useEffect ~ error:", error)

    }

  }, []);

  useEffect(() => {
    walletfunction();

  }, []);
  useEffect(() => {
    if (history.pathname == "/copy-trade") {
      setDrop1(true);
    }

    if (
      history.pathname == "/spot" ||
      history.pathname == "/margin" ||
      history.pathname == "/future"
    ) {
      setDrop(true);
    }

    if (
      history.pathname == "/exchange-account" ||
      history.pathname == "/my-subscription"
    ) {
      setDrop2(true);
    }

  }, [history.pathname]);
  const isActivePath = (path) => {
    if (history.pathname === path) {

      return true
    } else { return false }


  };

  const setwidth = () => {
    const isFullWidth = window.localStorage.getItem('widthAlignment');
    if (isFullWidth !== undefined) {
      const body = document.querySelector("body");
      body.className = isFullWidth == 'FullWidth' ? 'full-width' : 'original-width';
    }
  }

  const handleDrawerOpen = () => {
    setOpenSideBar(true);
    if (window.localStorage.getItem('widthAlignment')) {
      window.localStorage.setItem('widthAlignment', 'OriginalWidth')
      setwidth()
    }
  };

  const handleDrawerClose = () => {
    setOpenSideBar(false);
    if (window.localStorage.getItem('widthAlignment')) {
      window.localStorage.setItem('widthAlignment', 'FullWidth')
      setwidth()
    }
  };
  return (

    <>

      <Drawer className="drawer-sidemenu-block" variant="permanent" open={openSideBar}>
        {/* <DrawerHeader className="sidebar-close-button">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ?  : <ChevronLeftIcon />}
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader> */}
        <div
          className={classes.sidebarclsinner}
          id="showidemenu"
        >
          <div className="sidebar-cols">
            <div className="logo logo-flex-responsive">

              {!openSideBar ?
                <div style={{
                  minHeight: 30,
                  justifyContent: openSideBar ? 'space-between' : 'center',
                  px: 2.5,
                  display: 'flex',
                  alignItems: 'center'
                }} className="logominimize">

                  <img src={logominimize} alt="logo" />
                  {/* <ArrowForwardIosIcon sx={{ fill: "#25DEB0", cursor: 'pointer' }} onClick={handleDrawerOpen} /> */}
                </div> :
                <Link className={isActivePath("/") ? 'activebar' : 'transparent'} to={`${Constant.route}/`}>
                  <div
                    style={{
                      justifyContent: openSideBar ? 'space-between' : 'space-between',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  ><img src={logo} alt="logo" />
                    {/* <ArrowBackIosIcon sx={{ fill: "#25DEB0", cursor: 'pointer' }} onClick={handleDrawerClose} /> */}
                  </div>
                </Link>
              }
              {/* <div
            onClick={() => setSideBarShow(true)}
            className={classes.closeiconresponsive}
          >
            <HighlightOffIcon />
          </div> */}
            </div>
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding className="liststyle">
                  <ListItemButton to={`${Constant.route}/dashboard`}
                    sx={{
                      minHeight: 30,
                      justifyContent: openSideBar ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon>
                      <img src={dashboard} alt="dashboard" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Dashboard"
                      className={isActivePath("/") ? 'text-color-green' : 'text-color-white'}
                      sx={{ opacity: openSideBar ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding className="liststyle">
                  <ListItemButton to={`${Constant.route}/market-overview`}
                    sx={{
                      minHeight: 30,
                      justifyContent: openSideBar ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon>
                      <img src={market} alt="market" />
                    </ListItemIcon>
                    <ListItemText primary="Market" className={isActivePath("/market-overview") ? 'text-color-green' : 'text-color-white'} sx={{ opacity: openSideBar ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>

                {localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton
                      onClick={() => {
                        setDrop(!drop);
                      }}
                      sx={{
                        minHeight: 30,
                        justifyContent: openSideBar ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      {localStorage.getItem("Mellifluous") && (
                        <ListItemIcon>
                          <img src={exchange} alt="exchange" />
                        </ListItemIcon>
                      )}
                      {localStorage.getItem("Mellifluous") && (
                        <ListItemText
                          primary="Exchange"
                          className={isActivePath("/spot") || isActivePath("/margin") || isActivePath("/future") ? 'text-color-green' : 'text-color-white'}
                          sx={{ opacity: openSideBar ? 1 : 0 }}
                        />
                      )}

                      <div
                        className="dropdownicon"
                        id={drop ? "rotate-id-down" : "rotate-id-right"}
                        style={{ display: openSideBar ? "block" : "none" }}
                      >
                        <img src={dropdownicon} alt="dropdown-icon" />
                      </div>
                    </ListItemButton>
                  </ListItem>
                )}

                {drop && localStorage.getItem("Mellifluous") && (
                  <ul className="sab-list" style={{ paddingLeft: openSideBar ? '50px' : '12px' }}>
                    <li
                      onClick={() => {
                        setDrop(true);
                      }}
                    >
                      <Link className={isActivePath("/spot") ? 'text-color-green' : 'text-color-white'} to={`${Constant.route}/spot`}><span className="smf-icons-left"><img src={spoticon} alt="spoticon" /></span><span style={{ opacity: openSideBar ? 1 : 0 }}>Spot</span></Link>
                    </li>
                    <li
                      onClick={() => {
                        setDrop(true);
                      }}
                    >
                      <Link className={isActivePath("/margin") ? 'text-color-green' : 'text-color-white'} to={`${Constant.route}/margin`}><span className="smf-icons-left"><img src={marginicon} alt="marginicon" /></span><span style={{ opacity: openSideBar ? 1 : 0 }}>Margin</span></Link>
                    </li>
                    <li
                      onClick={() => {
                        setDrop(true);
                      }}
                    >
                      <Link className={isActivePath("/future") ? 'text-color-green' : 'text-color-white'} to={`${Constant.route}/future`}><span className="smf-icons-left"><img src={futureicon} alt="futureicon" /></span><span style={{ opacity: openSideBar ? 1 : 0 }}>Future</span></Link>
                    </li>
                  </ul>
                )}

                {/*copy trade*/}
                {localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton
                      onClick={() => {
                        setDrop1(!drop1);
                      }}
                      sx={{
                        minHeight: 30,
                        justifyContent: openSideBar ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      {localStorage.getItem("Mellifluous") && (
                        <ListItemIcon>
                          <img src={copytrade} alt="exchange" />
                        </ListItemIcon>
                      )}
                      {localStorage.getItem("Mellifluous") && (
                        <ListItemText
                          primary="Copy Trade"
                          className={isActivePath("/copy-trade") ? 'text-color-green' : 'text-color-white'}
                          sx={{ opacity: openSideBar ? 1 : 0 }}
                        />
                      )}

                      <div
                        className="dropdownicon"
                        id={drop1 ? "rotate-id-down" : "rotate-id-right"}
                        style={{ display: openSideBar ? "block" : "none" }}
                      >
                        <img src={dropdownicon} alt="dropdown-icon" />
                      </div>
                    </ListItemButton>
                  </ListItem>
                )}

                {drop1 && localStorage.getItem("Mellifluous") && (
                  <ul className="sab-list" style={{ paddingLeft: openSideBar ? '50px' : '12px' }}>
                    <li
                      onClick={() => {
                        // setDrop1(true);
                      }}
                    >
                      <Link className={isActivePath("/copy-trade") ? 'text-color-green' : 'text-color-white'} to={`${Constant.route}/copy-trade`}>
                        <span className="smf-icons-left"><img src={strategiesicon} alt="spoticon" /></span>
                        <span style={{ opacity: openSideBar ? 1 : 0 }}>Strategies List</span>
                      </Link>
                    </li>
                  </ul>
                )}


                {/* {localStorage.getItem("Mellifluous") && (
              <ListItem disablePadding className="liststyle">
                <ListItemButton
                  onClick={() => {
                    if (!copytradeShow) {
                      setDropAccount(false);
                      navigate(`${Constant.route}/kyc-verification`, {
                        state: {
                          page: "kyc page",
                          message: "Cannot do trade before kyc verification",
                        },
                      });
                    } else {
                      setDropAccount(true);
                    }
                  }}
                >
                  {localStorage.getItem("Mellifluous") && (
                    <ListItemIcon>
                      <img src={account} alt="account" />
                    </ListItemIcon>
                  )}
                  {localStorage.getItem("Mellifluous") && (
                    <ListItemText
                      primary="Accounts"
                      className={ isActivePath("/market-overview") ? 'text-color-green' : 'text-color-white' }
                    />
                  )}

                  <div
                    className="dropdownicon"
                    id={dropAccount ? "rotate-id-down" : "rotate-id-right"}
                  >
                    <img src={dropdownicon} alt="dropdown-icon" />
                  </div>
                </ListItemButton>
              </ListItem>
            )} */}

                {localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton
                      onClick={() => {
                        setDrop2(!drop2);
                      }}
                      sx={{
                        minHeight: 30,
                        justifyContent: openSideBar ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      {localStorage.getItem("Mellifluous") && (
                        <ListItemIcon>
                          <img src={AccountPng} alt="exchange" style={{ width: "23px", color: "white" }} />
                        </ListItemIcon>
                      )}
                      {localStorage.getItem("Mellifluous") && (
                        <ListItemText
                          primary="Account"
                          className={isActivePath("/exchange-account") || isActivePath("/my-subscription") ? 'text-color-green' : 'text-color-white'}
                          sx={{ opacity: openSideBar ? 1 : 0 }}
                        />
                      )}

                      <div
                        className="dropdownicon"
                        id={drop2 ? "rotate-id-down" : "rotate-id-right"}
                        style={{ display: openSideBar ? "block" : "none" }}
                      >
                        <img src={dropdownicon} alt="dropdown-icon" />
                      </div>
                    </ListItemButton>
                  </ListItem>
                )}

                {/* {drop2 && localStorage.getItem("Mellifluous") && (
                  <ul className="sab-list" style={{ paddingLeft: openSideBar ? '50px' : '12px' }}>
                    <li
                      onClick={() => {
                        setDropAccount(true);
                      }}
                    >
                      <Link className={isActivePath("/exchange-account") ? 'text-color-green' : 'text-color-white'} to={`${Constant.route}/exchange-account`}>
                        <span className="smf-icons-left"><img src={exchangeaccicon} alt="exchangeaccicon" /></span>
                        <span style={{ opacity: openSideBar ? 1 : 0 }}>Exchange Account</span>
                      </Link>
                    </li>

                  </ul>
                )} */}
                {drop2 && localStorage.getItem("Mellifluous") && (
                  <ul className="sab-list" style={{ paddingLeft: openSideBar ? '50px' : '12px' }}>
                    <li
                      onClick={() => {
                        setDropAccount(true);
                      }}
                    >
                      <Link className={isActivePath("/my-subscription") ? 'text-color-green' : 'text-color-white'} to={`${Constant.route}/my-subscription`}>
                        <span className="smf-icons-left"><img src={subscriptionicon} alt="subscriptionicon" /></span>
                        <span style={{ opacity: openSideBar ? 1 : 0 }}>My Subscription</span>
                      </Link>
                    </li>

                  </ul>
                )}


                {/* {localStorage.getItem("Mellifluous") && (
              <ListItem disablePadding className="liststyle">
                <ListItemButton
                  onClick={() => {
                    setDrop(!drop);
                  }}
                >
                  {localStorage.getItem("Mellifluous") && (
                    <ListItemIcon>
                      <img src={exchange} alt="exchange" />
                    </ListItemIcon>
                  )}
                  {localStorage.getItem("Mellifluous") && (
                    <ListItemText
                      primary="Tools and Analytics"
                      className={ isActivePath("/spot") || isActivePath("/advance") || isActivePath("/basic") ? 'text-color-green' : 'text-color-white' }
                    />
                  )}

                  <div
                    className="dropdownicon"
                    id={drop ? "rotate-id-down" : "rotate-id-right"}
                  >
                    <img src={dropdownicon} alt="dropdown-icon" />
                  </div>
                </ListItemButton>
              </ListItem>
            )}

            {drop && localStorage.getItem("Mellifluous") && (
              <ul className="sab-list">
                <li
                  onClick={() => {
                    setDrop(true);
                  }}
                >
                  <Link  className={ isActivePath("/spot") ? 'text-color-green' : 'text-color-white' } to={`${Constant.route}/spot`}>Ticket Alerts</Link>
                </li>
                <li
                  onClick={() => {
                    setDrop(true);
                  }}
                >
                  <Link  className={ isActivePath("/advance") ? 'text-color-green' : 'text-color-white' } to={`${Constant.route}/advance`}>Analytics</Link>
                </li>
                <li
                  onClick={() => {
                    setDrop(true);
                  }}
                >
                  <Link className={ isActivePath("/basic") ? 'text-color-green' : 'text-color-white' } to={`${Constant.route}/basic`}>Statergy List</Link>
                </li>
              </ul>
            )} */}

                {/* {localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/bot_trade`}
                      sx={{
                        minHeight: 30,
                        justifyContent: openSideBar ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img src={Ethereum} alt="Ethereum" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Bot Trade"
                        className={isActivePath("/bot_trade") ? 'text-color-green' : 'text-color-white'}
                        sx={{ opacity: openSideBar ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )} */}

                {localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/analytics`}
                      sx={{
                        minHeight: 30,
                        justifyContent: openSideBar ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img src={Analytics} alt="Analytics" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Analytics"
                        className={isActivePath("/analytics") ? 'text-color-green' : 'text-color-white'}
                        sx={{ opacity: openSideBar ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
                {token && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/trade-history`}
                      sx={{
                        minHeight: 30,
                        justifyContent: openSideBar ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img src={historyicon} alt="history" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Trade History"
                        className={isActivePath("/trade-history") ? 'text-color-green' : 'text-color-white'}
                        sx={{ opacity: openSideBar ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}

                {walletExist && localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/wallet`}
                      sx={{
                        minHeight: 30,
                        justifyContent: openSideBar ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img
                          src={Wallets}
                          style={{ width: "23px", color: "white" }}
                          alt="Wallet"
                        />
                      </ListItemIcon>
                      <ListItemText primary="Wallet" className={isActivePath("/wallet") ? 'text-color-green' : 'text-color-white'} sx={{ opacity: openSideBar ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                )}

                {localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/refferals`}
                      sx={{
                        minHeight: 30,
                        justifyContent: openSideBar ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img src={referal} alt="referal" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Referral"
                        className={isActivePath("/refferals") ? 'text-color-green' : 'text-color-white'}
                        sx={{ opacity: openSideBar ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}

                {!localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/Login`}
                      sx={{
                        minHeight: 30,
                        justifyContent: openSideBar ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img
                          src={Wallets}
                          style={{ width: "23px", color: "white" }}
                          alt="Login"
                        />
                      </ListItemIcon>
                      <ListItemText primary="Login" className={isActivePath("/Login") ? 'text-color-green' : 'text-color-white'} sx={{ opacity: openSideBar ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                )}

                {!localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/register`}
                      sx={{
                        minHeight: 30,
                        justifyContent: openSideBar ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img
                          src={Wallets}
                          style={{ width: "23px", color: "white" }}
                          alt="Register"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="Register"
                        className={isActivePath("/register") ? 'text-color-green' : 'text-color-white'}
                        sx={{ opacity: openSideBar ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}

                {/* {token && (
              <ListItem disablePadding className="liststyle">
                <ListItemButton to={`${Constant.route}/Subscription`}>
                  <ListItemIcon>
                    <img
                      src={subscribe}
                      style={{ width: "23px", color: "white" }}
                      alt="Register"
                    />
                  </ListItemIcon>
                  <ListItemText primary="Subscription" className="text-color-white" />
                </ListItemButton>
              </ListItem>
            )} */}
                {token && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/profile`}
                      sx={{
                        minHeight: 30,
                        justifyContent: openSideBar ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img
                          src={account}
                          style={{ width: "13px", color: "white" }}
                          alt="Profile"
                        />
                      </ListItemIcon>
                      <ListItemText primary="Profile" className={isActivePath("/profile") ? 'text-color-green' : 'text-color-white'} sx={{ opacity: openSideBar ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                )}

                {/* {token && !kycsubmit && (
              <ListItem disablePadding className="liststyle">
                <ListItemButton to={`${Constant.route}/kyc-verification`}>
                  <ListItemIcon>
                    <img
                      src={Wallets}
                      style={{ width: "23px", color: "white" }}
                      alt="Wallet"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="KYC verification"
                    className={ isActivePath("/kyc-verification") ? 'text-color-green' : 'text-color-white' }
                  />
                </ListItemButton>
              </ListItem>
            )} */}
              </List>
            </nav>
            <div className="bottom-list">
              <nav aria-label="main mailbox folders">
                <List>
                  {localStorage.getItem('Mellifluous') && <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/supportmain`}
                      sx={{
                        minHeight: 30,
                        justifyContent: openSideBar ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img src={customerservice} alt="support" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Support"
                        className={isActivePath("/supportmain") ? 'text-color-green' : 'text-color-white'}
                        sx={{ opacity: openSideBar ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>}

                  {/* <ListItem disablePadding className="liststyle">
                <ListItemButton to={`${Constant.route}/settings`}>
                  <ListItemIcon>
                    <img src={setting} alt="market" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Settings"
                    className={ isActivePath("/settings") ? 'text-color-green' : 'text-color-white' }
                  />
                </ListItemButton>
              </ListItem> */}
                </List>
              </nav>
            </div>
          </div>
        </div>
      </Drawer>

      <div className="hidesidemenu-for-mobile">
        <div className={classes.sidebarclsinner} id={!sideBarShow ? "showidemenu" : "hidesidemenu"}>
          <div className="sidebar-cols">
            <div className="logo logo-flex-responsive">

              <Link className={isActivePath("/") ? 'activebar' : 'transparent'} to={`${Constant.route}`}>
                <div><img src={logo} alt="logo" /></div>
              </Link>
              <div
                onClick={MobileMenuClose}
                className={classes.closeiconresponsive}
              >
                <HighlightOffIcon />
              </div>
            </div>
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding className="liststyle">
                  <ListItemButton to={`${Constant.route}/dashboard`}
                    sx={{
                      minHeight: 30,
                      justifyContent: 'initial',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon>
                      <img src={dashboard} alt="dashboard" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Dashboard"
                      className={isActivePath("/") ? 'text-color-green' : 'text-color-white'}
                      sx={{ opacity: 1 }}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding className="liststyle">
                  <ListItemButton to={`${Constant.route}/market-overview`}
                    sx={{
                      minHeight: 30,
                      justifyContent: 'initial',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon>
                      <img src={market} alt="market" />
                    </ListItemIcon>
                    <ListItemText primary="Market" className={isActivePath("/market-overview") ? 'text-color-green' : 'text-color-white'} sx={{ opacity: 1 }} />
                  </ListItemButton>
                </ListItem>

                {localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton
                      onClick={() => {
                        setDrop(!drop);
                      }}
                      sx={{
                        minHeight: 30,
                        justifyContent: 'initial',
                        px: 2.5,
                      }}
                    >
                      {localStorage.getItem("Mellifluous") && (
                        <ListItemIcon>
                          <img src={exchange} alt="exchange" />
                        </ListItemIcon>
                      )}
                      {localStorage.getItem("Mellifluous") && (
                        <ListItemText
                          primary="Exchange"
                          className={isActivePath("/spot") || isActivePath("/margin") || isActivePath("/future") ? 'text-color-green' : 'text-color-white'}
                          sx={{ opacity: 1 }}
                        />
                      )}

                      <div
                        className="dropdownicon"
                        id={drop ? "rotate-id-down" : "rotate-id-right"}
                        style={{ display: openSideBar ? "block" : "none" }}
                      >
                        <img src={dropdownicon} alt="dropdown-icon" />
                      </div>
                    </ListItemButton>
                  </ListItem>
                )}

                {drop && localStorage.getItem("Mellifluous") && (
                  <ul className="sab-list" style={{ paddingLeft: '50px' }}>
                    <li
                      onClick={() => {
                        setDrop(true);
                      }}
                    >
                      <Link className={isActivePath("/spot") ? 'text-color-green' : 'text-color-white'} to={`${Constant.route}/spot`}><span className="smf-icons-left"><img src={spoticon} alt="spoticon" /></span><span style={{ opacity: 1 }}>Spot</span></Link>
                    </li>
                    <li
                      onClick={() => {
                        setDrop(true);
                      }}
                    >
                      <Link className={isActivePath("/margin") ? 'text-color-green' : 'text-color-white'} to={`${Constant.route}/margin`}><span className="smf-icons-left"><img src={marginicon} alt="marginicon" /></span><span style={{ opacity: 1 }}>Margin</span></Link>
                    </li>
                    <li
                      onClick={() => {
                        setDrop(true);
                      }}
                    >
                      <Link className={isActivePath("/future") ? 'text-color-green' : 'text-color-white'} to={`${Constant.route}/future`}><span className="smf-icons-left"><img src={futureicon} alt="futureicon" /></span><span style={{ opacity: 1 }}>Future</span></Link>
                    </li>
                  </ul>
                )}

                {localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton
                      onClick={() => {
                        setDrop1(!drop1);
                      }}
                      sx={{
                        minHeight: 30,
                        justifyContent: 'initial',
                        px: 2.5,
                      }}
                    >
                      {localStorage.getItem("Mellifluous") && (
                        <ListItemIcon>
                          <img src={copytrade} alt="exchange" />
                        </ListItemIcon>
                      )}
                      {localStorage.getItem("Mellifluous") && (
                        <ListItemText
                          primary="Copy Trade"
                          className={isActivePath("/copy-trade") ? 'text-color-green' : 'text-color-white'}
                          sx={{ opacity: 1 }}
                        />
                      )}

                      <div
                        className="dropdownicon"
                        id={drop1 ? "rotate-id-down" : "rotate-id-right"}
                        style={{ display: "block" }}
                      >
                        <img src={dropdownicon} alt="dropdown-icon" />
                      </div>
                    </ListItemButton>
                  </ListItem>
                )}

                {drop1 && localStorage.getItem("Mellifluous") && (
                  <ul className="sab-list" style={{ paddingLeft: '50px' }}>
                    <li
                      onClick={() => {
                        // setDrop1(true);
                      }}
                    >
                      <Link className={isActivePath("/copy-trade") ? 'text-color-green' : 'text-color-white'} to={`${Constant.route}/copy-trade`}>
                        <span className="smf-icons-left"><img src={strategiesicon} alt="spoticon" /></span>
                        <span style={{ opacity: 1 }}>Strategies List</span>
                      </Link>
                    </li>
                  </ul>
                )}

                {localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton
                      onClick={() => {
                        setDrop2(!drop2);
                      }}
                      sx={{
                        minHeight: 30,
                        justifyContent: 'initial',
                        px: 2.5,
                      }}
                    >
                      {localStorage.getItem("Mellifluous") && (
                        <ListItemIcon>
                          <img src={AccountPng} alt="exchange" style={{ width: "23px", color: "white" }} />
                        </ListItemIcon>
                      )}
                      {localStorage.getItem("Mellifluous") && (
                        <ListItemText
                          primary="Account"
                          className={isActivePath("/exchange-account") || isActivePath("/my-subscription") ? 'text-color-green' : 'text-color-white'}
                          sx={{ opacity: 1 }}
                        />
                      )}

                      <div
                        className="dropdownicon"
                        id={drop2 ? "rotate-id-down" : "rotate-id-right"}
                        style={{ display: "block" }}
                      >
                        <img src={dropdownicon} alt="dropdown-icon" />
                      </div>
                    </ListItemButton>
                  </ListItem>
                )}

                {drop2 && localStorage.getItem("Mellifluous") && (
                  <ul className="sab-list" style={{ paddingLeft: '50px' }}>
                    <li
                      onClick={() => {
                        setDropAccount(true);
                      }}
                    >
                      <Link className={isActivePath("/exchange-account") ? 'text-color-green' : 'text-color-white'} to={`${Constant.route}/exchange-account`}>
                        <span className="smf-icons-left"><img src={exchangeaccicon} alt="exchangeaccicon" /></span>
                        <span style={{ opacity: 1 }}>Exchange Account</span>
                      </Link>
                    </li>

                  </ul>
                )}
                {drop2 && localStorage.getItem("Mellifluous") && (
                  <ul className="sab-list" style={{ paddingLeft: '50px' }}>
                    <li
                      onClick={() => {
                        setDropAccount(true);
                      }}
                    >
                      <Link className={isActivePath("/my-subscription") ? 'text-color-green' : 'text-color-white'} to={`${Constant.route}/my-subscription`}>
                        <span className="smf-icons-left"><img src={subscriptionicon} alt="subscriptionicon" /></span>
                        <span style={{ opacity: 1 }}>My Subscription</span>
                      </Link>
                    </li>

                  </ul>
                )}

                {localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/bot_trade`}
                      sx={{
                        minHeight: 30,
                        justifyContent: 'initial',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img src={Ethereum} alt="Ethereum" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Bot Trade"
                        className={isActivePath("/bot_trade") ? 'text-color-green' : 'text-color-white'}
                        sx={{ opacity: 1 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}

                {localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/analytics`}
                      sx={{
                        minHeight: 30,
                        justifyContent: 'initial',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img src={Analytics} alt="Analytics" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Analytics"
                        className={isActivePath("/analytics") ? 'text-color-green' : 'text-color-white'}
                        sx={{ opacity: 1 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
                {token && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/trade-history`}
                      sx={{
                        minHeight: 30,
                        justifyContent: 'initial',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img src={historyicon} alt="history" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Trade History"
                        className={isActivePath("/trade-history") ? 'text-color-green' : 'text-color-white'}
                        sx={{ opacity: 1 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}

                {walletExist && localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/wallet`}
                      sx={{
                        minHeight: 30,
                        justifyContent: 'initial',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img
                          src={Wallets}
                          style={{ width: "23px", color: "white" }}
                          alt="Wallet"
                        />
                      </ListItemIcon>
                      <ListItemText primary="Wallet" className={isActivePath("/wallet") ? 'text-color-green' : 'text-color-white'} sx={{ opacity: 1 }} />
                    </ListItemButton>
                  </ListItem>
                )}

                {localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/refferals`}
                      sx={{
                        minHeight: 30,
                        justifyContent: 'initial',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img src={referal} alt="referal" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Referral"
                        className={isActivePath("/refferals") ? 'text-color-green' : 'text-color-white'}
                        sx={{ opacity: 1 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}

                {!localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/Login`}
                      sx={{
                        minHeight: 30,
                        justifyContent: 'initial',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img
                          src={Wallets}
                          style={{ width: "23px", color: "white" }}
                          alt="Login"
                        />
                      </ListItemIcon>
                      <ListItemText primary="Login" className={isActivePath("/Login") ? 'text-color-green' : 'text-color-white'} sx={{ opacity: 1 }} />
                    </ListItemButton>
                  </ListItem>
                )}

                {!localStorage.getItem("Mellifluous") && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/register`}
                      sx={{
                        minHeight: 30,
                        justifyContent: 'initial',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img
                          src={Wallets}
                          style={{ width: "23px", color: "white" }}
                          alt="Register"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="Register"
                        className={isActivePath("/register") ? 'text-color-green' : 'text-color-white'}
                        sx={{ opacity: 1 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}

                {token && (
                  <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/profile`}
                      sx={{
                        minHeight: 30,
                        justifyContent: 'initial',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img
                          src={account}
                          style={{ width: "13px", color: "white" }}
                          alt="Profile"
                        />
                      </ListItemIcon>
                      <ListItemText primary="Profile" className={isActivePath("/profile") ? 'text-color-green' : 'text-color-white'} sx={{ opacity: 1 }} />
                    </ListItemButton>
                  </ListItem>
                )}

              </List>
            </nav>
            <div className="bottom-list">
              <nav aria-label="main mailbox folders">
                <List>
                  {localStorage.getItem('Mellifluous') && <ListItem disablePadding className="liststyle">
                    <ListItemButton to={`${Constant.route}/supportmain`}
                      sx={{
                        minHeight: 30,
                        justifyContent: 'initial',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon>
                        <img src={customerservice} alt="support" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Support"
                        className={isActivePath("/supportmain") ? 'text-color-green' : 'text-color-white'}
                        sx={{ opacity: 1 }}
                      />
                    </ListItemButton>
                  </ListItem>}

                </List>
              </nav>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Sidebar;
