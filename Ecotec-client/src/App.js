import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from 'pages/dashboard';
import Login from 'pages/login';
import Register from 'pages/register';
import Home from 'pages/home';
import ForgotPassword from 'pages/forgot-password';
import PasswordReset from 'pages/password-reset';
import NotFoundPage from 'pages/404';
import AuthProvider from 'auth/AuthProvider';
import RequireAuth from 'auth/RequireAuth';

const ROLES = {
  Student: 'student',
  Teacher: 'teacher',
  Admin: 'admin',
};

function App() {
  return (
    <div className="antialiased">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/admin"
            element={
              <RequireAuth allowedRoles={[ROLES.Admin]}>
                <Dashboard />
              </RequireAuth>
            }
          />

          <Route path="/invaliduser" element={<NotFoundPage />} />
          <Route path="/unauthorised" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
