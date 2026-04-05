import { ProviderOption } from '@absolutejs/auth';
import { animated } from '@react-spring/web';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { AuroraBackground } from '../components/utils/AuroraBackground';
import { AuthGrid } from '../components/testing/AuthGrid';
import { AuthTestingPageHeader } from '../components/testing/AuthTestingPageHeader';
import { Legend } from '../components/testing/Legend';
import { useCleanPath } from '../hooks/useCleanPath';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';
import { User } from '../../../db/schema';

const queryClient = new QueryClient();

type AuthTestingProps = {
	user: User | null;
	theme: ThemeMode | undefined;
	initialProvider: ProviderOption | undefined;
};

export const AuthTesting = ({
	user,
	theme,
	initialProvider
}: AuthTestingProps) => {
	useCleanPath();
	const [themeSprings, setTheme] = useTheme(theme);

	return (
		<html lang="en" style={htmlDefault}>
			<Head />
			<animated.body
				style={{ ...bodyDefault(themeSprings), position: 'relative' }}
			>
				<AuroraBackground themeSprings={themeSprings} />
				<Navbar
					setTheme={setTheme}
					themeSprings={themeSprings}
					user={user}
				/>
				<main
					style={{
						...mainDefault(),
						position: 'relative',
						zIndex: 1
					}}
				>
					<QueryClientProvider client={queryClient}>
						<AuthTestingPageHeader themeSprings={themeSprings} />

						<Legend />

						<AuthGrid
							initialProvider={initialProvider}
							themeSprings={themeSprings}
							user={user}
						/>
					</QueryClientProvider>
				</main>
			</animated.body>
		</html>
	);
};
