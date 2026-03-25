import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';

type AuroraBackgroundProps = {
	themeSprings: ThemeSprings;
};

export const AuroraBackground = ({ themeSprings }: AuroraBackgroundProps) => (
	<animated.div
		style={{
			animation: 'aurora 60s ease infinite',
			background: themeSprings.theme.to((t) =>
				t.endsWith('dark')
					? [
							'radial-gradient(ellipse 80% 50% at 10% 20%, rgba(99,102,241,0.15) 0%, transparent 50%)',
							'radial-gradient(ellipse 60% 60% at 85% 70%, rgba(232,121,249,0.1) 0%, transparent 50%)',
							'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(94,234,212,0.08) 0%, transparent 50%)',
							'radial-gradient(ellipse 50% 70% at 30% 80%, rgba(96,165,250,0.1) 0%, transparent 50%)',
							'radial-gradient(ellipse 60% 40% at 70% 15%, rgba(129,140,248,0.12) 0%, transparent 50%)',
							'radial-gradient(ellipse 40% 60% at 90% 40%, rgba(167,139,250,0.08) 0%, transparent 50%)'
						].join(', ')
					: [
							'radial-gradient(ellipse 80% 50% at 10% 20%, rgba(99,102,241,0.07) 0%, transparent 50%)',
							'radial-gradient(ellipse 60% 60% at 85% 70%, rgba(232,121,249,0.05) 0%, transparent 50%)',
							'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(94,234,212,0.04) 0%, transparent 50%)',
							'radial-gradient(ellipse 50% 70% at 30% 80%, rgba(96,165,250,0.05) 0%, transparent 50%)',
							'radial-gradient(ellipse 60% 40% at 70% 15%, rgba(129,140,248,0.06) 0%, transparent 50%)',
							'radial-gradient(ellipse 40% 60% at 90% 40%, rgba(167,139,250,0.04) 0%, transparent 50%)'
						].join(', ')
			),
			backgroundSize: '200% 200%, 200% 200%, 150% 150%',
			inset: 0,
			pointerEvents: 'none',
			position: 'fixed',
			zIndex: 0
		}}
	/>
);
