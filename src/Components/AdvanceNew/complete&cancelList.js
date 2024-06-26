import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Axios from "../../Axios";
import Consts from "../../Constansts";
import CircularProgress from "@mui/material/CircularProgress";
export default function OpenOrderTable({ selectedPairs, ordreType }) {
  const [loading, setLoading] = React.useState(true);
  const [tradelist, settradelist] = React.useState();


  console.log(ordreType, "vijay");


  React.useEffect(() => {
    let token = localStorage.getItem("Mellifluous");
    if (token) {
      Axios.post(`${Consts.BackendUrl}/trade/tradeHistory`, { pair: selectedPairs }, {
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          let data = [];
          res?.data?.result.map((item, index) => {
            console.log(item, "item")
            if (item.trade_at === "margin" || item.trade_at === "Margin") {
              if (item.status === "Filled" || item.status === "Cancelled") {
                console.log(item.order_type, ordreType, "vijay2");
                if (item.order_type.toLowerCase() == ordreType.toLowerCase()) {
                  data.push(item);
                  console.log(item, ordreType, "opriot")
                }

              }
            }
          });
          if (data.length > 0) {
            settradelist(data.reverse());
            setLoading(false);
          } else {
            settradelist(data);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [selectedPairs, ordreType]);

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
  ];

  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        className="table-style-open-order"
      >
        <TableHead >
          <TableRow>
            {header.map((item, index) => {
              return <TableCell sx={{ fontWeight: "500", fontSize: "16px" }} key={index}>{item} </TableCell>;
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
                  {console.log(row, "check")}
                </TableCell>
                <TableCell>{row.order_type ? row.order_type : "-"}</TableCell>
                <TableCell>{row.pair ? row.pair : "-"}</TableCell>
                <TableCell sx={{ color: `${row.trade_type === "buy" ? "#25DEB0 !important" : "#CA3F64 !important"}` }}>{row.price ? row.price : row.entry_price}</TableCell>
                <TableCell >{row.remaining ? row.remaining : "0"}</TableCell>
                <TableCell>{row.trade_at ? row.trade_at : "-"}</TableCell>
                <TableCell sx={{ color: `${row.trade_type === "buy" ? "#25DEB0 !important" : "#CA3F64 !important"}` }}>{row.trade_type ? row.trade_type : "-"}</TableCell>
                <TableCell>{row.volume ? row.volume : "-"}</TableCell>
                <TableCell>{row.status ? row.status : "-"}</TableCell>

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

      {tradelist?.length == 0 && (
        <div style={{ backgroundColor: "lightgrey" }}>
          <h5 style={{ padding: "1rem", color: "black" }}>Data Not Found</h5>
        </div>
      )}
    </TableContainer>
  );
}
