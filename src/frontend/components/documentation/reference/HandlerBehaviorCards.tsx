import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../types/springTypes';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { featureCardStyle } from '../../../styles/gradientStyles';

type HandlerBehaviorCardsProps = ThemeProps;

export const HandlerBehaviorCards = ({
	themeSprings
}: HandlerBehaviorCardsProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'grid',
				gap: '1rem',
				gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
				marginBottom: '1.5rem',
				marginTop: '1rem'
			}}
		>
			<animated.div style={featureCardStyle(themeSprings)}>
				<p
					style={{
						fontWeight: 600,
						marginBottom: '0.5rem'
					}}
				>
					Framework Handlers
				</p>
				<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
					React, Angular, Svelte, Vue handlers perform server-side
					rendering and return hydrated HTML.
				</p>
			</animated.div>
			<animated.div style={featureCardStyle(themeSprings)}>
				<p
					style={{
						fontWeight: 600,
						marginBottom: '0.5rem'
					}}
				>
					Static Handlers
				</p>
				<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
					HTML and HTMX handlers serve pre-built files directly
					without SSR processing.
				</p>
			</animated.div>
		</div>
	);
};
