import { animated } from '@react-spring/web';
import { CSSProperties, useEffect, useState } from 'react';
import type {
	PackageApiEntrypoint,
	PackageApiSymbol
} from '../../../../types/packageDocs';
import type { ThemeSprings } from '../../../../types/springTypes';
import { PrismPlus } from '../../utils/PrismPlus';

type PackageApiExplorerProps = {
	api: PackageApiEntrypoint[];
	playbookLinks?: Array<{ href: string; label: string }>;
	sourceHref?: string;
	themeSprings: ThemeSprings;
};

const activeTabFontWeight = 700;
const inactiveTabFontWeight = 400;
const activeSymbolFontWeight = 600;
const inactiveSymbolFontWeight = 400;
const inactiveSymbolOpacity = 0.8;
const unrankedKind = -1;

const kindOrder = ['function', 'value', 'class', 'interface', 'type', 'export'];

const kindLabels: Record<string, string> = {
	class: 'Classes',
	export: 'Exports',
	function: 'Functions',
	interface: 'Interfaces',
	type: 'Types',
	value: 'Values'
};

const tabStyle = (active: boolean) => ({
	background: active ? 'rgba(99, 102, 241, 0.16)' : 'transparent',
	border: active
		? '1px solid rgba(99, 102, 241, 0.55)'
		: '1px solid rgba(99, 102, 241, 0.3)',
	borderRadius: '0.45rem',
	color: 'inherit',
	cursor: 'pointer',
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.78rem',
	fontWeight: active ? activeTabFontWeight : inactiveTabFontWeight,
	padding: '0.45rem 0.65rem'
});

const actionChipStyle = {
	alignItems: 'center',
	background: 'rgba(99, 102, 241, 0.08)',
	border: '1px solid rgba(99, 102, 241, 0.25)',
	borderRadius: '0.4rem',
	color: 'inherit',
	cursor: 'pointer',
	display: 'inline-flex',
	fontSize: '0.75rem',
	fontWeight: 600,
	gap: '0.3rem',
	padding: '0.3rem 0.6rem',
	textDecoration: 'none'
} as const;

const explorerFrameStyle: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	gap: 0,
	overflow: 'hidden'
};

const symbolListStyle: CSSProperties = {
	flex: '1 1 13rem',
	maxHeight: '26rem',
	minWidth: 0,
	overflowY: 'auto',
	padding: '0.6rem 0.5rem'
};

const kindHeaderStyle: CSSProperties = {
	color: '#6366F1',
	fontSize: '0.65rem',
	fontWeight: 700,
	letterSpacing: '0.07em',
	margin: '0.75rem 0.5rem 0.35rem',
	textTransform: 'uppercase'
};

const symbolButtonStyle = (active: boolean): CSSProperties => ({
	background: active ? 'rgba(99, 102, 241, 0.14)' : 'transparent',
	border: 'none',
	borderLeft: active ? '2px solid #6366F1' : '2px solid transparent',
	borderRadius: '0.35rem',
	color: 'inherit',
	cursor: 'pointer',
	display: 'block',
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.78rem',
	fontWeight: active ? activeSymbolFontWeight : inactiveSymbolFontWeight,
	opacity: active ? 1 : inactiveSymbolOpacity,
	overflow: 'hidden',
	padding: '0.3rem 0.5rem',
	textAlign: 'left',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	width: '100%'
});

const detailPanelStyle: CSSProperties = {
	flex: '3 1 20rem',
	maxHeight: '26rem',
	minWidth: 0,
	overflowY: 'auto',
	padding: '1rem 1.25rem'
};

const kindBadgeStyle: CSSProperties = {
	background: 'rgba(99, 102, 241, 0.12)',
	borderRadius: '999px',
	color: '#6366F1',
	fontSize: '0.68rem',
	fontWeight: 600,
	letterSpacing: '0.04em',
	padding: '0.1rem 0.55rem',
	textTransform: 'uppercase'
};

