import {Link} from 'react-router-dom';
import {Transition} from '@headlessui/react';
import {Fragment, ReactNode, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
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

export default function SidebarLayout({
	layout,
	onAddTenant,
	children,
}: Props) {
	const mainElement = useRef<HTMLElement>(null);

	const [sidebarOpen, setSidebarOpen] = useState(false);

	const currentWorkspaceId = useSelector(
		(state: RootState): string => {
			return state.tenant.currentWorkspace?.id ?? '';
		}
	);

	return (
		<div className="flex mt-[4.7rem] md:mt-0">
			{/* Dark mode toggle */}
			<DarkModeToggle />

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
							leaveTo="opacity-0">
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
							leaveTo="-translate-x-full">
							<div className="relative flex-1 flex flex-col max-w-xs w-full pb-4 bg-gray-900">
								<div className="absolute top-0 right-0 -mr-14 p-1 mt-2">
									<button
										className="flex items-center justify-center h-12 w-12 rounded-sm focus:outline-none focus:bg-gray-600"
										aria-label="Close sidebar"
										onClick={() =>
											setSidebarOpen(!sidebarOpen)
										}>
										<svg
											className="text-white h-7 w-7"
											stroke="currentColor"
											fill="none"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
								<div className="mt-5 flex-1 h-0 overflow-y-auto">
									<nav className="px-2 space-y-2">
										<TenantSelector
											className="text-sm"
											onAdd={onAddTenant}
										/>
										{layout === 'app' && (
											<WorkspaceSelector className="text-sm" />
										)}
										<SidebarMenu
											layout={layout}
											onSelected={() =>
												setSidebarOpen(!sidebarOpen)
											}
										/>
									</nav>
								</div>
							</div>
						</Transition>
						<div className="flex-shrink-0 w-14">
							{/*Dummy element to force sidebar to shrink to fit close icon */}
						</div>
					</div>
				)}
			</div>

			{/*Desktop sidebar */}
			<div
				className={
					sidebarOpen
						? 'hidden transition ease-in duration-1000'
						: 'overflow-x-hidden hidden md:flex md:flex-shrink-0  shadow-md dark:shadow-lg'
				}>
				<nav className="side-nav dark:bg-darkmode-800">
					<Logo
						layout="dashboard"
						className="router-link-active intro-x flex items-center pl-2 pt-4 mx-auto h-8 w-auto"
					/>
					{/* <span className="hidden xl:block text-white text-lg ml-3">
							{' '}
							Rubick{' '}
						</span> */}

					<div className="side-nav__devider my-6"></div>
					<ul>
						<li>
							<a
								href="javascript:;"
								className="side-menu side-menu--active side-menu--open">
								<div className="side-menu__icon">
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
										className="lucide">
										<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
										<polyline points="9 22 9 12 15 12 15 22"></polyline>
									</svg>
								</div>
								<div className="side-menu__title">
									Dashboard{' '}
									<div className="side-menu__sub-icon transform rotate-180">
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
											className="lucide">
											<polyline points="6 9 12 15 18 9"></polyline>
										</svg>
									</div>
								</div>
							</a>
							<ul>
								<li>
									<a href="/" className="side-menu">
										<div className="side-menu__icon">
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
												className="lucide">
												<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
											</svg>
										</div>
										<div className="side-menu__title">
											Overview 1{' '}
										</div>
									</a>
								</li>
								<li>
									<a
										href="/dashboard-overview-2"
										className="side-menu">
										<div className="side-menu__icon">
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
												className="lucide">
												<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
											</svg>
										</div>
										<div className="side-menu__title">
											Overview 2{' '}
										</div>
									</a>
								</li>
								<li>
									<a
										href="/dashboard-overview-3"
										className="side-menu side-menu--active">
										<div className="side-menu__icon">
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
												className="lucide">
												<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
											</svg>
										</div>
										<div className="side-menu__title">
											Overview 3
										</div>
									</a>
								</li>
								<li>
									<a
										href="/dashboard-overview-4"
										className="side-menu">
										<div className="side-menu__icon">
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
												className="lucide">
												<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
											</svg>
										</div>
										<div className="side-menu__title">
											Overview 4
										</div>
									</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="javascript:;" className="side-menu">
								<div className="side-menu__icon">
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
										className="lucide">
										<path
											d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 
														4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
										<polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
										<line
											x1="12"
											y1="22.08"
											x2="12"
											y2="12"></line>
									</svg>
								</div>
								<div className="side-menu__title">
									Menu Layout{' '}
									<div className="side-menu__sub-icon">
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
											className="lucide">
											<polyline points="6 9 12 15 18 9"></polyline>
										</svg>
									</div>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:;" className="side-menu">
								<div className="side-menu__icon">
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
										className="lucide">
										<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
										<line
											x1="3"
											y1="6"
											x2="21"
											y2="6"></line>
										<path d="M16 10a4 4 0 01-8 0"></path>
									</svg>
								</div>
								<div className="side-menu__title">
									E-Commerce{' '}
									<div className="side-menu__sub-icon">
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
											className="lucide">
											<polyline points="6 9 12 15 18 9"></polyline>
										</svg>
									</div>
								</div>
							</a>
						</li>
						<li>
							<a href="/inbox" className="side-menu">
								<div className="side-menu__icon">
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
										className="lucide">
										<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
										<path
											d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 
																	0016.76 4H7.24a2 2 0 00-1.79 1.11z"></path>
									</svg>
								</div>
								<div className="side-menu__title">
									Inbox
								</div>
							</a>
						</li>
						<li>
							<a href="/file-manager" className="side-menu">
								<div className="side-menu__icon">
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
										className="lucide">
										<line
											x1="22"
											y1="12"
											x2="2"
											y2="12"></line>
										<path
											d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2
														 0 00-1.79 1.11z"></path>
										<line
											x1="6"
											y1="16"
											x2="6.01"
											y2="16"></line>
										<line
											x1="10"
											y1="16"
											x2="10.01"
											y2="16"></line>
									</svg>
								</div>
								<div className="side-menu__title">
									File Manager
								</div>
							</a>
						</li>
						<li>
							<a
								href="/point-of-sale"
								className="side-menu">
								<div className="side-menu__icon">
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
										className="lucide">
										<rect
											x="1"
											y="4"
											width="22"
											height="16"
											rx="2"
											ry="2"></rect>
										<line
											x1="1"
											y1="10"
											x2="23"
											y2="10"></line>
									</svg>
								</div>
								<div className="side-menu__title">
									Point of Sale
								</div>
							</a>
						</li>
						<li>
							<a href="/chat" className="side-menu">
								<div className="side-menu__icon">
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
										className="lucide">
										<path
											d="M21 
																	 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
									</svg>
								</div>
								<div className="side-menu__title">Chat</div>
							</a>
						</li>
						<li>
							<a href="/post" className="side-menu">
								<div className="side-menu__icon">
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
										className="lucide">
										<path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"></path>
										<polyline points="14 2 14 8 20 8"></polyline>
										<line
											x1="16"
											y1="13"
											x2="8"
											y2="13"></line>
										<line
											x1="16"
											y1="17"
											x2="8"
											y2="17"></line>
										<line
											x1="10"
											y1="9"
											x2="8"
											y2="9"></line>
									</svg>
								</div>
								<div className="side-menu__title">Post</div>
							</a>
						</li>
						<li>
							<a href="/calendar" className="side-menu">
								<div className="side-menu__icon">
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
										className="lucide">
										<rect
											x="3"
											y="4"
											width="18"
											height="18"
											rx="2"
											ry="2"></rect>
										<line
											x1="16"
											y1="2"
											x2="16"
											y2="6"></line>
										<line
											x1="8"
											y1="2"
											x2="8"
											y2="6"></line>
										<line
											x1="3"
											y1="10"
											x2="21"
											y2="10"></line>
									</svg>
								</div>
								<div className="side-menu__title">
									Calendar
								</div>
							</a>
						</li>
						<li className="side-nav__devider my-6"></li>
						<li>
							<a href="javascript:;" className="side-menu">
								<div className="side-menu__icon">
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
										className="lucide">
										<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
										<path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
									</svg>
								</div>
								<div className="side-menu__title">
									Crud{' '}
									<div className="side-menu__sub-icon">
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
											className="lucide">
											<polyline points="6 9 12 15 18 9"></polyline>
										</svg>
									</div>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:;" className="side-menu">
								<div className="side-menu__icon">
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
										className="lucide">
										<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
										<circle cx="9" cy="7" r="4"></circle>
										<path d="M23 21v-2a4 4 0 00-3-3.87"></path>
										<path d="M16 3.13a4 4 0 010 7.75"></path>
									</svg>
								</div>
								<div className="side-menu__title">
									Users
									<div className="side-menu__sub-icon">
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
											className="lucide">
											<polyline points="6 9 12 15 18 9"></polyline>
										</svg>
									</div>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:;" className="side-menu">
								<div className="side-menu__icon">
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
										className="lucide">
										<rect
											x="3"
											y="3"
											width="18"
											height="18"
											rx="2"
											ry="2"></rect>
										<rect
											x="7"
											y="7"
											width="3"
											height="9"></rect>
										<rect
											x="14"
											y="7"
											width="3"
											height="5"></rect>
									</svg>
								</div>
								<div className="side-menu__title">
									Profile{' '}
									<div className="side-menu__sub-icon">
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
											className="lucide">
											<polyline points="6 9 12 15 18 9"></polyline>
										</svg>
									</div>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:;" className="side-menu">
								<div className="side-menu__icon">
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
										className="lucide">
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
									</svg>
								</div>
								<div className="side-menu__title">
									Pages
									<div className="side-menu__sub-icon">
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
											className="lucide">
											<polyline points="6 9 12 15 18 9"></polyline>
										</svg>
									</div>
								</div>
							</a>
						</li>
						<li className="side-nav__devider my-6"></li>
						<li>
							<a href="javascript:;" className="side-menu">
								<div className="side-menu__icon">
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
										className="lucide">
										<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
										<path
											d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0
														 0016.76 4H7.24a2 2 0 00-1.79 1.11z"></path>
									</svg>
								</div>
								<div className="side-menu__title">
									Components{' '}
									<div className="side-menu__sub-icon">
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
											className="lucide">
											<polyline points="6 9 12 15 18 9"></polyline>
										</svg>
									</div>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:;" className="side-menu">
								<div className="side-menu__icon">
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
										className="lucide">
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
									</svg>
								</div>
								<div className="side-menu__title">
									Forms
									<div className="side-menu__sub-icon">
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
											className="lucide">
											<polyline points="6 9 12 15 18 9"></polyline>
										</svg>
									</div>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:;" className="side-menu">
								<div className="side-menu__icon">
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
										className="lucide">
										<line
											x1="22"
											y1="12"
											x2="2"
											y2="12"></line>
										<path
											d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 
														2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"></path>
										<line
											x1="6"
											y1="16"
											x2="6.01"
											y2="16"></line>
										<line
											x1="10"
											y1="16"
											x2="10.01"
											y2="16"></line>
									</svg>
								</div>
								<div className="side-menu__title">
									Widgets{' '}
									<div className="side-menu__sub-icon">
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
											className="lucide">
											<polyline points="6 9 12 15 18 9"></polyline>
										</svg>
									</div>
								</div>
							</a>
						</li>
					</ul>
				</nav>
			</div>

			{/*Content */}
			<div className="content">
				<div className="top-bar">
					<button
						className="px-4  text-gray-600 dark:text-gray-400"
						aria-label="Open sidebar"
						onClick={() => setSidebarOpen(!sidebarOpen)}>
						<svg
							className="h-5 w-5"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h7"
							/>
						</svg>
					</button>
					<nav
						aria-label="breadcrumb"
						className="-intro-x mr-auto hidden sm:flex">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="#">Application</a>
							</li>
							<li
								className="breadcrumb-item active"
								aria-current="page">
								Dashboard
							</li>
						</ol>
					</nav>
					<div className="intro-x relative mr-3 sm:mr-6">
						<div className="search hidden sm:block">
							<input
								type="text"
								className="search__input form-control border-transparent"
								placeholder="Search..."
							/>
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
								className="lucide search__icon dark:text-slate-500">
								<circle cx="11" cy="11" r="8"></circle>
								<line
									x1="21"
									y1="21"
									x2="16.65"
									y2="16.65"></line>
							</svg>
						</div>
						<a className="notification sm:hidden" href="">
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
								className="lucide notification__icon dark:text-slate-500">
								<circle cx="11" cy="11" r="8"></circle>
								<line
									x1="21"
									y1="21"
									x2="16.65"
									y2="16.65"></line>
							</svg>
						</a>
					</div>
					<div
						className="dropdown intro-x mr-auto sm:mr-6"
						data-tw-placement="bottom-end">
						<div
							className="dropdown-toggle notification notification--bullet cursor-pointer"
							aria-expanded="false"
							data-tw-toggle="dropdown"
							role="button">
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
								className="lucide notification__icon dark:text-slate-500">
								<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
								<path d="M13.73 21a2 2 0 01-3.46 0"></path>
							</svg>
						</div>
						<div
							className="dropdown-menu notification-content pt-2"
							id="_adpp0i71s"
							data-popper-placement="bottom-end"
							style={{
								position: 'absolute',
								inset: '0px 0px auto auto',
								margin: '0px',
								transform: 'translate(0px, 20px)',
							}}>
							<div className="dropdown-content notification-content__box">
								<div className="notification-content__title">
									Notifications
								</div>
								<div className="cursor-pointer relative flex items-center">
									<div className="w-12 h-12 flex-none image-fit mr-1">
										<img
											alt="Midone Tailwind HTML Admin Template"
											className="rounded-full"
											src="/src/assets/images/profile-7.jpg"
										/>
										<div
											className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 
											border-white dark:border-darkmode-600"></div>
									</div>
									<div className="ml-2 overflow-hidden">
										<div className="flex items-center">
											<a
												href="#"
												className="font-medium truncate mr-5">
												Johnny Depp
											</a>
											<div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
												01:10 PM
											</div>
										</div>
										<div className="w-full truncate text-slate-500 mt-0.5">
											Lorem Ipsum is simply dummy text of
											the printing and typesetting industry.
											Lorem Ipsum has been the industry's
											standard dummy text ever since the
											1500
										</div>
									</div>
								</div>
								<div className="cursor-pointer relative flex items-center mt-5">
									<div className="w-12 h-12 flex-none image-fit mr-1">
										<img
											alt="Midone Tailwind HTML Admin Template"
											className="rounded-full"
											src="/src/assets/images/profile-7.jpg"
										/>
										<div
											className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white 
							dark:border-darkmode-600"></div>
									</div>
									<div className="ml-2 overflow-hidden">
										<div className="flex items-center">
											<a
												href="javascript:;"
												className="font-medium truncate mr-5">
												Kevin Spacey
											</a>
											<div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
												07:00 PM
											</div>
										</div>
										<div className="w-full truncate text-slate-500 mt-0.5">
											Lorem Ipsum is simply dummy text of
											the printing and typesetting industry.
											Lorem Ipsum has been the industry's
											standard dummy text ever since the
											1500
										</div>
									</div>
								</div>
								<div className="cursor-pointer relative flex items-center mt-5">
									<div className="w-12 h-12 flex-none image-fit mr-1">
										<img
											alt="Midone Tailwind HTML Admin Template"
											className="rounded-full"
											src="/src/assets/images/profile-2.jpg"
										/>
										<div
											className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 
								border-white dark:border-darkmode-600"></div>
									</div>
									<div className="ml-2 overflow-hidden">
										<div className="flex items-center">
											<a
												href="javascript:;"
												className="font-medium truncate mr-5">
												Arnold Schwarzenegger
											</a>
											<div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
												04:50 AM
											</div>
										</div>
										<div className="w-full truncate text-slate-500 mt-0.5">
											There are many variations of passages
											of Lorem Ipsum available, but the
											majority have suffered alteration in
											some form, by injected humour, or
											randomi
										</div>
									</div>
								</div>
								<div className="cursor-pointer relative flex items-center mt-5">
									<div className="w-12 h-12 flex-none image-fit mr-1">
										<img
											alt="Midone Tailwind HTML Admin Template"
											className="rounded-full"
											src="/src/assets/images/profile-15.jpg"
										/>
										<div
											className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2
								 border-white dark:border-darkmode-600"></div>
									</div>
									<div className="ml-2 overflow-hidden">
										<div className="flex items-center">
											<a
												href="javascript:;"
												className="font-medium truncate mr-5">
												Vin Diesel
											</a>
											<div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
												04:50 AM
											</div>
										</div>
										<div className="w-full truncate text-slate-500 mt-0.5">
											Lorem Ipsum is simply dummy text of
											the printing and typesetting industry.
											Lorem Ipsum has been the industry's
											standard dummy text ever since the
											1500
										</div>
									</div>
								</div>
								<div className="cursor-pointer relative flex items-center mt-5">
									<div className="w-12 h-12 flex-none image-fit mr-1">
										<img
											alt="Midone Tailwind HTML Admin Template"
											className="rounded-full"
											src="/src/assets/images/profile-8.jpg"
										/>
										<div
											className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 
								border-white dark:border-darkmode-600"></div>
									</div>
									<div className="ml-2 overflow-hidden">
										<div className="flex items-center">
											<a
												href="javascript:;"
												className="font-medium truncate mr-5">
												Kevin Spacey
											</a>
											<div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
												07:00 PM
											</div>
										</div>
										<div className="w-full truncate text-slate-500 mt-0.5">
											There are many variations of passages
											of Lorem Ipsum available, but the
											majority have suffered alteration in
											some form, by injected humour, or
											randomi
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<ProfileButton />
				</div>
				{/* 		
              {layout === 'admin' && <LayoutSelector className="text-sm" />}
              {layout === 'admin' && <LocaleSelector className="text-sm" />}
              {layout === 'app' && <PendingInvitationsButton />}
              {layout === 'app' && <ChatSupportButton />}
              {layout === 'app' && <QuickActionsButton />}
              <NotificationButton />
              <ProfileButton />
         */}

				<main ref={mainElement} tabIndex={0}>
					<div
						key={currentWorkspaceId}
						className="relative">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
}
