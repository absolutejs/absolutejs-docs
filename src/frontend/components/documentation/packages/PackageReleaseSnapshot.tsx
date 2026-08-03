import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { FaExternalLinkAlt, FaGithub, FaNpm } from 'react-icons/fa';
import { PackageStatus } from '../../../../types/packageDocs';
import { ThemeSprings } from '../../../../types/springTypes';
import { packageCatalog } from '../../../data/documentation/packages/catalog';
import {
	EcosystemProject,
	ecosystemProjects
} from '../../../data/documentation/packages/ecosystem.generated';
import { packageSubpackageViewId } from '../../../data/documentation/packages/packageRoutes';
import { playbooksForView } from '../../../data/documentation/outcomePlaybooks';
import { cardGradientStyle } from '../../../styles/gradientStyles';
import { PackageCardGrid } from '../../utils/PackageCardGrid';
import { ImportSurfaceTree } from './ImportSurfaceTree';
import { PackageApiExplorer } from './PackageApiExplorer';
import { PackageBoundaries } from './PackageBoundaries';
import { PackageGuidanceSections } from './PackageGuidanceSections';

const statusColors: Record<PackageStatus, string> = {
	alpha: '#F59E0B',
	beta: '#8B5CF6',
	stable: '#10B981'
};

const sectionStyle: CSSProperties = {
	borderTop: '1px solid rgba(99, 102, 241, 0.15)',
	marginTop: '3rem',
	paddingTop: '2rem'
};

const labelStyle: CSSProperties = {
	color: '#6366F1',
	fontSize: '0.75rem',
	fontWeight: 700,
	letterSpacing: '0.08em',
	marginBottom: '0.5rem',
	textTransform: 'uppercase'
};

const versionPillStyle = (color: string): CSSProperties => ({
	background: `${color}1A`,
	border: `1px solid ${color}55`,
	borderRadius: '999px',
	color,
	fontSize: '0.75rem',
	fontVariantNumeric: 'tabular-nums',
	fontWeight: 600,
	letterSpacing: '0.03em',
	padding: '0.2rem 0.7rem'
});

const externalLinkStyle: CSSProperties = {
	alignItems: 'center',
	border: '1px solid rgba(99, 102, 241, 0.3)',
	borderRadius: '0.5rem',
	color: 'inherit',
	display: 'flex',
	fontSize: '0.8rem',
	fontWeight: 500,
	gap: '0.4rem',
	padding: '0.4rem 0.75rem',
	textDecoration: 'none'
};

const plateStatStyle: CSSProperties = {
	alignItems: 'baseline',
	display: 'flex',
	gap: '0.35rem'
};

const PlateStat = ({
	label,
	themeSprings,
	value
}: {
	label: string;
	themeSprings: ThemeSprings;
	value: number;
}) => (
	<span style={plateStatStyle}>
		<animated.span
			style={{
				color: themeSprings.contrastPrimary,
				fontSize: '1.05rem',
				fontVariantNumeric: 'tabular-nums',
				fontWeight: 700
			}}
		>
			{value}
		</animated.span>
		<animated.span
			style={{
				color: themeSprings.contrastSecondary,
				fontSize: '0.75rem',
				fontWeight: 600,
				letterSpacing: '0.05em',
				textTransform: 'uppercase'
			}}
		>
			{label}
		</animated.span>
	</span>
);

