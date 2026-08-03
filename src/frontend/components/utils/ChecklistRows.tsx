import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { FaCheck, FaRegDotCircle } from 'react-icons/fa';
import { ThemeSprings } from '../../../types/springTypes';

export type ChecklistTone = 'info' | 'success';

type ChecklistRowsProps = {
	items: string[];
	themeSprings: ThemeSprings;
	tone?: ChecklistTone;
};

const toneColors: Record<ChecklistTone, string> = {
	info: '#6366F1',
	success: '#10B981'
};

const iconSize = 10;

const markerStyle = (color: string): CSSProperties => ({
	alignItems: 'center',
	background: `${color}1A`,
	borderRadius: '50%',
	color,
	display: 'flex',
	flexShrink: 0,
	height: '1.35rem',
	justifyContent: 'center',
	marginTop: '0.15rem',
	width: '1.35rem'
});

export const ChecklistRows = ({
	items,
	themeSprings,
	tone = 'info'
}: ChecklistRowsProps) => {
	const color = toneColors[tone];

	return (
		<div
			style={{ display: 'grid', gap: '0.55rem', margin: '1rem 0 1.5rem' }}
		>
			{items.map((item) => (
				<animated.div
					key={item}
					style={{
						color: themeSprings.contrastSecondary,
						display: 'flex',
						fontSize: '0.9rem',
						gap: '0.7rem',
						lineHeight: 1.65
					}}
				>
					<span style={markerStyle(color)}>
						{tone === 'success' ? (
							<FaCheck size={iconSize} />
						) : (
							<FaRegDotCircle size={iconSize} />
						)}
					</span>
					<span>{item}</span>
				</animated.div>
			))}
		</div>
	);
};
