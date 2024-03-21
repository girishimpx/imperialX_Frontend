import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import "./TradingPair.css"
import { makeStyles } from "@mui/styles";
import ques from "../../images/ques.png";
import Tradepairchart from './Tradepairchart';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const useStyles = makeStyles({

    // profitChartcontain: {
    //     borderRadius: '19.178px',
    // border: '0.639px solid var(--01, #25deb0)',
    // background: 'radial-gradient( 138.71% 122.96% at 50% 50%, rgba(41, 197, 161, 0.2) 0%, rgba(28, 112, 99, 0.2) 100% )',
    // backdropFilter: 'blur(1.2785571813583374px)',
    // padding: '30px 50px',
    // margin: '8px'
    // },
    transparentbggraph: {
        background: 'transparent !important',
        boxShadow: 'none !important'
    }

});
  
const TradingPair = ({sideBarShow,setSideBarShow}) => {
  const classes = useStyles();
  return (
    <div className='openposition-full'>
    <Box sx={{ flexGrow: 1 }}>
     <Grid container spacing={0}>
       <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
       <Item className={classes.transparentbggraph}>
        <div className='trade-outer'>
        <div className='trade-flex'>
           <h5 className='open-head'>Trading Pairs <img src={ques} /></h5>
           <p className='view-para'>view all</p>
           </div>
           <Tradepairchart/>
        </div>
        </Item>
       </Grid>
     </Grid>
   </Box>
 </div>
  )
}

export default TradingPair
