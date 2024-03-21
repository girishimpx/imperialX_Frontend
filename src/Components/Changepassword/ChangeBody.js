import React,{ useEffect,useRef } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import './Changebody.css'
import PropTypes from 'prop-types';
import Axios from "../../Axios";
import Consts from "../../Constansts";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom"
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import rightmove from '../../images/right-move.png'
import midleftimg from '../../images/mid-left-img.png'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import recommmend1 from '../../images/recommmend-1.png'
import tick from "../../images/tick.svg";
import recommmend2 from '../../images/recommmend-2.png'
import recommmend3 from '../../images/recommmend-3.png'
import recommmend4 from '../../images/recommmend-4.png'
import { Link } from 'react-router-dom';
import asseteye from '../../images/asset-eye.png'
import readmorenew from '../../images/read-more-new.png'
import Announcementimg from '../../images/Announcement-img.png'

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Verified } from '@mui/icons-material';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const useStyles = makeStyles({
    dashboarbodycls:{
        background: 'transparent !important',
        borderRadius: '0px !important',
        boxShadow:'none !important',
    },
    highspan:{
      color:'green',
      '& ::after':{
        content:"Hidh"
      }
    },
    lowspan:{
      color:'red !important',
    '& span': {
      content: '""',
      width: '5px',
      height: '5px',
      backgroundColor: 'blue',
      borderRadius: '50%',
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    },
    dashboarbodycls: {
      background: "transparent !important",
      borderRadius: "0px !important",
      boxShadow: "none !important",
    },
    dashboarbalancecls: {
      background:
        "radial-gradient(35.18% 134.17% at 50% 50%, rgba(41, 197, 161, 0.2) 0%, rgba(28, 112, 99, 0.2) 100%) !important",
      border: "0.926846px solid #25DEB0 !important",
      backdropFilter: "blur(1.85369px) !important",
      borderRadius: "30px !important",
      padding: "20px 23px !important",
    },
    blockwidthcmn: {
      maxWidth: "23% !important",
      margin: "40px 0 !important",
    },
    loginleftouter: {
      background: "transparent !important",
      borderRadius: "0px !important",
      boxShadow: "none !important",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    loginrightouter: {
      background:
        "linear-gradient(171.72deg, rgba(37, 222, 176, 0.42) 12.7%, rgba(115, 250, 237, 0) 100%), linear-gradient(320.64deg, #25DEB0 0%, #131A26 100.03%) !important",
      borderRadius: "0px !important",
      boxShadow: "none !important",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    loginleft: {
      background: "transparent !important",
      borderRadius: "0px !important",
      boxShadow: "none !important",
      '& h2':{
        color:"white"
      },
    },
    inputLabel: {
      color: 'red', // Change this color to your desired label color
    },
    input: {
      color: 'blue', // Change this color to your desired placeholder color
    },
    loginpage: {
      display: "flex",
      height: "100%",
    },
    loginform: {
      display: "flex !important",
      flexDirection: "column",
      marginLeft: "0px",
      marginRight: "0px",
      alignItems:"center",
      
    },
    textField: {
      '& label': {
        color: 'red', // Change this color to your desired label color
      },
  }
    // passwordfield:{
    //   '& .MuiOutlinedInput-input':{
    //     border:'1px solid white',
    //     borderRadius:"10px",
    //     color:"white",
    //   },
    //   '& .MuiOutlinedInput-input:hover':{
    //     border:'none',
    //     borderRadius:"10px",
    //     color:"white",
    //   },
    //   '& .MuiOutlinedInput-input:active':{
    //     border:'none',
    //     borderRadius:"10px",
    //     color:"white",
    //   },
    //   '& MuiOutlinedInput-notchedOutline':{
    //     border:'none',
    //   },

    //   '& .Mui-focused .MuiOutlinedInput-notchedOutline':{
    //     border:'1px solid white',
    //   }
    // },
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
  
const ChangeBody = (props) => {
 
  const classes = useStyles();
  const { classStyle } = props;
  const [value, setValue] = React.useState(0);
  const oldPassword = useRef(null);
  const newPassword = useRef(null);
  const navigate = useNavigate()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [oldpassworderr, setOldpassworderr] = React.useState(null);
  const [newpassworderr, setNewpassworderr] = React.useState(null);
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(true);
useEffect(()=>{
  console.log("Change Password")

},[])

const onSubmit = async () => {
  try {
    console.log("==>",oldPassword.current.value,newPassword.current.value)
    if(!oldPassword.current.value){
      setOldpassworderr("* Required")
    }else if(oldPassword.current.value.length<7){
      setOldpassworderr("Lenth is too short")
    }
    else if(!newPassword.current.value){
      setNewpassworderr("* Required")
    }else if(newPassword.current.value.length<7){
      newPassword("Lenth is too short")
    }
    else{
      await Axios.post(`${Consts.BackendUrl}/profile/changePassword`, 
    {
      oldPassword: oldPassword.current.value,
          newPassword: newPassword.current.value,
    },{
      headers: {
        Authorization: localStorage.getItem("Mellifluous"),
      },
    }).then((res) => {
      if (res?.status === 200) {
          console.log(res?.data);
          toast.success("Password changed Successfully", {
           
            duration: 1200,
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
            navigate(`${Consts.route}/`);
          }, 1200);
      }
      console.log(res.data)     
    })
    }
    
  } catch (error) {
    if(error.response.data.message === "Old Password is Wrong"){
      setOldpassworderr(error?.response?.data?.message)
    }
  
  }
};
  return (
    <div className='dashboard-body spot-body basic-page-body'>
<Toaster />
    <Box sx={{ flexGrow: 1 }}>

   
    <Grid container spacing={0}>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} id="my-profile-details">
      <div className='form-div'>
      
              <Item className={classes.loginleft}>
                
                <h2>Change Password</h2>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 2 },
                  }}
                  noValidate
                  autoComplete="off"
                  className={classes.loginform}
                >
                 <FormControl
                    className={classes.passwordfield}
                    sx={{ m: 1,}}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Old Password
                    </InputLabel>
                    <OutlinedInput
                      inputRef={oldPassword}
                      onChange={() => {
                        setOldpassworderr(null);
                      }}
                     
                      id="outlined-adornment-password"
                      
                      label="Old Password"
                      InputLabelProps={{
                        className: classes.inputLabel,
                      }}
                      inputProps={{
                        className: classes.input,
                      }}
                    />
                </FormControl>
                  {oldpassworderr !== null ? (
                    <span style={{ color: "red" }}>{oldpassworderr}</span>
                  ) : (
                    <></>
                  )}

                  <FormControl
                    className={classes.passwordfield}
                    sx={{ m: 1,}}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      New Password
                    </InputLabel>
                    <OutlinedInput
                      inputRef={newPassword}
                      onChange={() => {
                        setNewpassworderr(null);
                      }}
                      id="outlined-adornment-password"
                      
                      label="New Password"
                    />
                  </FormControl>
                  {newpassworderr !== null ? (
                    <span style={{ color: "red" }}>{newpassworderr}</span>
                  ) : (
                    <></>
                  )}

                 
                  <Button
                    className="login-button"
                    variant="contained"
                    onClick={onSubmit}
                  >
                    Change Password
                  </Button>
                  {/* <div className="login-with">
                    <p>Or Log In With</p>
                    <ul className="login-with-list">
                      <li>
                        <Link>
                          <img src={googlelogo} alt="google-logo" />
                        </Link>
                      </li>
                      <li>
                        <Link>
                          <img src={twitterlogo} alt="twitter-logo" />
                        </Link>
                      </li>
                    </ul>
                  </div> */}
                </Box>
              </Item>
            
      </div>
    
   

    </Grid>

   

    </Grid>
    </Box>
      
    </div>
  )
}

export default ChangeBody
