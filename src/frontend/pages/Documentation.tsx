import React from 'react';
import { animated } from '@react-spring/web';
import { DocsView } from '../../types/types';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { Sidebar } from '../components/sidebar/Sidebar';
import { docsViews } from '../data/sidebarData';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useDocsNavigation } from '../hooks/useDocsNavigation';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import type { ThemeSprings } from '../../types/springTypes';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';

// Eslint component is now EslintView imported via docsViews

type DocumentationProps = {
	theme: ThemeMode | undefined;
	initialView: DocsView;
};

export const Documentation = ({ theme, initialView }: DocumentationProps) => {
	const { user, handleSignOut } = useAuthStatus();
	const [themeSprings, setTheme] = useTheme(theme);
	const [view, navigateToView] = useDocsNavigation(initialView);
	const { isSizeOrLess } = useMediaQuery();

	// Responsive breakpoints
	const isTablet = isSizeOrLess('md'); // 768px and below
	const isMobile = isSizeOrLess('sm'); // 640px and below

	const ActiveView = docsViews[view];

	// Special handling for EslintView to pass themeSprings
	const renderActiveView = () => {
		if (view === 'eslint') {
			const EslintComponent = ActiveView as React.ComponentType<{ themeSprings?: ThemeSprings }>;
			return <EslintComponent themeSprings={themeSprings} />;
		}
		return <ActiveView />;
	};

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
				<main style={mainDefault('hidden')}>
					<div
						style={{
							display: 'flex',
							flex: 1,
							minHeight: 0,
							overflow: 'hidden',
							flexDirection: isMobile ? 'column' : 'row',
							minWidth: 0, // Allow container to shrink
							width: '100%' // Ensure full width utilization
						}}
					>
						<Sidebar
							view={view}
							themeSprings={themeSprings}
							navigateToView={navigateToView}
						/>
						{renderActiveView()}
					</div>
				</main>
			</animated.body>
		</html>
	);
};
