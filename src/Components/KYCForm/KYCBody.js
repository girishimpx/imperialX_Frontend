import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Constant from "../../Constansts";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import "./KYCForm.css";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import baseURL from "./flagcode.json";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Idfrontimg from "../../images/id-card-front-circle.png";
import Idbackimg from "../../images/id-card-back-circle.png";
import idselfieimg from "../../images/profile-circle.png";
import fileuploadimg from "../../images/notes-card-circle.png";
import { useLocation } from "react-router-dom";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../../Axios";

import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  logintextbox: {
    background: "transparent !important",
    boxShadow: "none !important",
    marginTop: "15px !important",
    marginBottom: "15px !important",
    "& input": {
      color: "#ccc",
    },
  },
  input: {
    background: "transparent !important",
    boxShadow: "none !important",
    marginTop: "15px !important",
    marginBottom: "15px !important",
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
  loginwhole: {
    background: "transparent !important",
    boxShadow: "none !important",
    textAlign: "left !important",
    color: "#ccc",
    padding: "20px 55px !important",
    background: "transparent !important",
    "@media (max-width: 991.98px)": {
      padding: "20px 10px !important",
    },
    "& input": {
      border: "1px solid #ccc",
      borderRadius: "5px",
      marginBottom: "0px",
      width: "100%",
      color: "#ccc !important",
    },
    "& label": {
      color: "#ccc",
      background: "#131a26 !important",
    },
    "& button": {
      fontSize: "16px",
      paddingTop: "8px",
      paddingBottom: "8px",
      marginTop: "20px",
    },
  },
  qrlogin: {
    background: "transparent !important",
    boxShadow: "none !important",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& h3": {
      color: "#ccc",
    },
    "& p": {
      color: "#ccc",
    },
  },

  marketpart: {
    background: "transparent !important",
    boxShadow: "none !important",

    "& h3": {
      color: "#ababab",
      fontSize: "14px",
      textAlign: "left",
      marginBottom: "30px",
      marginTop: "0px",
    },
  },
  tabpartmarketitem: {
    background: "transparent !important",
    boxShadow: "none !important",
    marginRight: "0px !important",
    marginLeft: "0px !important",
    paddingBottom: "19%",

    "& button": {
      fontSize: "16px",
      paddingTop: "10px !important",
      paddingBottom: "10px !important",
      marginRight: "10px",
    },
  },

  tabpartmarketgrid: {
    marginRight: "0px !important",
    marginLeft: "0px !important",
    marginTop: "50px !important",
    paddingLeft: "0px !important",
  },

  depositcoinpart: {
    background: "transparent !important",
    boxShadow: "none !important",
  },
  depositcoinpartpaper: {
    background: "transparent !important",
    boxShadow: "none !important",
    marginTop: "10px",
  },

  depositcoinpartpaperbottom: {
    background: "transparent !important",
    boxShadow: "none !important",
    marginTop: "40px",
  },

  modalcoinselectbox: {
    background: "rgb(30, 35, 41) !important",
    border: "none !important",
    borderRadius: "10px",
    overflow: "hidden",
    "& h2": {
      color: "#fff !important",
      fontSize: "24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },

  searchboxwallet: {
    background: "transparent !important",
    border: "1px solid rgb(86 84 84)",
    marginBottom: "30px",
    marginTop: "30px",
    color: "#fff",
    "& input": {
      color: "#fff",
    },
    "& button": {
      color: "#fff",
    },
  },

  headercls: {
    borderRadius: "0px !important",
    boxShadow: "none !important",
    padding: "20px 55px !important",
    background: "transparent !important",
    "@media (max-width: 991.98px)": {
      padding: "20px 10px !important",
    },
  },
  coinsblock: {
    borderRadius: "0px !important",
    boxShadow: "none !important",
    padding: "20px 55px !important",
    background: "transparent !important",
    "@media (max-width: 991.98px)": {
      padding: "20px !important",
    },
  },
  footercls: {
    borderRadius: "0px !important",
    boxShadow: "none !important",
    padding: "30px 55px !important",
    // backgroundImage: `url(${footerbg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    marginTop: "20px",
    "& nav": {
      "& li": {
        "& a": {
          color: "#C0C9D0 !important",
        },
      },
    },
    "@media (max-width: 991.98px)": {
      padding: "20px !important",
    },
  },
});

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
  height: 400,
};

