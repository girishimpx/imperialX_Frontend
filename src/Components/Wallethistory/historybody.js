import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Axios from "../../Axios";
import Consts from "../../Constansts";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

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

const Historybody = () => {
  const useStyles = makeStyles({
    tableContainer: {
      background: "black !important",
      marginTop: "6%",
      border: "1px solid #25DEB0 !important",
    },
    table: {
      background: "black !important",
      borderRadius: "4px",
    },
    tableCell: {
      borderTop: "1px solid #25DEB0 !important",
      borderBottom: "1px solid #25DEB0 !important",
      padding: "20px 23px !important",
    },
  });

  const classes = useStyles();
  const [list, setList] = useState([]);
  const [loading, setloading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [value, setValue] = React.useState(0);
  const [show, setShow] = React.useState(true);



  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users'))

    if (users?.trader_type == 'master') {
      setShow(false);
    }

    if (users?.trader_type == 'master') {
      setList([])
      Axios.get(
        `${Consts.BackendUrl}/trade/tradeHistorypaginate?limit=${limit}&page=${page}`,
        {
          headers: {
            Authorization: localStorage.getItem("Mellifluous"),
          },
        }
      ).then((res) => {
        console.log(res.data, "okkk")
        if (res.data.result) {
          setList(res.data.result);
        }
        setloading(false);
      }).catch(err => {
        setloading(false);
      });
    } else {
      if (value == 0) {
        setList([])
        Axios.get(
          `${Consts.BackendUrl}/trade/copytradeHistorypaginate?limit=${limit}&page=${page}`,
          {
            headers: {
              Authorization: localStorage.getItem("Mellifluous"),
            },
          }
        ).then((res) => {
          if (res.data.result) {

            setList(res.data.result.docs);
          }
          setloading(false);
        }).catch(err => {

          setloading(false);

        });
      } else {
        setList([])
        Axios.get(
          `${Consts.BackendUrl}/trade/tradeHistorypaginate?limit=${limit}&page=${page}`,
          {
            headers: {
              Authorization: localStorage.getItem("Mellifluous"),
            },
          }
        ).then((res) => {
          if (res.data.result) {
            setList(res.data.result );
          }
          setloading(false);
        }).catch(err => {

          setloading(false);

        });
      }
    }
  }, [value, limit, page]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <div style={{ margin: "2rem 0 -3rem 0" }}>
        {" "}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            aria-label="basic tabs example"
            id="tabstylecrypto"
            className="all-master-tabs-outer"
            value={value}
            onChange={handleChange}
          >
            {show && <Tab label="Copy Trade" {...a11yProps(0)} />}
            <Tab label="Trade" {...a11yProps(show ? 1 : 0)} />
          </Tabs>
        </Box>
      </div>

      <TabPanel
        value={value}
        index={show ? 0 : 1}
        className="spot-graph-chart-tab-content"
      >
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Box sx={{ overflowX: "auto" }}>
            <Table
              sx={{ minWidth: 650 }}
              className={classes.table}
              id="common-color-white"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    Trade Pair
                  </TableCell>
                  <TableCell className={classes.tableCell}>Exchange</TableCell>
                  <TableCell className={classes.tableCell}>Order Id</TableCell>
                  <TableCell className={classes.tableCell}>Trade At</TableCell>
                  <TableCell className={classes.tableCell}>Price</TableCell>
                  <TableCell className={classes.tableCell}>Volume</TableCell>
                  <TableCell className={classes.tableCell}>
                    Order Type
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    Trade Type
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log(list, "hlo")}
                {list &&
                  list.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className={classes.tableCell}>
                        {row.pair ? row.pair : "-"}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.exchange ? row.trade_at : "imperial"}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.order_id ? row.order_id : "-"}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.trade_at ? row.trade_at : "-"}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <span id={row.trade_type == "buy" ? "green" : "red"}>
                          {row.price ? row.price : "-"}
                        </span>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.volume ? row.volume : "-"}
                      </TableCell>
                      {console.log(row, "row")}
                      <TableCell className={classes.tableCell}>
                        {row.order_type ? row.order_type : "-"}
                      </TableCell>
                      <TableCell
                        style={{
                          color: `${row.trade_type == "buy"
                            ? "#25DEB0 !important"
                            : "rgb(202, 63, 100) !important"
                            }`,
                        }}
                        className={classes.tableCell}
                      >
                        <span id={row.trade_type == "buy" ? "green" : "red"}>
                          {row.trade_type ? row.trade_type : "-"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            {!loading && !list && (
              <div>
                <h3 style={{ color: "white", padding: "1rem" }}>
                  Data Not Found
                </h3>
              </div>
            )}

            {loading && (
              <div style={{ padding: "1rem" }}>
                <CircularProgress size={60} />
                <p>Loading...</p>
              </div>
            )}
          </Box>
        </TableContainer>
      </TabPanel>
      <TabPanel
        value={value}
        index={show ? 1 : 0}
        className="spot-graph-chart-tab-content"
      >
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Box sx={{ overflowX: "auto" }}>
            <Table
              sx={{ minWidth: 650 }}
              className={classes.table}
              id="common-color-white"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    Trade Pair
                  </TableCell>
                  <TableCell className={classes.tableCell}>Exchange</TableCell>
                  <TableCell className={classes.tableCell}>Order Id</TableCell>
                  <TableCell className={classes.tableCell}>Trade At</TableCell>
                  <TableCell className={classes.tableCell}>Price</TableCell>
                  <TableCell className={classes.tableCell}>Volume</TableCell>
                  <TableCell className={classes.tableCell}>
                    Order Type
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    Trade Type
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list &&
                  list?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className={classes.tableCell}>
                        {row.pair ? row.pair : "-"}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.exchange ? row.trade_in : "imperial"}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.order_id ? row.order_id : "-"}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.trade_at ? row.trade_at : "-"}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <span id={row.trade_type == "buy" ? "green" : "red"}>
                          {row.price ? row.price : "-"}
                        </span>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.volume ? row.volume : "-"}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.order_type ? row.order_type : "-"}
                      </TableCell>
                      <TableCell
                        style={{
                          color: `${row.trade_type == "buy"
                            ? "#25DEB0 !important"
                            : "rgb(202, 63, 100) !important"
                            }`,
                        }}
                        className={classes.tableCell}
                      >
                        <span id={row.trade_type == "buy" ? "green" : "red"}>
                          {row.trade_type ? row.trade_type : "-"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            {!loading && !list && (
              <div>
                <h3 style={{ color: "white", padding: "1rem" }}>
                  Data Not Found
                </h3>
              </div>
            )}

            {loading && (
              <div style={{ padding: "1rem" }}>
                <CircularProgress size={60} />
                <p>Loading...</p>
              </div>
            )}
          </Box>
        </TableContainer>
      </TabPanel>
      {page > 1 && (
        <div className="paginationdiv">
          <Pagination
            id="pagination-button-color"
            onClick={(event) => {
              setPage(event.target.textContent);
            }}
            count={page}
            variant="outlined"
            color="secondary"
          />
        </div>
      )}
    </>
  );
};
export default Historybody;
