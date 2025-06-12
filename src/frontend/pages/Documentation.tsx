import { animated } from '@react-spring/web';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { Sidebar } from '../components/sidebar/Sidebar';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useThemeColors } from '../hooks/useThemeColors';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';
import { Overview } from '../components/documentation/Overview';

export const Documentation = () => {
	const { user, handleSignOut } = useAuthStatus();
	const themeSprings = useThemeColors();

	return (
		<html lang="en" style={htmlDefault}>
			<Head />
			<animated.body style={bodyDefault(themeSprings)}>
				<Navbar
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
