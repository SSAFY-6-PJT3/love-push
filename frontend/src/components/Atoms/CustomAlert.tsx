import { useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';
import styled from 'styled-components';

import { AlertContext } from '../../store/alertContext';

interface IAlertContext {
  open: boolean;
  text: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  openAlert: () => void;
  closeAlert: () => void;
  setAlertText: (v: string) => void;
  setAlertSeverity: (v: 'success' | 'info' | 'warning' | 'error') => void;
}

const CustomAlert = () => {
  const { open, text, severity, closeAlert } =
    useContext<IAlertContext>(AlertContext);

  return (
    <CustomSnackBar
      open={open}
      autoHideDuration={2000}
      onClose={closeAlert}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={severity} onClose={closeAlert}>
        {text}
      </Alert>
    </CustomSnackBar>
  );
};

const CustomSnackBar = styled(Snackbar)`
  height: 20%;
`;

export default CustomAlert;
