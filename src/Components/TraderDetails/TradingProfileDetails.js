import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Consts from "../../Constansts";
import Axios from "../../Axios";
import { useParams } from "react-router-dom";
import profile from "../../images/person.svg";
import tick from "../../images/tick.svg";
import dollar from "../../images/dollar.svg";
import crown from "../../images/crown.svg";
import fire from "../../images/fire.svg";
import dollar1 from "../../images/dollar1.svg";
import wallet from "../../images/wallet.svg";
import profit from "../../images/profit.svg";
import star from "../../images/star.svg";
import TextField from "@mui/material/TextField";
import arrow from "../../images/arrow.svg";
import "./TradingProfileDetails.css";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import Modal from "@mui/material/Modal";
import Classstyle from "./MasterTrader.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom'

import nextarrow from "../../images/Next-arrow.svg";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  profiletraderdtlsclsinner: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    height: "100% !important",
  },
  dashboarbodycls: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
});

const TradingProfileDetails = ({ sideBarShow, setSideBarShow }) => {
  const [master, setMaster] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const params = useParams();
  const [follower_user_id, setfollower_user_id] = useState(params._id);
  const [amount, setamount] = useState();
  const [amounterr, setamounterr] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [mysublist, setmysublist] = React.useState([]);
  const [followerCount, setfollowerCount] = useState();
  const [errhndle, seterrhndle] = useState();

  const user = JSON.parse(localStorage.getItem("users"));

  const classes = useStyles();
  useEffect(() => {
    getMaster();
  }, []);
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
            setLoading(false);
          }

          setLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      setLoading(false);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const onPay = () => {
    try {
      if (!amount) {
        setamounterr("* Amount Required");
      } else if (amount <= 0) {
        setamounterr("* Amount must be valid");
      } else {
        const data = {
          follower_id: params.id,
          amount: amount,
        };
  
        Axios.post(`${Consts.BackendUrl}/trade/addsubscriber`, data, {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          },
        })
          .then((res) => {
            if (res.data.success) {
              toast.success(`${res.data.message}`, {
                   
            duration: 3000,
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
                // handleClose();
                // handleCloses();
                window.location.reload();
              }, 1500);
            } else {
              toast.error(`${res.data.message}`, {
                   
            duration: 3000,
            position: "top-center",
  
            // Styling
            style: {
              padding: "1rem",
              fontSize: "15px",
              color: "red ",
              fontWeight: "bold",
            },
            className: "",
  
            // Custom Icon
           icon:"",
  
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
              // setTimeout(()=>{
              //   handleClose()
              //   handleCloses()
              //     },1500)
            }
          })
          .catch((err) => console.log(err, "err"));
      }
      }
     catch (error) {
      
    }
   
  };

  useEffect(() => {
    Axios.get(`${Consts.BackendUrl}/trade/getMysubscription`, {
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      },
    })
      .then((res) => {
        if (res.data.success) {
          res.data.result[0].follower_user_id.map((item, index) => {
            setmysublist((prev) => [...prev, item.follower_id]);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="traind-profile-detail-part">
      <Box sx={{ flexGrow: 1 }} className={classes.profiletraderdtlsclsouter}>
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={8}
            xl={8}
            className={classes.profiletraderdtlsclsmid}
          >
            <Item className={classes.profiletraderdtlsclsinner}>
              <div className="profile-contain">
              <div className="details">
                  
                  <div className="person-profile">
                    <div className="profile">
                      <img src={profile} />
                    </div>
                    <div className="intro">
                      <h4 className="intro-head">{master?.name}</h4>
                      <div className="crowning-min-cont-clock">
                        <div className="crownimg">
                          <img src={crown} />
                        </div>
                        <div className="mini-content">
                          <div>
                            <img src={tick} />
                            <span>verified</span>
                          </div>
                          <div>
                            <img src={dollar} />
                            <span>trial</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div>

                <div className="details">
                  <div className="views">
                    <div className="l1">
                      <label>Follower(s)</label>
                      <h6 className="no">
                        {followerCount ? followerCount : 0}
                      </h6>
                    </div>
                    <hr className="line" width="1" size="40" />
                    <div className="l1">
                      <label>Trading Days</label>
                      <h6 className="no">
                        {Math.ceil(
                          (new Date().getTime() -
                            new Date(master?.createdAt).getTime()) /
                            (1000 * 3600 * 24)
                        )}
                      </h6>
                    </div>
                    <hr className="line" width="1" size="40" />
                    <div className="l1">
                      <label>Stability Index</label>
                      <h6 className="no">
                        5.0<label>/5.0</label>
                      </h6>
                    </div>
                  </div>
                  <div className="copy-trade">
                    <div className="list">
                      <div className="mini-div">
                        <div className="arrow">
                          <img src={arrow} />
                        </div>
                        <label>Share</label>
                      </div>
                      <hr className="line" width="1" size="15" height="3" />
                      <div className="mini-div">
                        <div className="arrow">
                          <img src={star} />
                        </div>
                        <label>Subscribe</label>
                      </div>
                    </div>
                    {!loading && params.id != user._id ? (
                      mysublist.length > 0 ? (
                        !mysublist.includes(params.id) ? (
                          <Button
                            onClick={() => {
                              handleOpen();
                            }}
                          >
                            <div className="fireImg">
                              <img src={fire} />
                              <label>Copy Trade</label>
                            </div>
                          </Button>
                        ) : null
                      ) : (
                       <></>
                      )
                    ) : null}

{/* <Button
                          onClick={() => {
                            handleOpen();
                          }}
                        >
                          <div className="fireImg">
                            <img src={fire} />
                            <label>Copy Trade</label>
                          </div>
                        </Button> */}


                    <div>
                      <label className="copy-label">
                        <span className="wait">1006</span> in Waiting List
                      </label>
                    </div>
                  </div>
                </div>

                <div className="describ">
                  <label className="des-label">Description</label>
                  <div className="para">
                    <label>
                      Pro trader with 7 yers exp. Long and Short strategy, max
                      lvr 5X, dynam. tp-sl. Big experience of trading BEAR
                      market. On WSOT 2020 i am at top 30 best world traders. No
                      shit coins, no risk positions, only professional risk
                      manag <span>Read more</span>
                    </label>
                  </div>
                </div>
                <div className="list-trade">
                  <div className="profits">
                    <div className="profitsImg">
                      <img src={dollar1} />
                    </div>
                    <label>AUM 116,632.36 USDT</label>
                  </div>
                  <hr className="line" width="1" size="15" />
                  <div className="profits">
                    <div className="profitsImg">
                      <img src={wallet} />
                    </div>
                    <label>Total Assets ***** USDT</label>
                  </div>
                  <hr className="line" width="1" size="15" />
                  <div className="profits">
                    <div className="profitsImg">
                      <img src={profit} />
                    </div>
                    <label>Profit Sharing 10%</label>
                  </div>
                </div>
                <div className="mini-buttons">
                  <Button className="mini-but">
                    <label>Top Profit</label>
                  </Button>
                  <Button className="mini-but">
                    <label>High Frequency</label>
                  </Button>
                  <Button className="mini-but">
                    <label>High Leverage</label>
                  </Button>
                  <Button className="mini-but">
                    <label>Swing Trader</label>
                  </Button>
                  <Button className="mini-but">
                    <label>Social Connector</label>
                  </Button>
                </div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Item className={classes.profiletraderdtlsclsinner}>
              <div className="premium">
                <div className="pre-sub">
                  <p style={{ letterSpacing: "normal" }}>Copy Trading</p>
                  <div className="pre-span">
                    <div className="min-height-block">
                      <span>1.5-10 $</span>
                      <span>per 30 days</span>
                    </div>
                    <span className="last-one-margin">per 30 days</span>
                  </div>
                  <Button className="sub-button">
                    <label>subscribe</label>
                  </Button>
                </div>
                <hr className="line" width="1" size="200" />
                <div className="pre-sub">
                  <p>Signals</p>
                  <div className="pre-span">
                    <div className="min-height-block">
                      <span>0 $</span>
                    </div>
                    <span className="last-one-margin">Free</span>
                  </div>
                  <Button className="sub-button">
                    <label>subscribe</label>
                  </Button>
                </div>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
      {open && (
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="account-qr-code-pop-up-modal"
        >
          <Box sx={style} className={Classstyle.modal}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Item className={classes.dashboarbodycls}>
                  <div className={classes.fixedIcon}>
                    <div className="heading-account acc">
                      <CloseIcon
                        onClick={() => {
                          handleClose();
                        }}
                      />
                    </div>
                  </div>

                  <Grid
                    container
                    spacing={0}
                    style={{ "justify-content": "center" }}
                    className="inner-popup"
                  >
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                      <Grid
                        container="container"
                        spacing={0}
                        className="inner-popup leftside-binace"
                      >
                        <div className="sub-head">
                          <h4>Account</h4>
                          <p>9.99000999</p>
                        </div>
                      </Grid>
                    </Grid>

                    <Grid
                      item="item"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={6}
                      xl={6}
                      className="rightside-binace"
                    >
                      <Grid
                        container="container"
                        spacing={0}
                        className="inner-popup "
                      >
                        <Grid
                          item="item"
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={12}
                        >
                          <Item className={classes.dashboarbodycls}>
                            <div className="text-binance">
                              <p>QR Code</p>
                            </div>
                          </Item>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container spacing={0} className="inner-popup">
                    <Grid item="item" xs={12} sm={12} md={12} lg={12} xl={12}>
                      <div className="formtxt">
                        <TextField
                          id="outlined-multiline-static"
                          label="Amount"
                          name="amount"
                          value={amount}
                          type={"number"}
                          className="text-field"
                          onChange={(e) => {
                            setamounterr("");
                            setamount(e.target.value);
                          }}
                        />
                        {amounterr && (
                          <p
                            style={{
                              padding: ".5rem",
                              color: "#f85656",
                              textAlign: "center",
                            }}
                          >
                            {amounterr}
                          </p>
                        )}
                      </div>

                      <div className="bck-btn tppcp-block">
                        <div className="tppcp-text-style">
                          <Checkbox defaultChecked />
                          <p>you agree to our <Link>Terms</Link>, <Link>Privacy Policy</Link> and <Link>Cookies Policy</Link>.</p>
                        </div>
                        <Button
                          className="welcome-btn open"
                          onClick={() => {
                            onPay();
                          }}
                        >
                          Confirm
                          <img src={nextarrow} alt="user" />
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default TradingProfileDetails;
