import { providerOptions } from '@absolutejs/auth';
import { animated } from '@react-spring/web';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { AuthGrid } from '../components/testing/AuthGrid';
import { AuthTestingHero } from '../components/testing/AuthTestingHero';
import { Legend } from '../components/testing/Legend';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useCleanPath } from '../hooks/useCleanPath';
import { useThemeColors } from '../hooks/useThemeColors';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';

const queryClient = new QueryClient();

export const AuthTesting = () => {
	const { user, handleSignOut } = useAuthStatus();
	useCleanPath();
	const themeSprings = useThemeColors();

	return (
		<html lang="en" style={htmlDefault}>
			<Head />
			<animated.body style={bodyDefault(themeSprings)}>
				<Navbar
					user={user}
					handleSignOut={handleSignOut}
					themeSprings={themeSprings}
				/>
				<main style={mainDefault}>
					<QueryClientProvider client={queryClient}>
						<animated.h1
							style={{
								color: themeSprings.contrastPrimary,
								fontSize: '2.25rem',
								fontWeight: 600,
								margin: '2rem 0',
								padding: '0 1rem',
								textAlign: 'center'
							}}
						>
							Citra and Absolute-Auth currently support{' '}
							{providerOptions.length} OAuth 2.0 providers
						</animated.h1>

						<AuthTestingHero themeSprings={themeSprings} />

						<Legend themeSprings={themeSprings} />

						<AuthGrid
							handleSignOut={handleSignOut}
							user={user}
							themeSprings={themeSprings}
						/>
					</QueryClientProvider>
				</main>
			</animated.body>
		</html>
	);
};
