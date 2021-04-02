import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MaketCard from './MaketCard.js'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop'
import ArchiveIcon from '@material-ui/icons/Archive';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import BuildIcon from '@material-ui/icons/Build';
import {getMakets} from '../../api/dataService1c';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },

  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  

}));

export default function Makets(Props) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();


  const [status, setStatus] = React.useState('harmonization');

  const [maketsAr, setMakets] = React.useState([]);;
  

  const handleChangeBottomNavigation = (event, newStatus) => {
    setStatus(newStatus);
  };

  


  React.useEffect(() => {
    
    getMakets(status)
      .then(response => response.json())
      .then((json) => {
        setMakets(json);
        console.log(json)
      })
      .catch((err) => {
        
        //setMakets(setEventsFailure());

      });
  
  }, [status]);

  console.log('maketsAr', maketsAr);


  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {maketsAr.map((value) => (
            <Grid key={value.id} item>
              
              <MaketCard id = {value.code} product = {value.product} chromaticity= {value.chromaticity}/>

            </Grid>
          ))}
        </Grid>
      </Grid>
      

      <BottomNavigation value={status} onChange={handleChangeBottomNavigation} className={classes.stickToBottom} showLabels>
      
      <BottomNavigationAction label="Согласование"   value="harmonization" icon={<HowToRegIcon />} />
      <BottomNavigationAction label="Разработка"     value="development" icon={<BuildIcon />} />
      
      <BottomNavigationAction label="Готовые"       value="ready" icon={<LocalPrintshopIcon />} />
      <BottomNavigationAction label="Архив"         value="archive" icon={<ArchiveIcon />} />
      </BottomNavigation>

    </Grid>
  );
}
