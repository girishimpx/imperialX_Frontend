import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Axios from "../../Axios";
import Consts from "../../Constansts";
import Constant from "../../Constansts";
import { styled } from "@mui/material/styles";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import logo from "../../images/logo.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Select, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { useRef } from "react";
import Modal from "@mui/material/Modal";
import classes from "./subscribe.module.css";

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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#000",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Subscribebody = () => {
  const [exchange, setexchange] = useState();
  const [follower_user_id, setfollower_user_id] = useState();
  const [apikey, setapikey] = useState();
  const [secretkey, setsecretkey] = useState();
  const [api_name, setapi_name] = useState();
  const [permission, setpermission] = useState();
  const [open, setOpen] = useState(true);
  const [amount, setamount] = useState();
  const [passphrase, setpassphrase] = useState();
  const [exchangeerr, setexchangeerr] = useState();
  const [follower_user_iderr, setfollower_user_iderr] = useState();
  const [apikeyerr, setapikeyerr] = useState();
  const [secretkeyerr, setsecretkeyerr] = useState();
  const [api_nameerr, setapi_nameerr] = useState();
  const [permissionerr, setpermissionerr] = useState();
  const [amounterr, setamounterr] = useState();
  const [passphraseerr, setpassphraseerr] = useState();
  const navigate = useNavigate();
  const [age, setAge] = React.useState("");

  const onSubscribe = () => {
    if (!exchange) {
      setexchangeerr("* Exchange Required");
    } else if (!apikey) {
      setapikeyerr("* Apikey Required");
    } else if (!secretkey) {
      setsecretkeyerr("* SecretKey Required");
    } else if (!passphrase) {
      setpassphraseerr("* Passphrase Required");
    } else if (!api_name) {
      setapi_nameerr("* Api_name Required");
    } else if (!permission) {
      setpermissionerr("* Permission Required");
    } else {
      const data = {
        exchange: exchange,
        apikey: apikey,
        secretkey: secretkey,
        api_name: api_name,
        permission: permission,
        passphrase: passphrase,
        follower_user_id: "null",
        amount: "null",
      };
      Axios.post(`${Consts.BackendUrl}/trade/createSubscription`, data, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          if (res.data.success) {
            toast.success("Kyc Updated Sucessfully", {

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
              setexchange("");
              setapikey("");
              setsecretkey("");
              setapi_name("");
              setpermission("");
              setpassphrase("");
              navigate(`${Constant.route}/`);
              setOpen(false);
            }, 1500);
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
              setOpen(false);
            }, 1500);
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setexchange("");
    setapikey("");
    setsecretkey("");
    setapi_name("");
    setpermission("");
    setamount("");
    setpassphrase("");
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} className={classes.loginpageBox}>
        <Grid container spacing={0} className={classes.loginpage}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className={classes.loginItem}
          >
            <Item className={classes.loginLeft}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <div className={classes.formFlex}>
                  <div className="formtxt">
                    <FormControl className="text-field">
                      <InputLabel id="demo-simple-select-label">
                        Exchange Name
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="exchange"
                        value={exchange}
                        fullWidth
                        label="Exchange Name"
                        onChange={(e) => {
                          setexchangeerr("");
                          setexchange(e.target.value);
                        }}
                      >
                        <MenuItem value={"imperial"}>imperial</MenuItem>
                      </Select>
                    </FormControl>

                    {exchangeerr && (
                      <p className={classes.paragraph}>{exchangeerr}</p>
                    )}
                  </div>

                  <div className="formtxt">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="API Key"
                      name="apikey"
                      value={apikey}
                      multiline="multiline"
                      className="text-field"
                      onChange={(e) => {
                        setapikeyerr("");
                        setapikey(e.target.value);
                      }}
                    />
                    {apikeyerr && (
                      <p className={classes.paragraph}>{apikeyerr}</p>
                    )}
                  </div>
                </div>
                <div className={classes.formFlex}>
                  <div className="formtxt">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Secret Key"
                      name="secretkey"
                      multiline="multiline"
                      className="text-field"
                      onChange={(e) => {
                        setsecretkeyerr("");
                        setsecretkey(e.target.value);
                      }}
                    />
                    {secretkeyerr && (
                      <p className={classes.paragraph}>{secretkeyerr}</p>
                    )}
                  </div>
                  <div className="formtxt">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Passphrase"
                      multiline="multiline"
                      name="passphrase"
                      className="text-field"
                      onChange={(e) => {
                        setpassphraseerr("");
                        setpassphrase(e.target.value);
                      }}
                    />
                    {passphraseerr && (
                      <p className={classes.paragraph}>{passphraseerr}</p>
                    )}
                  </div>
                </div>
                <div className={classes.formFlex}>
                  <div className="formtxt">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="API Name"
                      name="api_name"
                      multiline="multiline"
                      className="text-field"
                      onChange={(e) => {
                        setapi_nameerr("");
                        setapi_name(e.target.value);
                      }}
                    />
                    {api_nameerr && (
                      <p className={classes.paragraph}>{api_nameerr}</p>
                    )}
                  </div>

                  <div className="formtxt">
                    <FormControl fullWidth className="text-field">


                      <InputLabel id="demo-simple-select-label outlined-multiline-flexible">
                        Permission
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={permission}
                        onChange={(e) => {
                          setpermissionerr("");
                          setpermission(e.target.value);
                        }}
                      >
                        R                      </Select>
                    </FormControl>

                    {permissionerr && (
                      <p className={classes.paragraph}>{permissionerr}</p>
                    )}
                  </div>
                </div>

                <Button
                  className="login-button"
                  style={{ borderRadius: "5px" }}
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    onSubscribe();
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Subscribebody;
