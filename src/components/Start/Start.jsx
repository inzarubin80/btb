import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import logo from './LOGO_SLAVA.png' // relative path to image 
import prod from './Prod.jpg' // relative path to image 


const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,

        },

        ref: {

            display: 'block',
            margin: '0 auto',
            width: '240px'
        },


        logo: {

            display: 'block',
            margin: '0 auto',
            maxWidth: '95%'
        },

        paper: {
            textAlign: 'center',
            width: '80%',
            //color: theme.palette.text.secondary,
            margin: '0 auto',
            marginBottom: '35px'

        },

    }),
);


export default function Start() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>


                <Grid item xs={12}>
                    <a href="http://nposlava.com/" className={classes.ref}>  <img className={classes.logo} src={logo}></img> </a>
                </Grid>


                <Grid item xs={12} className={classes.paper}>

                    <Link href="http://nposlava.com/">
                        http://nposlava.com
                 </Link>

                </Grid>

                <Grid item xs={12}>
                    <Typography className={classes.paper} xs={12} variant="h6" component="h6">
                        Научно-производственное объединение "СЛАВА"
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography className={classes.paper} variant="body2" color="textSecondary" component="p">
                        Компания НПО «СЛАВА» была создана в апреле 2004 года. 
                        За короткий срок работы компания заняла лидирующую позицию 
                        в упаковочной отрасли и, не останавливаясь на достигнутом, 
                        активно развивается, каждый год разрабатывая и запуская 
                        в производство новые виды упаковочной продукции.
                    </Typography>
                </Grid>


                <Grid item xs={12}>
                    <img className={classes.logo} xs={12} src={prod}></img>
                </Grid>




            </Grid>
        </div>
    );
}