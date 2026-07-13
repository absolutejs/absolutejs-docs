import { animated } from '@react-spring/web';
import { CSSProperties, ReactNode } from 'react';
import { ThemeSprings } from '../../../types/springTypes';
import { primaryColor } from '../../styles/colors';

export type VersionTimelineEntry = {
	description?: ReactNode;
	highlight?: boolean;
	title: string;
	version: string;
};

type VersionTimelineProps = {
	entries: VersionTimelineEntry[];
	themeSprings: ThemeSprings;
};

const versionPillStyle = (highlight?: boolean): CSSProperties => ({
	background: highlight ? primaryColor : 'rgba(99, 102, 241, 0.12)',
	border: `1px solid ${highlight ? primaryColor : 'rgba(99, 102, 241, 0.3)'}`,
	borderRadius: '999px',
	color: highlight ? '#FFFFFF' : primaryColor,
	flexShrink: 0,
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.72rem',
	fontVariantNumeric: 'tabular-nums',
	fontWeight: 600,
	padding: '0.15rem 0.65rem',
	whiteSpace: 'nowrap',
	zIndex: 1
});

const TimelineEntry = ({
	entry,
	isLast,
	themeSprings
}: {
	entry: VersionTimelineEntry;
	isLast: boolean;
	themeSprings: ThemeSprings;
}) => (
	<div style={{ display: 'flex', gap: '1rem' }}>
		<div
			style={{
				alignItems: 'center',
				display: 'flex',
				flexDirection: 'column',
				minWidth: '4.5rem'
			}}
		>
			<span style={versionPillStyle(entry.highlight)}>
				{entry.version}
			</span>
			{isLast ? null : (
				<span
					style={{
						background:
							'linear-gradient(180deg, rgba(99,102,241,0.35) 0%, rgba(99,102,241,0.12) 100%)',
						flex: 1,
						minHeight: '0.75rem',
						width: '2px'
					}}
				/>
			)}
		</div>
		<div
			style={{
				flex: 1,
				minWidth: 0,
				paddingBottom: isLast ? 0 : '1.1rem'
			}}
		>
			<animated.div
				style={{
					color: themeSprings.contrastPrimary,
					fontSize: '0.95rem',
					fontWeight: 600,
					lineHeight: 1.5
				}}
			>
				{entry.title}
			</animated.div>
			{entry.description ? (
				<animated.div
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: '0.875rem',
						lineHeight: 1.6,
						marginTop: '0.15rem'
					}}
				>
					{entry.description}
				</animated.div>
			) : null}
		</div>
	</div>
);

export const VersionTimeline = ({
	entries,
	themeSprings
}: VersionTimelineProps) => (
	<div style={{ margin: '1.25rem 0 1.5rem' }}>
		{entries.map((entry, index) => (
			<TimelineEntry
				entry={entry}
				isLast={index === entries.length - 1}
				key={entry.version}
				themeSprings={themeSprings}
			/>
		))}
	</div>
);
