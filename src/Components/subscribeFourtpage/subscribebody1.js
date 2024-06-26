import React, { useState, useEffect } from "react";
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
const Subscribebody = ({ selected, selected1, gettSelected, getSubscription, handleEdit }) => {
  const [exchange, setexchange] = useState(selected);

  const [apikey, setapikey] = useState(selected1?.apikey);
  const [secretkey, setsecretkey] = useState(selected1?.secretkey);
  const [api_name, setapi_name] = useState(selected1?.api_name);
  const [permission, setpermission] = useState(selected1?.permission);
  const [open, setOpen] = useState(true);
  const [amount, setamount] = useState();
  const [passphrase, setpassphrase] = useState(selected1?.passphrase);
  const [exchangeerr, setexchangeerr] = useState();

  const [apikeyerr, setapikeyerr] = useState();
  const [secretkeyerr, setsecretkeyerr] = useState();
  const [api_nameerr, setapi_nameerr] = useState();
  const [permissionerr, setpermissionerr] = useState();
  const [wait, setWait] = useState(false)
  const [waits, setWaits] = useState(false)
  const [errs, seterrs] = useState();
  const [passphraseerr, setpassphraseerr] = useState();
  const navigate = useNavigate();
  const [where, setwhere] = useState();
  const [spot, setspot] = useState(selected1?.trade_base?.spot ? selected1?.trade_base?.spot : false);
  const [margin, setmargin] = useState(selected1?.trade_base?.margin ? selected1?.trade_base?.margin : false);
  const [future, setfuture] = useState(selected1?.trade_base?.future ? selected1?.trade_base?.future : false);






  const onSubscribe = () => {
    if (!exchange) {
      setexchangeerr("Exchange Required");
    } else if (!apikey) {
      setapikeyerr("Apikey Required");
    } else if (!secretkey) {
      setsecretkeyerr("SecretKey Required");
    } else if (!passphrase) {
      setpassphraseerr("Passphrase Required");
    } else if (!api_name) {
      setapi_nameerr("Api name Required");
    } else if (!permission) {
      setpermissionerr("Permission Required");
    } else if (!spot && !margin && !future) {
      setfuture("Atleast any one of above sholud be checked");
    } else {
      setWait(true)
      const data = {
        exchange: exchange,
        apikey: apikey,
        secretkey: secretkey,
        api_name: api_name,
        permission: permission,
        passphrase: passphrase,
        spot,
        margin,
        future
      };

      Axios.post(`${Consts.BackendUrl}/trade/editsubscribeDetail`, data, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      })
        .then((res) => {
          if (res.data.success) {
            toast.success("Subscription updated successfully", {

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
              window.location.reload();

              setOpen(false)
              setWait(false)
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
              setOpen(false)
              setWait(false)
            }, 1500);
          }
        })
        .catch((err) => { seterrs(err) });


    }
  };

  const onDisable = (status) => {

    setWaits(true)

    const data = {
      _id: selected1._id,
      status: status,
      exchange: exchange,
    };

    Axios.post(`${Consts.BackendUrl}/trade/disable-subscription`, data, {
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

            setOpen(false)
            setWaits(false)
            getSubscription()
            gettSelected()
            handleEdit()
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
            setOpen(false)
            setWaits(false)
            getSubscription()
            gettSelected()
            handleEdit()
          }, 1500);
        }
      })
      .catch((err) => { seterrs(err) });



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
        <Grid container={true} spacing={0} className={classes.loginpage}>
          <Grid
            item={true}
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
                    <TextField
                      id="outlined-multiline-flexible"
                      style={{ width: "90%" }}

                      label="Exchange"
                      name="exchange"
                      value={selected}
                      // multiline="multiline"
                      className="text-field"
                      onChange={(e) => {
                        setexchangeerr("");
                        setexchange(e.target.value);
                      }}
                    />
                    {exchangeerr && <p className={classes.paragraph} style={{ color: "red" }}>{exchangeerr}</p>}
                  </div>

                  <div className="formtxt">
                    <TextField
                      id="outlined-multiline-flexible"
                      style={{ width: "90%" }}

                      label="API Key"
                      name="apikey"
                      value={apikey}
                      // multiline="multiline"
                      className="text-field"
                      onChange={(e) => {
                        setapikeyerr("");
                        setapikey(e.target.value);
                      }}
                    />
                    {apikeyerr && <p className={classes.paragraph} style={{ color: "red" }}>{apikeyerr}</p>}
                  </div>
                </div>
                <div className={classes.formFlex}>
                  <div className="formtxt">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Secret Key"
                      style={{ width: "90%" }}
                      value={secretkey}
                      name="secretkey"
                      // multiline="multiline"
                      className="text-field"
                      onChange={(e) => {
                        setsecretkeyerr("");
                        setsecretkey(e.target.value);
                      }}
                    />
                    {secretkeyerr && (
                      <p className={classes.paragraph} style={{ color: "red" }}>{secretkeyerr}</p>
                    )}
                  </div>
                  <div className="formtxt">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Passphrase"
                      style={{ width: "90%" }}
                      value={passphrase}
                      // multiline="multiline"
                      name="passphrase"
                      className="text-field"
                      onChange={(e) => {
                        setpassphraseerr("");
                        setpassphrase(e.target.value);
                      }}
                    />
                    {passphraseerr && (
                      <p className={classes.paragraph} style={{ color: "red" }}>{passphraseerr}</p>
                    )}
                  </div>
                </div>
                <div className={classes.formFlex}>
                  <div className="formtxt">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="API Name"
                      style={{ width: "90%" }}
                      name="api_name"
                      value={api_name}
                      // multiline="multiline"
                      className="text-field"
                      onChange={(e) => {
                        setapi_nameerr("");
                        setapi_name(e.target.value);
                      }}
                    />
                    {api_nameerr && <p className={classes.paragraph} style={{ color: "red" }}>{api_nameerr}</p>}
                  </div>

                  <div className="formtxt">
                    <FormControl style={{ width: "90%" }} className="text-field">


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
                        <MenuItem value={"Read/write"}>Read/write</MenuItem>
                      </Select>
                    </FormControl>

                    {permissionerr && (
                      <p className={classes.paragraph} style={{ color: "red" }}>{permissionerr}</p>
                    )}
                  </div>



                </div>


                <div className={classes.formFlex}>
                  <div className="formtxt"><p><input checked={spot} type="checkbox" onChange={() => {
                    setspot(!spot)
                    setwhere("")
                  }} className="custom-checkbox" /> Spot</p></div>
                  <div className="formtxt"><p><input checked={margin} type="checkbox" onChange={() => {
                    setmargin(!margin)
                    setwhere("")
                  }} className="custom-checkbox" /> Margin</p></div>
                  <div className="formtxt"><p><input checked={future} type="checkbox" onChange={() => {
                    setfuture(!future)
                    setwhere("")
                  }} className="custom-checkbox" /> Future</p></div>

                  {where && (
                    <p className={classes.paragraph}>{where}</p>
                  )}


                </div>

                <div className={classes.formButton}>

                  {selected1?.trade_status === "disable" ? <Button
                    className="login-button"
                    style={{ borderRadius: "5px" }}
                    variant="contained"
                    disabled={waits}
                    onClick={(e) => {
                      e.preventDefault();
                      onDisable("enable")

                    }}
                  >

                    {waits ? "processing..." : "enable"}
                  </Button> : <>
                    <Button
                      className="login-button"
                      style={{ borderRadius: "5px" }}
                      variant="contained"
                      disabled={waits}
                      onClick={(e) => {
                        e.preventDefault();
                        onDisable("disable")

                      }}
                    >

                      {waits ? "processing..." : "disable"}
                    </Button>
                    <Button
                      className="login-button"
                      style={{ borderRadius: "5px" }}
                      variant="contained"
                      disabled={wait}
                      onClick={(e) => {
                        e.preventDefault();
                        onSubscribe()

                      }}
                    >
                      {wait ? "processing..." : "Submit"}
                    </Button>
                  </>
                  }

                </div>

              </Box>
            </Item>



          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Subscribebody;
