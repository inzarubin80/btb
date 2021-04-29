import {
  CHANGE_MAKETS_STATUS, MAKETS_SGRID_PAGE_CHANGE_PARAMS, MAKETS_FILTER_CHANGE, MAKETS_SORT_CHANGE, MAKETS_SUCCESS, MAKETS_FAILURE
} from '../types'

import { getMakets, executorRequests } from '../../api/dataService1c';



export const changeMaketsStatus = (status) => {
  return {
    type: CHANGE_MAKETS_STATUS,
    payload: status,
  };
};

export const сhangePageParams = (pageSize, page) => {
  return {
    type: MAKETS_SGRID_PAGE_CHANGE_PARAMS,
    payload: { pageSize, page }
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

    const functionRequest = () => {
      return getMakets(status);
    };

    const responseHandlingFunction = (data) => {
      return dispatch({ type: MAKETS_SUCCESS, payload: { status, makets: data.makets } });
    }
    const exceptionHandlingFunction = (error) => {
      return dispatch({ type: MAKETS_FAILURE });
    };

    executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch);

  };

}


