import React, { createContext, useContext, useState, useEffect } from 'react';

import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from '@/common/utils';
// import presentation/hooks
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Optional: load token from cookie/localStorage
    const savedToken = getLocalStorage('token');
    if (savedToken) setToken(savedToken);
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    setLocalStorage('token', newToken);
  };

  const logout = () => {
    setToken(null);
    removeLocalStorage('token');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
