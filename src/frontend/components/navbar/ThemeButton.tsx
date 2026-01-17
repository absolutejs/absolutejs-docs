import { animated, Interpolation, to, useSpring } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';
import { SetTheme, ThemeSprings } from '../../../types/springTypes';
import { AnimatedMoon, AnimatedSun } from '../utils/AnimatedComponents';

type ThemeButtonProps = {
	setTheme: SetTheme;
	themeSprings: ThemeSprings;
};

type ThemeOptionProps = {
	option: 'system' | 'light' | 'dark';
	selected: Interpolation<string, string>;
	themeSprings: ThemeSprings;
	onClick: () => void;
};

const ThemeOption = ({
	option,
	selected,
	themeSprings,
	onClick
}: ThemeOptionProps) => {
	const [hoverSpring, hoverApi] = useSpring(() => ({
		config: { friction: 20, tension: 300 },
		opacity: 0
	}));

	const background = to(
		[selected, themeSprings.themeTertiary, hoverSpring.opacity],
		(sel, bg, hoverOpacity) => {
			if (sel === option) return bg;

			return `rgba(128, 128, 128, ${Number(hoverOpacity) * 0.15})`;
		}
	);

	const color = to(
		[
			selected,
			themeSprings.contrastPrimary,
			themeSprings.contrastSecondary
		],
		(sel, primary, secondary) => (sel === option ? primary : secondary)
	);

	return (
		<animated.li
			onClick={onClick}
			onMouseEnter={() => hoverApi.start({ opacity: 1 })}
			onMouseLeave={() => hoverApi.start({ opacity: 0 })}
			style={{
				background,
				borderRadius: '8px',
				color,
				cursor: 'pointer',
				fontWeight: 500,
				padding: '8px 12px'
			}}
		>
			{option.charAt(0).toUpperCase() + option.slice(1)}
		</animated.li>
	);
};

export const ThemeButton = ({ themeSprings, setTheme }: ThemeButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const [dropdownSpring, dropdownApi] = useSpring(() => ({
		config: { friction: 24, tension: 300 },
		opacity: 0,
		scale: 0.9,
		y: -8
	}));

	const openDropdown = () => {
		setIsOpen(true);
		void dropdownApi.start({ opacity: 1, scale: 1, y: 0 });
	};

	const closeDropdown = () => {
		void dropdownApi.start({
			config: { friction: 26, tension: 350 },
			opacity: 0,
			scale: 0.9,
			y: -8
		});
		setTimeout(() => setIsOpen(false), 150);
	};

	const toggleDropdown = () => {
		if (isOpen) {
			closeDropdown();
		} else {
			openDropdown();
		}
	};

	useEffect(() => {
		const onClickOutside = (event: MouseEvent) => {
			if (!isOpen) return;
			const tgt = event.target;
			if (!(tgt instanceof Node)) return;
			if (buttonRef.current?.contains(tgt)) return;
			if (containerRef.current && !containerRef.current.contains(tgt)) {
				closeDropdown();
			}
		};
		document.addEventListener('mousedown', onClickOutside);

		return () => document.removeEventListener('mousedown', onClickOutside);
	}, [isOpen]);

	const selectTheme = (option: 'system' | 'light' | 'dark') => {
		setTheme(option);
		closeDropdown();
	};

	const selected = themeSprings.theme.to((t) => {
		const sel = t.startsWith('system') ? 'system' : t;

		return sel;
	});

	return (
		<div
			ref={containerRef}
			style={{
				display: 'inline-block',
				margin: 'auto 0.5rem',
				position: 'relative'
			}}
		>
			<animated.button
				ref={buttonRef}
				onClick={toggleDropdown}
				style={{
					alignItems: 'center',
					backgroundColor: themeSprings.themeTertiary,
					border: '1px solid rgba(128, 128, 128, 0.12)',
					borderRadius: '10px',
					color: themeSprings.contrastPrimary,
					cursor: 'pointer',
					display: 'flex',
					height: '2.5rem',
					justifyContent: 'center',
					padding: 0,
					position: 'relative',
					width: '2.5rem'
				}}
			>
				<AnimatedMoon
					style={{
						height: 20,
						opacity: themeSprings.theme.to((t) =>
							t.endsWith('dark') ? 1 : 0
						),
						position: 'absolute',
						width: 20
					}}
				/>
				<AnimatedSun
					style={{
						height: 20,
						opacity: themeSprings.theme.to((t) =>
							t.endsWith('dark') ? 0 : 1
						),
						position: 'absolute',
						width: 20
					}}
				/>
			</animated.button>

			{isOpen && (
				<animated.ul
					style={{
						backgroundColor: themeSprings.themePrimary,
						border: '1px solid rgba(128, 128, 128, 0.15)',
						borderRadius: '12px',
						boxShadow:
							'0 8px 32px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
						display: 'flex',
						flexDirection: 'column',
						gap: '4px',
						listStyle: 'none',
						margin: 0,
						minWidth: '120px',
						opacity: dropdownSpring.opacity,
						padding: '8px',
						position: 'absolute',
						right: 0,
						scale: dropdownSpring.scale,
						top: 'calc(100% + 8px)',
						transform: dropdownSpring.y.to(
							(y) => `translateY(${y}px)`
						),
						transformOrigin: 'top right',
						zIndex: 1000
					}}
				>
					{(['system', 'light', 'dark'] as const).map((opt) => (
						<ThemeOption
							key={opt}
							option={opt}
							selected={selected}
							themeSprings={themeSprings}
							onClick={() => selectTheme(opt)}
						/>
					))}
				</animated.ul>
			)}
		</div>
	);
};
