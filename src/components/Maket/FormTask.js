import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import BackupIcon from '@material-ui/icons/Backup';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import HTMLEditor from './HTMLEditor'
import { v4 as uuidv4 } from 'uuid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MaketCardContext } from '../../context/MaketCard/MaketCardContext';
import { getBase64 } from '../../utils/utils';

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
    //  borderWidth: '1px',
    //borderStyle: 'solid',
    //  borderСolor: '#777',
    //padding: '7px'

  },

  input: {
    display: 'none',
  },

  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },



}));

const FormTask = () => {

  const classes = useStyles();
  const { maket, idTaskChange, taskChangeFiles, editorState, removeTaskFile, addTaskFile, editingHtmlText, handleSaveTask, cancelTaskEditing} = React.useContext(MaketCardContext);
  const task = maket.tasks.find((task) => task.uid == idTaskChange);

  return (
    <div className={classes.taskСhanges}>

      <div className={classes.buttonGroup}>


        <Button variant="contained" color="secondary" onClick={()=>cancelTaskEditing()}>Отмена</Button>

        <Button style={{ 'marginTop': 10 }} variant="contained" color="primary" onClick={()=>handleSaveTask()}>
          {(!task) ? 'Добавить задание' : "Обновить задание"}
        </Button>


      </div>

      <Typography variant="h6" className={classes.title}>
        Задание {(!task) ? ' *' : "№ " + task.number}
      </Typography>



      <HTMLEditor editorState={editorState} setEditorState={editingHtmlText} />

      <div className={classes.listFiles} >

        <Typography variant="h5" className={classes.title}>
          Присоединенные файлы
        </Typography>

        <div className={classes.demo}>
          <List dense={false}>

            {taskChangeFiles.map((file) => (<ListItem key={file.uid}>

              <ListItemText
                primary={file.name}
              //    secondary={true ? 'Secondary text' : null}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => {
                  removeTaskFile(file.uid)
                }}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>))}


          </List>
        </div>

        <input

          className={classes.input}
          id={"contained-button-file"}
          type="file"

          onChange={(e) => {
            if (e.target.files) {


              const file = e.target.files[0];

              getBase64(file)
                .then(base64 => {

                  const newFile = { name: file.name, uid: uuidv4(), fileBase64: base64 };
                  addTaskFile(newFile);



                }).catch((err) => {
                }
                )
            }
          }
          }
        />

        <label htmlFor={"contained-button-file"}>

          <IconButton aria-label="download" variant="contained" color="primary" component="span">
            <BackupIcon />
          </IconButton>


        </label>
      </div>
    </div>

  );

}


export default FormTask