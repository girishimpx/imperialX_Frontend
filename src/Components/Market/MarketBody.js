import React from 'react'
import './Market.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import tradingdata from '../../images/trading-data.png'

import coin1 from '../../images/coin-1.png'
import coin2 from '../../images/coin-2.png'
import coin3 from '../../images/coin-5.png'
import coin4 from '../../images/cosmos-atom-logo.png'
import coin5 from '../../images/theta-network-theta-logo.png'
import coin6 from '../../images/unus-sed-leo-leo-logo.png'
import coin7 from '../../images/dogecoin-doge-logo.png'
import coin8 from '../../images/solana-sol-logo.png'
import coin9 from '../../images/coin-3.png'
import BasicMarketTabs from './BasicMarketTabs';
import { useState } from 'react';
import { useEffect } from 'react';


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
    topmarketleft: {
        '& h1': {
            margin: '0px !important',
            textAlign: 'left !important',
            color: '#fff !important'
        },
        '& p': {
            margin: '0px !important',
            textAlign: 'left !important',
            color: '#707A8A !important'
        }
    },
    topmarket: {
        padding: '30px 0 !important',
        '@media (max-width: 767.98px)': {
            padding: '0px !important',
        }
    },
    commonflexbox: {
        alignItems: 'center',
        margin: '10px 0'
    }
});
var ws = new WebSocket("wss://ws.okex.com:8443/ws/v5/public?brokerId=198");
const MarketBody = () => {

    const classes = useStyles();
    const [datas, setdatas] = useState(
        {
            "op": "subscribe",
            "args": [
                {
                    "channel": "tickers",
                    "instId": "XRP-USDT"
                },
                {
                    "channel": "tickers",
                    "instId": "BTC-USDT"
                },
                {
                    "channel": "tickers",
                    "instId": "ETH-USDT"
                },
                {
                    "channel": "tickers",
                    "instId": "ATOM-USDT"
                },
                {
                    "channel": "tickers",
                    "instId": "THETA-USDT"
                },
                {
                    "channel": "tickers",
                    "instId": "LEO-USDT"
                },
                {
                    "channel": "tickers",
                    "instId": "DOGE-USDT"
                },
                {
                    "channel": "tickers",
                    "instId": "SOL-USDT"
                },
                {
                    "channel": "tickers",
                    "instId": "MATIC-USDT"
                }
            ]
        }
    )
    const [btchigh, setbtchigh] = useState({ price: "0", per: "0" })
    const [ethhigh, setethhigh] = useState({ price: "0", per: "0" })
    const [xrphigh, setxrphigh] = useState({ price: "0", per: "0" })
    const [atomhigh, setatomhigh] = useState({ price: "0", per: "0" })
    const [thetahigh, setthetahigh] = useState({ price: "0", per: "0" })
    const [leohigh, setleohigh] = useState({ price: "0", per: "0" })
    const [dogehigh, setdogehigh] = useState({ price: "0", per: "0" })
    const [solhigh, setsolhigh] = useState({ price: "0", per: "0" })
    const [matichigh, setmatichigh] = useState({ price: "0", per: "0" })


    const socket = async () => {
        ws.onopen = (event) => {
            ws.send(JSON.stringify(datas));
        };

        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            try {
                if (response?.arg?.instId === "XRP-USDT") {
                    const increase = response?.data[0]?.last - response?.data[0]?.open24h;
                    const price_change = (increase / response?.data[0]?.open24h) * 100;
                    setxrphigh({ price: response?.data[0]?.last, per: parseFloat(price_change).toFixed(2) })
                }
                if (response?.arg?.instId === "BTC-USDT") {
                    const increase = response?.data[0]?.last - response?.data[0]?.open24h;
                    const price_change = (increase / response?.data[0]?.open24h) * 100;
                    setbtchigh({ price: response?.data[0]?.last, per: parseFloat(price_change).toFixed(2) })
                }
                if (response?.arg?.instId === "ETH-USDT") {
                    const increase = response?.data[0]?.last - response?.data[0]?.open24h;
                    const price_change = (increase / response?.data[0]?.open24h) * 100;
                    setethhigh({ price: response?.data[0]?.last, per: parseFloat(price_change).toFixed(2) })
                }
                if (response?.arg?.instId === "LEO-USDT") {
                    const increase = response?.data[0]?.last - response?.data[0]?.open24h;
                    const price_change = (increase / response?.data[0]?.open24h) * 100;
                    setleohigh({ price: response?.data[0]?.last, per: parseFloat(price_change).toFixed(2) })
                }
                if (response?.arg?.instId === "ATOM-USDT") {
                    const increase = response?.data[0]?.last - response?.data[0]?.open24h;
                    const price_change = (increase / response?.data[0]?.open24h) * 100;
                    setatomhigh({ price: response?.data[0]?.last, per: parseFloat(price_change).toFixed(2) })
                }
                if (response?.arg?.instId === "DOGE-USDT") {
                    const increase = response?.data[0]?.last - response?.data[0]?.open24h;
                    const price_change = (increase / response?.data[0]?.open24h) * 100;
                    setdogehigh({ price: response?.data[0]?.last, per: parseFloat(price_change).toFixed(2) })
                }
                if (response?.arg?.instId === "THETA-USDT") {
                    const increase = response?.data[0]?.last - response?.data[0]?.open24h;
                    const price_change = (increase / response?.data[0]?.open24h) * 100;
                    setthetahigh({ price: response?.data[0]?.last, per: parseFloat(price_change).toFixed(2) })
                }
                if (response?.arg?.instId === "SOL-USDT") {
                    const increase = response?.data[0]?.last - response?.data[0]?.open24h;
                    const price_change = (increase / response?.data[0]?.open24h) * 100;
                    setsolhigh({ price: response?.data[0]?.last, per: parseFloat(price_change).toFixed(2) })
                }
                if (response?.arg?.instId === "MATIC-USDT") {
                    const increase = response?.data[0]?.last - response?.data[0]?.open24h;
                    const price_change = (increase / response?.data[0]?.open24h) * 100;
                    setmatichigh({ price: response?.data[0]?.last, per: parseFloat(price_change).toFixed(2) })
                }
                // rows.map(item => {
                //   if(item.name === response.data[0].instId)
                //   setSelected(item)
                //   console.log(item.name,response.data[0].instId,response.data[0].askSz,"price");
                //   item.price =response.data[0].askSz
                //   setSelected(item)
                // })



                // rows?.forEach((element) => {
                //   if (element?.name === response?.data[0]?.instId) {
                //     console.log(response?.data[0]?.askSz, "adf")
                //     element.price = response?.data[0]?.askSz
                //   }
                // })

                // setRows(
                //   rows?.map((item) => {
                //     if (item?.name === response?.data[0]?.instId) {
                //       return [...rows, { name: item?.name, price: response?.data[0]?.askSz }]
                //     }
                //   })
                // )


                // if (rows !== undefined) {
                //   const newlist = rows.map((item) => {
                //     if (item?.name === response?.data[0]?.instId) {
                //       const update = { name: item?.name, price: response?.data[0]?.askSz }
                //       return update
                //     }
                //   })
                //   setRows(newlist)
                // }
            } catch (err) {
                console.log(err);
            }
        };
    }

    useEffect(() => {
        if (datas?.args?.length > 0) {
            ws.close();
            ws = new WebSocket("wss://ws.okex.com:8443/ws/v5/public?brokerId=197"); // Close the WebSocket connection on unmount
            socket()
        }
    }, [datas])


    return (
        <div className='Market-body'>

            <Box sx={{ flexGrow: 1 }}>

                <Grid container spacing={0} className={classes.topmarket}>

                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.topmarketleft}>
                        <Item className={classes.dashboarbodycls}>
                            <h1>Market Overview</h1>
                            <p>All price information is in</p>
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.topmarketright}>
                        <Item className={classes.dashboarbodycls}>
                            <div className='trading-dta'><img src={tradingdata} alt="trading-data" />Trading Data</div>
                        </Item>
                    </Grid>

                </Grid>
            </Box>


            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0} id="coin-responsive-id">

                    <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                        <Item className={classes.dashboarbodycls}>
                            <p className='block-head-whitee'>Highlight Coin</p>
                            <Grid container spacing={0} className={classes.commonflexbox}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-img-name-dtl'><div><img src={coin1} alt='coins' /></div><span className='coin-name-rght'>BTC</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-mid'>$<span className='coin-rate-span'>{btchigh?.price}</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-status low-rate'><span className='coin-rate-percentage' style={btchigh?.per > 0 ? { color: "green" } : { color: "red" }} >{btchigh?.per}%</span></div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={0} className={classes.commonflexbox}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-img-name-dtl'><div><img src={coin2} alt='coins' /></div><span className='coin-name-rght'>ETH</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-mid'>$<span className='coin-rate-span'>{ethhigh?.price}</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-status low-rate'><span className='coin-rate-percentage' style={ethhigh?.per > 0 ? { color: "green" } : { color: "red" }}>{ethhigh?.per}%</span></div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={0} className={classes.commonflexbox}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-img-name-dtl'><div><img src={coin3} alt='coins' /></div><span className='coin-name-rght'>XRP</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-mid'>$<span className='coin-rate-span'>{xrphigh?.price}</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-status low-rate'><span className='coin-rate-percentage' style={xrphigh?.per > 0 ? { color: "green" } : { color: "red" }}>{xrphigh?.per}%</span></div>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                        <Item className={classes.dashboarbodycls}>
                            <p className='block-head-whitee'>New Listing</p>
                            <Grid container spacing={0} className={classes.commonflexbox}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-img-name-dtl'><div><img src={coin4} alt='coins' /></div><span className='coin-name-rght'>ATOM</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-mid'>$<span className='coin-rate-span'>{atomhigh?.price}</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-status low-rate'><span className='coin-rate-percentage' style={atomhigh?.per > 0 ? { color: "green" } : { color: "red" }}>{atomhigh?.per}%</span></div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={0} className={classes.commonflexbox}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-img-name-dtl'><div><img src={coin5} alt='coins' /></div><span className='coin-name-rght'>THETA</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-mid'>$<span className='coin-rate-span'>{thetahigh?.price}</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-status low-rate'><span className='coin-rate-percentage' style={thetahigh?.per > 0 ? { color: "green" } : { color: "red" }}>{thetahigh?.per}%</span></div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={0} className={classes.commonflexbox}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-img-name-dtl'><div><img src={coin6} alt='coins' /></div><span className='coin-name-rght'>LEO</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-mid'>$<span className='coin-rate-span'>{leohigh?.price}</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-status low-rate'><span className='coin-rate-percentage' style={leohigh?.per > 0 ? { color: "green" } : { color: "red" }}>{leohigh?.per}%</span></div>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                        <Item className={classes.dashboarbodycls}>
                            <p className='block-head-whitee'>Top Gainer Coin</p>
                            <Grid container spacing={0} className={classes.commonflexbox}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-img-name-dtl'><div><img src={coin7} alt='coins' /></div><span className='coin-name-rght'>DOGE</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-mid'>$<span className='coin-rate-span'>{dogehigh?.price}</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-status low-rate'><span className='coin-rate-percentage' style={dogehigh?.per > 0 ? { color: "green" } : { color: "red" }}>{dogehigh?.per}%</span></div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={0} className={classes.commonflexbox}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-img-name-dtl'><div><img src={coin8} alt='coins' /></div><span className='coin-name-rght'>SOL</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-mid'>$<span className='coin-rate-span'>{solhigh?.price}</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-status low-rate'><span className='coin-rate-percentage' style={solhigh?.per > 0 ? { color: "green" } : { color: "red" }}>{solhigh?.per}%</span></div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={0} className={classes.commonflexbox}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-img-name-dtl'><div><img src={coin9} alt='coins' /></div><span className='coin-name-rght'>MATIC</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-mid'>$<span className='coin-rate-span'>{matichigh?.price}</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-status low-rate'><span className='coin-rate-percentage' style={matichigh?.per > 0 ? { color: "green" } : { color: "red" }}>{matichigh?.per}%</span></div>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                        <Item className={classes.dashboarbodycls}>
                            <p className='block-head-whitee'>Top Volume Coin</p>
                            <Grid container spacing={0} className={classes.commonflexbox}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-img-name-dtl'><div><img src={coin1} alt='coins' /></div><span className='coin-name-rght'>BTC</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-mid'>$<span className='coin-rate-span'>{btchigh?.price}</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-status low-rate'><span className='coin-rate-percentage' style={btchigh?.per > 0 ? { color: "green" } : { color: "red" }}>{btchigh?.per}%</span></div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={0} className={classes.commonflexbox}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-img-name-dtl'><div><img src={coin2} alt='coins' /></div><span className='coin-name-rght'>ETH</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-mid'>$<span className='coin-rate-span'>{ethhigh?.price}</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-status low-rate'><span className='coin-rate-percentage' style={ethhigh?.per > 0 ? { color: "green" } : { color: "red" }}>{ethhigh?.per}%</span></div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={0} className={classes.commonflexbox}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-img-name-dtl'><div><img src={coin3} alt='coins' /></div><span className='coin-name-rght'>XRP</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-mid'>$<span className='coin-rate-span'>{xrphigh?.price}</span></div>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <div className='coin-rate-status low-rate'><span className='coin-rate-percentage' style={xrphigh?.per > 0 ? { color: "green" } : { color: "red" }}>{xrphigh?.per}%</span></div>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>

                </Grid>
            </Box>


            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                    <BasicMarketTabs />
                </Grid>
            </Box>

        </div>
    )
}

export default MarketBody
