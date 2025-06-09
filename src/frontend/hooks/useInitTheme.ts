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
			setCurrentTheme(event.matches ? 'system:light' : 'system:dark');
		};

		if (storedTheme === 'light') {
			setTheme('light');
			setCurrentTheme('light');

			return undefined;
		}

		if (storedTheme === 'dark') {
			setTheme('dark');
			setCurrentTheme('dark');

			return undefined;
		}

		const isLight = mediaQuery.matches;
		setTheme(isLight ? 'light' : 'dark');
		setCurrentTheme(isLight ? 'system:light' : 'system:dark');
		mediaQuery.addEventListener('change', applySystemTheme);

		return () => {
			mediaQuery.removeEventListener('change', applySystemTheme);
		};
	}, [setTheme, setCurrentTheme]);

	return { currentTheme, setCurrentTheme, setTheme };
};
