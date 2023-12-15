import React, { createContext, useContext, useState, FC, ReactNode, useEffect } from 'react';

interface AuthContextProps {
    isAuth: Boolean;
    getAuth: () => void;
  }

  const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);

  const getAuth = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/auth/getauth', {
        method: 'GET',
        credentials: 'include',
      });
      const result = await response.json();
      if (result.ok){
        setisAuth(true)
      }
      setisAuth(false);
    } catch (error){
      console.error('Error fetching auth:', error)
    }
  };
  
  return (
    <AuthContext.Provider value={{ isAuth, getAuth, }}>
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
