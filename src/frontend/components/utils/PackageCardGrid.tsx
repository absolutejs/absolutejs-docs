import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import { tableCodeStyle } from '../../styles/docsStyles';
import { featureCardStyle } from '../../styles/gradientStyles';

export type PackageCard = {
	badge?: string;
	description: string;
	name: string;
	packageName?: string;
	version?: string;
};

type PackageCardGridProps = {
	items: PackageCard[];
	themeSprings: ThemeSprings;
};

const PackageCardItem = ({
	item,
	themeSprings
}: {
	item: PackageCard;
	themeSprings: ThemeSprings;
}) => (
	<animated.div style={featureCardStyle(themeSprings)}>
		<div
			style={{
				alignItems: 'baseline',
				display: 'flex',
				flexWrap: 'wrap',
				gap: '0.5rem',
				marginBottom: '0.4rem'
			}}
		>
			<animated.span
				style={{
					color: themeSprings.contrastPrimary,
					fontSize: '1rem',
					fontWeight: 600
				}}
			>
				{item.name}
			</animated.span>
			{item.version ? (
				<span
					style={{
						color: '#6366F1',
						fontSize: '0.72rem',
						fontVariantNumeric: 'tabular-nums',
						fontWeight: 600
					}}
				>
					v{item.version}
				</span>
			) : null}
			{item.badge ? (
				<span
					style={{
						background: 'rgba(99, 102, 241, 0.12)',
						borderRadius: '999px',
						color: '#6366F1',
						fontSize: '0.68rem',
						fontWeight: 600,
						letterSpacing: '0.04em',
						padding: '0.1rem 0.5rem',
						textTransform: 'uppercase'
					}}
				>
					{item.badge}
				</span>
			) : null}
		</div>
		{item.packageName ? (
			<code
				style={{
					...tableCodeStyle,
					display: 'inline-block',
					fontSize: '0.72rem',
					marginBottom: '0.5rem'
				}}
			>
				{item.packageName}
			</code>
		) : null}
		<animated.p
			style={{
				color: themeSprings.contrastSecondary,
				fontSize: '0.875rem',
				lineHeight: 1.55,
				margin: 0
			}}
		>
			{item.description}
		</animated.p>
	</animated.div>
);

export const PackageCardGrid = ({
	items,
	themeSprings
}: PackageCardGridProps) => (
	<div
		style={{
			display: 'grid',
			gap: '0.9rem',
			gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
			margin: '1.25rem 0 1.5rem'
		}}
	>
		{items.map((item) => (
			<PackageCardItem
				item={item}
				key={item.name}
				themeSprings={themeSprings}
			/>
		))}
	</div>
);
