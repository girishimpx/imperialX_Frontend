import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Axios from '../../Axios';
import { useState } from 'react';
import { useEffect } from 'react';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0)
];




export default function PositionHistory() {
    const [row, setRow] = useState(null)

    // const getHistory = async () => {
    //     const { data } = await Axios.post(`/trade/positionHistory`, { id: 'XRP-USDT-230721' }, {
    //         headers: {
    //             Authorization: localStorage.getItem("Mellifluous"),
    //         }
    //     })
    // }

    // useEffect(() => {
    //     getHistory()
    // }, [])
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                {/* <caption>A basic table example with a caption</caption> */}
                <TableHead>
                    <TableRow>
                        <TableCell colSpan="4" sx={{ color: "black" }} >Dessert (100g serving)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row" sx={{ color: "black" }}>
                                <div>Time opened 07/19/2023, 10:33:26</div>
                                <div>Time opened 07/19/2023, 10:33:26</div>
                            </TableCell>
                            <TableCell align="right">
                                <div>Entry price ₮0.79458</div>
                                <div>Entry price ₮0.79458</div>
                            </TableCell>
                            <TableCell align="right">
                                <div>PnL -0.09 USDT</div>
                                <div>PnL -0.09 USDT</div>
                            </TableCell>
                            <TableCell align="right">
                                <div>Opened 79.45 USDT</div>
                                <div>Opened 79.45 USDT</div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}