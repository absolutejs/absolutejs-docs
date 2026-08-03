import { animated } from '@react-spring/web';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import {
	PackageCatalogEntry,
	PackageCategory
} from '../../../../types/packageDocs';
import { DocsViewProps, ThemeSprings } from '../../../../types/springTypes';
import { packageCatalog } from '../../../data/documentation/packages/catalog';
import { ecosystemProjects } from '../../../data/documentation/packages/ecosystem.generated';
import { packageSubpackageViewId } from '../../../data/documentation/packages/packageRoutes';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	tableCodeStyle
} from '../../../styles/docsStyles';
import {
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';

const categoryOrder: PackageCategory[] = [
	'Auth & Identity',
	'Data & Sync',
	'AI',
	'Voice & Media',
	'Platform & Infra',
	'Observability',
	'Messaging',
	'Commerce & Growth',
	'Frontend & UX',
	'On-chain',
	'Dev Tools'
];

const slugify = (value: string) =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

const matchesQuery = (entry: PackageCatalogEntry, query: string) => {
	const haystack =
		`${entry.name} ${entry.npmName ?? ''} ${entry.sourceDirectory} ${entry.kind} ${entry.tagline} ${entry.searchText}`.toLowerCase();

	return query
		.toLowerCase()
		.split(/\s+/)
		.every((term) => haystack.includes(term));
};

type CatalogCardProps = {
	entry: PackageCatalogEntry;
	onNavigate: (pageId: string) => void;
	themeSprings: ThemeSprings;
};

const catalogBadge = (entry: PackageCatalogEntry) => {
	if (entry.private && entry.kind !== 'monorepo') return 'private workspace';
	if (entry.kind === 'monorepo')
		return `${entry.subpackageCount} workspace items`;
	if (entry.version) return `v${entry.version}`;

	return 'workspace';
};

const CatalogCard = ({ entry, onNavigate, themeSprings }: CatalogCardProps) => (
	<animated.a
		href={`/documentation/${entry.view}`}
		onClick={(event) => {
			event.preventDefault();
			onNavigate(entry.view);
		}}
		style={{
			...featureCardStyle(themeSprings),
			boxSizing: 'border-box',
			color: 'inherit',
			cursor: 'pointer',
			display: 'block',
			flex: 1,
			textAlign: 'left',
			textDecoration: 'none',
			width: '100%'
		}}
	>
		<div
			style={{
				alignItems: 'baseline',
				display: 'flex',
				flexWrap: 'wrap',
				gap: '0.5rem',
				marginBottom: '0.4rem'
			}}
		>
			<animated.span
				style={{
					color: themeSprings.contrastPrimary,
					fontSize: '1.05rem',
					fontWeight: 600
				}}
			>
				{entry.name}
			</animated.span>
			<span
				style={{
					color: '#6366F1',
					fontSize: '0.75rem',
					fontWeight: 600
				}}
			>
				{catalogBadge(entry)}
			</span>
		</div>
		<code
			style={{
				...tableCodeStyle,
				display: 'inline-block',
				fontSize: '0.75rem',
				marginBottom: '0.6rem'
			}}
		>
			{entry.npmName ?? `~/abs/${entry.sourceDirectory}`}
		</code>
		<animated.p
			style={{
				color: themeSprings.contrastSecondary,
				fontSize: '0.9rem',
				lineHeight: 1.55,
				margin: 0
			}}
		>
			{entry.tagline}
		</animated.p>
	</animated.a>
);

type CatalogResultProps = CatalogCardProps & {
	query: string;
};

const CatalogResult = ({
	entry,
	onNavigate,
	query,
	themeSprings
}: CatalogResultProps) => {
	const project = ecosystemProjects.find(
		(candidate) => candidate.directory === entry.sourceDirectory
	);
	const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
	const matchingSubpackages =
		terms.length === 0
			? []
			: (project?.subpackages.filter((subpackage) => {
					const searchable =
						`${subpackage.name} ${subpackage.description} ${subpackage.publicExports.join(' ')}`.toLowerCase();

					return terms.every((term) => searchable.includes(term));
				}) ?? []);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				minWidth: 0,
				width: '100%'
			}}
		>
			<CatalogCard
				entry={entry}
				onNavigate={onNavigate}
				themeSprings={themeSprings}
			/>
			{project && matchingSubpackages.length > 0 ? (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '0.35rem',
						padding: '0.55rem 0.75rem 0'
					}}
				>
					{matchingSubpackages.map((subpackage) => {
						const view = packageSubpackageViewId(
							project,
							subpackage
						);

						return (
							<a
								href={`/documentation/${view}`}
								key={subpackage.sourcePath}
								onClick={(event) => {
									event.preventDefault();
									onNavigate(view);
								}}
								style={{
									color: '#6366F1',
									fontFamily: 'monospace',
									fontSize: '0.78rem'
								}}
							>
								{subpackage.name}
							</a>
						);
					})}
				</div>
			) : null}
		</div>
	);
};

