import ApplicationLogo from 'components/ApplicationLogo';

import AuthSessionStatus from 'components/AuthSessionStatus';
import AuthValidationErrors from 'components/AuthValidationErrors';
import Button from 'components/Button';
import GuestLayout from 'components/Layouts/GuestLayout';
import Input from 'components/Input';
import Label from 'components/Label';
import { useAuth } from 'hooks/auth';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FaEnvelope } from 'react-icons/fa';

const PasswordReset = () => {
  const params = useParams();
  const { resetPassword } = useAuth({ middleware: 'guest' });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  // show password and active style
  const [states, setStates] = useState([{ show: false }, { active: false }]);
  // active style
  const [active, setActive] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    resetPassword({
      email,
      password,
      password_confirmation,
      setErrors,
      setStatus,
    });
  };

  useEffect(() => {
    setEmail(params.email || '');
  }, [params.email]);

  return (
    <GuestLayout
      logo={
        <Link to="/">
          <ApplicationLogo className="w-48 h-18 fill-current text-gray-500" />
        </Link>
      }
    >
      {/* Session Status */}
      <AuthSessionStatus className="mb-4" status={status} />
      {/* Validation Errors */}
      <AuthValidationErrors className="mb-4" errors={errors} />

      <div className="text-center md:text-left">
        <h1 className="text-2xl text-gray-800 dark:text-gray-200 font-bold py-3">
          <span>Cambiar contraseña</span>
          <span className="text-fblue-100 text-xl m-1">.</span>
        </h1>
        <span className="font-bold text-sm text-gray-700 dark:text-gray-300">
          <span>Ingresa tu correo para verificar tus datos</span>
        </span>
      </div>
      <form
        onSubmit={submitForm}
        className="lg:w-6/12 pb-10 xl:w-4/12 w-full grid grid-cols-1 p-2"
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
            Correo electronico
            <FaEnvelope className={`cursor-pointer h-5 w-5 absolute right-4`} />
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            className="block mt-1 w-full"
            onChange={(event) => setEmail(event.target.value)}
            required
            autoFocus
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
          <Label htmlFor="password">Contraseña </Label>
          <Input
            id="password"
            type="password"
            value={password}
            className="block mt-1 w-full"
            onChange={(event) => setPassword(event.target.value)}
            required
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
          <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
          <Input
            id="password_confirmation"
            type="password"
            value={password_confirmation}
            className="block mt-1 w-full"
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-end mt-4">
          <Button className="ml-0 w-full">Reset Password</Button>
        </div>
      </form>
    </GuestLayout>
  );
};

export default PasswordReset;
