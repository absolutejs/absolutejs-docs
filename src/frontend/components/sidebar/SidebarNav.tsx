import { animated } from '@react-spring/web';
import {
	CSSProperties,
	memo,
	ReactNode,
	useDeferredValue,
	useMemo,
	useState
} from 'react';
import { ThemeSprings } from '../../../types/springTypes';
import {
	DocsView,
	isExpandableEntry,
	SidebarCategory,
	SidebarEntry,
	sidebarEntryKey,
	SidebarPage
} from '../../../types/types';
import { sidebarCategories } from '../../data/sidebarData';
import { primaryColor, secondaryColor } from '../../styles/colors';

type SidebarNavProps = {
	navigateToView: (view: DocsView) => void;
	onToggleSection: (key: string) => void;
	openSections: Set<string>;
	themeSprings: ThemeSprings;
	view: DocsView;
};

// The nav root broadcasts the theme as CSS custom properties so every row
// can be a plain element. Rendering an animated component per row makes
// react-spring register hundreds of spring dependencies on every sidebar
// render, which is what made large section toggles blow the 100ms budget.
const createThemeInterpolations = (themeSprings: ThemeSprings) => ({
	accent: themeSprings.theme.to((mode) =>
		mode.endsWith('dark') ? secondaryColor : primaryColor
	),
	activeBackground: themeSprings.theme.to((mode) =>
		mode.endsWith('dark')
			? 'rgba(129, 140, 248, 0.14)'
			: 'rgba(99, 102, 241, 0.09)'
	),
	filterBackground: themeSprings.theme.to((mode) =>
		mode.endsWith('dark')
			? 'rgba(255, 255, 255, 0.05)'
			: 'rgba(0, 0, 0, 0.03)'
	),
	muted: themeSprings.theme.to((mode) =>
		mode.endsWith('dark') ? '#A1A1AA' : '#71717A'
	),
	resting: themeSprings.theme.to((mode) =>
		mode.endsWith('dark') ? '#D4D4D8' : '#3F3F46'
	)
});

const themeInterpolationsCache = new WeakMap<
	ThemeSprings,
	ReturnType<typeof createThemeInterpolations>
>();

const themeInterpolations = (themeSprings: ThemeSprings) => {
	const cached = themeInterpolationsCache.get(themeSprings);
	if (cached) return cached;
	const created = createThemeInterpolations(themeSprings);
	themeInterpolationsCache.set(themeSprings, created);

	return created;
};

const rowBackground = (active?: boolean, hovered?: boolean) => {
	if (active) return 'var(--sidebar-active-bg)';
	if (hovered) return 'rgba(128, 128, 128, 0.08)';

	return 'transparent';
};

const rowColor = (active?: boolean, hovered?: boolean) => {
	if (active) return 'var(--sidebar-accent)';
	if (hovered) return 'var(--sidebar-contrast)';

	return 'var(--sidebar-resting)';
};

const Chevron = ({ open }: { open: boolean }) => (
	<svg
		fill="none"
		height="14"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="1.75"
		style={{
			flexShrink: 0,
			opacity: 0.55,
			transform: open ? 'rotate(90deg)' : 'none',
			transition: 'transform 0.18s ease'
		}}
		viewBox="0 0 24 24"
		width="14"
	>
		<polyline points="9 6 15 12 9 18" />
	</svg>
);

const SearchIcon = () => (
	<svg
		fill="none"
		height="14"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="1.75"
		viewBox="0 0 24 24"
		width="14"
	>
		<circle cx="11" cy="11" r="7" />
		<line x1="21" x2="16.2" y1="21" y2="16.2" />
	</svg>
);

const rowBaseStyle: CSSProperties = {
	alignItems: 'center',
	background: 'transparent',
	border: 'none',
	borderRadius: '0.5rem',
	cursor: 'pointer',
	display: 'flex',
	fontSize: '0.9rem',
	gap: '0.5rem',
	lineHeight: 1.5,
	padding: '0.45rem 0.65rem',
	textAlign: 'left',
	width: '100%'
};

type NavRowProps = {
	active?: boolean;
	children?: ReactNode;
	href?: string;
	indent?: boolean;
	label: string;
	onClick: () => void;
};

