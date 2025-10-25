import { animated } from '@react-spring/web';
import { useState } from 'react';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { bodyDefault, htmlDefault, mainDefault } from '../styles/styles';

type SandBoxProps = {
	theme: ThemeMode | undefined;
};

type FormData = {
	projectName: string;
	frontends: string[];
	database: string;
	auth: string;
};

export const SandBox = ({ theme }: SandBoxProps) => {
	const { user, handleSignOut } = useAuthStatus();
	const [themeSprings, setTheme] = useTheme(theme);
	const [sandboxUrl, setSandboxUrl] = useState('');
	const [isGenerating, setIsGenerating] = useState(false);

	const [formData, setFormData] = useState<FormData>({
		projectName: 'my-app',
		frontends: ['react'],
		database: 'postgresql',
		auth: 'absolute-auth'
	});

	const handleCheckbox = (frontend: string) => {
		setFormData((prev) => ({
			...prev,
			frontends: prev.frontends.includes(frontend)
				? prev.frontends.filter((f) => f !== frontend)
				: [...prev.frontends, frontend]
		}));
	};

	const generateSandbox = () => {
		setIsGenerating(true);

		const files = {
			'package.json': {
				content: {
					name: formData.projectName,
					version: '1.0.0',
					description: 'AbsoluteJS Project',
					dependencies: {
						'elysia': 'latest',
						'@absolutejs/absolute': 'latest',
						...(formData.frontends.includes('react') && {
							'react': '^18.0.0',
							'react-dom': '^18.0.0'
						}),
						...(formData.frontends.includes('vue') && {
							'vue': '^3.0.0'
						}),
						...(formData.frontends.includes('svelte') && {
							'svelte': '^4.0.0'
						}),
						...(formData.database !== 'none' && {
							'drizzle-orm': 'latest'
						}),
						...(formData.auth !== 'none' && {
							'@absolutejs/auth': 'latest'
						})
					}
				}
			},
			'src/server.ts': {
				content: `import { Elysia } from 'elysia';
${formData.frontends.includes('react') ? "import { handleReactPageRequest } from '@absolutejs/absolute';" : ''}
${formData.auth !== 'none' ? "import { absoluteAuth } from '@absolutejs/auth';" : ''}

const server = new Elysia()
${formData.auth !== 'none' ? '  .use(absoluteAuth())' : ''}
  .get('/', () => 'Hello from ${formData.projectName}!')
  .listen(3000);

console.log('🚀 Server running at http://localhost:3000');
`
			},
			'README.md': {
				content: `# ${formData.projectName}

## Configuration
- Frontends: ${formData.frontends.join(', ')}
- Database: ${formData.database}
- Auth: ${formData.auth}

## Getting Started
\`\`\`bash
bun install
bun dev
\`\`\`
`
			}
		};

		const parameters = {
			files: files
		};

		fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(parameters)
		})
			.then((response) => response.json())
			.then((data) => {
				const url = `https://codesandbox.io/s/${data.sandbox_id}`;
				setSandboxUrl(url);
				setIsGenerating(false);
			})
			.catch((error) => {
				console.error('Error creating sandbox:', error);
				const compressed = btoa(JSON.stringify(parameters));
				const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${compressed}`;
				setSandboxUrl(url);
				setIsGenerating(false);
			});
	};

	return (
		<html lang="en" style={htmlDefault}>
			<Head title="AbsoluteJS Sandbox" />
			<animated.body style={bodyDefault(themeSprings)}>
				<Navbar
					setTheme={setTheme}
					themeSprings={themeSprings}
					user={user}
					handleSignOut={handleSignOut}
				/>
				<main style={mainDefault()}>
					<animated.div
						style={{
							margin: '2rem auto',
							maxWidth: sandboxUrl ? '100%' : '900px',
							padding: sandboxUrl ? '0' : '0 2rem',
							width: '100%',
							height: sandboxUrl ? 'calc(100vh - 80px)' : 'auto'
						}}
					>
						{!sandboxUrl ? (
							<>
								<animated.h1
									style={{
										color: themeSprings.contrastPrimary,
										fontSize: '2.5rem',
										marginBottom: '0.5rem',
										textAlign: 'center'
									}}
								>
									Create AbsoluteJS Sandbox
								</animated.h1>

								<animated.p
									style={{
										color: themeSprings.contrastSecondary,
										fontSize: '1.1rem',
										marginBottom: '3rem',
										textAlign: 'center'
									}}
								>
									Configure your project and launch a live CodeSandbox
								</animated.p>

								<animated.div
									style={{
										backgroundColor: themeSprings.themeTertiary,
										borderRadius: '12px',
										padding: '2rem'
									}}
								>
									<h2
										style={{
											fontSize: '1.5rem',
											marginBottom: '1.5rem'
										}}
									>
										Project Configuration
									</h2>
									<div style={{ marginBottom: '1.5rem' }}>
										<label
											style={{
												display: 'block',
												fontWeight: 600,
												marginBottom: '0.5rem'
											}}
										>
											Project Name
										</label>
										<input
											type="text"
											value={formData.projectName}
											onChange={(e) =>
												setFormData({ ...formData, projectName: e.target.value })
											}
											style={{
												border: '1px solid #444',
												borderRadius: '4px',
												fontSize: '1rem',
												padding: '0.75rem',
												width: '100%'
											}}
										/>
									</div>

									<div style={{ marginBottom: '1.5rem' }}>
										<label
											style={{
												display: 'block',
												fontWeight: 600,
												marginBottom: '0.5rem'
											}}
										>
											Frontend Frameworks
										</label>
										<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
											{['react', 'vue', 'svelte', 'angular', 'html', 'htmx'].map(
												(frontend) => (
													<label
														key={frontend}
														style={{
															alignItems: 'center',
															cursor: 'pointer',
															display: 'flex',
															gap: '0.5rem'
														}}
													>
														<input
															type="checkbox"
															checked={formData.frontends.includes(frontend)}
															onChange={() => handleCheckbox(frontend)}
															style={{ cursor: 'pointer' }}
														/>
														{frontend.charAt(0).toUpperCase() + frontend.slice(1)}
													</label>
												)
											)}
										</div>
									</div>

									<div style={{ marginBottom: '1.5rem' }}>
										<label
											style={{
												display: 'block',
												fontWeight: 600,
												marginBottom: '0.5rem'
											}}
										>
											Database
										</label>
										<select
											value={formData.database}
											onChange={(e) =>
												setFormData({ ...formData, database: e.target.value })
											}
											style={{
												border: '1px solid #444',
												borderRadius: '4px',
												fontSize: '1rem',
												padding: '0.75rem',
												width: '100%'
											}}
										>
											<option value="postgresql">PostgreSQL</option>
											<option value="mysql">MySQL</option>
											<option value="sqlite">SQLite</option>
											<option value="none">None</option>
										</select>
									</div>

									<div style={{ marginBottom: '1.5rem' }}>
										<label
											style={{
												display: 'block',
												fontWeight: 600,
												marginBottom: '0.5rem'
											}}
										>
											Authentication
										</label>
										<select
											value={formData.auth}
											onChange={(e) =>
												setFormData({ ...formData, auth: e.target.value })
											}
											style={{
												border: '1px solid #444',
												borderRadius: '4px',
												fontSize: '1rem',
												padding: '0.75rem',
												width: '100%'
											}}
										>
											<option value="absolute-auth">Absolute Auth</option>
											<option value="none">None</option>
										</select>
									</div>

									<button
										onClick={generateSandbox}
										disabled={isGenerating || formData.frontends.length === 0}
										style={{
											background:
												isGenerating || formData.frontends.length === 0
													? '#666'
													: '#0070f3',
											border: 'none',
											borderRadius: '4px',
											color: '#fff',
											cursor:
												isGenerating || formData.frontends.length === 0
													? 'not-allowed'
													: 'pointer',
											fontSize: '1.1rem',
											fontWeight: 600,
											marginTop: '1rem',
											padding: '1rem',
											width: '100%'
										}}
									>
										{isGenerating
											? '⏳ Creating Sandbox...'
											: '🚀 Launch CodeSandbox'}
									</button>
								</animated.div>
							</>
						) : (
							<>
								<div style={{ padding: '1rem 2rem' }}>
									<button
										onClick={() => setSandboxUrl('')}
										style={{
											background: 'transparent',
											border: '1px solid #0070f3',
											borderRadius: '4px',
											color: '#0070f3',
											cursor: 'pointer',
											fontSize: '1rem',
											fontWeight: 600,
											marginBottom: '1rem',
											padding: '0.75rem 1.5rem'
										}}
									>
										← Back to Configuration
									</button>
								</div>

								<iframe
									src={sandboxUrl + '?view=editor'}
									style={{
										border: 0,
										borderRadius: '4px',
										height: '100%',
										overflow: 'hidden',
										width: '100%'
									}}
									title={formData.projectName}
									allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
									sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
								/>
							</>
						)}
					</animated.div>
				</main>
			</animated.body>
		</html>
	);
};
