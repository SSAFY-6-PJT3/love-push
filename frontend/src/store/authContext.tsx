/**
 * @author Hyeonsooryu
 */

import { createContext, useState, useEffect, ReactNode } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  onLogin: (token: string, emojiUrl: string) => {},
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

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
