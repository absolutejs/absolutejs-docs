import { animated, SpringRef, SpringValue } from '@react-spring/web';
import { ReactNode, RefObject, useEffect, useRef } from 'react';
import { ThemeSprings } from '../../../types/springTypes';

type DropdownContainerProps = {
	spring: {
		opacity: SpringValue<number>;
		scale: SpringValue<number>;
		y: SpringValue<number>;
	};
	springApi: SpringRef<{ opacity: number; scale: number; y: number }>;
	onClose?: () => void;
	children?: ReactNode;
	ignoredElements?: RefObject<HTMLElement | null>[];
	themeSprings: ThemeSprings;
};

export const DropdownContainer = ({
	spring,
	springApi,
	onClose,
	children,
	themeSprings,
	ignoredElements = []
}: DropdownContainerProps) => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (!(event.target instanceof Node)) return;

			for (const ref of ignoredElements) {
				if (ref.current && ref.current.contains(event.target)) {
					return;
				}
			}

			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				void springApi.start({
					config: { friction: 26, tension: 350 },
					opacity: 0,
					scale: 0.95,
					y: -10
				});
				setTimeout(() => onClose?.(), 150);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [ignoredElements, springApi, onClose]);

	return (
		<animated.div
			ref={dropdownRef}
			style={{
				backgroundColor: themeSprings.themePrimary,
				border: '1px solid rgba(128, 128, 128, 0.15)',
				borderRadius: '16px',
				boxShadow:
					'0 12px 40px rgba(0, 0, 0, 0.18), 0 4px 12px rgba(0, 0, 0, 0.12)',
				opacity: spring.opacity,
				position: 'absolute',
				right: 0,
				scale: spring.scale,
				top: 'calc(100% + 12px)',
				transform: spring.y.to((y) => `translateY(${y}px)`),
				transformOrigin: 'top right',
				zIndex: 999
			}}
		>
			{children}
		</animated.div>
	);
};
