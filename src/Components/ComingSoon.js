import React from 'react'
import './ComingSoon.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import comingsoonimg from '../images/coming-soon-img.png'
import logo from '../images/logo.png'
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import Constant from "../Constansts";

 const Item = styled(Paper)(({ theme }) => ({
    //  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
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
         }
        })

const ComingSoon = () => {

    const classes = useStyles();
    const navigate = useNavigate();
  return (
    <div className='coming-soon-page'>

<Box sx={{ flexGrow: 1 }}>
<Grid container spacing={0}>
<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item id="back-icon-page-id" className={classes.dashboarbodycls}>
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
            </Item>
          </Grid>
<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
<Item className={classes.dashboarbodycls}>
<div className='images-not-found-logo'><img src={logo} alt="logo"/></div>
<p>We are Coming Very Soon!</p>
</Item>
</Grid>

<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
<Item className={classes.dashboarbodycls}>
<div className='coming-soon-img'><img src={comingsoonimg} alt="comingsoonimg"/></div>
</Item>
</Grid>

</Grid>
</Box>
      
    </div>
  )
}

export default ComingSoon
