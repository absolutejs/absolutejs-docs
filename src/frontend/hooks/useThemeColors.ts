import { useSpring } from '@react-spring/web';
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

	const [themeSprings] = useSpring(() => ({
		themePrimary: theme === 'dark' ? darkPrimaryColor : lightPrimaryColor,
		themeSecondary:
			theme === 'dark' ? darkSecondaryColor : lightSecondaryColor,
		themeTertiary:
			theme === 'dark' ? darkTertiaryColor : lightTertiaryColor,
		contrastPrimary:
			theme === 'dark' ? lightPrimaryColor : darkPrimaryColor,
		contrastSecondary:
			theme === 'dark' ? lightSecondaryColor : darkSecondaryColor
	}));

	return themeSprings;
};
