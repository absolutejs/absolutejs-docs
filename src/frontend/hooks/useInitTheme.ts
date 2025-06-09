import { useEffect, useState } from 'react';
import { useThemeStore } from './useThemeStore';

export const useInitTheme = () => {
	const setTheme = useThemeStore((state) => state.setTheme);
	const [currentTheme, setCurrentTheme] = useState<
		'light' | 'dark' | 'system:light' | 'system:dark'
	>('dark');

	useEffect(() => {
		const storedTheme = window.localStorage.getItem('theme');
		const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

		const applySystemTheme = (event: MediaQueryListEvent) => {
			setTheme(event.matches ? 'light' : 'dark');
		};

		if (storedTheme !== 'light' && storedTheme !== 'dark') {
			if (mediaQuery.matches) {
				setTheme('light');
				setCurrentTheme('system:light');
			} else {
				setCurrentTheme('system:dark');
			}
			mediaQuery.addEventListener('change', applySystemTheme);
		} else if (storedTheme === 'light') {
			setTheme(storedTheme);
			setCurrentTheme('light');
		} else if (storedTheme === 'dark') {
			setCurrentTheme('dark');
		}

		return () => {
			mediaQuery.removeEventListener('change', applySystemTheme);
		};
	}, [setTheme]);

	return { currentTheme, setCurrentTheme, setTheme };
};
