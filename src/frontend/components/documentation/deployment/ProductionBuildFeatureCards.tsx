import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../types/springTypes';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { paragraphSpacedStyle, strongStyle } from '../../../styles/docsStyles';
import { featureCardStyle } from '../../../styles/gradientStyles';

type ProductionBuildFeatureCardsProps = {
	themeSprings: ThemeSprings;
};

export const ProductionBuildFeatureCards = ({
	themeSprings
}: ProductionBuildFeatureCardsProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'grid',
				gap: '1rem',
				gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
				marginBottom: '1.5rem',
				marginTop: '1.5rem'
			}}
		>
			<animated.div style={featureCardStyle(themeSprings)}>
				<p
					style={{
						...paragraphSpacedStyle,
						marginBottom: '0.5rem'
					}}
				>
					<strong style={strongStyle}>Bundled Assets</strong>
				</p>
				<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
					All frontend code is bundled and minified for optimal load
					times.
				</p>
			</animated.div>
			<animated.div style={featureCardStyle(themeSprings)}>
				<p
					style={{
						...paragraphSpacedStyle,
						marginBottom: '0.5rem'
					}}
				>
					<strong style={strongStyle}>Cache Busting</strong>
				</p>
				<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
					Hashed filenames ensure browsers always get the latest
					version.
				</p>
			</animated.div>
		</div>
	);
};
