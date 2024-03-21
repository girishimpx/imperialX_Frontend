import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import './Wallet.css'
import TopPerformer from '../Dashboard/TopPerformer';
import WalletTable from './WalletTable';
import WalletPieChart from './WalletPieChart';
import axios from 'axios'
import CryptoJS from "crypto-js";
import Axios from "../../Axios";
import consts from '../../Constansts';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from '@mui/material/Button';


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
  walletbodycls: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
  },
  walletbalancecls: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
  },
  tradeviewinner: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
  },
  walletcls: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
  }
});

const WalletBody = () => {
  const [balance, setBalance] = useState()
  const classes = useStyles();
  const navigate = useNavigate()
  // useEffect(()=>{
  //   RequestApp()
  // },[])    

  const getmyWallet = () => {
    try {
      Axios.get(`/wallet/getWalletById`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          if (res?.data?.success) {
            // console.log(res?.data?.success, "dates")
            // console.log(res.data.total_price_in_usd,'success');
            setBalance(res.data.total_price_in_usd)
            // console.log(res?.data?.result, "respon")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error)
    }
  
  }
  

  useEffect(() => {
    getmyWallet()

  }, [])

  return (
    <div className='Wallet-Body-Page'>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
          
        </Grid>
        
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.walletbodycls}>
              <h3 className='welcome-msg'>My Wallet</h3>
              {/* <p className='welcome-txt'>We are on a mission to help developers like you to build beautiful projects for free.</p> */}
              <p className='welcome-msg1'> TOTAL BALANCE : <div className='balance-span1'> ${ balance ? balance.toFixed(6) : 0} <span className='balance-span'> USDT </span> </div> </p>
            </Item>
          </Grid>

        </Grid>



        <Grid container spacing={0} className='balance-blocks-trade-view' id='balance-blocks-trade-view'>


          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.tradeview}>
            <Item className={classes.tradeviewinner}>

              <WalletTable />
            </Item>
          </Grid>
        </Grid>



        <Grid container spacing={0} id='Top-Trading-Plartform'>

        </Grid>

      </Box>
    </div>
  )
}

export default WalletBody
