import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import SpotBody from './SpotBody';

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
        padding:'20px !important',
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


const Spot = ({ setSideBarShow, sideBarShow }) => {

  const classes = useStyles();

  return (
    <div>
     
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0}>
    <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
    <Item className={classes.sidebarcls}>
        <Sidebar sideBarShow={sideBarShow} setSideBarShow={setSideBarShow} />
    </Item>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
    <Item className={classes.headercls}>
      <Header sideBarShow={sideBarShow} setSideBarShow={setSideBarShow} />
      <SpotBody/>
    </Item>
    </Grid>
    </Grid>
    </Box>

    </div>
  )
}

export default Spot
