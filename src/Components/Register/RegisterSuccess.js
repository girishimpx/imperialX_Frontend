import React, { useEffect, useState } from 'react'
import './RegisterSuccess.css'
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import logo from '../../images/logo.png'
import loginright from '../../images/login-right.png'
import googlelogo from '../../images/googlelogo.png'
import twitterlogo from '../../images/twitterlogo.png'
import Const from '../../Constansts'
import { toast, Toaster, ToastBar } from "react-hot-toast";


import { Link, useLocation } from 'react-router-dom'
import Axios from '../../Axios';


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
    }
});

const RegisterSuccess = () => {

    const classes = useStyles();

    const location = useLocation()
    const email = window.localStorage.getItem('email')
    const [status, setStatus] = useState(false)
    // useEffect(() => {
    //     setEmail(location?.state?.data)
    // }, [location])

    const resendEmail = async () => {
        try {
            setStatus(true)
            const { data } = await Axios.post('/users/resendemail', {
                email: email
            })
            if (data?.success) {
                toast.success("Email Send Successfully")
                setStatus(false)
            }
        } catch (error) {
            toast.error("Something Went Wrong")
            setStatus(false)
        }

    }

    return (

        <div className='login-page'>
            <Toaster />
            <Box sx={{ flexGrow: 1 }} className={classes.loginpagebox}>

                <Grid container spacing={0} className={classes.loginpage}>

                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.loginleftouter}>
                        <Item className={classes.loginleft}>
                            <div className='have-account'>Have an account? <Link to={`/login`}>Login</Link></div>
                            <div className='logo'><img src={logo} alt="logo" /></div>
                            <h2>Verify Your Email Address to Continue</h2>
                            <p className='para-text'>We just emailed an activation link to <span className='send-your-mail'>example.mail@gmail.com</span>. Please confirm your email address to continue.</p>
                            <p className='para-text'>Haven’t got verification letter? <Link className='resend-mail' > <button style={{ background: 'transparent' }} onClick={() => { resendEmail() }} disabled={status}> Resend letter</button> </Link></p>
                            <div className='login-with register-success-other'>
                                <p>Or Sign Up With</p>
                                <ul className='login-with-list'>
                                    <li><Link><img src={googlelogo} alt="google-logo" /></Link></li>
                                    <li><Link><img src={twitterlogo} alt="twitter-logo" /></Link></li>
                                </ul>
                            </div>
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

export default RegisterSuccess
