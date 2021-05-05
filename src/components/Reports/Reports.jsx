import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';


import SendIcon from '@material-ui/icons/Send';

import FolderIcon from '@material-ui/icons/Folder';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Divider from '@material-ui/core/Divider';



const useStyles = makeStyles((theme) => ({
    root: {

        flexGrow: 1,
        //width: '100%',
        // maxWidth: 360,
        // backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },

    heading: {
        textAlign: 'center',
        marginTop:theme.spacing(4),

    },

    paper: {
        textAlign: 'center',
        //width: '80%',
        //color: theme.palette.text.secondary,
        marginTop: 10,
        margin: '0 auto',
        //marginBottom: '35px'

    },
}));

export default function Reports() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (

        <div className={classes.root}>

            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Typography className={classes.heading} gutterBottom variant="h5" component="h2">
                        Отчеты
                    </Typography>
                </Grid>

                <Grid item xs={1}/>

                <Grid item xs={10}>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"

                        className={classes.root}
                    >
                        <ListItem button onClick={handleClick}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary="Комерция" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                <ListItem button className={classes.nested}>
                                  
                                    <ListItemText primary="Заказы" />
                                </ListItem>
                                <Divider variant="inset" component="li" />

                                <ListItem button className={classes.nested}>
                                   
                                    <ListItemText primary="Взаиморасчеты" />
                                </ListItem>

                                <Divider variant="inset" component="li" />

                            </List>
                        </Collapse>


                        <ListItem button onClick={handleClick}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary="Бухгалтерский учет" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                <ListItem button className={classes.nested}>
                                   
                                    <ListItemText primary="Акт сверки" />
                                </ListItem>
                                <Divider variant="inset" component="li" />

                               

                                <Divider variant="inset" component="li" />

                            </List>
                        </Collapse>
                    </List>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        </div>

    );
}