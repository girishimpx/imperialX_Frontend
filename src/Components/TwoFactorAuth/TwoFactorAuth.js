import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import logo from "../../images/logo.png";
import "./TwoFactorAuth.css";
import Axios from "../../Axios";
import Const from "../../Constansts";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

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
  twofactorycls: {
    background: "#131a26 !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    padding: "20px 55px !important",
    height: "95vh",
    alignItems: "center",
    justifyContent: "center",
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

const TwoFactorAuth = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const history = useLocation();

  const [otp, setOtp] = useState();

  // toast.error("Please Verify Your KYC ", {
  //   position: "top-center",
  //   autoClose: 3000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "colored",
  // });
  console.log(history?.state, "token");
  const otpverify = async () => {
    if (history?.state?.token?.token) {
      await Axios.post(
        `/auth/verify2fa`,
        { secret: otp },
        {
          headers: {
            Authorization: history?.state?.token?.token,
          },
        }
      )
        .then((res) => {
          console.log(res,"rers");
          localStorage.setItem("Mellifluous", history?.state?.token?.token);
          localStorage.setItem(
            "users",
            JSON.stringify(history?.state?.token?.user)
          );
          navigate(`${Const.route}/`);
        })
        .catch((err) => {
          toast.error(`${err?.response?.data?.message}`, {
            
              duration: 4000,
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
        });
    }
  };

  return (
    <div>
      <Toaster />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.twofactorycls}>
              <div className="tfa-outer">
                <div className="two-factor-auth-page">
                  <div className="logo">
                    <img src={logo} alt="logo" />
                  </div>
                  <div className="google-auth">
                    <h3>Google Authenticator</h3>
                  </div>
                  <h4>Google Verification</h4>
                  <p>Enter the 6 digits code</p>
                  <div className="input-code">
                    <input
                      onChange={(e) => {
                        setOtp(e.target.value);
                      }}
                      type="text"
                    />
                  </div>

                  <button
                    onClick={otpverify}
                    disabled={otp?.length > 6 || otp?.length < 6 ? true : false}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default TwoFactorAuth;
