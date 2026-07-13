import { CSSProperties, useState } from 'react';
import { animated } from '@react-spring/web';
import {
	AnimatedCSSProperties,
	ThemeSprings
} from '../../../types/springTypes';
import { diagramColors, diagramContainerStyle } from './diagramStyles';
import { PropsHoverableProp } from './PropsHoverableProp';

type PropsFlowDiagramProps = {
	themeSprings: ThemeSprings;
};

type FlowCardColorKey = 'accent' | 'accentSecondary';

const themedColor = (
	themeSprings: ThemeSprings,
	colorKey: keyof typeof diagramColors.dark
) =>
	themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? diagramColors.dark[colorKey]
			: diagramColors.light[colorKey]
	);

const flowLayoutStyle: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	gap: '1rem',
	justifyContent: 'center'
};

const flowCodeStyle: CSSProperties = {
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.8125rem',
	lineHeight: 1.7,
	whiteSpace: 'pre'
};

const flowCardStyle = (
	themeSprings: ThemeSprings,
	colorKey: FlowCardColorKey
): AnimatedCSSProperties => ({
	background: themedColor(themeSprings, 'background'),
	border: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? `2px solid ${diagramColors.dark[colorKey]}`
			: `2px solid ${diagramColors.light[colorKey]}`
	),
	borderRadius: '0.625rem',
	flex: '1 1 240px',
	maxWidth: '24rem',
	padding: '1rem 1.25rem'
});

const flowCardTitleStyle = (
	themeSprings: ThemeSprings,
	colorKey: FlowCardColorKey
): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, colorKey),
	fontSize: '0.9375rem',
	fontWeight: 600,
	margin: '0 0 0.75rem'
});

const flowArrowStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	alignSelf: 'center',
	color: themedColor(themeSprings, 'accent'),
	fontSize: '1.5rem',
	fontWeight: 700
});

const mutedLineStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, 'textMuted')
});

const codeLineStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, 'text'),
	paddingLeft: '1rem'
});

const highlightLineStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, 'accentSecondary'),
	fontWeight: 500,
	paddingLeft: '1rem'
});

type HoveredProp = 'user' | 'posts' | null;

type PropsArgumentLineProps = {
	themeSprings: ThemeSprings;
};

const PropsArgumentLine = ({ themeSprings }: PropsArgumentLineProps) => {
	const [hoveredProp, setHoveredProp] = useState<HoveredProp>(null);

	return (
		<animated.div style={codeLineStyle(themeSprings)}>
			{'{ '}
			<PropsHoverableProp
				isHovered={hoveredProp === 'user'}
				label="user"
				onMouseEnter={() => setHoveredProp('user')}
				onMouseLeave={() => setHoveredProp(null)}
				themeSprings={themeSprings}
				tooltipLabel="user: User"
			/>
			{', '}
			<PropsHoverableProp
				isHovered={hoveredProp === 'posts'}
				label="posts"
				onMouseEnter={() => setHoveredProp('posts')}
				onMouseLeave={() => setHoveredProp(null)}
				themeSprings={themeSprings}
				tooltipLabel="posts: Post[]"
			/>
			{' }'}
		</animated.div>
	);
};

export const PropsFlowDiagram = ({ themeSprings }: PropsFlowDiagramProps) => (
	<animated.div style={diagramContainerStyle(themeSprings)}>
		<div style={flowLayoutStyle}>
			<animated.div style={flowCardStyle(themeSprings, 'accent')}>
				<animated.p style={flowCardTitleStyle(themeSprings, 'accent')}>
					Route Handler
				</animated.p>
				<div style={flowCodeStyle}>
					<animated.div style={mutedLineStyle(themeSprings)}>
						handleRequest(
					</animated.div>
					<animated.div style={codeLineStyle(themeSprings)}>
						Home,
					</animated.div>
					<animated.div style={codeLineStyle(themeSprings)}>
						asset(...),
					</animated.div>
					<PropsArgumentLine themeSprings={themeSprings} />
					<animated.div style={mutedLineStyle(themeSprings)}>
						)
					</animated.div>
				</div>
			</animated.div>
			<animated.div
				aria-hidden="true"
				style={flowArrowStyle(themeSprings)}
			>
				→
			</animated.div>
			<animated.div
				style={flowCardStyle(themeSprings, 'accentSecondary')}
			>
				<animated.p
					style={flowCardTitleStyle(themeSprings, 'accentSecondary')}
				>
					Component
				</animated.p>
				<div style={flowCodeStyle}>
					<animated.div style={mutedLineStyle(themeSprings)}>
						{'type Props = {'}
					</animated.div>
					<animated.div style={highlightLineStyle(themeSprings)}>
						user: User
					</animated.div>
					<animated.div style={highlightLineStyle(themeSprings)}>
						posts: Post[]
					</animated.div>
					<animated.div style={mutedLineStyle(themeSprings)}>
						{'}'}
					</animated.div>
				</div>
			</animated.div>
		</div>
	</animated.div>
);
