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

const heroStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	flexDirection: 'column',
	padding: '4rem 2rem',
	textAlign: 'center'
};

const navStyle: CSSProperties = {
	display: 'flex',
	gap: '1rem',
	marginTop: '1rem'
};

const featureWrapper: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	gap: '2rem',
	justifyContent: 'center',
	padding: '3rem 1rem'
};

const featureCard: CSSProperties = {
	background: '#faf9f5',
	border: '1px solid rgba(0,0,0,0.05)',
	borderRadius: '8px',
	boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
	display: 'flex',
	flexDirection: 'column',
	padding: '1rem'
};

const codeBlock: CSSProperties = {
	background: '#f5f5f5',
	borderRadius: '4px',
	fontFamily: 'monospace',
	marginTop: '1rem',
	overflowX: 'auto',
	padding: '1rem'
};

export const Home = () => {
	const { user, handleSignOut } = useAuthStatus();

	return (
		<html lang="en" style={htmlDefault}>
			<Head />
			<body style={bodyDefault}>
				<Navbar user={user} handleSignOut={handleSignOut} />
				<main style={mainDefault}>
					<section style={heroStyle}>
						<HomeHeader />
						<CreateButton />
						<nav style={navStyle}>
							<a
								href="/playground"
								style={{
									alignItems: 'center',
									background: '#0070f3',
									border: '1px solid #0070f3',
									borderRadius: '4px',
									color: '#fff',
									display: 'inline-flex',
									justifyContent: 'center',
									padding: '0.75rem 1.5rem',
									textDecoration: 'none'
								}}
							>
								Try in Browser
							</a>
							<a
								href="/docs"
								style={{
									alignItems: 'center',
									background: 'transparent',
									border: '1px solid #0070f3',
									borderRadius: '4px',
									color: '#0070f3',
									display: 'inline-flex',
									justifyContent: 'center',
									padding: '0.75rem 1.5rem',
									textDecoration: 'none'
								}}
							>
								Read Docs
							</a>
						</nav>
					</section>

					<section style={featureWrapper}>
						<article style={featureCard}>
							<h2 style={headingStyle}>Type Safe All Around</h2>
							<p style={paragraphStyle}>
								Maximize the power of TypeScript with
								AbsoluteJS. From the database, to the backend,
								to the frontend, everything is type safe.
							</p>
							<pre style={codeBlock}>{serverCode}</pre>
							<pre style={codeBlock}>{treatyCode}</pre>
							<pre style={codeBlock}>{frontendCode}</pre>
						</article>

						<article style={featureCard}>
							<h2 style={headingStyle}>
								21x Faster Than Express
							</h2>
							<p style={paragraphStyle}>
								Harness Bun's JIT performance with Elysia's
								minimal core for ultrafast SSR.
							</p>
							<a
								href="https://bun.sh"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									color: '#0070f3',
									marginTop: 'auto',
									textDecoration: 'none'
								}}
							>
								Learn more
							</a>
						</article>

						<article style={featureCard}>
							<h2 style={headingStyle}>
								Seamless UI Integration
							</h2>
							<p style={paragraphStyle}>
								Keep using React, Vue, Svelte, HTML, or
								HTMX—AbsoluteJS just plugs them in.
							</p>
						</article>

						<article style={featureCard}>
							<h2 style={headingStyle}>Databases & ORMs</h2>
							<p style={paragraphStyle}>
								Built-in adapters for Drizzle & Prisma alongside
								Postgres, MySQL, and SQLite drivers.
							</p>
						</article>

						<article style={featureCard}>
							<h2 style={headingStyle}>Code Quality Tools</h2>
							<p style={paragraphStyle}>
								Ships with ESLint, Prettier, and Biome
								configurations for zero-setup code quality.
							</p>
						</article>

						<article style={featureCard}>
							<h2 style={headingStyle}>Absolute Auth</h2>
							<p style={paragraphStyle}>
								Secure your app instantly with 66 preconfigured
								OAuth2 providers.
							</p>
						</article>
					</section>
				</main>
			</body>
		</html>
	);
};
