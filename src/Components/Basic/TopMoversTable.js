import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(pair, pairingtime, lossgainfactor, lossgainpercentage) {
  return { pair, pairingtime, lossgainfactor, lossgainpercentage };
}

const rows = [
  createData("PEPE/USDT", "05/02, 10:55", "5-min gain", "3.16"),
  createData("UMA/USDT", "05/02, 10:53", "5-min loss", "-2.05"),
  createData("SWFTC/USDT", "05/02, 10:53", "5-min gain", "1.93"),
  createData("AUCTION/USDT", "05/02, 10:52,", "5-min loss", "-1.62"),
];




export default function TopMoversTable() {

  return (
    <TableContainer>
      <Table aria-label="simple table" className='top-movers-table'>
        {/* <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell ><div className='pair-pairingtime'><span className='pair-coin'>{row.pair}</span><span className='pairingtime-coin'>{row.pairingtime}</span></div></TableCell>
              <TableCell align="right"><div className='lossgainfactor'>{row.lossgainfactor}</div></TableCell>
              <TableCell align="right"><span className='lossgainpercentage'>{row.lossgainpercentage}</span>%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}