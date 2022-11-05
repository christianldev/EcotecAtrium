import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {UserDto} from '@/application/dtos/core/users/UserDto';
import ClientsUsage from '@/components/app/usages/ClientsUsage';
import EmployeesUsage from '@/components/app/usages/EmployeesUsage';
import ProvidersUsage from '@/components/app/usages/ProvidersUsage';
import MySubscriptionProducts from '@/components/core/settings/subscription/MySubscriptionProducts';
import {RootState} from '@/store';
import UserUtils from '@/utils/store/UserUtils';
import {useSelector} from 'react-redux';
import {Helmet, HelmetProvider} from 'react-helmet-async';

export default function Dashboard() {
	const {t} = useTranslation();

	return (
		<main className="flex-1 relative pb-2 z-0">
			<HelmetProvider>
				<Helmet>
					<title>
						{t('app.sidebar.dashboard')} | PRODUCT_NAME
					</title>
				</Helmet>
			</HelmetProvider>
			{/*Page header */}

			<div className=" sm:px-4 max-w-5xl mx-auto py-2 grid gap-5">
				<div className="mt-2 grid sm:grid-cols-1 gap-5">
					<div className="space-y-5">
						<MySubscriptionProducts
							withCurrentPlan={true}
							cols="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4"
						/>
						<div className="report-box-4 w-full h-full grid grid-cols-12 gap-6 xl:absolute -mt-8 xl:mt-0 pb-6 xl:pb-0 top-0 right-0 z-30 xl:z-auto">
							<div className="col-span-12 xl:col-span-3 xl:col-start-10 xl:pb-16 z-30">
								<div className="h-full flex flex-col">
									<div className="box p-5 mt-6 bg-primary intro-x">
										<div className="flex flex-wrap gap-3">
											<div className="mr-auto">
												<div className="text-white text-opacity-70 dark:text-slate-300 flex items-center leading-3">
													{' '}
													AVAILABLE FUNDS{' '}
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
															className="lucide w-4 h-4 ml-1.5">
															<circle
																cx="12"
																cy="12"
																r="10"></circle>
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
												<div className="text-white relative text-2xl font-medium leading-5 pl-4 mt-3.5">
													<span className="absolute text-xl top-0 left-0 -mt-1.5">
														$
													</span>{' '}
													479,578.77{' '}
												</div>
											</div>
											<a
												className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-darkmode-300 bg-opacity-20 hover:bg-opacity-30 text-white"
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
													className="lucide w-6 h-6">
													<line
														x1="12"
														y1="5"
														x2="12"
														y2="19"></line>
													<line
														x1="5"
														y1="12"
														x2="19"
														y2="12"></line>
												</svg>
											</a>
										</div>
									</div>
									<div className="report-box-4__content xl:min-h-0 intro-x">
										<div className="max-h-full xl:overflow-y-auto box mt-5">
											<div className="xl:sticky top-0 px-5 pt-5 pb-6">
												<div className="flex items-center">
													<div className="text-lg font-medium truncate mr-5">
														{' '}
														Summary Report{' '}
													</div>
													<a
														href=""
														className="ml-auto flex items-center text-primary">
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
															className="lucide w-4 h-4 mr-3">
															<path d="M3 2v6h6"></path>
															<path d="M21 12A9 9 0 006 5.3L3 8"></path>
															<path d="M21 22v-6h-6"></path>
															<path d="M3 12a9 9 0 0015 6.7l3-2.7"></path>
														</svg>{' '}
														Refresh{' '}
													</a>
												</div>
												<ul
													className="nav nav-pills border border-slate-300 dark:border-darkmode-300 border-dashed rounded-md mx-auto p-1 mt-5"
													role="tablist">
													<li
														className="nav-item flex-1"
														role="presentation">
														<button
															className="nav-link w-full py-1.5 px-2 active"
															type="button"
															role="tab"
															data-tw-target="#_gk8jjatan"
															aria-controls="_gk8jjatan"
															aria-selected="true">
															Weekly
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
															data-tw-target="#_a0jb471p9"
															aria-controls="_a0jb471p9">
															Monthly
														</button>
													</li>
												</ul>
											</div>
											<div className="tab-content w-full px-5 pb-5">
												<div
													className="tab-pane grid grid-cols-12 gap-y-6 active"
													role="tabpanel"
													id="_gk8jjatan"
													aria-labelledby="_gk8jjatan-tab">
													<div className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12">
														<div className="text-slate-500">
															Unpaid Loan
														</div>
														<div className="mt-1.5 flex items-center">
															<div className="text-lg">
																$155.430.000
															</div>
															<div className="text-danger flex text-xs font-medium cursor-pointer ml-2">
																{' '}
																2%{' '}
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
																	<polyline points="6 9 12 15 18 9"></polyline>
																</svg>
															</div>
														</div>
													</div>
													<div className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12">
														<div className="text-slate-500">
															Active Funding Partner
														</div>
														<div className="mt-1.5 flex items-center">
															<div className="text-lg">
																52 Partner
															</div>
															<div className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2">
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
													<div className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12">
														<div className="text-slate-500">
															Paid Installment
														</div>
														<div className="mt-1.5 flex items-center">
															<div className="text-lg">
																$75.430.000
															</div>
															<div className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2">
																{' '}
																36%{' '}
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
													<div className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12">
														<div className="text-slate-500">
															Success Payment
														</div>
														<div className="mt-1.5 flex items-center">
															<div className="text-lg">
																100%
															</div>
														</div>
													</div>
													<div className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12">
														<div className="text-slate-500">
															Waiting For Disbursement
														</div>
														<div className="mt-1.5 flex items-center">
															<div className="text-lg">
																0
															</div>
														</div>
													</div>
													<div className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12">
														<div className="text-slate-500">
															Unpaid Loan
														</div>
														<div className="mt-1.5 flex items-center">
															<div className="text-lg">
																$21.430.000
															</div>
															<div className="text-danger flex text-xs font-medium cursor-pointer ml-2">
																{' '}
																23%{' '}
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
																	<polyline points="6 9 12 15 18 9"></polyline>
																</svg>
															</div>
														</div>
													</div>
													<button className="btn btn-outline-secondary col-span-12 border-slate-300 dark:border-darkmode-300 border-dashed relative justify-start mb-2">
														<span className="truncate mr-5">
															My Portfolio Details
														</span>
														<span className="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-0.5">
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
																	x1="5"
																	y1="12"
																	x2="19"
																	y2="12"></line>
																<polyline points="12 5 19 12 12 19"></polyline>
															</svg>
														</span>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <div className="flex items-center space-x-2 justify-between">
							<h3 className="leading-5 text-gray-900">
								{t('app.dashboard.summary')}
							</h3>
						</div> */}

						{/* <dl className="mt-2 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-4">
							<ProvidersUsage />
							<ClientsUsage />
							<EmployeesUsage />
						</dl> */}
					</div>
				</div>
			</div>
		</main>
	);
}
