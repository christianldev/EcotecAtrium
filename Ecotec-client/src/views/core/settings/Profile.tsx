import { useTranslation } from 'react-i18next';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import ErrorModal, { RefErrorModal } from '@/components/ui/modals/ErrorModal';
import SuccessModal, { RefSuccessModal } from '@/components/ui/modals/SuccessModal';
import ConfirmModal, { RefConfirmModal } from '@/components/ui/modals/ConfirmModal';
import { UserUpdateAvatarRequest } from '@/application/contracts/core/users/UserUpdateAvatarRequest';
import { UserUpdateRequest } from '@/application/contracts/core/users/UserUpdateRequest';
import { UserLoginType } from '@/application/enums/core/users/UserLoginType';
import { UserType } from '@/application/enums/core/users/UserType';
import ButtonPrimary from '@/components/ui/buttons/ButtonPrimary';
import ButtonTertiary from '@/components/ui/buttons/ButtonTertiary';
import UploadImage from '@/components/ui/uploaders/UploadImage';
import i18n from '@/locale/i18n';
import supportedLocales from '@/locale/supportedLocales';
import services from '@/services';
import store, { RootState } from '@/store';
import { logout } from '@/store/modules/authReducer';
import { useSelector } from 'react-redux';
import UserUtils from '@/utils/store/UserUtils';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import bg_profile from '@/assets/img/bg_profile.jpg';

