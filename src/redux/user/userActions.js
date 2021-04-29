import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_LOGOUT,
  CONFIRMATION_CODE_REQUEST,
  CONFIRMATION_CODE_FAILURE,
  CONFIRMATION_CODE_SUCCESS,
  CLEAR_ERROR,
  CANCEL_CONFIRMATION

} from '../types'

import { executorRequests, sendConformationCode, getAccessKey} from '../../api/dataService1c';
import { v4 as uuidv4 } from 'uuid';

const setLoginSuccess = (loginData) => {
  return {
    type: LOGIN_SUCCESS
  };
};

export const cancelConformation = () => {
  return {
    type: CANCEL_CONFIRMATION
  };
};




const setLoginRequest = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const setLoginFailure = (err) => {

  return {
    type: LOGIN_FAILURE,
    payload: err,
  };
};


export const logOut = (loginData) => {
  localStorage.removeItem('key')
  return {
    type: LOGIN_LOGOUT
  };
};


export const setConformationCodeRequest = (userID, requestKey) => {
  return {
    type: CONFIRMATION_CODE_REQUEST,
    payload: { userID, requestKey }
  };
}

export const setConformationCodeFailure = (err) => {
  return {
    type: CONFIRMATION_CODE_FAILURE,
    payload: err
  };
}

export const setConformationCodeSuccess = () => {
  return {
    type: CONFIRMATION_CODE_SUCCESS
  };
}

export const  сlearError = ()=>{
  return {
    type: CLEAR_ERROR
  };
}

export const sendConfirmationСode = (userID) => {


  const requestKey = uuidv4();

  return (dispatch) => {


    dispatch(setConformationCodeRequest(userID, requestKey));

    const functionRequest = () => {
      return sendConformationCode(userID, requestKey);
    };

    const responseHandlingFunction = (json) => {
      
      if (json.error) {
        dispatch(setConformationCodeFailure(json.error));
      } else {
        dispatch(setConformationCodeSuccess());
      }
    }

    const exceptionHandlingFunction = (error) => {
      dispatch(setConformationCodeFailure(error));
    };

    executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch);

  };
}

export const login = (confirmationСode, cb) => {


  return (dispatch, getState) => {


    const state = getState()


    dispatch(setLoginRequest());

    const functionRequest = () => {
      return getAccessKey(state.user.userID, state.user.requestKey, confirmationСode);
    };

    const responseHandlingFunction = (json) => {
    
      if (json.error) {
        dispatch(setLoginFailure(json.error));
      } else {
        
        dispatch(setLoginSuccess());
        localStorage.setItem('key', json.key)
        localStorage.setItem('userID', state.user.userID)
        
        cb();

      }
    }

    const exceptionHandlingFunction = (error) => {
      dispatch(setLoginFailure(error));
    };

    executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch);

  };
}

