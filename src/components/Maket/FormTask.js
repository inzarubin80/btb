import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
  }

}));

const FormTask = (props) => {

  const classes = useStyles();

  const task = props.maket.tasks.find((task) => task.uid == props.idTask);



  return (
    <div className={classes.taskСhanges}>


      <Typography variant="h6" className={classes.title}>
        Задание {(!task) ? ' *' : "№ " + task.number}
      </Typography>


      {/*

      <TextField style={{ 'width': '100%' }}
        id="standard-multiline-flexible"
        label="Содержание"
        multiline
        //rowsMax={4}
        value={props.taskTextValue}
        onChange={(event) => { props.handleChangeTaskTextValue(event) }}
      />

*/}

      <HTMLEditor editorState={props.editorState} setEditorState={props.setEditorState} />

      <div className={classes.listFiles} >

        <Typography variant="h5" className={classes.title}>
          Прикрепленные файлы
        </Typography>

        <div className={classes.demo}>
          <List dense={false}>

            {props.taskFiles.map((file) => (<ListItem key={file.uid}>

              <ListItemText
                primary={file.name}
              //    secondary={true ? 'Secondary text' : null}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => {
                  props.setTaskFiles((prevState) => prevState.filter((item) => item.uid != file.uid))
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

              props.hendlerStateLoadingButton('uploadTaskFile', true);

              const file = e.target.files[0];

              props.getBase64(file)
                .then(base64 => {

                  const newFile = { name: file.name, uid: uuidv4(), fileBase64: base64 };
                  props.setTaskFiles((prevState) => [...prevState, newFile])
                  props.hendlerStateLoadingButton('uploadTaskFile', false);


                }).catch((err) => {
                  props.hendlerStateLoadingButton('uploadTaskFile', false);
                }
                )
            }
          }
          }
        />

        <label htmlFor={"contained-button-file"}>

          {!props.isload('uploadTaskFile') && <IconButton aria-label="download" variant="contained" color="primary" component="span">
            <BackupIcon />
          </IconButton>}

          {props.isload('uploadTaskFile') &&
            <CircularProgress />}

        </label>

      </div>

      {!props.isload('saveTask') && <Button style={{ 'marginTop': 10 }} variant="contained" color="primary" onClick={() => { props.handleSaveTask() }}>
        {(!task) ? 'Добавить задание' : "Обновить задание"}
      </Button>}
      
      {props.isload('saveTask') &&
            <CircularProgress />}

    </div>

  );

}


export default FormTask