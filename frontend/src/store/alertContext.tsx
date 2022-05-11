/**
 * @author Hyeonsooryu
 */

import React, { createContext, useState } from 'react';

interface IAlertContext {
  open: boolean;
  text: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  openAlert: () => void;
  closeAlert: () => void;
  setAlertText: (v: string) => void;
  setAlertSeverity: (v: 'success' | 'info' | 'warning' | 'error') => void;
}

const AlertContext = createContext<IAlertContext>({
  open: false,
  text: '',
  severity: 'success',
  setAlertText: () => {},
  setAlertSeverity: () => {},
  openAlert: () => {},
  closeAlert: () => {},
});

const AlertContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [severity, setSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');

  const openAlertHandler = () => {
    setOpen(true);
  };

  const closeAlertHandler = () => {
    setOpen(false);
  };

  const textHandler = (v: string) => {
    setText(v);
  };

  const severityHandler = (v: 'success' | 'info' | 'warning' | 'error') => {
    setSeverity(v);
  };

  return (
    <AlertContext.Provider
      value={{
        open: open,
        text: text,
        severity: severity,
        setAlertText: textHandler,
        setAlertSeverity: severityHandler,
        openAlert: openAlertHandler,
        closeAlert: closeAlertHandler,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertContextProvider };
