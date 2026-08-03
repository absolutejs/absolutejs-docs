import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import {
	PackageAdapterGroup,
	PackageCodeSample,
	PackageDocData,
	PackageFeature,
	PackageStatus
} from '../../../../types/packageDocs';
import { DocsViewProps, ThemeSprings } from '../../../../types/springTypes';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	tableCodeStyle
} from '../../../styles/docsStyles';
import {
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { Callout } from '../../utils/Callout';
import { DocsTable } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { DocsNavigation } from '../DocsNavigation';
import { synchronizePackageDocData } from '../../../data/documentation/packages/ecosystemVersions';
import { PackageGuidanceSections } from './PackageGuidanceSections';
import { PackageApiExplorer } from './PackageApiExplorer';
import { PackageExplanationBlocks } from './PackageExplanationBlocks';
import { DocumentationModeNav } from './DocumentationModeNav';
import { playbooksForView } from '../../../data/documentation/outcomePlaybooks';

const statusColors: Record<PackageStatus, string> = {
	alpha: '#F59E0B',
	beta: '#8B5CF6',
	stable: '#10B981'
};

const noop = () => undefined;

const slugify = (value: string) =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

const badgeRowStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flexWrap: 'wrap',
	gap: '0.6rem',
	marginBottom: '1rem'
};

const pillStyle = (color: string): CSSProperties => ({
	background: `${color}1A`,
	border: `1px solid ${color}55`,
	borderRadius: '999px',
	color,
	fontSize: '0.75rem',
	fontWeight: 600,
	letterSpacing: '0.03em',
	padding: '0.2rem 0.7rem'
});

type PackageFeatureCardProps = {
	feature: PackageFeature;
	themeSprings: ThemeSprings;
};

const PackageFeatureCard = ({
	feature,
	themeSprings
}: PackageFeatureCardProps) => (
	<animated.div style={featureCardStyle(themeSprings)}>
		<animated.h3
			style={{
				color: themeSprings.contrastPrimary,
				fontSize: '1rem',
				fontWeight: 600,
				marginBottom: '0.5rem'
			}}
		>
			{feature.title}
		</animated.h3>
		<animated.p
			style={{
				color: themeSprings.contrastSecondary,
				fontSize: '0.9rem',
				lineHeight: 1.6
			}}
		>
			{feature.description}
		</animated.p>
		{feature.details && feature.details.length > 0 ? (
			<animated.ul
				style={{
					color: themeSprings.contrastSecondary,
					fontSize: '0.86rem',
					lineHeight: 1.55,
					margin: '0.65rem 0 0',
					paddingLeft: '1.15rem'
				}}
			>
				{feature.details.map((detail) => (
					<li key={detail}>{detail}</li>
				))}
			</animated.ul>
		) : null}
	</animated.div>
);

type PackageHeroProps = {
	data: PackageDocData;
	heroId: string;
	isMobileOrTablet?: boolean;
	themeSprings: ThemeSprings;
};

const PackageHero = ({
	data,
	heroId,
	isMobileOrTablet,
	themeSprings
}: PackageHeroProps) => (
	<animated.div style={heroGradientStyle(themeSprings)}>
		<h1 id={heroId} style={h1Style(isMobileOrTablet)}>
			{data.name}
		</h1>
		<div style={badgeRowStyle}>
			<code style={tableCodeStyle}>{data.npmName}</code>
			<span style={pillStyle('#6366F1')}>
				{data.version === 'workspace'
					? 'workspace'
					: `v${data.version}`}
			</span>
			<span style={pillStyle(statusColors[data.status])}>
				{data.status}
			</span>
			<animated.span
				style={{
					color: themeSprings.contrastSecondary,
					fontSize: '0.8rem'
				}}
			>
				{data.category}
			</animated.span>
		</div>
		<p style={paragraphLargeStyle}>{data.tagline}</p>
	</animated.div>
);

const adapterRows = (group: PackageAdapterGroup) =>
	group.items.map((item) => [
		{
			code: item.name,
			href: item.href,
			suffix: item.version ? `v${item.version}` : ''
		},
		item.description
	]);

