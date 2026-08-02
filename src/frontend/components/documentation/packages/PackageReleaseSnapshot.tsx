import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { ThemeSprings } from '../../../../types/springTypes';
import { packageCatalog } from '../../../data/documentation/packages/catalog';
import { ecosystemProjects } from '../../../data/documentation/packages/ecosystem.generated';
import { packageSubpackageViewId } from '../../../data/documentation/packages/packageRoutes';

type PackageReleaseSnapshotProps = {
	currentPageId: string;
	themeSprings: ThemeSprings;
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

const chipStyle: CSSProperties = {
	background: 'rgba(99, 102, 241, 0.08)',
	border: '1px solid rgba(99, 102, 241, 0.2)',
	borderRadius: '0.45rem',
	color: 'inherit',
	fontSize: '0.78rem',
	padding: '0.35rem 0.55rem',
	textDecoration: 'none'
};

export const PackageReleaseSnapshot = ({
	currentPageId,
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
					margin: '0 0 0.65rem'
				}}
			>
				What ships today
			</animated.h2>
			<animated.p
				style={{
					color: themeSprings.contrastSecondary,
					lineHeight: 1.65,
					margin: '0 0 1.25rem'
				}}
			>
				This guide is paired with the current package manifest so the
				published version and supported imports stay visible as the
				package evolves.
			</animated.p>

			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '0.5rem',
					marginBottom: '1.25rem'
				}}
			>
				{project.packageName ? (
					<a
						href={`https://www.npmjs.com/package/${project.packageName}`}
						rel="noreferrer noopener"
						style={chipStyle}
					>
						{project.packageName}
					</a>
				) : null}
				{project.version ? (
					<span style={chipStyle}>v{project.version}</span>
				) : null}
				{project.repository ? (
					<a
						href={project.repository}
						rel="noreferrer noopener"
						style={chipStyle}
					>
						Source repository
					</a>
				) : null}
			</div>

			{project.publicExports.length > 0 ? (
				<>
					<animated.h3
						style={{
							color: themeSprings.contrastPrimary,
							fontSize: '1rem',
							marginBottom: '0.75rem'
						}}
					>
						Supported imports
					</animated.h3>
					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '0.45rem',
							marginBottom: '1.25rem'
						}}
					>
						{project.publicExports.map((entryPoint) => (
							<code key={entryPoint} style={chipStyle}>
								{entryPoint}
							</code>
						))}
					</div>
				</>
			) : null}

			{publicSubpackages.length > 0 ? (
				<>
					<animated.h3
						style={{
							color: themeSprings.contrastPrimary,
							fontSize: '1rem',
							marginBottom: '0.75rem'
						}}
					>
						Related packages
					</animated.h3>
					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '0.45rem'
						}}
					>
						{publicSubpackages.map((subpackage) => (
							<a
								href={`/documentation/${packageSubpackageViewId(project, subpackage)}`}
								key={subpackage.name}
								style={chipStyle}
							>
								{subpackage.name}
							</a>
						))}
					</div>
				</>
			) : null}
		</section>
	);
};
