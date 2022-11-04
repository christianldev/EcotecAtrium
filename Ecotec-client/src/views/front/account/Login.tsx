import {UserLoggedResponse} from '@/application/contracts/core/users/UserLoggedResponse';
import {UserLoginRequest} from '@/application/contracts/core/users/UserLoginRequest';
import Logo from '@/components/front/Logo';
import LoadingButton, {
	RefLoadingButton,
} from '@/components/ui/buttons/LoadingButton';
import ErrorModal, {
	RefErrorModal,
} from '@/components/ui/modals/ErrorModal';
import services from '@/services';
import UserUtils from '@/utils/store/UserUtils';
import {FormEvent, useRef} from 'react';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {Link, useNavigate} from 'react-router-dom';

export default function Login() {
	const {t} = useTranslation();
	const navigate = useNavigate();

	const errorModal = useRef<RefErrorModal>(null);
	const loadingButton = useRef<RefLoadingButton>(null);

	const user = {} as UserLoginRequest;

	function signIn(e: FormEvent) {
		e.preventDefault();
		loadingButton.current?.start();
		services.authentication
			.login(user)
			.then((response: UserLoggedResponse) => {
				UserUtils.logged(response, navigate);
			})
			.catch((error) => {
				errorModal.current?.show(
					t('shared.error'),
					t(error)
				);
			})
			.finally(() => {
				loadingButton.current?.stop();
			});
	}

	return (
		<div>
			<HelmetProvider>
				<Helmet>
					<title>
						{t('account.login.title')} | PRODUCT_NAME
					</title>
				</Helmet>
			</HelmetProvider>
			<main>
				<div className="py-8 md:py-12 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40">
					<div className="container mx-auto px-4 xl:max-w-6xl">
						<div className="flex flex-wrap -mx-4 flex-row">
							<div className="flex-shrink max-w-full px-4 w-full lg:w-1/2">
								<div className="max-w-full w-full px-2 sm:px-12 lg:pr-20 mb-12 lg:mb-0">
									<div className="relative">
										<div className="p-6 sm:py-8 sm:px-12 rounded-lg bg-white dark:bg-gray-800 shadow-xl">
											<form
												id="login-form"
												onSubmit={signIn}>
												<div className="text-center">
													<Logo className="mx-auto h-12 w-auto" />
												</div>
												<hr className="block w-12 h-0.5 mx-auto my-5 bg-gray-700 border-gray-700" />
												<div className="mb-6">
													<label
														htmlFor="email"
														className="inline-block mb-2">
														{t('account.shared.email')}
													</label>
													<input
														value={user.email}
														onChange={(e) => {
															user.email = e.target.value;
														}}
														id="email"
														name="email"
														className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
														aria-label="email"
														type="email"
														placeholder={t(
															'account.shared.email'
														)}
													/>
												</div>
												<div className="mb-6">
													<div className="flex flex-wrap flex-row">
														<div className="flex-shrink max-w-full w-1/2">
															<label
																htmlFor="inputpass"
																className="inline-block mb-2">
																Password
															</label>
														</div>
													</div>
													<input
														value={user.password}
														onChange={(e) => {
															user.password =
																e.target.value;
														}}
														id="password"
														name="password"
														className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
														aria-label="password"
														type="password"
														placeholder={t(
															'account.shared.password'
														)}
													/>
													<div className="flex-shrink max-w-full w-1/2 ltr:text-right rtl:text-left">
														<a
															className="hover:text-blue-700"
															href="forgot-password.html">
															Forgot password?
														</a>
													</div>
												</div>
												{/* <div className="mb-6">
                          <input
                            className="form-checkbox h-5 w-5 text-blue-500 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded focus:outline-none"
                            type="checkbox"
                            value={true}
                            id="remember"
                          />
                          <label className="ltr:ml-2 rtl:mr-2" htmlFor="remember">
                            Remember me
                          </label>
                        </div> */}
												<div className="grid">
													<LoadingButton
														type="submit"
														ref={loadingButton}
														className="py-2 px-4 w-full rounded-lg inline-flex text-center leading-normal text-gray-100 bg-blue-600 border border-bllue-500 hover:text-white hover:bg-blue-600 hover:ring-0 hover:border-blue-600 focus:bg-blue-600 focus:border-blue-600 focus:outline-none focus:ring-0">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="currentColor"
															className="inline-block w-5 h-5 mr-2 bi bi-box-arrow-in-right"
															viewBox="0 0 16 16">
															<path
																fillRule="evenodd"
																d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
															/>
															<path
																fillRule="evenodd"
																d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
															/>
														</svg>
														{t('account.login.button')}
													</LoadingButton>
												</div>
											</form>
											<ErrorModal ref={errorModal} />
											<div className="mt-4">
												<p className="text-center mb-3">
													<span>Or</span>
												</p>
												<div className="text-center mb-4 sm:space-x-4">
													<a
														className="p-2 block sm:inline-block rounded lg:rounded-full leading-5 text-gray-100 bg-gray-100 border border-gray-100 hover:text-white focus:outline-none focus:ring-0 mb-3"
														href="login-ilustration.html#">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 32 32"
															className="inline-block w-5 h-5  bi bi-google"
															width="24"
															height="24">
															<path
																d="M29.986 27.715H2.008C.915 27.715 0 26.85 0 25.733V6.376A2.01 2.01 0 0 1 2.008 4.37h27.978c1.093 0 2.008.9 2.008 2.008v19.33c-.025 1.144-.915 2.008-2.008 2.008z"
																fill="#f2f2f2"
															/>
															<path
																d="M4 27.715l11.97-8.76.076-.508L3.7 9.578l-.025 17.705z"
																opacity=".1"
																fill="#221f1f"
															/>
															<g fill="#d44c3d">
																<path d="M2.008 27.715C.9 27.715 0 26.85 0 25.733V6.35c0-1.118.9-1.32 2.008-1.32s2.008.23 2.008 1.32v21.364z" />
																<path d="M2.008 5.334c1.423 0 1.703.432 1.703 1.016v21.084H2.008c-.94 0-1.703-.762-1.703-1.703V6.35c-.025-.6.28-1.016 1.703-1.016zm0-.28C.9 5.055 0 5.283 0 6.35v19.356a1.98 1.98 0 0 0 2.008 2.008h2.008V6.35C4 5.258 3.126 5.055 2.008 5.055zm27.978.28c1.296 0 1.703.254 1.703.966v19.458c0 .94-.762 1.703-1.703 1.703h-1.703V6.3c-.025-.737.407-.966 1.703-.966zm0-.28c-1.118 0-2.008.152-2.008 1.245v21.44h2.008c1.118 0 2.008-.9 2.008-2.008V6.274c-.025-1.093-.915-1.22-2.008-1.22z" />
																<path d="M29.986 27.715h-2.008V6.3c0-1.118.9-1.245 2.008-1.245s2.008.152 2.008 1.245v19.458a2 2 0 0 1-2.008 1.957z" />
															</g>
															<path
																d="M21.422 27.715L.178 7.2l1.118.457 14.8 10.647L31.993 6.63v19.128a1.99 1.99 0 0 1-2.008 1.982z"
																opacity=".08"
																fill="#221f1f"
															/>
															<g fill="#d44c3d">
																<path d="M15.96 18.98L.864 8.028c-.9-.66-1.144-1.93-.483-2.82s1.93-1.093 2.846-.432l12.757 9.275L28.817 4.65c.9-.66 2.135-.457 2.795.457.66.9.457 2.135-.457 2.795z" />
																<path d="M29.986 4.572c.534 0 1.067.254 1.398.712.534.762.38 1.83-.38 2.4L15.96 18.625 1.042 7.8C.28 7.24.076 6.147.6 5.4c.305-.457.84-.737 1.423-.737.38 0 .737.102 1.016.33l12.73 9.25.178.102.178-.102 12.82-9.393c.33-.178.66-.28 1.042-.28zm0-.305c-.407 0-.84.102-1.17.38L15.984 14.05 3.202 4.75c-.33-.254-.762-.38-1.194-.38-.635.025-1.27.305-1.652.84-.635.9-.38 2.135.508 2.795L15.96 18.98 31.155 7.9a2.02 2.02 0 0 0 .457-2.795c-.407-.534-1.016-.84-1.626-.84z" />
															</g>
														</svg>

														<span className="inline-block ml-2 text-gray-400">
															Login with Google
														</span>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="flex-shrink max-w-full px-4 w-full lg:w-1/2">
								<div className="text-center mt-6 lg:mt-0">
									<img
										src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/hero-img.png"
										alt="welcome"
										className="max-w-full h-auto mx-auto"
									/>
									<div className="px-4 mt-8">
										<h1 className="text-bold text-2xl mb-2">
											Manage your business easily and safely
										</h1>
										{/* <p className="text-base mb-4 text-gray-500">
                      Managing a business is not as easy as it is today. You can view and manage all reports in a simple
                      and practical way.
                    </p> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
