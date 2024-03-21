import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Axios from "../../Axios";
import Consts from "../../Constansts";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

function createData(time, side, oldprice, total, ordervalue, sl, reduce, status, cancel) {
  return { time, side, oldprice, total, ordervalue, sl, reduce, status, cancel };
}

const rows = [ 
  createData(1.009, 159, 6.0, 24, 4.0, 1.009, 159, 6.0, 24),
  createData(3.009, 237, 9.0, 37, 4.3, 1.009, 159, 6.0, 24),
  createData(0.345, 262, 16.0, 24, 6.0, 1.009, 159, 6.0, 24),
  createData(1.97, 305, 3.7, 67, 4.3, 1.009, 159, 6.0, 24),
  createData(0.678, 356, 16.0, 49, 3.9, 1.009, 159, 6.0, 24),
  createData(1.009, 159, 6.0, 24, 4.0, 1.009, 159, 6.0, 24),
  createData(3.009, 237, 9.0, 37, 4.3, 1.009, 159, 6.0, 24),
  createData(0.345, 262, 16.0, 24, 6.0, 1.009, 159, 6.0, 24),
  createData(1.97, 305, 3.7, 67, 4.3, 1.009, 159, 6.0, 24),
  createData(0.678, 356, 16.0, 49, 3.9, 1.009, 159, 6.0, 24),
];

export default function   OpenOrderTable({selectedPairs, reload}) {


  const [loading, setLoading] = React.useState(true);
  const [tradelist, settradelist] = React.useState();
  const [state, setState] = React.useState(false);
  const [pair,sertPair] = React.useState("All"); 


  React.useEffect(() => {
    let token = localStorage.getItem("Mellifluous");
    if (token) {
      Axios.post(`${Consts.BackendUrl}/trade/tradeHistory`,{pair:selectedPairs},{
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          console.log(res, 'tradeHistory'	);
          let data = [];
          res?.data?.result.map((item, index) => {
            if(item.trade_at == "future" || item.trade_at == "Future"){
            if (item.status == "init" || item.status == "partially_filled") {
              data.push(item);
            }
          }
          });
          if (data.length > 0) {
            settradelist(data.reverse());
          }
          setLoading(false);
        })
        .catch((err) => {
          
          setLoading(false); 
        });
    }
  }, [state,selectedPairs]);
  
  const [isZero, setIsZero] = React.useState(reload);

  React.useEffect(() => {
    if(isZero == 1){
    let token = localStorage.getItem("Mellifluous");
    if (token) {
      Axios.post(`${Consts.BackendUrl}/trade/tradeHistory`,{pair:selectedPairs},{
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          console.log(res, 'tradeHistory'	);
          let data = [];
          res?.data?.result.map((item, index) => {
            if(item.trade_at == "future" || item.trade_at == "Future"){
            if (item.status == "init" || item.status == "partially_filled") {
              data.push(item);
            }
          }
          });
          if (data.length > 0) {
            settradelist(data.reverse());
          }
          setLoading(false);
        })
        .catch((err) => {
          
          setLoading(false); 
        });
    }
    setIsZero(0)
  }
  }, [reload]);
  const header = [
    "Time",
    "Type",
    "Pair",
    "Price",
    "Remain",
    "Trade At",
    "Trade type",
    "Volume",
    "Status",
    "Action",
  ];


  const cancelOrder = (selectedItem) => {
    let data = {
      instId: selectedItem.pair,
      ordId: selectedItem.order_id,
      // instId:"BTC-USDT",
      // ordId: "1252451",
    };

    Axios.post(`${Consts.BackendUrl}/trade/cancelTrade`, data, {
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
            setState(!state);
          }, 1000);
        } else {
        
          toast.error(`${res.data.message}`, {
           
          duration: 4000,
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
         icon:"",

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
      })
      .catch((err) => {
        console.log(err?.rtesponse?.data?.message);
      });
  };


  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" className='table-style-open-order'>
      <TableHead>
          <TableRow>
            {header.map((item, index) => {
              return <TableCell sx={{fontWeight:"500",fontSize:"16px"}} key={index}>{item} </TableCell>;
            })}
          </TableRow>
        </TableHead>
        {tradelist && (
          <TableBody>
            {tradelist.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  {row.createdAt
                    ? new Date(row.createdAt).toLocaleString()
                    : "-"}
                </TableCell>
                <TableCell>{row.order_type ? row.order_type : "-"}</TableCell>
                <TableCell>{row.pair ? row.pair : "-"}</TableCell>
                <TableCell sx={{color:`${row.trade_type=="buy" ? "#25DEB0 !important" : "#CA3F64 !important"}`}}>{row.price ? row.price : "0"}</TableCell>
                <TableCell>{row.remaining ? row.remaining : "0"}</TableCell>
                <TableCell>{row.trade_at ? row.trade_at : "-"}</TableCell>
                <TableCell sx={{color:`${row.trade_type=="buy" ? "#25DEB0 !important" : "#CA3F64 !important"}`}}>{row.trade_type ? row.trade_type : "-"}</TableCell>
                <TableCell>{row.volume ? row.volume : "-"}</TableCell>
                <TableCell>{row.status ? row.status : "-"}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      cancelOrder(row);
                    }}
                    variant="contained"
                    style={{ fontSize: "10px" }}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      
      {loading && (
        <div style={{ width: "80%", padding: "1rem" }}>
          <CircularProgress size={"60"} />
        </div>
      )}

      {!loading && !tradelist && (
        <div style={{ backgroundColor: "lightgrey" }}>
          <h5 style={{ padding: "1rem", color: "black" }}>Data Not Found</h5>
        </div>
      )}
    </TableContainer>
  );
}