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

  return (
    <div className={classes.taskСhanges}>

      <Typography variant="h6" className={classes.title}>
        Задание {' *'}
      </Typography>

      <TextField style={{ 'width': '100%' }}
        id="standard-multiline-flexible"
        label="Содержание"
        multiline
        //rowsMax={4}
        value={props.taskTextValue}
        onChange={(event) => { props.handleChangeTaskTextValue(event) }}
      />


      <div className={classes.listFiles} >

        <Typography variant="h7" className={classes.title}>
           Прикрепленные файлы
          </Typography>

        <div className={classes.demo}>
          <List dense={false}>

            <ListItem>

              <ListItemText
                primary="Визитка художника.jpeg"
              //    secondary={true ? 'Secondary text' : null}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>

        <input

        //  accept="image/*"
          className={classes.input}
          id={"contained-button-file"}
          type="file"


        //onChange={(e) => handleChangeFile(file.code, e.target.files[0], file.fileName, file.shortfileName)}

        />
        <label htmlFor={"contained-button-file"}>
          <IconButton aria-label="download" variant="contained" color="primary" component="span">
            <BackupIcon />
          </IconButton>
        </label>




      </div>

      <Button style={{ 'marginTop': 10 }} variant="contained" color="primary" onClick={()=>{props.setidTask(null)}}>
        Записать задание
      </Button>

    </div>

  );

}


export default FormTask