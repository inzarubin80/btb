import React from 'react';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getMaket, getImgMaket, saveFileСonfirmation, сonfirmationMaket } from '../../api/dataService1c';
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

import Button from '@material-ui/core/Button';
import { green, blue, pink } from '@material-ui/core/colors';
import { approval } from './statuses'
import 'antd/dist/antd.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  withRouter
} from "react-router-dom";

import DoneIcon from '@material-ui/icons/Done';
import BorderColorIcon from '@material-ui/icons/BorderColor';
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


  buttonReject: {
    margin: theme.spacing(1),
    float: 'left'
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


  wrapperReject: {
    margin: theme.spacing(1),
    position: 'relative',
    float: 'left'
  },

  buttonReject: {
    backgroundColor: blue,
    '&:hover': {
      backgroundColor: pink,
    },
  },



}));


const getBase64 = (file) => {
  return new Promise(resolve => {

    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result.split(',')[1];
      resolve(baseURL);

    };

  });
};


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

  const [stateLoadingButton, setStateLoadingButton] = React.useState({ loading: [] });


  const hendlerStateLoadingButton = (buttonId, add) => {
    setStateLoadingButton((prevState) => {
      let state = { ...prevState };
      if (add) {
        state.loading = [...state.loading, buttonId]
      } else {
        state.loading = state.loading.filter((buttonIdInState) => { return (buttonIdInState != buttonId) })
      }

      console.log(state);

      return state;
    })
  }


  const isload = (buttonId) => {
    return stateLoadingButton.loading.find((id) => { return id == buttonId })
  }

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  const handleDownload = ({ code, fileName, shortfileName }) => {


    const idButton = fileName + 'save';

    hendlerStateLoadingButton(idButton, true);

    getImgMaket(code, fileName)
      .then(response => response.json())
      .then((json) => {


        const linkSource = `data:image/jpeg;base64,${json.file.imgBase64}`;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = shortfileName;
        downloadLink.click();

        hendlerStateLoadingButton(idButton, false);


      })
      .catch((err) => {
        hendlerStateLoadingButton(idButton, false);

      });
  }

  const theme = useTheme();

  React.useEffect(() => {
    getMaket(props.match.params.id)
      .then(response => response.json())
      .then((json) => {

        if (!json.error) {
          setMaket(json.maket);
        }

      })
      .catch((err) => {
        setMaket({});
      });
  }, []);

  const handleChangeFile = (macetCode, file, fileName, shortfileName) => {

    const idButton = fileName + 'upload';

    hendlerStateLoadingButton(idButton, true);

    getBase64(file).then(fileBase64 => {

      saveFileСonfirmation(macetCode, fileName, shortfileName, fileBase64)
        .then(response => response.json())
        .then((json) => {

          if (json.responseMaket.maket) {
            setMaket(json.responseMaket.maket);
          }

          hendlerStateLoadingButton(idButton, false);

        })

        .catch((err) => {

          hendlerStateLoadingButton(idButton, false);

        });

    })
      .catch(err => {
        console.log(err);
      });
  }

  const hendlerConfirmationMaket = () => {

    const idButton = 'confirmationButton';

    hendlerStateLoadingButton(idButton, true);

    сonfirmationMaket(maket.code)
      .then(response => response.json())
      .then((json) => {

        hendlerStateLoadingButton(idButton, false);

        if (json.responseMaket.maket) {
          setMaket(json.responseMaket.maket);
        }

      })

      .catch((err) => {
        //  setMaket({});
        hendlerStateLoadingButton(idButton, false);

      });


  }



  if (maket != null && maket.code) {

    return (
      <div style={{ textAlign: 'center', maxWidth: '50%', margin: 'auto', marginTop: 30 }}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h6" className={classes.title} color="textSecondary" gutterBottom>



              {approval == maket.status &&


                <div className={classes.wrapperReject}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttonReject}
                    disabled={isload('buttonReject')}
                    onClick={() => { console.log('Reject') }}

                    startIcon={<BorderColorIcon />}
                  >
                    Доработка
        </Button>
                  {isload('buttonReject') && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>


              }

              Макет №{maket.code + " "}

              {approval == maket.status &&



                <div className={classes.wrapperApproval}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttonApproval}
                    disabled={isload('confirmationButton')}
                    onClick={() => hendlerConfirmationMaket()}

                    startIcon={<DoneIcon />}
                  >
                    Согласовать
            </Button>
                  {isload('confirmationButton') && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>


              }




            </Typography>

            <Descriptions layout="vertical" bordered >

              <Descriptions.Item label="Продукт">{maket.product}</Descriptions.Item>
              <Descriptions.Item label="Конечный потребитель">{maket.finalBuyer}</Descriptions.Item>
              <Descriptions.Item label="Статус">{maket.status}</Descriptions.Item>

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

                  <Tab label="Основные данные" {...a11yProps(0)} />
                  <Tab label="Файлы" {...a11yProps(1)} />
                  <Tab label="Цвета" {...a11yProps(2)} />


                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
              >


                <TabPanel value={value} index={0} dir={theme.direction}>
                  <ParameterTable maket={maket} />
                </TabPanel>


                <TabPanel value={value} index={1} dir={theme.direction}>
                  <FilesTable maket={maket} handleChangeFile={handleChangeFile} handleDownload={handleDownload} hendlerStateLoadingButton={hendlerStateLoadingButton} isload={isload} />
                </TabPanel>


                <TabPanel value={value} index={2} dir={theme.direction}>
                  <ColorsTable colors={maket.colors} />
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