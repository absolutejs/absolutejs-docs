import { animated } from '@react-spring/web';
import { ReactNode } from 'react';
import { ThemeSprings } from '../../../../types/springTypes';
import { paragraphSpacedStyle, strongStyle } from '../../../styles/docsStyles';
import { featureCardStyle } from '../../../styles/gradientStyles';

type CreateAbsoluteJSFeatureCardProps = {
	children: ReactNode;
	themeSprings: ThemeSprings;
	title: string;
};

export const CreateAbsoluteJSFeatureCard = ({
	children,
	themeSprings,
	title
}: CreateAbsoluteJSFeatureCardProps) => (
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
