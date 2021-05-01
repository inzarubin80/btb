import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { MaketCardContext } from '../../context/MaketCard/MaketCardContext';

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



const TasksTable = () => {

  const { maket, idTaskRemove, openChangeTask, addTask, removeTaskStart, removeTaskCancel, hendleRemoveTask} = React.useContext(MaketCardContext);



  const classes = useStyles();



  return (

    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={idTaskRemove != null}
        onClose={() => { }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={idTaskRemove != null}>

          <div>


            <div className={classes.paper}>
              {/* <h2 id="transition-modal-title">Transition modal</h2>*/}

              {idTaskRemove && <p id="transition-modal-description">{'Уверены что хотите удалить задание ' + maket.tasks.find((task)=>task.uid==idTaskRemove).number + '?'}</p>}
            </div>


            <div className={classes.buttonModal}>

              <Button variant="contained" color="primary" onClick={() => {hendleRemoveTask()}}>Да</Button>
              <Button variant="contained" onClick={() => {removeTaskCancel()}}> Нет</Button>

            </div>
          </div>

        </Fade>
      </Modal>


      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<AddCircleIcon />}
        onClick={() => { addTask() }}
      >
        Добавить
      </Button>


      {!maket.tasks.length &&
        <Empty className={classes.title} description={(<h3>Нет заданий</h3>)} />}


      {maket.tasks.length &&

        <TableContainer component={Paper}>


          <Table className={classes.table} size="small" aria-label="a dense table">

            <TableHead>

              <TableRow>

                <TableCell>Задания</TableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {maket.tasks.map((task) => (
                <TableRow key={task.uid}>

                  <TableCell component="th" scope="row" >

                    <CardHeader
                      title={"№" + task.number}
                      subheader={task.documentDate}
                    />

                    <div dangerouslySetInnerHTML={{ __html: task.text }} style={{ backgroundColor: 'rgba(252, 252, 250)', minHeight: 60 }} />

                    <List
                      component="nav"
                      aria-labelledby="nested-list-subheader"

                      className={classes.root}
                    >

                      <ListItem button onClick={() => { }}>
                        <ListItemIcon>
                          <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Присоединенные файлы (" + task.files.length + ")"} />
                        {true ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>

                      <Collapse in={true} timeout="auto" unmountOnExit>

                        <List component="div" disablePadding>


                          {task.files.map((file) => <ListItem key={file.uid} button className={classes.nested}>

                            <IconButton aria-label="delete" color="primary" onClick={() => { }}>
                              <SaveIcon />
                            </IconButton>

                            <ListItemText primary={file.name} />
                          </ListItem>)}

                        </List>


                      </Collapse>
                    </List>

                    <CardHeader
                      subheader={task.uthor}
                    />
                    <CardActions>

                      <IconButton color="primary" onClick={() => {openChangeTask(task.uid) }}>
                        <EditIcon />
                      </IconButton>


                      <IconButton color="secondary" onClick={() => {removeTaskStart(task.uid)}}>
                        <DeleteIcon />
                      </IconButton>


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