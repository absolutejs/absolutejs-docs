import { useEffect } from 'react';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { useAuthStatus } from '../hooks/useAuthStatus';
import {
	htmlDefault,
	bodyDefault,
	mainDefault,
	headingStyle,
	paragraphStyle
} from '../styles/styles';

export const Home = () => {
	const { user, handleSignOut } = useAuthStatus();

	// Remove harmless OAuth fragments inserted by Facebook and Reddit
	useEffect(() => {
		const { hash } = window.location;
		if (hash === '#_=_' || hash === '#_') {
			// Strip the fragment without reloading the page
			window.history.replaceState(
				null,
				document.title,
				window.location.pathname + window.location.search
			);
		}
	}, []);

	return (
		<html lang="en" style={htmlDefault}>
			<Head />
			<body style={bodyDefault}>
				<Navbar user={user} handleSignOut={handleSignOut} />
				<main style={mainDefault}>
					<h1 style={headingStyle}>Welcome to Citra Example</h1>
					<p style={paragraphStyle}>
						Citra is a lightweight TypeScript OAuth2 client library
						that makes it easy to authorize users, refresh, and
						revoke tokens with just a few lines of code.
					</p>
				</main>
			</body>
		</html>
	);
};
