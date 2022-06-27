import ApplicationLogo from 'components/ApplicationLogo';

import AuthValidationErrors from 'components/AuthValidationErrors';
import Button from 'components/Button';
import GuestLayout from 'components/Layouts/GuestLayout';
import Input from 'components/Input';
import Label from 'components/Label';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Register = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);
  // show password and active style
  const [states, setStates] = useState([{ show: false }, { active: false }]);
  // active style
  const [active, setActive] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    register({ name, email, password, password_confirmation, setErrors });
  };

  return (
    <GuestLayout
      logo={
        <Link to="/">
          <ApplicationLogo className="w-48 h-16 fill-current text-gray-500" />
        </Link>
      }
    >
      {/* Validation Errors */}
      <AuthValidationErrors className="mb-4" errors={errors} />
      <div className="text-center md:text-left">
        <h1 className="text-2xl text-gray-800 dark:text-gray-200 font-bold py-2">
          <span>Registrate</span>
          <span className="text-fblue-100 text-xl m-1">.</span>
        </h1>
        <span className="font-bold text-sm text-gray-700 dark:text-gray-300">
          <span>Accede a los cursos y administra tu aula virtual</span>
        </span>
      </div>
      <form
        onSubmit={submitForm}
        className="lg:w-6/12 pt-4 xl:w-4/12 w-full grid grid-cols-1 p-2"
      >
        {/* Name */}
        <div
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          className={`form__inputs mr-1 ${active && name && 'input__active'}`}
        >
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            type="text"
            value={name}
            className="block mt-1 w-full"
            onChange={(event) => setName(event.target.value)}
            required
            autoFocus
          />
        </div>

        {/* Email Address */}
        <div
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          className={`form__inputs col-span-2 mt-4 ${
            active && email && 'input__active'
          }`}
        >
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            className="block mt-1 w-full"
            onChange={(event) => setEmail(event.target.value)}
            required
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
          className={`form__inputs col-span-2 mt-4 ${
            states[1].active && password && 'input__active'
          }`}
        >
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            value={password}
            className="block mt-1 w-full"
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        {/* Confirm Password */}
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
          className={`form__inputs col-span-2 mt-4 ${
            states[1].active && password_confirmation && 'input__active'
          }`}
        >
          <Label htmlFor="password_confirmation">Confirmar Contraseña</Label>
          <Input
            id="password_confirmation"
            type="password"
            value={password_confirmation}
            className="block mt-1 w-full"
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-end mt-4 col-span-2">
          <p className=" text-sm text-gray-400">
            Tienes una cuenta?
            <NavLink to="/" className="text-blue-500 hover:underline">
              {' '}
              Inicia sesión
            </NavLink>
          </p>
          <Button className="ml-0 w-full">Registrar</Button>
        </div>
      </form>
    </GuestLayout>
  );
};

export default Register;
