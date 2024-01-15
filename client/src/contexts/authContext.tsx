import React, { createContext, useContext, useState, FC, ReactNode, useEffect } from 'react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

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
    <AuthContext.Provider value={{ isAuth, getAuth }}>
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

interface RequireAuthProps {
  children?: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.isAuth === false) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they log in, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}