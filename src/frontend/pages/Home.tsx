import { animated } from '@react-spring/web';
import { BenchmarkChart } from '../components/home/BenchmarkChart';
import { CommandSection } from '../components/home/CommandSection';
import { CTASection } from '../components/home/CTASection';
import { EdenSection } from '../components/home/EdenSection';
import { FeaturesGrid } from '../components/home/FeaturesGrid';
import { FrameworksShowcase } from '../components/home/FrameworksShowcase';
import { PerformanceArticle } from '../components/home/PerformanceArticle';
import { TypeSafeArticle } from '../components/home/TypeSafeArticle';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { AuroraBackground } from '../components/utils/AuroraBackground';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';
import { User } from '../../../db/schema';

type HomeProps = {
	user: User | null;
	theme: ThemeMode | undefined;
};

export const Home = ({ user, theme }: HomeProps) => {
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
					<CommandSection themeSprings={themeSprings} />
					<FeaturesGrid themeSprings={themeSprings} />
					<FrameworksShowcase themeSprings={themeSprings} />
					<EdenSection themeSprings={themeSprings} />
					<BenchmarkChart themeSprings={themeSprings} />
					<TypeSafeArticle themeSprings={themeSprings} />
					<PerformanceArticle themeSprings={themeSprings} />
					<CTASection />
				</main>
			</animated.body>
		</html>
	);
};
