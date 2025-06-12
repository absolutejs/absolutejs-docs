import { animated } from '@react-spring/web';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { Sidebar } from '../components/sidebar/Sidebar';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useThemeColors } from '../hooks/useThemeColors';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';

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
						<div
							style={{
								display: 'flex',
								flex: 1,
								flexDirection: 'column',
								padding: '1rem 2rem'
							}}
						>
							<h1>Documentation</h1>
							<p>
								Welcome to the documentation page. Here you will
								find all the information you need to get started
								with our application.
							</p>
							<p>
								Feel free to explore the various sections and
								learn more about the features we offer.
							</p>
						</div>
					</div>
				</main>
			</animated.body>
		</html>
	);
};
