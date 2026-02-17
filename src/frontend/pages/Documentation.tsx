import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';
import { DocsView, isMenuDropdown } from '../../types/types';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { MobileSidebar } from '../components/sidebar/MobileSidebar';
import { MobileSidebarToggle } from '../components/sidebar/MobileSidebarToggle';
import { Sidebar } from '../components/sidebar/Sidebar';
import { docsViews, sidebarData } from '../data/sidebarData';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useDocsNavigation } from '../hooks/useDocsNavigation';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';

type DocumentationProps = {
	theme: ThemeMode | undefined;
	initialView: DocsView;
};

const findSectionForView = (view: DocsView): string | null => {
	for (const section of sidebarData) {
		if (isMenuDropdown(section)) {
			if (section.buttons.some((btn) => btn.id === view)) {
				return section.label;
			}
		}
	}
	return null;
};

export const Documentation = ({ theme, initialView }: DocumentationProps) => {
	const { user, handleSignOut } = useAuthStatus();
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
		if (section) {
			setOpenSections((current) => new Set([...current, section]));
		}
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
			<animated.body style={bodyDefault(themeSprings)}>
				<Navbar
					setTheme={setTheme}
					themeSprings={themeSprings}
					user={user}
					handleSignOut={handleSignOut}
				/>
				<main style={{ ...mainDefault('hidden'), alignItems: 'stretch' }}>
					<div
						style={{
							display: 'flex',
							flex: 1,
							minHeight: 0,
							overflow: 'hidden'
						}}
					>
						{isMobile ? (
							<>
								<MobileSidebarToggle
									onToggle={toggleSidebar}
									themeSprings={themeSprings}
								/>
								<MobileSidebar
									spring={sidebarSpring}
									springApi={sidebarSpringApi}
									view={view}
									themeSprings={themeSprings}
									navigateToView={handleNavigate}
									openSections={openSections}
									onToggleSection={handleToggleSection}
								/>
							</>
						) : (
							<Sidebar
								view={view}
								themeSprings={themeSprings}
								navigateToView={handleNavigate}
								openSections={openSections}
								onToggleSection={handleToggleSection}
							/>
						)}
						<ActiveView
							themeSprings={themeSprings}
							currentPageId={view}
							onNavigate={(pageId) =>
								handleNavigate(pageId as DocsView)
							}
							tocOpen={tocOpen}
							onTocToggle={toggleToc}
							isMobileOrTablet={isMobileOrTablet}
						/>
					</div>
				</main>
			</animated.body>
		</html>
	);
};
