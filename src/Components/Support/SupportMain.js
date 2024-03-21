import React from 'react'
import './SupportMain.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import mail from '../../images/mail.png'
import Phone from '../../images/Phone.png'
import Chat from '../../images/Chat.png'
import { Link } from 'react-router-dom';
import consts from "../../Constansts";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
    transbg:{
      background: 'transparent !important',
        borderRadius: '0px !important',
        boxShadow:'none !important',
        overflow: 'hidden',
        position: 'relative'
    },
    sidebarcls:{
        background: '#010712 !important',
          borderRadius: '0px !important',
          boxShadow:'none !important',
          overflow: 'hidden',
          position: 'sticky !important',
        top: '0px',
        padding:'0px !important',
        height: '100vh'
      },
      headercls: {
        background: '#131a26 !important',
        borderRadius: '0px !important',
        boxShadow:'none !important',
        padding:'20px 55px !important',
        '& form':{
          padding:'0px !important',
          '@media (max-width: 767.98px)' : {
            width: '100%',
          },
          '& button': {
            background: '#25DEB0',
            borderRadius: '0px 5px 5px 0px'
          }
        },
        '@media (max-width: 767.98px)' : {
          padding: '20px !important',
        },
    }
  });

const SupportMain = ({setSideBarShow, sideBarShow, openSideBar, setOpenSideBar}) => {

    const classes = useStyles();

  return (
    <div className='support-main-outer-page'>

     <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0}>
    {/* <Grid item xs={12} sm={12} md={12} lg={2} xl={2}> */}
    <Item className={classes.sidebarcls}>
        <Sidebar sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar }
                setOpenSideBar={setOpenSideBar}/>
    </Item>
    {/* </Grid> */}
    <Grid id={sideBarShow ? "z-index-prop-postve" : "z-index-prop-negtve"} item xs={12} sm={12} md={12} lg={10} xl={10}>
    <Item className={classes.headercls}>
      <Header sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar }
                setOpenSideBar={setOpenSideBar}/>
      <Box sx={{ flexGrow: 1 }} className="support-body-main-three">
        <Grid container spacing={0}>

        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Item className={classes.transbg}>
            <div className="common-size-block">
            <h4>Email On</h4>
            <div className='contact-icon-size'>
                <img src={mail} alt="mail"/>
            </div>
            <span>support@imperialx.exchange</span>
            </div>
        </Item>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Item className={classes.transbg}>
        <div className="common-size-block">
            <h4>Chat With Us</h4>
            <div className='contact-icon-size'>
                <img src={Chat} alt="Chat"/>
            </div>
            <Link to={`${consts.route}/support`}>Click here to chat with us</Link>
            </div>
            
        </Item>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Item className={classes.transbg}>
        <div className="common-size-block">
            <h4>Call Us</h4>
            <div className='contact-icon-size'>
                <img src={Phone} alt="Phone"/>
            </div>
            <span>+91 98765 90671</span>
            </div>
            
        </Item>
        </Grid>

        </Grid>
      </Box>
    </Item>
    </Grid>
    </Grid>
    </Box>


      
    </div>
  )
}

export default SupportMain
