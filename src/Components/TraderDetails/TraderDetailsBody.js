import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import './TraderDetails.css'
import Consts from "../../Constansts";
import Axios from "../../Axios";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import TradingProfileDetails from './TradingProfileDetails';
import SideBarRating from './SideBarRating';
import TradingScore from './TradingScore';
import OpenPosition from './OpenPosition';
import TradingPair from './TradingPair';
import ProfitChart from './ProfitChart';
import StrategyHistroy from './StrategyHistroy';


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
  traderlefttop: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
  },
  traderrighttop
    : {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
  },
  traderleftbottom: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
  },
  traderrightbottom: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
  },
  strategyinner: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
  }
});



const TraderDetailsBody = ({ sideBarShow, setSideBarShow }) => {

  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [master, setMaster] = React.useState();
  const [israted, setIsrated] = React.useState(false);
  const [followerCount, setfollowerCount] = React.useState();
  const [errhndle, seterrhndle] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const params = useParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getMaster();
  }, []);
  const handleMaster = async () => {
    getMaster()
    console.log("hello")
  }
  const getMaster = async () => {
    try {
      await Axios.get(
        `${Consts.BackendUrl}/users/get_mastertrader_by_id/${params.id}`,
        {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          },
        }
      )
        .then((res) => {
          if (res?.status === 200) {
            Axios.post(
              `${Consts.BackendUrl}/trade/followerCount`,
              { id: params.id },
              {
                headers: {
                  Authorization: localStorage.getItem("Mellifluous"),
                },
              }
            )
              .then((count) => setfollowerCount(count.data.result))
              .catch((err) => seterrhndle(err));

            setMaster(res?.data?.result);
            setIsrated(res?.data?.isRated)
            setLoading(false);
          }

          setLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className='trader-details-page'>

      <Box sx={{ flexGrow: 1 }}>

        <h3 className='Trader-Details-heading'>Trader Details</h3>

        <TradingProfileDetails
          sideBarShow={sideBarShow}
          setSideBarShow={setSideBarShow}
        />

        <Grid container spacing={0}>


          <Grid item xs={12} sm={12} md={12} lg={9} xl={8}>
            <Box sx={{ flexGrow: 1 }}>
              <TradingScore
                handleMaster={handleMaster}
                master={master}
                israted={israted}
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
              />
              <ProfitChart
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
              />
              <OpenPosition
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
              />
              {/* <TradingPair
         sideBarShow={sideBarShow}
         setSideBarShow={setSideBarShow}
        /> */}
              <StrategyHistroy
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
              />
              {/* <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={8} lg={12} xl={12}>
            <Item className={classes.strategyinner}>
              <div className="StrategyHistory-contain">
                <h4 className="strat">Strategy history</h4>
                <div className="whole-rate ending">
                  <div className="rate">
                    <label>Margin Changes</label>
                    <label>Liquidations</label>
                    <label>Cash Flow</label>
                  </div>
                </div>

                <div className="strategy-rate first">
                  <div className="sub">
                    ETH - USDT<br></br>
                    Isolated, Hedge
                  </div>
                  <div className="sub">
                    Side<br></br>
                    <span>LONG</span>
                  </div>
                  <div className="sub">
                    Type<br></br>
                    Close
                  </div>
                  <div className="sub">
                    Leverage<br></br>x3
                  </div>
                </div>
                <div className="strategy-rate second">
                  <div className="sub">
                    %<br></br>100.00%
                  </div>
                  <div className="sub">
                    Price<br></br>1'888.00000000
                  </div>
                  <div className="sub">
                    Executed<br></br>28 Apr 2023 <br></br>22:22:50
                  </div>
                </div>

                <div className="strategy-rate">
                  <div className="sub">
                    ETH - USDT<br></br>
                    Isolated, Hedge
                  </div>
                  <div className="sub">
                    Side<br></br>
                    <span>LONG</span>
                  </div>
                  <div className="sub">
                    Type<br></br>
                    Close
                  </div>
                  <div className="sub">
                    Leverage<br></br>x3
                  </div>
                </div>
                <div className="strategy-rate">
                  <div className="sub">
                    %<br></br>100.00%
                  </div>
                  <div className="sub">
                    Price<br></br>1'888.00000000
                  </div>
                  <div className="sub">
                    Executed<br></br>28 Apr 2023 <br></br>22:22:50
                  </div>
                </div>
              </div>
            </Item>
          </Grid>
        </Grid> */}
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={3} xl={4}>
            <SideBarRating
              sideBarShow={sideBarShow}
              setSideBarShow={setSideBarShow}
            />
            <TradingPair
              sideBarShow={sideBarShow}
              setSideBarShow={setSideBarShow}
            />
          </Grid>


        </Grid>

      </Box>

    </div>
  )
}

export default TraderDetailsBody
