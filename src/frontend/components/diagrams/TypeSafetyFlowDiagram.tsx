import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import {
	AnimatedCSSProperties,
	ThemeSprings
} from '../../../types/springTypes';
import { diagramColors, diagramContainerStyle } from './diagramStyles';

type TypeSafetyFlowDiagramProps = {
	themeSprings: ThemeSprings;
};

type StageColorKey = 'accent' | 'accentSecondary' | 'accentTertiary';

type TypeSafetyStage = {
	colorKey: StageColorKey;
	description: string;
	example: string;
	title: string;
};

// Dark color for numbers on bright badge backgrounds
const numberColor = '#1a1a2e';

const serverStages: Array<TypeSafetyStage> = [
	{
		colorKey: 'accentTertiary',
		description: 'Define your tables',
		example: "pgTable('users', { id, name, email })",
		title: 'Schema'
	},
	{
		colorKey: 'accent',
		description: 'Infer TypeScript types',
		example: 'type User = typeof users.$inferSelect',
		title: 'Drizzle ORM'
	},
	{
		colorKey: 'accentSecondary',
		description: 'Query and return data',
		example: 'db.select().from(users)',
		title: 'Route Handler'
	}
];

const clientStages: Array<TypeSafetyStage> = [
	{
		colorKey: 'accent',
		description: 'Type-safe API calls',
		example: 'const { data, error } = api.users.get()',
		title: 'Eden Treaty'
	},
	{
		colorKey: 'accentSecondary',
		description: 'Fully typed props',
		example: 'type Props = { user: User }',
		title: 'Component'
	}
];

const themedColor = (
	themeSprings: ThemeSprings,
	colorKey: keyof typeof diagramColors.dark
) =>
	themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? diagramColors.dark[colorKey]
			: diagramColors.light[colorKey]
	);

const stageGridStyle: CSSProperties = {
	display: 'grid',
	gap: '0.875rem',
	gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'
};

const stageHeaderStyle: CSSProperties = {
	alignItems: 'flex-start',
	display: 'flex',
	gap: '0.625rem',
	marginBottom: '0.75rem'
};

const titleStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, 'text'),
	fontSize: '1.0625rem',
	fontWeight: 600,
	margin: '0 0 1.25rem',
	textAlign: 'center'
});

const rowLabelStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, 'textMuted'),
	fontSize: '0.6875rem',
	fontWeight: 600,
	letterSpacing: '0.08em',
	margin: '0 0 0.75rem',
	textAlign: 'center',
	textTransform: 'uppercase'
});

const boundaryStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	borderTop: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? `1.5px dashed ${diagramColors.dark.border}`
			: `1.5px dashed ${diagramColors.light.border}`
	),
	margin: '1.25rem 0'
});

const stageCardStyle = (
	themeSprings: ThemeSprings,
	colorKey: StageColorKey
): AnimatedCSSProperties => ({
	background: themedColor(themeSprings, 'background'),
	border: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? `2px solid ${diagramColors.dark[colorKey]}`
			: `2px solid ${diagramColors.light[colorKey]}`
	),
	borderRadius: '0.625rem',
	display: 'flex',
	flexDirection: 'column',
	padding: '1rem'
});

const stepBadgeStyle = (
	themeSprings: ThemeSprings,
	colorKey: StageColorKey
): AnimatedCSSProperties => ({
	alignItems: 'center',
	background: themedColor(themeSprings, colorKey),
	borderRadius: '50%',
	color: numberColor,
	display: 'flex',
	flexShrink: 0,
	fontSize: '0.6875rem',
	fontWeight: 700,
	height: '1.375rem',
	justifyContent: 'center',
	width: '1.375rem'
});

const stageTitleStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, 'text'),
	fontSize: '0.875rem',
	fontWeight: 600,
	margin: 0
});

const stageDescriptionStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, 'textMuted'),
	fontSize: '0.75rem',
	margin: '0.125rem 0 0'
});

const stageCodeStyle = (
	themeSprings: ThemeSprings,
	colorKey: StageColorKey
): AnimatedCSSProperties => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? `${diagramColors.dark[colorKey]}1F`
			: `${diagramColors.light[colorKey]}1F`
	),
	borderRadius: '0.375rem',
	color: themedColor(themeSprings, colorKey),
	display: 'block',
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.75rem',
	marginTop: 'auto',
	overflowX: 'auto',
	padding: '0.5rem 0.75rem',
	whiteSpace: 'nowrap'
});

const flowBarStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	background: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? `linear-gradient(90deg, ${diagramColors.dark.accent} 0%, ${diagramColors.dark.accentSecondary} 100%)`
			: `linear-gradient(90deg, ${diagramColors.light.accent} 0%, ${diagramColors.light.accentSecondary} 100%)`
	),
	borderRadius: '999px',
	height: '0.25rem',
	marginTop: '1.5rem'
});

const flowBarLabelStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, 'textMuted'),
	fontSize: '0.75rem',
	fontWeight: 500,
	margin: '0.625rem 0 0',
	textAlign: 'center'
});

type TypeSafetyStageCardProps = {
	stage: TypeSafetyStage;
	stepNumber: number;
	themeSprings: ThemeSprings;
};

const TypeSafetyStageCard = ({
	stage,
	stepNumber,
	themeSprings
}: TypeSafetyStageCardProps) => (
	<animated.div style={stageCardStyle(themeSprings, stage.colorKey)}>
		<div style={stageHeaderStyle}>
			<animated.span style={stepBadgeStyle(themeSprings, stage.colorKey)}>
				{stepNumber}
			</animated.span>
			<div>
				<animated.p style={stageTitleStyle(themeSprings)}>
					{stage.title}
				</animated.p>
				<animated.p style={stageDescriptionStyle(themeSprings)}>
					{stage.description}
				</animated.p>
			</div>
		</div>
		<animated.code style={stageCodeStyle(themeSprings, stage.colorKey)}>
			{stage.example}
		</animated.code>
	</animated.div>
);

export const TypeSafetyFlowDiagram = ({
	themeSprings
}: TypeSafetyFlowDiagramProps) => (
	<animated.div style={diagramContainerStyle(themeSprings)}>
		<animated.p style={titleStyle(themeSprings)}>
			End-to-End Type Safety
		</animated.p>
		<animated.p style={rowLabelStyle(themeSprings)}>SERVER</animated.p>
		<div style={stageGridStyle}>
			{serverStages.map((stage, stageIndex) => (
				<TypeSafetyStageCard
					key={stage.title}
					stage={stage}
					stepNumber={stageIndex + 1}
					themeSprings={themeSprings}
				/>
			))}
		</div>
		<animated.div style={boundaryStyle(themeSprings)} />
		<animated.p style={rowLabelStyle(themeSprings)}>CLIENT</animated.p>
		<div style={stageGridStyle}>
			{clientStages.map((stage, stageIndex) => (
				<TypeSafetyStageCard
					key={stage.title}
					stage={stage}
					stepNumber={stageIndex + serverStages.length + 1}
					themeSprings={themeSprings}
				/>
			))}
		</div>
		<animated.div style={flowBarStyle(themeSprings)} />
		<animated.p style={flowBarLabelStyle(themeSprings)}>
			TypeScript validates at every step: errors caught at compile time,
			not runtime
		</animated.p>
	</animated.div>
);
