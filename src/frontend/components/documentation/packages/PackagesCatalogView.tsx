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
import { outcomePlaybooks } from '../../../data/documentation/outcomePlaybooks';
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
			<span style={{ fontSize: '0.72rem', opacity: 0.7 }}>
				{entry.status}
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

type CatalogFiltersProps = {
	categoryFilter: string;
	maturityFilter: string;
	onCategoryChange: (value: string) => void;
	onMaturityChange: (value: string) => void;
	onScopeChange: (value: string) => void;
	scopeFilter: string;
	themeSprings: ThemeSprings;
};

const CatalogFilters = ({
	categoryFilter,
	maturityFilter,
	onCategoryChange,
	onMaturityChange,
	onScopeChange,
	scopeFilter,
	themeSprings
}: CatalogFiltersProps) => (
	<div
		style={{
			display: 'flex',
			flexWrap: 'wrap',
			gap: '0.65rem',
			marginTop: '0.75rem'
		}}
	>
		<animated.select
			aria-label="Filter by package category"
			onChange={(event) => onCategoryChange(event.target.value)}
			style={{
				background: themeSprings.themeSecondary,
				border: '1px solid rgba(99, 102, 241, 0.28)',
				borderRadius: '0.5rem',
				color: themeSprings.contrastPrimary,
				padding: '0.55rem 0.7rem'
			}}
			value={categoryFilter}
		>
			<option value="all">All categories</option>
			{categoryOrder.map((category) => (
				<option key={category} value={category}>
					{category}
				</option>
			))}
		</animated.select>
		<animated.select
			aria-label="Filter by maturity"
			onChange={(event) => onMaturityChange(event.target.value)}
			style={{
				background: themeSprings.themeSecondary,
				border: '1px solid rgba(99, 102, 241, 0.28)',
				borderRadius: '0.5rem',
				color: themeSprings.contrastPrimary,
				padding: '0.55rem 0.7rem'
			}}
			value={maturityFilter}
		>
			<option value="all">All maturity levels</option>
			<option value="stable">Stable</option>
			<option value="beta">Beta</option>
			<option value="alpha">Alpha</option>
		</animated.select>
		<animated.select
			aria-label="Filter by publication scope"
			onChange={(event) => onScopeChange(event.target.value)}
			style={{
				background: themeSprings.themeSecondary,
				border: '1px solid rgba(99, 102, 241, 0.28)',
				borderRadius: '0.5rem',
				color: themeSprings.contrastPrimary,
				padding: '0.55rem 0.7rem'
			}}
			value={scopeFilter}
		>
			<option value="all">Public and workspace</option>
			<option value="public">Public/installable</option>
			<option value="workspace">Workspace/internal</option>
		</animated.select>
	</div>
);

const GoalBundleExplorer = ({
	onNavigate,
	themeSprings
}: Pick<DocsViewProps, 'onNavigate' | 'themeSprings'>) => {
	const [activeGoal, setActiveGoal] = useState(0);
	const goal = outcomePlaybooks[activeGoal] ?? outcomePlaybooks[0];

	return (
		<section style={{ margin: '1.5rem 0 2.5rem' }}>
			<AnchorHeading
				id="choose-a-stack"
				level="h2"
				style={gradientHeadingStyle(themeSprings)}
				themeSprings={themeSprings}
			>
				What are you building?
			</AnchorHeading>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
				{outcomePlaybooks.map((candidate, index) => (
					<button
						aria-pressed={index === activeGoal}
						key={candidate.id}
						onClick={() => setActiveGoal(index)}
						style={{
							background:
								index === activeGoal
									? 'rgba(99, 102, 241, 0.16)'
									: 'transparent',
							border: '1px solid rgba(99, 102, 241, 0.3)',
							borderRadius: '0.55rem',
							color: 'inherit',
							cursor: 'pointer',
							padding: '0.55rem 0.75rem'
						}}
						type="button"
					>
						{candidate.title}
					</button>
				))}
			</div>
			<animated.p
				style={{
					color: themeSprings.contrastSecondary,
					lineHeight: 1.65
				}}
			>
				{goal?.description}
			</animated.p>
			<div
				aria-label={`${goal?.title} package architecture`}
				style={{
					alignItems: 'stretch',
					display: 'flex',
					flexWrap: 'wrap',
					gap: '0.45rem'
				}}
			>
				{(goal?.packages ?? []).map((packageRole, index) => (
					<div
						key={`${packageRole.role}-${packageRole.name}`}
						style={{
							alignItems: 'center',
							display: 'flex',
							gap: '0.45rem'
						}}
					>
						{index > 0 ? <span aria-hidden="true">→</span> : null}
						<a
							href={`/documentation/${packageRole.view}`}
							onClick={(event) => {
								event.preventDefault();
								onNavigate(packageRole.view);
							}}
							style={{
								border: '1px solid rgba(99, 102, 241, 0.25)',
								borderRadius: '0.55rem',
								color: 'inherit',
								fontWeight: 600,
								padding: '0.65rem 0.8rem',
								textDecoration: 'none'
							}}
						>
							{packageRole.role}
						</a>
					</div>
				))}
			</div>
			{goal ? (
				<a
					href={`/documentation/${goal.id}`}
					onClick={(event) => {
						event.preventDefault();
						onNavigate(goal.id);
					}}
					style={{
						background: 'rgba(99, 102, 241, 0.14)',
						border: '1px solid rgba(99, 102, 241, 0.35)',
						borderRadius: '0.55rem',
						color: 'inherit',
						display: 'inline-block',
						fontWeight: 700,
						marginTop: '1rem',
						padding: '0.65rem 0.8rem',
						textDecoration: 'none'
					}}
				>
					Open the complete {goal.title} playbook →
				</a>
			) : null}
		</section>
	);
};

export const PackagesCatalogView = ({
	isMobileOrTablet,
	onNavigate,
	themeSprings
}: DocsViewProps) => {
	const [query, setQuery] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('all');
	const [maturityFilter, setMaturityFilter] = useState('all');
	const [scopeFilter, setScopeFilter] = useState('all');
	const visible = packageCatalog.filter((entry) => {
		if (!matchesQuery(entry, query)) return false;
		if (categoryFilter !== 'all' && entry.category !== categoryFilter)
			return false;
		if (maturityFilter !== 'all' && entry.status !== maturityFilter)
			return false;
		if (scopeFilter === 'public' && entry.private) return false;
		if (scopeFilter === 'workspace' && !entry.private) return false;

		return true;
	});

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
					<CatalogFilters
						categoryFilter={categoryFilter}
						maturityFilter={maturityFilter}
						onCategoryChange={setCategoryFilter}
						onMaturityChange={setMaturityFilter}
						onScopeChange={setScopeFilter}
						scopeFilter={scopeFilter}
						themeSprings={themeSprings}
					/>
				</animated.div>

				<GoalBundleExplorer
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>

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
