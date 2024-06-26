import React, { useEffect, useState } from "react";
// import {useEffect} from "react";


import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import CircularProgress from '@mui/material/CircularProgress';
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

function createData(price, amount, total, pair) {
  return { price, amount, total, pair };
}

let rows = [];

const useStyles = makeStyles({
  sellingtable: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    height: '100%',
  },
  sellingtableouter: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
    height: '45vh',
    overflow: 'hidden',
    "& th": {
      color: "#909090 !important",
      fontSize: "10px !important",
      padding: "2px 0 !important",
      border: "none !important",
    },
    "& td": {
      fontSize: "12px",
      padding: "2px 0 !important",
      border: "none !important",
      color: "#fff !important",
      "&:first-child": {
        color: "#25A750 !important",
      },
    },
  },
});

export default function SellingTable({ ticker, setSelected, pair, market }) {
  const classes = useStyles();

  // console.log(pair,'TICKERsetSelected');
  (() => {
    if (ticker) {
      if (rows.length == 21) {
        rows.shift();
        rows.push(createData(ticker[0], ticker[1], (ticker[0] * ticker[1]).toFixed(4), ticker[4]));
      } else {
        rows.push(createData(ticker[0], ticker[1], (ticker[0] * ticker[1]).toFixed(4), ticker[4]));
      }
    }
  }
  )();
  // useEffect(() => {
  //   console.log("===>",ticker, setSelected, pair )
  // },[])
  useEffect(() => {

    rows = []
  }, [pair]);

  return (
    <TableContainer component={Paper} className={classes.sellingtableouter}>
      <Table
        aria-label="simple table"
        style={{ tableLayout: "fixed" }}
        className={classes.sellingtable}
      >
        <TableHead>
{
          // <TableRow>
          //   <TableCell align="left">
          //     Price( {pair ? pair.split('-')[1] : "USDT"} )
          //   </TableCell>
          //   <TableCell align="right">
          //     {/* Amount({ticker ? ticker[4].split("-")[0] : "USD"}) */}
          //     Amount({pair ? pair.split('-')[0] : "BTC"} )

          //   </TableCell>
          //   {/* <TableCell align="right">Total({ticker ? ticker[4].split("-")[0] : "USD"})</TableCell> */}
          //   <TableCell align="right">Total</TableCell>

          // </TableRow>
}          
          <TableRow>
            <TableCell align="left">
              Price({pair.substring(pair.length - 4) || "USDT"})
            </TableCell>
            <TableCell align="right">
              {/* Amount({ticker ? ticker[4].split("-")[0] : "USD"}) */}
              Amount({pair.substring(0, pair.length - 4) || "BTC"})

            </TableCell>
            {/* <TableCell align="right">Total({ticker ? ticker[4].split("-")[0] : "USD"})</TableCell> */}
            <TableCell align="right">Total</TableCell>

          </TableRow>
        </TableHead>
        {/* {console.log(rows,'rowsORDER')} */}
        {rows?.length > 5 && <TableBody>
          {rows.map((row, index) => (
            <TableRow

              key={index}
              onClick={() => {
                // console.log(row,'CLICKERROR')
                let vals = row;
                vals.from = "sell";
                setSelected(vals);
              }}
              sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
            >
              <TableCell align="left">
                {/* {Number(row.price).toLocaleString()} */}
                {row.price ? Number(row.price) : 0}
              </TableCell>
              <TableCell align="right">{row.amount ? Number(row.amount) : 0}</TableCell>
              <TableCell align="right">{row.total != "NaN" ? row.total : 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>}
      </Table>
      {rows.length < 5 && <div style={{ textAlign: "center", display: "block" }}>
        <CircularProgress sx={{ margin: "20px" }} />
      </div>}
    </TableContainer>
  );
}
