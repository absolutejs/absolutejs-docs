import { ThemeSprings } from '../../../../types/springTypes';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { FeatureCard } from './FeatureCard';

type StaticGenerationFeatureCardsProps = {
	themeSprings: ThemeSprings;
};

export const StaticGenerationFeatureCards = ({
	themeSprings
}: StaticGenerationFeatureCardsProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'grid',
				gap: '1rem',
				gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
				marginBottom: '1.5rem',
				marginTop: '1.5rem'
			}}
		>
			<FeatureCard
				description="Pre-rendered HTML is served directly from disk : no SSR computation on each request."
				themeSprings={themeSprings}
				title="Instant Loads"
			/>
			<FeatureCard
				description="Pages still hydrate on the client: same interactive experience, just faster initial load."
				themeSprings={themeSprings}
				title="Client Hydration"
			/>
			<FeatureCard
				description="Routes not in the static config still use SSR on demand: mix static and dynamic pages freely."
				themeSprings={themeSprings}
				title="SSR Fallback"
			/>
		</div>
	);
};