type CatalogSearchProps = {
	onQueryChange: (query: string) => void;
	query: string;
	themeSprings: ThemeSprings;
};

const CatalogSearch = ({
	onQueryChange,
	query,
	themeSprings
}: CatalogSearchProps) => (
	<animated.label
		style={{
			alignItems: 'center',
			background: themeSprings.themeSecondary,
			border: themeSprings.themeTertiary.to(
				(color) => `1px solid ${color}`
			),
			borderRadius: '0.5rem',
			color: themeSprings.contrastSecondary,
			display: 'flex',
			gap: '0.6rem',
			marginTop: '0.5rem',
			maxWidth: '420px',
			padding: '0.6rem 0.9rem'
		}}
	>
		<FaSearch size={13} />
		<animated.input
			onChange={(event) => onQueryChange(event.target.value)}
			placeholder="Filter packages…"
			style={{
				background: 'transparent',
				border: 'none',
				color: themeSprings.contrastPrimary,
				flex: 1,
				fontSize: '0.95rem',
				outline: 'none'
			}}
			type="text"
			value={query}
		/>
	</animated.label>
);

export const PackagesCatalogView = ({
	isMobileOrTablet,
	onNavigate,
	themeSprings
}: DocsViewProps) => {
	const [query, setQuery] = useState('');
	const visible = packageCatalog.filter((entry) =>
		matchesQuery(entry, query)
	);

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
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 id="packages" style={h1Style(isMobileOrTablet)}>
						Packages
					</h1>
					<p style={paragraphLargeStyle}>
						The complete AbsoluteJS workspace:{' '}
						{packageCatalog.length} packages, monorepos,
						applications, extensions, examples, fixtures, and
						internal tools. Open a monorepo to see every public
						package and private workspace project it contains.
					</p>
					<CatalogSearch
						onQueryChange={setQuery}
						query={query}
						themeSprings={themeSprings}
					/>
				</animated.div>

				{categoryOrder.map((category) => {
					const entries = visible.filter(
						(entry) => entry.category === category
					);
					if (entries.length === 0) return null;

					return (
						<section
							key={category}
							style={{ marginBottom: '2rem' }}
						>
							<AnchorHeading
								id={slugify(category)}
								level="h2"
								style={gradientHeadingStyle(themeSprings)}
								themeSprings={themeSprings}
							>
								{category}
							</AnchorHeading>
							<div
								style={{
									display: 'grid',
									gap: '1rem',
									gridTemplateColumns: isMobileOrTablet
										? '1fr'
										: 'repeat(auto-fill, minmax(260px, 1fr))'
								}}
							>
								{entries.map((entry) => (
									<CatalogResult
										entry={entry}
										key={entry.sourceDirectory}
										onNavigate={onNavigate}
										query={query}
										themeSprings={themeSprings}
									/>
								))}
							</div>
						</section>
					);
				})}

				{visible.length === 0 ? (
					<animated.p
						style={{
							color: themeSprings.contrastSecondary,
							fontSize: '1rem',
							padding: '2rem 0',
							textAlign: 'center'
						}}
					>
						No packages match “{query}”.
					</animated.p>
				) : null}
			</div>
		</div>
	);
};
