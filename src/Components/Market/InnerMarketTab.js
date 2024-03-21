import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AppsIcon from '@mui/icons-material/Apps';
import GridViewIcon from '@mui/icons-material/GridView';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import CryptoTable from './CryptoTable';
import AllCryptoTable from './AllCryptoTable';

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

function a11yPropsNew(index) {
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
  tabstylecryptonew: {
    background: '#010712',
    padding: '5px !important',
    alignItems: 'center !important',
    '& button': {
      color: '#fff !important',
      position: 'relative !important',
      height: '40px !important',
      minHeight: '40px !important',
      padding: '5px !important',
      '& svg': {
        color: '#fff !important',
        width: '0.7em'
      }
    }
  },
  tabcontentcmn: {
    background: 'transparent !important',
    '& div': {
      padding: '0px !important',
      '& p': {
        color: '#fff',
        textAlign: 'left !important'
      }
    }
  }
});


export default function InnerMarketTab({ values,searchedvalue }) {

  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChangeNew = (event, newValue) => {
    setValue(newValue);
  };

  

  return (
    <div className='tabs-market-block-inner-options'>
      <Box sx={{ width: '100%' }} className='tabs-name-cont-tab'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='tab-names-block'>
          <Tabs value={value} onChange={handleChangeNew} aria-label="basic tabs example" className={classes.tabstylecryptonew}>
            <Tab icon={<AppsIcon />} iconPosition="start" label="All" {...a11yPropsNew(0)} />
          </Tabs>
        </Box>
        {values === "all" ?
          <TabPanel className={classes.tabcontentcmn} value={value} index={0}>
            <AllCryptoTable values={values}  searchedvalue={searchedvalue} />
          </TabPanel> :
          <TabPanel className={classes.tabcontentcmn} value={value} index={0}>
            <CryptoTable values={values}  searchedvalue={searchedvalue} />
          </TabPanel>
        }
      </Box>
    </div>
  );
}