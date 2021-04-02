import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {getMaket} from '../../api/dataService1c';


import {
 withRouter
} from "react-router-dom";


const useStyles = makeStyles({
  root: {
    minWidth: 120  
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


const MaketFullCard = (props) => {
  
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [maket, setMaket] = React.useState({});;

  //console.log("props MaketFullCard", props.match.params.id);

  React.useEffect(() => {
    
    getMaket(props.match.params.id)
      .then(response => response.json())
      .then((json) => {
        setMaket(json);
      })
      .catch((err) => {
        
        setMaket({});

      });
  
  }, []);
  
  console.log(maket);


  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            {maket.code}
        </Typography>
        </CardContent>
      
    </Card>
  );
}

export default withRouter(MaketFullCard)