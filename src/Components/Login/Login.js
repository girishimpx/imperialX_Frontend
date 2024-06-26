import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import logo from "../../images/logo.png";
import loginright from "../../images/login-right.png";
import googlelogo from "../../images/googlelogo.png";
import twitterlogo from "../../images/twitterlogo.png";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import { Link, json, useNavigate, useLocation } from "react-router-dom";
import consts from "../../Constansts";
import BeatLoader from "react-spinners/BeatLoader";
import Axios from "../../Axios";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


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
  },
  loginleftouter: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  loginrightouter: {
    background:
      "linear-gradient(171.72deg, rgba(37, 222, 176, 0.42) 12.7%, rgba(115, 250, 237, 0) 100%), linear-gradient(320.64deg, #25DEB0 0%, #131A26 100.03%) !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginleft: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    width: "50%",
    '@media(max-width:575.98px)': {
      width: '90%'
    },
  },
  loginright: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
  loginpage: {
    display: "flex",
    height: "100%",
  },
  loginform: {
    display: "flex !important",
    flexDirection: "column",
    marginLeft: "0px",
    marginRight: "0px",
  },
});

const Login = () => {
  const classes = useStyles();
  const history = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [emailerr, setemailerr] = useState(null);
  const [emailformat, setemailformat] = useState(null);
  const [passworderr, setpassworderr] = useState(null);
  const [buyShow, setBuyShow] = useState(false);
  const [verifyCheck, setVerifycheck] = useState(false);
  const [load, setLoad] = useState(false);
  const [disable, setDisable] = useState(false);
  const email = useRef(null);
  const password = useRef(null);

  const onSubmit = async () => {
    try {
      if (email.current.value === "") {
        setemailerr("Please Enter your Email Address");
      } else if (password.current.value === "") {
        setpassworderr("Please Enter your Password");
      } else {
        // const re = new RegExp('^[a-z]+@[a-z]+\.[a-z]{1,3}$')
        // re.test(email.current.value)

        window.localStorage.removeItem("Mellifluous");
        window.localStorage.removeItem("users");
        setLoad(true);
        setDisable(true);
        const { data } = await Axios.post("/users/login", {
          email: email.current.value,
          password: password.current.value,
        });
        // console.log(data?.result, "res")
        // alert('login')
        if (data?.success) {
          // alert('sucess login')
          // console.log(data.result.token, "token");
          window.localStorage.setItem('use', data?.result.user._id)

          // OKX API TO CREATE SUB ACCOUNT
          // const data1 = await Axios.post("/trade/createsubaccount", {}, {
          //   headers: {
          //     Authorization: data?.result?.token,
          //   },
          // })

          const data1 = await Axios.post("/bybit/createsub", { name: data.result.user.name }, {
            headers: {
              Authorization: data?.result?.token,
            },
          })

          // console.log(data1.data, "qpidata");
          //OKX API TO CREATE DEPOSIT ADDRESS
          // if (data1?.data?.success === true) {
          // alert('success createsubaccount')
          //   console.log(data?.data?.message, "message");
          //   const data2 = await Axios.post("wallet/createDepositeAddress", {}, {
          //     headers: {
          //       Authorization: data?.result?.token,
          //     },
          //   })

          if (data1?.data?.success === true) {
            // alert('success createsubaccount')
            // console.log(data?.data?.message, "message");
            // const data2 = await Axios.post("bybit/createdepoAdd", {}, {
            //   headers: {
            //     Authorization: data?.result?.token,
            //   },
            // })

            setLoad(false);
            setDisable(false);
            // if (data2?.data?.succes === true) {
            if (true) {
              // alert('success deposit address')
              await Axios.get("/users/check2fa", {
                headers: {
                  Authorization: data?.result?.token,
                },
              })
                // alert('2FA')
                .then((res) => {
                  // return res.data.result
                  //   ? navigate(`${consts.route}/2FA`, {
                  //     state: { token: data?.result },
                  //   })
                  //   : (window.localStorage.setItem(
                  //     "Mellifluous",
                  //     data.result.token
                  //   ),

                  //     window.localStorage.setItem(
                  //       "users",
                  //       JSON.stringify(data?.result?.user)
                  //     ),
                  //     window.localStorage.setItem(
                  //       "kyc_verify", data?.result?.users?.kyc_verify
                  //     ),
                  //     navigate(`${consts.route}/`)
                  //   );

                  if (res.data.result) {
                    navigate(`${consts.route}/2FA`, { state: { token: data?.result }, })
                  } else {
                    // alert('2fa else')
                    window.localStorage.setItem("Mellifluous", data.result.token)
                    window.localStorage.setItem("users", JSON.stringify(data?.result?.user))
                    window.localStorage.setItem("kyc_verify", data?.result?.user?.kyc_verify)
                    //     navigate(`${consts.route}/`)
                    // alert(window.localStorage.getItem("kyc_verify"));
                    if (window.localStorage.getItem("kyc_verify") == 'false') {
                      navigate(`${consts.route}/kycj-verification`);
                    } else {
                      navigate(`${consts.route}/dashboard`)
                    }
                  }

                })
                .catch((err) => {
                  console.log(err.response.data.message, "err");
                });
            }
            else {
              // alert('else ')
              await Axios.get("/users/check2fa", {
                headers: {
                  Authorization: data?.result?.token,
                },
              })
                .then((res) => {
                  return res.data.result
                    ? navigate(`${consts.route}/2FA`, {
                      state: { token: data?.result },
                    })
                    : (window.localStorage.setItem(
                      "Mellifluous",
                      data.result.token
                    ),

                      window.localStorage.setItem(
                        "users",
                        JSON.stringify(data.result.user)
                      ),
                      window.localStorage.setItem(
                        "kyc_verify", data.result.user.kyc_verify
                      ),
                      navigate(`${consts.route}/kycj-verification`)
                    );
                })
                .catch((err) => {
                  console.log(err.response.data.message, "err");
                });
            }
          } else {
            // navigate(`${consts.route}/`)
            await Axios.get("/users/check2fa", {
              headers: {
                Authorization: data?.result?.token,
              },
            })
              .then(async (res) => {
                // return res.data.result
                //   ? navigate(`${consts.route}/2FA`, {
                //     state: { token: data?.result },
                //   })
                //   : (window.localStorage.setItem(
                //     "Mellifluous",
                //     data.result.token
                //   ),

                //     window.localStorage.setItem(
                //       "users",
                //       JSON.stringify(data.result.user)
                //     ),
                //     window.localStorage.setItem(
                //       "kyc_verify", data.result.user.kyc_verify
                //     ),
                //     navigate(`${consts.route}/`)
                //   );

                if (res.data.result == true) {
                  navigate(`${consts.route}/2FA`, { state: { token: data?.result }, })
                } else {
                  window.localStorage.setItem("Mellifluous", data.result.token)
                  window.localStorage.setItem("users", JSON.stringify(data?.result?.user))
                  window.localStorage.setItem("kyc_verify", data?.result?.user?.kyc_verify)
                  window.localStorage.setItem("referaldeposit", data?.result?.user?.referaldeposit)
                  var submitCheck;
                  //     navigate(`${consts.route}/`)
                  await Axios.get("/users/kycsybmit", {
                    headers: {
                      Authorization: data?.result?.token,
                    },
                  })
                    .then((res) => {
                      submitCheck = true
                    })
                    .catch((err) => {
                      submitCheck = false
                    });
                  const userData = JSON.parse(window.localStorage.getItem("users"));


                  // console.log(res, '*******************res');
                  // alert(submitCheck);
                  if (userData?.kyc_verify == false && submitCheck == false) {
                    navigate(`${consts.route}/kycj-verification`, { state: { user: data?.result } });
                  }
                  // else if(userData?.referaldeposit == 'null'){
                  //   navigate(`${consts.route}/wallet`);
                  // }
                  else {
                    navigate(`${consts.route}/dashboard`)
                  }
                }

              })
              .catch((err) => {
                console.log(err.response.data.message, "err");
              });


          }
        } else {
          setLoad(false);
          setDisable(false);
        }
      }
    } catch (error) {
      if (
        error?.response?.data?.message === "Invalid Email" ||
        error?.response?.data?.message === "Please Verify Email"
      ) {
        setemailerr(error?.response?.data?.message);
      }
      if (error?.response?.data?.message === "Wrong Password") {
        setpassworderr(error?.response?.data?.message);
      } else {
        setemailerr(error?.response?.data?.message);
      }
    } finally {
      setLoad(false);
      setDisable(false);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // console.log(history?.state?.emailVerify, 'emailverify  ');
    if (history?.state?.emailVerify == 'Email Verified Successfully') {
      toast.success(history?.state?.emailVerify, {

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
    else if (history?.state?.emailVerify == 'Email Already verified' || history?.state?.emailVerify == 'Email verify Failed') {
      toast.error(history?.state?.emailVerify, {

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
    //     else if (history?.state?.emailVerify == 2) {
    //   toast.error("Email Already Verified", {

    //     duration: 4000,
    //     position: "top-center",

    //     // Styling
    //     style: {
    //       padding: "1rem",
    //       fontSize: "15px",
    //       color: "red",
    //       fontWeight: "bold",
    //     },
    //     className: "",

    //     // Custom Icon
    //     icon: "",

    //     // Change colors of success/error/loading icon
    //     iconTheme: {
    //       primary: "#000",
    //       secondary: "#fff",
    //     },

    //     // Aria
    //     ariaProps: {
    //       role: "status",
    //       "aria-live": "polite",
    //     },
    //   });
    // }
  }, []);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));


  return (
    <>
      <Toaster />
      <div className="login-page">
        <Box sx={{ flexGrow: 1 }} className={classes.loginpagebox}>
          <Grid container spacing={0} className={classes.loginpage}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              xl={6}
              className={classes.loginleftouter}
            >
              <Item className={classes.loginleft}>
                <div className="have-account">
                  Don’t have an account?{" "}
                  <Link
                    to={`/register`}
                  // onClick={() => {
                  //   navigate();
                  // }}
                  >
                    Register
                  </Link>
                </div>
                <div className="logo">
                  <img src={logo} alt="logo" />
                </div>
                <h2>Log In</h2>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                  className={classes.loginform}
                >
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    inputRef={email}
                    onChange={() => {
                      setemailerr(null);
                    }}
                  />
                  {emailerr !== null ? (
                    <span style={{ color: "red" }}>{emailerr}</span>
                  ) : (
                    <></>
                  )}

                  <FormControl
                    className={classes.passwordfield}
                    sx={{ m: 1, width: "25ch" }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      inputRef={password}
                      onChange={() => {
                        setpassworderr(null);
                      }}
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            style={{ color: "white" }}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  {passworderr !== null ? (
                    <span style={{ color: "red" }}>{passworderr}</span>
                  ) : (
                    <></>
                  )}

                  <Link
                    to={`/forgot-password`}
                    className="forgot-password"
                  >
                    Forgot Password?
                  </Link>
                  <Button
                    className="login-button"
                    variant="contained"
                    onClick={onSubmit}
                    disabled={disable}
                  >
                    {load == true ? "Logging In" : "Login"}
                    {load ? <span>&nbsp;</span> : null}
                    {load == true ? <BeatLoader size={8} color={disable ? "grey" : "white"} /> : null}
                  </Button>
                  {/* <div className="login-with">
                    <p>Or Log In With</p>
                    <ul className="login-with-list">
                      <li>
                        <Link>
                          <img src={googlelogo} alt="google-logo" />
                        </Link>
                      </li>
                      <li>
                        <Link>
                          <img src={twitterlogo} alt="twitter-logo" />
                        </Link>
                      </li>
                    </ul>
                  </div> */}
                </Box>
              </Item>
            </Grid>
            {matches ?
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                className={classes.loginrightouter}
              >
                <Item className={classes.loginright}>
                  <div className="loginright">
                    <img src={loginright} alt="loginright" />
                  </div>
                  <div className="text-big-login">ImperialX for Investors</div>
                  <div className="text-small-login">
                    Replicate successful trading strategies on autopilot
                  </div>
                </Item>
              </Grid> : null}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Login;
