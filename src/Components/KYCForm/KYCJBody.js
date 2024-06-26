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
import icon_passport_color from "../../images/icon-passport-color.png";
import icon_national_id_color from "../../images/icon-national-id-color.png";
import icon_licence_color from "../../images/icon-licence-color.png";
import consts from '../../Constansts';




import { useLocation } from "react-router-dom";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../../Axios";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import moment from "moment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { setConstantValue } from "typescript";


function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
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
  // var userData;
  const [userData, setUserdata] = useState('');
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

  const firstname = useRef(null);  //ref
  const lastname = useRef(null);
  const phonenumber = useRef(null);
  const [gender, setGender] = useState("null");
  // const [datepickr, setDatePickr] = useState(dayjs("2014-08-18"));
  const [datepickr, setDatePickr] = useState(null);
  const [dob, setdob] = useState(null);
  const [country, setCountry] = useState("null");   //state
  const state = useRef(null);
  const city = useRef(null);
  const zipcode = useRef(null);
  const telegram = useRef(null);
  const accountNumber = useRef('');
  const bankName = useRef('');
  const ifscCode = useRef('');
  const address = useRef('');
  const [document_type, setdocument_type] = useState("Passport");
  const document_num = useRef(null);
  const expiry_date = useRef(null);
  // const [expiredate, setexpiredate] = useState(dayjs("2014-08-18T21:11:54"));
  const [expiredate, setexpiredate] = useState(null);
  const [expiredate1, setexpiredate1] = useState(null);

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
  const [accerr, setAccerr] = useState(null);
  const [bank, setBankerr] = useState(null);
  const [ifscerr, settIfscerr] = useState(null);
  const [addresserr, setaddresserr] = useState(null);
  // const [document_typeerr, setdocument_typeerr] = useState(null)
  const [document_numerr, setdocument_numerr] = useState(null);
  const [expiredateerr, setexpiredateerr] = useState(null);
  const [Imageerr, setImageerr] = useState(null);
  const [documentimageerr, setdocumentimageerr] = useState(null);
  const [url, seturl] = useState();
  const [value, setValue] = useState(0);
  const [valuess, setValues] = useState('passport')

  // const [selectedDocumentName, setSelectedDocumentName] = React.useState("");
  // const documentType = {    //object
  //   0: 'passport',
  //   1: 'national card',
  //   2: "Driver's licence"
  // }

  useEffect(() => {
    console.log(valuess, "ramesh")
  }, [valuess])

  const handleChange = (event, newValue) => {
    console.log(newValue, "oooo")
    setValue(newValue)
    if (newValue === 0) {
      setValues("passport")
      setexpiredate(null)
    } else if (newValue === 1) {
      console.log(newValue, "111111")
      setValues("national card")
      setexpiredate(null)
    } else if (newValue === 2) {
      console.log(newValue, "222222")
      setValues("Driver's licence")
      setexpiredate(null)
    }
  };



  const onSubmit = async () => {
    if (firstname.current.value === "") {
      setfirstnameerr("Please Enter First Name");
      firstname.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    else if (lastname.current.value === "") {
      setlastnameerr("Please Enter Last Name");
      firstname.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    else if (phonenumber.current.value === "") {
      setphonenumbererr("Please Enter Phonenumber");
      phonenumber.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    else if (phonenumber.current.value?.length < 4) {
      setphonenumbererr("Phone Number Must be Greater than 4");
      phonenumber.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    else if (phonenumber.current.value?.length > 15) {
      setphonenumbererr("Phone Number Must be Less than 15");
      phonenumber.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    else if (gender === "null") {
      setgendererr("Please Select Gender");
      phonenumber.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // else if (datepickr.$d === "Mon Aug 18 2014 21:11:54 GMT+0530 (India Standard Time)") {
    //   setdatepickrerr("Please Select DOB");
    //   phonenumber.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }
    else if (datepickr === null) {
      setdatepickrerr("Please Select DOB");
      phonenumber.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    else if (datepickrerr != null) {
      setdatepickrerr(datepickrerr)
      phonenumber.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    else if (country === "null") {
      setcountryerr("Please Select Country");
      phonenumber.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    else if (state.current.value === "") {
      setstateerr("Please Enter State");
      state.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    else if (city.current.value === "") {
      setcityerr("Please Enter City");
      state.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    else if (zipcode.current.value === "") {
      setzipcodeerr("Please Enter ZIP Code");
      zipcode.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    else if (telegram.current.value === "") {
      settelegramerr("Please Enter Telegram Username");
      zipcode.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    else if (bankName.current.value == "") {
      setBankerr("Please Enter Bank Name");
      bankName.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    else if (accountNumber.current.value === "") {
      setAccerr("Please Enter Account Number");
      accountNumber.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    else if (ifscCode.current.value === "") {
      settIfscerr("Please Enter IFSC Code");
      ifscCode.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    else if (ifscerr != null) {
      console.log(ifscerr, 'ifscerr');
      settIfscerr("Invalid IFSC code")
      ifscCode.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    else if (address.current.value === "") {
      setaddresserr("Please Enter Address");
      address.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    // else if (document_type === "null") {
    // }
    else if (document_num.current.value === "") {
      setdocument_numerr("Please Enter Document Number");
      document_num.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    else if (expiredate === null) {
      setexpiredateerr("Please Select Expire Date")
      document_num.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    else if (Image === "null") {
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
          account_no: accountNumber.current.value,
          ifsc_code: ifscCode.current.value,
          bank_name: bankName.current.value,
          address: address.current.value,
          document_type: valuess,
          document_num: document_num.current.value,
          document_image: imageupload?.data?.result,
          expiry_date: expiredate1
        };
        console.log(data, "datasaaaa")

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
              console.log(userData, 'userData*******************');
              navigate(`${Constant.route}/Subscription`, { state: { userdetail: userData } });
            }, 1300)

          })
          .catch((err) => {
            if (err.response.data.message == 'Please Enter DOB') {
              setdatepickrerr("Please Select DOB");
              phonenumber.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
              toast.error(err.response.data.message, {

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
                  primary: "red",
                  secondary: "#fff",
                },

                // Aria
                ariaProps: {
                  role: "status",
                  "aria-live": "polite",
                },
              });
            } else {
              toast.error(err.response.data.message, {

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
                  primary: "red",
                  secondary: "#fff",
                },

                // Aria
                ariaProps: {
                  role: "status",
                  "aria-live": "polite",
                },
              });
            }

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
    console.log(newValue, 'newValue');
    // console.log(moment(newValue.$d).format("YYYY-MM-DD"), "logs");
    setDatePickr(dayjs(newValue));
    setdob(moment(newValue?.$d).format("YYYY-MM-DD"));

    const today = new Date();
    const date = moment(newValue?.$d).format("YYYY-MM-DD")
    const nda = date.split("-")[0];
    // console.log(nda, 'nda');
    const age = today.getFullYear() - nda;
    // console.log(age, 'age');
    if (newValue === '') {
      setdatepickrerr('Please Select Date');
    } else if (age < 18) {
      setdatepickrerr('You must be at least 18 years old');
    } else {
      setdatepickrerr(null);
    }
  };

  const handleErrorIfscChange = (e) => {
    const reg = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/;
    const ifsc = e.target.value
    console.log(ifsc, 'ifsc')
    if (ifsc === '') {
      settIfscerr(null);
    }
    else if (!(reg.test(ifsc))) {
      settIfscerr("Invalid IFSC code")
    } else {
      settIfscerr(null);
    }
  }

  const handleExpireDateChange = (newValue) => {
    console.log(newValue, 'value');
    setexpiredate(dayjs(newValue))
    setexpiredate1(moment(newValue?.$d).format("YYYY-MM-DD"));
    setexpiredateerr(null)
  };

  return (
    <div className="kyc-form-portion kyc-form-body-new">

      <Grid item xs={12} sm={3} md={3} lg={3} xl={3} className={classes.backItem}>
        <Button
          className="back-icon-page"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            navigate(`${consts.route}/`);
          }}
        >
          Back
        </Button>
      </Grid>
      <Box sx={{ flexGrow: 1 }} className={classes.tabpartmarketout}>
        <Grid container spacing={2} className={classes.tabpartmarket}>
          {/* <Grid item xs={12} sm={12} md={12} lg={1} xl={1}></Grid>   */}

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.loginwhole} id="kyc-verification-id">
              <h2 className="alpha-login-text">KYC Verification</h2>

              <div className="kyc-step-number-heading">
                <div className="kyc-step-number">01</div>
                <div className="kyc-step-heading">
                  <h3 className="sub-heading-part">Step 1: Personal Information</h3>
                  <p>Simple personal information, required for identification</p>
                </div>
              </div>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <p
                  style={{
                    color: "rgb(255 153 0)",
                    margin: "0px 0px 20px 0px",
                    fontWeight: "600",
                  }}
                >
                  Please carefully fill out the form with your personal details. Your can’t edit these details once you submitted the form.</p>
              </Grid>

              <Grid container spacing={2} className={classes.tabpartmarket} id="kyc-verification-id">
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <label>First Name</label>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    type="text"
                    variant="outlined"
                    className={classes.logintextbox}
                    inputRef={firstname}
                    onChange={() => {
                      setfirstnameerr(null);
                    }}
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z\s]*$/.test(event.key)) {
                        event.preventDefault();
                        setfirstnameerr("Enter Valid First Name")
                      }
                    }}
                    helperText={firstnameerr !== null ? firstnameerr : ""}
                  />
                  {/* <p
                    style={{
                      color: "rgb(255 153 0)",
                      margin: "0px",
                      fontWeight: "600",
                    }}
                  >
                    Note: Name must match the information in the ID
                    Card/Passport
                  </p> */}
                  {/* {firstnameerr !== null ? <div style={{ color: "red" }}  >{firstnameerr}</div> : <></>} */}
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <label>Last Name</label>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    variant="outlined"
                    className={classes.logintextbox}
                    inputRef={lastname}
                    onChange={() => {
                      setlastnameerr(null);
                    }}
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z\s]*$/.test(event.key)) {
                        event.preventDefault();
                        setlastnameerr("Enter Valid Last Name")
                      }
                    }}
                    helperText={lastnameerr !== null ? lastnameerr : ""}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <label>Phone Number</label>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    type="number"
                    variant="outlined"
                    className={classes.input}
                    inputRef={phonenumber}
                    onChange={() => {
                      setphonenumbererr(null);
                    }}
                    onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                        setphonenumbererr("Enter Valid Number")
                      }
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
                  <label>Gender</label>
                  <FormControl fullWidth>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
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

                  <label>DOB</label>
                  <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
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
                  <label>Country</label>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    variant="outlined"
                    className={classes.logintextbox}
                    onClick={handleCountryOpen}
                    value={`${coin.name}`}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <ArrowDropDownIcon />
                        </InputAdornment>
                      ),
                    }}
                  // helperText={countryerr !== null ? countryerr : ""}
                  />
                  <p style={{ color: "red" }}>{countryerr !== null ? countryerr : ""}</p>

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
                  <label>State</label>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    variant="outlined"
                    className={classes.logintextbox}
                    inputRef={state}
                    onChange={() => {
                      setstateerr(null);
                    }}
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z\s]*$/.test(event.key)) {
                        event.preventDefault();
                        setstateerr("Enter Valid State Name")
                      }
                    }}
                    helperText={stateerr !== null ? stateerr : ""}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <label>City</label>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    variant="outlined"
                    className={classes.logintextbox}
                    inputRef={city}
                    onChange={() => {
                      setcityerr(null);
                    }}
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z\s]*$/.test(event.key)) {
                        event.preventDefault();
                        setcityerr("Enter Valid City Name")
                      }
                    }}
                    helperText={cityerr !== null ? cityerr : ""}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <label>Zip/Postal Code</label>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    variant="outlined"
                    type="number"
                    className={classes.input}
                    inputRef={zipcode}
                    onChange={() => {
                      setzipcodeerr(null);
                    }}
                    onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                        setzipcodeerr("Enter Valid Postal Code")
                      }
                    }}
                    helperText={zipcodeerr !== null ? zipcodeerr : ""}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <label>Telegram Username</label>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    variant="outlined"
                    className={classes.logintextbox}
                    inputRef={telegram}
                    onChange={() => {
                      settelegramerr(null);
                    }}
                    helperText={telegramerr !== null ? telegramerr : ""}
                  />
                </Grid>


                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <label>Bank Name</label>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    variant="outlined"
                    className={classes.logintextbox}
                    inputRef={bankName}
                    onChange={() => {
                      setBankerr(null)
                    }}
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z\s]*$/.test(event.key)) {
                        event.preventDefault();
                        setBankerr("Enter Valid Bank Name")
                      }
                    }}
                    helperText={bank !== null ? bank : ""}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <label>Account Number</label>
                  <TextField
                    fullWidth
                    required
                    // type="number"
                    id="input-with-icon-textfield"
                    variant="outlined"
                    className={classes.logintextbox}
                    inputRef={accountNumber}
                    onChange={() => {
                      setAccerr(null)
                    }}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                        setAccerr("Enter Valid Account Number")
                      }
                    }}
                    helperText={accerr !== null ? accerr : ""}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <label>IFSC Code</label>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    variant="outlined"
                    className={classes.logintextbox}
                    inputRef={ifscCode}
                    // onChange={() => {
                    //   settIfscerr(null);
                    // }}
                    onChange={(e) => { handleErrorIfscChange(e) }}
                    helperText={ifscerr !== null ? ifscerr : ""}
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
                  <label>Address</label>
                  <TextField
                    fullWidth
                    required
                    id="input-with-icon-textfield"
                    variant="outlined"
                    className={classes.logintextbox}
                    inputRef={address}
                    onChange={() => {
                      setaddresserr(null);
                    }}
                    helperText={addresserr !== null ? addresserr : ""}
                  />
                </Grid>

                {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                </Grid> */}
              </Grid>

              <div className="kyc-step-number-heading">
                <div className="kyc-step-number">02</div>
                <div className="kyc-step-heading">
                  <h3 className="sub-heading-part">ID Proof Details</h3>
                  <p>Upload documents to verify your indentity.</p>
                </div>
              </div>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <p
                  style={{
                    color: "rgb(255 153 0)",
                    margin: "0px 0px 20px 0px",
                    fontWeight: "600",
                  }}
                >
                  Please upload any of the following personal document.</p>
              </Grid>

              <Grid container spacing={2} className={classes.tabpartmarket}>

                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="pncdl">
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      {console.log(value, "valuesssss")}
                      <Tab icon={<Avatar alt="test avatar" src={icon_passport_color} />} label="passport" {...a11yProps(0)} />
                      <Tab icon={<Avatar alt="test avatar" src={icon_national_id_color} />} label="national card" {...a11yProps(1)} />
                      <Tab icon={<Avatar alt="test avatar" src={icon_licence_color} />} label="Driver's licence" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    <Grid container spacing={2} className={classes.tabpartmarket}>
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <label>ID document number</label>
                        <TextField
                          fullWidth
                          required
                          id="input-with-icon-textfield"
                          variant="outlined"
                          className={classes.logintextbox}
                          inputRef={document_num}
                          onChange={() => {
                            setdocument_numerr(null);
                          }}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                              setdocument_numerr("Enter Valid Document Number")
                            }
                          }}
                          helperText={document_numerr !== null ? document_numerr : ""}
                        />
                        {/* {console.log(document_num, "docsss")} */}
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

                        <label>Expiry date</label>
                        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                          <MobileDatePicker
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
                        lg={12}
                        xl={12}
                        className="datepicpart flex-column"
                      >
                        <p
                          style={{
                            color: "#25deb0",
                            margin: "0px",
                            fontWeight: "600",
                            marginTop: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          To avoid delays when verifying account, Please make sure below:
                        </p>

                        <ul className="color-dim">
                          <li>Choosen credential must not be expired.</li>
                          <li>Document should be good condition and clearly visible.</li>
                          <li>Make sure that there is no light glare on the card.</li>
                        </ul>
                      </Grid>
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
                    </Grid>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    <Grid container spacing={2} className={classes.tabpartmarket}>
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <label>ID document number</label>
                        <TextField
                          fullWidth
                          required
                          id="input-with-icon-textfield"
                          variant="outlined"
                          className={classes.logintextbox}
                          inputRef={document_num}
                          onChange={() => {
                            setdocument_numerr(null);
                          }}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                              setdocument_numerr("Enter Valid Document Number")
                            }
                          }}
                          helperText={document_numerr !== null ? document_numerr : ""}
                        />
                        {console.log(document_num, "docsss1")}
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

                        <label>Expiry date</label>
                        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                          <MobileDatePicker
                            fullWidth
                            inputFormat="DD/MM/YYYY"
                            value={expiredate}
                            onChange={handleExpireDateChange}
                            // onChange={() => { handleExpireDateChange(); setexpiredateerr(null) }}
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
                        lg={12}
                        xl={12}
                        className="datepicpart flex-column"
                      >
                        <p
                          style={{
                            color: "#25deb0",
                            margin: "0px",
                            fontWeight: "600",
                            marginTop: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          To avoid delays when verifying account, Please make sure below:
                        </p>

                        <ul className="color-dim">
                          <li>Chosen credential must not be expaired.</li>
                          <li>Document should be good condition and clearly visible.</li>
                          <li>Make sure that there is no light glare on the card.</li>
                        </ul>
                      </Grid>
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
                    </Grid>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={2}>
                    <Grid container spacing={2} className={classes.tabpartmarket}>
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <label>ID document number</label>
                        <TextField
                          fullWidth
                          required
                          id="input-with-icon-textfield"
                          variant="outlined"
                          className={classes.logintextbox}
                          inputRef={document_num}
                          onChange={() => {
                            setdocument_numerr(null);
                          }}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                              setdocument_numerr("Enter Valid Document Number")
                            }
                          }}
                          helperText={document_numerr !== null ? document_numerr : ""}
                        />
                        {console.log(document_num, "docsss22")}
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

                        <label>Expiry date</label>
                        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                          <MobileDatePicker
                            fullWidth
                            inputFormat="DD/MM/YYYY"
                            value={expiredate}
                            onChange={handleExpireDateChange}
                            // onChange={() => { handleExpireDateChange(); setexpiredateerr(null) }}
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
                        lg={12}
                        xl={12}
                        className="datepicpart flex-column"
                      >
                        <p
                          style={{
                            color: "#25deb0",
                            margin: "0px",
                            fontWeight: "600",
                            marginTop: "10px",
                            marginBottom: "20px",
                          }}
                        >
                          To avoid delays when verifying account, Please make sure below:
                        </p>

                        <ul className="color-dim">
                          <li>Chosen credential must not be expaired.</li>
                          <li>Document should be good condition and clearly visible.</li>
                          <li>Make sure that there is no light glare on the card.</li>
                        </ul>
                      </Grid>
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
                    </Grid>
                  </CustomTabPanel>
                </Box>

                {/* <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  className="datepicpart"
                >
                  <label>ID document type</label>
                  <FormControl fullWidth>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={document_type}
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
                    </Select>
                  </FormControl>
                </Grid> */}

              </Grid>

              {/* <Grid container spacing={2} className={classes.tabpartmarket}>
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
              </Grid> */}

              <Grid>
                <Button className="kyc-form-submit-btn" onClick={onSubmit}>
                  Submit
                </Button>
              </Grid>
            </Item>
          </Grid>

        </Grid>
      </Box>
    </div>
  );
};

export default KYCBody;
