import './App.css';
import Login from 'pages/login';
import useAuth from 'hooks/useAuth';
import Navigation from 'routes/Navigation';
import AuthContext from 'context/AuthContext';
import { useEffect, useMemo, useState } from 'react';
import { decodeToken, getToken, removeToken } from 'utils/token';

function App() {
  const [auth, setAuth] = useState(undefined);
  const [error, setError] = useState('');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setAuth(null);
      setRoles([]);
    }
    //if token expired
    else if (decodeToken(token).exp < Date.now() / 1000) {
      removeToken();
      setAuth(null);
      setRoles([]);
    } else {
      setAuth(decodeToken(token));
      setRoles([decodeToken(token).user.role]);
    }
  }, []);

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const login = (user) => {
    setAuth(user);
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
    [auth, roles],
  );

  if (auth === undefined) return null;

  return (
    <div className="antialiased ">
      <AuthContext.Provider value={authData}>
        {!auth ? <Login /> : <Navigation />}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