export default function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const errorModal = useRef<RefErrorModal>(null);
  const successModal = useRef<RefSuccessModal>(null);
  const confirmModal = useRef<RefConfirmModal>(null);

  const locales = supportedLocales;
  const [selectedLocale, setSelectedLocale] = useState(i18n.language);
  const [showUploadImage, setShowUploadImage] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { account } = store.getState();

  const id = account.user?.id ?? '';
  const email = account.user?.email ?? '';
  const loginType = account.user?.loginType ?? '';
  const [firstName, setFirstName] = useState(account.user?.first_name ?? '');
  const [lastName, setLastName] = useState(account.user?.last_name ?? '');
  const [phone] = useState(account.user?.phone ?? '');

  const [passwordCurrent, setPasswordCurrent] = useState<string>('');
  const [passwordNew, setPasswordNew] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  function canChangePassword() {
    return loginType === UserLoginType.PASSWORD;
  }
  function changedLocale(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedLocale(e.target.value);
    const locale = e.target.value;
    services.users
      .updateLocale({ locale })
      .then(() => {
        window.location.reload();
      })
      .finally(() => {
        localStorage.setItem('locale', locale);
        i18n.changeLanguage(locale);
      });
  }
  function updateProfile(e: FormEvent) {
    e.preventDefault();
    const updateRequest: UserUpdateRequest = {
      firstName,
      lastName,
      phone,
    };
    services.users
      .update(id, updateRequest)
      .then(() => {
        successModal.current?.show(t('shared.updated'), t('settings.profile.profileUpdated'));
      })
      .catch((error) => {
        errorModal.current?.show(t('shared.error'), t(error));
      });
  }
  function signOut() {
    store.dispatch(logout());
    UserUtils.loggedOut(navigate);
  }
  function updatePassword(e: FormEvent) {
    e.preventDefault();
    services.users
      .updatePassword({
        passwordCurrent,
        passwordNew,
        passwordConfirm,
      })
      .then(() => {
        successModal.current?.show(t('shared.updated'), t('settings.profile.passwordUpdated'));
        setPasswordCurrent('');
        setPasswordNew('');
        setPasswordConfirm('');
      })
      .catch((error) => {
        errorModal.current?.show(t('shared.error'), t(error));
      });
  }
  function deleteAccount() {
    const { account } = store.getState();
    if (account.user?.type === UserType.Admin) {
      errorModal.current?.show(t('settings.profile.errors.cannotDeleteAdmin'));
    } else {
      confirmModal.current?.show(
        t('settings.danger.confirmDelete'),
        t('shared.confirm'),
        t('shared.cancel'),
        t('shared.warningCannotUndo'),
      );
    }
  }
  function confirmDelete() {
    services.users
      .deleteMe()
      .then(() => {
        UserUtils.loggedOut(navigate);
      })
      .catch((error) => {
        errorModal.current?.show(t('shared.error'), t(error));
      });
  }
  function loadedImage(image) {
    const updateAvatar: UserUpdateAvatarRequest = {
      avatar: image,
    };
    setUploadingImage(true);
    services.users
      .updateAvatar(updateAvatar)
      .then(() => {
        setShowUploadImage(false);
      })
      .catch((error) => {
        console.error('Error: ' + JSON.stringify(error));
      })
      .finally(() => {
        setUploadingImage(false);
      });
  }
  const avatar = useSelector((state: RootState) => {
    return state.account.user?.avatar ?? '';
  });

  return (
    <div className="py-4 space-y-2 mx-auto max-w-5xl xl:max-w-7xl px-4 sm:px-6 lg:px-8">
      {/*Profile */}
      <HelmetProvider>
        <Helmet>
          <title>{t('settings.profile.profileTitle')} | PRODUCT_NAME</title>
        </Helmet>
      </HelmetProvider>
      <div>
        <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg mb-8">
          <div className="group h-40 overflow-hidden relative">
            <img src={bg_profile} className="w-full" />

            <div className="absolute top-4 ltr:right-4 rtl:left-4">
              <button
                type="button"
                className="group-hover:opacity-80 opacity-0 py-1.5 px-3 inline-block text-center mb-3 rounded leading-5 text-gray-800 bg-gray-200 border border-gray-200 hover:text-gray-900 hover:bg-gray-300 hover:ring-0 hover:border-gray-300 focus:bg-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0"
              >
                Edit cover{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="inline-block bi bi-camera"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"></path>
                  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex justify-center -mt-10 relative">
            <a className="z-30 group" href="javascript:;">
              {avatar ? (
                <img
                  src={avatar}
                  className="rounded-full w-24 h-24 bg-gray-200 border-solid border-white border-2 -mt-3"
                />
              ) : (
                <svg
                  className="h-20 w-20 rounded-full border border-gray-700 bg-gray-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
              <div
                title="Change avatar"
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-white dark:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="w-6 h-6 bi bi-camera"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"></path>
                  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path>
                </svg>
              </div>
            </a>
          </div>
          <div className="text-center px-3 pb-6 pt-2">
            <h3 className="text-gray-800 dark:text-gray-100 font-bold text-lg">
              {firstName} {lastName}
            </h3>
            <p className="mt-2 text-gray-400">Hello, i'm professional front end developer!</p>
          </div>
          <div className="flex justify-center pb-6">
            <div className="text-center px-2.5">
              <p className="text-gray-500">14</p>
              <span className="text-gray-400">Projects</span>
            </div>
            <div className="text-center px-2.5">
              <p className="text-gray-500">12</p>
              <span className="text-gray-400">Team</span>
            </div>
            <div className="text-center px-2.5">
              <p className="text-gray-500">221</p>
              <span className="text-gray-400">Tasks</span>
            </div>
          </div>
        </div>

        <div className="md:grid lg:grid-cols-3 md:gap-2">
          <div className="md:col-span-1">
            <div className="sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">{t('settings.profile.profileTitle')}</h3>
              <p className="mt-1 text-xs leading-5 text-gray-600">{t('settings.profile.profileText')}</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={updateProfile}>
              <div className="shadow overflow-hidden sm:rounded-sm">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-2">
                    <div className="col-span-6 sm:col-span-6 md:col-span-6">
                      <label htmlFor="email_address" className="block text-sm font-medium leading-5 text-gray-700">
                        {t('account.shared.email')}
                      </label>
                      <input
                        value={email}
                        required
                        disabled={true}
                        type="email"
                        id="email_address"
                        className="bg-gray-100 mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                    <div className="col-span-6 md:col-span-3">
                      <label htmlFor="firstName" className="block text-sm font-medium leading-5 text-gray-700">
                        {t('settings.profile.firstName')}
                      </label>
                      <input
                        id="firstName"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="col-span-6 md:col-span-3">
                      <label htmlFor="lastName" className="block text-sm font-medium leading-5 text-gray-700">
                        {t('settings.profile.lastName')}
                      </label>
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        id="lastName"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label htmlFor="avatar" className="block text-sm leading-5 font-medium text-gray-700">
                        {t('shared.avatar')}
                      </label>
                      <div className="mt-2 flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                          {(() => {
                            if (avatar) {
                              return <img id="avatar" alt="Avatar" src={avatar} />;
                            } else {
                              return (
                                <svg
                                  id="avatar"
                                  className="h-full w-full text-gray-300"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              );
                            }
                          })()}
                        </div>

                        <ButtonTertiary onClick={() => setShowUploadImage(true)} type="button">
                          {t('shared.upload')}
                        </ButtonTertiary>
                        {avatar && (
                          <ButtonTertiary destructive={true} onClick={() => loadedImage(null)} type="button">
                            {t('shared.delete')}
                          </ButtonTertiary>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex space-x-2 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-theme-600 hover:bg-theme-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-500"
                  >
                    {t('shared.save')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/*Separator */}
        <div className="block">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>

        {/*Security */}
        <div className="md:grid lg:grid-cols-3 md:gap-2">
          <div className="md:col-span-1">
            <div className="sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">{t('settings.profile.securityTitle')}</h3>
              <p className="mt-1 text-xs leading-5 text-gray-600">
                {t('account.login.forgot')}{' '}
                <a
                  onClick={signOut}
                  className="text-theme-600 font-bold hover:text-theme-500"
                  href={'/forgot-password?e=' + email}
                >
                  {t('account.reset.button')}
                </a>
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={updatePassword}>
              <div className="shadow overflow-hidden sm:rounded-sm">
                {(() => {
                  if (canChangePassword()) {
                    return (
                      <div>
                        <div className="px-4 py-5 bg-white sm:p-6">
                          <div className="grid grid-cols-6 gap-2">
                            <div className="col-span-6 sm:col-span-6">
                              <label
                                htmlFor="passwordCurrent"
                                className="block text-sm font-medium leading-5 text-gray-700"
                              >
                                {t('settings.profile.passwordCurrent')}
                              </label>
                              <input
                                required={loginType === 0}
                                type="password"
                                id="passwordCurrent"
                                value={passwordCurrent}
                                onChange={(e) => setPasswordCurrent(e.target.value)}
                                className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              />
                            </div>
                            <div className="col-span-6 md:col-span-3">
                              <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                                {t('settings.profile.password')}
                              </label>
                              <input
                                required
                                type="password"
                                id="password"
                                value={passwordNew}
                                onChange={(e) => setPasswordNew(e.target.value)}
                                className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              />
                            </div>

                            <div className="col-span-6 md:col-span-3">
                              <label
                                htmlFor="passwordConfirm"
                                className="block text-sm font-medium leading-5 text-gray-700"
                              >
                                {t('settings.profile.passwordConfirm')}
                              </label>
                              <input
                                required
                                type="password"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                id="passwordConfirm"
                                className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex space-x-2 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-theme-600 hover:bg-theme-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-500"
                          >
                            {t('shared.save')}
                          </button>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="px-4 py-5 bg-white sm:p-6 block text-sm font-medium leading-5 text-gray-700">
                        {t('settings.profile.cannotChangePassword')}
                      </div>
                    );
                  }
                })()}
              </div>
            </form>
          </div>
        </div>

        {/*Separator */}
        <div className="block">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>

        {/*Preferences */}
        <div className="md:grid lg:grid-cols-3 md:gap-2">
          <div className="md:col-span-1">
            <div className="sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">{t('settings.preferences.title')}</h3>
              <p className="mt-1 text-xs leading-5 text-gray-600">{t('settings.preferences.description')}</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form>
              <div className="shadow sm:rounded-sm">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-2">
                    <div className="col-span-6 sm:col-span-6">
                      <label htmlFor="locale" className="block text-sm font-medium leading-5 text-gray-700">
                        {t('settings.preferences.language')}
                      </label>
                      <select
                        id="locale"
                        required
                        value={selectedLocale}
                        onChange={changedLocale}
                        className="w-full flex-1 focus:ring-theme-500 focus:border-theme-500 block min-w-0 rounded-md sm:text-sm border-gray-300"
                      >
                        {locales.map((locale, idx) => {
                          return (
                            <option key={idx} value={locale.lang}>
                              {locale.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/*Separator */}
        <div className="block">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>
        {/*Danger */}
        <div className="md:grid lg:grid-cols-3 md:gap-2">
          <div className="md:col-span-1">
            <div className="sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">{t('settings.danger.title')}</h3>
              <p className="mt-1 text-xs leading-5 text-gray-600">{t('settings.danger.description')}</p>
            </div>
          </div>
          <div className="mt-12 md:mt-0 md:col-span-2">
            <form>
              <div className="bg-white shadow sm:rounded-sm">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {t('settings.danger.deleteYourAccount')}
                  </h3>
                  <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                    <p>{t('settings.danger.onceYouDelete')}.</p>
                  </div>
                  <div className="mt-5">
                    <ButtonPrimary destructive={true} onClick={deleteAccount} type="button">
                      {t('settings.danger.deleteAccount')}
                    </ButtonPrimary>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showUploadImage && !uploadingImage && (
        <UploadImage
          onClose={() => setShowUploadImage(false)}
          title={t('shared.avatar')}
          initialImage={avatar}
          onLoaded={loadedImage}
        />
      )}
      <SuccessModal ref={successModal} />
      <ErrorModal ref={errorModal} />
      <ConfirmModal ref={confirmModal} onYes={confirmDelete} />
    </div>
  );
}
