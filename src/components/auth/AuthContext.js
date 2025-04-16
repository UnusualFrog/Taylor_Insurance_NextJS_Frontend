'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: Cookies.get('loggedin') === 'true',
    username: Cookies.get('username') || null,
  });

  // Update on cookie change
  useEffect(() => {
    const interval = setInterval(() => {
      const loggedIn = Cookies.get('loggedin') === 'true';
      const username = Cookies.get('username') || null;
      setAuth(prev => {
        if (prev.isLoggedIn !== loggedIn || prev.username !== username) {
          return { isLoggedIn: loggedIn, username };
        }
        return prev;
      });
    }, 500); // Polling every 0.5s

    return () => clearInterval(interval);
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
