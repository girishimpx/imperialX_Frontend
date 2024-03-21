import React from 'react'
import './RegisterDetail.css'
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import logo from '../../images/logo.png'
import loginright from '../../images/login-right.png'
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom'
import Constant from '../../Constansts'


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
    dashboarbalancecls: {
        background: 'radial-gradient(35.18% 134.17% at 50% 50%, rgba(41, 197, 161, 0.2) 0%, rgba(28, 112, 99, 0.2) 100%) !important',
        border: '0.926846px solid #25DEB0 !important',
        backdropFilter: 'blur(1.85369px) !important',
        borderRadius: '30px !important',
        padding: '20px 23px !important'
    },
    blockwidthcmn:{
        maxWidth: '23% !important',
        margin: '40px 0 !important'
    },
    loginleftouter:{
        background: 'transparent !important',
        borderRadius: '0px !important',
        boxShadow:'none !important',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    loginrightouter:{
        background: 'linear-gradient(171.72deg, rgba(37, 222, 176, 0.42) 12.7%, rgba(115, 250, 237, 0) 100%), linear-gradient(320.64deg, #25DEB0 0%, #131A26 100.03%) !important',
        borderRadius: '0px !important',
        boxShadow:'none !important',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginleft:{
        background: 'transparent !important',
        borderRadius: '0px !important',
        boxShadow:'none !important',
        width: '50%',
        paddingTop: '40px !important'
    },
    loginright:{
        background: 'transparent !important',
        borderRadius: '0px !important',
        boxShadow:'none !important',
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
        '&input': {
          color: '#fff !important'
        }
    }
  });

const RegisterDetail = () => {

  const classes = useStyles();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (

<div className='login-page'>

<Box sx={{ flexGrow: 1 }} className={classes.loginpagebox}>

<Grid container spacing={0} className={classes.loginpage}>

<Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.loginleftouter}>
<Item className={classes.loginleft}>
<div className='have-account'>Have an account? <Link to={`${Constant.route}/login`}>Login</Link></div>    
<div className='logo'><img src={logo} alt="logo"/></div>
<h2>Email Verified!</h2>
<p style={{marginBottom: '10px'}} className='para-text'>Your email <span className='send-your-mail'>gowtham.alpharive@gmail.com</span> has been verified.
Now fill the informaion bellow to finish account registration.</p>
   <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      className={classes.loginform}
    >
    <TextField
          id="outlined-helperText"
          className={classes.emailfield}
          label="Your Nickname (Not necessary)"
          defaultValue="Default Value"
          helperText="Use 3 to 40 lowercase latin letters, numbers, and underscores"
        />

      <TextField className={classes.emailfield} id="outlined-basic" label="Email or Username" variant="outlined" />

      <FormControl className={classes.passwordfield} sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            inputProps={{
                'aria-label': 'Use 6 to 64 characters. Include latin letters, at least 1 number or 1 special symbol, and 1 uppercase',
              }}
          />
          <FormHelperText id="outlined-weight-helper-text">Use 6 to 64 characters. Include latin letters, at least 1 number or 1 special symbol, and 1 uppercase</FormHelperText>
        </FormControl>

        <Button className='login-button' variant="contained">Create Account</Button>

        <p className='tc-pp'>By singing up, I agree to Coinmatics <Link>Terms and Conditions</Link> and <Link>Privacy Policy</Link></p>

        {/* <div className='login-with'>
        <p>Or Sign Up With</p>
        <ul className='login-with-list'>
            <li><Link><img src={googlelogo} alt="google-logo"/></Link></li>
            <li><Link><img src={twitterlogo} alt="twitter-logo"/></Link></li>
        </ul>
        </div> */}
    </Box>
</Item>
</Grid>

<Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.loginrightouter}>
<Item className={classes.loginright}>
<div className='loginright'><img src={loginright} alt="loginright"/></div>
<div className='text-big-login'>ImperialX for Investors</div>
<div className='text-small-login'>Replicate successful trading strategies on autopilot</div>
</Item>
</Grid>

</Grid>

</Box>
      
</div>

  )
}

export default RegisterDetail