const SampleSection = ({
	sample,
	themeSprings
}: {
	sample: PackageCodeSample;
	themeSprings: ThemeSprings;
}) => {
	const intent = sample.intent ?? 'partial';
	const intentLabel = {
		partial: 'Partial snippet',
		production: 'Production sketch',
		runnable: 'Runnable'
	}[intent];

	return (
		<section style={sectionStyle}>
			<AnchorHeading
				id={slugify(sample.heading)}
				level="h2"
				style={gradientHeadingStyle(themeSprings)}
				themeSprings={themeSprings}
			>
				{sample.heading}
			</AnchorHeading>
			<span
				style={pillStyle(intent === 'runnable' ? '#10B981' : '#6366F1')}
			>
				{intentLabel}
			</span>
			<p style={paragraphSpacedStyle}>{sample.description}</p>
			{sample.prerequisites && sample.prerequisites.length > 0 ? (
				<ul>
					{sample.prerequisites.map((prerequisite) => (
						<li key={prerequisite}>{prerequisite}</li>
					))}
				</ul>
			) : null}
			<PrismPlus
				codeString={sample.code}
				language={sample.language}
				showLineNumbers={sample.language !== 'bash'}
				themeSprings={themeSprings}
			/>
			{sample.expectedResult ? (
				<Callout
					themeSprings={themeSprings}
					title="Proof of success"
					variant="success"
				>
					{sample.expectedResult}
				</Callout>
			) : null}
		</section>
	);
};

type PackageOverviewTemplateProps = DocsViewProps & {
	data: PackageDocData;
};

export const createPackageView = (data: PackageDocData) => {
	const PackageView = (props: DocsViewProps) => (
		<PackageOverviewTemplate data={data} {...props} />
	);

	return PackageView;
};

