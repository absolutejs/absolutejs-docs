import { CreateButton } from '../components/home/CreateButton';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { CSSProperties } from 'react';
import {
	htmlDefault,
	bodyDefault,
	mainDefault,
	headingStyle,
	paragraphStyle
} from '../styles/styles';
import { frontendCode, serverCode, treatyCode } from '../data/edenCode';
import { HomeHeader } from '../components/home/HomeHeader';

const heroStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	textAlign: 'center',
	padding: '4rem 2rem'
};

const navStyle: CSSProperties = {
	display: 'flex',
	gap: '1rem',
	marginTop: '1rem'
};

const featureWrapper: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'center',
	gap: '2rem',
	padding: '3rem 1rem'
};

const featureCard: CSSProperties = {
	background: '#faf9f5',
	padding: '1rem',
	borderRadius: '8px',
	border: '1px solid rgba(0,0,0,0.05)',
	boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
	display: 'flex',
	flexDirection: 'column'
};

const codeBlock: CSSProperties = {
	fontFamily: 'monospace',
	background: '#f5f5f5',
	padding: '1rem',
	borderRadius: '4px',
	overflowX: 'auto',
	marginTop: '1rem'
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
									padding: '0.75rem 1.5rem',
									borderRadius: '4px',
									background: '#0070f3',
									color: '#fff',
									border: '1px solid #0070f3',
									textDecoration: 'none',
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								Try in Browser
							</a>
							<a
								href="/docs"
								style={{
									padding: '0.75rem 1.5rem',
									borderRadius: '4px',
									background: 'transparent',
									color: '#0070f3',
									border: '1px solid #0070f3',
									textDecoration: 'none',
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								Read Docs
							</a>
						</nav>
					</section>

					<section style={featureWrapper}>
						<article style={featureCard}>
							<h2 style={headingStyle}>Type Safe End-to-End</h2>
							<p style={paragraphStyle}>
								Enjoy full TypeScript inference from server
								routes to client calls via Eden.
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
									marginTop: 'auto',
									textDecoration: 'none',
									color: '#0070f3'
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
