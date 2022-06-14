import ApplicationLogo from 'components/ApplicationLogo';

import AuthSessionStatus from 'components/AuthSessionStatus';
import AuthValidationErrors from 'components/AuthValidationErrors';
import Button from 'components/Button';
import GuestLayout from 'components/Layouts/GuestLayout';
import Input from 'components/Input';
import Label from 'components/Label';
import { useAuth } from 'hooks/auth';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { FaEnvelope } from 'react-icons/fa';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth({ middleware: 'guest' });

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  // show password and active style
  const [states, setStates] = useState([{ show: false }, { active: false }]);
  // active style
  const [active, setActive] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    forgotPassword({ email, setErrors, setStatus });
  };

  return (
    <GuestLayout
      logo={
        <NavLink to="/">
          <ApplicationLogo className="w-48 h-20 fill-current text-gray-500" />
        </NavLink>
      }
    >
      <div className="text-center md:text-left">
        <h1 className="text-2xl text-gray-800 dark:text-gray-200 font-bold py-3">
          <span>Constraseña olvidad?</span>
          <span className="text-fblue-100 text-xl m-1">.</span>
        </h1>
        <span className="font-bold text-sm text-gray-700 dark:text-gray-300">
          Escribe tu direccion de email y te enviaremos un enlace para que
          puedas restablecer tu contraseña.
        </span>
      </div>

      {/* Session Status */}
      <AuthSessionStatus className="mb-4" status={status} />
      {/* Validation Errors */}
      <AuthValidationErrors className="mb-4" errors={errors} />
      <form
        onSubmit={submitForm}
        className="lg:w-6/12 pb-10 xl:w-6/12 w-full grid grid-cols-1 p-2"
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
            Email{' '}
            <FaEnvelope className={`cursor-pointer h-5 w-5 absolute right-4`} />
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={email}
            className="block mt-1 w-full"
            onChange={(event) => setEmail(event.target.value)}
            required
            autoFocus
          />
        </div>

        <Button className="ml-0 w-full"> Enviar link </Button>
      </form>
    </GuestLayout>
  );
};

export default ForgotPassword;
