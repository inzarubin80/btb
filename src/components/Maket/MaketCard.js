import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { Descriptions } from 'antd';
import FilesTable from './FilesTable'
import ColorsTable from './ColorsTable'
import ParameterTable from './ParameterTable'
import TasksTable from './TasksTable'
import FormTask from './FormTask'
import { green, blue, pink } from '@material-ui/core/colors';
import 'antd/dist/antd.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  withRouter
} from "react-router-dom";
import 'react-image-lightbox/style.css';
import MuiAlert from '@material-ui/lab/Alert';
import { MaketCardContext } from '../../context/MaketCard/MaketCardContext';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 120
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    //fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  table: {
    minWidth: 10,
  },

  wrapperApproval: {
    margin: theme.spacing(1),
    position: 'relative',
    float: 'right'
  },
  buttonApproval: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },

  messageBox: {
    
    position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100%',
  //background-color: red;
  //color: white;
  textAlign: 'center'

  },

  imageBox: {
    //margin: theme.spacing(2),
    //position: 'absolute',
    //marginTop:80000

  },

  margin: {
    marginTop: theme.spacing(1),
  },

  offset: theme.mixins.toolbar,

  buttonStatusGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },


}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value != index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const MaketCard = (props) => {

  const classes = useStyles();
  const { maket, switchTab, indexСurrentTab, taskEditingOpens, idTaskChange, openCard, hendleSetMaketStatus,  statusBeingSet, message} = React.useContext(MaketCardContext);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    switchTab(newValue);
  };
  const handleChangeIndex = (index) => {
    switchTab(index);
  };

  const messageBox = ()  => {return (<div className={classes.messageBox}>
    
    <Alert onClose={() => {}} severity= {message.type}>{message.str}</Alert>

 </div>)}

  console.log('Макет***********************', maket);

  React.useEffect(() => {
    openCard(props.match.params.id)
  }, [props.match.params.id]);
  return (
    <div style={{ textAlign: 'center', maxWidth: '50%', margin: 'auto', marginTop: 30 }}>
      {maket && <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Макет №{maket.code + " "}
          </Typography>

          <div className={classes.buttonStatusGroup}>
            {!statusBeingSet && maket.actions.map((action) => {
              if (action.progress) {
                return (<Button onClick = {()=>{hendleSetMaketStatus(action.uid)}} variant="outlined" endIcon={<ArrowForwardIcon />} key={action.uid} color="primary"> {action.name}</Button>)
              } else {
                return (<Button onClick = {()=>{hendleSetMaketStatus(action.uid)}} variant="outlined" startIcon={<ArrowBackIcon />}  key={action.uid}  color="primary"> {action.name}</Button>)
              }
            }
            )}
            {statusBeingSet && <CircularProgress/>}
          </div>

          <Modal
        open={message?true:false}
        onClose={()=>{}}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {message&&messageBox()}
      </Modal>

          <Descriptions layout="vertical" bordered >
            <Descriptions.Item label="Продукт">{maket.product}</Descriptions.Item>
            <Descriptions.Item label="Конечный потребитель">{maket.finalBuyer}</Descriptions.Item>
            <Descriptions.Item label="Статус">{maket.status}</Descriptions.Item>
          </Descriptions>
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={indexСurrentTab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example">
                <Tab label="Основные данные" {...a11yProps(0)} />
                <Tab label={"Файлы (" + maket.files.length + ")"} {...a11yProps(1)} />
                <Tab label={"Задания (" + maket.tasks.length + ")"} {...a11yProps(2)} />
                <Tab label={"Цвета (" + maket.colors.length + ")"} {...a11yProps(3)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={indexСurrentTab}
              onChangeIndex={handleChangeIndex}>
              <TabPanel value={indexСurrentTab} index={0} dir={theme.direction}>
                <ParameterTable maket={maket} />
              </TabPanel>
              <TabPanel value={indexСurrentTab} index={1} dir={theme.direction}>
                <FilesTable />
              </TabPanel>
              <TabPanel value={indexСurrentTab} index={2} dir={theme.direction}>
                {!idTaskChange && <TasksTable />}
                {idTaskChange && <FormTask />}
              </TabPanel>
              <TabPanel value={indexСurrentTab} index={3} dir={theme.direction}>
                <ColorsTable colors={maket.colors} />
              </TabPanel>
            </SwipeableViews >
          </div>
        </CardContent>
      </Card>}
    </div>
  );
}
export default withRouter(MaketCard)