import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { PackageAdapterGroup } from '../../../../types/packageDocs';
import { ThemeSprings } from '../../../../types/springTypes';
import { DefinitionGrid } from '../../utils/DefinitionGrid';
import { PackageCardGrid } from '../../utils/PackageCardGrid';

const commandPrefix = 'bun run ';

const chipStyle: CSSProperties = {
	alignItems: 'baseline',
	background: 'rgba(99, 102, 241, 0.06)',
	border: '1px solid rgba(99, 102, 241, 0.22)',
	borderRadius: '0.45rem',
	color: 'inherit',
	display: 'flex',
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.78rem',
	gap: '0.4rem',
	padding: '0.35rem 0.6rem',
	textDecoration: 'none'
};

const chipVersionStyle: CSSProperties = {
	color: '#6366F1',
	fontSize: '0.68rem',
	fontVariantNumeric: 'tabular-nums',
	fontWeight: 600
};

const commandStyle: CSSProperties = {
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.82rem',
	lineHeight: 1.7,
	overflowWrap: 'anywhere'
};

type GroupItem = PackageAdapterGroup['items'][number];

const EntryPointChip = ({
	item,
	themeSprings
}: {
	item: GroupItem;
	themeSprings: ThemeSprings;
}) => {
	const body = (
		<>
			<animated.span style={{ color: themeSprings.contrastPrimary }}>
				{item.name}
			</animated.span>
			{item.version ? (
				<span style={chipVersionStyle}>v{item.version}</span>
			) : null}
		</>
	);

	return item.href ? (
		<a href={item.href} style={chipStyle}>
			{body}
		</a>
	) : (
		<span style={chipStyle}>{body}</span>
	);
};

type PackageAdapterGroupSectionProps = {
	group: PackageAdapterGroup;
	themeSprings: ThemeSprings;
};

export const PackageAdapterGroupSection = ({
	group,
	themeSprings
}: PackageAdapterGroupSectionProps) => {
	const uniqueDescriptions = new Set(
		group.items.map((item) => item.description)
	);

	// Rows that all repeat one boilerplate description collapse to a chip
	// row with a single caption instead of a table of identical cells.
	if (uniqueDescriptions.size === 1 && group.items.length > 1) {
		const [sharedDescription] = [...uniqueDescriptions];

		return (
			<div>
				<animated.p
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: '0.85rem',
						lineHeight: 1.6,
						margin: '0 0 0.75rem'
					}}
				>
					{sharedDescription}
				</animated.p>
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: '0.45rem'
					}}
				>
					{group.items.map((item) => (
						<EntryPointChip
							item={item}
							key={item.name}
							themeSprings={themeSprings}
						/>
					))}
				</div>
			</div>
		);
	}

	if (group.items.some((item) => item.href)) {
		return (
			<PackageCardGrid
				items={group.items.map((item) => ({
					description: item.description,
					href: item.href,
					name: item.name,
					version: item.version
				}))}
				themeSprings={themeSprings}
			/>
		);
	}

	return (
		<DefinitionGrid
			items={group.items.map((item) => ({
				badge: item.version ? `v${item.version}` : undefined,
				description: item.name.startsWith(commandPrefix) ? (
					<span style={commandStyle}>{item.description}</span>
				) : (
					item.description
				),
				term: item.name
			}))}
			themeSprings={themeSprings}
		/>
	);
};
