import React from "react";
import { useState } from "react";
import "./ForgotPassword.css";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import logo from "../../images/logo.png";
import loginright from "../../images/login-right.png";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Constant from "../../Constansts";
import Axios from "../../Axios";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
import Button from "@mui/material/Button";
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
    paddingTop: "40px !important",
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
    '@media(max-width:991.98px)': {
      alignItems: 'center',
    },

    "&input": {
      color: "#fff !important",
    },
  },
});

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = React.useState();
  const [otp, setotp] = React.useState();
  const [new_password, setpassword] = React.useState();
  const [confirmPAssword, setconfirmPAssword] = React.useState();
  const [emailerr, setEmailerr] = React.useState();
  const [otperr, setotperr] = React.useState();
  const [passworderr, setpassworderr] = React.useState();
  const [setCpwderr, setcpwderr] = React.useState();
  const [otpPage, setOtpPage] = React.useState(false);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)

  const [showPassword, setShowPassword] = React.useState(false);

  const [showPassword2, setShowPassword2] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const SubmitEmail = () => {
    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm"
    );

    if (!email) {
      setEmailerr("* Email Required");
    } else if (!emailRegex.test(email)) {
      setEmailerr("Invalid Email");
    } else {
      setLoader(true)
      Axios.post(`${Constant.BackendUrl}/auth/forgot`, { email })
        .then((res) => {
          setLoader(false)
          setOtpPage(true);
        })
        .catch((err) => {
          setLoader(false)
          toast.error(`${err?.response?.data?.message}`, {
            duration: 4000,
            position: "top-center",

            // Styling
            style: {
              backgroundColor: "#fc1922",
              padding: "1rem",
              fontSize: "18px",
              color: "white",
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
          })
        }
        );
    }
  };
  const sendPasswordAndOtp = () => {
    const passwordregex = new RegExp(
      /(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$)+/,
      "gm"
    );
    if (!otp) {
      setotperr("OTP required");
    } else if (!new_password) {
      setpassworderr("*Password required");
    } else if (!passwordregex.test(new_password)) {
      setpassworderr(
        "Password must be a minimum 8 characters & Maximum 16 characters.Eg: Abc@1234"
      );
    } else if (!confirmPAssword) {
      setcpwderr("Confirm password required");
    } else if (confirmPAssword != new_password) {
      setcpwderr("Password and Confirm password must be same");
    } else {
      Axios.post(`${Constant.BackendUrl}/auth/reset`, {
        otp,
        new_password,
        email,
      })
        .then((res) => {
          setEmail("");
          // console.log(res?.data,"data")
          toast.success(`${res?.data.message}`, {
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
          setTimeout(() => {
            setOtpPage(false);
            navigate(`${Constant.route}/login`);
            console.log(email);
          }, 2000);
        })
        .catch((err) =>
          toast.error(`${err.response.data.message}`, {
            duration: 4000,
            position: "top-center",

            // Styling
            style: {
              backgroundColor: "#fc1922",
              padding: "1rem",
              fontSize: "15px",
              color: "white",
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
          })
        );
    }
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <div className="login-page">
      <Toaster />
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
                Have an account?{" "}
                <Link to={`${Constant.route}/login`}>Login</Link>
              </div>
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>
              <h2>Forgot Your Password?</h2>
              <p style={{ marginBottom: "10px" }} className="para-text">
                Enter the email address you used when you joined and we’ll send
                you instructions to reset your password.
              </p>
              {!otpPage && (
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" }
                  }}
                  noValidate
                  autoComplete="off"
                  className={classes.loginform}
                >
                  <TextField
                    className={classes.emailfield}
                    id="outlined-basic"
                    label="Your Email Address"
                    variant="outlined"
                    onChange={(e) => {
                      setEmailerr("");
                      setEmail(e.target.value);
                    }}
                  />
                  {emailerr && (
                    <p style={{ color: "red", marginTop: "-5px" }}>
                      {" "}
                      {emailerr}
                    </p>
                  )}
                  {
                    loader ?
                      <Button
                        className="login-button"
                        variant="contained"
                      >
                        Loading <BeatLoader size={10} />
                      </Button>
                      :
                      <Button
                        className="login-button"
                        variant="contained"
                        onClick={() => { SubmitEmail() }}
                      >
                        Continue
                      </Button>
                  }

                </Box>
              )}

              {/*otp page */}
              {otpPage && (
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                  className={classes.loginform}
                >
                  {/* <div
                    style={{
                      width: "100%",
                      textAlign: "end",
                      marginBottom: "-17px",
                    }}
                  >
                    <Button
                      onClick={() => {
                        setOtpPage(false);
                        setEmail("");
                        setotp("");
                        setpassword("");
                        setotperr("");
                        setpassworderr("");
                      }}
                    >
                      Back
                    </Button>
                  </div> */}

                  <TextField
                    className={classes.emailfield}
                    id="outlined-basic"
                    label="OTP"
                    // type="number"
                    variant="outlined"
                    onChange={(e) => {
                      setotperr("");
                      setotp(e.target.value);
                    }}
                    onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                        setotperr("Enter Valid Number")
                      }
                    }}
                  />
                  {otperr && (
                    <p style={{ color: "red", marginTop: "-5px" }}> {otperr}</p>
                  )}
                  <FormControl
                    className={classes.passwordfield}
                    sx={{ m: 1, width: "25ch" }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      New Password
                    </InputLabel>
                    <OutlinedInput
                      // className={classes.emailfield}
                      id="outlined-basic"
                      label="Newpassword"

                      variant="outlined"
                      onChange={(e) => {
                        setpassworderr("");
                        setpassword(e.target.value);
                      }}
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
                    />
                  </FormControl>
                  {passworderr && (
                    <p
                      style={{ color: "red", marginTop: "-5px", width: "100%" }}
                    >
                      {" "}
                      {passworderr}
                    </p>
                  )}
                  <FormControl
                    className={classes.passwordfield}
                    sx={{ m: 1, width: "25ch" }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      className={classes.emailfield}
                      id="outlined-basic"
                      label="Confirm password"
                      variant="outlined"
                      onChange={(e) => {
                        setcpwderr("");
                        setconfirmPAssword(e.target.value);
                      }}
                      type={showPassword2 ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            style={{ color: "white" }}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword2}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword2 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  {setCpwderr && (
                    <p
                      style={{ color: "red", marginTop: "-5px", width: "100%" }}
                    >
                      {" "}
                      {setCpwderr}
                    </p>
                  )}
                  <Button
                    className="login-button"
                    variant="contained"
                    onClick={sendPasswordAndOtp}
                  >
                    Submit
                  </Button>
                </Box>
              )}
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
  );
};

export default ForgotPassword;
