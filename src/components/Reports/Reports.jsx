import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    paper: {
        textAlign: 'center',
        width: '80%',
        //color: theme.palette.text.secondary,
        margin: '0 auto',
        marginBottom: '35px'

    },

}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function Reports() {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Grid container spacing={3}>

            <Grid item xs={12}/>

                <Grid item xs={12}>
                    <Typography className={classes.paper} xs={12} variant="h6" component="h6">
                        Отчеты
                    </Typography>
                </Grid>


                <Grid item xs={1} />
                <Grid item xs={10}>


                    <List component="nav" aria-label="secondary mailbox folders">

                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>

                    </List>
                </Grid>
            </Grid>

        </div>
    );
}