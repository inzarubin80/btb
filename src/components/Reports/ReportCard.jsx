import React from 'react';
import { withRouter } from "react-router-dom";
import { ReportsContext } from '../../context/Reports/ReportsContext';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

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

    Progress: {

        display: 'block',
        margin: '0 auto',
        maxWidth: '95%'
    },


}));

const ReportCard = (props) => {

    const { hendleGetReport, reportHTML, listReports, reportRequest, nameReport } = React.useContext(ReportsContext);
    const classes = useStyles();
    React.useEffect(() => {
        hendleGetReport(props.match.params.id)
    }, [props.match.params.id]);


    return (

        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Typography className={classes.heading} gutterBottom variant="h5" component="h2">
                    {nameReport}
                </Typography>
            </Grid>


            <Grid item xs={12}>
              {reportRequest && <CircularProgress className={classes.Progress}/>}
            </Grid>

            <Grid item xs={1} />

            <Grid item xs={10}>
            {!reportRequest && <Card>
                    <div dangerouslySetInnerHTML={{ __html: reportHTML }}  />
                </Card>}

              


            </Grid>

            <Grid item xs={1} />
        </Grid >

    );
}


export default withRouter(ReportCard)