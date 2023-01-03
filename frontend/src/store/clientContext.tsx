import {
  useState,
  useMemo,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useCallback,
  useContext,
} from 'react';

import gpsTransKey from '../utils/gpsTransKey';

import { openChatAPI } from '../api/openChatAPI';
import { findMyRoomAPI } from '../api/chatRoomAPI';
import { getChatLog } from '../api/chatAPI';
import { heartSendSetAPI } from '../api/heartAPI';
import { AlertContext } from './alertContext';
import socketClient from '../utils/socketClient';

interface IPropsClientContextProvider {
  children: ReactNode;
}

const ClientContextProvider = ({ children }: IPropsClientContextProvider) => {
  const value = {};
  const stompInstance = useMemo(() => socketClient, []);

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};

const ClientContext = createContext({});

export { ClientContext, ClientContextProvider };
