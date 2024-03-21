import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import allmastersicon from '../../images/all-masters-icon.png'
import verify from '../../images/verify.png'
import trial from '../../images/trial.png'

const useStyles = makeStyles({

    tablestructre: {
        '& th': {
          color: '#FFF',
          borderBottom: '1px solid rgb(58 57 57) !important',
          whiteSpace: 'nowrap'
        },
        '& td': {
          color: '#FFF',
          borderBottom: '1px solid rgb(58 57 57) !important',
          whiteSpace: 'nowrap'
        }
    },
    bgwhite: {
        background: 'transparent !important',
        borderRadius: '0px !important',
        boxShadow:'none !important',
    }

});

function createData(tab1,tab2,tab3,tab4,tab5,tab6,tab7,tab8,tab9,tab10,tab11,tab12,tab13) {
  return {tab1,tab2,tab3,tab4,tab5,tab6,tab7,tab8,tab9,tab10,tab11,tab12,tab13};
}

const rows = [
  createData('easy futures', allmastersicon, verify, trial, 'verified', 'trial', 'usdt', 'binance', 'USDⓈ-M', 2.5, '10.5-70', 40, 10),
  createData('easy futures', allmastersicon, verify, trial, 'verified', 'trial', 'usdt', 'binance', 'USDⓈ-M', 2.5, '10.5-70', 40, 10),
  createData('easy futures', allmastersicon, verify, trial, 'verified', 'trial', 'usdt', 'binance', 'USDⓈ-M', 2.5, '10.5-70', 40, 10),
  createData('easy futures', allmastersicon, verify, trial, 'verified', 'trial', 'usdt', 'binance', 'USDⓈ-M', 2.5, '10.5-70', 40, 10),
  createData('easy futures', allmastersicon, verify, trial, 'verified', 'trial', 'usdt', 'binance', 'USDⓈ-M', 2.5, '10.5-70', 40, 10),
  createData('easy futures', allmastersicon, verify, trial, 'verified', 'trial', 'usdt', 'binance', 'USDⓈ-M', 2.5, '10.5-70', 40, 10),
  createData('easy futures', allmastersicon, verify, trial, 'verified', 'trial', 'usdt', 'binance', 'USDⓈ-M', 2.5, '10.5-70', 40, 10),
  createData('easy futures', allmastersicon, verify, trial, 'verified', 'trial', 'usdt', 'binance', 'USDⓈ-M', 2.5, '10.5-70', 40, 10),
  createData('easy futures', allmastersicon, verify, trial, 'verified', 'trial', 'usdt', 'binance', 'USDⓈ-M', 2.5, '10.5-70', 40, 10),
  createData('easy futures', allmastersicon, verify, trial, 'verified', 'trial', 'usdt', 'binance', 'USDⓈ-M', 2.5, '10.5-70', 40, 10),
  createData('easy futures', allmastersicon, verify, trial, 'verified', 'trial', 'usdt', 'binance', 'USDⓈ-M', 2.5, '10.5-70', 40, 10),
  createData('easy futures', allmastersicon, verify, trial, 'verified', 'trial', 'usdt', 'binance', 'USDⓈ-M', 2.5, '10.5-70', 40, 10),
];

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
  return order === 'desc'
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
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: '1h',
    numeric: true,
    disablePadding: false,
    label: '1h',
  },
  {
    id: 'volume',
    numeric: true,
    disablePadding: false,
    label: '24h Volume',
  },
  {
    id: 'market_cap',
    numeric: true,
    disablePadding: false,
    label: 'Market Cap',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
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
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
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

export default function AllMasterTradeTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

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
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
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
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  const classes = useStyles();

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} className={classes.bgwhite}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            className={classes.tablestructre}
          >
            <TableHead>
          <TableRow>
            <TableCell align='left'>Name</TableCell>
            <TableCell align='center'>7D</TableCell>
            <TableCell align='center'>7D PnL</TableCell>
            <TableCell align='center'>7D Followers PnL</TableCell>
            <TableCell align='center'>7D Win Rate</TableCell>
            <TableCell align='center'>Stability Index</TableCell>
            <TableCell align='center'>Followers</TableCell>
            <TableCell align='center'>Action</TableCell>
          </TableRow>
        </TableHead>
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                  
              <TableCell align='left'><div className='tab-1-allmaster'><div className='tab-1-allmaster-img'><img src={row.tab2} alt="all-masters"/></div><div className='tab-1-allmaster-cont'><span>{row.tab1}</span><div className='verify-trial'><div className='tab3'><img src={row.tab3} alt="all-masters"/>{row.tab5}</div><div className='tab3'><img src={row.tab4} alt="all-masters"/>{row.tab6}</div></div></div></div></TableCell>
              <TableCell align='center'><div className='tab-2-allmaster'>{row.tab7}</div></TableCell>
              <TableCell align='center'><div className='tab-3-allmaster'><span>{row.tab8}</span><label>{row.tab9}</label></div></TableCell>
              <TableCell align='center'><div className='tab-4-allmaster'><span>{row.tab10}</span></div></TableCell>
              <TableCell align='center'><div className='tab-5-allmaster'><span>{row.tab11}</span></div></TableCell>
              <TableCell align='center'><div className='tab-6-allmaster'><span>{row.tab12}</span></div></TableCell>
              <TableCell align='center'><div className='tab-7-allmaster'><span>{row.tab13}</span></div></TableCell>
              <TableCell align='center'><div className='tab-8-allmaster'><Button variant="contained">Copy</Button></div></TableCell>
              </TableRow>
                );
              })}
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}