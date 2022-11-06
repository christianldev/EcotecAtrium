import React, {FormEvent, useRef, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import store from '@/store';

import services from '@/services';
import {RefErrorModal} from '@/components/ui/modals/ErrorModal';
import {RefSuccessModal} from '@/components/ui/modals/SuccessModal';
import {logout} from '@/store/modules/authReducer';
import UserUtils from '@/utils/store/UserUtils';

interface IChangePasswordFormProps {}

const ChangePasswordForm: React.FC<
	IChangePasswordFormProps
> = () => {
	const {t} = useTranslation();
	const navigate = useNavigate();
	const errorModal = useRef<RefErrorModal>(null);
	const successModal = useRef<RefSuccessModal>(null);

	const {account} = store.getState();
	const email = account.user?.email ?? '';
	const [passwordCurrent, setPasswordCurrent] =
		useState<string>('');
	const [passwordNew, setPasswordNew] =
		useState<string>('');
	const [passwordConfirm, setPasswordConfirm] =
		useState<string>('');
	const loginType = account.user?.loginType ?? '';

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

	function signOut() {
		store.dispatch(logout());
		UserUtils.loggedOut(navigate);
	}

	return (
		<div className="intro-y box p-5 mt-5">
			<div className="rounded-md p-5">
				<div className="grid grid-cols-12 gap-6">
					<div className="col-span-12">
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
						<form
							onSubmit={updatePassword}
							className="intro-y  lg:mt-2">
							<div className="flex items-center p-5">
								<h2 className="font-medium text-base mr-auto">
									Change Password
								</h2>
							</div>
							<div className="p-5">
								<div>
									<label
										htmlFor="change-password-form-1"
										className="form-label">
										Old Password
									</label>
									<input
										required={loginType === 0}
										id="passwordCurrent"
										value={passwordCurrent}
										onChange={(e) =>
											setPasswordCurrent(e.target.value)
										}
										type="password"
										className="form-control"
										placeholder="Input text"
									/>
								</div>
								<div className="mt-3">
									<label
										htmlFor="change-password-form-2"
										className="form-label">
										New Password
									</label>
									<input
										id="change-password-form-2"
										type="password"
										className="form-control"
										placeholder="Input text"
									/>
								</div>
								<div className="mt-3">
									<label
										htmlFor="change-password-form-3"
										className="form-label">
										Confirm New Password
									</label>
									<input
										required
										type="password"
										value={passwordConfirm}
										onChange={(e) =>
											setPasswordConfirm(e.target.value)
										}
										id="passwordConfirm"
										className="form-control"
										placeholder="Input text"
									/>
								</div>
								<button
									type="submit"
									className="btn btn-primary mt-4">
									{' '}
									{t('shared.save')}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChangePasswordForm;
