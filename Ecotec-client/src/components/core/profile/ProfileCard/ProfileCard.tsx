import {ITabItems} from '@/views/core/settings/Profile';
import React from 'react';
import {UserType} from '@/application/enums/core/users/UserType';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';

interface IProfileCardProps {
	avatar: string;
	tabItems: ITabItems[];
	setTabSelected: (tab: number) => void;
	tabSelected: number;
}

const ProfileCard: React.FC<IProfileCardProps> = ({
	setTabSelected,
	avatar,
	tabItems,
	tabSelected,
}) => {
	const currentType = useSelector(
		(state: RootState) => state.account.user?.role
	);
	return (
		<div className="intro-y box px-5 pt-5 mt-5">
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
						<div className="text-slate-500">Purchases</div>
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
				{UserType.Admin === currentType
					? tabItems.map((item) => (
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
										tabSelected === item.id
											? 'true'
											: 'false'
									}>
									<i
										className={`lucide w-4 h-4 mr-2 ${item.icon}`}></i>{' '}
									{item.title}
								</button>
							</li>
					  ))
					: tabItems
							.filter((item) => item.id != 1)
							.map((item) => (
								<li
									key={item.id}
									className="nav-item "
									role="presentation">
									<button
										onClick={() => setTabSelected(item.id)}
										className={`nav-link py-4 flex items-center cursor-pointer ${
											tabSelected === item.id
												? 'active'
												: ''
										}`}
										type="button"
										role="tab"
										data-tw-target="#_mns7deevj"
										aria-controls="_mns7deevj"
										aria-selected={
											tabSelected === item.id
												? 'true'
												: 'false'
										}>
										<i
											className={`lucide w-4 h-4 mr-2 ${item.icon}`}></i>{' '}
										{item.title}
									</button>
								</li>
							))}
			</ul>
		</div>
	);
};

export default ProfileCard;
