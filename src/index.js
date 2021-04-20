import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './redux/rootReducer';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ruRU } from '@material-ui/core/locale';

const theme = createMuiTheme({
  palette: {
    //  primary: { main: '#1976d2' },
  },
}, ruRU);

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}


const store = createStore(rootReducer, applyMiddleware(thunk, logger));


ReactDOM.render(

  <Provider store={store}>
    <ThemeProvider theme={theme}>

      <App />

    </ThemeProvider>


  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
