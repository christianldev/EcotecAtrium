import {Link, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Transition} from '@headlessui/react';
import {Fragment, useState} from 'react';
import classNames from '@/utils/shared/ClassesUtils';
import store, {RootState} from '@/store';
import {logout} from '@/store/modules/authReducer';
import {useSelector} from 'react-redux';
import {UserDto} from '@/application/dtos/core/users/UserDto';
import {useOuterClick} from '@/utils/shared/KeypressUtils';
import UserUtils from '@/utils/store/UserUtils';

export default function ProfileButton() {
	const {t} = useTranslation();
	const navigate = useNavigate();

	const [opened, setOpened] = useState(false);

	function closeDropdownUser() {
		setOpened(false);
	}
	function signOut() {
		store.dispatch(logout());
		UserUtils.loggedOut(navigate);
	}
	const user = useSelector(
		(state: RootState): UserDto | null => {
			return state.account.user;
		}
	);
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

	const clickOutside = useOuterClick(() =>
		setOpened(false)
	);

	console.log('opened', opened);

	return (
		<div ref={clickOutside} className="relative">
			<div className="inline-flex shadow-none rounded-sm divide-x divide-gray-300">
				<button
					onClick={() => setOpened(!opened)}
					className={classNames(
						'bg-gray-white focus:outline-none font-medium inline-flex items-center relative rounded-full shadow-inner text-slate-400'
					)}
					id="user-menu"
					aria-label="User menu"
					aria-haspopup="true">
					{(() => {
						if (avatar) {
							return (
								<div
									className="px-1 flex text-sm rounded-full focus:outline-none"
									id="user-menu-button">
									<div className="relative">
										<img
											className="h-8 w-8 rounded-full border border-gray-700 bg-gray-700"
											src={avatar}
											alt="avatar"
										/>
										<span
											title="online"
											className="flex justify-center absolute -bottom-0.5 ltr:right-1 rtl:left-1 text-center bg-green-500 border border-white w-3 h-3 rounded-full"></span>
									</div>
								</div>
							);
						} else {
							return (
								<div
									className="px-1 flex text-xs rounded-full focus:outline-none"
									id="user-menu-button">
									<div className="relative">
										<svg
											className="h-8 w-8 rounded-full border border-gray-700 bg-gray-700"
											fill="currentColor"
											viewBox="0 0 24 24">
											<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
										</svg>

										<span
											title="online"
											className="flex justify-start absolute ml-5 -bottom-1 text-center bg-green-500 border border-white w-3 h-3 rounded-full"></span>
									</div>
								</div>
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
				leaveTo="transform opacity-0 scale-95">
				<div
					v-show="dropDownUser"
					className={`dropdown-menu w-56 absolute m-0 ${
						opened ? 'show' : 'hidden'
					}`}
					style={{
						width: '224px',
						inset: '0px 0px auto auto',
						transform: 'translate(-20px, 60px)',
					}}>
					<ul
						role="menu"
						className="dropdown-content bg-primary text-white"
						aria-orientation="vertical"
						aria-labelledby="user-menu">
						<li>
							<div className="dropdown-header !font-normal">
								<div className="font-medium">
									{profileName}
								</div>
								<div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
									{email}
								</div>
							</div>
						</li>
						<li>
							<hr className="dropdown-divider border-white/[0.08]" />
						</li>
						<li>
							<Link
								role="menuitem"
								onClick={closeDropdownUser}
								to="/app/settings/profile"
								className="dropdown-item cursor-pointer hover:bg-white/5">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide w-4 h-4 mr-2">
									<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
									<circle cx="12" cy="7" r="4"></circle>
								</svg>{' '}
								{t('app.navbar.profile')}
							</Link>
						</li>
						<li>
							<Link
								role="menuitem"
								onClick={closeDropdownUser}
								to="/app/settings/workspaces"
								className="dropdown-item cursor-pointer hover:bg-white/5">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide w-4 h-4 mr-2">
									<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
									<path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
								</svg>{' '}
								{t('app.navbar.workspaces')}
							</Link>
						</li>
						<li>
							<Link
								role="menuitem"
								onClick={closeDropdownUser}
								to="/app/settings/subscription"
								className="dropdown-item cursor-pointer hover:bg-white/5">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
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
								{t('app.navbar.subscription')}
							</Link>
						</li>
						<li>
							<Link
								role="menuitem"
								onClick={closeDropdownUser}
								to="/app/settings/tenant"
								className="dropdown-item cursor-pointer hover:bg-white/5">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide w-4 h-4 mr-2">
									<circle cx="12" cy="12" r="10"></circle>
									<path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"></path>
									<line
										x1="12"
										y1="17"
										x2="12.01"
										y2="17"></line>
								</svg>{' '}
								{t('app.navbar.tenant')}
							</Link>
						</li>
						<li>
							<hr className="dropdown-divider border-white/[0.08]" />
						</li>
						<li>
							<button
								onClick={signOut}
								className="dropdown-item cursor-pointer hover:bg-white/5">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide w-4 h-4 mr-2">
									<rect
										x="1"
										y="5"
										width="22"
										height="14"
										rx="7"
										ry="7"></rect>
									<circle cx="16" cy="12" r="3"></circle>
								</svg>{' '}
								{t('app.navbar.signOut')}
							</button>
						</li>
					</ul>
				</div>
			</Transition>
		</div>
	);
}
