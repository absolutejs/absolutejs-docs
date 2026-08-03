import { animated } from '@react-spring/web';
import { useState } from 'react';
import type { PackageApiEntrypoint } from '../../../../types/packageDocs';
import type { ThemeSprings } from '../../../../types/springTypes';
import { PrismPlus } from '../../utils/PrismPlus';

type PackageApiExplorerProps = {
	api: PackageApiEntrypoint[];
	playbookLinks?: Array<{ href: string; label: string }>;
	sourceHref?: string;
	themeSprings: ThemeSprings;
};

const tabStyle = (active: boolean) => ({
	background: active ? 'rgba(99, 102, 241, 0.16)' : 'transparent',
	border: '1px solid rgba(99, 102, 241, 0.3)',
	borderRadius: '0.45rem',
	color: 'inherit',
	cursor: 'pointer',
	fontFamily: 'monospace',
	fontSize: '0.78rem',
	padding: '0.45rem 0.65rem'
});

export const PackageApiExplorer = ({
	api,
	playbookLinks = [],
	sourceHref,
	themeSprings
}: PackageApiExplorerProps) => {
	const [activeEntryPoint, setActiveEntryPoint] = useState(
		api[0]?.entryPoint ?? ''
	);
	const [query, setQuery] = useState('');
	const [copiedSymbol, setCopiedSymbol] = useState('');
	const entrypoint =
		api.find((candidate) => candidate.entryPoint === activeEntryPoint) ??
		api[0];
	const normalizedQuery = query.trim().toLowerCase();
	const symbols = (entrypoint?.symbols ?? []).filter((symbol) => {
		if (!normalizedQuery) return true;

		return [symbol.name, symbol.kind, symbol.description, symbol.signature]
			.concat(symbol.deprecated ?? '', symbol.since ?? '', symbol.throws ?? [])
			.join('\n')
			.toLowerCase()
			.includes(normalizedQuery);
	});
	const symbolId = (name: string) =>
		`api-${entrypoint?.entryPoint.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
	const importFor = (name: string, kind: string) =>
		`${kind === 'interface' || kind === 'type' ? 'import type' : 'import'} { ${name} } from '${entrypoint?.entryPoint}';`;

	return (
		<div style={{ display: 'grid', gap: '1rem' }}>
			<div
				aria-label="Package entry points"
				role="tablist"
				style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}
			>
				{api.map((candidate) => {
					const active =
						candidate.entryPoint === entrypoint?.entryPoint;

					return (
						<button
							aria-selected={active}
							key={candidate.entryPoint}
							onClick={() =>
								setActiveEntryPoint(candidate.entryPoint)
							}
							role="tab"
							style={tabStyle(active)}
							type="button"
						>
							{candidate.entryPoint}
						</button>
					);
				})}
			</div>
			<input
				aria-label="Search exported API symbols"
				onChange={(event) => setQuery(event.target.value)}
				placeholder="Search symbols, signatures, and documentation"
				style={{
					background: 'rgba(99, 102, 241, 0.06)',
					border: '1px solid rgba(99, 102, 241, 0.25)',
					borderRadius: '0.55rem',
					color: 'inherit',
					fontSize: '0.9rem',
					padding: '0.7rem 0.8rem',
					width: '100%'
				}}
				value={query}
			/>
			<animated.p
				aria-live="polite"
				style={{
					color: themeSprings.contrastSecondary,
					fontSize: '0.82rem',
					margin: 0
				}}
			>
				{symbols.length} exported symbol
				{symbols.length === 1 ? '' : 's'} in{' '}
				<code>{entrypoint?.entryPoint}</code>
			</animated.p>
			<div style={{ display: 'grid', gap: '0.65rem' }}>
				{symbols.map((symbol) => (
					<details
						id={symbolId(symbol.name)}
						key={`${entrypoint?.entryPoint}-${symbol.name}`}
						style={{
							border: '1px solid rgba(99, 102, 241, 0.2)',
							borderRadius: '0.6rem',
							padding: '0.75rem 0.9rem'
						}}
					>
						<summary style={{ cursor: 'pointer', fontWeight: 600 }}>
							<code>{symbol.name}</code>{' '}
							<small style={{ opacity: 0.7 }}>
								{symbol.kind}
							</small>
						</summary>
						{symbol.deprecated || symbol.since ? (
							<div
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									gap: '0.45rem',
									marginTop: '0.7rem'
								}}
							>
								{symbol.since ? (
									<small>Available since {symbol.since}</small>
								) : null}
								{symbol.deprecated ? (
									<small style={{ color: '#f59e0b' }}>
										Deprecated: {symbol.deprecated}
									</small>
								) : null}
							</div>
						) : null}
						<div
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								gap: '0.65rem',
								marginTop: '0.75rem'
							}}
						>
							<a href={`#${symbolId(symbol.name)}`}>Permalink</a>
							<button
								onClick={() => {
									void navigator.clipboard.writeText(
										importFor(symbol.name, symbol.kind)
									);
									setCopiedSymbol(symbol.name);
								}}
								type="button"
							>
								{copiedSymbol === symbol.name
									? 'Copied import'
									: 'Copy import'}
							</button>
							{sourceHref ? (
								<a
									href={sourceHref}
									rel="noreferrer noopener"
									target="_blank"
								>
									Source
								</a>
							) : null}
						</div>
						<PrismPlus
							codeString={importFor(symbol.name, symbol.kind)}
							language="typescript"
							showLineNumbers={false}
							themeSprings={themeSprings}
						/>
						{symbol.description ? (
							<animated.p
								style={{
									color: themeSprings.contrastSecondary,
									lineHeight: 1.6
								}}
							>
								{symbol.description}
							</animated.p>
						) : null}
						{symbol.throws && symbol.throws.length > 0 ? (
							<animated.div
								style={{
									background: 'rgba(245, 158, 11, 0.08)',
									border: '1px solid rgba(245, 158, 11, 0.22)',
									borderRadius: '0.5rem',
									color: themeSprings.contrastSecondary,
									marginBottom: '0.75rem',
									padding: '0.65rem 0.75rem'
								}}
							>
								<strong>Failure contract:</strong>{' '}
								{symbol.throws.join(' · ')}
							</animated.div>
						) : null}
						<PrismPlus
							codeString={symbol.signature}
							language="typescript"
							showLineNumbers={false}
							themeSprings={themeSprings}
						/>
					</details>
				))}
			</div>
			{playbookLinks.length > 0 ? (
				<div>
					<strong>Use this API in an outcome:</strong>{' '}
					{playbookLinks.map((link) => (
						<a
							href={link.href}
							key={link.href}
							style={{ marginRight: '0.75rem' }}
						>
							{link.label}
						</a>
					))}
				</div>
			) : null}
		</div>
	);
};
