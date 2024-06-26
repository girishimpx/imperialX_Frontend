import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import PatternIcon from '@mui/icons-material/Pattern';
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import user from "../../images/user.svg";
import notification from "../../images/notification.svg";
import customerservice from "../../images/customer-service.svg";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "../../Axiostoken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {
  faBars,
  faXmark,
  faUser,
  faDownload,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { QRCodeSVG } from "qrcode.react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Constant from "../../Constansts";
import clipboardCopy from "clipboard-copy";
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MailIcon from "@mui/icons-material/Mail";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Avatar from '@mui/material/Avatar';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
    alignItems: "center",
  },
  profile: {
    '& svg': {
      marginRight: '15px !important'
    }
  },
  commontabcontent: {
    textTransform: "none !important",
    color: "#fff",
    "& >div": {
      paddingLeft: "0px !important",
      paddingRight: "0px !important",
    },
  },
});

const Header = ({ setSideBarShow, sideBarShow, openSideBar, setOpenSideBar, profileRender }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const history = useLocation();
  const verifyS = useRef(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileMobileOpen, setProfileMobileOpen] = useState(false);
  const [twoFactorEnable, setTwoFactorEnable] = useState("disable");
  const [secret, setSecret] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [emailerr, setemailerr] = useState(null);
  const [setqravlue, Qrvalue] = useState(null);
  const [value, setValue] = React.useState(0);
  const [ena, setEna] = useState(false);
  const [notify, setnotify] = useState(false);
  const [notificationList, setNotificationLIst] = useState();
  const [notificationListerr, setNotificationLIsterr] = useState();
  const tokenCheck = window.localStorage.getItem("Mellifluous");
  const [invisible, setInvisible] = React.useState(true);
  const [img, setImg] = useState()
  const [urlname, setUrlName] = useState('');

  useEffect(() => {
    if (notification) {
      setInvisible(false);
    }
    getMydetail()
  }, [profileRender]);


  const MobileMenuOpen = () => {
    setSideBarShow(false)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const notifybutton = () => {
    setnotify(!notify);
  };

  const walletPage = async () => {
    // console.log(tokenCheck, "open");

    await Axios.get(`/users/kycVerify`, {
      headers: {
        Authorization: tokenCheck,
      },
    })
      .then((res) => {
        navigate(`${Constant.route}/wallet`, { state: { verify: true } });
      })
      .catch((err) =>
        navigate(`${Constant.route}/kyc-verification`, { state: { kyc: true } })
      );
  };

  const enable = async () => {
    try {
      if (tokenCheck !== null) {
        const data = await Axios.get(`/users/check2fa`, {
          headers: {
            Authorization: tokenCheck,
          },
        });
        if (data?.data?.result === true) {
          setTwoFactorEnable("enable");
        } else {
          setTwoFactorEnable("disable");
          setEna(false);
        }
      } else {
        setTwoFactorEnable("enable");
      }
    } catch (error) {
      console.log("🚀 ~ file: Header.js:179 ~ enable ~ error:", error)

    }

  };

  useEffect(() => {
    enable();
  }, [tokenCheck]);

  useEffect(() => {
    setUrlName(history?.pathname);
    try {
      setNotificationLIst("");

      Axios.get("/users/getMynotification", {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          ;
          if (res?.data?.result?.length > 0) {
            setNotificationLIst(res?.data?.result);
          }
        })
        .catch((err) => {

          setNotificationLIsterr(err)
        });
    } catch (error) {
      console.log("🚀 ~ file: Header.js:203 ~ useEffect ~ error:", error)

    }

  }, [history.pathname]);

  const ClearNOtification = async (id) => {
    Axios.post(
      "/users/notification_checked",
      { id },
      {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      }
    )
      .then(async (res) => {
        let removeanapp = await notificationList?.filter((item) =>
          item._id != id
        )
        setNotificationLIst("")
        setNotificationLIst(removeanapp)
      })
      .catch((err) => setNotificationLIsterr(err));
  }

  const handleProfileOpen = () => {
    setProfileOpen(!profileOpen);
  };

  const handleDisable = async () => {
    const { data } = await Axios.post(`/auth/disable2fa`, {},
      {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        }
      });
    if (data?.success === true) {
      setEna(false);
      setTwoFactorEnable("disable");
      toast.success(data?.message, {

        duration: 4000,
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
    } else {
      toast.error(data?.message, {

        duration: 4000,
        position: "top-center",

        // Styling
        style: {
          padding: "1rem",
          fontSize: "15px",
          color: "red",
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
    }
  };

  const handleEnable = async () => {
    setEna(true);
    const { data } = await Axios.post(
      `/auth/generate2fa`,
      {},
      {
        headers: {
          Authorization: window.localStorage.getItem("Mellifluous"),
        },
      }
    );
    setSecret(data.result.secret);
    setQrCode(data.result.otpauth_url);
  };

  const logout = () => {
    window.localStorage.removeItem("Mellifluous");
    window.localStorage.removeItem("users");
    window.localStorage.removeItem("kyc_verify");
    window.localStorage.removeItem("Squelch");
    window.localStorage.removeItem("AdminToken");
    window.localStorage.removeItem("electrónico");
    navigate(`${Constant.route}/`);
  };

  const verify2FA = async () => {
    try {
      if (verifyS.current.value == '') {
        toast.error("Please Enter OTP", {

          duration: 4000,
          position: "top-center",

          // Styling
          style: {
            padding: "1rem",
            fontSize: "15px",
            color: "red",
            fontWeight: "bold",
          },
          className: "",

          // Custom Icon
          icon: "",

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
      }
      else {
        const { data } = await Axios.post(
          `/auth/verify2fa`,
          {
            secret: verifyS.current.value,
          },
          {
            headers: {
              Authorization: window.localStorage.getItem("Mellifluous"),
            },
          }
        );
        if (data?.message === "2FA Verified Successfully") {
          setEna(false);
          toast.success(data?.message, {

            duration: 4000,
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
        }
        setTwoFactorEnable("enable");
        verifyS.current.value = "";
      }
    } catch ({ response }) {
      if (response?.data?.success === false) {
        // setemailerr("Invalid-Otp");
        toast.error("Invalid-Otp", {

          duration: 4000,
          position: "top-center",

          // Styling
          style: {
            padding: "1rem",
            fontSize: "15px",
            color: "red",
            fontWeight: "bold",
          },
          className: "",

          // Custom Icon
          icon: "",

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
        verifyS.current.value = "";
      }
    }
  };

  const routechange = () => {
    navigate(`${Constant.route}/login`);
  };

  const handleCopy = (status) => {
    clipboardCopy(status);
    toast.success("code copied", {

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

  const textRef = useRef(null);



  const notificationChecked = (id) => {

    // Axios.post(
    //   `/auth/verify2fa`,
    //   {
    //     id
    //   },
    //   {
    //     headers: {
    //       Authorization: window.localStorage.getItem("Mellifluous"),
    //     },
    //   }
    // ).then(done =>{
    //   console.log(done.data)
    // }).catch(err => console.log(err.response.data.message))
  }

  // window.localStorage.setItem('widthAlignment','OriginalWidth')


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

  useEffect(() => {
    if (window.localStorage.getItem('widthAlignment') == 'OriginalWidth') {
      handleDrawerOpen()
    }
  }, [])

  useEffect(() => {
    if (window.localStorage.getItem('widthAlignment') == 'FullWidth') {
      handleDrawerClose()
    }
  }, [])

  const getMydetail = async () => {
    try {
      await Axios.get(`${Constant.BackendUrl}/users/get_profile`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      }).then((res) => {
        // console.log(res, 'profile');
        if (res?.status === 200) {
          setImg(res?.data?.result?.image)
        }
        // console.log(res?.data?.total_price_in_usd)
      })
    } catch (error) {
      console.log(error, 'img err in headers');
    }

  }

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  // console.log(matches, 'mateches');
  return (
    <>
      <Toaster />
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0} id="header-flex-container">
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>

              {!openSideBar ?
                <div className="icon-for-change-width">
                  <FontAwesomeIcon onClick={handleDrawerOpen} icon={faBars} />
                </div> :

                <div className="icon-for-change-width">
                  <ArrowCircleLeftIcon onClick={handleDrawerClose} icon={faBars} />
                </div>

              }

              {/* <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper> */}
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <div className={classes.flexcls}>
                { urlname.includes('dashboard') == true ? 
                (matches ? <FormControl variant="outlined" className="search-form">

                  <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon sx={{ fill: '#25DEB0' }} />
                      </InputAdornment>
                    }
                    className="search-dash" type="text" placeholder="Search"
                    variant="outlined"
                  />
                </FormControl> : null) : 
                null
                }
                
                <Button className="user-block-outer">
                  {tokenCheck ? (
                    <div className="user-login-part">
                      <div
                        // className="user-after-login"
                        onClick={() => handleProfileOpen()}
                      >
                        {/* <FontAwesomeIcon icon={faUser} /> */}
                        <Avatar
                          alt="Remy Sharp"
                          src={img ? img : faUser}
                          // sx={{ width: 40, height: 40 }}
                          className='user-after-login'
                        ></Avatar>
                      </div>
                      {profileOpen && (
                        <div className="user-profile-dropdwn">
                          <div class="top-user-block">
                            <div>
                              <span>ImperialX</span>
                              {/* <span>Rs 0.00</span> */}
                            </div>

                            {/* <Button className="user-profile-deposit">
                              <FontAwesomeIcon icon={faDownload} /> Deposit
                            </Button> */}
                          </div>
                          <div class="mid-user-block">
                            <div>
                              <span>
                                {localStorage.getItem("users")
                                  ? JSON.parse(localStorage.getItem("users"))
                                    ?.name
                                  : ""}
                              </span>

                            </div>
                            <div>
                              <Button
                                variant="contained"
                                id="logoutbutton1"
                                color="error"
                                onClick={logout}
                              >
                                Logout
                              </Button>
                            </div>

                          </div>
                          <div className="bottom-user-block">
                            <Box sx={{ width: "100%" }}>
                              <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                              >
                                <Tabs
                                  value={value}
                                  onChange={handleChange}
                                  aria-label="basic tabs example"
                                >
                                  <Tab label="Account" {...a11yProps(0)} />
                                  <Tab label="2FA" {...a11yProps(1)} />
                                </Tabs>
                              </Box>
                              <TabPanel
                                className={classes.commontabcontent}
                                value={value}
                                index={0}
                              >
                                <div className={classes.profile}>


                                  <Link to={`${Constant.route}/profile`}>
                                    <PersonSharpIcon />
                                    Profile

                                  </Link>
                                  <Link to={`${Constant.route}/changepassword`} style={{ "marginTop": "20px" }}>
                                    <PatternIcon />
                                    Change Password

                                  </Link>
                                </div>
                              </TabPanel>

                              <TabPanel
                                className={classes.commontabcontent}
                                value={value}
                                index={1}
                              >
                                <div className="two-fa-outer">
                                  <div className="two-fa-status">
                                    <h3>2FA Status</h3>
                                    {twoFactorEnable === "disable" ? (
                                      <span className="disabled-block">
                                        <span className="disabled-dot"></span>
                                        Disabled
                                      </span>
                                    ) : (
                                      <span className="enabled-block">
                                        <span className="enabled-dot"></span>
                                        Enabled
                                      </span>
                                    )}
                                  </div>
                                  {twoFactorEnable === "disable" ? (
                                    <div className="enable-button">
                                      <Button
                                        onClick={() => handleEnable()}
                                        variant="success"
                                      >
                                        Enable
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className="disable-button">
                                      <Button
                                        onClick={() => handleDisable()}
                                        variant="danger"
                                      >
                                        Disable
                                      </Button>
                                    </div>
                                  )}
                                </div>

                                {ena === true ? (
                                  <div>
                                    <div className="Security-Code">
                                      <span>Security Code:</span>
                                      <span style={{ wordWrap: "break-word" }}>
                                        {secret}
                                      </span>
                                      <div style={{ textAlign: "center" }}>
                                        <button
                                          onClick={() => handleCopy(secret)}
                                          className="copybutton"
                                        >
                                          {" "}
                                          copy
                                        </button>
                                      </div>
                                    </div>

                                    <div className="Security-Code qr-code">
                                      <span>QR Code:</span>
                                      <div className="qr-code-code" style={{ padding: "1rem 0", backgroundColor: "white" }}>
                                        {/* {console.log(qrCode, "code")} */}
                                        <QRCodeSVG value={qrCode} />
                                      </div>
                                    </div>
                                    <div className="verif-2fa-digit-inner">
                                      <input
                                        ref={verifyS}
                                        type="text"
                                        style={{ color: "black" }}
                                      />
                                      <Button
                                        onClick={() => {
                                          verify2FA();
                                        }}
                                      >
                                        Verify
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div></div>
                                )}

                                <div className="verif-2fa-digit">
                                  {emailerr !== null ? (
                                    <div
                                      style={{
                                        textAlign: "center",
                                        color: "red",
                                      }}
                                    >
                                      {emailerr}
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </TabPanel>
                            </Box>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to={`${Constant.route}/login`}>
                      <div className="user-block-img-profile">
                        <img src={user} alt="user" />
                      </div>
                      Login
                    </Link>
                  )}
                </Button>

                {localStorage.getItem("Mellifluous") && (
                  <Button className="notification" onClick={notifybutton}>
                    <Badge
                      variant="dot"
                      invisible={notificationList ? false : true}
                    >

                      {" "}
                      <img src={notification} alt="user" />
                    </Badge>
                  </Button>
                )}
                {notify && (
                  <div className="user-login-part">
                    {notify && (
                      <>
                        <div className="notifying">
                          <div className="user-profile-dropdwn">
                            <div className="notification_div">
                              <div
                                className="notifi1"
                                style={{ color: "black" }}
                              >
                                {notificationList &&
                                  notificationList?.map((item, index) => {
                                    return (
                                      <div
                                        className="notifyhead"
                                        style={{
                                          // backgroundColor: "#99ff99",
                                          backgroundColor:
                                            item.status == "good"
                                              ? "#99ff99"
                                              : "#d70406",
                                          borderRadius: "5px",
                                          color:
                                            item.status == "good"
                                              ? "black"
                                              : "white",
                                        }}
                                      >
                                        <div className="notifybar">
                                          <div
                                            style={{
                                              textAlign: "start",
                                              paddingLeft: "5px",
                                              color:
                                                item.status == "good"
                                                  ? "black"
                                                  : "white",
                                            }}
                                          >
                                            <p
                                              style={{
                                                color:
                                                  item.status == "good"
                                                    ? "black"
                                                    : "white",
                                              }}
                                              className="message"
                                            >
                                              {item?.message}
                                            </p>
                                            <span className="from">
                                              {item?.for}
                                            </span>
                                          </div>

                                          <div className="cancelbutton">
                                            <Button
                                              style={{
                                                color:
                                                  item.status == "good"
                                                    ? "black"
                                                    : "white",
                                                fontWeight: "400",
                                              }}
                                              onClick={() => {
                                                ClearNOtification(item._id)
                                              }}
                                            >
                                              x
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                {!notificationList && <h6 style={{ color: "white" }}>No notifications</h6>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                <Button className="customer-service">
                  <Link to='/supportmain'><img src={customerservice} alt="user" /></Link>
                </Button>
                <div
                  className="open-sidemenu-block"
                  onClick={MobileMenuOpen}
                >
                  <FontAwesomeIcon icon={faBars} />
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Header;
