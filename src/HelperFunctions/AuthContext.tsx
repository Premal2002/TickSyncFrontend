import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserFromToken, logOutUser } from './userFunctions';

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  userDetails: any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedLogin = getUserFromToken();
    if (storedLogin) {
      setIsLoggedIn(true);
      const user1 = {
      name: storedLogin?.name ?? "",
      email: storedLogin?.email ?? ""
    };
    console.log(user1);
    setUserDetails(user1);
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    
  };

  const logout = () => {
    logOutUser();
    setIsLoggedIn(false);
    
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
