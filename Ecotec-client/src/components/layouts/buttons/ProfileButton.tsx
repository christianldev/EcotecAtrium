import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import classNames from '@/utils/shared/ClassesUtils';
import store, { RootState } from '@/store';
import { logout } from '@/store/modules/authReducer';
import { useSelector } from 'react-redux';
import { UserDto } from '@/application/dtos/core/users/UserDto';
import { useOuterClick } from '@/utils/shared/KeypressUtils';
import UserUtils from '@/utils/store/UserUtils';

export default function ProfileButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);

  function closeDropdownUser() {
    setOpened(false);
  }
  function signOut() {
    store.dispatch(logout());
    UserUtils.loggedOut(navigate);
  }
  const user = useSelector((state: RootState): UserDto | null => {
    return state.account.user;
  });
  const avatar = useSelector((): string => {
    return user?.avatar ?? '';
  });
  const email = useSelector(() => {
    return user?.email ?? '';
  });
  const profileName = useSelector((): string => {
    if (user) {
      if (user.first_name && user.last_name) {
        return user.first_name + ' ' + user.last_name;
      } else {
        return user.email;
      }
    }
    return '--';
  });

  const clickOutside = useOuterClick(() => setOpened(false));

  return (
    <div ref={clickOutside} className="relative">
      <div className="inline-flex shadow-none rounded-sm divide-x divide-gray-300">
        <button
          onClick={() => setOpened(!opened)}
          className={classNames(
            'bg-gray-white focus:outline-none font-medium inline-flex items-center relative rounded-full shadow-inner text-slate-400',
            !avatar && 'p-2  hover:bg-gray-100',
            avatar && 'p-1 hover:bg-gray-200',
          )}
          id="user-menu"
          aria-label="User menu"
          aria-haspopup="true"
        >
          {(() => {
            if (avatar) {
              return (
                <div className="px-1 flex text-sm rounded-full focus:outline-none" id="user-menu-button">
                  <div className="relative">
                    <img
                      className="h-8 w-8 rounded-full border border-gray-700 bg-gray-700"
                      src={avatar}
                      alt="avatar"
                    />
                    <span
                      title="online"
                      className="flex justify-center absolute -bottom-0.5 ltr:right-1 rtl:left-1 text-center bg-green-500 border border-white w-3 h-3 rounded-full"
                    ></span>
                  </div>
                  <span className="hidden md:block ltr:ml-1 rtl:mr-1 self-center">{profileName}</span>
                </div>
              );
              {
                /* return <img className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-slate-800" src={avatar} alt="Avatar" />; */
              }
            } else {
              return (
                <div className="px-1 flex text-sm rounded-full focus:outline-none" id="user-menu-button">
                  <div className="relative">
                    <svg
                      className="h-8 w-8 rounded-full border border-gray-700 bg-gray-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>

                    <span
                      title="online"
                      className="flex justify-start absolute ml-5 -bottom-0.5 text-center bg-green-500 border border-white w-3 h-3 rounded-full"
                    ></span>
                  </div>
                  <span className="hidden md:block p-2 self-center">{profileName}</span>
                </div>
                // <span className="inline-block h-5 w-5 rounded-full overflow-hidden">
                //   <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
                //     <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                //   </svg>
                // </span>
              );
            }
          })()}
        </button>
      </div>

      <Transition
        as={Fragment}
        show={opened}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          v-show="dropDownUser"
          className="z-40 origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <ul
            className="py-1 rounded-sm bg-white shadow-xs"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            {/* <a
              className="truncate group flex items-center px-4 py-2 text-sm text-gray-700 transition ease-in-out duration-150"
              role="menuitem"
            >
              <div className="flex flex-col space-y-1 truncate">
                <div className="font-medium">{profileName}</div>
                <div className="font-bold truncate">{email}</div>
              </div>
            </a> */}

            <li className="relative">
              <div className="flex flex-wrap flex-row mx-2 px-2 py-2 items-center">
                <div className="flex-shrink max-w-full px-2 w-1/3">
                  {avatar ? (
                    <img src={avatar} className="h-10 w-10 rounded-full" alt="Avatar" />
                  ) : (
                    <svg
                      className="h-10 w-10 rounded-full border border-gray-700 bg-gray-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>
                <div className="flex-shrink max-w-full px-2 w-2/3 ltr:pl-1 rtl:pr-1">
                  <div className="font-bold">
                    <a href="index.html#" className=" text-gray-800 dark:text-gray-400 hover:text-indigo-500">
                      {profileName}
                    </a>
                  </div>
                  <div className="text-gray text-sm mt-1">{email}</div>
                </div>
              </div>
            </li>
            <li className="relative">
              <Link
                className="block w-full py-2 px-4 clear-both text-sm whitespace-nowrap hover:text-indigo-500"
                role="menuitem"
                onClick={closeDropdownUser}
                to="/app/settings/profile"
              >
                {t('app.navbar.profile')}
              </Link>
            </li>
            <li className="relative">
              <Link
                className="block w-full py-2 px-4 clear-both text-sm whitespace-nowrap hover:text-indigo-500"
                role="menuitem"
                onClick={closeDropdownUser}
                to="/app/settings/workspaces"
              >
                {t('app.navbar.workspaces')}
              </Link>
            </li>
            <li className="relative">
              <Link
                className="block w-full py-2 px-4 clear-both text-sm whitespace-nowrap hover:text-indigo-500"
                role="menuitem"
                onClick={closeDropdownUser}
                to="/app/settings/members"
              >
                {t('app.navbar.members')}
              </Link>
            </li>
            <li className="relative">
              <Link
                className="block w-full py-2 px-4 clear-both text-sm whitespace-nowrap hover:text-indigo-500"
                role="menuitem"
                onClick={closeDropdownUser}
                to="/app/settings/subscription"
              >
                {t('app.navbar.subscription')}
              </Link>
            </li>
            <li className="relative">
              <Link
                className="block w-full py-2 px-4 clear-both text-sm whitespace-nowrap hover:text-indigo-500"
                role="menuitem"
                onClick={closeDropdownUser}
                to="/app/settings/tenant"
              >
                {t('app.navbar.tenant')}
              </Link>
            </li>
            <div className="border-t border-gray-200 mt-1"></div>

            <li className="relative">
              <button
                onClick={signOut}
                className="block w-full py-2 px-6 clear-both text-sm whitespace-nowrap hover:text-indigo-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="inline mr-2 w-5 h-5 bi bi-box-arrow-in-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  ></path>
                </svg>
                {t('app.navbar.signOut')}
              </button>
            </li>

            {/* <button
              onClick={signOut}
              className="text-left w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150 focus:outline-none"
              role="menuitem"
            >
              {t('app.navbar.signOut')}
            </button> */}
          </ul>
        </div>
      </Transition>
    </div>
  );
}
