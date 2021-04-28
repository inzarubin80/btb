import {


  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_LOGOUT,
  CONFIRMATION_CODE_REQUEST,
  CONFIRMATION_CODE_FAILURE,
  CONFIRMATION_CODE_SUCCESS

} from '../types'

import { executorRequests, sendConformationCode } from '../../api/dataService1c';
import { v4 as uuidv4 } from 'uuid';

const setLoginSuccess = (loginData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: loginData,
  };
};





const setLoginRequest = (loginData) => {
  return {
    type: LOGIN_REQUEST,
    payload: loginData,
  };
};

const setLoginFailure = (loginData) => {

  return {
    type: LOGIN_FAILURE,
    payload: loginData,
  };
};


export const logOut = (loginData) => {
  localStorage.removeItem('token')
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


export const sendConfirmationСode = (userID) => {


  const requestKey = uuidv4();

  return (dispatch) => {


    dispatch(setConformationCodeRequest(userID, requestKey));

    const functionRequest = () => {
      sendConformationCode(userID, requestKey);
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


/*
export const login = (token, cb) => {
  return (dispatch) => {


    let loginData = {token: token, err: ''};

    dispatch(setLoginRequest(loginData));

    return executeAuthenticationService(token)
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

        if (json.msg === 'success') {

          dispatch(setLoginSuccess(loginData));
          localStorage.setItem('token', token)
          cb();

        } else {

          loginData.err = json.msg;
          dispatch(setLoginFailure(loginData));

        }
      })
      .catch((err) => {

        dispatch(setLoginFailure({ err:'Сервис недоступен, попробуйте позже'}));
        console.log('Login Failed', 'Some error occurred, please retry');
        console.log(err);
      });
  };
}


*/
