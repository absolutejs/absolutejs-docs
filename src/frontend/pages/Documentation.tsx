import React from 'react';
import { animated } from '@react-spring/web';
import { DocsView } from '../../types/types';
import type { ThemeSprings } from '../../types/springTypes';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { Sidebar } from '../components/sidebar/Sidebar';
import { docsViews } from '../data/sidebarData';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useDocsNavigation } from '../hooks/useDocsNavigation';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';

//Import statement for Quick Install component
import QuickInstall from '../components/documentation/QuickInstall';

type DocumentationProps = {
	theme: ThemeMode | undefined;
	initialView: DocsView;
};

export const Documentation = ({ theme, initialView }: DocumentationProps) => {
	const { user, handleSignOut } = useAuthStatus();
	const [themeSprings, setTheme] = useTheme(theme);
	const [view, navigateToView] = useDocsNavigation(initialView);

	const ActiveView = docsViews[view];

	// Function to render the active view with themeSprings when needed
	const renderActiveView = () => {
		if (view === 'installation' || view === 'eslint') {
			const Component = ActiveView as React.ComponentType<{ themeSprings?: ThemeSprings }>;
			return <Component themeSprings={themeSprings} />;
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
							overflow: 'hidden'
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
