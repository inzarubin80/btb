import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ArchiveIcon from '@material-ui/icons/Archive';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import BuildIcon from '@material-ui/icons/Build';
import { makeStyles } from '@material-ui/core/styles';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop'
import { useDispatch, useSelector } from 'react-redux';
import {сhangePageParams,  сhangeFiltr, сhangeSort, setMaketsStatus} from '../../redux/makets/maketsActions';
import {
  Link
} from "react-router-dom";


import Gridstrings from './Gridstrings'




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
    field: 'code', headerName: 'Код', width: 80, type: 'string', renderCell: (params) => (
      <strong>
        <Link to={`/makets/${params.value}`}>{params.value}</Link>
      </strong>
    ),
  },

  { field: 'product', headerName: 'Продукт', width: 450, type: 'string' },
  { field: 'finalBuyer', headerName: 'Конечный покупатель', width: 200, type: 'string' },
  { field: 'Shell', headerName: 'Вид продукции', width: 180, type: 'string' },
  { field: 'shellType', headerName: 'Тип оболочки', width: 200, type: 'string' },
  { field: 'shellСolor', headerName: 'Цвет оболочки', width: 150, type: 'string' },
  //  { field: 'dateAgreement', headerName: 'Дата согласования', width: 200, type: 'date' },
  { field: 'chromaticity', headerName: 'Цветность', width: 130, type: 'string' },
  { field: 'caliber', headerName: 'Калибр', width: 120, type: 'number' },
  { field: 'typPrinting', headerName: 'Тип печати', width: 200, type: 'string' },

];

export default function Makets() {


  const classes = useStyles();
  const status = useSelector(state => state.makets.status);
  const pageSize = useSelector(state => state.makets.pageSize);
  const page = useSelector(state => state.makets.page);
  const filterModel = useSelector(state => state.makets.filterModel);
  const sortModel = useSelector(state => state.makets.sortModel);
  const maketsAr = useSelector(state => state.makets.makets);
  
  const dispatch = useDispatch();

  const handleChangeBottomNavigation = (event, newStatus) => {
    //setStatus(newStatus);

    dispatch(setMaketsStatus(newStatus))
  };
  
  React.useEffect(() => { 
    if (status == '') {
      dispatch(setMaketsStatus('harmonization'))
    }
  },[status, dispatch]);


 
  return (

    <div>
        <BottomNavigation value={status} onChange={handleChangeBottomNavigation} className={classes.stickToBottom} showLabels>
          <BottomNavigationAction label="Согласование" value="harmonization" icon={<HowToRegIcon />} />
          <BottomNavigationAction label="Разработка" value="development" icon={<BuildIcon />} />
          <BottomNavigationAction label="Готовые" value="ready" icon={<LocalPrintshopIcon />} />
          <BottomNavigationAction label="Архив" value="archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
      <div style={{ width: '100%' }}>

        <DataGrid 
        
        rowsPerPageOptions={[5, 10, 25, 35, 50, 70, 100]}
        rowHeight={25} 
        rows={maketsAr} 
        columns={columns} 
        pageSize={pageSize} 
        autoHeight={true}
        sortModel ={sortModel}
        page = {page}
        filterModel = {filterModel}
        hideFooterSelectedRowCount={true} 
        onPageSizeChange={(GridPageChangeParams)=>{dispatch(сhangePageParams(GridPageChangeParams.pageSize, 0))}}
        onPageChange = {(GridPageChangeParams)=>{dispatch(сhangePageParams(GridPageChangeParams.pageSize, GridPageChangeParams.page))}}
        onFilterModelChange = {(GridFilterModelParams)=>{dispatch(сhangeFiltr(GridFilterModelParams.filterModel))}}
        onSortModelChange = {(GridSortModelParams)=>dispatch(сhangeSort(GridSortModelParams.sortModel))}
        labelRowsPerPage = {(<h1>Макетов на странице</h1>)}

        localeText={Gridstrings}

       />
     

      </div>


    </div>

  );
}
