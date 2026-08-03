import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { FaShieldAlt, FaCubes } from 'react-icons/fa';
import { ThemeSprings } from '../../../../types/springTypes';
import { flagshipGuidanceByPackage } from '../../../data/documentation/packages/flagshipGuidance';
import { ecosystemProjects } from '../../../data/documentation/packages/ecosystem.generated';
import { featureCardStyle } from '../../../styles/gradientStyles';
import { StepFlow } from '../../utils/StepFlow';

const maximumGuidanceItems = 3;

const productionColor = '#F59E0B';

type GuidanceFeature = {
	description: string;
	details?: string[];
	title: string;
};

type PackageGuidanceSectionsProps = {
	isMobileOrTablet?: boolean;
	packageName: string;
	themeSprings: ThemeSprings;
};

const eyebrowStyle = (color: string): CSSProperties => ({
	alignItems: 'center',
	color,
	display: 'flex',
	fontSize: '0.72rem',
	fontWeight: 700,
	gap: '0.45rem',
	letterSpacing: '0.07em',
	marginBottom: '0.35rem',
	textTransform: 'uppercase'
});

const headingStyle: CSSProperties = {
	fontSize: '1.35rem',
	margin: '0 0 1rem'
};

const OutcomeCards = ({
	features,
	isMobileOrTablet,
	themeSprings
}: {
	features: GuidanceFeature[];
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

const ProductionChecklist = ({
	features,
	themeSprings
}: {
	features: GuidanceFeature[];
	themeSprings: ThemeSprings;
}) => (
	<div style={{ display: 'grid', gap: '0.6rem' }}>
		{features.map((feature) => (
			<div
				key={feature.title}
				style={{
					background: `${productionColor}0A`,
					borderLeft: `3px solid ${productionColor}66`,
					borderRadius: '0 0.5rem 0.5rem 0',
					display: 'flex',
					gap: '0.75rem',
					padding: '0.8rem 1rem'
				}}
			>
				<span
					style={{
						alignItems: 'center',
						background: `${productionColor}1F`,
						borderRadius: '0.45rem',
						color: productionColor,
						display: 'flex',
						flexShrink: 0,
						height: '1.7rem',
						justifyContent: 'center',
						marginTop: '0.1rem',
						width: '1.7rem'
					}}
				>
					<FaShieldAlt size={12} />
				</span>
				<div style={{ minWidth: 0 }}>
					<animated.strong
						style={{
							color: themeSprings.contrastPrimary,
							display: 'block',
							fontSize: '0.92rem',
							marginBottom: '0.2rem'
						}}
					>
						{feature.title}
					</animated.strong>
					<animated.span
						style={{
							color: themeSprings.contrastSecondary,
							fontSize: '0.87rem',
							lineHeight: 1.6
						}}
					>
						{feature.description}
					</animated.span>
				</div>
			</div>
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
		<div style={{ display: 'grid', gap: '2.25rem', marginTop: '1.5rem' }}>
			<section aria-labelledby="outcomes">
				<p style={eyebrowStyle('#6366F1')}>
					<FaCubes size={11} />
					Outcomes
				</p>
				<animated.h2
					id="outcomes"
					style={{
						color: themeSprings.contrastPrimary,
						...headingStyle
					}}
				>
					What you can build
				</animated.h2>
				<OutcomeCards
					features={guidance.outcomes}
					isMobileOrTablet={isMobileOrTablet}
					themeSprings={themeSprings}
				/>
			</section>

			<section aria-labelledby="production-guidance">
				<p style={eyebrowStyle(productionColor)}>
					<FaShieldAlt size={11} />
					Hardening checklist
				</p>
				<animated.h2
					id="production-guidance"
					style={{
						color: themeSprings.contrastPrimary,
						...headingStyle
					}}
				>
					Production guidance
				</animated.h2>
				<ProductionChecklist
					features={guidance.production}
					themeSprings={themeSprings}
				/>
			</section>

			<section aria-labelledby="diagnostics">
				<p style={eyebrowStyle('#10B981')}>Follow in order</p>
				<animated.h2
					id="diagnostics"
					style={{
						color: themeSprings.contrastPrimary,
						...headingStyle,
						marginBottom: 0
					}}
				>
					Troubleshooting path
				</animated.h2>
				<StepFlow
					steps={guidance.diagnostics.map((feature) => ({
						description: feature.description,
						title: feature.title
					}))}
					themeSprings={themeSprings}
				/>
			</section>
		</div>
	);
};
