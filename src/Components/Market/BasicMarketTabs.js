import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import StarIcon from '@mui/icons-material/Star';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import InnerMarketTab from './InnerMarketTab';
import SpotMarketTab from './SpotMarketTab'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  dashboarbodycls: {
    background: 'transparent !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
  },
  topmarketleft: {
    '& h1': {
      margin: '0px !important',
      textAlign: 'left !important',
      color: '#fff !important'
    },
    '& p': {
      margin: '0px !important',
      textAlign: 'left !important',
      color: '#707A8A !important'
    }
  },
  topmarket: {
    padding: '30px 0 !important'
  },
  commonflexbox: {
    alignItems: 'center',
  },
  tabstylecrypto: {
    '& button': {
      color: '#fff !important',
      position: 'relative !important',
      '& svg': {
        color: '#fff !important'
      }
    }
  },
  tabcontentcmn: {
    '& div': {
      padding: '0px !important',
      '& p': {
        color: '#fff',
        textAlign: 'left !important'
      }
    }
  }
});


export default function BasicMarketTabs() {

  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [searched,setsearched] = React.useState();
  const [searched1,setsearched1] = React.useState();
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='tabs-market-block'>
      <Box sx={{ width: '100%' }} className='tabs-name-cont-tab'>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='tab-names-block'>

          <Grid container spacing={0} className='tabs-search-block'>

            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>

              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className={classes.tabstylecrypto} id="tabstylecrypto">
                {/* <Tab icon={<StarIcon />} iconPosition="start" label="Favorites" {...a11yProps(0)} /> */}
                <Tab label="All Cryptos" {...a11yProps(0)} />
                <Tab label="Spot Markets" {...a11yProps(1)} />
                <Tab label="Futures Markets" {...a11yProps(2)} />
                
              </Tabs>

            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'search google maps' }}
                  onChange={(e)=>{
                  setsearched(e.target.value.toUpperCase())
                  }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>

          </Grid>

        </Box>
        {/* <TabPanel className={classes.tabcontentcmn} value={value} index={0}>
          Item One
        </TabPanel> */}
        <TabPanel className={classes.tabcontentcmn} value={value} index={0}>
          <InnerMarketTab values={"all"} searchedvalue={searched} />
        </TabPanel>
        <TabPanel className={classes.tabcontentcmn} value={value} index={1}>
          <SpotMarketTab values={"SPOT"} searchedvalue={searched} />
        </TabPanel>
        <TabPanel className={classes.tabcontentcmn} value={value} index={2}>
          <SpotMarketTab values={"FUTURES"} searchedvalue={searched} />
        </TabPanel>
        {/* <TabPanel className={classes.tabcontentcmn} value={value} index={4}>
          <InnerMarketTab />
        </TabPanel> */}
        {/* <TabPanel className={classes.tabcontentcmn} value={value} index={2}>
          Item Three
        </TabPanel> */}
      </Box>
    </div>
  );
}