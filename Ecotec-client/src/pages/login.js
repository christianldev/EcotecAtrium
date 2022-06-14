import ApplicationLogo from 'components/ApplicationLogo';

import AuthSessionStatus from 'components/AuthSessionStatus';
import AuthValidationErrors from 'components/AuthValidationErrors';
import Button from 'components/Button';
import GuestLayout from 'components/Layouts/GuestLayout';
import Input from 'components/Input';
import Label from 'components/Label';
import { useAuth } from 'hooks/auth';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { FaRegEye, FaRegEyeSlash, FaEnvelope } from 'react-icons/fa';

const Login = () => {
  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  });

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  // show password and active style
  const [states, setStates] = useState([{ show: false }, { active: false }]);
  // active style
  const [active, setActive] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();
    login({ email, password, setErrors, setStatus });
    setLoading(true);
  };

  return (
    <GuestLayout
      logo={
        <Link to="/">
          <ApplicationLogo className="w-48 h-18 fill-current text-gray-500" />
        </Link>
      }
      loading={loading}
    >
      {/* Session Status */}
      <AuthSessionStatus className="mb-4" status={status} />
      {/* Validation Errors */}
      <AuthValidationErrors className="mb-4" errors={errors} />

      <div className="text-center md:text-left">
        <h1 className="text-2xl text-gray-800 dark:text-gray-200 font-bold py-3">
          <span>Inicia con tu cuenta</span>
          <span className="text-fblue-100 text-xl m-1">.</span>
        </h1>
        <span className="font-bold text-sm text-gray-700 dark:text-gray-300">
          <span>Revisa tus cursos y notas</span>
        </span>
      </div>
      <form
        className="lg:w-6/12 pb-10 xl:w-4/12 w-full grid grid-cols-1 p-2"
        onSubmit={submitForm}
        autoComplete="off"
      >
        {/* Email Address */}
        <div
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          className={`form__inputs col-span-2 my-4 ${
            active && email && 'input__active'
          }`}
        >
          <Label htmlFor="email">
            Email
            <FaEnvelope className={`cursor-pointer h-5 w-5 absolute right-4`} />
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            className="block mt-1 w-full"
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />
        </div>
        {/* Password */}
        <div
          onFocus={() =>
            setStates(
              states.map((s) => (s.active === false ? { active: true } : s)),
            )
          }
          onBlur={() =>
            setStates(
              states.map((s) => (s.active === true ? { active: false } : s)),
            )
          }
          className={`form__inputs col-span-2 ${
            states[1].active && password && 'input__active'
          }`}
        >
          <Label htmlFor="password">
            Password
            {states[0].show ? (
              <FaRegEyeSlash
                onClick={() =>
                  setStates(
                    states.map((s) => (s.show == true ? { show: false } : s)),
                  )
                }
                className={`cursor-pointer h-5 w-5 absolute right-4 `}
              />
            ) : (
              <FaRegEye
                onClick={() =>
                  setStates(
                    states.map((s) => (s.show == false ? { show: true } : s)),
                  )
                }
                className={`cursor-pointer h-5 w-5 absolute right-4`}
              />
            )}
          </Label>
          <Input
            id="password"
            type={states[0].show ? 'text' : 'password'}
            value={password}
            className="block mt-1 w-full"
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        {/* Remember Me */}
        <div className="flex mt-4 col-span-2">
          <label htmlFor="remember_me" className="block">
            <NavLink
              to="/forgot-password"
              className="underline flex justify-end items-end text-sm text-gray-400 hover:text-blue-500"
            >
              Contraseña olvidada?
            </NavLink>
          </label>
        </div>

        <Button className="ml-0 w-full">Login</Button>
      </form>
    </GuestLayout>
  );
};

export default Login;
