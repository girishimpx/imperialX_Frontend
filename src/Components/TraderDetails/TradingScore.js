import React from "react";
import "./TradingScore.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import Modal from "@mui/material/Modal";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ratingStar from "../../images/rating-star.svg";
import { Rating } from 'react-simple-star-rating'
import Query from "../../images/query.svg";
import profitgraphtrader from '../../images/profit-graph-trader.png'
import risktrader from '../../images/risk-trader.png'
import Classstyle from "./MasterTrader.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Consts from "../../Constansts";
import Axios from "../../Axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  tradingscoreinner:{
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow:'none !important',
  },
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
  modals:{
    width:'50% !important' ,
  height:"max-content",
    border: "1px solid #25DEB0 !important",
  
  }
});

const TradingScore = ({sideBarShow,setSideBarShow,master,handleMaster,israted}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [gradeIndex, setGradeIndex] = React.useState();
  const GRADES = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
  const activeStar = {
      fill: 'yellow'
  };

  const [rating, setRating] = React.useState(0)
  
  // Catch Rating value
  const handleRating = (e,_id,rate) => {
    console.log(e,rating,"hgjhg")
    setRating(e)
    setGradeIndex(e-1)
   // masterRating(e,_id)
  }

  const onPointerEnter = () => {console.log('Enter',)}
  const onPointerLeave = () => {console.log('Leave')}
  const onPointerMove = (value, index) => {setGradeIndex(index);console.log(value, index)}


  const changeGradeIndex = ( index ) => {
      setGradeIndex(index);
  }
  const changeGrade = (e) => {
   changeGradeIndex(e.target.value);
}

const masterRating = (_id) => {
  try {
   
     const data = {
      rating : rating,
      _id : _id
     }
     console.log(data)
      Axios.post(`${Consts.BackendUrl}/users/rating`, data, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          if (res.data.success) {
            handleMaster()
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
              handleClose();
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
        handleMaster()
            setTimeout(()=>{
              handleClose()
                },1500)
          }
        })
        .catch((err) => {toast.error(`${err?.response?.data.message}`) ; handleMaster(); console.log(err?.response?.data.message, "err"); setTimeout(()=>{
          handleClose()
            },1500)});
    
        // .catch((err) => toast.error(`${err?.response?.data.message}`), console.log(err?.response?.data.message, "err"));
    
    }
   catch (error) {
    console.log(error)
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
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.tradingscoreinner}>
              <div className="TradingScore-contain">
                <div className="whole-score">
                <Grid  container spacing={0}>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <div className="rating-score">
                    <div>
                      <div className="rating-risk-head"><span>Ratings</span><img src={Query} alt="Query"/></div>
                    </div>
                    <div className="ratingstar postn-abslte"><img src={ratingStar} alt="ratingStar"/><span className="rating-value">{master?.rating}</span></div>
                   {israted ===true ? <></> : <Button className="sub-button"  onClick={()=>{handleOpen()}}>
                     {console.log(master,"mas")}
                    <label>Rating</label>
                  </Button>} 
                    </div>
                    

            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <div className="rating-score">
                    <div>
                      <div className="rating-risk-head"><span>Profit</span><img src={Query} alt="Query"/></div>
                    </div>
                    <div className="ratingstar postn-abslte"><img src={profitgraphtrader} alt="ratingStar"/></div>
                    <div className="common-value-style-trader">+60.96%</div>
                    </div>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
           
            <div className="rating-score">
                    <div>
                      <div className="rating-risk-head"><span>Risk</span><img src={Query} alt="Query"/></div>
                    </div>
                    <div className="ratingstar postn-abslte"><img src={risktrader} alt="ratingStar"/><span className="rating-value risk-value"><span>40.99%</span><span>1'090 trades</span></span></div>
                    <div className="common-value-style-trader">7.2 of 10</div>
                    </div>
            </Grid>
            </Grid>
                    {/* <div className="rating-score">
                    <div>
                      <div className="rating-risk-head"><span>Rating</span><img src={Query} alt="Query"/></div>
                    </div>
                    <div className="ratingstar postn-abslte"><img src={ratingStar} alt="ratingStar"/><span className="rating-value">6.4</span></div>
                    </div>
                  
                    <div className="rating-score">
                    <div>
                      <div className="rating-risk-head"><span>Profit</span><img src={Query} alt="Query"/></div>
                    </div>
                    <div className="ratingstar postn-abslte"><img src={profitgraphtrader} alt="ratingStar"/></div>
                    <div className="common-value-style-trader">+60.96%</div>
                    </div>

                    <div className="rating-score">
                    <div>
                      <div className="rating-risk-head"><span>Risk</span><img src={Query} alt="Query"/></div>
                    </div>
                    <div className="ratingstar postn-abslte"><img src={risktrader} alt="ratingStar"/><span className="rating-value risk-value"><span>40.99%</span><span>1'090 trades</span></span></div>
                    <div className="common-value-style-trader">7.2 of 10</div>
                    </div> */}
                    
                </div>

              </div>
            </Item>
          
          </Grid>
        </Grid>
        {open && (
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          
        >
          <Box sx={style} className={classes.modals}>
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
                    className="inner-popup" id="inner-popup"
                  >
 
      <Rating
        onClick={(e)=>handleRating(e,master._id)}
        onPointerEnter={()=>{onPointerEnter()}}
        onPointerLeave={()=>{onPointerLeave()}}
        onPointerMove={onPointerMove}
        /* Available Props */
      />
 <h5>{GRADES[gradeIndex]}</h5>

                    {/* <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                      <Grid
                        container="container"
                        spacing={0}
                        className="inner-popup leftside-binace"
                      >
                        <div className="sub-head">
                          <h4>{master?.name}</h4>
                      
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
                    </Grid> */}
                  </Grid>

                  <Grid container spacing={0} className="inner-popup">
                    <Grid item="item" xs={12} sm={12} md={12} lg={12} xl={12}>
                      <div className="formtxt">
                        
                      </div>

                      <div className="bck-btn">
                        <Button
                          className="welcome-btn open"
                          onClick={() => {masterRating(master._id)}}
                        >
                          Give Rating
                         
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
      </Box>
    </div>
  );
};

export default TradingScore;
