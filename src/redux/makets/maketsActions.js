import {
  CHANGE_MAKETS_STATUS, MAKETS_SGRID_PAGE_CHANGE_PARAMS, MAKETS_FILTER_CHANGE, MAKETS_SORT_CHANGE, MAKETS_SUCCESS
} from '../types'

import { getMakets } from '../../api/dataService1c';


export const changeMaketsStatus = (status) => {
  return {
    type: CHANGE_MAKETS_STATUS,
    payload: status,
  };
};

export const сhangePageParams = (pageSize,  page) => {
  return {
    type: MAKETS_SGRID_PAGE_CHANGE_PARAMS,
    payload: {pageSize, page}
  };
};

export const сhangeFiltr = (filterModel) => {
  return {
    type: MAKETS_FILTER_CHANGE,
    payload: filterModel
  };
};

export const сhangeSort = (sortModel) => {
  return {
    type: MAKETS_SORT_CHANGE,
    payload: sortModel
  };
};



export const setMaketsStatus = (status) => {
  
  return (dispatch) => {

    return getMakets(status)
      .then(response => {

        console.log(response.status);

        if (response.status == 401){
        console.log(response.status);
          return {msg: 'Ошибка ввода имени или пароля'}
        }
        else {
          return response.json()
        }
      })

      .then((json) => {

         return dispatch({type: MAKETS_SUCCESS, payload: {status, makets:json}});
          
      })
      .catch((err) => {
              
        //dispatch(setLoginFailure({ err:'Сервис недоступен, попробуйте позже'}));
       
      });
  };
}


