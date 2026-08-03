import { animated } from '@react-spring/web';
import { CSSProperties, ReactNode } from 'react';
import { ThemeSprings } from '../../../types/springTypes';

export type DefinitionTone =
	| 'error'
	| 'info'
	| 'neutral'
	| 'success'
	| 'warning';

export type DefinitionItem = {
	badge?: string;
	description: ReactNode;
	href?: string;
	term: string;
	tone?: DefinitionTone;
};

type DefinitionGridProps = {
	items: DefinitionItem[];
	themeSprings: ThemeSprings;
};

const toneColors: Record<DefinitionTone, string> = {
	error: '#EF4444',
	info: '#6366F1',
	neutral: '#64748B',
	success: '#10B981',
	warning: '#F59E0B'
};

const termChipStyle = (color: string): CSSProperties => ({
	alignSelf: 'flex-start',
	background: `${color}14`,
	border: `1px solid ${color}3D`,
	borderRadius: '0.4rem',
	color: 'inherit',
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.8rem',
	fontWeight: 600,
	padding: '0.25rem 0.55rem',
	textDecoration: 'none',
	whiteSpace: 'nowrap'
});

const badgeStyle = (color: string): CSSProperties => ({
	border: `1px solid ${color}4D`,
	borderRadius: '999px',
	color,
	fontSize: '0.65rem',
	fontWeight: 600,
	letterSpacing: '0.04em',
	padding: '0.1rem 0.5rem',
	textTransform: 'uppercase',
	whiteSpace: 'nowrap'
});

const DefinitionRow = ({
	item,
	themeSprings
}: {
	item: DefinitionItem;
	themeSprings: ThemeSprings;
}) => {
	const color = toneColors[item.tone ?? 'info'];
	const term = item.href ? (
		<a href={item.href} style={termChipStyle(color)}>
			{item.term}
		</a>
	) : (
		<span style={termChipStyle(color)}>{item.term}</span>
	);

	return (
		<animated.div
			style={{
				alignItems: 'baseline',
				borderBottom: themeSprings.themeTertiary.to(
					(borderColor) => `1px solid ${borderColor}`
				),
				display: 'flex',
				flexWrap: 'wrap',
				gap: '0.5rem 1.25rem',
				padding: '0.7rem 0'
			}}
		>
			<span
				style={{
					alignItems: 'baseline',
					display: 'flex',
					flexWrap: 'wrap',
					gap: '0.45rem',
					minWidth: '160px'
				}}
			>
				{term}
				{item.badge ? (
					<span style={badgeStyle(color)}>{item.badge}</span>
				) : null}
			</span>
			<animated.span
				style={{
					color: themeSprings.contrastSecondary,
					flex: '1 1 280px',
					fontSize: '0.9rem',
					lineHeight: 1.65
				}}
			>
				{item.description}
			</animated.span>
		</animated.div>
	);
};

export const DefinitionGrid = ({
	items,
	themeSprings
}: DefinitionGridProps) => (
	<div style={{ margin: '1rem 0 1.5rem' }}>
		{items.map((item) => (
			<DefinitionRow
				item={item}
				key={item.term}
				themeSprings={themeSprings}
			/>
		))}
	</div>
);
