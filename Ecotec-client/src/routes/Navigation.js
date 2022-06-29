import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path="/">
            <Route {...route} />
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
}
