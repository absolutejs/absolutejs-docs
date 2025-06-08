import { useEffect } from 'react';
import { useThemeStore } from './useThemeStore';

export const useInitTheme = () => {
	const { setTheme } = useThemeStore();

	useEffect(() => {
		const storedTheme = window.localStorage.getItem('theme');
		const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
		console.log(mediaQuery);

		const applySystemTheme = (event: MediaQueryListEvent) => {
			setTheme(event.matches ? 'light' : 'dark');
		};

		if (storedTheme !== 'light' && storedTheme !== 'dark') {
			mediaQuery.matches && setTheme('light');
			mediaQuery.addEventListener('change', applySystemTheme);
		} else if (storedTheme === 'light') {
			setTheme(storedTheme);
		}

		return () => {
			mediaQuery.removeEventListener('change', applySystemTheme);
		};
	}, [setTheme]);
};
