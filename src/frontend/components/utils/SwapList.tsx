import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { ThemeSprings } from '../../../types/springTypes';

export type SwapItem = {
	after: string;
	before: string;
	reason: string;
};

type SwapListProps = {
	items: SwapItem[];
	themeSprings: ThemeSprings;
};

const swapAccent = '#F59E0B';

const stageChipStyle = (highlighted: boolean): CSSProperties => ({
	background: highlighted ? `${swapAccent}14` : 'rgba(99, 102, 241, 0.07)',
	border: highlighted
		? `1px solid ${swapAccent}4D`
		: '1px solid rgba(99, 102, 241, 0.22)',
	borderRadius: '0.4rem',
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.8rem',
	fontWeight: 600,
	padding: '0.3rem 0.6rem'
});

const stageLabelStyle: CSSProperties = {
	fontSize: '0.62rem',
	fontWeight: 700,
	letterSpacing: '0.07em',
	opacity: 0.65,
	textTransform: 'uppercase'
};

const SwapRow = ({
	item,
	themeSprings
}: {
	item: SwapItem;
	themeSprings: ThemeSprings;
}) => (
	<animated.div
		style={{
			background: `${swapAccent}08`,
			borderLeft: `3px solid ${swapAccent}59`,
			borderRadius: '0 0.5rem 0.5rem 0',
			color: themeSprings.contrastPrimary,
			padding: '0.8rem 1rem'
		}}
	>
		<div
			style={{
				alignItems: 'center',
				display: 'flex',
				flexWrap: 'wrap',
				gap: '0.6rem',
				marginBottom: '0.45rem'
			}}
		>
			<span style={{ display: 'grid', gap: '0.2rem' }}>
				<span style={stageLabelStyle}>Development</span>
				<span style={stageChipStyle(false)}>{item.before}</span>
			</span>
			<FaArrowRight color={swapAccent} size={12} />
			<span style={{ display: 'grid', gap: '0.2rem' }}>
				<span style={stageLabelStyle}>Production</span>
				<span style={stageChipStyle(true)}>{item.after}</span>
			</span>
		</div>
		<animated.span
			style={{
				color: themeSprings.contrastSecondary,
				fontSize: '0.87rem',
				lineHeight: 1.6
			}}
		>
			{item.reason}
		</animated.span>
	</animated.div>
);

export const SwapList = ({ items, themeSprings }: SwapListProps) => (
	<div style={{ display: 'grid', gap: '0.65rem', margin: '1rem 0 1.5rem' }}>
		{items.map((item) => (
			<SwapRow
				item={item}
				key={item.before}
				themeSprings={themeSprings}
			/>
		))}
	</div>
);
