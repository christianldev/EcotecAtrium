import React, {FormEvent, useRef, useState} from 'react';
import store, {RootState} from '@/store';
import {UserUpdateRequest} from '@/application/contracts/core/users/UserUpdateRequest';
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
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

interface IUpdateProfileFormProps {}

const UpdateProfileForm: React.FC<
	IUpdateProfileFormProps
> = (props) => {
	const {t} = useTranslation();
	const errorModal = useRef<RefErrorModal>(null);
	const successModal = useRef<RefSuccessModal>(null);
	const confirmModal = useRef<RefConfirmModal>(null);
	const {account} = store.getState();
	const id = account.user?.id ?? '';

	const [firstName, setFirstName] = useState(
		account.user?.first_name ?? ''
	);
	const [lastName, setLastName] = useState(
		account.user?.last_name ?? ''
	);
	const [phone, setPhone] = useState(
		account.user?.phone ?? ''
	);
	const [email, setEmail] = useState(
		account.user?.email ?? ''
	);

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

	const avatar = useSelector((state: RootState) => {
		return state.account.user?.avatar ?? '';
	});

	return (
		<div className="grid grid-cols-12 gap-6">
			<div className="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse">
				<div className="intro-y box mt-5">
					<div className="relative flex items-center p-5">
						<div className="w-12 h-12 image-fit">
							{avatar ? (
								<img
									alt="Midone Tailwind HTML Admin Template"
									className="rounded-full"
									src={avatar}
								/>
							) : (
								<svg
									className="rounded-full bg-gray-400"
									fill="currentColor"
									viewBox="0 0 24 24">
									<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
								</svg>
							)}
						</div>
						<div className="ml-4 mr-auto">
							<div className="font-medium text-base">
								{firstName} {lastName}
							</div>
							<div className="text-slate-500">{email}</div>
						</div>
						<div
							className="dropdown"
							data-tw-placement="bottom-end">
							<a
								className="dropdown-toggle w-5 h-5 block"
								aria-expanded="false"
								data-tw-toggle="dropdown"
								href="javascript:;">
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
									className="lucide w-5 h-5 text-slate-500">
									<circle cx="12" cy="12" r="1"></circle>
									<circle cx="19" cy="12" r="1"></circle>
									<circle cx="5" cy="12" r="1"></circle>
								</svg>
							</a>
							<div className="dropdown-menu w-56">
								<ul className="dropdown-content">
									<li>
										<h6 className="dropdown-header">
											{' '}
											Export Options
										</h6>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<a className="dropdown-item cursor-pointer">
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
												<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
											</svg>{' '}
											English{' '}
										</a>
									</li>
									<li>
										<a className="dropdown-item cursor-pointer">
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
													d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 
                         003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
												<polyline
													points="3.27 6.96 
                         12 12.01 20.73 6.96"></polyline>
												<line
													x1="12"
													y1="22.08"
													x2="12"
													y2="12"></line>
											</svg>{' '}
											Indonesia
											<div className="text-xs text-white px-1 rounded-full bg-danger ml-auto">
												{' '}
												10{' '}
											</div>
										</a>
									</li>
									<li>
										<a className="dropdown-item cursor-pointer">
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
													x="3"
													y="3"
													width="18"
													height="18"
													rx="2"
													ry="2"></rect>
												<line
													x1="3"
													y1="9"
													x2="21"
													y2="9"></line>
												<line
													x1="9"
													y1="21"
													x2="9"
													y2="9"></line>
											</svg>{' '}
											English{' '}
										</a>
									</li>
									<li>
										<a
											className="dropdown-item 
                    cursor-pointer">
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
													x="3"
													y="3"
													width="18"
													height="18"
													rx="2"
													ry="2"></rect>
												<line
													x1="9"
													y1="3"
													x2="9"
													y2="21"></line>
											</svg>{' '}
											Indonesia{' '}
										</a>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<div className="dropdown-footer">
											<button
												type="button"
												className="btn btn-primary py-1 px-2">
												Settings{' '}
											</button>
											<button
												type="button"
												className="btn btn-secondary py-1 px-2 ml-auto">
												{' '}
												View Profile
											</button>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div
						className="p-5 border-t border-slate-200/60 
                    dark:border-darkmode-400">
						<a
							className="flex items-center text-primary font-medium"
							href="">
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
								<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
							</svg>{' '}
							Personal Information{' '}
						</a>
						<a className="flex items-center mt-5" href="">
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
									d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 
                            4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
								<polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
								<line
									x1="12"
									y1="22.08"
									x2="12"
									y2="12"></line>
							</svg>{' '}
							Account Settings{' '}
						</a>
						<a className="flex items-center mt-5" href="">
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
									x="3"
									y="11"
									width="18"
									height="11"
									rx="2"
									ry="2"></rect>
								<path d="M7 11V7a5 5 0 0110 0v4"></path>
							</svg>{' '}
							Change Password{' '}
						</a>
						<a className="flex items-center mt-5" href="">
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
									d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 
                                      1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 
                                      2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 
                                      011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 
                                      0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 
                                      0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z"></path>
								<circle cx="12" cy="12" r="3"></circle>
							</svg>{' '}
							User Settings{' '}
						</a>
					</div>
					<div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
						<a className="flex items-center" href="">
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
								<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
							</svg>{' '}
							Email Settings{' '}
						</a>
						<a className="flex items-center mt-5" href="">
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
									d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2
                                                 0 002 0l7-4A2 2 0 0021 16z"></path>
								<polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
								<line
									x1="12"
									y1="22.08"
									x2="12"
									y2="12"></line>
							</svg>{' '}
							Saved Credit Cards{' '}
						</a>
						<a className="flex items-center mt-5" href="">
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
									x="3"
									y="11"
									width="18"
									height="11"
									rx="2"
									ry="2"></rect>
								<path
									d="M7 11V7a5 5 0 
                                                    0110 0v4"></path>
							</svg>{' '}
							Social Networks{' '}
						</a>
						<a className="flex items-center mt-5" href="">
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
									d="M12.22 2h-.44a2 2 0
                                             00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 
                                             2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 
                                             0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 
                                             012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 
                                             011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 
                                             0 01-1-1.73V4a2 2 0 00-2-2z"></path>
								<circle cx="12" cy="12" r="3"></circle>
							</svg>{' '}
							Tax Information{' '}
						</a>
					</div>
					<div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400 flex">
						<button
							type="button"
							className="btn btn-primary py-1 px-2">
							{' '}
							New Group{' '}
						</button>
						<button
							type="button"
							className="btn btn-outline-secondary py-1 px-2 ml-auto">
							{' '}
							New Quick Link{' '}
						</button>
					</div>
				</div>
			</div>
			<div className="col-span-12 lg:col-span-8 2xl:col-span-9">
				<div className="intro-y box lg:mt-5">
					<div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
						<h2 className="font-medium text-base mr-auto">
							Display Information
						</h2>
					</div>
					<div className="p-5">
						<div className="flex flex-col-reverse xl:flex-row">
							<div className="flex-1 mt-6 xl:mt-0">
								<div className="grid grid-cols-12 gap-x-5">
									<div className="col-span-12 2xl:col-span-6">
										<div>
											<label
												htmlFor="update-profile-form-1"
												className="form-label">
												Display Name
											</label>
											<input
												id="update-profile-form-1"
												type="text"
												className="form-control"
												placeholder="Input text"
												value={firstName + ' ' + lastName}
												onChange={(e) =>
													setFirstName(e.target.value)
												}
											/>
										</div>
										<div className="mt-3">
											<label
												htmlFor="update-profile-form-2-tomselected"
												className="form-label"
												id="update-profile-form-2-ts-label">
												Nearest MRT Station
											</label>
											<select
												className="tom-select
                                                      w-full"
												id="update-profile-form-2">
												<option value="1">Admiralty</option>
												<option value="2">Aljunied</option>
												<option value="3">
													Ang Mo Kio
												</option>
												<option value="4">Bartley</option>
												<option value="5">
													Beauty World
												</option>
											</select>
										</div>
									</div>
									<div className="col-span-12 2xl:col-span-6">
										<div className="mt-3 2xl:mt-0">
											<label
												htmlFor="update-profile-form-3-tomselected"
												className="form-label"
												id="update-profile-form-3-ts-label">
												Postal Code
											</label>
											<select
												className="tom-select w-full"
												id="update-profile-form-3">
												<option value="5">
													{' '}
													018926 - 23 PARK STREET MARINA...{' '}
												</option>
											</select>
										</div>
										<div className="mt-3">
											<label
												htmlFor="update-profile-form-4"
												className="form-label">
												Phone Number
											</label>
											<input
												id="update-profile-form-4"
												type="text"
												className="form-control"
												placeholder="Input text"
											/>
										</div>
									</div>
									<div className="col-span-12">
										<div className="mt-3">
											<label
												htmlFor="update-profile-form-5"
												className="form-label">
												Address
											</label>
											<textarea
												id="update-profile-form-5"
												className="form-control"
												placeholder="Adress">
												10 Anson Road, International Plaza,
												#10-11, 079903 Singapore, Singapore
											</textarea>
										</div>
									</div>
								</div>
								<button
									type="button"
									className="btn btn-primary w-20 mt-3">
									{' '}
									Save{' '}
								</button>
							</div>
							<div className="w-52 mx-auto xl:mr-0 xl:ml-6">
								<div className="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
									<div className="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
										{avatar ? (
											<img
												className="rounded-md"
												alt="Midone Tailwind HTML Admin Template"
												src={avatar}
											/>
										) : (
											<svg
												className="rounded-md bg-gray-400"
												fill="currentColor"
												viewBox="0 0 24 24">
												<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
											</svg>
										)}
										<div
											className="w-5 h-5 flex items-center justify-center
             absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2">
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
												className="lucide w-4 h-4">
												<line
													x1="18"
													y1="6"
													x2="6"
													y2="18"></line>
												<line
													x1="6"
													y1="6"
													x2="18"
													y2="18"></line>
											</svg>
										</div>
									</div>
									<div className="mx-auto cursor-pointer relative mt-5">
										<button
											type="button"
											className="btn btn-primary w-full">
											{' '}
											Change Photo{' '}
										</button>
										<input
											type="file"
											className="w-full h-full top-0 left-0 absolute opacity-0"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="intro-y box mt-5">
					<div
						className="flex items-center p-5 border-b border-slate-200/60 
                        dark:border-darkmode-400">
						<h2 className="font-medium text-base mr-auto">
							Personal Information
						</h2>
					</div>
					<div className="p-5">
						<div className="grid grid-cols-12 gap-x-5">
							<div className="col-span-12 xl:col-span-6">
								<div>
									<label
										htmlFor="update-profile-form-6"
										className="form-label">
										Email
									</label>
									<input
										id="update-profile-form-6"
										type="text"
										className="form-control"
										placeholder="Input text"
									/>
								</div>
								<div className="mt-3">
									<label
										htmlFor="update-profile-form-7"
										className="form-label">
										Name
									</label>
									<input
										id="update-profile-form-7"
										type="text"
										className="form-control"
										placeholder="Input text"
									/>
								</div>
								<div className="mt-3">
									<label
										htmlFor="update-profile-form-8"
										className="form-label">
										ID Type
									</label>
									<select
										id="update-profile-form-8"
										className="form-select">
										<option>IC</option>
										<option>FIN</option>
										<option>Passport</option>
									</select>
								</div>
								<div className="mt-3">
									<label
										htmlFor="update-profile-form-9"
										className="form-label">
										ID Number
									</label>
									<input
										id="update-profile-form-9"
										type="text"
										className="form-control"
										placeholder="Input text"
										value="357821204950001"
									/>
								</div>
							</div>
							<div className="col-span-12 xl:col-span-6">
								<div className="mt-3 xl:mt-0">
									<label
										htmlFor="update-profile-form-10"
										className="form-label">
										Phone Number
									</label>
									<input
										id="update-profile-form-10"
										type="text"
										className="form-control"
										placeholder="Input text"
										value={phone}
										onChange={(e) =>
											setPhone(e.target.value)
										}
									/>
								</div>
								<div className="mt-3">
									<label
										htmlFor="update-profile-form-11"
										className="form-label">
										Address
									</label>
									<input
										id="update-profile-form-11"
										type="text"
										className="form-control"
										placeholder="Input text"
										value="10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore"
									/>
								</div>
								<div className="mt-3">
									<label
										htmlFor="update-profile-form-12-tomselected"
										className="form-label"
										id="update-profile-form-12-ts-label">
										Bank Name
									</label>
									<select
										className="tom-select w-full"
										id="update-profile-form-12"
										hidden={true}>
										<option value="1">
											SBI - STATE BANK OF INDIA
										</option>
									</select>
								</div>
								<div className="mt-3">
									<label
										htmlFor="update-profile-form-13"
										className="form-label">
										Bank Account
									</label>
									<input
										id="update-profile-form-13"
										type="text"
										className="form-control"
										placeholder="Input text"
									/>
								</div>
							</div>
						</div>
						<div className="flex justify-end mt-4">
							<button
								type="button"
								className="btn btn-primary w-20 mr-auto">
								{' '}
								Save{' '}
							</button>
							<a
								href=""
								className="text-danger flex items-center">
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
									className="lucide w-4 h-4 mr-1">
									<polyline points="3 6 5 6 21 6"></polyline>
									<path
										d="M19 6v14a2 2 0 01-2 2H7a2 2 0 
                01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
									<line
										x1="10"
										y1="11"
										x2="10"
										y2="17"></line>
									<line
										x1="14"
										y1="11"
										x2="14"
										y2="17"></line>
								</svg>{' '}
								Delete Account{' '}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default UpdateProfileForm;
