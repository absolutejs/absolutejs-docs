import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../types/springTypes';
import { flagshipGuidanceByPackage } from '../../../data/documentation/packages/flagshipGuidance';
import { featureCardStyle } from '../../../styles/gradientStyles';

type PackageGuidanceSectionsProps = {
	isMobileOrTablet?: boolean;
	packageName: string;
	themeSprings: ThemeSprings;
};

const GuidanceCards = ({
	features,
	isMobileOrTablet,
	themeSprings
}: {
	features: { description: string; title: string }[];
	isMobileOrTablet?: boolean;
	themeSprings: ThemeSprings;
}) => (
	<div
		style={{
			display: 'grid',
			gap: '1rem',
			gridTemplateColumns: isMobileOrTablet
				? '1fr'
				: 'repeat(auto-fit, minmax(250px, 1fr))'
		}}
	>
		{features.map((feature) => (
			<animated.article
				key={feature.title}
				style={featureCardStyle(themeSprings)}
			>
				<animated.h3
					style={{
						color: themeSprings.contrastPrimary,
						fontSize: '1rem',
						margin: '0 0 0.55rem'
					}}
				>
					{feature.title}
				</animated.h3>
				<animated.p
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: '0.9rem',
						lineHeight: 1.65,
						margin: 0
					}}
				>
					{feature.description}
				</animated.p>
			</animated.article>
		))}
	</div>
);

export const PackageGuidanceSections = ({
	isMobileOrTablet,
	packageName,
	themeSprings
}: PackageGuidanceSectionsProps) => {
	const guidance = flagshipGuidanceByPackage[packageName];
	if (!guidance) return null;

	return (
		<div style={{ display: 'grid', gap: '2rem', marginTop: '1.5rem' }}>
			<section aria-labelledby="outcomes">
				<animated.h2
					id="outcomes"
					style={{
						color: themeSprings.contrastPrimary,
						fontSize: '1.35rem',
						margin: '0 0 1rem'
					}}
				>
					What you can build
				</animated.h2>
				<GuidanceCards
					features={guidance.outcomes}
					isMobileOrTablet={isMobileOrTablet}
					themeSprings={themeSprings}
				/>
			</section>

			<section aria-labelledby="production-guidance">
				<animated.h2
					id="production-guidance"
					style={{
						color: themeSprings.contrastPrimary,
						fontSize: '1.35rem',
						margin: '0 0 1rem'
					}}
				>
					Production guidance
				</animated.h2>
				<GuidanceCards
					features={guidance.production}
					isMobileOrTablet={isMobileOrTablet}
					themeSprings={themeSprings}
				/>
			</section>

			<section aria-labelledby="diagnostics">
				<animated.h2
					id="diagnostics"
					style={{
						color: themeSprings.contrastPrimary,
						fontSize: '1.35rem',
						margin: '0 0 1rem'
					}}
				>
					Troubleshooting path
				</animated.h2>
				<GuidanceCards
					features={guidance.diagnostics}
					isMobileOrTablet={isMobileOrTablet}
					themeSprings={themeSprings}
				/>
			</section>
		</div>
	);
};
