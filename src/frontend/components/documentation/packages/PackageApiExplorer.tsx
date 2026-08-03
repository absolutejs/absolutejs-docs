import { animated } from '@react-spring/web';
import { useState } from 'react';
import type { PackageApiEntrypoint } from '../../../../types/packageDocs';
import type { ThemeSprings } from '../../../../types/springTypes';
import { PrismPlus } from '../../utils/PrismPlus';

type PackageApiExplorerProps = {
	api: PackageApiEntrypoint[];
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
	themeSprings
}: PackageApiExplorerProps) => {
	const [activeEntryPoint, setActiveEntryPoint] = useState(
		api[0]?.entryPoint ?? ''
	);
	const [query, setQuery] = useState('');
	const entrypoint =
		api.find((candidate) => candidate.entryPoint === activeEntryPoint) ??
		api[0];
	const normalizedQuery = query.trim().toLowerCase();
	const symbols = (entrypoint?.symbols ?? []).filter((symbol) => {
		if (!normalizedQuery) return true;

		return [symbol.name, symbol.kind, symbol.description, symbol.signature]
			.join('\n')
			.toLowerCase()
			.includes(normalizedQuery);
	});

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
						<PrismPlus
							codeString={symbol.signature}
							language="typescript"
							showLineNumbers={false}
							themeSprings={themeSprings}
						/>
					</details>
				))}
			</div>
		</div>
	);
};
