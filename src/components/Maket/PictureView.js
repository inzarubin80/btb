import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
   //maxWidth: 345,
   marginTop: 90
  },
  media: {
   // height: 140,
  },
});

 const PictureView = () => {

  const classes = useStyles();

  return (
    <div style={{ textAlign: 'center', maxWidth: '50%', margin: 'auto', marginTop: 30}}>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://inbusiness.kz/ru/images/original/1/images/BCEyuQqP.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}

export default PictureView