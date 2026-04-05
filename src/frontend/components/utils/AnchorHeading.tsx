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
	style
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

	return (
		<a
			href={`#${id}`}
			onClick={(event) => {
				event.preventDefault();
				handleClick();
			}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={anchorHeadingContainerStyle}
		>
			<AnchorHeadingContent
				id={id}
				isHovered={isHovered}
				level={level}
				style={style}
			>
				{children}
			</AnchorHeadingContent>
		</a>
	);
};

type AnchorHeadingContentProps = {
	children: ReactNode;
	id: string;
	isHovered: boolean;
	level: 'h1' | 'h2' | 'h3';
	style?: AnimatedCSSProperties;
};

const AnchorHeadingContent = ({
	children,
	id,
	isHovered,
	level,
	style
}: AnchorHeadingContentProps) => {
	const headingContent = (
		<>
			<span style={isHovered ? anchorIconVisibleStyle : anchorIconStyle}>
				#
			</span>
			{children}
		</>
	);
	const headingStyle: AnimatedCSSProperties = {
		...style,
		alignItems: 'center',
		display: 'flex',
		gap: '0.5rem'
	};

	if (level === 'h1') {
		return (
			<animated.h1 id={id} style={headingStyle}>
				{headingContent}
			</animated.h1>
		);
	}
	if (level === 'h2') {
		return (
			<animated.h2 id={id} style={headingStyle}>
				{headingContent}
			</animated.h2>
		);
	}

	return (
		<animated.h3 id={id} style={headingStyle}>
			{headingContent}
		</animated.h3>
	);
};
