import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from 'react-redux';
import { сhangePageParams, сhangeFiltr, сhangeSort, setMaketsStatus } from '../../redux/makets/maketsActions';
import {
  Link
} from "react-router-dom";
import ImageIcon from '@material-ui/icons/Image';


import Gridstrings from './Gridstrings'
import Icon from '@material-ui/core/Icon';


import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';

import Alert from '@material-ui/lab/Alert';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(1),
  },

  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },

  buttonAll: {
    marginLeft: 4
  },



  buttonAdd: {
    marginLeft: 10,
    height: '70%'
  },


  actions: {
    // textAlign:'left',
    justifyContent: 'left',
    alignItems: 'center',
    height: '56px',
    display: 'flex',
    // justifyContent: 'center',
    backgroundColor: '#fff'

  },

  actions_: {
    height: '56px',

  }


}));

const columns = [
  {
    field: 'code', headerName: 'Код', width: 80, type: 'string', renderCell: (params) => {

     return params.row.status == 'Проект' ?
        (
          <strong>
            {<Link to={`/maket-project/${params.value}`}>{params.value}</Link>}
          </strong>
        )
        :
        (
          <strong>
            {<Link to={`/makets/${params.value}`}>{params.value}</Link>}
          </strong>
        )

       

    },
  },

  { field: 'product', headerName: 'Продукт', width: 450, type: 'string' },
  { field: 'finalBuyer', headerName: 'Конечный покупатель', width: 200, type: 'string' },
  { field: 'Shell', headerName: 'Вид продукции', width: 180, type: 'string' },
  { field: 'shellType', headerName: 'Тип оболочки', width: 200, type: 'string' },
  { field: 'shellСolor', headerName: 'Цвет оболочки', width: 150, type: 'string' },
  { field: 'chromaticity', headerName: 'Цветность', width: 130, type: 'string' },
  { field: 'caliber', headerName: 'Калибр', width: 120, type: 'number' },
  { field: 'typPrinting', headerName: 'Тип печати', width: 200, type: 'string' },
  { field: 'status', headerName: 'Статус', width: 200, type: 'string' },
];

export default function Makets() {

  const classes = useStyles();
  const status = useSelector(state => state.makets.status);
  const pageSize = useSelector(state => state.makets.pageSize);
  const page = useSelector(state => state.makets.page);
  const filterModel = useSelector(state => state.makets.filterModel);
  const sortModel = useSelector(state => state.makets.sortModel);
  const maketsAr = useSelector(state => state.makets.makets);
  const statusButtons = useSelector(state => state.makets.statusButtons);
  const updateStatusRequired = useSelector(state => state.makets.updateStatusRequired);
  const error = useSelector(state => state.makets.error);
  

  const dispatch = useDispatch();

  const handleChangeBottomNavigation = (event, newStatus) => {
    //setStatus(newStatus);

    dispatch(setMaketsStatus(newStatus))
  };

  React.useEffect(() => {
    if (status == null) {
      dispatch(setMaketsStatus(''))
    } else if (updateStatusRequired) {
      dispatch(setMaketsStatus(status))
    }

  }, [status, updateStatusRequired]);




  return (
    <div>
      <Grid container spacing={0}>
      
        <Grid item xs={12} value={2}>
          <div className={classes.actions}>

            <Link to="maket-project/new">

              <Button
                className={classes.buttonAdd}
                startIcon={<AddCircleIcon />}

                variant="contained"
                color="primary"
                size="small"
              >
                Добавить макет
          </Button>

            </Link>
          </div>
        </Grid>
      </Grid>


      <Grid item xs={12}>
       {error && <Alert severity="error">{error}</Alert>}
      </Grid>

      <DataGrid

        rowsPerPageOptions={[5, 10, 25, 35, 50, 70, 100]}
        rowHeight={25}
        rows={maketsAr}
        columns={columns}
        pageSize={pageSize}
        autoHeight={true}
        sortModel={sortModel}
        page={page}
        filterModel={filterModel}
        hideFooterSelectedRowCount={true}
        onPageSizeChange={(GridPageChangeParams) => { dispatch(сhangePageParams(GridPageChangeParams.pageSize, 0)) }}
        onPageChange={(GridPageChangeParams) => { dispatch(сhangePageParams(GridPageChangeParams.pageSize, GridPageChangeParams.page)) }}
        onFilterModelChange={(GridFilterModelParams) => { dispatch(сhangeFiltr(GridFilterModelParams.filterModel)) }}
        onSortModelChange={(GridSortModelParams) => dispatch(сhangeSort(GridSortModelParams.sortModel))}
        labelRowsPerPage={(<h1>Макетов на странице</h1>)}
        localeText={Gridstrings}
      />

      <div className={classes.actions_}>
      </div>


      <BottomNavigation value={status} onChange={handleChangeBottomNavigation} className={classes.stickToBottom} showLabels>
        `<BottomNavigationAction label="Все" value="" icon={<ImageIcon />} className={classes.buttonAll} />

        {statusButtons.map((statusButton) => (
          <BottomNavigationAction key={statusButton.id} label={statusButton.name} value={statusButton.id} icon={(<Icon> {statusButton.icon}</Icon>)} />
        ))}


      </BottomNavigation>


    </div>

  );
}
