import React, { createContext, useContext, useState, FC, ReactNode } from 'react';

interface AuthContextProps {
    authToken: boolean;
    settingToken: () => string;
    logout: () => void;
  }

  const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authToken, setauthToken] = useState(localStorage.getItem("jwt"));

  const settingToken = (newToken:string) => {
    setauthToken(newToken);
  };


  return (
    <AuthContext.Provider value={{ authToken, settingToken, }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
