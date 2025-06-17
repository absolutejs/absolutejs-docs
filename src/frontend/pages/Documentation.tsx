import { animated } from '@react-spring/web';
import { Overview } from '../components/documentation/Overview';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { Sidebar } from '../components/sidebar/Sidebar';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';

type DocumentationProps = {
	section: string;
	theme: ThemeMode | undefined;
};

export const Documentation = ({ section, theme }: DocumentationProps) => {
	const { user, handleSignOut } = useAuthStatus();
	const [themeSprings, setTheme] = useTheme(theme);

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
				<main style={mainDefault}>
					<div
						style={{
							display: 'flex',
							flex: 1
						}}
					>
						<Sidebar themeSprings={themeSprings} />
						<Overview />
					</div>
				</main>
			</animated.body>
		</html>
	);
};
