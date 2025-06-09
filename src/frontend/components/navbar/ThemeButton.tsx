import { animated } from '@react-spring/web';
import { IoSunny } from 'react-icons/io5';
import { ThemeProps } from '../../../types/types';
import { useState } from 'react';
import { AiOutlineMoon } from 'react-icons/ai';

export const ThemeButton = ({ themeSprings }: ThemeProps) => {
	const [currentTheme, setCurrentTheme] = useState<
		'light' | 'dark' | 'system:light' | 'system:dark'
	>('dark');

	return (
		<animated.button
			style={{
				backgroundColor: themeSprings.themeTertiary,
				color: themeSprings.contrastPrimary,
				width: '2.5rem',
				height: '2.5rem',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '50%',
				border: 'none',
				cursor: 'pointer',
				margin: 'auto'
			}}
		>
			{currentTheme === 'dark' || currentTheme === 'system:dark' ? (
				<AiOutlineMoon style={{ width: '1.5rem', height: '1.5rem' }} />
			) : (
				<IoSunny style={{ width: '1.5rem', height: '1.5rem' }} />
			)}
		</animated.button>
	);
};
