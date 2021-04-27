import {
  CHANGE_MAKETS_STATUS, MAKETS_SGRID_PAGE_CHANGE_PARAMS, MAKETS_FILTER_CHANGE, MAKETS_SORT_CHANGE, MAKETS_SUCCESS, MAKETS_FAILURE
} from '../types'

import { getMakets, executorRequests} from '../../api/dataService1c';
import { logOut } from '../../redux/user/userActions';


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

export const failure = () => {
  return {
    type: MAKETS_FAILURE
  };
};

export const setMaketsStatus = (status) => {
  
  return (dispatch) => {

    return getMakets(status).catch((err)=>console.log(err))
      .then(response => {

        if (response.status == 401){
          return 401
        }
        else {
          return response.json()
        }
      })

      .then((data) => {
        if (data==401) {
          dispatch(logOut())
          return dispatch({type: MAKETS_FAILURE});
        }else {
            return dispatch({type: MAKETS_SUCCESS, payload: {status, makets:data.makets}});
        } 
      })
      .catch((err) => {
              
        console.log('err', err);
        //dispatch(setLoginFailure({ err:'Сервис недоступен, попробуйте позже'}));
       
      });
  };
}


