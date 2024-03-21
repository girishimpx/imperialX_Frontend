import React from "react";
import "./StrategyHistroy.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Constant from "../../Constansts";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { makeStyles } from "@mui/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({

  tableContainer: {
    background: "transparent !important",
    marginTop: "6%",
    // border: "1px solid #25DEB0 !important",
  },
  tablestructre: {

    "& th": {
      color: "#FFF",
      borderBottom: "1px solid rgb(58 57 57) !important",
      whiteSpace: "nowrap",
    },
    // "& th:first-child": {
    //  width:'40% !important'
    // },
    "& td": {
      color: "#FFF",

      whiteSpace: "nowrap",
      "& button": {
        margin: "0px 10px !important",
      },
      "& td:nth-child(even)": {
        borderBottom: "1px solid rgb(58 57 57) !important",
      }
    },
  },

  
  strategyinner: {
    background: 'transparent !important'
  },
  bgwhite: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
});

const StrategyHistroy = ({ sideBarShow, setSideBarShow }) => {
  const classes = useStyles();
  const data = [
    { "name": "Dhara", "age": "2", "DOb": "1" },
    { "name": "Nar", "age": "3", "DOb": "12" }
  ]
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.strategyinner}>
              <div className="StrategyHistory-contain">
                <h4 className="strat">Strategy history</h4>
                <Paper sx={{ width: "100%", mb: 2 }} className={classes.bgwhite}>
                  <TableContainer>

                    <Table
                      sx={{ minWidth: 650 }}
                      aria-labelledby="tableTitle"
                      className={classes.tablestructre}
                    >
                   
                      <TableBody>
                        <TableRow>
                          <TableCell align="center">
                            <div className="sub">
                              ETH - USDT<br></br>
                              Isolated, Hedge
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              Side<br></br>
                              <span>LONG</span>
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              Type<br></br>
                              Close
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              Leverage<br></br>x3
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              %<br></br>100.00%
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              Price<br></br>1'888.00000000
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              Executed<br></br>28 Apr 2023 <br></br>22:22:50
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">
                            <div className="sub">
                              ETH - USDT<br></br>
                              Isolated, Hedge
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              Side<br></br>
                              <span>LONG</span>
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              Type<br></br>
                              Close
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              Leverage<br></br>x3
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              %<br></br>100.00%
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              Price<br></br>1'888.00000000
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              Executed<br></br>28 Apr 2023 <br></br>22:22:50
                            </div>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="center">
                            <div className="sub">
                              ETH - USDT<br></br>
                              Isolated, Hedge
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              Side<br></br>
                              <span>LONG</span>
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              Type<br></br>
                              Close
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              Leverage<br></br>x3
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              %<br></br>100.00%
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              Price<br></br>1'888.00000000
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="sub">
                              Executed<br></br>28 Apr 2023 <br></br>22:22:50
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    
                    </Table>
                  </TableContainer>

                </Paper>
                {/* <div className="whole-rate ending">
                  <div className="rate">
                    <label>Margin Changes</label>
                    <label>Liquidations</label>
                    <label>Cash Flow</label>
                  </div>
                </div>

                <div className="strategy-rate first">
                  <div className="sub">
                    ETH - USDT<br></br>
                    Isolated, Hedge
                  </div>
                  <div className="sub">
                    Side<br></br>
                    <span>LONG</span>
                  </div>
                  <div className="sub">
                    Type<br></br>
                    Close
                  </div>
                  <div className="sub">
                    Leverage<br></br>x3
                  </div>
                </div>
                <div className="strategy-rate second">
                  <div className="sub">
                    %<br></br>100.00%
                  </div>
                  <div className="sub">
                    Price<br></br>1'888.00000000
                  </div>
                  <div className="sub">
                    Executed<br></br>28 Apr 2023 <br></br>22:22:50
                  </div>
                </div>

                <div className="strategy-rate">
                  <div className="sub">
                    ETH - USDT<br></br>
                    Isolated, Hedge
                  </div>
                  <div className="sub">
                    Side<br></br>
                    <span>LONG</span>
                  </div>
                  <div className="sub">
                    Type<br></br>
                    Close
                  </div>
                  <div className="sub">
                    Leverage<br></br>x3
                  </div>
                </div>
                <div className="strategy-rate">
                  <div className="sub">
                    %<br></br>100.00%
                  </div>
                  <div className="sub">
                    Price<br></br>1'888.00000000
                  </div>
                  <div className="sub">
                    Executed<br></br>28 Apr 2023 <br></br>22:22:50
                  </div>
                </div> */}
              </div>
            </Item>
          </Grid>
        </Grid>

      </Box>
    </div>
  );
};

export default StrategyHistroy;
