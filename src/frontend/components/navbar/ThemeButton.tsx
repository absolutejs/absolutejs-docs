import { animated } from '@react-spring/web';
import { ChangeEvent, useState } from 'react';
import { AiOutlineMoon } from 'react-icons/ai';
import { IoSunny } from 'react-icons/io5';
import { ThemeProps } from '../../../types/types';
import { useInitTheme } from '../../hooks/useInitTheme';

export const ThemeButton = ({ themeSprings }: ThemeProps) => {
	const { currentTheme, setCurrentTheme, setTheme } = useInitTheme();
	const [isOpen, setIsOpen] = useState(false);

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;

		if (value === 'light') {
			setTheme('light');
			setCurrentTheme('light');
		} else if (value === 'dark') {
			setTheme('dark');
			setCurrentTheme('dark');
		} else {
			const prefersLight = window.matchMedia(
				'(prefers-color-scheme: light)'
			).matches;
			setTheme(prefersLight ? 'light' : 'dark');
			setCurrentTheme(prefersLight ? 'system:light' : 'system:dark');
		}

		setIsOpen(false);
	};

	const icon =
		currentTheme === 'dark' || currentTheme === 'system:dark' ? (
			<AiOutlineMoon style={{ height: '1.5rem', width: '1.5rem' }} />
		) : (
			<IoSunny style={{ height: '1.5rem', width: '1.5rem' }} />
		);

	return (
		<animated.div style={{ margin: 'auto', position: 'relative' }}>
			<animated.button
				style={{
					alignItems: 'center',
					backgroundColor: themeSprings.themeTertiary,
					border: 'none',
					borderRadius: '50%',
					color: themeSprings.contrastPrimary,
					cursor: 'pointer',
					display: 'flex',
					height: '2.5rem',
					justifyContent: 'center',
					padding: 0,
					width: '2.5rem'
				}}
				onClick={() => setIsOpen((open) => !open)}
			>
				{icon}
			</animated.button>

			{isOpen && (
				<animated.select
					style={{
						backgroundColor: themeSprings.themeTertiary,
						border: 'none',
						borderRadius: '0.25rem',
						color: themeSprings.contrastPrimary,
						cursor: 'pointer',
						padding: '0.5rem',
						position: 'absolute',
						top: '3rem'
					}}
					value={
						currentTheme.startsWith('system')
							? 'system'
							: currentTheme
					}
					onChange={handleSelectChange}
				>
					<option value="system">System</option>
					<option value="light">Light</option>
					<option value="dark">Dark</option>
				</animated.select>
			)}
		</animated.div>
	);
};
