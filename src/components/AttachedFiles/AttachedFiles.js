import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { getBase64 } from '../../utils/utils';
import BackupIcon from '@material-ui/icons/Backup';

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


    },

    input: {
        display: 'none',
    },

    buttonGroup: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },



}));

const AttachedFiles = ({ files, removeFile, addFile }) => {

    const classes = useStyles();

    return (
        <div className={classes.listFiles} >

            <Typography variant="h5" className={classes.title}>
                Присоединенные файлы
            </Typography>

            <div className={classes.demo}>
                <List dense={false}>

                    {files.map((file) => (<ListItem key={file.uid}>

                        primary={file.name}

                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => {
                                removeFile(file.uid)
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>))}


                </List>
            </div>

            <input

                className={classes.input}
                id={"contained-button-file"}
                type="file"

                onChange={(e) => {
                    if (e.target.files) {

                        const file = e.target.files[0];
     
                        getBase64(file)
                            .then(base64 => {

                                if (base64) {
                                    const newFile = { name: file.name, uid: uuidv4(), fileBase64: base64 };
                                    addFile(newFile);
                                }


                            }).catch((err) => {
                            }
                            )
                    }
                }
                }
            />

            <label htmlFor={"contained-button-file"}>

                <IconButton aria-label="download" variant="contained" color="primary" component="span">
                    <BackupIcon />
                </IconButton>
            </label>



        </div>
    )

}

export default AttachedFiles;

