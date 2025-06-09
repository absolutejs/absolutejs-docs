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
		const onClickOutside = (e: MouseEvent) => {
			const det = detailsRef.current;
			if (!det?.open) return;
			const tgt = e.target;
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
		<AiOutlineMoon style={{ width: 24, height: 24 }} />
	) : (
		<IoSunny style={{ width: 24, height: 24 }} />
	);

	const selected = currentTheme.startsWith('system')
		? 'system'
		: currentTheme;

	return (
		<animated.details
			ref={detailsRef}
			style={{
				position: 'relative',
				display: 'inline-block',
				margin: 'auto'
			}}
		>
			<animated.summary
				style={{
					listStyle: 'none',
					margin: 0,
					padding: 0,
					backgroundColor: themeSprings.themeTertiary,
					border: 'none',
					borderRadius: '50%',
					cursor: 'pointer',
					width: '2.5rem',
					height: '2.5rem',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: themeSprings.contrastPrimary
				}}
			>
				{icon}
			</animated.summary>

			<animated.ul
				style={{
					position: 'absolute',
					top: '3.5rem',
					right: 0,
					margin: 0,
					padding: '0.5rem',
					backgroundColor: themeSprings.themeTertiary,
					borderRadius: '0.25rem',
					listStyle: 'none',
					minWidth: '6rem',
					boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
				}}
			>
				{(['system', 'light', 'dark'] as const).map((opt) => (
					<animated.li
						key={opt}
						onClick={() => selectTheme(opt)}
						style={{
							cursor: 'pointer',
							padding: '0.25rem 0.5rem',
							borderRadius: '0.25rem',
							background:
								opt === selected
									? themeSprings.contrastPrimary
									: 'transparent',
							color:
								opt === selected
									? themeSprings.themeTertiary
									: themeSprings.contrastPrimary
						}}
					>
						{opt.charAt(0).toUpperCase() + opt.slice(1)}
					</animated.li>
				))}
			</animated.ul>
		</animated.details>
	);
};
