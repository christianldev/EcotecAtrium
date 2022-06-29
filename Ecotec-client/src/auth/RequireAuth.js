import React from 'react';

import { useLocation, Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

function RequireAuth({ children, allowedRoles }) {
  const location = useLocation();
  const { auth, roles } = useAuth();

  console.log(roles);

  if (auth === null) {
    return <Navigate to="/" state={{ path: location.pathname }} replace />;
  }

  if (auth && roles.find((role) => allowedRoles.includes(role))) {
    return children;
  } else {
    return <Navigate to="/unauthorised" replace />;
  }
}

export default RequireAuth;
