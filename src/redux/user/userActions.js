  
import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_LOGOUT,
} from '../types'

import { executeAuthenticationService, getHash } from '../../api/dataService1c';
//import AsyncStorage from '@react-native-community/async-storage';

const setLoginSuccess = (loginData) => {

  setLoginLocal(loginData);

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

  setLoginLocal(null);

  return {
    type: LOGIN_FAILURE,
    payload: loginData,
  };
};

export const logOut = (loginData) => {
  
  setLoginLocal(null);

  return {
    type: LOGIN_LOGOUT
  };
};




export const login = (username, password) => {
  return (dispatch) => {

   const hash = getHash(username, password);

    let loginData = { username: username, password: password, hash: hash, err: ''};

    dispatch(setLoginRequest(loginData));

    return executeAuthenticationService(hash)
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

         

        } else {

          loginData.err = json.msg;
          dispatch(setLoginFailure(loginData));

        }
      })
      .catch((err) => {
               
        dispatch(setLoginFailure({ username: username, password: password, err:'Сервис недоступен, попробуйте позже'}));
        console.log('Login Failed', 'Some error occurred, please retry');
        console.log(err);
      });
  };
}





const setLoginLocal = async (loginData) => {
  try {

    const session = JSON.stringify(loginData);


  } catch (err) {
    console.log(err);
  }
};
