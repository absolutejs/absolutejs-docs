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

const homeStructuredData = JSON.stringify([
	{
		'@context': 'https://schema.org',
		'@type': 'Organization',
		logo: 'https://absolutejs.com/assets/png/absolutejs-logo.png',
		name: 'AbsoluteJS',
		url: 'https://absolutejs.com/'
	},
	{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		description:
			'Full-stack TypeScript framework and package ecosystem for Bun and Elysia.',
		name: 'AbsoluteJS',
		url: 'https://absolutejs.com/'
	}
]);

export const Home = ({ user, theme }: HomeProps) => {
	const [themeSprings, setTheme] = useTheme(theme);

	return (
		<html lang="en" style={htmlDefault}>
			<Head
				canonicalUrl="https://absolutejs.com/"
				description="Build full-stack TypeScript applications on Bun and Elysia with server rendering for React, Vue, Svelte, Angular, HTML, and HTMX."
				jsonLd={homeStructuredData}
				title="AbsoluteJS | Full-Stack TypeScript Framework for Bun"
			/>
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
