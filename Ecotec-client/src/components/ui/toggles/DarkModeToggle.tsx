import {Theme} from '@/application/enums/shared/Theme';
import store, {RootState} from '@/store';
import {setTheme} from '@/store/modules/themeReducer';
import {useSelector} from 'react-redux';

export default function DarkModeToggle() {
	const theme = useSelector<RootState>(
		(state) => state.theme.value
	);

	const toggle = () => {
		const htmlClasses =
			document.querySelector('html')?.classList;
		if (theme === Theme.DARK) {
			store.dispatch(setTheme(Theme.LIGHT));
			htmlClasses?.remove('dark');
		} else {
			store.dispatch(setTheme(Theme.DARK));
			htmlClasses?.add('dark');
		}
	};
	return (
		<button
			onClick={toggle}
			className="dark-mode-switcher cursor-pointer shadow-md fixed bottom-0 right-0 box border rounded-full w-40 h-12 flex items-center justify-center z-50 mb-10 mr-10">
			<div className="mr-4 text-slate-600 dark:text-slate-200">
				Dark Mode
			</div>
			<div
				className={
					theme != Theme.DARK
						? 'dark-mode-switcher__toggle border'
						: 'dark-mode-switcher__toggle--active dark-mode-switcher__toggle border'
				}></div>
		</button>
	);
}
