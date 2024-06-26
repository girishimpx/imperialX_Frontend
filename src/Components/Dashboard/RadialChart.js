import React, { Component, } from "react";
import ReactApexChart from "react-apexcharts";
import './RadialChart.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import coinstat1 from '../../images/coin-stat-1.png'
import coinstat2 from '../../images/coin-stat-2.png'
import coinstat3 from '../../images/coin-stat-3.png'
import coinstat4 from '../../images/coin-stat-4.png'
import ltcicon from '../../images/ltc.png'
import Etherium from '../../images/coin-2.png'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));





class RadialChart extends React.Component {
  constructor(props) {
    super(props);

    // var totalbal = this.props.totalBalance;

    this.state = {
      ws: "",
      btc: "",
      eth: "",
      xrp: "",
      dash: "",

      series: [80, 85, 70, 75],
      options: {
        chart: {
          type: 'radialBar',
          width: "100%",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 10,
              size: "30%",
            },
            track: {
              background: '#000'
            },
            dataLabels: {
              name: {
                fontSize: '22px',
              },
              value: {
                fontSize: '16px',
              },
              // total: {
              //   show: true,
              //   label: 'Total',
              //   formatter: function (w) {
              //     return 249
              //   }
              // }
            }
          }
        },
        labels: ['Bitcoin', 'Litecoin', 'Ripple', 'Dash'],
        colors: ['#25deb0', '#1a9d80', '#0c4842', '#0b3742'],
      },


    };
  }


  // const ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197");
  //   const datas = {
  //     op: "subscribe",
  //     args: [
  //       {
  //         channel: "index-tickers",
  //         instId: "BTC-USDT",
  //       },
  //       {
  //         channel: "index-tickers",
  //         instId: "ETH-USDT",
  //       },
  //       {
  //         channel: "index-tickers",
  //         instId: "XRP-USDT",
  //       },
  //       {
  //         channel: "index-tickers",
  //         instId: "DASH-USDT",
  //       },
  //     ],
  //   };

  //   const Ticker = () => {
  //     ws.onopen = (event) => {
  //       ws.send(JSON.stringify(datas));
  //     };


  //     ws.onmessage = (event) => {
  //       const  response = JSON.parse(event.data);
  //       try {
  //         if (response?.arg?.instId == "BTC-USDT"){
  //            setBtc(response?.data[0])
  //         }else if(response?.arg?.instId == "ETH-USDT"){
  //           setEth(response?.data[0])
  //         }else if(response?.arg?.instId == "XRP-USDT"){
  //           setxrp(response?.data[0])
  //         }else if(response?.arg?.instId == "DASH-USDT"){
  //           setdash(response?.data[0])
  //           console.log(response,"usemount")
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //   };





  componentWillMount() {
    this.state.ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/public?brokerId=197");
    const datas = {
      op: "subscribe",
      args: [
        {
          channel: "index-tickers",
          instId: "BTC-USDT",
        },
        {
          channel: "index-tickers",
          instId: "ETH-USDT",
        },
        {
          channel: "index-tickers",
          instId: "XRP-USDT",
        },
        {
          channel: "index-tickers",
          instId: "LTC-USDT",
        },
      ],
    };


    const Ticker = () => {
      this.state.ws.onopen = (event) => {
        this.state.ws.send(JSON.stringify(datas));
      };


      this.state.ws.onmessage = (event) => {
        const response = JSON.parse(event.data);
        try {
          if (response?.arg?.instId == "BTC-USDT") {
            this.setState({ btc: response?.data[0] })
          } else if (response?.arg?.instId == "ETH-USDT") {
            this.setState({ eth: response?.data[0] })
          } else if (response?.arg?.instId == "XRP-USDT") {
            this.setState({ xrp: response?.data[0] })
          } else if (response?.arg?.instId == "DASH-USDT") {
            this.setState({ dash: response?.data[0] })
          }
        } catch (err) {
          console.log(err);
        }
      };
    };

    Ticker();



    return () => {
      this.state.ws.close(); // Close the WebSocket connection on unmount
    };
  }








  render() {




    return (


      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" style={{ width: '100%' }} />
        <div className="total-balance-radial"><label>Total Balance :</label> <span>${this.props.totalBalance ? this.props.totalBalance.toFixed(7) : 0}</span></div>

        <Grid container spacing={0}>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='coin-block-outer'>
            <Item className='coin-block'>
              {/* <div className="coin-img-caption"><div className="coin-inner-imaage"><img src={coinstat1} alt="Bitcoin" /><span>Bitcoin</span></div><div className="coin-value"><span className="coin-rate">{`${this.state.btc ? Number(this.state?.btc?.open24h).toFixed(3).toLocaleString() : '0'  } ${this.state?.btc ? this.state?.btc.instId.split('-')[0] : "BTC"}`}</span><span className="coin-price">{`${this.state.btc ? Number(this.state?.btc?.idxPx).toFixed(3).toLocaleString() : '0'  } USDT`}</span></div></div> */}
              <div className="coin-img-caption"><div className="coin-inner-imaage"><img src={coinstat1} alt="Bitcoin" /><span>Bitcoin</span></div><div className="coin-value"><span className="coin-rate">{`${this.props.btc ? Number(this.props?.btc).toFixed(4).toLocaleString() : '0'}`}</span><span className="coin-price">{`${this.props.btc ? Number(this.props?.btc).toFixed(4).toLocaleString() : '0'} USDT`}</span></div></div>
            </Item>
          </Grid>

        </Grid>

        <Grid container spacing={0}>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='coin-block-outer'>
            <Item className='coin-block'>
              {/* <div className="coin-img-caption"><div className="coin-inner-imaage"><img src={Etherium} alt="Litecoin" /><span>Etherium</span></div><div className="coin-value"><span className="coin-rate">{`${this.state.eth ? Number(this.state?.eth?.open24h).toFixed(3).toLocaleString() : '0'  } ${this.state?.eth ? this.state?.eth.instId.split('-')[0] : "ETH"}`}</span><span className="coin-price">{`${this.state.eth ? Number(this.state?.eth?.idxPx).toFixed(3).toLocaleString() : '0'  } USDT`}</span></div></div> */}
              <div className="coin-img-caption"><div className="coin-inner-imaage"><img src={Etherium} alt="Litecoin" /><span>Ethereum</span></div><div className="coin-value"><span className="coin-rate">{`${this.props.eth ? Number(this.props?.eth).toFixed(3).toLocaleString() : '0'} `}</span><span className="coin-price">{`${this.props.eth ? Number(this.props?.eth).toFixed(3).toLocaleString() : '0'} USDT`}</span></div></div>
            </Item>
          </Grid>

        </Grid>

        <Grid container spacing={0}>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='coin-block-outer'>
            <Item className='coin-block'>
              {/* <div className="coin-img-caption"><div className="coin-inner-imaage"><img src={coinstat3} alt="Ripple" /><span>Ripple</span></div><div className="coin-value"><span className="coin-rate">{`${this.state.xrp ? Number(this.state?.xrp?.open24h).toFixed(3).toLocaleString() : '0'  } ${this.state?.xrp ? this.state?.xrp.instId.split('-')[0] : "XRP"}`}</span><span className="coin-price">{`${this.state.xrp ? Number(this.state?.xrp?.idxPx).toFixed(3).toLocaleString() : '0'  } USDT`}</span></div></div> */}
              <div className="coin-img-caption"><div className="coin-inner-imaage"><img src={coinstat3} alt="Ripple" /><span>Ripple</span></div><div className="coin-value"><span className="coin-rate">{`${this.props.xrp ? Number(this.props?.xrp).toFixed(3).toLocaleString() : '0'}`}</span><span className="coin-price">{`${this.props.xrp ? Number(this.props?.xrp).toFixed(3).toLocaleString() : '0'} USDT`}</span></div></div>
            </Item>
          </Grid>

        </Grid>

        <Grid container spacing={0}>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='coin-block-outer'>
            <Item className='coin-block'>
              {/* <div className="coin-img-caption"><div className="coin-inner-imaage"><img src={coinstat4} alt="Dash" /><span>Dash</span></div><div className="coin-value"><span className="coin-rate">{`${this.state.dash ? Number(this.state?.dash?.open24h).toFixed(3).toLocaleString() : '0'  } ${this.state?.dash ? this.state?.dash.instId.split('-')[0] : "DASH"}`}</span><span className="coin-price">{`${this.state.dash ? Number(this.state?.dash?.idxPx).toFixed(3).toLocaleString() : '0'  } USDT`}</span></div></div> */}
              <div className="coin-img-caption"><div className="coin-inner-imaage"><img src={ltcicon} alt="LTC" /><span>LTC</span></div><div className="coin-value"><span className="coin-rate">{`${this.props.ltc ? Number(this.props?.ltc).toFixed(3).toLocaleString() : '0'} `}</span><span className="coin-price">{`${this.props.ltc ? Number(this.props?.ltc).toFixed(3).toLocaleString() : '0'} USDT`}</span></div></div>
            </Item>
          </Grid>

        </Grid>

      </div>


    );
  }
}

export default RadialChart;