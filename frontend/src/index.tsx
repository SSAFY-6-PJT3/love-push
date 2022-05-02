import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './store/authContext';
import { AlertContextProvider } from './store/alertContext';

ReactDOM.render(
  <React.StrictMode>
    <AlertContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </AlertContextProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
);

reportWebVitals();
