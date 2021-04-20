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
import CardActions from '@material-ui/core/CardActions';
import { approval } from './statuses'


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


const FilesTable = ({ maket, handleChangeFile, handleDownload, hendlerStateLoadingButton, isload }) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState({});

    const handleOpen = (code, fileName, shortfileName) => {
        setOpen(true);
        setFile({ code, fileName, shortfileName });
    };

    const handleClose = () => {
        setOpen(false);
    };


    const body = () => {
        return (
            <div >
                <PictureView fileName={file.fileName} hendlerStateLoadingButton={hendlerStateLoadingButton} shortfileName={file.shortfileName} macetCode={file.code} handleClose={handleClose} />
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


                            <TableCell>Файл подтверждения</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {maket.files.map((file) => (
                            <TableRow key={file.id}>



                                <TableCell component="th" scope="file" >

                                    {file.shortfileName}

                                    <CardActions>

                                        {!isload(file.fileName + 'open') &&
                                            <IconButton style={{ 'float': 'left' }} style={{ 'display': 'inlineBlock' }} aria-label="delete" color="primary" onClick={() => { handleOpen(file.code, file.fileName, file.shortfileName) }}>
                                                <SearchIcon />
                                            </IconButton>}

                                        {isload(file.fileName + 'open') &&
                                            <CircularProgress style={{ 'display': 'inlineBlock' }} />}


                                        {!isload(file.fileName + 'save') && <IconButton style={{ 'display': 'inlineBlock' }} aria-label="delete" color="primary" onClick={() => { handleDownload(file) }}>
                                            <SaveIcon />
                                        </IconButton>}

                                        {isload(file.fileName + 'save') &&
                                            <CircularProgress style={{ 'display': 'inlineBlock' }} />}
                                    </CardActions>

                                </TableCell>


                                <TableCell component="th">


                                    {file.shortfileNameСonfirmation}
                                    <CardActions>

                                        {!isload(file.fileNameСonfirmation + 'open') && file.fileNameСonfirmation &&
                                            <IconButton aria-label="delete" color="primary" onClick={() => { handleOpen(file.code, file.fileNameСonfirmation, file.shortfileNameСonfirmation) }}>
                                                <SearchIcon />
                                            </IconButton>}

                                        {isload(file.fileNameСonfirmation + 'open') &&
                                            <CircularProgress />}



                                        {!isload(file.fileName + 'upload') && approval == maket.status && <div className={classes.rootButton}>
                                            <input

                                                accept="image/*"
                                                className={classes.inputButton}
                                                id={"contained-button-file" + file.id}
                                                type="file"


                                                onChange={(e) => handleChangeFile(file.code, e.target.files[0], file.fileName, file.shortfileName)}

                                            />
                                            <label htmlFor={"contained-button-file" + file.id}>
                                                <IconButton aria-label="download" variant="contained" color="primary" component="span">
                                                    <BackupIcon />
                                                </IconButton>
                                            </label>
                                        </div>}


                                        {isload(file.fileName + 'upload') &&
                                            <CircularProgress />}
                                    </CardActions>

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