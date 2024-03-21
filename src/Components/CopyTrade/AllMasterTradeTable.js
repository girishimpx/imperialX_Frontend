import * as React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Constant from "../../Constansts";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import allmastersicon from "../../images/all-masters-icon.png";
import verify from "../../images/verify.png";
import trial from "../../images/trial.png";
import tetherseeklogo from "../../images/tether-seeklogo.png";
import Consts from "../../Constansts";
import Axios from "../../Axios";
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  tablestructre: {
    "& th": {
      color: "#FFF",
      borderBottom: "1px solid rgb(58 57 57) !important",
      whiteSpace: "nowrap",
    },
    "& td": {
      color: "#FFF",
      borderBottom: "1px solid rgb(58 57 57) !important",
      whiteSpace: "nowrap",
      "& button":{
        margin:'0px 10px !important'
      }
    },
  },
  bgwhite: {
    background: "transparent !important",
    borderRadius: "0px !important",
    boxShadow: "none !important",
  },
});

function createData(heading, percentage, rating, risk, type, tether, id, _id) {
  return { heading, percentage, rating, risk, type, tether, id, _id };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "1h",
    numeric: true,
    disablePadding: false,
    label: "1h",
  },
  {
    id: "volume",
    numeric: true,
    disablePadding: false,
    label: "24h Volume",
  },
  {
    id: "market_cap",
    numeric: true,
    disablePadding: false,
    label: "Market Cap",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function AllMasterTradeTable(searchName) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [masters, setMasters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [name,setName] = React.useState(searchName.searchName.searchName)
  const rows = [];

  // console.log(searchName.searchName.searchName, "props");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  React.useEffect(() => {
  //  console.log(master, "useeffect");
    //setMasters(master.master);
    getMasters()
  }, []);
  React.useEffect(() => {
    if(searchName.searchName.searchName){
      getMaster(searchName.searchName.searchName)
    }
    else{
      getMasters()
    }
     
    }, [searchName.searchName.searchName]);

  const getMasters = async () => {
    try {
      await Axios.post(`${Consts.BackendUrl}/users/getMastersbyQuery`,{
        name:name
      }, {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      }).then((res) => {
        if (res?.data?.success) {
         
           // console.log(res?.data?.result,"data1");
            setMasters(res?.data?.result)
            setLoading(false);
        
        }
        setLoading(false);
      })
    } catch (error) {
      setLoading(false);
    }
    
  }

  const getMaster = async (name) => {
    try {
      await Axios.post(`${Consts.BackendUrl}/users/getMastersbyQuery`, 
      {
        name:name
      },
      {
        headers: {
          Authorization: localStorage.getItem("Mellifluous"),
        },
      }).then((res) => {
        if (res?.data?.success) {
         
           // console.log(res?.data?.result,"data1");
            setMasters(res?.data?.result)
            setLoading(false);
        
        }
        setLoading(false);
      })
    } catch (error) {
      setLoading(false);
    }
    
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  

  const classes = useStyles();

  return (
    <Box sx={{ width: "100%" }}>
      {/* {console.log(masters, "===", Array.isArray(masters))} */}
      <Paper sx={{ width: "100%", mb: 2 }} className={classes.bgwhite}>
        <TableContainer>
          {/* {console.log(masters)}
          {console.log(Array.isArray(masters), "ma1")} */}
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            className={classes.tablestructre}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" className="tab-2-allmaster">
                  Name
                </TableCell>
                <TableCell align="center" className="tab-2-allmaster">
                  Trade Type
                </TableCell>
                <TableCell align="center" className="tab-2-allmaster">
                  Gain %
                </TableCell>
                <TableCell align="center" className="tab-2-allmaster">
                  Loss %
                </TableCell>
                <TableCell align="center" className="tab-2-allmaster">
                  Recent Trade
                </TableCell>
                <TableCell align="center" className="tab-2-allmaster">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {masters &&
                masters.map((row, index) => {
                  const isItemSelected = isSelected(row.heading);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.master._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.master._id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell align="center">
                        <div> {row.master.name}</div>
                      </TableCell>
                      <TableCell align="center">
                        <div> {row.master.trader_type}</div>
                      </TableCell>
                      <TableCell align="center">
                        <div>
                          <span>{row.master._id}</span>
                          <label>{row.tab9}</label>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div>
                          <span>{row.tab11}</span>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div>
                          <span>{row.tab12}</span>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div>
                          {row.master.trader_type === "master" ? (
                            <Button variant="contained">Copy</Button>
                          ) : (
                            <Button> Copy </Button>
                          )}
                         
                           <Link to={`${Constant.route}/trader-details/${row.master._id}`} ><Button variant="contained">Details</Button></Link>
                          
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}

              
              {masters?.length <= 0 && (
                <div style={{ padding: "1rem", color: "#25DEB0" }}>
                  <h4 style={{ width: "70%", marginLeft: "29%" }}>
                    Data not found
                  </h4>
                </div>
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={masters?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
