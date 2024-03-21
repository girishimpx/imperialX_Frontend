import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Axios from "../../Axios";
import Consts from "../../Constansts";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Vector from "../../images/Vector.png"
import Vectorone from "../../images/Vector_1.png"
import Vectortwo from "../../images/Vector_2.png"
import vectorBottom from "../../images/bottomdot.png"
import VectorTop from "../../images/topdot.png"
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import inviteslash from '../../images/invite-slash.png'
import inviteleft from '../../images/invite-left.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';
import Constant from "../../Constansts";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

import './Mysubscription'

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
  backItem: {
    marginBottom: '30px !important',
    textAlign: 'left',
  },
  invitefriendsleft: {
    padding: '24px 44px',
    backgroundImage: `url(${inviteleft})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '30px',
    // background: 'rgba(217, 217, 217, 0.1)',
    // borderRadius: '30px',
    // filter: 'blur(0.5px)',
    '& h1': {
      fontSize: '48px',
      color: '#fff',
      textAlign: 'left'
    },
    '& h5': {
      fontSize: '20px',
      color: '#fff',
      textAlign: 'left',
      marginBottom: '10px'
    },
    '& p': {
      color: '#ADB1B8',
      fontSize: '18px',
      lineHeight: '30px',
      textAlign: 'left',
      marginTop: '10px'
    },
    '& span': {
      fontSize: '12px',
      color: '#fff',
      textAlign: 'left',
      fontWeight:200,
      marginBottom: '10px'
    },
    "@media (max-width: 767.98px)": {
      padding: "15px !important",
    }
  },
  invitefriendsoutercontainer: {

    background: 'radial-gradient(35.18% 134.17% at 50% 50%, rgba(41, 197, 161, 0.2) 0%, rgba(28, 112, 99, 0.2) 100%)',
    border: '1px solid #25DEB0',
    backdropFilter: 'blur(2px)',
    borderRadius: '30px',
    position: 'relative',
    overflow: 'hidden'
  },
  invitefriendsouter: {
    padding: '30px 40px',
    "@media (max-width: 767.98px)": {
      padding: "15px !important",
    },
  },
  griditems: {
    padding: '0px 10px'
  },
  fcommonclscommsntiers: {
    height: '95%',
    background: 'black',
    border: '1px solid #000',
    backdropFilter: 'blur(2px)',
    borderRadius: '20px',
    padding: '40px 30px',
    margin: '40px 0 !important',
    position: 'relative !important',
    "& button": {
      marginTop: '20px',
      fontSize: '14px',
      color: 'white',
      textTransform: 'capitalize',
      border: '1px solid white !important',
      padding: '10px 15px',
    }
  },
  innerdivision: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '50%',
  },
  lcommonclscommsntiers: {
    height: '95%',
    background: '#D9D9D91A',
    border: '1px solid #D9D9D91A',
    backdropFilter: 'blur(2px)',
    borderRadius: '20px',
    padding: '40px 30px',
    margin: '40px 0 !important',
    position: 'relative !important',
    "& button": {
      marginTop: '20px',
      fontSize: '14px',
      color: '#fff',
      textTransform: 'capitalize',
      border: '1px solid #25DEB0 !important',
      padding: '10px 15px',
    }

  },
  prcommonclscommsntiers: {
    height: '95%',
    background: 'radial-gradient(35.18% 134.17% at 50% 50%, rgba(41, 197, 161, 0.2) 0%, rgba(28, 112, 99, 0.2) 100%)',
    //border: '1px solid #25DEB0',
    backdropFilter: 'blur(2px)',
    borderRadius: '20px',
    padding: '40px 30px',
    margin: '40px 0 !important',
    position: 'relative !important',
    "& button": {
      marginTop: '20px',
      fontSize: '14px',
      color: '#fff',
      textTransform: 'capitalize',
      border: '1px solid #25DEB0 !important',
      padding: '10px 15px',
    }

  },
  pcommonclscommsntiers: {
    height: '95%',
    background: 'radial-gradient(35.18% 134.17% at 50% 50%, rgba(41, 197, 161, 0.2) 0%, rgba(28, 112, 99, 0.2) 100%)',
    border: '1px solid #25DEB0',
    backdropFilter: 'blur(2px)',
    borderRadius: '20px',
    padding: '40px 30px',
    margin: '40px 0 !important',
    position: 'relative !important',
    "& button": {
      marginTop: '20px',
      fontSize: '14px',
      borderRadius: '50px !important',
      color: '#fff',
      textTransform: 'capitalize',
      border: '1px solid #25DEB0 !important',
      padding: '10px 20px',
    }

  },
  vectorone: {
    position: 'absolute',
    bottom: '8%',
    left: '10%'
  },
  vectorbottom: {
    position: 'absolute',
    bottom: '15%',
    right: '4%'
  },
  vectortwo: {
    position: 'absolute',
    top: '3%',
    left: '3%'
  },
  vectortop: {
    position: 'absolute',
    top: '6%',
    right: '10%'
  },
  vectorthree: {
    position: 'absolute',
    top: '30%',
    right: '3%'
  },
  heading: {
    textAlign: 'left',
    "& h4": {
      color: 'white',
      lineHeight: '35px',
    },
    "& h6": {
      color: 'white',
      lineHeight: '35px',
    },
    "& svg": {
      width: '19px',
      height: '19px',
      margin: '-4px 3px',
      color: '#25DEB0',
    },
    "& p": {
      fontSize: '12px !important',
      color: 'white',
      lineHeight: '22px',
    },
  },
  price: {
    color: 'white !important',
    display: 'flex',
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'center',
    "& p": {
      marginLeft: '10px !important',
      fontSize: '11px !important',
      color: 'white',
      lineHeight: '18px !important',
    },
  },
  limit: {
    marginTop: '-10px',
    textAlign: 'left',
    "& h6": {
      color: 'white',
      lineHeight: '35px',
    },
    "& svg": {
      width: '19px',
      height: '19px',
      margin: '-4px 3px',
      color: '#25DEB0',
    },
    "& p": {
      fontSize: '12px !important',
      color: 'white',
      marginTop: "2px",
    },
  },
  features: {
    textAlign: 'left',
    marginTop: '10px',
    "& h6": {
      color: 'white',
      lineHeight: '35px',
    },
    "& svg": {
      width: '19px',
      height: '19px',
      margin: '-4px 3px',
      color: '#25DEB0',
    },
    "& p": {
      fontSize: '12px !important',
      color: 'white',
      marginTop: "2px",
    },
  },
  tabpanel: {
    "& .css-19kzrtu": {
      padding: "0px !important",
    }
  },
  plan: {
    textAlign: 'center'
  },
});

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MysubscribtionBody = () => {

  const classes = useStyles();
  const [user, setUser] = React.useState([]);
  const [value, setValue] = React.useState(0)
  const [loading, setLoading] = React.useState(true);
  const [plan,setPlan] = React.useState(false);
  const [kycsubmit, setkycsubmit] = React.useState(false);
    const navigate = useNavigate()
  useEffect(() => {
    getPlans()
  }, [])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getPlans = async () => {
    try {
      await Axios.get(`${Consts.BackendUrl}/users/getplan`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      }).then((res) => {
        if (res?.status === 200) {

          console.log(res?.data?.result[0]);
          setUser(res?.data?.result[0])
          setLoading(false);

        }
        console.log(res?.data?.result[0])
        setLoading(false);
      })
    } catch (error) {
      setLoading(false);
    }

  }
  const addPlan = async (users) => {
    console.log(users)
    const data = {
      plan_name: users.plan_name,
      plan_type: "Month"
    };

    Axios.post(`${Consts.BackendUrl}/users/addplan`, data, {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      },
    })
      .then((res) => {
        if (res.data.success) {
          toast.success(`${res.data.message}`, {
            duration: 1400,
            position: "top-center",

            // Styling
            style: {
              padding: "1rem",
              fontSize: "15px",
              color: "green",
              fontWeight: "bold",
            },
            className: "",

            // Custom Icon
            icon: "👏",

            // Change colors of success/error/loading icon
            iconTheme: {
              primary: "#000",
              secondary: "#fff",
            },

            // Aria
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          });

        } else {
          toast.error(`${res.data.message}`, {
            duration: 3000,
            position: "top-center",

            // Styling
            style: {
              padding: "1rem",
              fontSize: "15px",
              color: "red",
              fontWeight: "bold",
            },
            className: "",

            // Custom Icon
            icon: "",

            // Change colors of success/error/loading icon
            iconTheme: {
              primary: "#000",
              secondary: "#fff",
            },

            // Aria
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          });

        }
      })
      .catch((err) => {
        console.log(err)
      });
  }
  const addPlans = async (users, year) => {
    console.log(users, year)
    if (!plan && !kycsubmit) {
      toast.error(`Please submit kyc`, {
        duration: 1900,
        position: "top-center",

        // Styling
        style: {
          backgroundColor: "#fc1922",
          padding: "1rem",
          fontSize: "15px",
          color: "white",
          fontWeight: "bold",
        },
        className: "",

        // Custom Icon
        icon: "",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });

      setTimeout(() => {
        navigate("/kycj-verification");
      }, 1600);
    }else if(!plan && kycsubmit){
      toast.error(`Your KYC submission is under verification`, {
        duration: 4000,
        position: "top-center",

        // Styling
        style: {
          backgroundColor: "#fc1922",
          padding: "1rem",
          fontSize: "15px",
          color: "white",
          fontWeight: "bold",
        },
        className: "",

        // Custom Icon
        icon: "",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }else{
      const data = {
        plan_name: users.plan_name,
        plan_type: year
      };
  
      Axios.post(`${Consts.BackendUrl}/users/addplan`, data, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          if (res.data.success === true) {
            toast.success(`${res.data.message}`, {
              duration: 1400,
              position: "top-center",
  
              // Styling
              style: {
                padding: "1rem",
                fontSize: "15px",
                color: "green",
                fontWeight: "bold",
              },
              className: "",
  
              // Custom Icon
              icon: "👏",
  
              // Change colors of success/error/loading icon
              iconTheme: {
                primary: "#000",
                secondary: "#fff",
              },
  
              // Aria
              ariaProps: {
                role: "status",
                "aria-live": "polite",
              },
            });
            setTimeout(() => {
              navigate(`${Constant.route}/Subscription`);
            }, 2000);
           
           
          } else {
            toast.error(`${res.data.message}`, {
              duration: 3000,
              position: "top-center",
  
              // Styling
              style: {
                padding: "1rem",
                fontSize: "15px",
                color: "red",
                fontWeight: "bold",
              },
              className: "",
  
              // Custom Icon
              icon: "",
  
              // Change colors of success/error/loading icon
              iconTheme: {
                primary: "#000",
                secondary: "#fff",
              },
  
              // Aria
              ariaProps: {
                role: "status",
                "aria-live": "polite",
              },
            });
  
          }
        })
        .catch((err) => {
          console.log(err)
          toast.error(`${err.response.data.message}`, {
            duration: 3000,
            position: "top-center",
  
            // Styling
            style: {
              padding: "1rem",
              fontSize: "15px",
              color: "red",
              fontWeight: "bold",
            },
            className: "",
  
            // Custom Icon
            icon: "",
  
            // Change colors of success/error/loading icon
            iconTheme: {
              primary: "#000",
              secondary: "#fff",
            },
  
            // Aria
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          });
        });

    }
   
  }

  useEffect(() => {
    try {
      Axios.get(`${Consts.BackendUrl}/users/kycsybmit`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          setkycsubmit(true);
        })
        .catch((err) => {
          setkycsubmit(false);
        });

      Axios.get(`${Consts.BackendUrl}/users/kycVerify`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          setPlan(true);
        })
        .catch((err) => console.log(err.response));
    } catch (error) {
      console.log("🚀 ~ file: MasterTraderTab.js:248 ~ useEffect ~ error:", error)

    }

  }, []);

  const buttonSelction = (users,type) =>{
   console.log(user,"users")
    return(<>
      {user?.isActivate ? <>{
        user?.planMode === type && user?.planType === users.plan_name ? <Button variant="outlined">Current Plan</Button> : <></>
      }
        
          </>:
            <Button variant="outlined" onClick={() => addPlans(users,type)}>Select Plan</Button>}
      </>
    )
  }
  return (
    <div className='referrals-body-content'>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3} className={classes.backItem}>
            <Button
              className="back-icon-page"
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                navigate(`${Constant.route}/`);
              }}
            >
              Back
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={0}>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

            <Grid container spacing={0} className={classes.invitefriendsoutercontainer}>
              <Grid item xs={12} sm={12} md={12} lg={8} xl={8} className={classes.invitefriendsouter}>
                <div className={classes.invitefriendsleft}>
                  <p>Current Plan </p>
                  {user?.isActivate ? <h1>{user?.planType} <span>({user?.planMode})</span></h1> : <h1>Select Plan</h1>}
                 
      
                  <div id='buttons'><Button variant="outlined">Payment History</Button></div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4} id="invitefriendsright">
                <div className='inviteslash'><img src={inviteslash} /></div>
                <div className='referal-code-link-outer'>
                  <h5>FAQ on Plans</h5>
                  <p>Got any questions about Coinmatics plans? Find answers in our FAQ section.</p>
                  <div id='readbuttons'><Button variant="outlined" endIcon={<ArrowForwardIcon />}>Read Faq</Button></div>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={0} className='commission-tiers-section'>
              <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className={classes.griditems} >
                <h2>Plans</h2>
              </Grid>
            </Grid>

            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='rms'>
              <Tab label="Monthly" {...a11yProps(0)} />
              <Tab label="Yearly" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0} className={classes.tabpanel} style={{ "padding": "0px" }}>
              <Grid container spacing={0} className='commission-tiers-section'>
                {user.plans &&
                  user.plans?.map((users, index) => (
                    <> {users.plan_name === "Free" ?
                      <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className={classes.griditems} >
                        <div className={classes.fcommonclscommsntiers}>
                          <div className={classes.innerdivision}>
                            <div className={classes.heading}>
                              <h4>

                                {users.plan_name}
                              </h4>
                              <Grid container className={classes.price}>
                                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                  <h1>{users.per_month}</h1>
                                </Grid>
                                <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                                  <p>USD<br></br>per Month</p>
                                </Grid>
                              </Grid>
                              <p>{users.per_year} USD per year</p>
                            </div>
                            <div className={classes.limit}>
                              <h6>
                                Limit <HelpOutlineOutlinedIcon />
                              </h6>
                              {users.limit &&
                                users.limit?.map((limit, index) => (<p>{limit}</p>))}

                            </div>
                          </div>
                          <div className={classes.innerdivision}>
                            <div className={classes.features}>
                              <h6>
                                Feature
                              </h6>
                              {users.features &&
                                users.features?.map((features, index) => (<p>{features}</p>))}

                            </div>
                            <div className={classes.plan}>
                            {buttonSelction(users, "Month")}
                              {/* {user.isActivate ? <></> : <Button variant="outlined" >Current Plan</Button>} */}
                            </div>
                          </div>
                        </div>
                      </Grid> : <></>
                    }
                      {users.plan_name === "Lite" ?
                        <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className={classes.griditems} >
                          <div className={classes.lcommonclscommsntiers}>
                            <div className={classes.innerdivision}>
                              <div className={classes.heading}>
                                <h4>
                                  Lite
                                </h4>
                                <Grid container className={classes.price}>
                                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <h1>{users.per_month}</h1>
                                  </Grid>
                                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <p>USD<br></br>per Month</p>
                                  </Grid>
                                </Grid>
                                <p>{users.per_year} USD per year</p>
                              </div>
                              <div className={classes.limit}>
                                <h6>
                                  Limit <HelpOutlineOutlinedIcon />
                                </h6>
                                {users.limit &&
                                  users.limit?.map((limit, index) => (<p>{limit}</p>))}
                              </div>
                            </div>
                            <div className={classes.innerdivision}>
                              <div className={classes.features}>
                                <h6>
                                  Feature
                                </h6>
                                {users.features &&
                                  users.features?.map((features, index) => (<p>{features}</p>))}
                              </div>
                              <div className={classes.plan}>
                              {buttonSelction(users, "Month")}
                                {/* {user.isActivate ? <></> : <Button variant="outlined" onClick={() => addPlans(users, "Month")}>Select Plan</Button>} */}
                              </div>
                            </div>
                          </div>
                        </Grid> : <></>
                      }
                      {users.plan_name === "Premium Ref" ?
                        <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className={classes.griditems} >
                          <div className={classes.prcommonclscommsntiers}>
                            <div className={classes.innerdivision}>
                              <div className={classes.heading}>
                                <h4>
                                  Premium Ref
                                </h4>
                                <Grid container className={classes.price}>
                                  <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <h1>{users.per_month}</h1>
                                  </Grid>
                                  <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                                    <p>USD<br></br>per Month</p>
                                  </Grid>
                                </Grid>
                                <p>{users.per_year} USD per year</p>
                              </div>
                              <div className={classes.limit}>
                                <h6>
                                  Limit <HelpOutlineOutlinedIcon />
                                </h6>
                                {users.limit &&
                                  users.limit?.map((limit, index) => (<p>{limit}</p>))}
                              </div>
                            </div>
                            <div className={classes.innerdivision}>
                              <div className={classes.features}>
                                <h6>
                                  Feature
                                </h6>
                                {users.features &&
                                  users.features?.map((features, index) => (<p>{features}</p>))}
                              </div>
                              <div className={classes.plan}>
                                {buttonSelction(users, "Month")}
                                {/* {user.isActivate ? <></> : <Button variant="outlined" onClick={() => addPlans(users, "Month")}>Select Plan</Button>} */}
                              </div>
                            </div>
                          </div>
                        </Grid> : <></>
                      }
                      {users.plan_name === "Premium" ?
                        <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className={classes.griditems} >
                          <div className={classes.pcommonclscommsntiers}>
                            <div className={classes.innerdivision}>

                              <div className={classes.heading}>
                                <h4>
                                  Premium
                                </h4>
                                <Grid container className={classes.price}>
                                  <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <h1>{users.per_month}</h1>
                                  </Grid>
                                  <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                                    <p>USD<br></br>per Month</p>
                                  </Grid>
                                </Grid>
                                <p>{users.per_year} USD per year</p>
                              </div>
                              <div className={classes.limit}>
                                <h6>
                                  Limit <HelpOutlineOutlinedIcon />
                                </h6>
                                {users.limit &&
                                  users.limit?.map((limit, index) => (<p>{limit}</p>))}
                              </div>
                            </div>
                            <div className={classes.innerdivision}>
                              <div className={classes.features}>
                                <h6>
                                  Feature
                                </h6>
                                {users.features &&
                                  users.features?.map((features, index) => (<p>{features}</p>))}
                              </div>
                              <div className={classes.plan}>
                              {buttonSelction(users, "Month")}
                                {/* {user.isActivate ? <></> : <Button variant="outlined" onClick={() => addPlans(users, "Month")}>Select Plan</Button>} */}

                              </div>
                            </div>
                            <img className={classes.vectorone} src={Vector}></img>
                            <img className={classes.vectortwo} src={Vectorone}></img>
                            <img className={classes.vectorthree} src={Vectortwo}></img>
                            <img className={classes.vectorbottom} src={vectorBottom}></img>
                            <img className={classes.vectortop} src={VectorTop}></img>
                          </div>
                        </Grid> : <></>
                      }
                    </>

                  ))}

              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.tabpanel} >
              <Grid container spacing={0} className='commission-tiers-section'>
                {user.plans &&
                  user.plans?.map((users, index) => (
                    <> {users.plan_name === "Free" ?
                      <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className={classes.griditems} >
                        <div className={classes.fcommonclscommsntiers}>
                          <div className={classes.innerdivision}>
                            <div className={classes.heading}>
                              <h4>
                              {users.plan_name}
                              </h4>
                              <Grid container className={classes.price}>
                                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                  <h1>{users.per_year}</h1>
                                </Grid>
                                <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                                  <p>USD<br></br>per Year</p>
                                </Grid>
                              </Grid>
                              <p>{users.per_month} USD per Month</p>
                            </div>
                            <div className={classes.limit}>
                              <h6>
                                Limit <HelpOutlineOutlinedIcon />
                              </h6>
                              {users.limit &&
                                users.limit?.map((limit, index) => (<p>{limit}</p>))}
                            </div>
                          </div>
                          <div className={classes.innerdivision}>
                            <div className={classes.features}>
                              <h6>
                                Feature
                              </h6>
                              {users.features &&
                                users.features?.map((features, index) => (<p>{features}</p>))}
                            </div>
                            <div className={classes.plan}>
                            {buttonSelction(users, "Year")}
                              {/* {user.isActivate ? <></> : <Button variant="outlined" >Current Plan</Button>} */}
                            </div>
                          </div>
                        </div>
                      </Grid> : <></>
                    }
                      {users.plan_name === "Lite" ?
                        <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className={classes.griditems} >
                          <div className={classes.lcommonclscommsntiers}>
                            <div className={classes.innerdivision}>
                              <div className={classes.heading}>
                                <h4>
                                {users.plan_name}
                                </h4>
                                <Grid container className={classes.price}>
                                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <h1>{users.per_year}</h1>
                                  </Grid>
                                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <p>USD<br></br>per Year</p>
                                  </Grid>
                                </Grid>
                                <p>{users.per_month} USD per Month</p>
                              </div>
                              <div className={classes.limit}>
                                <h6>
                                  Limit <HelpOutlineOutlinedIcon />
                                </h6>
                                {users.limit &&
                                  users.limit?.map((limit, index) => (<p>{limit}</p>))}
                              </div>
                            </div>
                            <div className={classes.innerdivision}>
                              <div className={classes.features}>
                                <h6>
                                  Featuress
                                </h6>
                                {users.features &&
                                  users.features?.map((features, index) => (<p>{features}</p>))}
                              </div>
                              <div className={classes.plan}>
                              {buttonSelction(users, "Year")}
                                {/* {user?.isActivate ?
                                  <>
                                    {user?.planType === users.plan_name ?
                                      <Button variant="outlined" >Current Plan</Button> : <></>}</> :
                                  <Button variant="outlined" onClick={() => addPlans(users, "Year")}>Select Plan</Button>} */}
                              </div>
                            </div>
                          </div>
                        </Grid> : <></>
                      }
                      {users.plan_name === "Premium Ref" ?
                        <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className={classes.griditems} >
                          <div className={classes.prcommonclscommsntiers}>
                            <div className={classes.innerdivision}>
                              <div className={classes.heading}>
                                <h4>
                                {users.plan_name}
                                </h4>
                                <Grid container className={classes.price}>
                                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <h1>{users.per_year}</h1>
                                  </Grid>
                                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <p>USD<br></br>per Year</p>
                                  </Grid>
                                </Grid>
                                <p>{users.per_month} USD per Month</p>
                              </div>
                              <div className={classes.limit}>
                                <h6>
                                  Limit <HelpOutlineOutlinedIcon />
                                </h6>
                                {users.limit &&
                                  users.limit?.map((limit, index) => (<p>{limit}</p>))}
                              </div>
                            </div>
                            <div className={classes.innerdivision}>
                              <div className={classes.features}>
                                <h6>
                                  Feature
                                </h6>
                                {users.features &&
                                  users.features?.map((features, index) => (<p>{features}</p>))}
                              </div>
                              <div className={classes.plan}>
                              {buttonSelction(users, "Year")}
                                {/* {user.isActivate ? <></> : <Button variant="outlined" onClick={() => addPlans(users, "Year")}>Select Plan</Button>} */}
                              </div>
                            </div>
                          </div>
                        </Grid> : <></>
                      }
                      {users.plan_name === "Premium" ?
                        <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className={classes.griditems} >
                          <div className={classes.pcommonclscommsntiers}>
                            <div className={classes.innerdivision}>

                              <div className={classes.heading}>
                                <h4>
                                {users.plan_name}
                                </h4>
                                <Grid container className={classes.price}>
                                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <h1>{users.per_year}</h1>
                                  </Grid>
                                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <p>USD<br></br>per Year</p>
                                  </Grid>
                                </Grid>
                                <p>{users.per_month} USD per Month</p>
                              </div>
                              <div className={classes.limit}>
                                <h6>
                                  Limit <HelpOutlineOutlinedIcon />
                                </h6>
                                {users.limit &&
                                  users.limit?.map((limit, index) => (<p>{limit}</p>))}
                              </div>
                            </div>
                            <div className={classes.innerdivision}>
                              <div className={classes.features}>
                                <h6>
                                  Feature
                                </h6>
                                {users.features &&
                                  users.features?.map((features, index) => (<p>{features}</p>))}
                              </div>
                              <div className={classes.plan}>
                              {buttonSelction(users, "Year")}
                                {/* {user.isActivate ? <></> : <Button variant="outlined" onClick={() => addPlans(users, "Year")}>Select Plan</Button>} */}
                              </div>
                            </div>
                            <img className={classes.vectorone} src={Vector}></img>
                            <img className={classes.vectortwo} src={Vectorone}></img>
                            <img className={classes.vectorthree} src={Vectortwo}></img>
                            <img className={classes.vectorbottom} src={vectorBottom}></img>
                            <img className={classes.vectortop} src={VectorTop}></img>
                          </div>
                        </Grid> : <></>
                      }
                    </>

                  ))}

              </Grid>
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default MysubscribtionBody
