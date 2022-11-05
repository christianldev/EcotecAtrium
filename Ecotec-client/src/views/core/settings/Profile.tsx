import {useTranslation} from 'react-i18next';
import {
	ChangeEvent,
	FormEvent,
	useRef,
	useState,
} from 'react';
import ErrorModal, {
	RefErrorModal,
} from '@/components/ui/modals/ErrorModal';
import SuccessModal, {
	RefSuccessModal,
} from '@/components/ui/modals/SuccessModal';
import ConfirmModal, {
	RefConfirmModal,
} from '@/components/ui/modals/ConfirmModal';
import {UserUpdateAvatarRequest} from '@/application/contracts/core/users/UserUpdateAvatarRequest';
import {UserUpdateRequest} from '@/application/contracts/core/users/UserUpdateRequest';
import {UserLoginType} from '@/application/enums/core/users/UserLoginType';
import {UserType} from '@/application/enums/core/users/UserType';
import ButtonPrimary from '@/components/ui/buttons/ButtonPrimary';
import ButtonTertiary from '@/components/ui/buttons/ButtonTertiary';
import UploadImage from '@/components/ui/uploaders/UploadImage';
import i18n from '@/locale/i18n';
import supportedLocales from '@/locale/supportedLocales';
import services from '@/services';
import store, {RootState} from '@/store';
import {logout} from '@/store/modules/authReducer';
import {useSelector} from 'react-redux';
import UserUtils from '@/utils/store/UserUtils';
import {useNavigate} from 'react-router-dom';
import {Helmet, HelmetProvider} from 'react-helmet-async';

import ChangePasswordForm from '@/components/front/forms/ChangePasswordForm';

const tabItems = [
	{
		id: 1,
		title: 'Profile',
		icon: 'fas fa-user',
		content: 'profile',
	},
	{
		id: 2,
		title: 'Account',
		icon: 'fas fa-user-cog',
		content: 'account',
	},
	{
		id: 3,
		title: 'Change Password',
		icon: 'fas fa-key',
		content: <ChangePasswordForm />,
	},
	{
		id: 4,
		title: 'Settings',
		icon: 'fas fa-cog',
		content: 'settings',
	},
];

