import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import 'antd/dist/antd.css';



const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 10,
  }
  
}));


const Tasks  = () => {

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            
            <TableCell>Содержание</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell></TableCell>
            
         

          </TableRow>
        </TableHead>
        
     {/*   <TableBody>
          {colors.map((row) => (
            <TableRow key={row.id}>

              <TableCell component="th" scope="row" >
                {row.color}
              </TableCell>
              <TableCell align="right" style={{ background: `rgb(${row.rgb})` }}></TableCell>
              <TableCell align="right">{row.turnover}</TableCell>

            </TableRow>
          ))}
        </TableBody>
          */}

      </Table>
    </TableContainer>
  );

}


export default Tasks 