const PackageIdentityPlate = ({
	project,
	status,
	themeSprings
}: {
	project: EcosystemProject;
	status: PackageStatus;
	themeSprings: ThemeSprings;
}) => {
	const publicSubpackages = project.subpackages.filter(
		(subpackage) => !subpackage.private
	);
	const symbolTotal = project.api.reduce(
		(total, entry) => total + entry.symbols.length,
		0
	);
	const stats: { label: string; value: number }[] = [
		{ label: 'entry points', value: project.publicExports.length },
		{ label: 'symbols', value: symbolTotal },
		{ label: 'subpackages', value: publicSubpackages.length }
	].filter((stat) => stat.value > 0);

	return (
		<animated.div style={cardGradientStyle(themeSprings)}>
			<div
				style={{
					alignItems: 'center',
					display: 'flex',
					flexWrap: 'wrap',
					gap: '0.75rem'
				}}
			>
				<animated.span
					style={{
						color: themeSprings.contrastPrimary,
						fontFamily: 'JetBrains Mono, monospace',
						fontSize: '1.2rem',
						fontWeight: 700,
						letterSpacing: '-0.02em'
					}}
				>
					{project.packageName ?? project.name}
				</animated.span>
				{project.version ? (
					<span style={versionPillStyle(statusColors[status])}>
						v{project.version} · {status}
					</span>
				) : null}
				<animated.span
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: '0.75rem',
						fontWeight: 600,
						letterSpacing: '0.05em',
						textTransform: 'uppercase'
					}}
				>
					{project.category}
				</animated.span>
				<span
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: '0.5rem',
						marginLeft: 'auto'
					}}
				>
					{project.packageName ? (
						<animated.a
							href={`https://www.npmjs.com/package/${project.packageName}`}
							rel="noreferrer noopener"
							style={{
								...externalLinkStyle,
								color: themeSprings.contrastPrimary
							}}
							target="_blank"
						>
							<FaNpm color="#CB3837" size={16} />
							npm
							<FaExternalLinkAlt size={8} />
						</animated.a>
					) : null}
					{project.repository ? (
						<animated.a
							href={project.repository}
							rel="noreferrer noopener"
							style={{
								...externalLinkStyle,
								color: themeSprings.contrastPrimary
							}}
							target="_blank"
						>
							<FaGithub size={14} />
							Source
							<FaExternalLinkAlt size={8} />
						</animated.a>
					) : null}
				</span>
			</div>
			{stats.length > 0 ? (
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: '1.5rem',
						marginTop: '0.9rem'
					}}
				>
					{stats.map((stat) => (
						<PlateStat
							key={stat.label}
							label={stat.label}
							themeSprings={themeSprings}
							value={stat.value}
						/>
					))}
				</div>
			) : null}
		</animated.div>
	);
};

type PackageReleaseSnapshotProps = {
	currentPageId: string;
	isMobileOrTablet?: boolean;
	surfaceOnly?: boolean;
	themeSprings: ThemeSprings;
};

export const PackageReleaseSnapshot = ({
	currentPageId,
	isMobileOrTablet,
	surfaceOnly,
	themeSprings
}: PackageReleaseSnapshotProps) => {
	const catalogEntry = packageCatalog.find(
		(entry) => entry.guideView === currentPageId
	);
	if (!catalogEntry) return null;

	const project = ecosystemProjects.find(
		(candidate) => candidate.directory === catalogEntry.sourceDirectory
	);
	if (!project) return null;

	const publicSubpackages = project.subpackages.filter(
		(subpackage) => !subpackage.private
	);
	const hasPackageDetails =
		project.packageName ||
		project.publicExports.length > 0 ||
		publicSubpackages.length > 0;
	if (!hasPackageDetails) return null;

	return (
		<section aria-label="Current package surface" style={sectionStyle}>
			<p style={labelStyle}>Current package surface</p>
			<animated.h2
				style={{
					color: themeSprings.contrastPrimary,
					fontSize: '1.45rem',
					margin: '0 0 1rem'
				}}
			>
				What ships today
			</animated.h2>

			<PackageIdentityPlate
				project={project}
				status={catalogEntry.status}
				themeSprings={themeSprings}
			/>

			<ImportSurfaceTree project={project} themeSprings={themeSprings} />

			{publicSubpackages.length > 0 ? (
				<div style={{ marginTop: '1.5rem' }}>
					<animated.h3
						style={{
							color: themeSprings.contrastPrimary,
							fontSize: '1rem',
							marginBottom: '0.25rem'
						}}
					>
						Related packages
					</animated.h3>
					<PackageCardGrid
						items={publicSubpackages.map((subpackage) => ({
							badge: subpackage.version ? undefined : 'workspace',
							description: subpackage.description,
							href: `/documentation/${packageSubpackageViewId(project, subpackage)}`,
							name: subpackage.name,
							version: subpackage.version ?? undefined
						}))}
						themeSprings={themeSprings}
					/>
				</div>
			) : null}

			{!surfaceOnly && project.api.length > 0 ? (
				<div style={{ marginTop: '2rem' }}>
					<PackageApiExplorer
						api={project.api}
						playbookLinks={playbooksForView(currentPageId).map(
							(playbook) => ({
								href: `/documentation/${playbook.id}`,
								label: playbook.title
							})
						)}
						sourceHref={project.repository ?? undefined}
						themeSprings={themeSprings}
					/>
				</div>
			) : null}

			<PackageBoundaries
				packageName={project.packageName}
				themeSprings={themeSprings}
			/>

			{!surfaceOnly && project.packageName ? (
				<PackageGuidanceSections
					isMobileOrTablet={isMobileOrTablet}
					packageName={project.packageName}
					themeSprings={themeSprings}
				/>
			) : null}
		</section>
	);
};
