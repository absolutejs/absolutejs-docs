import { animated } from '@react-spring/web';
import { User } from '../../../db/schema';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';

type BlogProps = {
	user: User | null;
	theme: ThemeMode | undefined;
};

export const Blog = ({ user, theme }: BlogProps) => {
	const [themeSprings, setTheme] = useTheme(theme);

	return (
		<html lang="en" style={htmlDefault}>
			<Head title="Blog - AbsoluteJS" />
			<animated.body style={bodyDefault(themeSprings)}>
				<Navbar
					themeSprings={themeSprings}
					user={user}
					setTheme={setTheme}
				/>
				<main style={mainDefault()}>
					<animated.div
						style={{
							color: themeSprings.contrastPrimary,
							maxWidth: '800px',
							padding: '4rem 2rem',
							width: '100%'
						}}
					>
						<animated.h1
							style={{
								color: themeSprings.contrastPrimary,
								fontSize: '2.5rem',
								fontWeight: 700,
								marginBottom: '1rem'
							}}
						>
							Blog
						</animated.h1>
						<animated.p
							style={{
								color: themeSprings.contrastSecondary,
								fontSize: '1.125rem'
							}}
						>
							Coming soon.
						</animated.p>
					</animated.div>
				</main>
			</animated.body>
		</html>
	);
};