// Permalink format used by earlier releases and shared links:
// #api-<entry-point>-<symbol-name>, both slugified.
export const apiSymbolAnchor = (entryPoint: string, symbolName: string) =>
	`api-${entryPoint.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${symbolName.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;

const groupSymbols = (symbols: PackageApiSymbol[]) => {
	const groups = new Map<string, PackageApiSymbol[]>();
	for (const symbol of symbols) {
		const group = groups.get(symbol.kind) ?? [];
		group.push(symbol);
		groups.set(symbol.kind, group);
	}

	return [...groups.entries()].sort(([first], [second]) => {
		const firstIndex = kindOrder.indexOf(first);
		const secondIndex = kindOrder.indexOf(second);
		if (firstIndex === unrankedKind && secondIndex === unrankedKind) {
			return first.localeCompare(second);
		}
		if (firstIndex === unrankedKind) return 1;
		if (secondIndex === unrankedKind) return unrankedKind;

		return firstIndex - secondIndex;
	});
};

const SymbolDetail = ({
	entryPoint,
	sourceHref,
	symbol,
	themeSprings
}: {
	entryPoint: string;
	sourceHref?: string;
	symbol: PackageApiSymbol;
	themeSprings: ThemeSprings;
}) => {
	const [copied, setCopied] = useState(false);
	const importKeyword =
		symbol.kind === 'interface' || symbol.kind === 'type'
			? 'import type'
			: 'import';
	const copyImport = () => {
		void navigator.clipboard.writeText(
			`${importKeyword} { ${symbol.name} } from '${entryPoint}';`
		);
		setCopied(true);
	};

	return (
		<div
			id={apiSymbolAnchor(entryPoint, symbol.name)}
			style={detailPanelStyle}
		>
			<div
				style={{
					alignItems: 'center',
					display: 'flex',
					flexWrap: 'wrap',
					gap: '0.6rem',
					marginBottom: '0.6rem'
				}}
			>
				<animated.code
					style={{
						color: themeSprings.contrastPrimary,
						fontFamily: 'JetBrains Mono, monospace',
						fontSize: '1rem',
						fontWeight: 700
					}}
				>
					{symbol.name}
				</animated.code>
				<span style={kindBadgeStyle}>{symbol.kind}</span>
				{symbol.since ? (
					<animated.small
						style={{ color: themeSprings.contrastSecondary }}
					>
						since {symbol.since}
					</animated.small>
				) : null}
				{symbol.deprecated ? (
					<small style={{ color: '#F59E0B' }}>
						Deprecated: {symbol.deprecated}
					</small>
				) : null}
				<span
					style={{
						display: 'flex',
						gap: '0.5rem',
						marginLeft: 'auto'
					}}
				>
					<a
						href={`#${apiSymbolAnchor(entryPoint, symbol.name)}`}
						style={actionChipStyle}
					>
						Permalink
					</a>
					<button
						onClick={copyImport}
						style={actionChipStyle}
						type="button"
					>
						{copied ? 'Copied' : 'Copy import'}
					</button>
					{sourceHref ? (
						<a
							href={sourceHref}
							rel="noreferrer noopener"
							style={actionChipStyle}
							target="_blank"
						>
							Source
						</a>
					) : null}
				</span>
			</div>
			{symbol.description ? (
				<animated.p
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: '0.9rem',
						lineHeight: 1.65,
						margin: '0 0 0.85rem'
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
						fontSize: '0.85rem',
						marginBottom: '0.85rem',
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
				wrapLongLines={false}
			/>
			<animated.small
				style={{
					color: themeSprings.contrastSecondary,
					display: 'block',
					fontSize: '0.75rem',
					marginTop: '0.35rem'
				}}
			>
				Exported from <code>{entryPoint}</code>
			</animated.small>
		</div>
	);
};

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
	const [selectedName, setSelectedName] = useState('');

	useEffect(() => {
		const hash = window.location.hash.replace(/^#/, '');
		if (!hash.startsWith('api-')) return;
		for (const candidate of api) {
			const match = candidate.symbols.find(
				(symbol) =>
					apiSymbolAnchor(candidate.entryPoint, symbol.name) === hash
			);
			if (!match) continue;
			setActiveEntryPoint(candidate.entryPoint);
			setSelectedName(match.name);

			return;
		}
	}, [api]);

	const entrypoint =
		api.find((candidate) => candidate.entryPoint === activeEntryPoint) ??
		api[0];
	const normalizedQuery = query.trim().toLowerCase();
	const symbols = (entrypoint?.symbols ?? []).filter((symbol) => {
		if (!normalizedQuery) return true;

		return [symbol.name, symbol.kind, symbol.description, symbol.signature]
			.concat(
				symbol.deprecated ?? '',
				symbol.since ?? '',
				symbol.throws ?? []
			)
			.join('\n')
			.toLowerCase()
			.includes(normalizedQuery);
	});
	const selectedSymbol =
		symbols.find((symbol) => symbol.name === selectedName) ?? symbols[0];
	const baseEntryPoint = api.reduce(
		(shortest, candidate) =>
			candidate.entryPoint.length < shortest.length
				? candidate.entryPoint
				: shortest,
		api[0]?.entryPoint ?? ''
	);
	const tabLabel = (entryPointName: string) =>
		entryPointName !== baseEntryPoint &&
		entryPointName.startsWith(`${baseEntryPoint}/`)
			? entryPointName.slice(baseEntryPoint.length)
			: entryPointName;

	return (
		<div style={{ display: 'grid', gap: '0.9rem' }}>
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
							title={candidate.entryPoint}
							type="button"
						>
							{tabLabel(candidate.entryPoint)}
						</button>
					);
				})}
			</div>
			<div
				style={{
					alignItems: 'baseline',
					display: 'flex',
					flexWrap: 'wrap',
					gap: '0.6rem'
				}}
			>
				<input
					aria-label="Search exported API symbols"
					onChange={(event) => setQuery(event.target.value)}
					placeholder="Search symbols, signatures, and documentation"
					style={{
						background: 'rgba(99, 102, 241, 0.06)',
						border: '1px solid rgba(99, 102, 241, 0.25)',
						borderRadius: '0.55rem',
						color: 'inherit',
						flex: '1 1 16rem',
						fontSize: '0.9rem',
						padding: '0.6rem 0.8rem'
					}}
					value={query}
				/>
				<animated.small
					aria-live="polite"
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: '0.8rem'
					}}
				>
					{symbols.length} symbol{symbols.length === 1 ? '' : 's'}
				</animated.small>
			</div>
			<animated.div
				style={{
					...explorerFrameStyle,
					border: themeSprings.themeTertiary.to(
						(color) => `1px solid ${color}`
					),
					borderRadius: '0.65rem'
				}}
			>
				<animated.nav
					aria-label="Exported symbols"
					style={{
						...symbolListStyle,
						borderRight: themeSprings.themeTertiary.to(
							(color) => `1px solid ${color}`
						)
					}}
				>
					{groupSymbols(symbols).map(([kind, kindSymbols]) => (
						<div key={kind}>
							<p style={kindHeaderStyle}>
								{kindLabels[kind] ?? kind} ·{' '}
								{kindSymbols.length}
							</p>
							{kindSymbols.map((symbol) => (
								<button
									aria-current={
										symbol.name === selectedSymbol?.name
									}
									key={symbol.name}
									onClick={() => setSelectedName(symbol.name)}
									style={symbolButtonStyle(
										symbol.name === selectedSymbol?.name
									)}
									title={symbol.name}
									type="button"
								>
									{symbol.name}
								</button>
							))}
						</div>
					))}
					{symbols.length === 0 ? (
						<animated.p
							style={{
								color: themeSprings.contrastSecondary,
								fontSize: '0.85rem',
								padding: '0.5rem'
							}}
						>
							No symbols match this search.
						</animated.p>
					) : null}
				</animated.nav>
				{selectedSymbol && entrypoint ? (
					<SymbolDetail
						entryPoint={entrypoint.entryPoint}
						key={`${entrypoint.entryPoint}-${selectedSymbol.name}`}
						sourceHref={sourceHref}
						symbol={selectedSymbol}
						themeSprings={themeSprings}
					/>
				) : null}
			</animated.div>
			{playbookLinks.length > 0 ? (
				<div
					style={{
						alignItems: 'center',
						display: 'flex',
						flexWrap: 'wrap',
						gap: '0.5rem'
					}}
				>
					<animated.strong
						style={{
							color: themeSprings.contrastPrimary,
							fontSize: '0.82rem'
						}}
					>
						Use this API in an outcome:
					</animated.strong>
					{playbookLinks.map((link) => (
						<a
							href={link.href}
							key={link.href}
							style={actionChipStyle}
						>
							{link.label}
						</a>
					))}
				</div>
			) : null}
		</div>
	);
};
