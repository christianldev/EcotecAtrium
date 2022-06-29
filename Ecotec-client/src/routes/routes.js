import React from 'react';

//Layouts
import RequireAuth from 'auth/RequireAuth';

// pages

import NotFoundPage from 'pages/404';
import Dashboard from 'pages/dashboard';

import { Unauthorized } from 'pages/unauthorized';

const ROLES = {
  Student: 'student',
  Teacher: 'teacher',
  Admin: 'admin',
};

const routes = [
  {
    index: true,
    element: (
      <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Teacher]}>
        <Dashboard />
      </RequireAuth>
    ),
    exact: true,
  },
  {
    path: 'unauthorised',
    element: <Unauthorized />,
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
