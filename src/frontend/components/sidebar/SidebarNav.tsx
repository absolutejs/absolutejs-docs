import { animated } from '@react-spring/web';
import { CSSProperties, ReactNode, useState } from 'react';
import { ThemeSprings } from '../../../types/springTypes';
import {
	DocsView,
	isExpandableEntry,
	SidebarCategory,
	SidebarEntry,
	sidebarEntryKey,
	SidebarPage,
	SidebarStatus
} from '../../../types/types';
import { sidebarCategories } from '../../data/sidebarData';
import { primaryColor } from '../../styles/colors';

type SidebarNavProps = {
	navigateToView: (view: DocsView) => void;
	onToggleSection: (key: string) => void;
	openSections: Set<string>;
	themeSprings: ThemeSprings;
	view: DocsView;
};

const statusColors: Record<SidebarStatus, string> = {
	alpha: '#F59E0B',
	beta: '#8B5CF6'
};

const dotStyle = (status: SidebarStatus): CSSProperties => ({
	background: statusColors[status],
	borderRadius: '50%',
	flexShrink: 0,
	height: '5px',
	opacity: 0.85,
	width: '5px'
});

const chevronStyle = (open: boolean): CSSProperties => ({
	display: 'inline-block',
	fontSize: '0.8rem',
	lineHeight: 1,
	opacity: 0.45,
	transform: open ? 'rotate(90deg)' : 'none',
	transition: 'transform 0.15s ease'
});

const rowBaseStyle: CSSProperties = {
	alignItems: 'center',
	background: 'transparent',
	border: 'none',
	borderLeft: '2px solid transparent',
	borderRadius: '0 0.375rem 0.375rem 0',
	cursor: 'pointer',
	display: 'flex',
	fontSize: '0.85rem',
	gap: '0.5rem',
	lineHeight: 1.35,
	padding: '0.3rem 0.5rem 0.3rem 0.7rem',
	textAlign: 'left',
	width: '100%'
};

type NavRowProps = {
	active?: boolean;
	children?: ReactNode;
	indent?: boolean;
	label: string;
	onClick: () => void;
	status?: SidebarStatus;
	themeSprings: ThemeSprings;
};

const rowBackground = (active?: boolean, hovered?: boolean) => {
	if (active) return 'rgba(99, 102, 241, 0.08)';
	if (hovered) return 'rgba(128, 128, 128, 0.07)';

	return 'transparent';
};

const NavRow = ({
	active,
	children,
	indent,
	label,
	onClick,
	status,
	themeSprings
}: NavRowProps) => {
	const [hovered, setHovered] = useState(false);
	const emphasized = active || hovered;

	return (
		<animated.button
			onClick={onClick}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{
				...rowBaseStyle,
				background: rowBackground(active, hovered),
				borderLeft: active
					? `2px solid ${primaryColor}`
					: '2px solid transparent',
				color: emphasized
					? themeSprings.contrastPrimary
					: themeSprings.contrastSecondary,
				fontSize: indent ? '0.8rem' : '0.85rem',
				fontWeight: active ? '600' : '400'
			}}
		>
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
			{status ? <span style={dotStyle(status)} /> : null}
			{children}
		</animated.button>
	);
};

const PageRows = ({
	navigateToView,
	pages,
	themeSprings,
	view
}: {
	navigateToView: (view: DocsView) => void;
	pages: SidebarPage[];
	themeSprings: ThemeSprings;
	view: DocsView;
}) => (
	<animated.div
		style={{
			borderLeft: themeSprings.themeTertiary.to(
				(color) => `1px solid ${color}`
			),
			display: 'flex',
			flexDirection: 'column',
			marginBottom: '0.15rem',
			marginLeft: '0.95rem'
		}}
	>
		{pages.map((page) => (
			<NavRow
				active={view === page.id}
				indent={true}
				key={page.id}
				label={page.label}
				onClick={() => navigateToView(page.id)}
				themeSprings={themeSprings}
			/>
		))}
	</animated.div>
);

