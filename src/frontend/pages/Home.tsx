import { CreateButton } from '../components/home/CreateButton';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { useAuthStatus } from '../hooks/useAuthStatus';
import {
	htmlDefault,
	bodyDefault,
	mainDefault,
	headingStyle,
	paragraphStyle
} from '../styles/styles';

export const Home = () => {
	const { user, handleSignOut } = useAuthStatus();

	return (
		<html lang="en" style={htmlDefault}>
			<Head />
			<body style={bodyDefault}>
				<Navbar user={user} handleSignOut={handleSignOut} />
				<main style={mainDefault}>
					<article
						style={{
							alignItems: 'center',
							display: 'flex',
							flex: '1',
							flexDirection: 'column',
							justifyContent: 'center'
						}}
					>
						<h1 style={headingStyle}>Welcome to AbsoluteJS</h1>
						<p style={paragraphStyle}>
							AbsoluteJS is a powerful and flexible JavaScript
							framework that provides a wide range of features and
							tools for building modern web applications. Whether
							you're a beginner or an experienced developer,
							AbsoluteJS has something to offer you.
						</p>
						<CreateButton />
					</article>
				</main>
			</body>
		</html>
	);
};
