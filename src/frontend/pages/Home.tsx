import { CSSProperties } from 'react';
import { CreateButton } from '../components/home/CreateButton';
import { HomeHeader } from '../components/home/HomeHeader';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { frontendCode, serverCode, treatyCode } from '../data/edenCode';
import { useAuthStatus } from '../hooks/useAuthStatus';
import {
	htmlDefault,
	bodyDefault,
	mainDefault,
	headingStyle,
	paragraphStyle
} from '../styles/styles';
import { CommandSection } from '../components/home/CommandSection';
import { featureWrapper } from '../styles/homeStyles';
import { TypeSafeArticle } from '../components/home/TypeSafeArticle';
import { PerformanceArticle } from '../components/home/PerformanceArticle';
import { UIArticle } from '../components/home/UIArticle';
import { DatabaseArticle } from '../components/home/DatabaseArticle';
import { CodeQualityArticle } from '../components/home/CodeQualityArticle';
import { AuthArticle } from '../components/home/AuthArticle';

export const Home = () => {
	const { user, handleSignOut } = useAuthStatus();

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
