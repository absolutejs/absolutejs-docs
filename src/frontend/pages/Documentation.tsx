import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';
import { DocsView, isMenuDropdown } from '../../types/types';
import { isValidViewId } from '../../types/typeGuards';
import { Navbar } from '../components/navbar/Navbar';
import { AuroraBackground } from '../components/utils/AuroraBackground';
import { Head } from '../components/page/Head';
import { SidebarSection } from '../components/sidebar/SidebarSection';
import { docsViews, sidebarData } from '../data/sidebarData';
import { useDocsNavigation } from '../hooks/useDocsNavigation';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';
import { User } from '../../../db/schema';

type DocumentationProps = {
	user: User | null;
	theme: ThemeMode | undefined;
	initialView: DocsView;
};

const findSectionForView = (view: DocsView) => {
	for (const section of sidebarData) {
		if (!isMenuDropdown(section)) continue;
		if (section.buttons.some((btn) => btn.id === view))
			return section.label;
	}

	return null;
};

export const Documentation = ({
	user,
	theme,
	initialView
}: DocumentationProps) => {
	const [themeSprings, setTheme] = useTheme(theme);
	const [view, navigateToView] = useDocsNavigation(initialView);
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('lg');
	const isTablet = isSizeOrLess('lg') && !isMobile;
	const isMobileOrTablet = isMobile || isTablet;

	const [openSections, setOpenSections] = useState<Set<string>>(() => {
		const initial = findSectionForView(initialView);

		return initial ? new Set([initial]) : new Set();
	});

	const [sidebarSpring, sidebarSpringApi] = useSpring(() => ({
		config: { friction: 40, tension: 275 },
		overlayOpacity: 0,
		transform: 'translateX(-100%)'
	}));

	const [tocOpen, setTocOpen] = useState(false);

	const handleNavigate = (newView: DocsView) => {
		navigateToView(newView);
		const section = findSectionForView(newView);
		if (!section) return;

		setOpenSections((current) => new Set([...current, section]));
	};

	const handleToggleSection = (label: string) => {
		setOpenSections((current) => {
			const next = new Set(current);
			if (next.has(label)) {
				next.delete(label);
			} else {
				next.add(label);
			}

			return next;
		});
	};

	const toggleSidebar = () => {
		void sidebarSpringApi.start({
			overlayOpacity: 1,
			transform: 'translateX(0%)'
		});
	};

	const toggleToc = () => {
		setTocOpen((prev) => !prev);
	};

	const ActiveView = docsViews[view];

	return (
		<html lang="en" style={htmlDefault}>
			<Head />
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
							onToggleSection={handleToggleSection}
							openSections={openSections}
							spring={sidebarSpring}
							springApi={sidebarSpringApi}
							themeSprings={themeSprings}
							toggleSidebar={toggleSidebar}
							view={view}
						/>
						<ActiveView
							currentPageId={view}
							isMobileOrTablet={isMobileOrTablet}
							onNavigate={(pageId) => {
								if (isValidViewId(pageId)) {
									handleNavigate(pageId);
								}
							}}
							onTocToggle={toggleToc}
							themeSprings={themeSprings}
							tocOpen={tocOpen}
						/>
					</div>
				</main>
			</animated.body>
		</html>
	);
};
