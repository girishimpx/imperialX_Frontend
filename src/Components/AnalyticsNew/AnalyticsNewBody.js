import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Consts from "../../Constansts";
import Typography from "@mui/material/Typography";
import LongShort from "./LongShort";
import analyticsicon from "../../images/analytics-icon.png";
import SpotAnalysis from "./SpotAnalysis";
import BTCBasis from "./BTCBasis";
import BTCFuture from "./BTCFuture";
import Axios from "../../Axios";

function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
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
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  sidebarcls: {
    background: "#010712 !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    overflow: "hidden",
    position: 'sticky !important',
        top: '0px',
        padding:'0px !important',
        height: '100vh'
  },
  headercls: {
    background: "#131a26 !important",
    borderRadius: "0px !important",
    height: "auto !important",
    boxShadow: "none !important",
    padding: "20px 55px !important",
    "& form": {
      padding: "0px !important",
      "@media (max-width: 767.98px)": {
        width: "100%",
      },
      "& button": {
        background: "#25DEB0",
        borderRadius: "0px 5px 5px 0px",
      },
    },
    "@media (max-width: 767.98px)": {
      padding: "20px !important",
    },
  },
});

const AnalyticsNewBody = () => {
  const classes = useStyles();

  const handleChange = (event) => {
    setselected(event.target.value);
  };

  const [masterList, setMAsterList] = useState();
  const [errhandling, seterrhandling] = useState();
  const [selected, setselected] = useState();
  const [singledata, setsingledata] = useState();
  const [allspot, setallspot] = useState(false);
  const [allmargin, setallmargin] = useState(false);
  const [allfuture, setallfuture] = useState(false);

  const getmasters = () => {
    // setMAsterList("")
    Axios.post(`${Consts.BackendUrl}/users/getMastersbyQuery`,{}, {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      },
    })
      .then((res) => {
        if (res?.data?.success) {
          let data = [];

          res?.data?.result.map((item) => {
            data.push(item.master);
          });

          if (data?.length > 0) {
            setMAsterList(data);
            setselected(data[0]?._id);
          }
        } else {
          seterrhandling(res?.data?.message);
        }
      })
      .catch((err) => {
        seterrhandling(err);
      });
  };

  const plottingfunction = (dates) => {
    let a = [];
    let b = [];
    
    for (let i = 0; i < dates.length; i++) {
     
      if (Number(dates[i].entry_price) != 0) {
        //console.log("1exitprice",i,Number(dates[i].exit_price))
const value =  Number(
  (
    ((Number(dates[i]?.exit_price) - Number(dates[i]?.entry_price)) /
      Math.abs(Number(dates[i]?.entry_price))) *
    100
  ).toFixed(4)
)
        const finalvalue = value/100
        console.log(value,",",finalvalue,"value")
        if(value < -10 || value > 10){
          a.push(finalvalue);
        }
        else{
          a.push(
            Number(
              (
                ((Number(dates[i]?.exit_price) - Number(dates[i]?.entry_price)) /
                  Math.abs(Number(dates[i]?.entry_price))) *
                100
              ).toFixed(4)
            )
          );
        }
        
        console.log("====",a)
        let data = dates[i]?.createdAt?.split("T")[0]?.split("-");
        b.push(`${data[2]}-${data[1]}-${data[0]}`);
      }
      else{
        //console.log("exitprice",i,Number(dates[i].exit_price))
        let value =   Number(
          (
            ((Number(dates[i]?.exit_price) - Number(dates[i]?.entry_price)) /1) *
            100
          ).toFixed(2)
        ) 
        
        const finalvalue = value/100
        console.log(value,",",finalvalue,"value")
        if(value < -10 || value > 10){
          a.push(finalvalue);
        }
        
        else{
          a.push(Number(
            (
              ((Number(dates[i]?.exit_price) - Number(dates[i]?.entry_price)) /1) *
              100
            ).toFixed(4)
          ));
        }
        
       // console.log("====",a)
        let data = dates[i]?.createdAt?.split("T")[0]?.split("-");
        b.push(`${data[2]}-${data[1]}-${data[0]}`);
      }
    }
    // console.log("====",[a,b])
    return [a, b];
  };

  useEffect(() => {
    getmasters();
  }, []);

  const get_a_Master_history = () => {
    setsingledata("");
    Axios.post(
      "trade/MasterAllTradeList",

      { id: selected },
      {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      }
    )
      .then((res) => {
        Object.entries(res.data.result)?.map((item, index) => {
          console.log(item[1]?.future?.length, "item");
          if (item[1]?.margin?.length > 0) {
            setallmargin(true);
          }
          if (item[1]?.spot?.length > 0) {
            setallspot(true);
          }
          if (item[1]?.future?.length > 0) {
          
            setallfuture(true);
          }
        });
        setsingledata(Object.entries(res.data.result));
      })
      .catch((err) => {
        setsingledata("") 
        setallmargin(!true)
        setallspot(!true)
        setallfuture(!true)
      });
  };

  console.log(singledata, "f", allfuture, "m", allmargin, "s", allspot);

  useEffect(() => {
    get_a_Master_history();
  }, [selected]);

  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="analytics-body">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.sidebarcls} id="id-analytics-top-bar">
              <div className="select-option-token">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Masters
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selected}
                      label="Master"
                      onChange={handleChange}
                    >
                      {masterList?.map((item, index) => {
                        return (
                          <MenuItem value={item._id}>{item.name}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </div>

              <div className="select-option-token-tabs">
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChangeTab}
                    aria-label="basic tabs example"
                  >
                    <Tab label="All" {...a11yProps(0)} />
                    <Tab label="Spot data" {...a11yProps(1)} />
                    <Tab label="Margin data" {...a11yProps(2)} />
                    <Tab label="Future data" {...a11yProps(3)} />
                  </Tabs>
                </Box>
              </div>
            </Item>
          </Grid>

          <Box sx={{ width: "100%" }}>
            <CustomTabPanel value={value} index={0}>
              {allspot || allfuture || allmargin ? (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                      <Item className={classes.headercls}></Item>
                    </Grid>
                  </Grid>

                  <Grid container spacing={0} className="sco-block">
                    {singledata &&
                      singledata?.map((item, index) => {
                        return (
                          <>
                            {item[1].spot.length > 0 && (
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={4}
                                xl={4}
                                key={index}
                              >
                                <Item
                                  className={classes.headercls}
                                  id="comon-id-style-1"
                                >
                                  <div className="analy-inner-block-head">
                                    <div className="analy-inner-block">
                                      <h5>
                                        {item[0] ? item[0] : "-"}
                                        <span className="Contracts comon-tab-division">
                                          Spot
                                        </span>
                                      </h5>
                                    </div>
                                    <div className="analyticsicon">
                                      <img
                                        src={analyticsicon}
                                        alt="analyticsicon"
                                      />
                                    </div>
                                  </div>
                                  <div className="tab-hours">
                                    <span className="duration-period active">
                                      5m
                                    </span>
                                    <span className="duration-period">1h</span>
                                    <span className="duration-period">1d</span>
                                  </div>
                                  <LongShort
                                    feedData={plottingfunction(item[1].spot)}
                                  />
                                </Item>
                              </Grid>
                            )}

                            {item[1].margin.length > 0 && (
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={4}
                                xl={4}
                                key={index}
                              >
                                <Item
                                  className={classes.headercls}
                                  id="comon-id-style-1"
                                >
                                  <div className="analy-inner-block-head">
                                    <div className="analy-inner-block">
                                      <h5>
                                        {item[0]}
                                        <span className="Contracts comon-tab-division">
                                          Margin
                                        </span>
                                      </h5>
                                    </div>
                                    <div className="analyticsicon">
                                      <img
                                        src={analyticsicon}
                                        alt="analyticsicon"
                                      />
                                    </div>
                                  </div>
                                  <div className="tab-hours">
                                    <span className="duration-period active">
                                      5m
                                    </span>
                                    <span className="duration-period">1h</span>
                                    <span className="duration-period">1d</span>
                                  </div>
                                  <LongShort
                                    feedData={plottingfunction(item[1].margin)}
                                  />
                                </Item>
                              </Grid>
                            )}

                            {item[1].future.length > 0 && (
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={4}
                                xl={4}
                                key={index}
                              >
                                <Item
                                  className={classes.headercls}
                                  id="comon-id-style-1"
                                >
                                  <div className="analy-inner-block-head">
                                    <div className="analy-inner-block">
                                      <h5>
                                        {item[0]}
                                        <span className="Contracts comon-tab-division">
                                          Futures
                                        </span>
                                      </h5>
                                    </div>
                                    <div className="analyticsicon">
                                      <img
                                        src={analyticsicon}
                                        alt="analyticsicon"
                                      />
                                    </div>
                                  </div>
                                  <div className="tab-hours">
                                    <span className="duration-period active">
                                      5m
                                    </span>
                                    <span className="duration-period">1h</span>
                                    <span className="duration-period">1d</span>
                                  </div>
                                  {console.log("Data",item[1].future)}
                                  <LongShort
                                    feedData={plottingfunction(item[1].future)}
                                  />
                                </Item>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                  </Grid>
                </Grid>
              ) : (
                <div className="DataNotFound">
                  <h3>Trade Not Found</h3>
                </div>
              )}
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              {allspot ? (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                      <Item className={classes.headercls}></Item>
                    </Grid>
                  </Grid>

                  <Grid container spacing={0} className="sco-block">
                    {singledata &&
                      singledata?.map((item, index) => {
                        return (
                          <>
                            {item[1].spot.length > 0 && (
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={4}
                                xl={4}
                                key={index}
                              >
                                <Item
                                  className={classes.headercls}
                                  id="comon-id-style-1"
                                >
                                  <div className="analy-inner-block-head">
                                    <div className="analy-inner-block">
                                      <h5>
                                        {item[0]}
                                        <span className="Contracts comon-tab-division">
                                          Spot
                                        </span>
                                      </h5>
                                    </div>
                                    <div className="analyticsicon">
                                      <img
                                        src={analyticsicon}
                                        alt="analyticsicon"
                                      />
                                    </div>
                                  </div>
                                  <div className="tab-hours">
                                    <span className="duration-period active">
                                      5m
                                    </span>
                                    <span className="duration-period">1h</span>
                                    <span className="duration-period">1d</span>
                                  </div>
                                  <LongShort
                                    feedData={plottingfunction(item[1].spot)}
                                  />
                                </Item>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                  </Grid>
                </Grid>
              ) : (
                <div className="DataNotFound">
                  <h3>Trade Not Found</h3>
                </div>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              {allmargin ? (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                      <Item className={classes.headercls}></Item>
                    </Grid>
                  </Grid>

                  <Grid container spacing={0} className="sco-block">
                    {singledata &&
                      singledata?.map((item, index) => {
                        return (
                          <>
                            {item[1].margin.length > 0 && (
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={4}
                                xl={4}
                                key={index}
                              >
                                <Item
                                  className={classes.headercls}
                                  id="comon-id-style-1"
                                >
                                  <div className="analy-inner-block-head">
                                    <div className="analy-inner-block">
                                      <h5>
                                        {item[0]}
                                        <span className="Contracts comon-tab-division">
                                          Margin
                                        </span>
                                      </h5>
                                    </div>
                                    <div className="analyticsicon">
                                      <img
                                        src={analyticsicon}
                                        alt="analyticsicon"
                                      />
                                    </div>
                                  </div>
                                  <div className="tab-hours">
                                    <span className="duration-period active">
                                      5m
                                    </span>
                                    <span className="duration-period">1h</span>
                                    <span className="duration-period">1d</span>
                                  </div>
                                  <LongShort
                                    feedData={plottingfunction(item[1].margin)}
                                  />
                                </Item>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                  </Grid>
                </Grid>
              ) : (
                <div className="DataNotFound">
                  <h3>Trade Not Found</h3>
                </div>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              {allfuture ? (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                      <Item className={classes.headercls}></Item>
                    </Grid>
                  </Grid>

                  <Grid container spacing={0} className="sco-block">
                    {singledata &&
                      singledata?.map((item, index) => {
                        return (
                          <>
                            {item[1].future.length > 0 && (
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={4}
                                xl={4}
                                key={index}
                              >
                                <Item
                                  className={classes.headercls}
                                  id="comon-id-style-1"
                                >
                                  <div className="analy-inner-block-head">
                                    <div className="analy-inner-block">
                                      <h5>
                                        {item[0]}
                                        <span className="Contracts comon-tab-division">
                                          Futures
                                        </span>
                                      </h5>
                                    </div>
                                    <div className="analyticsicon">
                                      <img
                                        src={analyticsicon}
                                        alt="analyticsicon"
                                      />
                                    </div>
                                  </div>
                                  <div className="tab-hours">
                                    <span className="duration-period active">
                                      5m
                                    </span>
                                    <span className="duration-period">1h</span>
                                    <span className="duration-period">1d</span>
                                  </div>

                                  <LongShort
                                    feedData={plottingfunction(item[1]?.future)}
                                  />
                                </Item>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                  </Grid>
                </Grid>
              ) : (
                <div className="DataNotFound">
                  <h3>Trade Not Found</h3>
                </div>
              )}
            </CustomTabPanel>
          </Box>
        </Grid>
      </Box>
    </div>
  );
};

export default AnalyticsNewBody;
