import { animated } from '@react-spring/web';
import type { ThemeSprings } from '../../../../types/springTypes';

export const DocumentationModeNav = ({
	productionHref,
	referenceHref,
	runHref,
	themeSprings
}: {
	productionHref: string;
	referenceHref: string;
	runHref: string;
	themeSprings: ThemeSprings;
}) => (
	<nav
		aria-label="Documentation progression"
		style={{
			display: 'grid',
			gap: '0.65rem',
			gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
			margin: '1.25rem 0 2rem'
		}}
	>
		{[
			{
				detail: 'Install, run, and prove the smallest useful result.',
				href: runHref,
				label: '1. Run in 5 minutes'
			},
			{
				detail: 'Replace local seams and close failure boundaries.',
				href: productionHref,
				label: '2. Make it production-safe'
			},
			{
				detail: 'Search exports, signatures, adapters, and contracts.',
				href: referenceHref,
				label: '3. Reference and API'
			}
		].map((mode) => (
			<animated.a
				href={mode.href}
				key={mode.label}
				style={{
					border: '1px solid rgba(99, 102, 241, 0.25)',
					borderRadius: '0.65rem',
					color: themeSprings.contrastPrimary,
					padding: '0.75rem 0.9rem',
					textDecoration: 'none'
				}}
			>
				<strong>{mode.label}</strong>
				<br />
				<animated.small
					style={{ color: themeSprings.contrastSecondary }}
				>
					{mode.detail}
				</animated.small>
			</animated.a>
		))}
	</nav>
);
