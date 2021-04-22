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


  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (

    <div>



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


                      <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                          <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Файлы (" + row.files.length + ")"} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={open} timeout="auto" unmountOnExit>

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

                      <IconButton color="primary" onClick={() => {props.handleChangeTask(row.uid)}}>
                        <EditIcon />
                      </IconButton>

                      <IconButton color="primary" onClick={() => { }}>
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