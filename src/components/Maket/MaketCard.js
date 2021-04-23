
import React from 'react';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { executorRequests, getMaket, getImgMaket, saveFileСonfirmation, сonfirmationMaket, saveTask,getFileTask} from '../../api/dataService1c';
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
import { approval } from './constants'
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

import MuiAlert from '@material-ui/lab/Alert';

import Modal from '@material-ui/core/Modal';

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

  messageBox:{
    //margin: theme.spacing(2),
   position: 'absolute',
   top: '50%', 
   left: '43%'
    
  },

  imageBox:{
    //margin: theme.spacing(2),
   //position: 'absolute',
    //marginTop:80000

  },

  margin: {
    marginTop: theme.spacing(1),
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
  const [stateLoadingButton, setStateLoadingButton] = React.useState({ loading: [] });
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const [imgData, seIimgData] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([]);


  

  const removeMessage = (idMessage) => {
   let remove = false;
    setMessages((prevState) => {
      return prevState.filter((error)=>{
      if  (error.idMessage!=idMessage || remove) {
        return true;
      } else {
        remove = true;
        return false;
      }
      })
     }
     )
  }

  const addMessage = (idMessage, typeMessage, text, timeOut=0) => {   
   
    setMessages((prevState) => {
     return [...prevState, {idMessage, typeMessage, text}]
    }
    )
    if (timeOut) {
      setTimeout(()=>removeMessage(idMessage),  timeOut)
    }
  }

  const getUniqueMessages = () => {
  
    let uniqueMessages = [] 
    for (let i = messages.length-1; i>=0; i--){
    
    if (!uniqueMessages.find((message)=>message.idMessage==messages[i].idMessage)) {
      uniqueMessages.push(messages[i])
    }
  }
  return uniqueMessages;

}

const theme = useTheme();


const handleChange = (event, newValue) => {
  setValue(newValue);
};

const handleChangeTask = (uid) => {
 
  const functionRequest = () => {
   return getMaket(props.match.params.id)
 };
    
  const responseHandlingFunction = (json)=> {  
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
  };
  
  const exceptionHandlingFunction = () => {};
  executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction);
  
};



const handleSaveTask = () => {

  const idButton = 'saveTask';
  let number = 0;
  if (idTask != '-1') {
   number = maket.tasks.find((task) => task.uid == idTask).number;
  }

  const taskTextValueHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  hendlerStateLoadingButton(idButton, true);

  const functionRequest = () => {return saveTask(maket.code, idTask, number, taskTextValueHTML)};
    
  const exceptionHandlingFunction = () => {}

  const responseHandlingFunction = (json) => {
    if (json.responseMaket.maket) {
        setMaket(json.responseMaket.maket);
     }
    
     hendlerStateLoadingButton(idButton, false);
    
     if (!json.error) {
        setidTask(null);
        setEditorState(EditorState.createEmpty());
      } else {
        addMessage(idButton, 'warning', json.error, 3000); 
      }
    };
    
    executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction);

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
  
  const functionRequest = () => {
    return getFileTask(maket.code, uidTask, uidFile)
  };
    


  const responseHandlingFunction = (json) => {
    
    if (!json.error){

      const time = performance.now();
      const blob = b64toBlob(json.fileBase64, '');
      time = performance.now() - time;
     // console.log('Время выполнения b64toBlob = ', time);
      saveAs(blob, json.name); 
    }
      hendlerStateLoadingButton(idButton, false);
    };

  const exceptionHandlingFunction = () => {
    hendlerStateLoadingButton(idButton, false);
  }
   executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction);
}

const handleDownload = ({ code, fileName}) => {
     
  const idButton = fileName + 'save';
  hendlerStateLoadingButton(idButton, true);
   
  const functionRequest = () => {
    return getImgMaket(code, fileName)
  };

  const responseHandlingFunction =  (json) => {
    
    if (!json.error) {
      const blob = b64toBlob(json.file.imgBase64, '');
      saveAs(blob, json.file.shortName);  
      }  
      hendlerStateLoadingButton(idButton, false);
    }

  const exceptionHandlingFunction = () => { 
    hendlerStateLoadingButton(idButton, false);
  };

  executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction);
}


