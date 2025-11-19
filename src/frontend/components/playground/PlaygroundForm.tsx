import { useMemo, useState, ChangeEvent } from 'react';
import { animated } from '@react-spring/web';
import { ThemeProps, ThemeSprings } from '../../../types/springTypes';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { CopyButton } from '../utils/CopyButton';
import {
	commandCardStyle,
	commandCodeStyle,
	commandHeaderRowStyle,
	commandLabelStyle,
	commandTitleStyle,
	fieldsetStyle,
	formCardStyle,
	inputsGridStyle,
	legendStyle,
	playgroundGridBase,
	playgroundWrapperStyle,
	radioRowStyle,
	sectionSubtitleStyle,
	sectionTitleStyle,
	textInputStyle,
	checkboxRowStyle
} from '../../styles/playgroundStyles';

type DatabaseEngine =
	| 'none'
	| 'postgresql'
	| 'sqlite'
	| 'mysql'
	| 'mariadb'
	| 'gel'
	| 'mongodb';

type ORM = 'drizzle' | 'prisma' | undefined;

type CodeQualityTool = 'eslint+prettier' | 'biome';

const drizzleDialects: DatabaseEngine[] = [
	'gel',
	'mysql',
	'mariadb',
	'postgresql',
	'sqlite'
];

const prismaDialects: DatabaseEngine[] = [
	'postgresql',
	'mysql',
	'mariadb',
	'mongodb'
];

const pluginOptions = [
	'@elysiajs/cors',
	'@elysiajs/swagger',
	'elysia-rate-limit'
] as const;

type PluginValue = (typeof pluginOptions)[number];

const FRONTEND_OPTIONS = [
	{ key: 'react', label: 'React' },
	{ key: 'html', label: 'HTML' },
	{ key: 'htmx', label: 'HTMX' },
	{ key: 'svelte', label: 'Svelte' },
	{ key: 'vue', label: 'Vue' }
] as const;

