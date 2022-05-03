/**
 * @author Hyeonsooryu
 * @modified Hanseunghun
 */

import { createContext, useState, useEffect, ReactNode } from 'react';
import { SlidesProps } from '../api/emojiAPI'

const AuthContext = createContext({
  isLoggedIn: false,
  onLogin: (token: string, emojiUrl: string) => { },
  onChangeEmoji: (emojiUrl: string) => { },
});

interface IPropsAuthContextProvider {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: IPropsAuthContextProvider) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const loginHandler = (token: string, emojiUrl: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('emojiUrl', emojiUrl);
    setToken(token);
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
