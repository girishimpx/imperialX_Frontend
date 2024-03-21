import React from "react";
import "./ProfitChart.css";
import { styled } from "@mui/material/styles";
import ProfitGraph from "./ProfitGraph";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import leaf from "../../images/leaf.svg";
import miniGraph from "../../images/min-graph.svg";
import lock from "../../images/lock.svg";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({

    profitChartcontain: {
        borderRadius: '19.178px',
    border: '0.639px solid var(--01, #25deb0)',
    background: 'radial-gradient( 138.71% 122.96% at 50% 50%, rgba(41, 197, 161, 0.2) 0%, rgba(28, 112, 99, 0.2) 100% )',
    backdropFilter: 'blur(1.2785571813583374px)',
    padding: '35px 25px',
    margin: '8px',
    '@media (min-width:502px) and (max-width:900px)' : {
      padding: '35px !important',
    },
    '@media (max-width:500px)' : {
      padding: '20px !important',
    },
    },
    transparentbggraph: {
        background: 'transparent !important',
        boxShadow: 'none !important'
    }

});

const ProfitChart = ({sideBarShow,setSideBarShow}) => {
  const classes = useStyles();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} className={classes.profitChartcontain}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.transparentbggraph}>
              <div className="ProfitChart-contain-inner">
                <div className="profit-head">
                  <h4>Profit Chart</h4>
                  <p>Сumulative view</p>
                </div>
                <div className="inputFields">
                  <div className="text-field">
                    <TextField className="chart-text" />
                    <div className="inputImg">
                      <img src={leaf} alt="ratingleaf" />
                    </div>
                  </div>
                  <div className="btns-graph">
                    <Button variant="text" className="graphbtn">
                      <img src={miniGraph} alt="miniGraph" />
                    </Button>
                    <Button variant="text" className="lockbtn">
                      <img src={lock} alt="lock" />
                    </Button>
                  </div>
                </div>
              </div>
            </Item>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.transparentbggraph}>
            <ProfitGraph />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ProfitChart;
