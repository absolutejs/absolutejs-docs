import { animated } from '@react-spring/web';
import { ReactNode } from 'react';
import { ThemeSprings } from '../../../../types/springTypes';
import { paragraphSpacedStyle, strongStyle } from '../../../styles/docsStyles';
import { featureCardStyle } from '../../../styles/gradientStyles';

type TypeSafetyFeatureCardProps = {
	children: ReactNode;
	themeSprings: ThemeSprings;
	title: string;
};

export const TypeSafetyFeatureCard = ({
	children,
	themeSprings,
	title
}: TypeSafetyFeatureCardProps) => (
	<animated.div style={featureCardStyle(themeSprings)}>
		<p
			style={{
				...paragraphSpacedStyle,
				marginBottom: '0.5rem'
			}}
		>
			<strong style={strongStyle}>{title}</strong>
		</p>
		<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{children}</p>
	</animated.div>
);
