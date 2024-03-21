import React, { useEffect } from 'react'
import './Register.css'
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import logo from '../../images/logo.png'
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import loginright from '../../images/login-right.png'
import googlelogo from '../../images/googlelogo.png'
import twitterlogo from '../../images/twitterlogo.png'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRef } from 'react';
import { red } from '@mui/material/colors';
import Constant from '../../Constansts'
import Axios from '../../Axios'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  dashboarbodycls: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
  },
  dashboarbalancecls: {
    background: 'radial-gradient(35.18% 134.17% at 50% 50%, rgba(41, 197, 161, 0.2) 0%, rgba(28, 112, 99, 0.2) 100%) !important',
    border: '0.926846px solid #25DEB0 !important',
    backdropFilter: 'blur(1.85369px) !important',
    borderRadius: '30px !important',
    padding: '20px 23px !important'
  },
  blockwidthcmn: {
    maxWidth: '23% !important',
    margin: '40px 0 !important'
  },
  loginleftouter: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  loginrightouter: {
    background: 'linear-gradient(171.72deg, rgba(37, 222, 176, 0.42) 12.7%, rgba(115, 250, 237, 0) 100%), linear-gradient(320.64deg, #25DEB0 0%, #131A26 100.03%) !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginleft: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    width: '50%'
  },
  loginright: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
  },
  loginpage: {
    display: 'flex',
    height: '100%'
  },
  loginform: {
    display: 'flex !important',
    flexDirection: 'column',
    marginLeft: '0px',
    marginRight: '0px',
  },
  checkbox: {
    '& svg': {
      fill: '#25deb0 !important',
    },
  }
});


