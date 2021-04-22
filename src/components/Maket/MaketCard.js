
import React from 'react';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getMaket, getImgMaket, saveFileСonfirmation, сonfirmationMaket, saveTask,getFileTask} from '../../api/dataService1c';
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
import { EditorState, ContentState, convertToRaw } from 'draft-js';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { saveAs } from 'file-saver';

//import { triggerBase64Download } from 'react-base64-downloader';


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

  offset: theme.mixins.toolbar,

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


const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

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
  const [idTask, setidTask] = React.useState(null);
  const [taskTextValue, setTaskTextValue] = React.useState('');
  const [stateLoadingButton, setStateLoadingButton] = React.useState({ loading: [] });
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  const [imgData, seIimgData] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();


  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeTask = (uid) => {

    getMaket(props.match.params.id)
      .then(response => response.json())
      .then((json) => {

        if (!json.error) {

          let task = json.maket.tasks.find((task) => task.uid == uid);

          if (task) {


            const contentBlock = htmlToDraft(task.text);
            if (contentBlock) {

              const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
              const NewEditorState = EditorState.createWithContent(contentState);
              setEditorState(NewEditorState);

            };

            setidTask(uid);

          }

        }

      })
      .catch((err) => {

        //setMaket({});

      });


  };



  const handleSaveTask = () => {
    const idButton = 'saveTask';
    let number = 0;
    if (idTask != '-1') {
      number = maket.tasks.find((task) => task.uid == idTask).number;
    }

    const taskTextValueHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    hendlerStateLoadingButton(idButton, true);

    saveTask(maket.code, idTask, number, taskTextValueHTML)
      .then(response => response.json())
      .then((json) => {
        if (json.responseMaket.maket) {
          setMaket(json.responseMaket.maket);
        }
        hendlerStateLoadingButton(idButton, false);
        if (!json.error) {
          setidTask(null);
          setEditorState(EditorState.createEmpty());
        }
      })
      .catch((err) => {
        hendlerStateLoadingButton(idButton, false);
      });
  };



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

  const handleDownloadFileTask = (uidTask, uidFile) => {
  const idButton = uidFile + 'save';
    hendlerStateLoadingButton(idButton, true);
    getFileTask(maket.code, uidTask, uidFile)
      .then(response => response.json())
      .then((json) => {
        
        if (!json.error){

          var time = performance.now();
        const blob = b64toBlob(json.fileBase64, '');
        time = performance.now() - time;
        console.log('Время выполнения b64toBlob = ', time);

        saveAs(blob, json.name); 
        }

        hendlerStateLoadingButton(idButton, false);

      })
      .catch((err) => {
        
        console.log(err);
        hendlerStateLoadingButton(idButton, false);
      
      });
  }

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


  const handleOpenFile = (macetCode, fileName) => {

    console.log('handleOpenFile');
    const idButton = fileName  + 'open';
    hendlerStateLoadingButton(idButton, true);

    getImgMaket(macetCode, fileName)
      .then(response => response.json())
      .then((json) => {

        hendlerStateLoadingButton(idButton, false);
        seIimgData(json.file);
        setIsOpen(true);

      })
      .catch((err) => {

        hendlerStateLoadingButton(idButton, false);
        seIimgData(null);

      });
  }

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

  const hendleConfirmationMaket = () => {

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
      
        hendlerStateLoadingButton(idButton, false);

      });


  }



  const isload = (buttonId) => {
    if (stateLoadingButton.loading.find((id) => { return id == buttonId })){
      return true
    }
    else {
      return false
    }

  }

  const handleChangeIndex = (index) => {
    setValue(index);
  };


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



  if (maket != null && maket.code) {

    return (
      <div style={{ textAlign: 'center', maxWidth: '50%', margin: 'auto', marginTop: 30 }}>


    {isOpen && (
      
      <div style = {{ display: 'flex'}}>

      <Lightbox style = {{ margin: 'auto'}}
          mainSrc={`data:image/jpeg;base64,${imgData.imgBase64}`}
          onCloseRequest={() => setIsOpen(false)}
          />
          </div>
          )}

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
                    onClick={() => hendleConfirmationMaket()}

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
                  <Tab label={"Файлы (" + maket.files.length + ")"} {...a11yProps(1)} />
                  <Tab label={"Задания (" + maket.tasks.length + ")"} {...a11yProps(2)} />
                  <Tab label={"Цвета (" + maket.colors.length + ")"} {...a11yProps(3)} />



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
                  <FilesTable maket={maket} handleChangeFile={handleChangeFile} handleDownload={handleDownload} hendlerStateLoadingButton={hendlerStateLoadingButton} handleOpenFile = {handleOpenFile}  isload={isload} />
                </TabPanel>

                <TabPanel value={value} index={2} dir={theme.direction}>


                  {!idTask && <TasksTable maket={maket} 
                  setidTask={setidTask} 
                  handleChangeTask={handleChangeTask} 
                  handleDownloadFileTask={handleDownloadFileTask}
                  hendlerStateLoadingButton={hendlerStateLoadingButton}
                  isload = {isload}
                  />}

                  {idTask && <FormTask
                    maket={maket}
                    setidTask={setidTask}
                    handleSaveTask={handleSaveTask}
                    idTask={idTask}
                    editorState={editorState}
                    setEditorState={setEditorState}

                  />}


                </TabPanel>


                <TabPanel value={value} index={3} dir={theme.direction}>
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