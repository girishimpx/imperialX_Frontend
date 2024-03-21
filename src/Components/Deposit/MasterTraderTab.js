import * as React from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import circledoublecolor from "../../images/circle-double-color.png";
import graphcopytrade from "../../images/graph-copy-trade.png";
import tetherseeklogo from "../../images/tether-seeklogo.png";
import AllMasterTrade from "./AllMasterTrade";
import "./masterTrade.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  copytradetabsinner: {
    "& button": {
      textTransform: "capitalize !important",
      color: "#fff !important",
      fontWeight: 600,
      fontSize: "20px !important",
    },
  },
  copytradesearch: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "10px",
    "& button": {
      height: "44px",
      textTransform: "capitalize !important",
      backgroundColor: "#25DEB0 !important",
    },
  },
});

function createData(Chain, Address, Ccy) {
  return { Chain, Address, Ccy };
}

export default function MasterTraderTab() {
  const classes = useStyles();
  const history = useLocation();
  const [zero, setzero] = React.useState(false);
  const [one, setone] = React.useState(false);
  let rows = [];
  React.useEffect(() => {
    rows = [];
  }, []);

  history?.state.mugavari.map((item, index) => {
    if (rows.length < 2) {
      if (item.ccy == "USDT") {
        if (
          item.chain.split("-")[1] == "ERC20" ||
          item.chain.split("-")[1] == "TRC20"
        ) {
          rows.push(createData(item.chain, item.addr, item.ccy));
        }
      } else if (item.ccy == "BTC") {
        rows.push(createData(item.chain, item.addr, item.ccy));
      } else {
        if (item.chain.split("-")[1] != "OKTC") {
          rows.push(createData(item.chain, item.addr, item.ccy));
        }
      }
    }
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid
              id="danso"
              style={{ justifyContent: "center" }}
              container
              spacing={0}
              className="copytrade-contain-tab-content"
            >
              <TabPanel value={value} index={0}>
                <Grid
                  container
                  spacing={0}
                  className="copytrade-contain-inner"
                  style={{
                    display: "flex !important",
                    justifyContent: "center !important",
                  }}
                >
                  {history?.state?.mugavari && rows.length > 0 && (
                    <>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={`${rows.length > 1 ? 6 : 12}`}
                        lg={`${rows.length > 1 ? 6 : 12}`}
                        xl={`${rows.length > 1 ? 6 : 12}`}
                        className={classes.copytradeblock}
                      >
                        <div className="outer-copy-trade">
                          <Button
                            style={{ padding: "5px 25px", color: "black" }}
                            className="LocalFireDepartmentIcon-full boxButton"
                            variant="outlined"
                            onClick={() => {
                              setzero(!zero);
                              setone(false);
                            }}
                            startIcon={<LocalFireDepartmentIcon />}
                          >
                            {rows[0].Chain}
                          </Button>
                          <div className="copy-trade-row-1"></div>
                          <div className="copy-trade-row-2"></div>
                           
                            <div>
                              <div style={{ textAlign: "left" }}>
                                <div>
                                  <label>Chain : </label>
                                  <span>{rows[0].Chain}</span>
                                </div>
                                <div
                                  style={{ overflow: "clip", width: "115%" }}
                                >
                                  <span>Addr : {rows[0].Address}</span>
                                </div>
                                <div>
                                  <label>Ccy : </label>
                                  <span className="yellow">{rows[0].Ccy}</span>
                                </div>
                              </div>
                            </div>
                          
                        </div>
                      </Grid>

                      {rows.length > 1 && (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={6}
                          lg={6}
                          xl={6}
                          className={classes.copytradeblock}
                        >
                          <div className="outer-copy-trade">
                            <Button
                              onClick={() => {
                                setzero(false);
                                setone(!one);
                              }}
                              style={{ padding: "5px 25px", color: "black" }}
                              className="LocalFireDepartmentIcon-full boxButton"
                              variant="outlined"
                              startIcon={<LocalFireDepartmentIcon />}
                            >
                              {rows[1].Chain}
                            </Button>
                            <div className="copy-trade-row-1"></div>
                            <div className="copy-trade-row-2"></div>
                            
                              <div>
                                <div style={{ textAlign: "left" }}>
                                  <div>
                                    <label>Chain : </label>
                                    <span>{rows[1].Chain}</span>
                                  </div>
                                  <div
                                    style={{ overflow: "clip", width: "115%" }}
                                  >
                                    <span>Addr : {rows[1].Address}</span>
                                  </div>
                                  <div>
                                    <label>Ccy : </label>
                                    <span className="yellow">
                                      {rows[1].Ccy}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            
                          </div>
                        </Grid>
                      )}
                    </>
                  )}
                </Grid>
              </TabPanel>

              <TabPanel
                value={value}
                index={1}
                className="all-master-trade-table"
              >
                <AllMasterTrade />
              </TabPanel>

              {!history?.state?.mugavari && (
                <div
                  style={{
                    background:
                      "radial-gradient(35.18% 134.17% at 50% 50%, rgba(41, 197, 161, 0.2) 0%, rgba(28, 112, 99, 0.2) 100%)",
                    border: "0.938201px solid #25DEB0",
                    width: "100%",
                    webkitBackdropFilter: "blur(1.8764px)",
                    backdroFilter: "blur(1.8764px)",
                    borderRadius: "28.146px",
                    padding: "35px",
                  }}
                >
                  <p>Data Not Found</p>
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
