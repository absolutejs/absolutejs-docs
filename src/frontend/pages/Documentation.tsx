import { animated, useSpring } from '@react-spring/web';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
	DocsSearchResult,
	DocsView,
	isExpandableEntry,
	SidebarEntry,
	sidebarEntryKey
} from '../../types/types';
import { isValidViewId } from '../../types/typeGuards';
import { Navbar } from '../components/navbar/Navbar';
import { DocsSearchDialog } from '../components/search/DocsSearchDialog';
import { AuroraBackground } from '../components/utils/AuroraBackground';
import { Head } from '../components/page/Head';
import { SidebarSection } from '../components/sidebar/SidebarSection';
import { docsViews, sidebarCategories } from '../data/sidebarData';
import {
	documentationMetadataFor,
	documentationStructuredDataFor
} from '../data/documentation/documentationMetadata';
import { useDocsNavigation } from '../hooks/useDocsNavigation';
import {
	InitialBreakpointContext,
	isBreakpoint,
	useMediaQuery
} from '../hooks/useMediaQuery';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';
import { scrollToAnchor } from '../utils/scrollToAnchor';
import { User } from '../../../db/schema';

type DocumentationViewProps = {
	user: User | null;
	theme: ThemeMode | undefined;
	initialView: DocsView;
};

type DocumentationProps = DocumentationViewProps & {
	initialBreakpoint?: string;
};

const entryContainsView = (entry: SidebarEntry, view: DocsView) =>
	isExpandableEntry(entry)
		? entry.pages.some((page) => page.id === view)
		: entry.id === view;

const findOpenKeysForView = (view: DocsView) => {
	const category = sidebarCategories.find((candidate) =>
		candidate.entries.some((entry) => entryContainsView(entry, view))
	);
	if (!category) return [];

	const entry = category.entries.find(
		(candidate) =>
			isExpandableEntry(candidate) && entryContainsView(candidate, view)
	);

	return entry
		? [category.label, sidebarEntryKey(category.label, entry)]
		: [category.label];
};

const isTypingTarget = (target: EventTarget | null) =>
	target instanceof HTMLElement &&
	(target.isContentEditable ||
		['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName));

// ⌘K or Ctrl+K anywhere, or / outside a text field, opens search.
const useSearchShortcut = (openSearch: () => void) => {
	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const commandK =
				(event.metaKey || event.ctrlKey) &&
				event.key.toLowerCase() === 'k';
			const slash = event.key === '/' && !isTypingTarget(event.target);
			if (!commandK && !slash) return;
			event.preventDefault();
			openSearch();
		};
		window.addEventListener('keydown', onKeyDown);

		return () => window.removeEventListener('keydown', onKeyDown);
	}, [openSearch]);
};

