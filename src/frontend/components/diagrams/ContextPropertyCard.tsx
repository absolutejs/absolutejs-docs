import { animated } from '@react-spring/web';
import {
	AnimatedCSSProperties,
	ThemeSprings
} from '../../../types/springTypes';
import { diagramColors } from './diagramStyles';

export type ContextPropertyColorKey =
	| 'accent'
	| 'accentSecondary'
	| 'accentTertiary';

type ContextPropertyCardProps = {
	codeExample: string;
	colorKey: ContextPropertyColorKey;
	descriptionLines: Array<string>;
	themeSprings: ThemeSprings;
	title: string;
};

const cardStyle = (
	themeSprings: ThemeSprings,
	colorKey: ContextPropertyColorKey
): AnimatedCSSProperties => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? `${diagramColors.dark[colorKey]}1F`
			: `${diagramColors.light[colorKey]}1F`
	),
	borderRadius: '0.5rem',
	display: 'flex',
	flexDirection: 'column',
	gap: '0.375rem',
	padding: '0.875rem 1rem'
});

const cardTitleStyle = (
	themeSprings: ThemeSprings,
	colorKey: ContextPropertyColorKey
): AnimatedCSSProperties => ({
	color: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? diagramColors.dark[colorKey]
			: diagramColors.light[colorKey]
	),
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.875rem',
	fontWeight: 700,
	margin: 0
});

const cardDescriptionStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? diagramColors.dark.textMuted
			: diagramColors.light.textMuted
	),
	flex: 1,
	fontSize: '0.75rem',
	lineHeight: 1.5,
	margin: 0
});

const cardCodeStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	color: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? diagramColors.dark.text
			: diagramColors.light.text
	),
	display: 'block',
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.75rem',
	overflowX: 'auto',
	whiteSpace: 'nowrap'
});

export const ContextPropertyCard = ({
	codeExample,
	colorKey,
	descriptionLines,
	themeSprings,
	title
}: ContextPropertyCardProps) => (
	<animated.div style={cardStyle(themeSprings, colorKey)}>
		<animated.p style={cardTitleStyle(themeSprings, colorKey)}>
			{title}
		</animated.p>
		<animated.p style={cardDescriptionStyle(themeSprings)}>
			{descriptionLines.join(' ')}
		</animated.p>
		<animated.code style={cardCodeStyle(themeSprings)}>
			{codeExample}
		</animated.code>
	</animated.div>
);
