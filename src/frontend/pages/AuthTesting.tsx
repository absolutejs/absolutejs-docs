import { providerOptions } from '@absolutejs/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { AuthGrid } from '../components/testing/AuthGrid';
import { AuthTestingHero } from '../components/testing/AuthTestingHero';
import { Legend } from '../components/testing/Legend';
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

						<AuthTestingHero />

						<Legend />

						<AuthGrid handleSignOut={handleSignOut} user={user} />
					</QueryClientProvider>
				</main>
			</body>
		</html>
	);
};
