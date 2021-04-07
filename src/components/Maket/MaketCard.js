import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getMaket } from '../../api/dataService1c';
import TableContainer from '@material-ui/core/TableContainer';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { Descriptions, Badge } from 'antd';
import 'antd/dist/antd.css';
import SaveIcon from '@material-ui/icons/Save';

import BackupIcon from '@material-ui/icons/Backup';


import SearchIcon from '@material-ui/icons/Search';

import Button from '@material-ui/core/Button';

import {
  withRouter
} from "react-router-dom";


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
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  table: {
    minWidth: 10,
  },


  rootButton: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  inputButton: {
    display: 'none',
  },
}));


const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


const UploadButtons = () => {
  const classes = useStyles();

  return (
    <div className={classes.rootButton}>
      <input
        accept="image/*"
        className={classes.inputButton}
        id="contained-button-file"
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span" startIcon={<BackupIcon />}>

        </Button>
      </label>
    </div>
  );
}


const ColorsTable = ({ colors }) => {

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Цвет</TableCell>
            <TableCell>RGB</TableCell>

            <TableCell align="right">Сторона</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {colors.map((row) => (
            <TableRow key={row.id}>

              <TableCell component="th" scope="row" >
                {row.color}
              </TableCell>
              <TableCell align="right" style={{ background: `rgb(${row.rgb})` }}></TableCell>
              <TableCell align="right">{row.turnover}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


const FilesTable = ({ colors }) => {

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>

            <TableCell></TableCell>
            <TableCell>Файл</TableCell>
            <TableCell></TableCell>

            <TableCell></TableCell>

            <TableCell>Файл подтверждения</TableCell>
            <TableCell></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {colors.map((row) => (
            <TableRow key={row.id}>

              <TableCell component="th" scope="row" >
                {row.fileName}
              </TableCell>

              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                />
              </TableCell>


              <TableCell align="right">{row.fileName}</TableCell>


              <TableCell align="right"><UploadButtons /> </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
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
  const [maket, setMaket] = React.useState();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const theme = useTheme();

  //console.log("props MaketFullCard", props.match.params.id);

  React.useEffect(() => {

    getMaket(props.match.params.id)
      .then(response => response.json())
      .then((json) => {

        setMaket(json);
        console.log(json);

      })
      .catch((err) => {

        setMaket({});

      });

  }, []);

  console.log(maket);


  if (maket != null && maket.code) {

    return (
      <div style={{ textAlign: 'center', maxWidth: '50%', margin: 'auto', marginTop: 30 }}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Макет №{maket.code}
            </Typography>

            <Descriptions layout="vertical" bordered >

              <Descriptions.Item label="Продукт">{maket.product}</Descriptions.Item>
              <Descriptions.Item label="Конечный потребитель">{maket.finalBuyer}</Descriptions.Item>


              <Descriptions.Item label="Основная информация" style={{ textAlign: 'left' }}>
                Вид оболочки: {maket.Shell}
                <br />
              Цветность: {maket.chromaticity}
                <br />
              Калибр/Ширина: {maket.caliber}
                <br />
              Тип печати: {maket.typPrinting}
                <br />
              </Descriptions.Item>

            </Descriptions>



            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Цвета" {...a11yProps(0)} />
                  <Tab label="Файлы" {...a11yProps(1)} />


                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <ColorsTable colors={maket.colors} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <FilesTable colors={maket.files} />
                </TabPanel>

              </SwipeableViews >
            </div>

          </CardContent>
        </Card>
      </div>
    );

  } else if (maket != null && !maket.code) {

    return (<div style={{ textAlign: 'center', maxWidth: '50%', margin: 'auto', marginTop: 30 }}>
      <h3>Макет №{props.match.params.id} не найден</h3>
    </div>)
  }

  else {

    return (<div style={{ textAlign: 'center', maxWidth: '50%', margin: 'auto', marginTop: 30 }}>
      <h3>...грузим</h3>
    </div>)
  }
}

export default withRouter(MaketCard)