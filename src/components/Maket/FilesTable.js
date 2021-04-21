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


const FilesTable = ({ maket, handleChangeFile, handleDownload,  isload, handleOpenFile }) => {

    const classes = useStyles();
    

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
                                            <IconButton   aria-label="delete" color="primary" onClick={() => { handleOpenFile(file.code, file.fileName, file.shortfileName) }}>
                                                <SearchIcon />
                                            </IconButton>}

                                        {isload(file.fileName + 'open') &&
                                            <CircularProgress />}


                                        {!isload(file.fileName + 'save') && <IconButton style={{ 'display': 'inlineBlock' }} aria-label="delete" color="primary" onClick={() => { handleDownload(file) }}>
                                            <SaveIcon />
                                        </IconButton>}

                                        {isload(file.fileName + 'save') &&
                                            <CircularProgress />}
                                    </CardActions>

                                </TableCell>


                                <TableCell component="th">


                                    {file.shortfileNameСonfirmation}
                                    <CardActions>

                                        {!isload(file.fileNameСonfirmation + 'open') && file.fileNameСonfirmation &&
                                            <IconButton aria-label="delete" color="primary" onClick={() => { handleOpenFile(file.code, file.fileNameСonfirmation, file.shortfileNameСonfirmation) }}>
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



           

        </div>
    );
}

export default FilesTable