import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../types/springTypes';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { paragraphSpacedStyle, strongStyle } from '../../../styles/docsStyles';
import { featureCardStyle } from '../../../styles/gradientStyles';

type AssetTypeCardsProps = {
	themeSprings: ThemeSprings;
};

export const AssetTypeCards = ({ themeSprings }: AssetTypeCardsProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'grid',
				gap: '1rem',
				gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
				marginBottom: '1.5rem',
				marginTop: '1rem'
			}}
		>
			<animated.div style={featureCardStyle(themeSprings)}>
				<p
					style={{
						...paragraphSpacedStyle,
						marginBottom: '0.5rem'
					}}
				>
					<strong style={strongStyle}>JavaScript</strong>
				</p>
				<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
					<code>.js</code> files are bundled and minified
				</p>
			</animated.div>
			<animated.div style={featureCardStyle(themeSprings)}>
				<p
					style={{
						...paragraphSpacedStyle,
						marginBottom: '0.5rem'
					}}
				>
					<strong style={strongStyle}>TypeScript</strong>
				</p>
				<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
					<code>.ts</code> files are compiled to JS and bundled
				</p>
			</animated.div>
			<animated.div style={featureCardStyle(themeSprings)}>
				<p
					style={{
						...paragraphSpacedStyle,
						marginBottom: '0.5rem'
					}}
				>
					<strong style={strongStyle}>CSS</strong>
				</p>
				<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
					<code>.css</code> files are bundled and minified
				</p>
			</animated.div>
		</div>
	);
};
