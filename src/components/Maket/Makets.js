import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

import { getMakets } from '../../api/dataService1c';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import ArchiveIcon from '@material-ui/icons/Archive';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import BuildIcon from '@material-ui/icons/Build';
import { makeStyles } from '@material-ui/core/styles';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop'


import {
  Link
} from "react-router-dom";


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
    //width: '100%',
    //position: 'fixed',
   // bottom: 0,
  },


}));

const columns = [
  {
    field: 'code', headerName: 'Код', width: 80, type: 'number', renderCell: (params) => (
      <strong>
        <Link to={`/makets/${params.value}`}>{params.value}</Link>
      </strong>
    ),
  },

  { field: 'product', headerName: 'Продукт', width: 450, type: 'string' },
  { field: 'finalBuyer', headerName: 'Конечный покупатель', width: 200, type: 'string' },
  { field: 'Shell', headerName: 'Вид оболочки', width: 150, type: 'string' },
  { field: 'shellType', headerName: 'Тип оболочки', width: 200, type: 'string' },
  { field: 'shellСolor', headerName: 'Цвет оболочки', width: 150, type: 'string' },
  //  { field: 'dateAgreement', headerName: 'Дата согласования', width: 200, type: 'date' },
  { field: 'chromaticity', headerName: 'Цветность', width: 130, type: 'string' },
  { field: 'caliber', headerName: 'Калибр', width: 120, type: 'string' },
  { field: 'typPrinting', headerName: 'Тип печати', width: 200, type: 'string' },



];



export default function Makets() {

  const [maketsAr, setMakets] = React.useState([]);

  const handleChangeBottomNavigation = (event, newStatus) => {
    setStatus(newStatus);
  };

  const classes = useStyles();


  const [status, setStatus] = React.useState('harmonization');

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

  //style={{ height: 400, width: '100%' }}

  return (


    <div>

    
        <BottomNavigation value={status} onChange={handleChangeBottomNavigation} className={classes.stickToBottom} showLabels>
          <BottomNavigationAction label="Согласование" value="harmonization" icon={<HowToRegIcon />} />
          <BottomNavigationAction label="Разработка" value="development" icon={<BuildIcon />} />
          <BottomNavigationAction label="Готовые" value="ready" icon={<LocalPrintshopIcon />} />
          <BottomNavigationAction label="Архив" value="archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
    


      <div style={{ width: '100%' }}>

        <DataGrid rows={maketsAr} columns={columns} pageSize={10} rowsPerPageOptions={[5, 10, 25]} autoHeight={true} rowHeight={25} hideFooterSelectedRowCount={true}/>

      </div>


    </div>

  );
}
