import { providerOptions } from '@absolutejs/auth';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { Legend } from '../components/testing/Legend';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';
import { OAuthLink } from '../components/auth/OAuthLink';
import { OAuthButton } from '../components/auth/OAuthButton';

export const AuthTesting = () => {
	const { user, handleSignOut } = useAuthStatus();

	return (
		<html lang="en" style={htmlDefault}>
			<Head />
			<body style={bodyDefault}>
				<Navbar user={user} handleSignOut={handleSignOut} />
				<main style={mainDefault}>
					<h1
						style={{
							color: '#222',
							fontSize: '2.25rem',
							fontWeight: 600,
							margin: '2rem 0',
							textAlign: 'center'
						}}
					>
						Absolute-Auth and Citra currently support{' '}
						{providerOptions.length} OAuth 2.0 providers
					</h1>

					<p
						style={{
							backgroundColor: '#fff',
							border: '1px solid #ddd',
							borderRadius: '8px',
							boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
							margin: '0 auto 2rem',
							maxWidth: '800px',
							padding: '20px',
							textAlign: 'center'
						}}
					>
						Below is a list of all supported providers, including
						relevant information tags and their current status.
						<br />
						<br />
						Test providers from this screen by opening a provider's
						tab—you'll find a link to create an OAuth app on that
						provider and controls to exercise each step of the OAuth
						2.0 flow.
					</p>

					<Legend />

					<div
						style={{
							display: 'grid',
							gap: '12px',
							gridTemplateColumns:
								'repeat(auto-fill, minmax(180px, 1fr))',
							margin: '0 auto 2rem',
							maxWidth: '800px',
							width: '100%'
						}}
					>
						{providerOptions.map((provider) => (
							<OAuthButton key={provider} provider={provider} />
						))}
					</div>
				</main>
			</body>
		</html>
	);
};
