import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getMaket } from '../../api/dataService1c';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { Descriptions} from 'antd';
import FilesTable from './FilesTable'
import ColorsTable from './ColorsTable'

import 'antd/dist/antd.css';


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
  }

}));


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
  const [maket, setMaket] = React.useState();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const theme = useTheme();


  React.useEffect(() => {

    getMaket(props.match.params.id)
      .then(response => response.json())
      .then((json) => {

        setMaket(json);
     
      })
      .catch((err) => {

        setMaket({});

      });

  }, []);

  
  console.log('maket', maket);


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
                  <FilesTable files={maket.files} macetCode={maket.code} />
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