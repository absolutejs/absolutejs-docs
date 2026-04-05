import { animated } from '@react-spring/web';
import { ComponentType } from 'react';
import { ThemeSprings } from '../../../../types/springTypes';

type OverviewFrameworkCardProps = {
	color: string;
	description: string;
	icon: ComponentType<{ color: string; size: number; style: object }>;
	name: string;
	themeSprings: ThemeSprings;
};

export const OverviewFrameworkCard = ({
	color,
	description,
	icon: Icon,
	name,
	themeSprings
}: OverviewFrameworkCardProps) => (
	<animated.div
		style={{
			alignItems: 'center',
			background: themeSprings.theme.to((theme) =>
				theme.endsWith('dark')
					? 'rgba(30, 30, 46, 0.6)'
					: 'rgba(255, 255, 255, 0.8)'
			),
			border: themeSprings.themeTertiary.to((c) => `1px solid ${c}`),
			borderLeft: `3px solid ${color}`,
			borderRadius: '0.5rem',
			display: 'flex',
			gap: '0.75rem',
			padding: '0.75rem 1rem'
		}}
	>
		<Icon color={color} size={24} style={{ flexShrink: 0 }} />
		<div style={{ minWidth: 0 }}>
			<p
				style={{
					fontSize: '0.9rem',
					fontWeight: 600,
					margin: 0
				}}
			>
				{name}
			</p>
			<animated.p
				style={{
					color: themeSprings.theme.to((theme) =>
						theme.endsWith('dark')
							? 'rgba(232, 232, 236, 0.6)'
							: 'rgba(42, 42, 50, 0.6)'
					),
					fontSize: '0.75rem',
					lineHeight: 1.4,
					margin: 0
				}}
			>
				{description}
			</animated.p>
		</div>
	</animated.div>
);
