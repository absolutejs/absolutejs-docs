import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../types/springTypes';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { strongStyle } from '../../../styles/docsStyles';
import { featureCardStyle } from '../../../styles/gradientStyles';

type QuickstartFeatureCardsProps = {
	themeSprings: ThemeSprings;
};

export const QuickstartFeatureCards = ({
	themeSprings
}: QuickstartFeatureCardsProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'grid',
				gap: '0.75rem',
				gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
				marginTop: '1rem'
			}}
		>
			<animated.div style={featureCardStyle(themeSprings)}>
				<p
					style={{
						fontWeight: 600,
						marginBottom: '0.25rem'
					}}
				>
					<strong style={strongStyle}>Auth</strong>
				</p>
				<p style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
					Google OAuth with session management
				</p>
			</animated.div>
			<animated.div style={featureCardStyle(themeSprings)}>
				<p
					style={{
						fontWeight: 600,
						marginBottom: '0.25rem'
					}}
				>
					<strong style={strongStyle}>SSR + DB</strong>
				</p>
				<p style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
					Server-rendered pages with Drizzle types
				</p>
			</animated.div>
			<animated.div style={featureCardStyle(themeSprings)}>
				<p
					style={{
						fontWeight: 600,
						marginBottom: '0.25rem'
					}}
				>
					<strong style={strongStyle}>API + Client</strong>
				</p>
				<p style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
					Validated endpoints with Eden Treaty
				</p>
			</animated.div>
		</div>
	);
};
