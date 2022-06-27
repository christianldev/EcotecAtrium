import React, { useState, useMemo, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import jwtDecode from 'jwt-decode';

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(undefined);
  const [error, setError] = useState('');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setAuth(null);
    } else {
      const decoded = jwtDecode(token);
      setAuth(decoded);
      setRoles([decoded.user.role]);
    }
  }, []);

  const login = (userInfo) => {
    localStorage.setItem('token', userInfo);
    const user = jwtDecode(userInfo);
    setAuth(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(null);
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      error,
      setError,
      roles,
      setRoles,
    }),
    [auth],
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
