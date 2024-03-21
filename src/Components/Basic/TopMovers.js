import React from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TopMoversTable from './TopMoversTable';

const TopMovers = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <div className='top-movers'>
       <div className='top-mover-head'><h5>Top movers <HelpOutlineIcon/></h5></div>
       <div className='menu-current-pair'>
      <div className='option-Current-pair'>
       <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        All
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>50</MenuItem>
        <MenuItem onClick={handleClose}>100</MenuItem>
        <MenuItem onClick={handleClose}>200</MenuItem>
      </Menu>
    </div>
    <FormGroup className='requirmnent'><FormControlLabel control={<Checkbox defaultChecked />} label="Current pair" /></FormGroup>
    </div>

       </div>
       <TopMoversTable/>
    </div>
  )
}

export default TopMovers
