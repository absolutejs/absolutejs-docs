import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';

type ProviderBadgeProps = {
	isDarkLogo: boolean;
	logoUrl: string | undefined;
	providerDisplay: string;
	themeSprings: ThemeSprings;
};

export const ProviderBadge = ({
	isDarkLogo,
	logoUrl,
	providerDisplay,
	themeSprings
}: ProviderBadgeProps) => (
	<animated.div
		style={{
			alignItems: 'center',
			alignSelf: 'center',
			background: themeSprings.theme.to((t) =>
				t.endsWith('dark')
					? 'rgba(99, 102, 241, 0.1)'
					: 'rgba(99, 102, 241, 0.06)'
			),
			border: '1px solid rgba(99, 102, 241, 0.2)',
			borderRadius: '2rem',
			display: 'flex',
			gap: '0.5rem',
			marginBottom: '1.5rem',
			padding: '0.5rem 1rem'
		}}
	>
		{logoUrl && (
			<animated.img
				alt={`${providerDisplay} logo`}
				src={logoUrl}
				style={{
					filter: isDarkLogo
						? themeSprings.theme.to((t) =>
								t.endsWith('dark')
									? 'brightness(0) invert(1)'
									: 'none'
							)
						: 'none',
					height: '1.125rem',
					objectFit: 'contain',
					width: '1.125rem'
				}}
			/>
		)}
		<animated.span
			style={{
				color: themeSprings.contrastPrimary,
				fontSize: '0.8125rem',
				fontWeight: 500
			}}
		>
			Signed in with {providerDisplay}
		</animated.span>
	</animated.div>
);
