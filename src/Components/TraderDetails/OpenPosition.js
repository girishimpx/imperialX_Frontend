import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import "./OpenPosition.css";
import astro from "../../images/astro.png";
import ques from "../../images/ques.png";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  tradingscoreinner:{
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow:'none !important',
  }
});


const OpenPosition = ({sideBarShow,setSideBarShow}) => {
  const classes = useStyles();
  return (
    <div className='openposition-full'>
       <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Item className={classes.tradingscoreinner}>
          <div className='openposition-outer'>
              <h5 className='open-head'>Open Positions <img src={ques} /></h5>
              <div className='astro-part'>
           <img src={astro} />
           </div>

           <div className='btm-position'>
            <p className='position-para'>No positions</p>
            <p className='position-paras'>The strategy has no open positions</p>
             
           </div>
           </div>

          </Item>
          </Grid>
          
        </Grid>
      </Box>
    </div>
  )
}

export default OpenPosition
