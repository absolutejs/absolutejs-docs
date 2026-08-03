import { animated } from '@react-spring/web';
import { CSSProperties, ReactNode } from 'react';
import {
	FaArrowRight,
	FaBan,
	FaLink,
	FaPuzzlePiece,
	FaShieldAlt
} from 'react-icons/fa';
import { PackageRelationship } from '../../../../types/packageDocs';
import { ThemeSprings } from '../../../../types/springTypes';
import { packageRelationshipsByName } from '../../../data/documentation/packages/packageRelationships';

type RelationshipKind = PackageRelationship['kind'];

type LaneMeta = { color: string; icon: ReactNode; label: string };

const laneIconSize = 11;

const laneOrder: RelationshipKind[] = [
	'requires',
	'optionalWith',
	'productionReplacement',
	'doNotUseFor',
	'continuesAt'
];

const laneMeta: Record<RelationshipKind, LaneMeta> = {
	continuesAt: {
		color: '#10B981',
		icon: <FaArrowRight size={laneIconSize} />,
		label: 'Continue at'
	},
	doNotUseFor: {
		color: '#EF4444',
		icon: <FaBan size={laneIconSize} />,
		label: 'Not built for'
	},
	optionalWith: {
		color: '#8B5CF6',
		icon: <FaPuzzlePiece size={laneIconSize} />,
		label: 'Pairs with'
	},
	productionReplacement: {
		color: '#F59E0B',
		icon: <FaShieldAlt size={laneIconSize} />,
		label: 'Swap for production'
	},
	requires: {
		color: '#6366F1',
		icon: <FaLink size={laneIconSize} />,
		label: 'Requires'
	}
};

const laneIconStyle = (color: string): CSSProperties => ({
	alignItems: 'center',
	background: `${color}1F`,
	borderRadius: '0.45rem',
	color,
	display: 'flex',
	flexShrink: 0,
	height: '1.6rem',
	justifyContent: 'center',
	width: '1.6rem'
});

const laneLabelStyle = (color: string): CSSProperties => ({
	color,
	fontSize: '0.72rem',
	fontWeight: 700,
	letterSpacing: '0.07em',
	textTransform: 'uppercase'
});

const itemStyle = (color: string): CSSProperties => ({
	background: `${color}0A`,
	borderLeft: `3px solid ${color}66`,
	borderRadius: '0 0.5rem 0.5rem 0',
	color: 'inherit',
	display: 'block',
	padding: '0.65rem 0.9rem',
	textDecoration: 'none'
});

const BoundaryItem = ({
	color,
	relationship,
	themeSprings
}: {
	color: string;
	relationship: PackageRelationship;
	themeSprings: ThemeSprings;
}) => {
	const body = (
		<>
			<animated.strong
				style={{
					color: themeSprings.contrastPrimary,
					display: 'block',
					fontSize: '0.88rem',
					marginBottom: '0.2rem'
				}}
			>
				{relationship.label}
			</animated.strong>
			<animated.span
				style={{
					color: themeSprings.contrastSecondary,
					fontSize: '0.82rem',
					lineHeight: 1.55
				}}
			>
				{relationship.detail}
			</animated.span>
		</>
	);

	return relationship.view ? (
		<a
			href={`/documentation/${relationship.view}`}
			style={itemStyle(color)}
		>
			{body}
		</a>
	) : (
		<div style={itemStyle(color)}>{body}</div>
	);
};

const BoundaryLane = ({
	items,
	kind,
	themeSprings
}: {
	items: PackageRelationship[];
	kind: RelationshipKind;
	themeSprings: ThemeSprings;
}) => {
	const meta = laneMeta[kind];

	return (
		<section aria-label={meta.label}>
			<div
				style={{
					alignItems: 'center',
					display: 'flex',
					gap: '0.5rem',
					marginBottom: '0.55rem'
				}}
			>
				<span style={laneIconStyle(meta.color)}>{meta.icon}</span>
				<span style={laneLabelStyle(meta.color)}>{meta.label}</span>
			</div>
			<div style={{ display: 'grid', gap: '0.5rem' }}>
				{items.map((relationship) => (
					<BoundaryItem
						color={meta.color}
						key={relationship.label}
						relationship={relationship}
						themeSprings={themeSprings}
					/>
				))}
			</div>
		</section>
	);
};

type PackageBoundariesProps = {
	packageName: string | null;
	themeSprings: ThemeSprings;
};

export const PackageBoundaries = ({
	packageName,
	themeSprings
}: PackageBoundariesProps) => {
	const relationships = packageName
		? (packageRelationshipsByName[packageName] ?? [])
		: [];
	const lanes = laneOrder
		.map((kind) => ({
			items: relationships.filter(
				(relationship) => relationship.kind === kind
			),
			kind
		}))
		.filter((lane) => lane.items.length > 0);
	if (lanes.length === 0) return null;

	return (
		<div style={{ marginTop: '2rem' }}>
			<animated.h3
				style={{
					color: themeSprings.contrastPrimary,
					fontSize: '1rem',
					marginBottom: '1rem'
				}}
			>
				Package boundaries and next steps
			</animated.h3>
			<div
				style={{
					display: 'grid',
					gap: '1.1rem',
					gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))'
				}}
			>
				{lanes.map(({ items, kind }) => (
					<BoundaryLane
						items={items}
						key={kind}
						kind={kind}
						themeSprings={themeSprings}
					/>
				))}
			</div>
		</div>
	);
};