const handleOpenFile = (macetCode, fileName) => {

  console.log('handleOpenFile');
  const idButton = fileName  + 'open';
  hendlerStateLoadingButton(idButton, true);

  const  functionRequest = () => {
    return getImgMaket(macetCode, fileName)
  }

  const responseHandlingFunction = (json) => {
    hendlerStateLoadingButton(idButton, false);
    seIimgData(json.file);
    setIsOpen(true);
  }

  const exceptionHandlingFunction = () => {
    hendlerStateLoadingButton(idButton, false);
    seIimgData(null);
  };
    
  executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction);

  }

  const handleChangeFile = (macetCode, file, fileName, shortfileName) => {

    const idButton = fileName + 'upload';

    hendlerStateLoadingButton(idButton, true);

    getBase64(file).then(fileBase64 => {

        const functionRequest = () => {
          return  saveFileСonfirmation(macetCode, fileName, shortfileName, fileBase64)
        };

        const responseHandlingFunction = (json)=> {
          if (json.responseMaket.maket) {
            setMaket(json.responseMaket.maket);
          }
          hendlerStateLoadingButton(idButton, false);
        }
        
        const exceptionHandlingFunction = () => {
          hendlerStateLoadingButton(idButton, false); 
        };

        executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction);

    }
    )
      .catch(err => {
        console.log(err);
      });
  }

  const hendleConfirmationMaket = () => {

    const idButton = 'confirmationButton';

    hendlerStateLoadingButton(idButton, true);

    const functionRequest = () => {
      return   сonfirmationMaket(maket.code)
    };

    const responseHandlingFunction = (json)=> {
    
      hendlerStateLoadingButton(idButton, false);

        if (json.responseMaket.maket) {
          setMaket(json.responseMaket.maket);
        }

        if (json.error) {
          addMessage(idButton,'warning', json.error, 3000);
        } else {
          addMessage(idButton,'success', 'Статус макета успешно изменен', 3000);
        }
    }

    const exceptionHandlingFunction = () => {
      hendlerStateLoadingButton(idButton, false); 
    };

    executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction);

  }



const isload = (buttonId) => {
  if (stateLoadingButton.loading.find((id) => { return id == buttonId })){
    return true
  } else {
    return false
  }
}

const handleChangeIndex = (index) => {
  setValue(index);
};


React.useEffect(() => {

const functionRequest = () => {
  return getMaket(props.match.params.id)
};
    
const responseHandlingFunction = (json) => {
    if (!json.error) {
      setMaket(json.maket);
  }
};

const exceptionHandlingFunction = () => {setMaket({})}
    
executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction);      

}, []);


  const messageBox = ()  => {return (<div className={classes.messageBox}>
    
    {getUniqueMessages().map((message)=><Alert key={message.idMessage} severity= {message.typeMessage}>{message.text}</Alert>)}

    <Button onClick = {()=>setMessages([])} variant="outlined" size="medium" color="large" className={classes.margin}>
          ок
      </Button>

 </div>)}

  if (maket != null && maket.code) {

    return (
      <div style={{ textAlign: 'center', maxWidth: '50%', margin: 'auto', marginTop: 30 }}>

    {isOpen && (
      
      <div className={classes.imageBox}>
      <Lightbox 
          mainSrc={`data:image/jpeg;base64,${imgData.imgBase64}`}
          onCloseRequest={() => setIsOpen(false)}
          
          />
          </div>)}

        <Card className={classes.root}>
          <CardContent>
           
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

            
      <Modal
        open={messages.length}
        onClose={()=>{}}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {messageBox()}
      </Modal>


           

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