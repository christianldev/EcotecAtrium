import {useTranslation} from 'react-i18next';
import {useRef, useState} from 'react';
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

import UploadImage from '@/components/ui/uploaders/UploadImage';

import services from '@/services';
import {RootState} from '@/store';
import {useSelector} from 'react-redux';
import UserUtils from '@/utils/store/UserUtils';
import {useNavigate} from 'react-router-dom';
import {Helmet, HelmetProvider} from 'react-helmet-async';

import ChangePasswordForm from '@/components/front/forms/ChangePasswordForm';
import SecurityProfileForm from '@/components/front/forms/SecurityProfileForm';
import UpdateProfileForm from '@/components/front/forms/UpdateProfileForm';

import ProfileCard from '@/components/core/profile/ProfileCard';
import {UserType} from '@/application/enums/core/users/UserType';

export interface ITabItems {
	id: number;
	title: string;
	icon: string;
	content: JSX.Element | null;
}

const tabItems: ITabItems[] = [
	{
		id: 1,
		title: 'Profile',
		icon: 'fas fa-user',
		content: <UpdateProfileForm />,
	},
	{
		id: 2,
		title: 'Account',
		icon: 'fas fa-user-cog',
		content: <SecurityProfileForm />,
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
		content: <SecurityProfileForm />,
	},
];

export default function Profile() {
	const {t} = useTranslation();
	const navigate = useNavigate();

	const errorModal = useRef<RefErrorModal>(null);
	const successModal = useRef<RefSuccessModal>(null);
	const confirmModal = useRef<RefConfirmModal>(null);

	const [showUploadImage, setShowUploadImage] =
		useState(false);
	const [uploadingImage, setUploadingImage] =
		useState(false);

	const currentType = useSelector(
		(state: RootState) => state.account.user?.role
	);

	const [tabSelected, setTabSelected] = useState(
		UserType.Admin === currentType ? 1 : 2
	);

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
	function loadedImage(image: string) {
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
		<div>
			{/*Profile */}
			<HelmetProvider>
				<Helmet>
					<title>
						{t('settings.profile.profileTitle')} | layout
					</title>
				</Helmet>
			</HelmetProvider>
			<div className="intro-y flex items-center mt-4">
				<h2 className="text-lg font-medium mr-auto">
					{t('settings.profile.profileTitle')}
				</h2>
			</div>

			{/*Profile Info */}
			<ProfileCard
				setTabSelected={setTabSelected}
				avatar={avatar}
				tabItems={tabItems}
				tabSelected={tabSelected}
			/>
			{
				tabItems.filter((x) => x.id === tabSelected)[0]
					.content
			}

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
