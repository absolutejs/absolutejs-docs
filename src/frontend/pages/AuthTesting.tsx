import { providerOptions } from '@absolutejs/auth';
import { animated } from '@react-spring/web';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { AuthGrid } from '../components/testing/AuthGrid';
import { Legend } from '../components/testing/Legend';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useCleanPath } from '../hooks/useCleanPath';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';

const queryClient = new QueryClient();

type AuthTestingProps = {
	theme: ThemeMode | undefined;
};

export const AuthTesting = ({ theme }: AuthTestingProps) => {
	useCleanPath();
	const { user, handleSignOut } = useAuthStatus();
	const [themeSprings, setTheme] = useTheme(theme);

	return (
		<html lang="en" style={htmlDefault}>
			<Head />
			<animated.body style={bodyDefault(themeSprings)}>
				<Navbar
					setTheme={setTheme}
					user={user}
					handleSignOut={handleSignOut}
					themeSprings={themeSprings}
				/>
				<main style={mainDefault()}>
					<QueryClientProvider client={queryClient}>
						<header
							style={{
								margin: '3rem auto 2.5rem',
								maxWidth: '800px',
								padding: '0 1.5rem',
								textAlign: 'center'
							}}
						>
							<animated.p
								style={{
									color: themeSprings.contrastSecondary,
									fontSize: '0.875rem',
									fontWeight: 500,
									letterSpacing: '0.1em',
									margin: '0 0 0.75rem',
									textTransform: 'uppercase'
								}}
							>
								Citra & Absolute-Auth
							</animated.p>
							<animated.h1
								style={{
									color: themeSprings.contrastPrimary,
									fontSize: '3rem',
									fontWeight: 700,
									letterSpacing: '-0.02em',
									lineHeight: 1.2,
									margin: 0
								}}
							>
								<animated.span
									style={{
										background:
											'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
										backgroundClip: 'text',
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent'
									}}
								>
									{providerOptions.length}
								</animated.span>{' '}
								Supported Providers
							</animated.h1>
							<animated.p
								style={{
									color: themeSprings.contrastSecondary,
									fontSize: '1.125rem',
									lineHeight: 1.6,
									margin: '1rem 0 0',
									maxWidth: '600px',
									marginLeft: 'auto',
									marginRight: 'auto'
								}}
							>
								Validate OAuth flows in real-time. Each provider
								below can be tested for authorization, profile
								fetching, token refresh, and revocation.
							</animated.p>
						</header>

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