export const PlaygroundForm = ({ themeSprings }: ThemeProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('md');

	const [projectName, setProjectName] = useState('absolutejs-project');
	const [configurationType, setConfigurationType] = useState<'default' | 'custom'>('default');
	const [frontends, setFrontends] = useState<string[]>(['react']);
	const [databaseEngine, setDatabaseEngine] =
		useState<DatabaseEngine>('postgresql');
	const [databaseHost, setDatabaseHost] = useState<
		'none' | 'neon' | 'planetscale' | 'turso' | undefined
	>('neon');
	const [orm, setOrm] = useState<ORM>('drizzle');
	const [authProvider, setAuthProvider] =
		useState<'none' | 'absoluteAuth'>('absoluteAuth');
	const [codeQualityTool, setCodeQualityTool] =
		useState<CodeQualityTool>('eslint+prettier');
	const [useTailwind, setUseTailwind] = useState(true);
	const [useHtmlScripts, setUseHtmlScripts] = useState(true);
	const [selectedPlugins, setSelectedPlugins] = useState<PluginValue[]>([
		'@elysiajs/cors',
		'@elysiajs/swagger'
	]);

	const supportsDrizzle = useMemo(
		() => drizzleDialects.includes(databaseEngine),
		[databaseEngine]
	);
	const supportsPrisma = useMemo(
		() => prismaDialects.includes(databaseEngine),
		[databaseEngine]
	);

	// Keep databaseHost / orm in a valid state when DB engine changes
	const handleDatabaseChange = (engine: DatabaseEngine) => {
		setDatabaseEngine(engine);

		if (engine === 'postgresql') {
			setDatabaseHost('neon');
		} else if (engine === 'sqlite') {
			setDatabaseHost('turso');
		} else {
			setDatabaseHost(undefined);
		}

		if (!supportsDrizzle && !supportsPrisma) {
			setOrm(undefined);
		} else if (supportsDrizzle) {
			setOrm('drizzle');
		} else if (supportsPrisma) {
			setOrm('prisma');
		}
	};

	const handleFrontendToggle = (key: string) => {
		setFrontends((prev) =>
			prev.includes(key)
				? prev.filter((f) => f !== key)
				: [...prev, key]
		);
	};

	const handlePluginToggle = (value: PluginValue) => {
		setSelectedPlugins((prev) =>
			prev.includes(value)
				? prev.filter((p) => p !== value)
				: [...prev, value]
		);
	};

	const cliCommand = useMemo(() => {
		const parts: string[] = ['bun', 'create', 'absolutejs'];

		if (projectName.trim()) {
			parts.push(projectName.trim());
		}

		// Frontends -> boolean flags
		if (frontends.includes('react')) parts.push('--react');
		if (frontends.includes('html')) parts.push('--html');
		if (frontends.includes('htmx')) parts.push('--htmx');
		if (frontends.includes('svelte')) parts.push('--svelte');
		if (frontends.includes('vue')) parts.push('--vue');

		// Configuration type
		if (configurationType === 'custom') {
			parts.push('--configuration-type', 'custom');
		}

		// Database + host + ORM
		if (databaseEngine !== 'none') {
			parts.push('--db', databaseEngine);
			if (databaseHost && databaseHost !== 'none') {
				parts.push('--db-host', databaseHost);
			}
			if (orm) {
				parts.push('--orm', orm);
			}
		}

		// Auth provider
		if (authProvider !== 'none') {
			parts.push('--auth', authProvider);
		}

		// Code quality tool
		if (codeQualityTool === 'biome') {
			parts.push('--biome');
		} else if (codeQualityTool === 'eslint+prettier') {
			parts.push('--eslint+prettier');
		}

		// Tailwind & HTML scripts
		if (useTailwind) parts.push('--tailwind');
		if (useHtmlScripts) parts.push('--html-scripts');

		// Additional plugins
		selectedPlugins.forEach((plugin) => {
			parts.push('--plugin', plugin);
		});

		return parts.join(' ');
	}, [
		projectName,
		frontends,
		configurationType,
		databaseEngine,
		databaseHost,
		orm,
		authProvider,
		codeQualityTool,
		useTailwind,
		useHtmlScripts,
		selectedPlugins
	]);

	const renderORMOptions = (springs: ThemeSprings) => {
		if (!supportsDrizzle && !supportsPrisma) {
			return (
				<p style={{ fontSize: '0.85rem', opacity: 0.8 }}>
					The selected database engine doesn&apos;t require an ORM.
				</p>
			);
		}

		return (
			<div style={inputsGridStyle}>
				{supportsDrizzle && (
					<label style={radioRowStyle}>
						<input
							type="radio"
							name="orm"
							value="drizzle"
							checked={orm === 'drizzle'}
							onChange={() => setOrm('drizzle')}
						/>
						<span>Drizzle</span>
					</label>
				)}
				{supportsPrisma && (
					<label style={radioRowStyle}>
						<input
							type="radio"
							name="orm"
							value="prisma"
							checked={orm === 'prisma'}
							onChange={() => setOrm('prisma')}
						/>
						<span>Prisma</span>
					</label>
				)}
				<label style={radioRowStyle}>
					<input
						type="radio"
						name="orm"
						value="none"
						checked={orm === undefined}
						onChange={() => setOrm(undefined)}
					/>
					<span>None</span>
				</label>
			</div>
		);
	};

	const renderDatabaseHostOptions = () => {
		if (databaseEngine === 'postgresql') {
			return (
				<div style={inputsGridStyle}>
					<label style={radioRowStyle}>
						<input
							type="radio"
							name="db-host"
							value="none"
							checked={databaseHost === 'none'}
							onChange={() => setDatabaseHost('none')}
						/>
						<span>None</span>
					</label>
					<label style={radioRowStyle}>
						<input
							type="radio"
							name="db-host"
							value="neon"
							checked={databaseHost === 'neon'}
							onChange={() => setDatabaseHost('neon')}
						/>
						<span>Neon</span>
					</label>
					<label style={radioRowStyle}>
						<input
							type="radio"
							name="db-host"
							value="planetscale"
							checked={databaseHost === 'planetscale'}
							onChange={() => setDatabaseHost('planetscale')}
						/>
						<span>PlanetScale</span>
					</label>
				</div>
			);
		}

		if (databaseEngine === 'sqlite') {
			return (
				<div style={inputsGridStyle}>
					<label style={radioRowStyle}>
						<input
							type="radio"
							name="db-host"
							value="none"
							checked={databaseHost === 'none'}
							onChange={() => setDatabaseHost('none')}
						/>
						<span>None</span>
					</label>
					<label style={radioRowStyle}>
						<input
							type="radio"
							name="db-host"
							value="turso"
							checked={databaseHost === 'turso'}
							onChange={() => setDatabaseHost('turso')}
						/>
						<span>Turso</span>
					</label>
				</div>
			);
		}

		return (
			<p style={{ fontSize: '0.85rem', opacity: 0.8 }}>
				No external host options are required for this engine.
			</p>
		);
	};

	const twoColumnGridStyle = {
		...playgroundGridBase,
		gridTemplateColumns: isMobile
			? 'minmax(0, 1fr)'
			: 'minmax(0, 1.15fr) minmax(0, 1fr)'
	};

	return (
		<animated.section style={playgroundWrapperStyle(themeSprings)}>
			<div style={twoColumnGridStyle}>
				{/* Left: live CLI command preview */}
				<animated.div style={commandCardStyle(themeSprings)}>
					<div style={commandHeaderRowStyle}>
						<div>
							<div style={commandTitleStyle}>
								CLI command preview
							</div>
							<div style={commandLabelStyle}>
								This reflects the options you&apos;ve selected
								below.
							</div>
						</div>
						<CopyButton text={cliCommand} />
					</div>
					<pre style={commandCodeStyle}>{cliCommand}</pre>
				</animated.div>

				{/* Right: configuration form */}
				<animated.div style={formCardStyle(themeSprings)}>
					<div style={{ marginBottom: '1rem' }}>
						<h2 style={sectionTitleStyle}>Configuration</h2>
						<p style={sectionSubtitleStyle}>
							These fields mirror the interactive{' '}
							<code>bun create absolutejs</code> prompts.
						</p>
					</div>

					{/* Project name + config type */}
					<div style={{ marginBottom: '1.25rem' }}>
						<label
							htmlFor="project-name"
							style={sectionTitleStyle}
						>
							Project name
						</label>
						<input
							id="project-name"
							type="text"
							value={projectName}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setProjectName(e.target.value)
							}
							style={{ ...textInputStyle, marginTop: '0.4rem' }}
							placeholder="absolutejs-project"
						/>
						<p style={sectionSubtitleStyle}>
							This becomes your project folder and the first
							positional argument in the CLI.
						</p>
					</div>

					<fieldset style={fieldsetStyle}>
						<legend style={legendStyle}>
							Folder naming configuration
						</legend>
						<p style={sectionSubtitleStyle}>
							This mirrors the &quot;Choose folder naming
							configuration&quot; prompt.
						</p>
						<div style={inputsGridStyle}>
							<label style={radioRowStyle}>
								<input
									type="radio"
									name="config-type"
									value="default"
									checked={configurationType === 'default'}
									onChange={() =>
										setConfigurationType('default')
									}
								/>
								<span>Default</span>
							</label>
							<label style={radioRowStyle}>
								<input
									type="radio"
									name="config-type"
									value="custom"
									checked={configurationType === 'custom'}
									onChange={() =>
										setConfigurationType('custom')
									}
								/>
								<span>Custom</span>
							</label>
						</div>
					</fieldset>

					{/* Frontends */}
					<fieldset style={fieldsetStyle}>
						<legend style={legendStyle}>Frontends</legend>
						<p style={sectionSubtitleStyle}>
							Multi-select (space/enter in the CLI). Each maps to
							a boolean flag like <code>--react</code> or{' '}
							<code>--htmx</code>.
						</p>
						<div style={inputsGridStyle}>
							{FRONTEND_OPTIONS.map((frontend) => (
								<label
									key={frontend.key}
									style={checkboxRowStyle}
								>
									<input
										type="checkbox"
										checked={frontends.includes(
											frontend.key
										)}
										onChange={() =>
											handleFrontendToggle(frontend.key)
										}
									/>
									<span>{frontend.label}</span>
								</label>
							))}
						</div>
					</fieldset>

					{/* Database */}
					<fieldset style={fieldsetStyle}>
						<legend style={legendStyle}>Database engine</legend>
						<p style={sectionSubtitleStyle}>
							Maps to <code>--db</code>. Some engines unlock
							host/ORM options.
						</p>
						<div style={inputsGridStyle}>
							{(
								[
									{ value: 'none', label: 'None' },
									{
										value: 'postgresql',
										label: 'PostgreSQL'
									},
									{ value: 'sqlite', label: 'SQLite' },
									{ value: 'mysql', label: 'MySQL' },
									{ value: 'mariadb', label: 'MariaDB' },
									{ value: 'gel', label: 'Gel' },
									{ value: 'mongodb', label: 'MongoDB' }
								] as { value: DatabaseEngine; label: string }[]
							).map((option) => (
								<label
									key={option.value}
									style={radioRowStyle}
								>
									<input
										type="radio"
										name="database-engine"
										value={option.value}
										checked={
											databaseEngine === option.value
										}
										onChange={() =>
											handleDatabaseChange(option.value)
										}
									/>
									<span>{option.label}</span>
								</label>
							))}
						</div>
					</fieldset>

					{/* Database host */}
					<fieldset style={fieldsetStyle}>
						<legend style={legendStyle}>Database host</legend>
						<p style={sectionSubtitleStyle}>
							Shown for PostgreSQL (Neon / PlanetScale) and
							SQLite (Turso); mirrors the <code>--db-host</code>{' '}
							prompt.
						</p>
						{renderDatabaseHostOptions()}
					</fieldset>

					{/* ORM */}
					<fieldset style={fieldsetStyle}>
						<legend style={legendStyle}>ORM</legend>
						<p style={sectionSubtitleStyle}>
							Depending on your engine, you can choose Drizzle,
							Prisma, or no ORM. This maps to <code>--orm</code>.
						</p>
						{renderORMOptions(themeSprings)}
					</fieldset>

					{/* Auth provider */}
					<fieldset style={fieldsetStyle}>
						<legend style={legendStyle}>Auth provider</legend>
						<p style={sectionSubtitleStyle}>
							Mirrors the &quot;Auth provider&quot; select and{' '}
							<code>--auth</code> flag.
						</p>
						<div style={inputsGridStyle}>
							<label style={radioRowStyle}>
								<input
									type="radio"
									name="auth-provider"
									value="none"
									checked={authProvider === 'none'}
									onChange={() =>
										setAuthProvider('none')
									}
								/>
								<span>None</span>
							</label>
							<label style={radioRowStyle}>
								<input
									type="radio"
									name="auth-provider"
									value="absoluteAuth"
									checked={
										authProvider === 'absoluteAuth'
									}
									onChange={() =>
										setAuthProvider('absoluteAuth')
									}
								/>
								<span>Absolute Auth</span>
							</label>
						</div>
					</fieldset>

					{/* Code quality tool */}
					<fieldset style={fieldsetStyle}>
						<legend style={legendStyle}>Code quality</legend>
						<p style={sectionSubtitleStyle}>
							Mirrors &quot;Choose linting and formatting
							tool&quot;.
						</p>
						<div style={inputsGridStyle}>
							<label style={radioRowStyle}>
								<input
									type="radio"
									name="code-quality-tool"
									value="eslint+prettier"
									checked={
										codeQualityTool ===
										'eslint+prettier'
									}
									onChange={() =>
										setCodeQualityTool(
											'eslint+prettier'
										)
									}
								/>
								<span>ESLint + Prettier</span>
							</label>
							<label style={radioRowStyle}>
								<input
									type="radio"
									name="code-quality-tool"
									value="biome"
									checked={codeQualityTool === 'biome'}
									onChange={() =>
										setCodeQualityTool('biome')
									}
								/>
								<span>Biome</span>
							</label>
						</div>
					</fieldset>

					{/* Tailwind & HTML scripts */}
					<fieldset style={fieldsetStyle}>
						<legend style={legendStyle}>Styling & scripts</legend>
						<div style={inputsGridStyle}>
							<label style={checkboxRowStyle}>
								<input
									type="checkbox"
									checked={useTailwind}
									onChange={(e) =>
										setUseTailwind(e.target.checked)
									}
								/>
								<span>Add Tailwind support</span>
							</label>
							<label style={checkboxRowStyle}>
								<input
									type="checkbox"
									checked={useHtmlScripts}
									onChange={(e) =>
										setUseHtmlScripts(
											e.target.checked
										)
									}
								/>
								<span>
									Use scripts in HTML pages (
									<code>--html-scripts</code>)
								</span>
							</label>
						</div>
					</fieldset>

					{/* Elysia plugins */}
					<fieldset style={fieldsetStyle}>
						<legend style={legendStyle}>
							Additional Elysia plugins
						</legend>
						<p style={sectionSubtitleStyle}>
							Mirrors the multiselect plugins prompt. Each choice
							maps to a repeated <code>--plugin</code> flag.
						</p>
						<div style={inputsGridStyle}>
							{pluginOptions.map((plugin) => (
								<label
									key={plugin}
									style={checkboxRowStyle}
								>
									<input
										type="checkbox"
										checked={selectedPlugins.includes(
											plugin
										)}
										onChange={() =>
											handlePluginToggle(plugin)
										}
									/>
									<span>{plugin}</span>
								</label>
							))}
						</div>
					</fieldset>
				</animated.div>
			</div>
		</animated.section>
	);
};
