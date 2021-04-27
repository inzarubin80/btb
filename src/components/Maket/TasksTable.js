import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import 'antd/dist/antd.css';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardHeader from '@material-ui/core/CardHeader';
import { Empty } from 'antd';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import SaveIcon from '@material-ui/icons/Save';
import FolderIcon from '@material-ui/icons/Folder';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { executorRequests, removeTask} from '../../api/dataService1c';
import {useDispatch} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 10,
    margin: theme.spacing(4, 0, 2),
  },

  title: {
    marginTop: 25
  },


  listFiles: {
    marginTop: 25
  },

  taskСhanges: {
    borderWidth: '1px',
    borderStyle: 'solid',
    //border:5,
    //borderWidth: 10,
    borderСolor: '#777',
    padding: '7px'

  },

  input: {
    display: 'none',
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 1),
  },


  buttonModal: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },


}));



const TasksTable = (props) => {


  const [removeUID, setremoveUID] = React.useState('');

  const removeTask_ = props.maket.tasks.find((task) => task.uid == removeUID);

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleClick = (idFolder) => {

    if (props.isload(idFolder)) {
      props.hendlerStateLoadingButton(idFolder, false);
    } else {
      props.hendlerStateLoadingButton(idFolder, true);
    }
  };

  const handleCancelRemoveTask = () => {
    setremoveUID('');
  };

const handleRemoveTask = () => {
  
  const idButton = removeUID + 'removeTask';
  
  props.hendlerStateLoadingButton(idButton, true);

  const functionRequest = () => {
    return removeTask(props.maket.code, removeUID)
  };
    
  const exceptionHandlingFunction = () => {
    props.hendlerStateLoadingButton(idButton, false);
  }

  const responseHandlingFunction = (json) => {
    if (json.responseMaket.maket) {
        props.setMaket(json.responseMaket.maket);
     }
    
     props.hendlerStateLoadingButton(idButton, false);
    
     if (!json.error) {
        props.addMessage(idButton, 'success','Задание успешно удалено', 1500); 
      } else {
        props.addMessage(idButton, 'warning', json.error, 3000); 
      }
    };
    
    executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch);
    setremoveUID('');

  };
  
  return (

    <div>


      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={removeUID!=''}
        onClose={() => { }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={removeUID!=''}>

          <div>


            <div className={classes.paper}>
              {/* <h2 id="transition-modal-title">Transition modal</h2>*/}

              {removeTask_ && <p id="transition-modal-description">{'Уверены что хотите удалить задание №' + removeTask_.number + '?'}</p>}
            </div>


            <div className={classes.buttonModal}>
                            
              <Button variant="contained" color="primary" onClick={()=>handleRemoveTask()}>Да</Button>
              <Button variant="contained" onClick={()=>{handleCancelRemoveTask()}}> Нет</Button>

            </div>
          </div>

        </Fade>
      </Modal>


      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<AddCircleIcon />}
        onClick={() => { props.setidTask(-1) }}
      >
        Добавить
      </Button>


      {!props.maket.tasks.length &&
        <Empty className={classes.title} description={(<h3>Нет заданий</h3>)} />}


      {props.maket.tasks.length &&

        <TableContainer component={Paper}>


          <Table className={classes.table} size="small" aria-label="a dense table">

            <TableHead>

              <TableRow>

                <TableCell>Задания</TableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {props.maket.tasks.map((row) => (
                <TableRow key={row.uid}>

                  <TableCell component="th" scope="row" >

                    <CardHeader
                      title={"№" + row.number}
                      subheader={row.documentDate}
                    />

                    <div dangerouslySetInnerHTML={{ __html: row.text }} style={{ backgroundColor: 'rgba(252, 252, 250)', minHeight: 60 }} />

                    <List
                      component="nav"
                      aria-labelledby="nested-list-subheader"

                      className={classes.root}
                    >


                      <ListItem button onClick={() => handleClick(row.uid + 'folderFilesIsOpen')}>
                        <ListItemIcon>
                          <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Присоединенные файлы (" + row.files.length + ")"} />
                        {props.isload(row.uid + 'folderFilesIsOpen') ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>

                      <Collapse in={props.isload(row.uid + 'folderFilesIsOpen')} timeout="auto" unmountOnExit>

                        <List component="div" disablePadding>


                          {row.files.map((file) => <ListItem key={file.uid} button className={classes.nested}>

                            {!props.isload(file.uid + 'save') && <IconButton aria-label="delete" color="primary" onClick={() => props.handleDownloadFileTask(row.uid, file.uid)}>
                              <SaveIcon />
                            </IconButton>}

                            {props.isload(file.uid + 'save') &&
                              <CircularProgress />}


                            <ListItemText primary={file.name} />
                          </ListItem>)}

                        </List>


                      </Collapse>
                    </List>

                    <CardHeader
                      subheader={row.uthor}
                    />
                    <CardActions>

                      {!(props.isload(row.uid + 'handleChangeTask') || props.isload(row.uid + 'removeTask')) && <IconButton color="primary" onClick={() => { props.handleChangeTask(row.uid) }}>
                        <EditIcon />
                      </IconButton>}

                      {(props.isload(row.uid + 'handleChangeTask') || props.isload(row.uid + 'removeTask')) &&
                        <CircularProgress />}

                    {!(props.isload(row.uid + 'handleChangeTask') || props.isload(row.uid + 'removeTask')) &&  <IconButton color="secondary" onClick={() => { setremoveUID(row.uid) }}>
                        <DeleteIcon />
                      </IconButton>}


                    </CardActions>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>}

    </div>

  );

}


export default TasksTable