const DocumentationView = ({
	user,
	theme,
	initialView
}: DocumentationViewProps) => {
	const [themeSprings, setTheme] = useTheme(theme);
	const [view, navigateToView] = useDocsNavigation(initialView);
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('lg');
	const isTablet = isSizeOrLess('lg') && !isMobile;
	const isMobileOrTablet = isMobile || isTablet;

	const [openSections, setOpenSections] = useState<Set<string>>(
		() => new Set(['Framework', ...findOpenKeysForView(initialView)])
	);

	const [sidebarSpring, sidebarSpringApi] = useSpring(() => ({
		config: { friction: 40, tension: 275 },
		overlayOpacity: 0,
		transform: 'translateX(-100%)'
	}));

	const [tocOpen, setTocOpen] = useState(false);
	const [search, setSearch] = useState({ isOpen: false, query: '' });
	const openSearch = useCallback(
		(query = '') => setSearch({ isOpen: true, query: query.trim() }),
		[]
	);
	const closeSearch = useCallback(
		() => setSearch((current) => ({ ...current, isOpen: false })),
		[]
	);
	useSearchShortcut(openSearch);

	const handleNavigate = useCallback(
		(newView: DocsView) => {
			navigateToView(newView);
			const keys = findOpenKeysForView(newView);
			if (keys.length === 0) return;

			setOpenSections((current) => new Set([...current, ...keys]));
		},
		[navigateToView]
	);

	const handleToggleSection = useCallback((label: string) => {
		setOpenSections((current) => {
			const next = new Set(current);
			if (next.has(label)) {
				next.delete(label);
			} else {
				next.add(label);
			}

			return next;
		});
	}, []);

	const openSearchResult = useCallback(
		(result: DocsSearchResult) => {
			closeSearch();
			if (isValidViewId(result.view)) handleNavigate(result.view);
			if (result.anchor)
				scrollToAnchor(result.anchor, result.view !== view);
		},
		[closeSearch, handleNavigate, view]
	);

	const toggleSidebar = () => {
		void sidebarSpringApi.start({
			overlayOpacity: 1,
			transform: 'translateX(0%)'
		});
	};

	const toggleToc = useCallback(() => {
		setTocOpen((prev) => !prev);
	}, []);

	const ActiveView = docsViews[view];
	const activeDocumentation = useMemo(
		() => (
			<div
				style={{
					display: 'flex',
					flex: 1,
					flexDirection: 'column',
					minHeight: 0,
					minWidth: 0
				}}
			>
				<ActiveView
					currentPageId={view}
					isMobileOrTablet={isMobileOrTablet}
					onNavigate={(pageId: string) => {
						if (isValidViewId(pageId)) handleNavigate(pageId);
					}}
					onTocToggle={toggleToc}
					themeSprings={themeSprings}
					tocOpen={tocOpen}
				/>
			</div>
		),
		[
			ActiveView,
			view,
			isMobileOrTablet,
			handleNavigate,
			toggleToc,
			themeSprings,
			tocOpen
		]
	);
	const documentationContent = (
		<div
			style={{
				display: 'flex',
				flex: 1,
				minHeight: 0
			}}
		>
			<SidebarSection
				isMobile={isMobile}
				navigateToView={handleNavigate}
				onOpenSearch={openSearch}
				onToggleSection={handleToggleSection}
				openSections={openSections}
				spring={sidebarSpring}
				springApi={sidebarSpringApi}
				themeSprings={themeSprings}
				toggleSidebar={toggleSidebar}
				view={view}
			/>
			{activeDocumentation}
		</div>
	);

	return (
		<html lang="en" style={htmlDefault}>
			<Head
				canonicalUrl={
					view === 'overview'
						? 'https://absolutejs.com/documentation'
						: `https://absolutejs.com/documentation/${view}`
				}
				description={documentationMetadataFor(view).description}
				jsonLd={documentationStructuredDataFor(view)}
				title={documentationMetadataFor(view).title}
			/>
			<animated.body
				style={{
					...bodyDefault(themeSprings),
					position: 'relative'
				}}
			>
				<AuroraBackground themeSprings={themeSprings} />
				<Navbar
					setTheme={setTheme}
					themeSprings={themeSprings}
					user={user}
				/>
				<main
					style={{
						...mainDefault('hidden'),
						alignItems: 'stretch'
					}}
				>
					{documentationContent}
				</main>
				<DocsSearchDialog
					initialQuery={search.query}
					isOpen={search.isOpen}
					onClose={closeSearch}
					onSelect={openSearchResult}
					themeSprings={themeSprings}
				/>
			</animated.body>
		</html>
	);
};

// The provider must sit above every useMediaQuery call (including this
// page's own), so the seeding wrapper is a separate component.
export const Documentation = ({
	initialBreakpoint,
	...viewProps
}: DocumentationProps) => (
	<InitialBreakpointContext.Provider
		value={
			initialBreakpoint && isBreakpoint(initialBreakpoint)
				? initialBreakpoint
				: undefined
		}
	>
		<DocumentationView {...viewProps} />
	</InitialBreakpointContext.Provider>
);
