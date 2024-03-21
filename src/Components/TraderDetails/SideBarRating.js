import React from "react";
import "./SideBarRating.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({

  siderightbottombar: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow:'none !important',
  }

});

const SideBarRating = ({sideBarShow,setSideBarShow}) => {
  const classes = useStyles();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
            <Item className={classes.siderightbottombar}>
              <div className="Rating-contain">
                <div className="whole-rate">
                  <div className="rate d-roi-rate">
                    <p>+62.65%</p>
                    <div className="rate-cont">30D ROI</div>
                  </div>
                  <hr className="line rate" width="1" size="60" />
                  <div className="rate Master-PnL-rate">
                    <p>+1,096.49</p>
                    <div className="rate-cont">Master's PnL</div>
                  </div>
                </div>
                <div className="whole-rate">
                  <div className="rate-cont">Account Assets</div>
                  <p className="spec-clr">5,905.2</p>
                </div>
                <div className="whole-rate">
                  <div className="rate-cont">Copier Profit</div>
                  <p>+6,5333.25</p>
                </div>
                <div className="whole-rate">
                  <div className="rate-cont">Copiers</div>
                  <p>368</p>
                </div>
                <div className="whole-rate ending">
                  <div className="rate-cont">Risk</div>
                  <p className="bg-rate">3</p>
                </div>
                <div className="whole-rate top">
                  <div className="rate-cont">Cumulative Copiers</div>
                  <p className="spec-clr">1259</p>
                </div>
                <div className="whole-rate">
                  <div className="rate-cont">Win Ratio</div>
                  <p className="spec-clr">100%</p>
                </div>
                <div className="whole-rate">
                  <div className="rate-cont">Total Transactions</div>
                  <p className="spec-clr">530</p>
                </div>
                <div className="whole-rate">
                  <div className="rate-cont">No. of Winning Trades</div>
                  <p className="spec-clr">530</p>
                </div>
                <div className="whole-rate">
                  <div className="rate-cont">No. of Losing Trades </div>
                  <p className="spec-clr">- -</p>
                </div>
                <div className="whole-rate">
                  <div className="rate-cont">Average profit </div>
                  <p className="spec-clr">4.4 (21.9%)</p>
                </div>
                <div className="whole-rate">
                  <div className="rate-cont">Average losses</div>
                  <p className="spec-clr">0.00 (0.00%)</p>
                </div>
                <div className="whole-rate">
                  <div className="rate-cont">PnL Ratio</div>
                  <p className="spec-clr">- -</p>
                </div>
                <div className="whole-rate">
                  <div className="rate-cont">Average Holding time</div>
                  <p className="spec-clr">7.55H</p>
                </div>
                <div className="whole-rate">
                  <div className="rate-cont">Trading Frequency (Weekly)</div>
                  <p className="spec-clr">58.8 times</p>
                </div>
                <div className="whole-rate">
                  <div className="rate-cont">Trade Days</div>
                  <p className="spec-clr">60D</p>
                </div>
                <div className="whole-rate">
                  <div className="rate-cont">Last Trading Time</div>
                  <p className="spec-clr">2023-05-12 08:05</p>
                </div>
                <div className="rate-cont final">Current Unit : USDT</div>
              </div>
            </Item>
      </Box>
    </div>
  );
};

export default SideBarRating;