const KYCBody = () => {
  const classes = useStyles();
  const history = useLocation();
  const [search, setSearch] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (history?.state != "null") {
      if (history?.state?.kyc == true) {
        toast.error("Please Verify Your KYC ", {

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
        setTimeout(() => {
          history.state.kyc = false;
        }, 1000);
      }
    }
  }, []);

  useEffect(() => {
    if (history?.state != "null") {
      if (history?.state?.page == "exchnage") {
        toast.error(`${history?.state?.message}`, {

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
        setTimeout(() => {
          history.state.message = "";
        }, 1000);
      }
    }
  }, []);

  const firstname = useRef(null);
  const lastname = useRef(null);
  const phonenumber = useRef(null);
  const [gender, setGender] = useState("null");
  const [datepickr, setDatePickr] = useState(dayjs("2014-08-18"));
  const [dob, setdob] = useState(null);
  const [country, setCountry] = useState("null");
  const state = useRef(null);
  const city = useRef(null);
  const zipcode = useRef(null);
  const telegram = useRef(null);
  const address = useRef(null);
  const [document_type, setdocument_type] = useState("Passport");
  const document_num = useRef(null);
  const [expiredate, setexpiredate] = useState(dayjs("2014-08-18T21:11:54"));
  const [Image, setImage] = useState("null");
  const [imageurl, setimageurl] = useState("null");

  const [firstnameerr, setfirstnameerr] = useState(null);
  const [lastnameerr, setlastnameerr] = useState(null);
  const [phonenumbererr, setphonenumbererr] = useState(null);
  const [gendererr, setgendererr] = useState(null);
  const [datepickrerr, setdatepickrerr] = useState(null);
  const [countryerr, setcountryerr] = useState(null);
  const [stateerr, setstateerr] = useState(null);
  const [cityerr, setcityerr] = useState(null);
  const [zipcodeerr, setzipcodeerr] = useState(null);
  const [telegramerr, settelegramerr] = useState(null);
  const [addresserr, setaddresserr] = useState(null);
  // const [document_typeerr, setdocument_typeerr] = useState(null)
  const [document_numerr, setdocument_numerr] = useState(null);
  const [expiredateerr, setexpiredateerr] = useState(null);
  const [Imageerr, setImageerr] = useState(null);
  const [documentimageerr, setdocumentimageerr] = useState(null);
  const [url, seturl] = useState();

  const onSubmit = async () => {
    if (firstname.current.value === "") {
      setfirstnameerr("Please Enter First Name");
    } else if (lastname.current.value === "") {
      setlastnameerr("Please Enter Last Name");
    } else if (phonenumber.current.value === "") {
      setphonenumbererr("Please Enter Phonenumber");
    } else if (phonenumber.current.value?.length < 4) {
      setphonenumbererr("Phone Number Must be Greate then 4");
    } else if (phonenumber.current.value?.length > 15) {
      setphonenumbererr("Phone Number Must be Less then 15");
    } else if (gender === "null") {
      setgendererr("Please Select Gender");
    } else if (
      datepickr.$d === "Mon Aug 18 2014 21:11:54 GMT+0530 (India Standard Time)"
    ) {

      setdatepickrerr("Please Select DOB");
    } else if (country === "null") {
      setcountryerr("Please Select Country");
    } else if (state.current.value === "") {
      setstateerr("Please Enter State");
    } else if (city.current.value === "") {
      setcityerr("Please Enter City");
    } else if (zipcode.current.value === "") {
      setzipcodeerr("Please Enter ZIP Code");
    } else if (telegram.current.value === "") {
      settelegramerr("Please Enter Telegram");
    } else if (address.current.value === "") {
      setaddresserr("Please Enter Address");
    }
    // else if (document_type === "null") {
    // }
    else if (document_num.current.value === "") {
      setdocument_numerr("Please Enter Document Number");
    } else if (Image === "null") {
      setImageerr("Please Select Image");
    } else {
      const imageupload = await Axios.post("/users/imageUpload", imageurl, {
        headers: { Authorization: localStorage.getItem("Mellifluous") },
      });
      // console.log(imageupload,"upload")
      if (imageupload?.data?.success) {
        const data = {
          first_name: firstname.current.value,
          last_name: lastname.current.value,
          phone_no: phonenumber.current.value,
          gender: gender,
          dob: dob,
          country: country,
          state: state.current.value,
          city: city.current.value,
          zipcode: zipcode.current.value,
          telegram: telegram.current.value,
          address: address.current.value,
          document_type: document_type,
          document_num: document_num.current.value,
          document_image: imageupload?.data?.result,
        };

        await Axios.post("users/createKyc", data, {
          headers: { Authorization: localStorage.getItem("Mellifluous") },
        })
          .then((res) => {
            // console.log(res,"created")
            toast.success("Kyc update successfully", {

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
              navigate(`${Constant.route}/Subscription`);
            }, 1300)

          })
          .catch((err) => {
            toast.error(err.response.data.message, {

              duration: 3000,
              position: "top-center",

              // Styling
              style: {
                padding: "1rem",
                fontSize: "15px",
                color: "greenred",
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
          });
      } else {
        toast.error("Something went wrong", {

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
    }
  };

  const [countryopen, setCountryOpen] = useState(false);
  const handleCountryOpen = () => setCountryOpen(true);
  const handleCountryClose = () => setCountryOpen(false);

  const [coin, setCoin] = useState({ image: "", name: "", code: "" });

  const handleSelectCoin = (country) => {
    setcountryerr(null);
    setCountry(country.name);
    setCoin({
      image: country.code,
      name: country.name,
      code: country.dial_code,
    });
    handleCountryClose();
  };

  const handleGenderChange = (event) => {
    setgendererr(null);
    setGender(event.target.value);
  };

  const handleDocumentChange = (event) => {
    setdocument_type(event.target.value);
  };

  const handleDateChange = (newValue) => {
    console.log(moment(newValue).format("YYYY-MM-DD"), "logs");
    setDatePickr(newValue);
    setdob(moment(newValue).format("YYYY-MM-DD"));
  };

  const handleExpireDateChange = (newValue) => {
    setexpiredate(newValue.$d);
  };

  return (
    <div className="kyc-form-portion">
      <Box sx={{ flexGrow: 1 }} className={classes.tabpartmarketout}>
        <Grid container spacing={2} className={classes.tabpartmarket}>
          {/* <Grid item xs={12} sm={12} md={12} lg={1} xl={1}></Grid>   */}

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.loginwhole}>
              <h2 className="alpha-login-text">KYC Verification</h2>

              <h3 className="sub-heading-part">Personal Information</h3>

              <Grid container spacing={2} className={classes.tabpartmarket}>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    label="First Name(Please use Real Name)"
                    variant="outlined"
                    className={classes.logintextbox}
                    inputRef={firstname}
                    onChange={() => {
                      setfirstnameerr(null);
                    }}
                    helperText={firstnameerr !== null ? firstnameerr : ""}
                  />
                  <p
                    style={{
                      color: "rgb(255 153 0)",
                      margin: "0px",
                      fontWeight: "600",
                    }}
                  >
                    Note: Name must match the information in the ID
                    Card/Passport
                  </p>
                  {/* {firstnameerr !== null ? <div style={{ color: "red" }}  >{firstnameerr}</div> : <></>} */}
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    label="Last Name"
                    variant="outlined"
                    className={classes.logintextbox}
                    inputRef={lastname}
                    onChange={() => {
                      setlastnameerr(null);
                    }}
                    helperText={lastnameerr !== null ? lastnameerr : ""}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    label="Phone Number"
                    type="number"
                    variant="outlined"
                    className={classes.input}
                    inputRef={phonenumber}
                    onChange={() => {
                      setphonenumbererr(null);
                    }}
                    helperText={phonenumbererr !== null ? phonenumbererr : ""}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  className="datepicpart"
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      label="Gender"
                      onChange={handleGenderChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <ArrowDropDownIcon />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                    <FormHelperText>{gendererr}</FormHelperText>
                  </FormControl>
                  {/* {firstnameerr !== null ? <div style={{ color: "red", flexDirection: "column" }}  >{"eras"}</div> : <></>} */}
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  className="datepicpart"
                >
                  {/* <TextField
      fullWidth
      required
        id="input-with-icon-textfield"
        label="Date of birth"
        variant="outlined"
        className={classes.logintextbox}
      /> */}

                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      label="DOB"
                      fullWidth
                      inputFormat="DD/MM/YYYY"
                      value={datepickr}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                      slotProps={{
                        textField: { helperText: datepickrerr },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CalendarMonthIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                {/* {firstnameerr !== null ? <div style={{ color: "red" }}  >{firstnameerr}</div> : <></>} */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  className="country-get-box-modal"
                >
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    label="Country"
                    variant="outlined"
                    className={classes.logintextbox}
                    onClick={handleCountryOpen}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <ArrowDropDownIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={`${coin.name}`}
                    helperText={countryerr !== null ? countryerr : ""}
                  />
                  <Modal
                    open={countryopen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className={classes.modalcoinselect}
                    he
                  >
                    <Box sx={style} className={classes.modalcoinselectbox}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Select Country{" "}
                        <CancelIcon onClick={handleCountryClose} />
                      </Typography>

                      <Paper
                        className={classes.searchboxwallet}
                        component="form"
                        sx={{
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="Search Country name"
                          inputProps={{ "aria-label": "search google maps" }}
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                        />
                        <IconButton
                          type="button"
                          sx={{ p: "10px" }}
                          aria-label="search"
                        >
                          <SearchIcon />
                        </IconButton>
                      </Paper>

                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <ul className="coin-list-menu country-detailed-list">
                          {baseURL?.map((country, index) => {
                            if (search) {
                              if (
                                country.name.includes(
                                  search?.charAt(0).toUpperCase() +
                                  search?.slice(1)
                                )
                              ) {
                                return (
                                  <>
                                    <li
                                      key={index}
                                      onClick={() => handleSelectCoin(country)}
                                    >
                                      <div className="coin-img country-img">
                                        <div className="coin-img-inner country-dtls">
                                          <div className="flag-image-code">
                                            <img
                                              src={`https://flagicons.lipis.dev/flags/4x3/${country.code.toLocaleLowerCase()}.svg`}
                                            />
                                          </div>
                                          <h3>{country.name}</h3>
                                        </div>
                                        <h4>{country.dial_code}</h4>
                                      </div>
                                    </li>
                                  </>
                                );
                              }
                            } else {
                              return (
                                <>
                                  {" "}
                                  <li
                                    key={index}
                                    onClick={() => handleSelectCoin(country)}
                                  >
                                    <div className="coin-img country-img">
                                      <div className="coin-img-inner country-dtls">
                                        <div className="flag-image-code">
                                          <img
                                            src={`https://flagicons.lipis.dev/flags/4x3/${country.code.toLocaleLowerCase()}.svg`}
                                          />
                                        </div>
                                        <h3>{country.name}</h3>
                                      </div>
                                      <h4>{country.dial_code}</h4>
                                    </div>
                                  </li>
                                </>
                              );
                            }
                          })}
                        </ul>
                      </Typography>
                    </Box>
                  </Modal>
                  {/* {firstnameerr !== null ? <div style={{ color: "red" }}  >{firstnameerr}</div> : <></>} */}
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    label="State"
                    variant="outlined"
                    className={classes.logintextbox}
                    inputRef={state}
                    onChange={() => {
                      setstateerr(null);
                    }}
                    helperText={stateerr !== null ? stateerr : ""}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    label="City"
                    variant="outlined"
                    className={classes.logintextbox}
                    inputRef={city}
                    onChange={() => {
                      setcityerr(null);
                    }}
                    helperText={cityerr !== null ? cityerr : ""}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    label="Zip/Postal Code"
                    variant="outlined"
                    type="number"
                    className={classes.input}
                    inputRef={zipcode}
                    onChange={() => {
                      setzipcodeerr(null);
                    }}
                    helperText={zipcodeerr !== null ? zipcodeerr : ""}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    label="Telegram Username"
                    variant="outlined"
                    className={classes.logintextbox}
                    inputRef={telegram}
                    onChange={() => {
                      settelegramerr(null);
                    }}
                    helperText={telegramerr !== null ? telegramerr : ""}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className="address-box"
                >
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    label="Address"
                    variant="outlined"
                    className={classes.logintextbox}
                    inputRef={address}
                    onChange={() => {
                      setaddresserr(null);
                    }}
                    helperText={addresserr !== null ? addresserr : ""}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <p
                    style={{
                      color: "rgb(255 153 0)",
                      margin: "0px",
                      fontWeight: "600",
                    }}
                  >
                    Note: Please type carefully and fil out the form with your
                    personal details. You are not allowed to edit the details
                    once you have submitted the application
                  </p>
                </Grid>
              </Grid>

              <h3 className="sub-heading-part">ID Proof Details</h3>

              <Grid container spacing={2} className={classes.tabpartmarket}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  className="datepicpart"
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      ID document type
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={document_type}
                      label="ID document type"
                      onChange={handleDocumentChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <ArrowDropDownIcon />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <MenuItem selected value="Passport">
                        Passport
                      </MenuItem>
                      {/* <MenuItem value='Pan Card'>Pan Card</MenuItem>
                      <MenuItem value='Driving License'>Driving License</MenuItem>
                      <MenuItem value='Voter ID'>Voter's ID</MenuItem> */}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    label="ID document number"
                    variant="outlined"
                    className={classes.logintextbox}
                    inputRef={document_num}
                    onChange={() => {
                      setdocument_numerr(null);
                    }}
                    helperText={document_numerr !== null ? document_numerr : ""}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  className="datepicpart"
                >
                  {/* <TextField
    fullWidth
    required
      id="input-with-icon-textfield"
      label="Expiry date"
      variant="outlined"
      className={classes.logintextbox}
    /> */}

                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      label="Expiry date"
                      fullWidth
                      inputFormat="DD/MM/YYYY"
                      value={expiredate}
                      onChange={handleExpireDateChange}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                      slotProps={{
                        textField: { helperText: expiredateerr },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CalendarMonthIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  className="datepicpart"
                ></Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  className="DOCUMENT-TYPE-UPLOAD"
                >
                  <div
                    className="inner-doc"
                    onClick={() =>
                      document.querySelector(".input-field").click()
                    }
                  >
                    <input
                      accept="image/png, image/jpeg, image/jpg"
                      className="input-field"
                      type="file"
                      onChange={({ target }) => {
                        if (target.files[0]) {
                          const formdata = new FormData();
                          formdata.append(
                            "image",
                            target.files[0],
                            target.files[0].name
                          );
                          setimageurl(formdata);

                          setImageerr(null);
                          setImage(URL.createObjectURL(target.files[0]));
                        }
                      }}
                      hidden={true}
                    />
                    {Image !== "null" ? (
                      <div>
                        <img
                          src={Image}
                          className="img-user"
                          alt="ID Front Document"
                        />
                      </div>
                    ) : (
                      <>
                        <h3>ID Front Document</h3>
                        <div className="image-front">
                          <img
                            src={Idfrontimg}
                            className="img-logo"
                            alt="ID Front Document"
                          />
                        </div>
                        <label htmlFor="uploadFront" className="upload-btn">
                          UPLOAD HERE
                        </label>
                      </>
                    )}
                  </div>
                  {Imageerr !== null ? (
                    <div style={{ color: "red" }}>{Imageerr}</div>
                  ) : (
                    <></>
                  )}
                </Grid>

                {/* <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='DOCUMENT-TYPE-UPLOAD'>
                  <div className='inner-doc'>
                    <h3>ID Back Document</h3>
                    <div className='image-front'><img src={Idbackimg} alt='ID Back Document' /></div>
                    <label htmlFor="uploadFront" className='upload-btn'>
                      UPLOAD HERE
                    </label>
                    <input accept="image/png, image/jpeg, image/jpg" id="uploadFront" type='file' hidden={true} />
                  </div>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='DOCUMENT-TYPE-UPLOAD'>
                  <div className='inner-doc'>
                    <h3>Selfie with ID Document</h3>
                    <div className='image-front'><img src={idselfieimg} alt='Selfie with ID Document' /></div>
                    <label htmlFor="uploadFront" className='upload-btn'>
                      UPLOAD HERE
                    </label>
                    <input accept="image/png, image/jpeg, image/jpg" id="uploadFront" type='file' hidden={true} />
                  </div>
                </Grid> */}
              </Grid>

              {/* <h3 className='sub-heading-part'>Proof Address</h3> */}

              {/* <Grid container spacing={2} className={classes.tabpartmarket}>


                <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='datepicpart flex-column'>

                  

                  <FormControl fullWidth className='id-type'>
                    <InputLabel id="demo-simple-select-label">ID document type</InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      label="ID document type"
                      onChange={handleGenderChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <ArrowDropDownIcon />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <MenuItem value={10}>Utility bills (gas, electricity, water)</MenuItem>
                      <MenuItem value={20}>Telephone / Internet bill (no cell phone bill)</MenuItem>
                      <MenuItem value={30}>Pension statement</MenuItem>
                      <MenuItem value={40}>Tax statement</MenuItem>
                      <MenuItem value={50}>Certificate of registration</MenuItem>
                      <MenuItem value={60}>Bank Confirmation</MenuItem>
                    </Select>
                  </FormControl>

                  <p className='color-dim'>The folowing documents are accepted</p>
                  <ul className='color-dim'>
                    <li>Utility bills (gas, electricity, water)</li>
                    <li>Telephone / Internet bill (no cell phone bill)</li>
                    <li>Pension statement</li>
                    <li>Tax statement</li>
                    <li>Certificate of registration</li>
                    <li>Bank Confirmation</li>
                  </ul>


                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='ID-document-number'>


                  <div className='inner-doc'>
                    <h3>Residential document or phone document upload</h3>
                    <div className='image-front'><img src={fileuploadimg} alt='Residential document or phone document upload' /></div>
                    <label htmlFor="uploadFront" className='upload-btn'>
                      UPLOAD HERE
                    </label>
                    <input accept='.pdf' id="uploadFront" type='file' hidden={true} />
                    <p className='para-cmn' style={{ paddingTop: '20px !important' }}>Please photograph the complete document. The document must contain the same address as your ID card</p>
                  </div>


                </Grid>


              </Grid> */}

              <Grid container spacing={2} className={classes.tabpartmarket}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className="datepicpart flex-column"
                >
                  <p
                    style={{
                      color: "rgb(255 153 0)",
                      margin: "0px",
                      fontWeight: "600",
                      marginTop: "30px",
                      marginBottom: "20px",
                    }}
                  >
                    Note To avoid delays with verification process, please
                    double-check to ensure the above requirements are fuly met.
                    Chosen credentials must not be expired
                  </p>

                  <ul className="color-dim">
                    <li>I have read the Terms and Condition and AML-KYC</li>
                    <li>
                      All the personal information I have entered is correct
                    </li>
                    <li>
                      I certify that, I am registering to participate in the
                      Matrixchnge distribution event(s) in the capacity of an
                      individual (and beneficial owner) and not as an agent or
                      representative of a third party corporate entity
                    </li>
                  </ul>
                </Grid>
              </Grid>

              <Grid>
                <Button className="kyc-form-submit-btn" onClick={onSubmit}>
                  Submit
                </Button>
              </Grid>
            </Item>
          </Grid>

          {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
    <Item className={classes.footercls}>
      <Footer />
    </Item>
    </Grid> */}

        </Grid>
      </Box>
    </div>
  );
};

export default KYCBody;
