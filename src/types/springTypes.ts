import { AnimatedProps } from '@react-spring/web';
import { CSSProperties } from 'react';
import { useTheme } from '../frontend/hooks/useTheme';

export type AnimatedCSSProperties = AnimatedProps<CSSProperties>;

export type ThemeSprings = ReturnType<typeof useTheme>[0];
export type SetTheme = ReturnType<typeof useTheme>[1];

export type ThemeProps = {
	themeSprings: ThemeSprings;
};

export type DocsViewProps = ThemeProps & {
	currentPageId: string;
	onNavigate: (pageId: string) => void;
	tocOpen?: boolean;
	onTocToggle?: () => void;
	isMobileOrTablet?: boolean;
};
