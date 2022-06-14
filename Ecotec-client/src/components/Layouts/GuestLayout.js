import ProgressBar from 'components/ProgressBar';
import { NavLink } from 'react-router-dom';
import '../../App.css';

const GuestLayout = ({ logo, children, loading }) => {
  return (
    <section className="app h-screen bg-center bg-cover bg-no-repeat bg__auth objec-cover">
      <main className="dark bg-gradient h-full">
        {loading && <ProgressBar loading={true} percent={50} size={'medium'} />}
        <div className="container mx-auto md:px-20 px-5">
          <div className="flex items-center">
            <div className="my-3 flex items-center w-fit">
              <span className="dark:text-white md:pr-16 font-semibold">
                {logo}
              </span>
            </div>
            <div className="flex-1 text-gray-500 dark:text-gray-400 font-semibold text-sm">
              <span className="cursor-pointer px-5">
                <NavLink to="/">Iniciar Sesión</NavLink>
              </span>
              <NavLink to="/register">
                <span className="cursor-pointer px-5 md:inline hidden">
                  Registrar
                </span>
              </NavLink>
              <span title="Change Mode" className="cursor-pointer md:px-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 inline"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="container   mx-auto md:px-20 px-5 dark mt-10">
          {children}
        </div>
      </main>
    </section>
  );
};

export default GuestLayout;
