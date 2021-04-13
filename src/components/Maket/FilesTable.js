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
import { getImgMaket, saveFileСonfirmation } from '../../api/dataService1c';


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







const FilesTable = ({ files, macetCode, handleChangeFile }) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState({});


    const handleOpen = (file) => {
        setOpen(true);
        setFile(file);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const UploadButtons = (props) => {

        console.log(props.fileName);

        return (
            <div className={classes.rootButton}>
                <input

                    accept="image/*"
                    className={classes.inputButton}
                    id="contained-button-file"
                    type="file"


                    onChange={(e) => handleChangeFile(props.code, e.target.files[0], props.fileName, props.shortfileName)}

                />
                <label htmlFor="contained-button-file">

                    <IconButton aria-label="download" variant="contained" color="primary" component="span">
                        <BackupIcon />
                    </IconButton>

                </label>
            </div>
        );
    }

    const handleDownload = ({ fileName, shortfileName }) => {

        getImgMaket(macetCode, fileName)
            .then(response => response.json())
            .then((json) => {



                const linkSource = `data:image/jpeg;base64,${json.file.imgBase64}`;
                const downloadLink = document.createElement("a");
                downloadLink.href = linkSource;
                downloadLink.download = shortfileName;
                downloadLink.click();


            })
            .catch((err) => {

            });
    }



    const body = () => {
        return (
            <div >
                <PictureView fileName={file.fileName} shortfileName={file.shortfileName} macetCode={macetCode} handleClose={handleClose} />
            </div>
        );
    }


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
                        {files.map((file) => (
                            <TableRow key={file.id}>


                                <TableCell align="right">
                                    <IconButton aria-label="delete" color="primary" onClick={() => { handleOpen(file) }}>
                                        <SearchIcon />
                                    </IconButton>
                                </TableCell>


                                <TableCell component="th" scope="file" >
                                    {file.shortfileName}
                                </TableCell>



                                <TableCell align="right"  >
                                    <IconButton aria-label="delete" color="primary" onClick={() => { handleDownload(file) }}>
                                        <SaveIcon />
                                    </IconButton>
                                </TableCell>



                                <TableCell align="right">
                                    <IconButton aria-label="delete" color="primary">
                                        <SearchIcon />
                                    </IconButton>
                                </TableCell>


                                <TableCell align="right">{file.shortfileNameСonfirmation}</TableCell>


                                <TableCell align="right">

                                    <div className={classes.rootButton}>
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
                                    </div>

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