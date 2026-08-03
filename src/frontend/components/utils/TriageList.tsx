import { animated } from '@react-spring/web';
import { CSSProperties, ReactNode } from 'react';
import { ThemeSprings } from '../../../types/springTypes';

export type TriageItem = {
	problem: string;
	steps: { action: ReactNode; label: string }[];
};

type TriageListProps = {
	items: TriageItem[];
	themeSprings: ThemeSprings;
};

const problemColor = '#EF4444';

const problemDotStyle: CSSProperties = {
	background: problemColor,
	borderRadius: '50%',
	flexShrink: 0,
	height: '0.5rem',
	width: '0.5rem'
};

const stepLabelStyle: CSSProperties = {
	color: '#6366F1',
	flexShrink: 0,
	fontSize: '0.65rem',
	fontWeight: 700,
	letterSpacing: '0.07em',
	minWidth: '5.5rem',
	textTransform: 'uppercase'
};

const TriageCard = ({
	item,
	themeSprings
}: {
	item: TriageItem;
	themeSprings: ThemeSprings;
}) => (
	<animated.div
		style={{
			border: themeSprings.themeTertiary.to(
				(color) => `1px solid ${color}`
			),
			borderRadius: '0.65rem',
			padding: '0.9rem 1.1rem'
		}}
	>
		<animated.div
			style={{
				alignItems: 'center',
				color: themeSprings.contrastPrimary,
				display: 'flex',
				fontSize: '0.92rem',
				fontWeight: 600,
				gap: '0.55rem',
				marginBottom: '0.6rem'
			}}
		>
			<span style={problemDotStyle} />
			{item.problem}
		</animated.div>
		<div style={{ display: 'grid', gap: '0.4rem' }}>
			{item.steps.map((step) => (
				<animated.div
					key={step.label}
					style={{
						alignItems: 'baseline',
						color: themeSprings.contrastSecondary,
						display: 'flex',
						fontSize: '0.87rem',
						gap: '0.75rem',
						lineHeight: 1.6
					}}
				>
					<span style={stepLabelStyle}>{step.label}</span>
					<span>{step.action}</span>
				</animated.div>
			))}
		</div>
	</animated.div>
);

export const TriageList = ({ items, themeSprings }: TriageListProps) => (
	<div style={{ display: 'grid', gap: '0.75rem', margin: '1rem 0 1.5rem' }}>
		{items.map((item) => (
			<TriageCard
				item={item}
				key={item.problem}
				themeSprings={themeSprings}
			/>
		))}
	</div>
);
