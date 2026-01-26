import { animated } from '@react-spring/web';
import { useState, useCallback, ReactNode } from 'react';
import {
	ThemeSprings,
	AnimatedCSSProperties
} from '../../../types/springTypes';
import {
	anchorHeadingContainerStyle,
	anchorIconStyle,
	anchorIconVisibleStyle
} from '../../styles/anchorHeadingStyles';

type AnchorHeadingProps = {
	children: ReactNode;
	id: string;
	level: 'h1' | 'h2' | 'h3';
	style?: AnimatedCSSProperties;
	themeSprings: ThemeSprings;
};

export const AnchorHeading = ({
	children,
	id,
	level,
	style,
	themeSprings
}: AnchorHeadingProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleClick = useCallback(() => {
		const url = new URL(window.location.href);
		url.hash = id;
		window.history.pushState(null, '', url.toString());

		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [id]);

	const handleMouseEnter = useCallback(() => setIsHovered(true), []);
	const handleMouseLeave = useCallback(() => setIsHovered(false), []);

	const AnimatedHeading = animated[level];

	return (
		<a
			href={`#${id}`}
			onClick={(e) => {
				e.preventDefault();
				handleClick();
			}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={anchorHeadingContainerStyle}
		>
			<animated.span
				style={
					isHovered
						? anchorIconVisibleStyle(themeSprings)
						: anchorIconStyle(themeSprings)
				}
			>
				#
			</animated.span>
			<AnimatedHeading id={id} style={style}>
				{children}
			</AnimatedHeading>
		</a>
	);
};
