import {
  CHANGE_MAKETS_STATUS, MAKETS_SGRID_PAGE_CHANGE_PARAMS, MAKETS_FILTER_CHANGE, MAKETS_SORT_CHANGE
} from '../types'


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

