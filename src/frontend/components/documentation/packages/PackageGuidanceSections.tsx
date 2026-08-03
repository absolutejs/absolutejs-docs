import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../types/springTypes';
import { flagshipGuidanceByPackage } from '../../../data/documentation/packages/flagshipGuidance';
import { ecosystemProjects } from '../../../data/documentation/packages/ecosystem.generated';
import { featureCardStyle } from '../../../styles/gradientStyles';

const maximumGuidanceItems = 3;

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
	const project = ecosystemProjects.find(
		(candidate) => candidate.packageName === packageName
	);
	const topics = project?.readmeTopics ?? [];
	const productionTopics = topics.filter((topic) =>
		/production|security|deploy|operations|readiness|hardening|durab/i.test(
			`${topic.title} ${topic.description}`
		)
	);
	const diagnosticTopics = topics.filter((topic) =>
		/troubleshoot|diagnos|failure|verify|testing|debug|recovery|error/i.test(
			`${topic.title} ${topic.description}`
		)
	);
	const guidance = flagshipGuidanceByPackage[packageName] ?? {
		diagnostics:
			diagnosticTopics.length > 0
				? diagnosticTopics.slice(0, maximumGuidanceItems)
				: [
						{
							description: `Reproduce the smallest canonical ${packageName} example, confirm the supported entry point and version in the API explorer, then inspect the first boundary that did not produce its documented result.`,
							title: 'Trace from the first failed boundary'
						}
					],
		outcomes:
			topics.length > 0
				? topics.slice(0, maximumGuidanceItems)
				: [
						{
							description:
								project?.description ??
								`Use ${packageName} through its supported public entry points.`,
							title: 'Build on the supported package contract'
						}
					],
		production:
			productionTopics.length > 0
				? productionTopics.slice(0, maximumGuidanceItems)
				: [
						{
							description: `Pin the deployed ${packageName} version, replace example or memory-backed dependencies with durable implementations, bound external calls, protect credentials, and emit enough evidence to retry or recover safely.`,
							title: 'Make every external boundary explicit'
						}
					]
	};

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
