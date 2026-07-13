import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { ThemeSprings } from '../../../types/springTypes';
import { primaryColor } from '../../styles/colors';

export type StatTile = {
	detail?: string;
	label: string;
	unit?: string;
	value: string;
};

type StatBandProps = {
	stats: StatTile[];
	themeSprings: ThemeSprings;
};

const tickStyle: CSSProperties = {
	background: primaryColor,
	borderRadius: '2px',
	flexShrink: 0,
	height: '1.6rem',
	width: '3px'
};

const StatTileCard = ({
	stat,
	themeSprings
}: {
	stat: StatTile;
	themeSprings: ThemeSprings;
}) => (
	<animated.div
		style={{
			background: themeSprings.theme.to((theme) =>
				theme.endsWith('dark')
					? 'rgba(99, 102, 241, 0.06)'
					: 'rgba(99, 102, 241, 0.04)'
			),
			border: themeSprings.themeTertiary.to(
				(color) => `1px solid ${color}`
			),
			borderRadius: '0.75rem',
			flex: '1 1 160px',
			minWidth: '150px',
			padding: '1rem 1.25rem'
		}}
	>
		<animated.div
			style={{
				color: themeSprings.contrastSecondary,
				fontSize: '0.7rem',
				fontWeight: 600,
				letterSpacing: '0.07em',
				marginBottom: '0.5rem',
				textTransform: 'uppercase'
			}}
		>
			{stat.label}
		</animated.div>
		<div
			style={{
				alignItems: 'center',
				display: 'flex',
				gap: '0.6rem'
			}}
		>
			<span style={tickStyle} />
			<animated.span
				style={{
					color: themeSprings.contrastPrimary,
					fontSize: '1.75rem',
					fontVariantNumeric: 'tabular-nums',
					fontWeight: 700,
					letterSpacing: '-0.02em',
					lineHeight: 1.1
				}}
			>
				{stat.value}
				{stat.unit ? (
					<span
						style={{
							fontSize: '0.95rem',
							fontWeight: 500,
							marginLeft: '0.25rem',
							opacity: 0.7
						}}
					>
						{stat.unit}
					</span>
				) : null}
			</animated.span>
		</div>
		{stat.detail ? (
			<animated.div
				style={{
					color: themeSprings.contrastSecondary,
					fontSize: '0.8rem',
					lineHeight: 1.5,
					marginTop: '0.5rem'
				}}
			>
				{stat.detail}
			</animated.div>
		) : null}
	</animated.div>
);

export const StatBand = ({ stats, themeSprings }: StatBandProps) => (
	<div
		style={{
			display: 'flex',
			flexWrap: 'wrap',
			gap: '0.75rem',
			margin: '1.25rem 0 1.5rem'
		}}
	>
		{stats.map((stat) => (
			<StatTileCard
				key={stat.label}
				stat={stat}
				themeSprings={themeSprings}
			/>
		))}
	</div>
);
