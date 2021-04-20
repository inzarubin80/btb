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

import { Empty } from 'antd';


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
  }

}));

const TasksTable = (props) => {

  const classes = useStyles();

  return (

    <div>

      <Button variant="contained" color="primary" disableElevation onClick={() => { props.setidTask(-1) }}>
        Добавить задание
   </Button>

      {!props.maket.tasks.length && <Empty className={classes.title} description={(<h3>Нет заданий</h3>)} />}


      {props.maket.tasks.length && <TableContainer component={Paper}>

        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>

            <TableRow>

              <TableCell>Содержание</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell></TableCell>

            </TableRow

            >
          </TableHead>


          <TableBody>
            {props.maket.tasks.map((row) => (
              <TableRow key={row.uid}>

                <TableCell component="th" scope="row" >
                    <div dangerouslySetInnerHTML={{ __html: row.text }} />
                  </TableCell>

                  <TableCell align="center">{row.completed?'выполнено':'не выполнено'}</TableCell>

                  <TableCell align="center">
                    
                              <IconButton  color="primary" onClick={() => {props.handleChangeTask(row.uid)}}>
                                  <EditIcon />
                              </IconButton>
                  
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