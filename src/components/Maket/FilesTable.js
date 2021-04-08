import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import SaveIcon from '@material-ui/icons/Save';
import BackupIcon from '@material-ui/icons/Backup';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Modal from '@material-ui/core/Modal';
import PictureView from './PictureView';


const useStyles = makeStyles((theme) => ({

  table: {
    minWidth: 10,
  },


  rootButton: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  inputButton: {
    display: 'none',
  },
}));


const body = (
    <div >
     
     <PictureView/>

      
    </div>
  );




const UploadButtons = () => {
  const classes = useStyles();

  return (
    <div className={classes.rootButton}>
      <input
        accept="image/*"
        className={classes.inputButton}
        id="contained-button-file"
        type="file"
      />
      <label htmlFor="contained-button-file">
        <IconButton aria-label="delete" variant="contained" color="primary" component="span">
                  <BackupIcon />
                </IconButton>

      </label>
    </div>
  );
}


const FilesTable = ({ files }) => {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>

            <TableCell></TableCell>
            <TableCell>Файл</TableCell>
            <TableCell></TableCell>

            <TableCell></TableCell>

            <TableCell>Файл подтверждения</TableCell>
            <TableCell></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((row) => (
            <TableRow key={row.id}>


              <TableCell align="right">
                <IconButton aria-label="delete"  color="primary" onClick={()=>{handleOpen()}}>
                  <SearchIcon/>
                </IconButton>
              </TableCell>


              <TableCell component="th" scope="row" >
                {row.fileName}
              </TableCell>

              

                <TableCell align="right"  >
                  <IconButton aria-label="delete" color="primary">
                    <SaveIcon />
                  </IconButton>
                </TableCell>


             
              <TableCell align="right">
                <IconButton aria-label="delete"  color="primary">
                  <SearchIcon />
                </IconButton>
              </TableCell>


              <TableCell align="right">{row.fileName}</TableCell>


              <TableCell align="right"><UploadButtons /> </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>

  

    </TableContainer>


{/*
<Modal
open={open}
onClose={handleClose}
aria-labelledby="simple-modal-title"
aria-describedby="simple-modal-description"
>
<PictureView/>
</Modal>
*/}


<Modal
open={open}
onClose={handleClose}
aria-labelledby="simple-modal-title"
aria-describedby="simple-modal-description"
>


     
{body}

      

</Modal>

</div>
  );
}

export default FilesTable