export const PackageOverviewTemplate = ({
	currentPageId,
	data,
	isMobileOrTablet,
	onNavigate,
	onTocToggle,
	themeSprings,
	tocOpen
}: PackageOverviewTemplateProps) => {
	const currentData = synchronizePackageDocData(data);
	const runnableSamples = currentData.samples.filter(
		(sample) => sample.intent === 'runnable'
	);
	const referenceSamples = currentData.samples.filter(
		(sample) => sample.intent !== 'runnable'
	);
	const sourceHref = currentData.links?.find(
		(link) => link.label === 'Source'
	)?.href;
	const playbookLinks = playbooksForView(currentPageId).map((playbook) => ({
		href: `/documentation/${playbook.id}`,
		label: playbook.title
	}));
	const heroId = slugify(`${currentData.name}-overview`);
	const tocItems: TocItem[] = [
		{ href: `#${heroId}`, label: 'Overview' },
		{ href: '#installation', label: 'Installation' },
		...(currentData.features.length > 0
			? [{ href: '#capabilities', label: 'Capabilities' }]
			: []),
		{ href: '#outcomes', label: 'What you can build' },
		{
			href: '#production-guidance',
			label: 'Production guidance'
		},
		{ href: '#diagnostics', label: 'Troubleshooting' },
		...currentData.samples.map((sample) => ({
			href: `#${slugify(sample.heading)}`,
			label: sample.heading
		})),
		...(currentData.adapterGroups ?? []).map((group) => ({
			href: `#${slugify(group.heading)}`,
			label: group.heading
		})),
		...(currentData.explanations ?? []).map((explanation) => ({
			href: `#${explanation.id}`,
			label: explanation.title
		})),
		...(currentData.api && currentData.api.length > 0
			? [{ href: '#api-reference', label: 'API reference' }]
			: [])
	];

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				minHeight: 0,
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<PackageHero
					data={currentData}
					heroId={heroId}
					isMobileOrTablet={isMobileOrTablet}
					themeSprings={themeSprings}
				/>
				<DocumentationModeNav
					productionHref="#production-guidance"
					referenceHref={
						currentData.api && currentData.api.length > 0
							? '#api-reference'
							: '#capabilities'
					}
					runHref={
						runnableSamples[0]
							? `#${slugify(runnableSamples[0].heading)}`
							: '#installation'
					}
					themeSprings={themeSprings}
				/>

				<section style={sectionStyle}>
					<p style={paragraphSpacedStyle}>
						{currentData.description}
					</p>
					<AnchorHeading
						id="installation"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Installation
					</AnchorHeading>
					<PrismPlus
						codeString={currentData.installCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				{runnableSamples.map((sample) => (
					<SampleSection
						key={sample.heading}
						sample={sample}
						themeSprings={themeSprings}
					/>
				))}

				{currentData.features.length > 0 ? (
					<section style={sectionStyle}>
						<AnchorHeading
							id="capabilities"
							level="h2"
							style={gradientHeadingStyle(themeSprings)}
							themeSprings={themeSprings}
						>
							Capabilities
						</AnchorHeading>
						<div
							style={{
								display: 'grid',
								gap: '1rem',
								gridTemplateColumns: isMobileOrTablet
									? '1fr'
									: 'repeat(auto-fit, minmax(240px, 1fr))',
								marginTop: '1rem'
							}}
						>
							{currentData.features.map((feature) => (
								<PackageFeatureCard
									feature={feature}
									key={feature.title}
									themeSprings={themeSprings}
								/>
							))}
						</div>
					</section>
				) : null}

				{currentData.explanations &&
				currentData.explanations.length > 0 ? (
					<PackageExplanationBlocks
						explanations={currentData.explanations}
						themeSprings={themeSprings}
					/>
				) : null}

				<PackageGuidanceSections
					isMobileOrTablet={isMobileOrTablet}
					packageName={currentData.npmName}
					themeSprings={themeSprings}
				/>

				{referenceSamples.map((sample) => (
					<SampleSection
						key={sample.heading}
						sample={sample}
						themeSprings={themeSprings}
					/>
				))}

				{(currentData.adapterGroups ?? []).map((group) => (
					<section key={group.heading} style={sectionStyle}>
						<AnchorHeading
							id={slugify(group.heading)}
							level="h2"
							style={gradientHeadingStyle(themeSprings)}
							themeSprings={themeSprings}
						>
							{group.heading}
						</AnchorHeading>
						<p style={paragraphSpacedStyle}>{group.description}</p>
						<DocsTable
							columns={['Package', 'Description']}
							rows={adapterRows(group)}
							themeSprings={themeSprings}
						/>
					</section>
				))}

				{(currentData.notes ?? []).map((note) => (
					<Callout
						key={note.title}
						themeSprings={themeSprings}
						title={note.title}
						variant={note.variant}
					>
						{note.body}
					</Callout>
				))}

				{currentData.api && currentData.api.length > 0 ? (
					<section style={sectionStyle}>
						<AnchorHeading
							id="api-reference"
							level="h2"
							style={gradientHeadingStyle(themeSprings)}
							themeSprings={themeSprings}
						>
							API reference
						</AnchorHeading>
						<p style={paragraphSpacedStyle}>
							Search the declarations exported by the current
							package type files. Expand a symbol to inspect its
							source-backed signature.
						</p>
						<PackageApiExplorer
							api={currentData.api}
							playbookLinks={playbookLinks}
							sourceHref={sourceHref}
							themeSprings={themeSprings}
						/>
					</section>
				) : null}

				{currentData.links && currentData.links.length > 0 ? (
					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '0.75rem',
							marginTop: '0.5rem'
						}}
					>
						{currentData.links.map((link) => (
							<animated.a
								href={link.href}
								key={link.href}
								rel={
									link.href.startsWith('/')
										? undefined
										: 'noreferrer noopener'
								}
								style={{
									border: '1px solid rgba(99, 102, 241, 0.35)',
									borderRadius: '0.5rem',
									color: themeSprings.contrastPrimary,
									fontSize: '0.875rem',
									fontWeight: 500,
									padding: '0.5rem 1rem',
									textDecoration: 'none'
								}}
								target={
									link.href.startsWith('/')
										? undefined
										: '_blank'
								}
							>
								{link.label}
							</animated.a>
						))}
					</div>
				) : null}

				<DocsNavigation
					currentPageId={currentPageId}
					isMobileOrTablet={isMobileOrTablet}
					onNavigate={onNavigate}
					packageSurfaceOnly
					themeSprings={themeSprings}
				/>
			</div>
			{!isMobileOrTablet ? (
				<TableOfContents items={tocItems} themeSprings={themeSprings} />
			) : null}
			<MobileTableOfContents
				isOpen={tocOpen ?? false}
				items={tocItems}
				onToggle={onTocToggle ?? noop}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
