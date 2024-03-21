import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import "./Wallet.css";
import Axios from "../../Axios";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./Transfer.css";
import swappingimperial from "../../images/swapping-imperial.png";
import consts from "../../Constansts";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    height: 48,
    padding: "0 30px",
  },
  sidebarcls: {
    background: "#010712 !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    overflow: "hidden",
    position: "sticky !important",
    top: "0px",
    padding: "0px !important",
    height: "100vh",
  },
  headercls: {
    background: "#131a26 !important",
    borderRadius: "0px !important",
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
  walletbodycls: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
  walletbalancecls: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
  tradeviewinner: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
  walletcls: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
});

function createData(cryptth, amountth, fromth, toth, dateth) {
  return { cryptth, amountth, fromth, toth, dateth };
}

const rows = [
  createData("USDT", "2,00,000,0000", "Funding", "Trading", "21/01/2024"),
  createData("USDT", "1,90,000,0000", "Funding", "Trading", "21/01/2024"),
  createData("USDT", "2,90,000,0000", "Funding", "Trading", "21/01/2024"),
  createData("USDT", "3,09,800,0000", "Funding", "Trading", "21/01/2024"),
  createData("USDT", "2,40,000,0000", "Funding", "Trading", "21/01/2024"),
];

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Transfer = ({
  sideBarShow,
  setSideBarShow,
  openSideBar,
  setOpenSideBar,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [valueTable, setValueTable] = React.useState(0);
  const [formData, setFormData] = useState({
    assetValue: "",
    fromValue: "",
    toValue: "",
    amountValue: "",
  });

  const [pairs, setPairs] = useState([]);

  const [types, setTypes] = useState([
    {
      name: "Funding",
    },
    {
      name: "Trading",
    },
  ]);

  const [list, setList] = useState([]);
  const [listNull, setListNull] = useState(false);
  const navigate = useNavigate()


  const [balance, setBalance] = useState(0);
  const [secType, setSecType] = useState("");
  const handleChangeAsset = (event) => {
    setFormData({ ...formData, assetValue: event.target.value });
  };

  const handleFromChange = (event) => {
    setFormData({ ...formData, fromValue: event.target.value });
  };

  const handleToChange = (data) => {
    console.log(data, "data");
    setFormData({ ...formData, toValue: data });
  };

  const handleAmountChange = (event) => {
    setFormData({ ...formData, amountValue: event.target.value });
  };

  const isSubmitDisabled = () => {
    return (
      formData.assetValue === "" ||
      formData.fromValue === "" ||
      secType == "" ||
      formData.amountValue === "" ||
      balance == 0
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeTable = (event, newValue) => {
    setValueTable(newValue);
  };

  const internalTransfers = async () => {
    try {
      const { data } = await Axios.get(`/users/getInternalTransfer`, {
        headers: { Authorization: window.localStorage.getItem("Mellifluous") },
      });
      console.log(data, "datasf");
      if (data?.success == true) {
        setList(data?.result);
      } else {
        setListNull(true);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: Transfer.js:205 ~ internalTransfers ~ error:",
        error
      );
    }
  };

  const fundingBalance = async (ccy, type) => {
    console.log(ccy, type, "types");
    try {
      const { data } = await Axios.post(
        `/wallet/subAccountFundingBalance`,
        {
          ccy: ccy,
          type: type,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("Mellifluous"),
          },
        }
      );
      if (data?.success == true) {
        if (type == "funding") {
          setBalance(data?.result?.bal);
        } else {
          const dts = data?.result?.details;
          if (dts?.length > 0) {
            for (let i = 0; i < dts.length; i++) {
              const element = dts[i];
              if (ccy == element?.ccy) {
                setBalance(element?.cashBal);
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPairs = async () => {
    try {
      const { data } = await Axios.get(
        `${consts.BackendUrl}/wallet/getWalletById`,
        {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          },
        }
      );
      console.log("🚀 ~ file: Transfer.js:188 ~ getPairs ~ data:", data);
      setPairs(data?.result);
    } catch (error) {
      console.log("🚀 ~ file: Transfer.js:197 ~ getPairs ~ error:", error);
    }
  };

  const transferAmount = async () => {
    try {
      console.log(formData.amountValue, balance, "formData");
      if (Number(formData?.amountValue) <= Number(balance)) {
        var payload = {
          Amount: formData?.amountValue,
          Currency: formData?.assetValue,
          from: formData?.fromValue === "Funding" ? "6" : "18",
          to: secType === "Funding" ? "6" : "18",
        };
        console.log(payload, "payload");
        const { data } = await Axios.post(`/users/transferFunds`, payload, {
          headers: {
            Authorization: window.localStorage.getItem("Mellifluous"),
          },
        });
        if (data?.success == true) {
          internalTransfers();
          toast.success("Amount Transfer Successfully");
        } else {
          toast.error("Something Went Wrong ");
        }
      } else {
        toast.error("You Don't Have Balance ");
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: Transfer.js:220 ~ transferAmount ~ error:",
        error
      );
      toast.error("Something Went Wrong ");
    }
  };

  useEffect(() => {
    getPairs();
    internalTransfers();
  }, []);

  return (
    <div className="transfer-main-page">
      <Toaster />
      <Box sx={{ flexGrow: 1 }}>
      
        <Grid container spacing={0}>
          {/* <Grid item xs={12} sm={12} md={12} lg={2} xl={2}> */}
          <Item className={classes.sidebarcls}>
            <Sidebar
              sideBarShow={sideBarShow}
              setSideBarShow={setSideBarShow}
              openSideBar={openSideBar}
              setOpenSideBar={setOpenSideBar}
            />
          </Item>
          {/* </Grid> */}
          <Grid
            id={sideBarShow ? "z-index-prop-postve" : "z-index-prop-negtve"}
            className="Wallet-Deposit-Body-right-class"
            item
            xs={12}
            sm={12}
            md={12}
            lg={10}
            xl={10}
          >
            <Item className={classes.headercls}>
              <Header
                sideBarShow={sideBarShow}
                setSideBarShow={setSideBarShow}
                openSideBar={openSideBar}
                setOpenSideBar={setOpenSideBar}
              />

              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Item className={classes.walletbodycls}>
                      <h3 className="welcome-msg">Transfer</h3>
                    </Item>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    className="transfer-tabs-class"
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Funding and trading" {...a11yProps(0)} />
                    {/* <Tab label="Main and sub-account" {...a11yProps(1)} /> */}
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <Grid
                    className="tanfer-form-field"
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={7}
                    xl={7}
                  >
                    <div>
                      <label>Asset</label>
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={formData.assetValue}
                          onChange={handleChangeAsset}
                        >
                          {pairs?.map((item, index) => {
                            return (
                              <MenuItem
                                value={item?.symbol}
                                onClick={() => {
                                  // setBalance(item?.balance);
                                }}
                              >
                                {item?.symbol}{" "}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="flex-row-swapping">
                      <div className="flex-row-swapping-from">
                        <label>From</label>
                        {/* <TextField fullWidth id="outlined-basic" placeholder='Funding' variant="outlined" value={formData.fromValue} onChange={handleFromChange} /> */}
                        <FormControl fullWidth>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.fromValue}
                            onChange={handleFromChange}
                          >
                            {types?.map((item, index) => {
                              return (
                                <MenuItem
                                  value={item?.name}
                                  onClick={() => {
                                    if (item?.name == "Funding") {
                                      fundingBalance(
                                        formData.assetValue,
                                        "funding"
                                      );
                                      setSecType("Trading");
                                    } else {
                                      fundingBalance(
                                        formData.assetValue,
                                        "trading"
                                      );
                                      setSecType("Funding");
                                    }
                                  }}
                                >
                                  {item?.name}{" "}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="swapping-button">
                        <img src={swappingimperial} alt="swappingimperial" />
                      </div>
                      <div className="flex-row-swapping-to">
                        <label>To</label>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          placeholder="Trading"
                          variant="outlined"
                          value={secType}
                        />
                      </div>
                    </div>
                    <div>
                      <label>Amount</label>
                      <OutlinedInput
                        fullWidth
                        id="outlined-adornment-weight"
                        endAdornment={
                          <InputAdornment position="end">
                            {formData.assetValue}
                          </InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                        }}
                        value={formData.amountValue}
                        onChange={handleAmountChange}
                      />
                      <div className="available-balance-for-transfer">
                        <label>Available:</label>
                        <span>
                          {balance} {formData.assetValue}
                        </span>
                      </div>
                      {/* <TextField fullWidth id="outlined-basic" endAdornment={<InputAdornment position="end">USD</InputAdornment>} variant="outlined" value="" /> */}
                    </div>
                    <div className="tanfer-form-field-button">
                      <Button
                        disabled={isSubmitDisabled()}
                        variant="contained"
                        sx={{ mt: 1, mr: 1 }}
                        onClick={() => {
                          transferAmount();
                        }}
                      >
                        Transfer
                      </Button>
                    </div>
                  </Grid>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  Item Two
                </CustomTabPanel>
              </Box>
              <Box sx={{ width: "100%" }} className="table-transfer-table">
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    className="transfer-tabs-class"
                    value={valueTable}
                    onChange={handleChangeTable}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Transfer history" {...a11yProps(0)} />
                    {/* <Tab label="Transfer history" {...a11yProps(1)} /> */}
                  </Tabs>
                </Box>
                <CustomTabPanel value={valueTable} index={0}>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Crypto</TableCell>
                          <TableCell align="right">Amount</TableCell>
                          <TableCell align="right">From</TableCell>
                          <TableCell align="right">To</TableCell>
                          <TableCell align="right">Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listNull == false ? (
                          list?.map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell scope="row">{row.Currency}</TableCell>
                              <TableCell align="right">{row.Amount}</TableCell>
                              <TableCell align="right">{row.from}</TableCell>
                              <TableCell align="right">{row.to}</TableCell>
                              <TableCell align="right">
                                {row.createdAt
                                  ? row.createdAt?.split("T")[0]
                                  : ""}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <></>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CustomTabPanel>
                <CustomTabPanel value={valueTable} index={1}></CustomTabPanel>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Transfer;
