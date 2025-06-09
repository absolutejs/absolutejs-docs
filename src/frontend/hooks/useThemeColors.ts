import { useSpring } from '@react-spring/web';
import { useEffect } from 'react';
import {
	darkPrimaryColor,
	darkSecondaryColor,
	darkTertiaryColor,
	lightPrimaryColor,
	lightSecondaryColor,
	lightTertiaryColor
} from '../styles/colors';
import { useThemeStore } from './useThemeStore';

export const useThemeColors = () => {
	const theme = useThemeStore((state) => state.theme);

	const [themeSprings, themeApi] = useSpring(() => ({
		contrastPrimary:
			theme === 'dark' ? lightPrimaryColor : darkPrimaryColor,
		contrastSecondary:
			theme === 'dark' ? lightSecondaryColor : darkSecondaryColor,
		themePrimary: theme === 'dark' ? darkPrimaryColor : lightPrimaryColor,
		themeSecondary:
			theme === 'dark' ? darkSecondaryColor : lightSecondaryColor,
		themeTertiary: theme === 'dark' ? darkTertiaryColor : lightTertiaryColor
	}));

	useEffect(() => {
		themeApi.start({
			contrastPrimary:
				theme === 'dark' ? lightPrimaryColor : darkPrimaryColor,
			contrastSecondary:
				theme === 'dark' ? lightSecondaryColor : darkSecondaryColor,
			themePrimary:
				theme === 'dark' ? darkPrimaryColor : lightPrimaryColor,
			themeSecondary:
				theme === 'dark' ? darkSecondaryColor : lightSecondaryColor,
			themeTertiary:
				theme === 'dark' ? darkTertiaryColor : lightTertiaryColor
		});
	}, [theme, themeApi]);

	return themeSprings;
};
