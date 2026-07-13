import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import {
	PackageAdapterGroup,
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
			<span style={pillStyle('#6366F1')}>v{data.version}</span>
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
		{ code: item.name, suffix: item.version ? `v${item.version}` : '' },
		item.description
	]);

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
	data,
	isMobileOrTablet,
	onTocToggle,
	themeSprings,
	tocOpen
}: PackageOverviewTemplateProps) => {
	const heroId = slugify(`${data.name}-overview`);
	const tocItems: TocItem[] = [
		{ href: `#${heroId}`, label: 'Overview' },
		{ href: '#installation', label: 'Installation' },
		...(data.features.length > 0
			? [{ href: '#features', label: 'Features' }]
			: []),
		...data.samples.map((sample) => ({
			href: `#${slugify(sample.heading)}`,
			label: sample.heading
		})),
		...(data.adapterGroups ?? []).map((group) => ({
			href: `#${slugify(group.heading)}`,
			label: group.heading
		}))
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
					data={data}
					heroId={heroId}
					isMobileOrTablet={isMobileOrTablet}
					themeSprings={themeSprings}
				/>

				<section style={sectionStyle}>
					<p style={paragraphSpacedStyle}>{data.description}</p>
					<AnchorHeading
						id="installation"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Installation
					</AnchorHeading>
					<PrismPlus
						codeString={data.installCommand}
						language="bash"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				{data.features.length > 0 ? (
					<section style={sectionStyle}>
						<AnchorHeading
							id="features"
							level="h2"
							style={gradientHeadingStyle(themeSprings)}
							themeSprings={themeSprings}
						>
							Features
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
							{data.features.map((feature) => (
								<PackageFeatureCard
									feature={feature}
									key={feature.title}
									themeSprings={themeSprings}
								/>
							))}
						</div>
					</section>
				) : null}

				{data.samples.map((sample) => (
					<section key={sample.heading} style={sectionStyle}>
						<AnchorHeading
							id={slugify(sample.heading)}
							level="h2"
							style={gradientHeadingStyle(themeSprings)}
							themeSprings={themeSprings}
						>
							{sample.heading}
						</AnchorHeading>
						<p style={paragraphSpacedStyle}>{sample.description}</p>
						<PrismPlus
							codeString={sample.code}
							language={sample.language}
							showLineNumbers={sample.language !== 'bash'}
							themeSprings={themeSprings}
						/>
					</section>
				))}

				{(data.adapterGroups ?? []).map((group) => (
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

				{(data.notes ?? []).map((note) => (
					<Callout
						key={note.title}
						themeSprings={themeSprings}
						title={note.title}
						variant={note.variant}
					>
						{note.body}
					</Callout>
				))}

				{data.links && data.links.length > 0 ? (
					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '0.75rem',
							marginTop: '0.5rem'
						}}
					>
						{data.links.map((link) => (
							<animated.a
								href={link.href}
								key={link.href}
								rel="noreferrer noopener"
								style={{
									border: '1px solid rgba(99, 102, 241, 0.35)',
									borderRadius: '0.5rem',
									color: themeSprings.contrastPrimary,
									fontSize: '0.875rem',
									fontWeight: 500,
									padding: '0.5rem 1rem',
									textDecoration: 'none'
								}}
								target="_blank"
							>
								{link.label}
							</animated.a>
						))}
					</div>
				) : null}
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
