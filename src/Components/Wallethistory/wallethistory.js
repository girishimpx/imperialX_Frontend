import React, { useEffect } from 'react';
import { Grid, Paper, Box } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Sidebar from '../Sidebar/Sidebar';
import { styled } from '@mui/material/styles';
import Header from '../Header/Header'
import Historybody from './historybody';
import './wallethistory.css'

const Wallethistory = ({ sideBarShow, setSideBarShow, openSideBar, setOpenSideBar }) => {


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const useStyles = makeStyles({

    sidebarcls: {
      background: "#010712 !important",
      borderRadius: "0px !important",
      boxShadow: "none !important",
      overflow: "hidden",
      position: 'sticky !important',
      top: '0px',
      padding: '0px !important',
      height: '100vh'
    },
    headercls: {
      background: "#131a26 !important",
      borderRadius: "0px !important",
      height: "100vh !important",
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
  const classes = useStyles();
  return <>
    <div>

      <Box sx={{ flexGrow: 1 }} >
        <Grid container spacing={0}>
          {/* <Grid item xs={12} sm={12} md={12} lg={2} xl={2}> */}
          <Item className={classes.sidebarcls}>
            <Sidebar sideBarShow={sideBarShow} setSideBarShow={setSideBarShow} openSideBar={openSideBar}
              setOpenSideBar={setOpenSideBar} />
          </Item>
          {/* </Grid> */}
          <Grid id={sideBarShow ? "z-index-prop-postve" : "z-index-prop-negtve"} item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.headercls}>
              <Header sideBarShow={sideBarShow} setSideBarShow={setSideBarShow} openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar} />
              <Historybody />
            </Item>
          </Grid>
        </Grid>
      </Box>

    </div>

  </>
}
export default Wallethistory