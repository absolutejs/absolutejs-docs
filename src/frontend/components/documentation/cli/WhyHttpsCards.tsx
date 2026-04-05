import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../types/springTypes';
import { paragraphSpacedStyle, strongStyle } from '../../../styles/docsStyles';
import { featureCardStyle } from '../../../styles/gradientStyles';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

type WhyHttpsCardsProps = {
	themeSprings: ThemeSprings;
};

const FeatureCard = ({
	themeSprings,
	title,
	description
}: {
	themeSprings: ThemeSprings;
	title: string;
	description: string;
}) => (
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

export const WhyHttpsCards = ({ themeSprings }: WhyHttpsCardsProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'grid',
				gap: '1rem',
				gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
				marginBottom: '1.5rem',
				marginTop: '1rem'
			}}
		>
			<FeatureCard
				description="Faster HMR on pages with many imports: HTTP/2 sends all modules over a single connection."
				themeSprings={themeSprings}
				title="HTTP/2 Multiplexing"
			/>
			<FeatureCard
				description="Test APIs that require HTTPS like service workers, Web Crypto, and geolocation."
				themeSprings={themeSprings}
				title="Secure Context APIs"
			/>
			<FeatureCard
				description="Catch mixed-content issues and CORS problems before they hit production."
				themeSprings={themeSprings}
				title="Production Parity"
			/>
		</div>
	);
};
