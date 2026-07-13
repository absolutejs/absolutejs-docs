import { animated } from '@react-spring/web';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import {
	PackageCatalogEntry,
	PackageCategory
} from '../../../../types/packageDocs';
import { DocsViewProps, ThemeSprings } from '../../../../types/springTypes';
import { packageCatalog } from '../../../data/documentation/packages/catalog';
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
		`${entry.name} ${entry.npmName} ${entry.tagline}`.toLowerCase();

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

const CatalogCard = ({ entry, onNavigate, themeSprings }: CatalogCardProps) => (
	<animated.button
		onClick={() => onNavigate(entry.view)}
		style={{
			...featureCardStyle(themeSprings),
			cursor: 'pointer',
			textAlign: 'left'
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
				v{entry.version}
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
			{entry.npmName}
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
	</animated.button>
);

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
						Every published AbsoluteJS package — {''}
						{packageCatalog.length} standalone tools that work with
						Bun and Elysia. Each one is independently versioned and
						usable on its own; together they cover auth, data sync,
						AI, voice, production infrastructure, observability, and
						growth.
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
									<CatalogCard
										entry={entry}
										key={entry.npmName}
										onNavigate={onNavigate}
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
