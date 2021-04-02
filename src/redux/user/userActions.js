import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_LOGOUT,
} from '../types'

import { executeAuthenticationService} from '../../api/dataService1c';

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



