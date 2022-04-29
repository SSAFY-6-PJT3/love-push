import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './store/authContext';
import { AlertContextProvider } from './store/alertContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <AlertContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </AlertContextProvider>
  </React.StrictMode>,
);

reportWebVitals();
