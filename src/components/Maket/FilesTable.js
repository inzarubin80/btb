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
import {getImgMaket, saveFileСonfirmation} from '../../api/dataService1c';


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


const getBase64 = (file) => {
    return new Promise(resolve => {
        let fileInfo;
        let baseURL = "";
        // Make new FileReader
        let reader = new FileReader();

        // Convert the file to base64 text
        reader.readAsDataURL(file);

        // on reader load somthing...
        reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;
            //console.log(baseURL);
            resolve(baseURL);
        };
        console.log(fileInfo);
    });
};




const FilesTable = ({ files, macetCode }) => {

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

    const handleChangeFile = (event, fileName, shortfileName) => {
       
        const  file = event.target.files[0];

        console.log('fileName',fileName);
        console.log('shortfileName',shortfileName);
        

        getBase64(file).then(fileBase64 => {
            console.log('result');
            saveFileСonfirmation(macetCode,fileName,shortfileName, fileBase64);
        })
            .catch(err => {
                console.log(err);
            });
          }


    const UploadButtons = ({fileName, shortfileName}) => {

        return (
            <div className={classes.rootButton}>
                <input
                
                accept="image/*"
                className={classes.inputButton}
                id="contained-button-file"
                type="file"
                onChange={(e)=>{handleChangeFile(e, fileName, shortfileName)}}
                
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



                const linkSource = `data:image/jpeg;base64,${json.imgBase64}`;
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
                        {files.map((row) => (
                            <TableRow key={row.id}>


                                <TableCell align="right">
                                    <IconButton aria-label="delete" color="primary" onClick={() => { handleOpen(row) }}>
                                        <SearchIcon />
                                    </IconButton>
                                </TableCell>


                                <TableCell component="th" scope="row" >
                                    {row.shortfileName}
                                </TableCell>



                                <TableCell align="right"  >
                                    <IconButton aria-label="delete" color="primary" onClick={() => { handleDownload(row) }}>
                                        <SaveIcon />
                                    </IconButton>
                                </TableCell>



                                <TableCell align="right">
                                    <IconButton aria-label="delete" color="primary">
                                        <SearchIcon />
                                    </IconButton>
                                </TableCell>


                                <TableCell align="right">{row.shortfileNameСonfirmation}</TableCell>


                                <TableCell align="right"><UploadButtons shortfileName = {row.shortfileName} fileName = {row.fileName}/> </TableCell>

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