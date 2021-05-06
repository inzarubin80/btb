import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FolderIcon from '@material-ui/icons/Folder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { ReportsContext } from '../../context/Reports/ReportsContext';
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
        marginTop: theme.spacing(4),

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



export default function Reports(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const { message, reportsListRequest, listReports, reportGroups, hendleGetReportList, hendleOpenFolderReports, openFoldersReport } = React.useContext(ReportsContext);



    console.log('reportGroups', reportGroups);


    const folderIsOpen = (id) => {
        return openFoldersReport.find(id_ => id_ == id) ? true : false;
    }

    React.useEffect(() => {
            hendleGetReportList()  
    }, []);



    return (

        <div className={classes.root}>

            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Typography className={classes.heading} gutterBottom variant="h5" component="h2">
                        Отчеты
                    </Typography>
                </Grid>

                <Grid item xs={1} />

                <Grid item xs={10}>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.root}
                    >

                        { reportGroups.map((group) => (<div key={group.id}><ListItem  button onClick={() => hendleOpenFolderReports(group.id)}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary={group.name} />
                            {folderIsOpen(group.id) ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>

                            <Collapse in={folderIsOpen(group.id)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>

                                    {listReports.filter(report => report.group == group.id)
                                        .map((report) => (


                                            <ListItem key={report.id} component={Link} to={`/reports/${report.id}`}>
                                                <ListItemText  primary={report.name} />
                                            </ListItem>


                                        ))}

                                </List>
                            </Collapse>


                        </div>))}

                    </List>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        </div>

    );
}