import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../types/springTypes';
import { paragraphSpacedStyle, strongStyle } from '../../../styles/docsStyles';
import { featureCardStyle } from '../../../styles/gradientStyles';

type ScopedStateFeature = {
	description: string;
	title: string;
};

const features: ScopedStateFeature[] = [
	{
		description:
			"Each user gets their own state slice. Button clicks and interactions only affect that user's data.",
		title: 'Per-User Isolation'
	},
	{
		description:
			'A secure session cookie is automatically created on first visit. No manual session management required.',
		title: 'Automatic Sessions'
	},
	{
		description:
			'Ideal for HTMX apps where server endpoints need to maintain user-specific state across partial page updates.',
		title: 'HTMX Perfect'
	},
	{
		description:
			'Full TypeScript support with typed state access through the scopedStore context property.',
		title: 'Type Safe'
	}
];

type ScopedStateFeatureCardsProps = ThemeProps & {
	isMobile: boolean;
};

export const ScopedStateFeatureCards = ({
	isMobile,
	themeSprings
}: ScopedStateFeatureCardsProps) => (
	<div
		style={{
			display: 'grid',
			gap: '1rem',
			gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
			marginBottom: '1.5rem',
			marginTop: '1rem'
		}}
	>
		{features.map((feature, index) => (
			<animated.div key={index} style={featureCardStyle(themeSprings)}>
				<p
					style={{
						...paragraphSpacedStyle,
						marginBottom: '0.5rem'
					}}
				>
					<strong style={strongStyle}>{feature.title}</strong>
				</p>
				<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
					{feature.description}
				</p>
			</animated.div>
		))}
	</div>
);
