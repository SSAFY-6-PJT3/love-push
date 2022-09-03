import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './store/authContext';
import { AlertContextProvider } from './store/alertContext';
import { ClientContextProvider } from './store/clientContext';


import { Provider } from 'react-redux';
import { legacy_createStore as createStore} from 'redux'
import store from './redux/createReduxStore'


ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
);

reportWebVitals();
