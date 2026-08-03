import { animated } from '@react-spring/web';
import { CSSProperties, useState } from 'react';
import { ThemeSprings } from '../../../../types/springTypes';
import type { EcosystemProject } from '../../../data/documentation/packages/ecosystem.generated';
import { primaryColor } from '../../../styles/colors';

const copiedResetDelayMs = 1200;

const frameworkColors: Record<string, string> = {
	angular: '#DD0031',
	html: '#E34F26',
	htmx: '#3366CC',
	react: '#61DAFB',
	svelte: '#FF3E00',
	vue: '#42B883'
};

const railStyle: CSSProperties = {
	background:
		'linear-gradient(180deg, rgba(99,102,241,0.4) 0%, rgba(99,102,241,0.12) 100%)',
	borderRadius: '1px',
	flexShrink: 0,
	width: '2px'
};

const twigStyle: CSSProperties = {
	background: 'rgba(99, 102, 241, 0.3)',
	flexShrink: 0,
	height: '2px',
	width: '0.85rem'
};

const leafButtonStyle = (copied: boolean): CSSProperties => ({
	alignItems: 'center',
	background: copied
		? 'rgba(16, 185, 129, 0.12)'
		: 'rgba(99, 102, 241, 0.06)',
	border: copied
		? '1px solid rgba(16, 185, 129, 0.5)'
		: '1px solid rgba(99, 102, 241, 0.22)',
	borderRadius: '0.45rem',
	color: 'inherit',
	cursor: 'copy',
	display: 'flex',
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.78rem',
	gap: '0.4rem',
	padding: '0.35rem 0.6rem',
	transition: 'background 0.15s ease, border-color 0.15s ease'
});

const symbolCountStyle: CSSProperties = {
	color: primaryColor,
	fontSize: '0.68rem',
	fontVariantNumeric: 'tabular-nums',
	fontWeight: 600,
	opacity: 0.85
};

const dotStyle = (color: string): CSSProperties => ({
	background: color,
	borderRadius: '50%',
	flexShrink: 0,
	height: '0.45rem',
	width: '0.45rem'
});

type SurfaceLeaf = {
	frameworkColor?: string;
	fullImport: string;
	subpath: string;
	symbolCount?: number;
};

const CopyLeaf = ({
	label,
	leaf,
	themeSprings
}: {
	label?: string;
	leaf: SurfaceLeaf;
	themeSprings: ThemeSprings;
}) => {
	const [copied, setCopied] = useState(false);
	const copyImport = () => {
		void navigator.clipboard.writeText(leaf.fullImport);
		setCopied(true);
		setTimeout(() => setCopied(false), copiedResetDelayMs);
	};

	return (
		<button
			aria-label={`Copy import ${leaf.fullImport}`}
			onClick={copyImport}
			style={leafButtonStyle(copied)}
			title={copied ? 'Copied' : `Copy ${leaf.fullImport}`}
			type="button"
		>
			{leaf.frameworkColor ? (
				<span style={dotStyle(leaf.frameworkColor)} />
			) : null}
			<animated.span style={{ color: themeSprings.contrastPrimary }}>
				{copied ? 'copied' : (label ?? leaf.subpath)}
			</animated.span>
			{leaf.symbolCount && !copied ? (
				<span style={symbolCountStyle}>{leaf.symbolCount}</span>
			) : null}
		</button>
	);
};

type ImportSurfaceTreeProps = {
	project: EcosystemProject;
	themeSprings: ThemeSprings;
};

export const ImportSurfaceTree = ({
	project,
	themeSprings
}: ImportSurfaceTreeProps) => {
	const { packageName } = project;
	if (!packageName || project.publicExports.length === 0) return null;

	const symbolCounts = new Map(
		project.api.map((entry) => [entry.entryPoint, entry.symbols.length])
	);
	const toLeaf = (entryPoint: string): SurfaceLeaf => {
		const subpath =
			entryPoint === packageName
				? entryPoint
				: entryPoint.slice(packageName.length);
		const segment = subpath.replace(/^\//, '');

		return {
			frameworkColor: frameworkColors[segment],
			fullImport: entryPoint,
			subpath,
			symbolCount: symbolCounts.get(entryPoint)
		};
	};
	const hasRootExport = project.publicExports.includes(packageName);
	const sortRank = (leaf: SurfaceLeaf) => (leaf.frameworkColor ? 1 : 0);
	const leaves = project.publicExports
		.filter((entryPoint) => entryPoint !== packageName)
		.map(toLeaf)
		.sort(
			(first, second) =>
				sortRank(first) - sortRank(second) ||
				first.subpath.localeCompare(second.subpath)
		);

	return (
		<div style={{ margin: '1.5rem 0' }}>
			<animated.p
				style={{
					color: themeSprings.contrastSecondary,
					fontSize: '0.7rem',
					fontWeight: 600,
					letterSpacing: '0.07em',
					margin: '0 0 0.75rem',
					textTransform: 'uppercase'
				}}
			>
				Import surface · click to copy
			</animated.p>
			{hasRootExport ? (
				<div style={{ marginBottom: '0.65rem' }}>
					<CopyLeaf
						label={packageName}
						leaf={toLeaf(packageName)}
						themeSprings={themeSprings}
					/>
				</div>
			) : null}
			{leaves.length > 0 ? (
				<div style={{ display: 'flex', gap: 0 }}>
					<span style={railStyle} />
					<div
						style={{
							display: 'flex',
							flex: 1,
							flexWrap: 'wrap',
							gap: '0.45rem',
							minWidth: 0
						}}
					>
						{leaves.map((leaf) => (
							<span
								key={leaf.fullImport}
								style={{
									alignItems: 'center',
									display: 'flex'
								}}
							>
								<span style={twigStyle} />
								<CopyLeaf
									leaf={leaf}
									themeSprings={themeSprings}
								/>
							</span>
						))}
					</div>
				</div>
			) : null}
		</div>
	);
};
