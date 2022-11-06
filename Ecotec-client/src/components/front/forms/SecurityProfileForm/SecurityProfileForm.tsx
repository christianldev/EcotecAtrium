import React, {
	ChangeEvent,
	FormEvent,
	useRef,
	useState,
} from 'react';

import {useTranslation} from 'react-i18next';
import store from '@/store';
import UserUtils from '@/utils/store/UserUtils';
import services from '@/services';
import ErrorModal, {
	RefErrorModal,
} from '@/components/ui/modals/ErrorModal';
import SuccessModal, {
	RefSuccessModal,
} from '@/components/ui/modals/SuccessModal';
import ConfirmModal, {
	RefConfirmModal,
} from '@/components/ui/modals/ConfirmModal';
import {UserLoginType} from '@/application/enums/core/users/UserLoginType';
import ButtonPrimary from '@/components/ui/buttons/ButtonPrimary';
import {UserType} from '@/application/enums/core/users/UserType';
import supportedLocales from '@/locale/supportedLocales';
import i18n from '@/locale/i18n';

interface ISecurityProfileFormProps {}

const SecurityProfileForm: React.FC<
	ISecurityProfileFormProps
> = (props) => {
	const {t} = useTranslation();

	const errorModal = useRef<RefErrorModal>(null);

	const confirmModal = useRef<RefConfirmModal>(null);
	const locales = supportedLocales;

	const [selectedLocale, setSelectedLocale] = useState(
		i18n.language
	);

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

	return (
		<div className="tab-content w-full mt-5">
			<div
				className="tab-pane active"
				role="tabpanel"
				id="_hz54mykar"
				aria-labelledby="_hz54mykar-tab">
				<div className="grid grid-cols-12 gap-6">
					<div className="intro-y box col-span-12 lg:col-span-6">
						<div className="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
							<h3 className="font-medium text-base mr-auto">
								{t('settings.preferences.title')}
							</h3>
							<p className="mt-1 text-sm leading-5 text-gray-600">
								{t('settings.preferences.description')}
							</p>
						</div>

						<form>
							<div className="shadow sm:rounded-sm">
								<div className="px-4 py-5 bg-white sm:p-6">
									<div className="grid grid-cols-4 gap-2">
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
					<div className="intro-y box col-span-12 lg:col-span-6">
						<div className="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
							<h3 className="font-medium text-base mr-auto">
								{t('settings.danger.title')}
							</h3>
							<p className="mt-1 text-xs leading-5 text-gray-600">
								{t('settings.danger.description')}
							</p>
						</div>

						<form>
							<div className="bg-white">
								<div className="flex items-center justify-between px-3 py-3 sm:py-3">
									<div className="mt-2 max-w-xl text-xs leading-5 p-2 text-gray-500">
										<p>
											{t('settings.danger.onceYouDelete')}.
										</p>
									</div>

									<ButtonPrimary
										destructive={true}
										onClick={deleteAccount}
										type="button">
										{t('settings.danger.deleteAccount')}
									</ButtonPrimary>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SecurityProfileForm;
