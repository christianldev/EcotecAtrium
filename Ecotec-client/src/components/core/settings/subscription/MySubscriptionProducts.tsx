import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {SubscriptionGetCurrentResponse} from '@/application/contracts/core/subscriptions/SubscriptionGetCurrentResponse';
import {AppUsageSummaryDto} from '@/application/dtos/app/usage/AppUsageSummaryDto';
import {TenantProductDto} from '@/application/dtos/core/tenants/TenantProductDto';
import {TenantUserDto} from '@/application/dtos/core/tenants/TenantUserDto';
import {WorkspaceDto} from '@/application/dtos/core/workspaces/WorkspaceDto';
import tinyEventBus from '@/plugins/tinyEventBus';
import services from '@/services';
import {RootState} from '@/store';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import classNames from '@/utils/shared/ClassesUtils';
import BarChart from '@/components/front/charts/BarChart';
import CircleChart from '@/components/front/charts/CircleChart';

interface Props {
	className?: string;
	withCurrentPlan: boolean;
	cols?: string;
}

export default function MySubscriptionProducts({
	className = '',
	withCurrentPlan = false,
	cols = 'grid-cols-2 sm:grid-cols-2 xl:grid-cols-4',
}: Props) {
	const {t} = useTranslation();

	const [loading, setLoading] = useState(false);
	const [subscription, setSubscription] =
		useState<SubscriptionGetCurrentResponse | null>(null);
	const [workspaces, setWorkspaces] = useState<
		WorkspaceDto[]
	>([]);
	const [users, setUsers] = useState<TenantUserDto[]>([]);

	useEffect(() => {
		tinyEventBus().emitter.on('updated-plan', () => {
			reload();
		});
		reload();

		return () => {
			tinyEventBus().emitter.off('updated-plan');
		};
	}, []);

	function reload() {
		setLoading(true);

		const promises: any[] = [];

		const loadDashboard = services.subscriptionManager
			.getCurrentSubscription()
			.then((response) => {
				setSubscription(response);
			});
		const loadWorkspaces = services.workspaces
			.getAllWorkspaces(false)
			.then((response) => {
				setWorkspaces(response);
			});
		const loadUsers = services.tenantUsers
			.getAll()
			.then((response) => {
				setUsers(response);
			});
		promises.push(loadDashboard);
		promises.push(loadWorkspaces);
		// promises.push(loadFeatures);
		promises.push(loadUsers);

		setLoading(true);
		Promise.all(promises).finally(() => {
			setLoading(false);
		});
	}
	function billableStatus(max: number): number {
		if (loading) {
			return 2;
		}
		if (!currentProduct) {
			return 0;
		}
		if (max === 0) {
			return 1;
		}
		if (max > 0) {
			return 2;
		}
		return 0;
	}
	const links = useSelector((state: RootState): number => {
		return (
			state.app.usage.providers + state.app.usage.clients
		);
	});
	const currentProduct = useSelector(
		(): TenantProductDto | undefined => {
			if (
				subscription?.myProducts &&
				subscription?.myProducts.length > 0
			) {
				return subscription?.myProducts[0];
			}
			return undefined;
		}
	);
	const usage = useSelector(
		(state: RootState): AppUsageSummaryDto => {
			return state.app.usage;
		}
	);
	const maxLinksRemaining = useSelector(() => {
		if (!currentProduct || !usage) {
			return 1;
		}
		const links = usage.providers + usage.clients;
		const remaining = currentProduct.maxLinks - links;
		return remaining;
	});
	const maxDocumentsRemaining = useSelector(() => {
		if (!currentProduct || !usage) {
			return 1;
		}
		return (
			currentProduct.monthlyContracts - usage.contracts
		);
	});
	const maxWorkspacesRemaining = useSelector(() => {
		if (!currentProduct || !usage) {
			return 1;
		}
		return currentProduct.maxWorkspaces - workspaces.length;
	});
	const maxUsersRemaining = useSelector(() => {
		if (!currentProduct || !usage) {
			return 1;
		}
		return currentProduct.maxUsers - users.length;
	});

	return (
		<div className={className}>
			{/* <div>
				{withCurrentPlan && (
					<div className="space-y-2 sm:space-y-0 sm:flex items-center sm:space-x-2 justify-between">
						<h3 className="leading-5 text-gray-900 truncate">
							{(() => {
								if (loading) {
									return (
										<span className="leading-5">
											{t('shared.loading')}...
										</span>
									);
								} else if (currentProduct) {
									return (
										<span>
											{t('settings.subscription.current')}{' '}
											<Link
												to="/app/settings/subscription"
												className="leading-5 font-bold hover:underline hover:text-theme-600">
												{t(
													currentProduct.subscriptionProduct
														.title
												)}
											</Link>
										</span>
									);
								} else if (!loading) {
									return (
										<span className="ml-1 text-sm leading-5 font-bold text-gray-500">
											(
											{t(
												'settings.subscription.noActivePlan'
											)}
											)
										</span>
									);
								} else {
									return <div></div>;
								}
							})()}
						</h3>
					</div>
				)}

				<dl
					className={classNames(
						'grid gap-5',
						cols,
						withCurrentPlan && 'mt-2 '
					)}>
					<div
						className={classNames(
							'bg-white px-4 py-5 border border-gray-300 shadow-md rounded-lg overflow-hidden sm:p-6',
							billableStatus(maxLinksRemaining) === 0 &&
								'bg-rose-50 border-rose-300 hover:bg-rose-100 cursor-pointer',
							billableStatus(maxLinksRemaining) === 1 &&
								'bg-yellow-50 border-yellow-300 hover:bg-yellow-100 cursor-pointer',
							billableStatus(maxLinksRemaining) === 2 &&
								'bg-white',
							billableStatus(maxLinksRemaining) === 3 &&
								'bg-teal-50 border-teal-300 hover:bg-teal-100 cursor-pointer'
						)}>
						<dt className="text-sm font-medium text-gray-500 truncate">
							{t('models.link.plural')}
						</dt>
						<dd className="mt-1 text-xl font-semibold text-gray-900">
							{(() => {
								if (loading) {
									return <span>...</span>;
								} else {
									return (
										<span>
											{links ? (
												<span>{links}</span>
											) : (
												<span>0</span>
											)}{' '}
											/{' '}
											{currentProduct ? (
												<span>
													{currentProduct.maxLinks}
												</span>
											) : (
												<span className="text-gray-500">
													0
												</span>
											)}
										</span>
									);
								}
							})()}
						</dd>
					</div>

					<Link
						to="/app/contracts/pending"
						className={classNames(
							'bg-white px-4 py-5 border border-gray-300 shadow-md rounded-lg overflow-hidden sm:p-6 hover:bg-gray-50',
							billableStatus(maxDocumentsRemaining) === 0 &&
								'bg-rose-50 border-rose-300 hover:bg-rose-100 cursor-pointer',
							billableStatus(maxDocumentsRemaining) === 1 &&
								'bg-yellow-50 border-yellow-300 hover:bg-yellow-100 cursor-pointer',
							billableStatus(maxDocumentsRemaining) === 2 &&
								'bg-white',
							billableStatus(maxDocumentsRemaining) === 3 &&
								'bg-teal-50 border-teal-300 hover:bg-teal-100 cursor-pointer'
						)}>
						<dt className="text-sm font-medium text-gray-500 truncate">
							{t('models.contract.plural')}
						</dt>
						<dd className="mt-1 text-xl font-semibold text-gray-900">
							{(() => {
								if (loading) {
									return <span>...</span>;
								} else {
									return (
										<span>
											{usage && usage.contracts ? (
												<span>{usage.contracts}</span>
											) : (
												<span>0</span>
											)}{' '}
											/{' '}
											{currentProduct ? (
												<span>
													{currentProduct.monthlyContracts}
												</span>
											) : (
												<span className="text-gray-500">
													0
												</span>
											)}
										</span>
									);
								}
							})()}
						</dd>
					</Link>

					<Link
						to="/app/settings/workspaces"
						className={classNames(
							'bg-white px-4 py-5 border border-gray-300 shadow-md rounded-lg overflow-hidden sm:p-6 hover:bg-gray-50',
							billableStatus(maxWorkspacesRemaining) ===
								0 &&
								'bg-rose-50 border-rose-300 hover:bg-rose-100 cursor-pointer',
							billableStatus(maxWorkspacesRemaining) ===
								1 &&
								'bg-yellow-50 border-yellow-300 hover:bg-yellow-100 cursor-pointer',
							billableStatus(maxWorkspacesRemaining) ===
								2 && 'bg-white',
							billableStatus(maxWorkspacesRemaining) ===
								3 &&
								'bg-teal-50 border-teal-300 hover:bg-teal-100 cursor-pointer'
						)}>
						<dt className="text-sm font-medium text-gray-500 truncate">
							{t('models.workspace.plural')}
						</dt>
						<dd className="mt-1 text-xl font-semibold text-gray-900">
							{(() => {
								if (loading) {
									return <span>...</span>;
								} else {
									return (
										<span>
											{usage ? (
												<span>{workspaces.length}</span>
											) : (
												<span>0</span>
											)}{' '}
											/{' '}
											{currentProduct ? (
												<span>
													{currentProduct.maxWorkspaces}
												</span>
											) : (
												<span className="text-gray-500">
													0
												</span>
											)}
										</span>
									);
								}
							})()}
						</dd>
					</Link>
					<Link
						to="/app/settings/members"
						className={classNames(
							'bg-white px-4 py-5 border border-gray-300 shadow-md rounded-lg overflow-hidden sm:p-6 hover:bg-gray-50',
							billableStatus(maxUsersRemaining) === 0 &&
								'bg-rose-50 border-rose-300 hover:bg-rose-100 cursor-pointer',
							billableStatus(maxUsersRemaining) === 1 &&
								'bg-yellow-50 border-yellow-300 hover:bg-yellow-100 cursor-pointer',
							billableStatus(maxUsersRemaining) === 2 &&
								'bg-white',
							billableStatus(maxUsersRemaining) === 3 &&
								'bg-teal-50 border-teal-300 hover:bg-teal-100 cursor-pointer'
						)}>
						<dt className="text-sm font-medium text-gray-500 truncate">
							{t('models.user.plural')}
						</dt>
						<dd className="mt-1 text-xl font-semibold text-gray-900">
							{(() => {
								if (loading) {
									return <span>...</span>;
								} else {
									return (
										<span>
											{usage ? (
												<span>{users.length}</span>
											) : (
												<span>0</span>
											)}{' '}
											/{' '}
											{currentProduct ? (
												<span>
													{currentProduct.maxUsers}
												</span>
											) : (
												<span className="text-gray-500">
													0
												</span>
											)}
										</span>
									);
								}
							})()}
						</dd>
					</Link>
				</dl>
			</div> */}

			<div className="grid grid-cols-12 gap-6">
				<div className="col-span-12 xl:col-span-9 2xl:col-span-9 z-10">
					<div className="mt-6 -mb-6 intro-y">
						<div
							className="alert box bg-primary text-white items-center mb-6 show flex"
							role="alert">
							<span>
								{' '}
								Introducing new dashboard! Download now at{' '}
								<a
									href="https://themeforest.net/item/midone-jquery-tailwindcss-html-admin-template/26366820"
									className="underline ml-1"
									target="blank">
									themeforest.net
								</a>
								.{' '}
								<button className="rounded-md bg-white bg-opacity-20 dark:bg-darkmode-300 hover:bg-opacity-30 py-0.5 px-2 -my-3 ml-2">
									{' '}
									Live Preview{' '}
								</button>
							</span>
							<button
								type="button"
								className="btn-close text-white"
								aria-label="Close">
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
							</button>
						</div>
					</div>
					<div className="mt-14 mb-3 grid grid-cols-12 sm:gap-10 intro-y">
						<div className="col-span-12 sm:col-span-6 md:col-span-4 py-6 sm:pl-5 md:pl-0 lg:pl-5 relative text-center sm:text-left">
							<div
								className="dropdown absolute pt-0.5 2xl:pt-0 mt-5 2xl:mt-6 top-0 right-0"
								data-tw-placement="bottom-end">
								<a
									className="dropdown-toggle block"
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
										<circle cx="12" cy="5" r="1"></circle>
										<circle cx="12" cy="19" r="1"></circle>
									</svg>
								</a>
								<div className="dropdown-menu w-40">
									<ul className="dropdown-content">
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
												</svg>{' '}
												Monthly Report{' '}
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
												</svg>{' '}
												Annual Report{' '}
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="text-sm 2xl:text-base font-medium -mb-1">
								{' '}
								Hi Angelina,{' '}
								<span className="text-slate-600 dark:text-slate-300 font-normal">
									welcome back!
								</span>
							</div>
							<div className="text-base 2xl:text-lg justify-center sm:justify-start flex items-center text-slate-600 dark:text-slate-300 leading-3 mt-14 2xl:mt-24">
								{' '}
								My Total Assets{' '}
								<div>
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
										className="lucide w-5 h-5 ml-1.5 mt-0.5">
										<circle cx="12" cy="12" r="10"></circle>
										<line
											x1="12"
											y1="8"
											x2="12"
											y2="12"></line>
										<line
											x1="12"
											y1="16"
											x2="12.01"
											y2="16"></line>
									</svg>
								</div>
							</div>
							<div className="2xl:flex mt-5 mb-3">
								<div className="flex items-center justify-center sm:justify-start">
									<div className="relative text-2xl 2xl:text-3xl font-medium leading-6 pl-3 2xl:pl-4">
										<span className="absolute text-xl 2xl:text-2xl top-0 left-0 -mt-1 2xl:mt-0">
											$
										</span>{' '}
										142,402,210{' '}
									</div>
									<a
										className="text-slate-500 ml-4 2xl:ml-16"
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
											className="lucide w-4 h-4">
											<path d="M3 2v6h6"></path>
											<path d="M21 12A9 9 0 006 5.3L3 8"></path>
											<path d="M21 22v-6h-6"></path>
											<path d="M3 12a9 9 0 0015 6.7l3-2.7"></path>
										</svg>
									</a>
								</div>
								<div className="mt-5 2xl:flex 2xl:justify-center 2xl:mt-0 2xl:-ml-20 2xl:w-14 2xl:flex-none 2xl:pl-2.5">
									<div className="font-medium inline-flex bg-primary text-white rounded-full px-2 py-1 text-xs 2xl:text-sm 2xl:p-0 2xl:text-success 2xl:bg-transparent 2xl:flex items-center cursor-pointer 2xl:justify-center">
										{' '}
										49%{' '}
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
											className="lucide w-4 h-4 ml-0.5">
											<polyline points="18 15 12 9 6 15"></polyline>
										</svg>
									</div>
								</div>
							</div>
							<div className="text-slate-500">
								Last updated 1 hour ago
							</div>
							<div className="2xl:text-base text-slate-600 dark:text-slate-300 mt-6 -mb-1">
								{' '}
								Total net margin{' '}
								<a
									href=""
									className="underline decoration-dotted underline-offset-4 text-primary dark:text-slate-400">
									$12,921,050
								</a>
							</div>
							<div
								className="dropdown mt-14 2xl:mt-24"
								data-tw-placement="bottom-end">
								<button
									className="dropdown-toggle btn btn-rounded-primary w-44 2xl:w-52 px-4 relative justify-start"
									aria-expanded="false"
									data-tw-toggle="dropdown">
									{' '}
									Download Reports{' '}
									<span className="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-1">
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
											<polyline points="6 9 12 15 18 9"></polyline>
										</svg>
									</span>
								</button>
								<div className="dropdown-menu w-44 2xl:w-52">
									<ul className="dropdown-content">
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
												</svg>{' '}
												Monthly Report{' '}
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
												</svg>{' '}
												Annual Report{' '}
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="row-start-2 md:row-start-auto col-span-12 md:col-span-4 py-6 border-black border-opacity-10 border-t md:border-t-0 md:border-l md:border-r border-dashed px-10 sm:px-28 md:px-5 -mx-5">
							<div className="flex flex-wrap items-center">
								<div className="flex items-center w-full sm:w-auto justify-center sm:justify-start mr-auto mb-5 2xl:mb-0">
									<div className="w-2 h-2 bg-primary rounded-full -mt-4"></div>
									<div className="ml-3.5">
										<div className="relative text-xl 2xl:text-2xl font-medium leading-6 2xl:leading-5 pl-3.5 2xl:pl-4">
											<span className="absolute text-base 2xl:text-xl top-0 left-0 2xl:-mt-1.5">
												$
											</span>{' '}
											47,578.77{' '}
										</div>
										<div className="text-slate-500 mt-2">
											Yearly budget
										</div>
									</div>
								</div>
								<select className="form-select bg-transparent border-black border-opacity-10 dark:border-darkmode-400 dark:bg-transparent mx-auto sm:mx-0 py-1.5 px-3 w-auto -mt-2">
									<option value="daily">Daily</option>
									<option value="weekly">Weekly</option>
									<option value="monthly">Monthly</option>
									<option value="yearly">Yearly</option>
									<option value="custom-date">
										Custom Date
									</option>
								</select>
							</div>
							<div className="mt-10 text-slate-600 dark:text-slate-300">
								{' '}
								You have spent about 35% of your annual
								budget.{' '}
							</div>
							<div className="mt-6 block box-border">
								<div style={{height: '290px'}}>
									{/* <canvas
										className=""
										width="221"
										height="290"
										style={{
											display: 'block',
											boxSizing: 'border-box',
											height: '290px',
											width: '221px',
										}}></canvas> */}
									<BarChart />
								</div>
							</div>
						</div>
						<div className="col-span-12 sm:col-span-6 md:col-span-4 py-6 border-black border-opacity-10 border-t sm:border-t-0 border-l md:border-l-0 border-dashed -ml-4 pl-4 md:ml-0 md:pl-0">
							<ul
								className="nav nav-pills w-3/4 2xl:w-4/6 bg-slate-200 dark:bg-black/10 rounded-md mx-auto p-1"
								role="tablist">
								<li
									className="nav-item flex-1"
									role="presentation">
									<button
										className="nav-link w-full py-1.5 px-2 active"
										type="button"
										role="tab"
										data-tw-target="#_nycc58trt"
										aria-controls="_nycc58trt"
										aria-selected="true">
										Active
									</button>
								</li>
								<li
									className="nav-item flex-1"
									role="presentation">
									<button
										className="nav-link w-full py-1.5 px-2"
										type="button"
										role="tab"
										aria-selected="false"
										data-tw-target="#_rjgwzkxj0"
										aria-controls="_rjgwzkxj0">
										Inactive
									</button>
								</li>
							</ul>
							<div className="tab-content w-full mt-6">
								<div
									className="tab-pane active"
									role="tabpanel"
									id="_nycc58trt"
									aria-labelledby="_nycc58trt-tab">
									<div className="relative mt-8">
										<div style={{height: '215px'}}>
											{/* <canvas
												className=""
												width="223"
												height="215"
												style={{
													display: 'block',
													boxSizing: 'border-box',
													height: '215px',
													width: '223px',
												}}></canvas> */}
											<CircleChart />
										</div>
										<div className="flex flex-col justify-center items-center absolute w-full h-full top-0 left-0">
											<div className="text-xl 2xl:text-2xl font-medium">
												2.501
											</div>
											<div className="text-slate-500 mt-0.5">
												Active Users
											</div>
										</div>
									</div>
									<div className="mx-auto w-10/12 2xl:w-2/3 mt-8">
										<div className="flex items-center">
											<div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
											<span className="truncate">
												17 - 30 Years old
											</span>
											<span className="font-medium xl:ml-auto">
												62%
											</span>
										</div>
										<div className="flex items-center mt-4">
											<div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
											<span className="truncate">
												31 - 50 Years old
											</span>
											<span className="font-medium xl:ml-auto">
												33%
											</span>
										</div>
										<div className="flex items-center mt-4">
											<div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
											<span className="truncate">
												&gt;= 50 Years old
											</span>
											<span className="font-medium xl:ml-auto">
												10%
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="report-box-3 px-5 pt-8 pb-14 col-span-12 z-10">
					<div className="grid grid-cols-12 gap-6 relative intro-y">
						<div className="col-span-12 sm:col-span-4 xl:col-span-3 px-0 lg:px-6 xl:px-0 2xl:px-6">
							<div className="flex items-center flex-wrap lg:flex-nowrap gap-3">
								<div className="sm:w-full lg:w-auto text-lg font-medium truncate mr-auto">
									{' '}
									Summary Report{' '}
								</div>
								<div className="py-1 px-2.5 rounded-full text-xs bg-slate-300/50 dark:bg-darkmode-400 text-slate-600 dark:text-slate-300 cursor-pointer truncate">
									{' '}
									180 Campaign{' '}
								</div>
							</div>
							<div className="px-10 sm:px-0">
								<div style={{height: '110px'}}>
									<canvas
										className="-ml-1 mt-8 -mb-7"
										width="238"
										height="106"
										style={{
											display: 'bloc',
											boxSizing: 'border-box',
											height: '106px',
											width: '238px',
										}}></canvas>
								</div>
							</div>
						</div>
						<div className="col-span-12 sm:col-span-4 xl:col-span-3 px-0 lg:px-6 xl:px-0 2xl:px-6">
							<div className="flex items-center flex-wrap lg:flex-nowrap gap-3">
								<div className="sm:w-full lg:w-auto text-lg font-medium truncate mr-auto">
									{' '}
									Social Media{' '}
								</div>
								<a
									href=""
									className="flex items-center text-primary">
									<div className="truncate 2xl:mr-auto">
										View Details
									</div>
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
										className="lucide w-4 h-4 ml-3">
										<line
											x1="5"
											y1="12"
											x2="19"
											y2="12"></line>
										<polyline points="12 5 19 12 12 19"></polyline>
									</svg>
								</a>
							</div>
							<div className="flex items-center justify-center mt-10">
								<div className="text-right">
									<div className="text-3xl font-medium">
										149
									</div>
									<div className="truncate mt-1 text-slate-500">
										Active Lenders
									</div>
								</div>
								<div className="w-px h-16 border border-r border-dashed border-slate-300 dark:border-darkmode-400 mx-4 xl:mx-6"></div>
								<div>
									<div className="text-3xl font-medium">
										135
									</div>
									<div className="truncate mt-1 text-slate-500">
										Total Lenders
									</div>
								</div>
							</div>
						</div>
						<div className="col-span-12 sm:col-span-4 xl:col-span-3 px-0 lg:px-6 xl:px-0 2xl:px-6">
							<div className="flex items-center flex-wrap lg:flex-nowrap gap-3">
								<div className="sm:w-full lg:w-auto text-lg font-medium truncate mr-auto">
									{' '}
									Posted Ads{' '}
								</div>
								<div className="py-1 px-2.5 rounded-full text-xs bg-slate-300/50 dark:bg-darkmode-400 text-slate-600 dark:text-slate-300 cursor-pointer truncate">
									{' '}
									320 Followers{' '}
								</div>
							</div>
							<div className="px-10 sm:px-0">
								<div style={{height: '110px'}}>
									<canvas
										className="-ml-1 mt-8 -mb-7"
										width="238"
										height="106"
										style={{
											display: 'bloc',
											boxSizing: 'border-box',
											height: '106px',
											width: '238px',
										}}></canvas>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