const NavRow = ({
	active,
	children,
	href,
	indent,
	label,
	onClick
}: NavRowProps) => {
	const [hovered, setHovered] = useState(false);
	const content = (
		<>
			<span
				style={{
					flex: 1,
					minWidth: 0,
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap'
				}}
			>
				{label}
			</span>
			{children}
		</>
	);
	const style: CSSProperties = {
		...rowBaseStyle,
		background: rowBackground(active, hovered),
		color: rowColor(active, hovered),
		fontWeight: active ? '600' : '400',
		...(indent
			? {
					borderLeft: active
						? '2px solid var(--sidebar-accent)'
						: '2px solid transparent',
					borderRadius: '0 0.5rem 0.5rem 0',
					fontSize: '0.875rem',
					marginLeft: '-1px',
					padding: '0.4rem 0.65rem 0.4rem 0.85rem'
				}
			: {})
	};

	if (href)
		return (
			<a
				href={href}
				onClick={(event) => {
					event.preventDefault();
					onClick();
				}}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				style={{ ...style, textDecoration: 'none' }}
			>
				{content}
			</a>
		);

	return (
		<button
			onClick={onClick}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={style}
		>
			{content}
		</button>
	);
};

const PageRows = ({
	navigateToView,
	pages,
	view
}: {
	navigateToView: (view: DocsView) => void;
	pages: SidebarPage[];
	view: DocsView;
}) => (
	<div
		style={{
			borderLeft: '1px solid var(--sidebar-hairline)',
			display: 'flex',
			flexDirection: 'column',
			margin: '0.15rem 0 0.35rem 1rem'
		}}
	>
		{pages.map((page) => (
			<NavRow
				active={view === page.id}
				href={
					page.id === 'overview'
						? '/documentation'
						: `/documentation/${page.id}`
				}
				indent={true}
				key={page.id}
				label={page.label}
				onClick={() => navigateToView(page.id)}
			/>
		))}
	</div>
);

const EntryItem = ({
	categoryLabel,
	entry,
	forceOpen,
	navigateToView,
	onToggleSection,
	openSections,
	view
}: {
	categoryLabel: string;
	entry: SidebarEntry;
	forceOpen: boolean;
	navigateToView: (view: DocsView) => void;
	onToggleSection: (key: string) => void;
	openSections: Set<string>;
	view: DocsView;
}) => {
	if (!isExpandableEntry(entry)) {
		if (entry.id === undefined) return null;
		const { id } = entry;

		return (
			<NavRow
				active={view === id}
				href={
					id === 'overview'
						? '/documentation'
						: `/documentation/${id}`
				}
				label={entry.label}
				onClick={() => navigateToView(id)}
			/>
		);
	}

	const key = sidebarEntryKey(categoryLabel, entry);
	const open = forceOpen || openSections.has(key);

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<NavRow
				active={!open && entry.pages.some((page) => page.id === view)}
				label={entry.label}
				onClick={() => onToggleSection(key)}
			>
				<Chevron open={open} />
			</NavRow>
			{open ? (
				<PageRows
					navigateToView={navigateToView}
					pages={entry.pages}
					view={view}
				/>
			) : null}
		</div>
	);
};

type CategoryGroupProps = {
	category: SidebarCategory;
	forceOpen: boolean;
	navigateToView: (view: DocsView) => void;
	onToggleSection: (key: string) => void;
	openSections: Set<string>;
	view: DocsView;
};

const CategoryGroupContent = ({
	category,
	forceOpen,
	navigateToView,
	onToggleSection,
	openSections,
	view
}: CategoryGroupProps) => {
	const open = forceOpen || openSections.has(category.label);

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<button
				onClick={() => onToggleSection(category.label)}
				style={{
					alignItems: 'center',
					background: 'transparent',
					border: 'none',
					color: 'var(--sidebar-muted)',
					cursor: 'pointer',
					display: 'flex',
					fontSize: '0.7rem',
					fontWeight: 600,
					gap: '0.5rem',
					justifyContent: 'space-between',
					letterSpacing: '0.08em',
					margin: '1.35rem 0 0.3rem',
					padding: '0.25rem 0.65rem',
					textTransform: 'uppercase',
					width: '100%'
				}}
			>
				<span
					style={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap'
					}}
				>
					{category.label}
				</span>
				<Chevron open={open} />
			</button>
			{open
				? category.entries.map((entry) => (
						<EntryItem
							categoryLabel={category.label}
							entry={entry}
							forceOpen={forceOpen}
							key={entry.label}
							navigateToView={navigateToView}
							onToggleSection={onToggleSection}
							openSections={openSections}
							view={view}
						/>
					))
				: null}
		</div>
	);
};

// One toggle re-renders every open row in the sidebar unless unaffected
// categories bail out, so equality is judged on each category's own open
// state instead of the openSections Set identity (which changes per toggle).
const categoryOpenSignature = (
	category: SidebarCategory,
	openSections: Set<string>
) =>
	[
		openSections.has(category.label) ? '1' : '0',
		...category.entries.map((entry) =>
			isExpandableEntry(entry) &&
			openSections.has(sidebarEntryKey(category.label, entry))
				? '1'
				: '0'
		)
	].join('');

