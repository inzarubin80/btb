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
import CircularProgress from '@material-ui/core/CircularProgress';

import {approval} from './statuses'


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







const FilesTable = ({maket, handleChangeFile, handleDownload, setStateLoadingButton, stateLoadingButton}) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState({});


    const handleOpen = (code, fileName, shortfileName) => {
        setOpen(true);
        setFile({code, fileName, shortfileName});
    };

    const handleClose = () => {
        setOpen(false);
    };

    
    const body = () => {
        return (
            <div >
                <PictureView fileName={file.fileName} setStateLoadingButton = {setStateLoadingButton} shortfileName={file.shortfileName} macetCode={file.code} handleClose={handleClose} />
            </div>
        );
    }


    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>


                            <TableCell>Файл</TableCell>

                            <TableCell/>
                            <TableCell/>

                            <TableCell>Файл подтверждения</TableCell>
                            
                            <TableCell/>
                            <TableCell/>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {maket.files.map((file) => (
                            <TableRow key={file.id}>



                                <TableCell component="th" scope="file" >
                                    {file.shortfileName}
                                </TableCell>


                                <TableCell align="right">
                                    
                                    {!stateLoadingButton.opens.find(fileName => fileName == file.fileName) &&
                                    <IconButton aria-label="delete" color="primary" onClick={() => {handleOpen(file.code, file.fileName, file.shortfileName) }}>
                                        <SearchIcon />
                                    </IconButton>}
                                     
                                     {stateLoadingButton.opens.find(fileName => fileName == file.fileName) && 
                                     <CircularProgress /> }

                                </TableCell>


                                <TableCell align="right"  >

                                   {!stateLoadingButton.loading.find(fileName => fileName == file.fileName) && <IconButton aria-label="delete" color="primary" onClick={() => { handleDownload(file) }}>
                                        <SaveIcon />
                                    </IconButton>}

                                     {stateLoadingButton.loading.find(fileName => fileName == file.fileName) && 
                                     <CircularProgress /> }
                                
                                 </TableCell>



                                 <TableCell align="right">{file.shortfileNameСonfirmation}</TableCell>


                                 <TableCell align="right">
                                    
                                    {!stateLoadingButton.opens.find(fileName => fileName == file.fileNameСonfirmation) && file.fileNameСonfirmation &&
                                    <IconButton aria-label="delete" color="primary" onClick={() => {handleOpen(file.code, file.fileNameСonfirmation, file.shortfileNameСonfirmation) }}>
                                        <SearchIcon />
                                    </IconButton>}
                                     
                                     {stateLoadingButton.opens.find(fileName => fileName == file.fileNameСonfirmation) && 
                                     <CircularProgress /> }

                                </TableCell>


                                <TableCell align="right">
                                    {!stateLoadingButton.upLoading.find(fileName => fileName == file.fileName) && approval==maket.status &&  <div className={classes.rootButton}>
                                        <input

                                            accept="image/*"
                                            className={classes.inputButton}
                                            id={"contained-button-file"+file.id} 
                                            type="file"


                                            onChange={(e) => handleChangeFile(file.code, e.target.files[0], file.fileName, file.shortfileName)}

                                        />
                                        <label htmlFor={"contained-button-file"+file.id}>
                                            <IconButton aria-label="download" variant="contained" color="primary" component="span">
                                                <BackupIcon />
                                            </IconButton>
                                        </label>
                                    </div>}


                                    {stateLoadingButton.upLoading.find(fileName => fileName == file.fileName) && 
                                     <CircularProgress /> }
                                    

                                </TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>



            </TableContainer>



            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body()}

            </Modal>

        </div>
    );
}

export default FilesTable