const Register = () => {

  const [confirmPass, setConfirmPass] = useState(null)
  const [referralErr, setReferralErr] = useState(null)
  const [mail, setMail] = useState("")
  const [username, setUsername] = useState("")
  const [ischecked, setIschecked] = useState(false)
  const inpassref = useRef(null);
  const inputconfrimRef = useRef(null);
  const email = useRef(null);
  const name = useRef(null);
  const referral = useRef(null);
  const checkreferral = useRef(null)

  const [emailerr, setemailerr] = useState(null)
  const [usernameerr, setusernameerr] = useState(null)
  const [passworderr, setpassworderr] = useState(null)
  const [cpassworderr, setcpassworderr] = useState(null)

  const classes = useStyles();
  const navigate = useNavigate();


  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showconfirmPassword, setShowconfirmPassword] = React.useState(false);
  const handleClickShowconfirmPassword = () => setShowconfirmPassword((show) => !show);

  const handleMouseDownconfirmPassword = (event) => {
    event.preventDefault();
  };

  const responseGoogle = async (response) => {
    try {
      var decoded = jwt_decode(response.credential);
      const datas = await Axios.post(`${Constant.BackendUrl}/users/register`,
        {
          name: decoded.name,
          email: decoded.email,
          signup_type: "google"
        })
      if (datas?.data?.success) {
        const check2fa = await Axios.get("/users/check2fa", {
          headers: {
            Authorization: datas?.data?.result?.token,
          },
        })
        if (check2fa?.data?.result) {
          navigate(`${Constant.route}/2FA`, {
            state: { token: check2fa?.data?.result },
          })
        }
        else {
          window.localStorage.setItem(
            "Mellifluous",
            datas?.data?.result.token
          );
          window.localStorage.setItem("users", JSON.stringify(datas?.data?.result.user));
          window.localStorage.setItem("kyc_verify", datas?.data?.result?.user.kyc_verify)
          navigate(`${Constant.route}/`)

        }

      }
      else {
        console.log("Error")
      }
    } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.message}`, {

        duration: 1000,
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

  };
  const responseGoogles = (response) => {
    console.log("error", response);

  };
  function getPassword() {
    setpassworderr(null)
    // if (inpassref.current.value === inputconfrimRef.current.value) {
    //   setConfirmPass("");
    // } else {
    //   setConfirmPass("Password Miss-Match");
    // }
  }

  function confirmPassword() {
    setcpassworderr(null)
    if (inpassref.current.value === inputconfrimRef.current.value) {
      setConfirmPass(null);
    } else {
      setConfirmPass("Password Miss-Match");
    }
  }

  function verifyemail() {
    setemailerr(null)
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.current.value)) {
      setMail("")
    } else if (email.current.value === "") {
      setMail("")
    } else {
      setMail("Invalid-Email-Format")
    }
  }
  const handleChange = (event) => {
    setIschecked(!ischecked)

  }

  const handleSuccessRegister = async () => {
    try {

      // console.log(name.current.value, email.current.value, inputconfrimRef.current.value, inpassref.current.value, passworderr, cpassworderr, usernameerr, emailerr, confirmPass, "redfs")
      // if (name.current.value !== "" && email.current.value !== "" && inputconfrimRef.current.value !== "" && inpassref.current.value !== ""
      //   && passworderr === null && cpassworderr === null && usernameerr === null && emailerr === null && confirmPass === null)

      if (name.current.value === "") {
        setusernameerr("Please Enter Username")
      } else if (email.current.value === "") {
        setemailerr("Please Enter Email")
      } else if (inpassref.current.value === "") {
        setpassworderr("Please Enter Password")
      } else if (inputconfrimRef.current.value === "") {
        setcpassworderr("Please Enter Confirm Password")
      } else if (inpassref.current.value !== inputconfrimRef.current.value) {
        setConfirmPass("Password Miss-Match");
      }
      else {

        const { data } = await Axios.post('/users/register',
          {
            name: name.current.value,
            email: email.current.value,
            password: inpassref.current.value,
            signup_type: "gmail"
          }
        )
        if (data.result) {
          navigate(`${Constant.route}/register-success`)
          window.localStorage.setItem('email', email.current.value)
        }
      }
    } catch (error) {
      if (error?.response?.data?.message === "Email Already Exists") {
        setemailerr(error?.response?.data?.message)
      } else {
        setpassworderr(error?.response?.data?.message)
      }
    }
  }

  const handleSuccessRegisters = async () => {
    try {
      // if (name.current.value !== "" && email.current.value !== "" && inputconfrimRef.current.value !== "" && inpassref.current.value !== ""
      //   && passworderr === null && cpassworderr === null && usernameerr === null && emailerr === null && confirmPass === null)

      if (name.current.value === "") {
        setusernameerr("Please Enter Username")
      } else if (email.current.value === "") {
        setemailerr("Please Enter Email")
      } else if (inpassref.current.value === "") {
        setpassworderr("Please Enter Password")
      } else if (inputconfrimRef.current.value === "") {
        setcpassworderr("Please Enter Confirm Password")
      } else if (inpassref.current.value !== inputconfrimRef.current.value) {
        setConfirmPass("Password Miss-Match");
      } else if (referral.current.value === "") {
        setReferralErr("Enter Refferal Code");
      }
      else {
        const { data } = await Axios.post('/users/register',
          {
            name: name.current.value,
            email: email.current.value,
            password: inpassref.current.value,
            referred_by_code: referral.current.value,
            signup_type: "gmail"
          }
        )

        if (data.result) {
          navigate(`${Constant.route}/register-success`)
          window.localStorage.setItem('email', email.current.value)
        }
        else if (data.message === "Invalid Referral Id") {
          setReferralErr("Invalid Refferal Code")
        }
      }
    } catch (error) {
      if (error?.response?.data?.message === "Email Already Exists") {
        setemailerr(error?.response?.data?.message)
      } else {
        setpassworderr(error?.response?.data?.message)
      }
    }
  }

  return (

    <div className='login-page'>
      <Toaster />
      <Box sx={{ flexGrow: 1 }} className={classes.loginpagebox}>

        <Grid container spacing={0} className={classes.loginpage}>

          <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.loginleftouter}>
            <Item className={classes.loginleft}>
              <div className='have-account'>Have an account? <Link to={`${Constant.route}/login`}>Login</Link></div>
              <div className='logo'><img src={logo} alt="logo" /></div>
              <h2>Create an Account</h2>

              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField id="outlined-basic" label="Username" variant="outlined" inputRef={name} onChange={() => { setusernameerr(null) }} />
                {/* <h3 className='h3'>{username} </h3> */}
                {usernameerr ? <div className='h3'>{usernameerr}</div> : <></>}

                <TextField id="outlined-basic" label="Email" variant="outlined"
                  inputRef={email} onChange={verifyemail} />
                <h3 className='h3' >{mail}</h3>
                {emailerr !== null ? <h3 className='h3'>{emailerr}</h3> : <></>}

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >
                  <InputLabel htmlFor="outlined-adornment-password" onChange={getPassword}>Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    inputRef={inpassref}
                    onChange={getPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          style={{ color: 'white' }}
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
                {passworderr !== null ? <h3 className='h3'>{passworderr}</h3> : <></>}

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" >Confirm-Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showconfirmPassword ? 'text' : 'password'}
                    inputRef={inputconfrimRef}
                    onChange={confirmPassword}
                    endAdornment={
                      <InputAdornment position="end" >
                        <IconButton
                          style={{ color: 'white' }}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowconfirmPassword}
                          onMouseDown={handleMouseDownconfirmPassword}
                          edge="end"
                        >
                          {showconfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm-Password"
                  />
                </FormControl>

                {confirmPass ? <h3 className='h3'> {confirmPass} </h3> : <></>}
                {cpassworderr !== null ? <h3 className='h3'>{cpassworderr}</h3> : <></>}
                <FormControl>
                  <FormControlLabel
                    control={<Checkbox className={classes.checkbox} checked={ischecked} inputRef={checkreferral} onChange={handleChange} />}
                    label="Do you have Referal Code"
                  />
                </FormControl>
                {checkreferral?.current?.checked === true ? <> <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" >Referal Code</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type="text"
                    inputRef={referral}
                    onChange={() => setReferralErr(null)}
                    label="Reffral Code"
                  />
                </FormControl>
                  {referralErr !== null ? <h3 className='h3'>{referralErr}</h3> : <></>}</> :
                  <></>
                }

                {checkreferral?.current?.checked === true ? <Button className='login-button' variant="contained" onClick={() => handleSuccessRegisters()}>Continue</Button> :
                  <Button className='login-button' variant="contained" onClick={() => handleSuccessRegister()}>Continue</Button>}
                <div style={{ "display": "flex", justifyContent: "center" }}>
                  <GoogleLogin
                    clientId="498193022448-gb2na1hmb13r8modis57mh51osc8rp3q.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogles}

                  />
                </div>
                {/* <div className='login-with'>
                  <p>Or Sign Up With</p>
                  <ul className='login-with-list'>
                    <li><Link><img src={googlelogo} alt="google-logo" /></Link></li>
                    <li><Link><img src={twitterlogo} alt="twitter-logo" /></Link></li>
                  </ul>
                </div> */}
              </Box>
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.loginrightouter}>
            <Item className={classes.loginright}>
              <div className='loginright'><img src={loginright} alt="loginright" /></div>
              <div className='text-big-login'>ImperialX for Investors</div>
              <div className='text-small-login'>Replicate successful trading strategies on autopilot</div>
            </Item>
          </Grid>

        </Grid>

      </Box>

    </div>

  )
}

export default Register