export default function Profile() {
	const {t} = useTranslation();
	const navigate = useNavigate();

	const errorModal = useRef<RefErrorModal>(null);
	const successModal = useRef<RefSuccessModal>(null);
	const confirmModal = useRef<RefConfirmModal>(null);

	const locales = supportedLocales;
	const [selectedLocale, setSelectedLocale] = useState(
		i18n.language
	);
	const [showUploadImage, setShowUploadImage] =
		useState(false);
	const [uploadingImage, setUploadingImage] =
		useState(false);

	const {account} = store.getState();

	const id = account.user?.id ?? '';
	const email = account.user?.email ?? '';
	const loginType = account.user?.loginType ?? '';
	const [firstName, setFirstName] = useState(
		account.user?.first_name ?? ''
	);
	const [lastName, setLastName] = useState(
		account.user?.last_name ?? ''
	);
	const [phone] = useState(account.user?.phone ?? '');

	const [passwordCurrent, setPasswordCurrent] =
		useState<string>('');
	const [passwordNew, setPasswordNew] =
		useState<string>('');
	const [passwordConfirm, setPasswordConfirm] =
		useState<string>('');
	const [tabSelected, setTabSelected] = useState(1);

	function canChangePassword() {
		return loginType === UserLoginType.PASSWORD;
	}
	function changedLocale(
		e: ChangeEvent<HTMLSelectElement>
	) {
		setSelectedLocale(e.target.value);
		const locale = e.target.value;
		services.users
			.updateLocale({locale})
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
				successModal.current?.show(
					t('shared.updated'),
					t('settings.profile.profileUpdated')
				);
			})
			.catch((error) => {
				errorModal.current?.show(
					t('shared.error'),
					t(error)
				);
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
				successModal.current?.show(
					t('shared.updated'),
					t('settings.profile.passwordUpdated')
				);
				setPasswordCurrent('');
				setPasswordNew('');
				setPasswordConfirm('');
			})
			.catch((error) => {
				errorModal.current?.show(
					t('shared.error'),
					t(error)
				);
			});
	}
	function deleteAccount() {
		const {account} = store.getState();
		if (account.user?.type === UserType.Admin) {
			errorModal.current?.show(
				t('settings.profile.errors.cannotDeleteAdmin')
			);
		} else {
			confirmModal.current?.show(
				t('settings.danger.confirmDelete'),
				t('shared.confirm'),
				t('shared.cancel'),
				t('shared.warningCannotUndo')
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
				errorModal.current?.show(
					t('shared.error'),
					t(error)
				);
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
		<div className="intro-y box px-5 pt-5 mt-5">
			{/*Profile */}
			<HelmetProvider>
				<Helmet>
					<title>
						{t('settings.profile.profileTitle')} |
						PRODUCT_NAME
					</title>
				</Helmet>
			</HelmetProvider>
			<div>
				{/*Profile Info */}
				<div className="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5">
					<div className="flex flex-1 px-5 items-center justify-center lg:justify-start">
						<div className="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
							{avatar ? (
								<img
									alt="Midone Tailwind HTML Admin Template"
									className="rounded-full"
									src={avatar}
								/>
							) : (
								<div className="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
									<svg
										className="rounded-full bg-gray-400"
										fill="currentColor"
										viewBox="0 0 24 24">
										<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
									</svg>
								</div>
							)}
						</div>

						<div className="ml-5">
							<div className="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
								John Travolta
							</div>
							<div className="text-slate-500">
								DevOps Engineer
							</div>
						</div>
					</div>
					<div
						className="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 
		border-t lg:border-t-0 pt-5 lg:pt-0">
						<div className="font-medium text-center lg:text-left lg:mt-3">
							Contact Details{' '}
						</div>
						<div className="flex flex-col justify-center items-center lg:items-start mt-4">
							<div className="truncate sm:whitespace-normal flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									className="lucide w-4 h-4 mr-2">
									<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
									<polyline points="22,6 12,13 2,6"></polyline>
								</svg>{' '}
								johntravolta@left4code.com
							</div>
							<div className="truncate sm:whitespace-normal flex items-center mt-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									className="lucide w-4 h-4 mr-2">
									<rect
										x="2"
										y="2"
										width="20"
										height="20"
										rx="5"
										ry="5"></rect>
									<path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
									<line
										x1="17.5"
										y1="6.5"
										x2="17.51"
										y2="6.5"></line>
								</svg>{' '}
								Instagram John Travolta
							</div>
							<div className="truncate sm:whitespace-normal flex items-center mt-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									className="lucide w-4 h-4 mr-2">
									<path
										d="M23 3a10.9 10.9 0 
							01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 
							01-7 2c9 5 20 0 20-11.5 0-.28-.03-.56-.08-.83A7.72 7.72 0 0023 3z"></path>
								</svg>{' '}
								Twitter John Travolta
							</div>
						</div>
					</div>
					<div
						className="mt-6 lg:mt-0 flex-1 
							flex items-center justify-center px-5 border-t lg:border-0 border-slate-200/60 
							dark:border-darkmode-400 pt-5 lg:pt-0">
						<div className="text-center rounded-md w-20 py-3">
							<div className="font-medium text-primary text-xl">
								201
							</div>
							<div className="text-slate-500">Orders</div>
						</div>
						<div
							className="text-center rounded-md 
					w-20 py-3">
							<div className="font-medium text-primary text-xl">
								1k
							</div>
							<div className="text-slate-500">
								Purchases
							</div>
						</div>
						<div
							className="text-center rounded-md 
					w-20 py-3">
							<div className="font-medium text-primary text-xl">
								492
							</div>
							<div className="text-slate-500">Reviews</div>
						</div>
					</div>
				</div>

				{/* Profile tabs */}

				<ul
					className="nav nav-link-tabs flex-col sm:flex-row justify-center lg:justify-start text-center"
					role="tablist">
					{tabItems.map((item) => (
						<li
							key={item.id}
							className="nav-item "
							role="presentation">
							<button
								onClick={() => setTabSelected(item.id)}
								className={`nav-link py-4 flex items-center cursor-pointer ${
									tabSelected === item.id ? 'active' : ''
								}`}
								type="button"
								role="tab"
								data-tw-target="#_mns7deevj"
								aria-controls="_mns7deevj"
								aria-selected={
									tabSelected === item.id ? 'true' : 'false'
								}>
								<i
									className={`lucide w-4 h-4 mr-2 ${item.icon}`}></i>{' '}
								{item.title}
							</button>
						</li>
					))}
				</ul>

				{/*Profile options */}
				<div className="md:grid lg:grid-cols-3 md:gap-2 tab-content w-full mt-5 shadow-lg">
					{tabItems.map(
						(item) =>
							tabSelected === item.id && item.content
					)}
				</div>

				{/*Security */}
				<div className="md:grid lg:grid-cols-3 md:gap-2">
					<div className="md:col-span-1">
						<div className="sm:px-0">
							<h3 className="text-lg font-medium leading-6 text-gray-900">
								{t('settings.profile.securityTitle')}
							</h3>
							<p className="mt-1 text-xs leading-5 text-gray-600">
								{t('account.login.forgot')}{' '}
								<a
									onClick={signOut}
									className="text-theme-600 font-bold hover:text-theme-500"
									href={'/forgot-password?e=' + email}>
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
																className="block text-sm font-medium leading-5 text-gray-700">
																{t(
																	'settings.profile.passwordCurrent'
																)}
															</label>
															<input
																required={loginType === 0}
																type="password"
																id="passwordCurrent"
																value={passwordCurrent}
																onChange={(e) =>
																	setPasswordCurrent(
																		e.target.value
																	)
																}
																className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
															/>
														</div>
														<div className="col-span-6 md:col-span-3">
															<label
																htmlFor="password"
																className="block text-sm font-medium leading-5 text-gray-700">
																{t(
																	'settings.profile.password'
																)}
															</label>
															<input
																required
																type="password"
																id="password"
																value={passwordNew}
																onChange={(e) =>
																	setPasswordNew(
																		e.target.value
																	)
																}
																className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
															/>
														</div>

														<div className="col-span-6 md:col-span-3">
															<label
																htmlFor="passwordConfirm"
																className="block text-sm font-medium leading-5 text-gray-700">
																{t(
																	'settings.profile.passwordConfirm'
																)}
															</label>
															<input
																required
																type="password"
																value={passwordConfirm}
																onChange={(e) =>
																	setPasswordConfirm(
																		e.target.value
																	)
																}
																id="passwordConfirm"
																className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
															/>
														</div>
													</div>
												</div>
												<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
													<button
														type="submit"
														className="inline-flex space-x-2 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-theme-600 hover:bg-theme-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-500">
														{t('shared.save')}
													</button>
												</div>
											</div>
										);
									} else {
										return (
											<div className="px-4 py-5 bg-white sm:p-6 block text-sm font-medium leading-5 text-gray-700">
												{t(
													'settings.profile.cannotChangePassword'
												)}
											</div>
										);
									}
								})()}
							</div>
						</form>
					</div>
				</div>

				{/*Preferences */}
				<div className="md:grid lg:grid-cols-3 md:gap-2">
					<div className="md:col-span-1">
						<div className="sm:px-0">
							<h3 className="text-lg font-medium leading-6 text-gray-900">
								{t('settings.preferences.title')}
							</h3>
							<p className="mt-1 text-xs leading-5 text-gray-600">
								{t('settings.preferences.description')}
							</p>
						</div>
					</div>
					<div className="mt-5 md:mt-0 md:col-span-2">
						<form>
							<div className="shadow sm:rounded-sm">
								<div className="px-4 py-5 bg-white sm:p-6">
									<div className="grid grid-cols-6 gap-2">
										<div className="col-span-6 sm:col-span-6">
											<label
												htmlFor="locale"
												className="block text-sm font-medium leading-5 text-gray-700">
												{t('settings.preferences.language')}
											</label>
											<select
												id="locale"
												required
												value={selectedLocale}
												onChange={changedLocale}
												className="w-full flex-1 focus:ring-theme-500 focus:border-theme-500 block min-w-0 rounded-md sm:text-sm border-gray-300">
												{locales.map((locale, idx) => {
													return (
														<option
															key={idx}
															value={locale.lang}>
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

				{/*Danger */}
				<div className="md:grid lg:grid-cols-3 md:gap-2">
					<div className="md:col-span-1">
						<div className="sm:px-0">
							<h3 className="text-lg font-medium leading-6 text-gray-900">
								{t('settings.danger.title')}
							</h3>
							<p className="mt-1 text-xs leading-5 text-gray-600">
								{t('settings.danger.description')}
							</p>
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
										<p>
											{t('settings.danger.onceYouDelete')}.
										</p>
									</div>
									<div className="mt-5">
										<ButtonPrimary
											destructive={true}
											onClick={deleteAccount}
											type="button">
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
			<ConfirmModal
				ref={confirmModal}
				onYes={confirmDelete}
			/>
		</div>
	);
}
