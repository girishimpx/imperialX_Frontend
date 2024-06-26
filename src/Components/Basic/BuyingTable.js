import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import CircularProgress from '@mui/material/CircularProgress';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

function createData(price, amount, total, pair) {
  return { price, amount, total, pair };
}

let rows = [

]; 

const useStyles = makeStyles({
  sellingtable: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    height: '100%',
  },
  sellingtableouter: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    height: '230px',
    overflow: 'hidden',
    '& th': {
      color: '#909090 !important',
      fontSize: '10px !important',
      padding: '2px 0 !important',
      border: 'none !important'
    },
    '& td': {
      fontSize: '12px',
      padding: '2px 0 !important',
      border: 'none !important',
      color: '#fff !important',
      '&:first-child': {
        color: '#CA3F64 !important',
      }
    }
  }
});

export default function BuyingTable({ ticker, setSelected, pair }) {

  let selected;
  const classes = useStyles();
  // const [sel,setSel] = useState();
  // const [price,setPrice] = useState(sel?.price);
  // const [amount,setAmount] = useState(sel?.amount);
  // const [total,settotal] = useState(sel?.sell);


  (() => {
    if (ticker) {
      if (rows.length == 21) {
        rows.shift();
        rows.push(createData(ticker[0], ticker[1], (ticker[0] * ticker[1]).toFixed(4), ticker[4]));
      } else {
        rows.push(createData(ticker[0], ticker[1], (ticker[0] * ticker[1]).toFixed(4), ticker[4]));
      }
    }
  })();

  useEffect(() => {
    rows = []
  }, [pair]);


  return (
    <TableContainer component={Paper} className={classes.sellingtableouter}>
      <Table aria-label="simple table" style={{ tableLayout: 'fixed' }} className={classes.sellingtable}>
        {/* {console.log(ticker,"opennnn")} */}
        <TableHead>
          <TableRow>
            {/* <TableCell align="left">Price({ticker?ticker[4].split("-")[1] :"USD"})</TableCell>
            <TableCell align="right">Amount({ticker?ticker[4].split("-")[0] :"USD"})</TableCell>
            <TableCell align="right">Total({ticker?ticker[4].split("-")[0] :"USD"})</TableCell> */}
            {/* <TableCell align="left">Price( {pair ? pair.split('-')[1] : "USDT"} )</TableCell>
            <TableCell align="right"> Amount({pair ? pair.split('-')[0] : "BTC"} )</TableCell>
            <TableCell align="right">Total</TableCell> */}
            <TableCell align="left">Price({pair ? pair.slice(-4) : "USDT"})</TableCell>
            <TableCell align="right">Amount({pair ? pair.slice(0,-4) : "BTC"})</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        {rows.length > 5 && <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} style={{ cursor: "pointer" }}
              onClick={() => {
                let vals = row
                vals.from = "buy"
                setSelected(vals)
              }}
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{Number(row.price).toLocaleString()}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
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