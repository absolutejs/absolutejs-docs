import { ReactNode } from 'react';
import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../types/springTypes';
import { featureCardStyle } from '../../../styles/gradientStyles';

type HTMXAIHowItWorksCardProps = {
	description: ReactNode;
	icon: ReactNode;
	themeSprings: ThemeSprings;
	title: string;
};

export const HTMXAIHowItWorksCard = ({
	description,
	icon,
	themeSprings,
	title
}: HTMXAIHowItWorksCardProps) => (
	<animated.div
		style={{
			...featureCardStyle(themeSprings),
			textAlign: 'center'
		}}
	>
		{icon}
		<div
			style={{
				fontSize: '1rem',
				fontWeight: 600,
				marginBottom: '0.25rem'
			}}
		>
			{title}
		</div>
		<div
			style={{
				fontSize: '0.85rem',
				opacity: 0.75
			}}
		>
			{description}
		</div>
	</animated.div>
);
