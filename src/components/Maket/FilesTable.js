import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { approval } from './constants'
import { MaketCardContext } from '../../context/MaketCard/MaketCardContext';

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


const FilesTable = () => {



    const { maket } = React.useContext(MaketCardContext);


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


                                        <IconButton aria-label="delete" color="primary" onClick={() => { }}>
                                            <SearchIcon />
                                        </IconButton>



                                        <IconButton style={{ 'display': 'inlineBlock' }} aria-label="delete" color="primary" onClick={() => { }}>
                                            <SaveIcon />
                                        </IconButton>


                                    </CardActions>

                                </TableCell>


                                <TableCell component="th">


                                    {file.shortfileNameСonfirmation}
                                    <CardActions>

                                       
                                            <IconButton aria-label="delete" color="primary" onClick={() => { }}>
                                                <SearchIcon />
                                            </IconButton>

                        


                                         <div className={classes.rootButton}>
                                            <input

                                                accept="image/*"
                                                className={classes.inputButton}
                                                id={"contained-button-file" + file.id}
                                                type="file"


                                                onChange={(e) =>{}}

                                            />
                                            <label htmlFor={"contained-button-file" + file.id}>
                                                <IconButton aria-label="download" variant="contained" color="primary" component="span">
                                                    <BackupIcon />
                                                </IconButton>
                                            </label>
                                        </div>

    
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