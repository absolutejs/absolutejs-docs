import { providerOptions } from '@absolutejs/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { AuthGrid } from '../components/testing/AuthGrid';
import { Legend } from '../components/testing/Legend';
import { ToastProvider } from '../components/utils/ToastProvider';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useCleanPath } from '../hooks/useCleanPath';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';

const queryClient = new QueryClient();

export const AuthTesting = () => {
	const { user, handleSignOut } = useAuthStatus();
	useCleanPath();

	return (
		<html lang="en" style={htmlDefault}>
			<Head />
			<body style={bodyDefault}>
				<Navbar user={user} handleSignOut={handleSignOut} />
				<main style={mainDefault}>
					<QueryClientProvider client={queryClient}>
						<h1
							style={{
								color: '#222',
								fontSize: '2.25rem',
								fontWeight: 600,
								margin: '2rem 0',
								textAlign: 'center'
							}}
						>
							Citra and Absolute-Auth currently support{' '}
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
							Below is a list of all supported providers,
							including relevant information tags and their
							current status.
							<br />
							<br />
							Test providers from this screen by opening a
							provider's tab—you'll find a link to create an OAuth
							app on that provider and controls to exercise each
							step of the OAuth 2.0 flow.
						</p>

						<Legend />
						<ToastProvider>
							<AuthGrid
								handleSignOut={handleSignOut}
								user={user}
							/>
						</ToastProvider>
					</QueryClientProvider>
				</main>
			</body>
		</html>
	);
};
