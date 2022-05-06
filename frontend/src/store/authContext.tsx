/**
 * @author Hyeonsooryu
 * @modified Hanseunghun
 */

import { createContext, useState, useEffect, ReactNode } from 'react';
import { SlidesProps } from '../api/emojiAPI';

interface IPropsOnLogin {
  token: string;
  emojiUrl: string;
  seq: string;
}

const AuthContext = createContext({
  isLoggedIn: false,
  onLogin: (data: IPropsOnLogin) => {},
  onChangeEmoji: (emojiUrl: string) => {},
});

interface IPropsAuthContextProvider {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: IPropsAuthContextProvider) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    console.log(localToken);
    if (localToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const loginHandler = (data: IPropsOnLogin) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('emojiUrl', data.emojiUrl);
    localStorage.setItem('seq', data.seq);
    setToken(data.token);
  };

  const onChangeEmojiHandler = (emojiUrl: string) => {
    localStorage.setItem('emojiUrl', emojiUrl);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onChangeEmoji: onChangeEmojiHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