const EntryItem = ({
	categoryLabel,
	entry,
	forceOpen,
	navigateToView,
	onToggleSection,
	openSections,
	themeSprings,
	view
}: {
	categoryLabel: string;
	entry: SidebarEntry;
	forceOpen: boolean;
	navigateToView: (view: DocsView) => void;
	onToggleSection: (key: string) => void;
	openSections: Set<string>;
	themeSprings: ThemeSprings;
	view: DocsView;
}) => {
	if (!isExpandableEntry(entry)) {
		if (entry.id === undefined) return null;
		const { id } = entry;

		return (
			<NavRow
				active={view === id}
				label={entry.label}
				onClick={() => navigateToView(id)}
				status={entry.status}
				themeSprings={themeSprings}
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
				status={entry.status}
				themeSprings={themeSprings}
			>
				<span style={chevronStyle(open)}>›</span>
			</NavRow>
			{open ? (
				<PageRows
					navigateToView={navigateToView}
					pages={entry.pages}
					themeSprings={themeSprings}
					view={view}
				/>
			) : null}
		</div>
	);
};

const CategoryGroup = ({
	category,
	forceOpen,
	navigateToView,
	onToggleSection,
	openSections,
	themeSprings,
	view
}: {
	category: SidebarCategory;
	forceOpen: boolean;
	navigateToView: (view: DocsView) => void;
	onToggleSection: (key: string) => void;
	openSections: Set<string>;
	themeSprings: ThemeSprings;
	view: DocsView;
}) => {
	const open = forceOpen || openSections.has(category.label);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				marginBottom: open ? '0.6rem' : 0
			}}
		>
			<animated.button
				onClick={() => onToggleSection(category.label)}
				style={{
					alignItems: 'center',
					background: 'transparent',
					border: 'none',
					color: themeSprings.contrastSecondary,
					cursor: 'pointer',
					display: 'flex',
					fontSize: '0.66rem',
					fontWeight: 700,
					gap: '0.6rem',
					letterSpacing: '0.12em',
					padding: '0.55rem 0.5rem 0.45rem 0.2rem',
					textTransform: 'uppercase',
					width: '100%'
				}}
			>
				<span style={{ whiteSpace: 'nowrap' }}>{category.label}</span>
				<animated.span
					style={{
						background: themeSprings.themeTertiary,
						flex: 1,
						height: '1px'
					}}
				/>
				<span style={chevronStyle(open)}>›</span>
			</animated.button>
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
							themeSprings={themeSprings}
							view={view}
						/>
					))
				: null}
		</div>
	);
};

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

export const SidebarNav = ({
	navigateToView,
	onToggleSection,
	openSections,
	themeSprings,
	view
}: SidebarNavProps) => {
	const [query, setQuery] = useState('');
	const filtered = filterCategories(query);
	const categories = filtered ?? sidebarCategories;
	const isFiltering = filtered !== null;

	return (
		<nav style={{ display: 'flex', flexDirection: 'column' }}>
			<animated.input
				onChange={(event) => setQuery(event.target.value)}
				placeholder="Filter docs…"
				style={{
					background: 'transparent',
					border: 'none',
					borderBottom: themeSprings.themeTertiary.to(
						(color) => `1px solid ${color}`
					),
					color: themeSprings.contrastPrimary,
					fontSize: '0.8rem',
					marginBottom: '0.6rem',
					outline: 'none',
					padding: '0.35rem 0.25rem 0.5rem'
				}}
				type="text"
				value={query}
			/>
			<NavRow
				active={view === 'packages'}
				label="All Packages"
				onClick={() => navigateToView('packages')}
				themeSprings={themeSprings}
			/>
			<div style={{ height: '0.35rem' }} />
			{categories.map((category) => (
				<CategoryGroup
					category={category}
					forceOpen={isFiltering}
					key={category.label}
					navigateToView={navigateToView}
					onToggleSection={onToggleSection}
					openSections={openSections}
					themeSprings={themeSprings}
					view={view}
				/>
			))}
			{isFiltering && categories.length === 0 ? (
				<animated.span
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: '0.8rem',
						padding: '0.75rem 0.5rem'
					}}
				>
					Nothing matches “{query}”.
				</animated.span>
			) : null}
		</nav>
	);
};
