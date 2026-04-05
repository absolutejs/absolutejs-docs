import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../types/springTypes';
import { paragraphSpacedStyle, strongStyle } from '../../../styles/docsStyles';
import { featureCardStyle } from '../../../styles/gradientStyles';

type FeatureCardProps = {
	themeSprings: ThemeSprings;
	title: string;
	description: string;
};

export const FeatureCard = ({
	themeSprings,
	title,
	description
}: FeatureCardProps) => (
	<animated.div style={featureCardStyle(themeSprings)}>
		<p
			style={{
				...paragraphSpacedStyle,
				marginBottom: '0.5rem'
			}}
		>
			<strong style={strongStyle}>{title}</strong>
		</p>
		<p
			style={{
				fontSize: '0.95rem',
				lineHeight: 1.6
			}}
		>
			{description}
		</p>
	</animated.div>
);
