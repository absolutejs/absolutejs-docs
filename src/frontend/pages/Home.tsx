import { AuthArticle } from '../components/home/AuthArticle';
import { CodeQualityArticle } from '../components/home/CodeQualityArticle';
import { CommandSection } from '../components/home/CommandSection';
import { DatabaseArticle } from '../components/home/DatabaseArticle';
import { PerformanceArticle } from '../components/home/PerformanceArticle';
import { TypeSafeArticle } from '../components/home/TypeSafeArticle';
import { UIArticle } from '../components/home/UIArticle';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useInitTheme } from '../hooks/useInitTheme';
import { featureWrapper } from '../styles/homeStyles';
import { htmlDefault, bodyDefault, mainDefault } from '../styles/styles';

export const Home = () => {
	const { user, handleSignOut } = useAuthStatus();
	useInitTheme();

	return (
		<html lang="en" style={htmlDefault}>
			<Head />
			<body style={bodyDefault}>
				<Navbar user={user} handleSignOut={handleSignOut} />
				<main style={mainDefault}>
					<CommandSection />
					<section style={featureWrapper}>
						<TypeSafeArticle />
						<PerformanceArticle />
						<UIArticle />
						<DatabaseArticle />
						<CodeQualityArticle />
						<AuthArticle />
					</section>
				</main>
			</body>
		</html>
	);
};
