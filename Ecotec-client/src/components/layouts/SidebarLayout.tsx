import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { Fragment, ReactNode, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import TenantSelector from './selectors/TenantSelector';
import WorkspaceSelector from './selectors/WorkspaceSelector';
import SidebarMenu from './SidebarMenu';
import LayoutSelector from '../ui/selectors/LayoutSelector';
import LocaleSelector from '../ui/selectors/LocaleSelector';
import ChatSupportButton from './buttons/ChatSupportButton';
import PendingInvitationsButton from './buttons/PendingInvitationsButton';
import ProfileButton from './buttons/ProfileButton';
import QuickActionsButton from './buttons/QuickActionsButton';
import LogoLight from '@/assets/img/logo-light.png';
import IconLight from '@/assets/img/icon-light.png';
import NotificationButton from './buttons/NotificationButton';
import Logo from '../front/Logo';
import DarkModeToggle from '../ui/toggles/DarkModeToggle';

interface Props {
  layout: 'app' | 'admin';
  children: ReactNode;
  onAddTenant?: () => void;
}

export default function SidebarLayout({ layout, onAddTenant, children }: Props) {
  const mainElement = useRef<HTMLElement>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentWorkspaceId = useSelector((state: RootState): string => {
    return state.tenant.currentWorkspace?.id ?? '';
  });

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 text-gray-800">
      {/*Mobile sidebar */}

      <div className="md:hidden">
        {sidebarOpen && (
          <div className="fixed inset-0 flex z-40">
            <Transition
              as={Fragment}
              show={sidebarOpen}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gray-800 opacity-75" />
              </div>
            </Transition>

            <Transition
              as={Fragment}
              show={sidebarOpen}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pb-4 bg-gray-900">
                <div className="absolute top-0 right-0 -mr-14 p-1 mt-2">
                  <button
                    className="flex items-center justify-center h-12 w-12 rounded-sm focus:outline-none focus:bg-gray-600"
                    aria-label="Close sidebar"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    <svg className="text-white h-7 w-7" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-2">
                    <TenantSelector className="text-sm" onAdd={onAddTenant} />
                    {layout === 'app' && <WorkspaceSelector className="text-sm" />}
                    <SidebarMenu layout={layout} onSelected={() => setSidebarOpen(!sidebarOpen)} />
                  </nav>
                </div>
              </div>
            </Transition>
            <div className="flex-shrink-0 w-14">{/*Dummy element to force sidebar to shrink to fit close icon */}</div>
          </div>
        )}
      </div>

      {/*Desktop sidebar */}
      <div
        className={
          sidebarOpen
            ? 'hidden transition ease-in duration-1000'
            : 'overflow-x-hidden hidden md:flex md:flex-shrink-0 border-r dark:border-r-0  shadow-md dark:shadow-lg'
        }
      >
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 shadow-lg bg-theme-600">
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-3 bg-white dark:bg-gray-900 select-none">
                {/* <TenantSelector className="text-xs sm:text-sm" onAdd={onAddTenant} /> */}
                <div className=" text-center">
                  <div className="relative">
                    <h2 className="text-2xl font-semibold text-gray-200 px-4 max-h-9 overflow-hidden hidden-compact">
                      <Logo className="mx-auto h-12 w-auto" />
                    </h2>
                    <h2 className="text-3xl font-semibold mx-auto logo-compact hidden">
                      <Link to="/app">
                        <img alt="Logo" className="hidden sm:block h-7 sm:h-8 w-auto" src={LogoLight} />
                      </Link>

                      {/* <!-- <img className="inline-block w-7 h-auto -mt-1" src="src/img/logo.png"> --> */}
                    </h2>
                  </div>
                </div>
                {layout === 'app' && (
                  <WorkspaceSelector
                    className="text-xs sm:text-sm"
                    onAdd={() => setSidebarOpen(false)}
                    onSelected={() => setSidebarOpen(false)}
                  />
                )}
                <SidebarMenu layout={layout} />
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/*Content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative flex-shrink-0 flex h-14 bg-white shadow-inner border-b border-gray-200">
          <button
            className="px-4  text-gray-600 focus:outline-none focus:bg-gray-100 focus:text-gray-600"
            aria-label="Open sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>

          <div className="flex-1 px-3 flex justify-between">
            <div className="flex-1 flex items-center">
              <div className="w-full flex md:ml-0">
                <div className="align-baseline w-full text-slate-200 pl-1">
                  <form className="hidden sm:inline-block md:hidden lg:inline-block mx-5">
                    <div
                      className="bg-white items-center justify-between w-full flex rounded-full p-2 sticky"
                      style={{ top: '5px' }}
                    >
                      <div>
                        <div className="p-2 mr-1 rounded-full hover:bg-gray-100 cursor-pointer">
                          <svg
                            className="h-6 w-6 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </div>

                      <input
                        className="font-bold uppercase rounded-full w-full pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
                        type="text"
                        placeholder="Search"
                      />

                      <div className="bg-blue-500 p-2 hover:bg-blue-600 cursor-pointer mx-2 rounded-full">
                        <svg
                          className="w-5 h-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center md:ml-6 space-x-1">
              <div
                className="block py-3 px-4  text-sm rounded-full focus:outline-none"
                aria-controls="mobile-canvas"
                aria-expanded="false"
              >
                <span className="sr-only">Customizer</span>

                <DarkModeToggle />
              </div>
              {layout === 'admin' && <LayoutSelector className="text-sm" />}
              {layout === 'admin' && <LocaleSelector className="text-sm" />}
              {layout === 'app' && <PendingInvitationsButton />}
              {layout === 'app' && <ChatSupportButton />}
              {layout === 'app' && <QuickActionsButton />}
              <NotificationButton />
              <ProfileButton />
            </div>
          </div>
        </div>

        <main ref={mainElement} className="flex-1 focus:outline-none overflow-y-auto bg-gray-50" tabIndex={0}>
          <div key={currentWorkspaceId} className="pb-20 sm:pb-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
