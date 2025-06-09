import { animated } from '@react-spring/web';
import { useRef, useEffect } from 'react';
import { AiOutlineMoon } from 'react-icons/ai';
import { IoSunny } from 'react-icons/io5';
import { ThemeProps } from '../../../types/types';
import { useInitTheme } from '../../hooks/useInitTheme';

export const ThemeButton = ({ themeSprings }: ThemeProps) => {
	const { currentTheme, setCurrentTheme, setTheme } = useInitTheme();
	const detailsRef = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const onClickOutside = (event: MouseEvent) => {
			const det = detailsRef.current;
			if (!det?.open) return;
			const tgt = event.target;
			if (!(tgt instanceof Node)) return;
			if (!det.contains(tgt)) det.open = false;
		};
		document.addEventListener('mousedown', onClickOutside);

		return () => document.removeEventListener('mousedown', onClickOutside);
	}, []);

	const selectTheme = (option: 'system' | 'light' | 'dark') => {
		if (option === 'system') {
			const prefersLight = window.matchMedia(
				'(prefers-color-scheme: light)'
			).matches;
			setTheme(prefersLight ? 'light' : 'dark');
			setCurrentTheme(prefersLight ? 'system:light' : 'system:dark');
			window.localStorage.removeItem('theme');
		} else {
			setTheme(option);
			setCurrentTheme(option);
			window.localStorage.setItem('theme', option);
		}
		if (detailsRef.current) detailsRef.current.open = false;
	};

	const icon = currentTheme.includes('dark') ? (
		<AiOutlineMoon style={{ height: 24, width: 24 }} />
	) : (
		<IoSunny style={{ height: 24, width: 24 }} />
	);

	const selected = currentTheme.startsWith('system')
		? 'system'
		: currentTheme;

	return (
		<animated.details
			ref={detailsRef}
			style={{
				display: 'inline-block',
				margin: 'auto',
				position: 'relative'
			}}
		>
			<animated.summary
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
					listStyle: 'none',
					margin: 0,
					padding: 0,
					width: '2.5rem'
				}}
			>
				{icon}
			</animated.summary>

			<animated.ul
				style={{
					backgroundColor: themeSprings.themeTertiary,
					borderRadius: '0.25rem',
					boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
					listStyle: 'none',
					margin: 0,
					minWidth: '6rem',
					padding: '0.5rem',
					position: 'absolute',
					right: 0,
					top: '3.5rem'
				}}
			>
				{(['system', 'light', 'dark'] as const).map((opt) => (
					<animated.li
						key={opt}
						onClick={() => selectTheme(opt)}
						style={{
							background:
								opt === selected
									? themeSprings.contrastPrimary
									: 'transparent',
							borderRadius: '0.25rem',
							color:
								opt === selected
									? themeSprings.themeTertiary
									: themeSprings.contrastPrimary,
							cursor: 'pointer',
							padding: '0.25rem 0.5rem'
						}}
					>
						{opt.charAt(0).toUpperCase() + opt.slice(1)}
					</animated.li>
				))}
			</animated.ul>
		</animated.details>
	);
};