const categoryGroupPropsEqual = (
	previous: CategoryGroupProps,
	next: CategoryGroupProps
) =>
	previous.category === next.category &&
	previous.forceOpen === next.forceOpen &&
	previous.navigateToView === next.navigateToView &&
	previous.onToggleSection === next.onToggleSection &&
	previous.view === next.view &&
	categoryOpenSignature(previous.category, previous.openSections) ===
		categoryOpenSignature(next.category, next.openSections);

const CategoryGroup = memo(CategoryGroupContent, categoryGroupPropsEqual);

const matchesQuery = (label: string, query: string) =>
	label.toLowerCase().includes(query);

const filterCategories = (query: string) => {
	const trimmed = query.trim().toLowerCase();
	if (trimmed === '') return null;

	return sidebarCategories
		.map((category) => ({
			entries: category.entries.flatMap((entry) => {
				if (matchesQuery(entry.label, trimmed)) return [entry];
				if (!isExpandableEntry(entry)) return [];
				const pages = entry.pages.filter((page) =>
					matchesQuery(page.label, trimmed)
				);

				return pages.length > 0 ? [{ ...entry, pages }] : [];
			}),
			label: category.label
		}))
		.filter((category) => category.entries.length > 0);
};

const SidebarFilter = ({
	onChange,
	value
}: {
	onChange: (value: string) => void;
	value: string;
}) => {
	const [focused, setFocused] = useState(false);

	return (
		<div style={{ position: 'relative' }}>
			<span
				style={{
					color: 'var(--sidebar-muted)',
					display: 'flex',
					left: '0.7rem',
					pointerEvents: 'none',
					position: 'absolute',
					top: '50%',
					transform: 'translateY(-50%)'
				}}
			>
				<SearchIcon />
			</span>
			<input
				onBlur={() => setFocused(false)}
				onChange={(event) => onChange(event.target.value)}
				onFocus={() => setFocused(true)}
				placeholder="Filter docs…"
				style={{
					background: 'var(--sidebar-filter-bg)',
					border: focused
						? '1px solid var(--sidebar-accent)'
						: '1px solid var(--sidebar-hairline)',
					borderRadius: '0.5rem',
					color: 'var(--sidebar-contrast)',
					fontSize: '0.875rem',
					lineHeight: 1.5,
					outline: 'none',
					padding: '0.45rem 0.75rem 0.45rem 2rem',
					transition: 'border-color 0.15s ease',
					width: '100%'
				}}
				type="text"
				value={value}
			/>
		</div>
	);
};

export const SidebarNav = ({
	navigateToView,
	onToggleSection,
	openSections,
	themeSprings,
	view
}: SidebarNavProps) => {
	const [query, setQuery] = useState('');
	// Deferring the query keeps each keystroke's urgent render down to the
	// input itself; the expanded result tree renders as an interruptible
	// background pass instead of blocking the keypress.
	const deferredQuery = useDeferredValue(query);
	const filtered = useMemo(
		() => filterCategories(deferredQuery),
		[deferredQuery]
	);
	const categories = filtered ?? sidebarCategories;
	const isFiltering = filtered !== null;
	const interpolations = themeInterpolations(themeSprings);

	return (
		<animated.nav
			style={{
				'--sidebar-accent': interpolations.accent,
				'--sidebar-active-bg': interpolations.activeBackground,
				'--sidebar-contrast': themeSprings.contrastPrimary,
				'--sidebar-filter-bg': interpolations.filterBackground,
				'--sidebar-hairline': themeSprings.themeTertiary,
				'--sidebar-muted': interpolations.muted,
				'--sidebar-resting': interpolations.resting,
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<SidebarFilter onChange={setQuery} value={query} />
			<div style={{ height: '1rem' }} />
			<NavRow
				active={view === 'packages'}
				label="All Packages"
				onClick={() => navigateToView('packages')}
			/>
			{categories.map((category) => (
				<CategoryGroup
					category={category}
					forceOpen={isFiltering}
					key={category.label}
					navigateToView={navigateToView}
					onToggleSection={onToggleSection}
					openSections={openSections}
					view={view}
				/>
			))}
			{isFiltering && categories.length === 0 ? (
				<span
					style={{
						color: 'var(--sidebar-muted)',
						fontSize: '0.875rem',
						padding: '1rem 0.65rem'
					}}
				>
					Nothing matches “{deferredQuery}”.
				</span>
			) : null}
		</animated.nav>
	);
};
