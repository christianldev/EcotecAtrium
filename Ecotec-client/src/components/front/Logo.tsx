import {Theme} from '@/application/enums/shared/Theme';
import {RootState} from '@/store';
import {useSelector} from 'react-redux';
import LogoLight from '@/assets/img/logo-light.png';
import LogoDark from '@/assets/img/logo-dark.png';
import classNames from '@/utils/shared/ClassesUtils';
import {Link} from 'react-router-dom';

interface Props {
	className?: string;
	size?: string;
	layout?: string;
}

export default function Logo({
	className = '',
	size = 'h-10',
	layout = '',
}: Props) {
	const theme = useSelector<RootState>(
		(state) => state.theme.value
	);
	return (
		<Link to="/" className={className}>
			{(() => {
				if (theme === Theme.DARK) {
					return (
						<img
							className={classNames(size, 'w-auto mx-auto')}
							src={LogoDark}
							alt="Logo"
						/>
					);
				} else {
					return (
						<img
							className={classNames(size, 'w-auto mx-auto')}
							src={
								layout === 'dashboard'
									? LogoDark
									: LogoLight
							}
							alt="Logo"
						/>
					);
				}
			})()}
		</Link>
	);
}
