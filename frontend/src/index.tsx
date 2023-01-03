import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './store/authContext';
import { AlertContextProvider } from './store/alertContext';
import { ClientContextProvider } from './store/clientContext';

ReactDOM.render(
  // <React.StrictMode>
  <AlertContextProvider>
    <AuthContextProvider>
      <ClientContextProvider>
        <App />
      </ClientContextProvider>
    </AuthContextProvider>
  </AlertContextProvider>,
  // </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
);

reportWebVitals();
