import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import ExchangeAccountBody from './ExchangeAccountBody';
import { useLocation, useNavigate } from 'react-router-dom';
import './ExchangeAccount.css'
import Consts from '../../Constansts';
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../../Axios";
import KYCJBody from '../KYCForm/KYCJBody';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  sidebarcls: {
    background: '#010712 !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    overflow: 'hidden',
    position: 'sticky !important',
    top: '0px',
    padding: '0px !important',
    height: '100vh'
  },
  headercls: {
    background: '#131a26 !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    padding: '20px 55px !important',
    height: "100vh !important",
    '& form': {
      padding: '0px !important',
      '@media (max-width: 767.98px)': {
        width: '100%',
      },
      '& button': {
        background: '#25DEB0',
        borderRadius: '0px 5px 5px 0px'
      }
    },
    '@media (max-width: 767.98px)': {
      padding: '20px !important',
    },
  }
});


const ExchangeAccount = ({ sideBarShow, setSideBarShow, openSideBar, setOpenSideBar }) => {

  const classes = useStyles();
  const history = useLocation()
  const navigate = useNavigate()
  const user = localStorage.getItem('kyc_verify')
  // const pending = localStorage.getItem('use')
  const [exchangeShow, setExchangeShow] = React.useState(false);
  const [kycsubmit, setkycsubmit] = React.useState(false);
  const [allow, setAllow] = useState(false);



  useEffect(() => {
    try {
      Axios.get(`${Consts.BackendUrl}/users/kycsybmit`, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          console.log(res?.data?.message, "resessss")
          Axios.get(`${Consts.BackendUrl}/users/kycVerify`, {
            headers: {
              Authorization: localStorage.getItem("Mellifluous"),
            },
          })
            .then((res1) => {
              console.log(res1, "resgfgfgf")


            }).catch((error) => {
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
              setTimeout(() => {
                navigate("/");
              }, 1600);
            })

        })
        .catch((err) => {
          console.log(err, "err")
          toast.error(`please submit kyc to trade`, {
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
          setTimeout(() => {
            navigate("/kycj-verification");
          }, 1600);
        });


    } catch (error) {
      console.log("🚀 ~ file: MasterTraderTab.js:248 ~ useEffect ~ error:", error)
    }
  }, []);


  return (
    <div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          {/* <Grid item xs={12} sm={12} md={12} lg={2} xl={2}> */}
          <Item className={classes.sidebarcls}>
            <Sidebar sideBarShow={sideBarShow}
              setSideBarShow={setSideBarShow} openSideBar={openSideBar}
              setOpenSideBar={setOpenSideBar} />
          </Item>
          {/* </Grid> */}

          <Grid id={sideBarShow ? "z-index-prop-postve" : "z-index-prop-negtve"} item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.headercls}>
              <Header sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow} openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar} />
              <ExchangeAccountBody sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow} openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar} />




            </Item>
          </Grid>



        </Grid>
      </Box>

    </div>
  )
}

export default ExchangeAccount