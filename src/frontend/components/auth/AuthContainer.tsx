import { ProviderOption } from '@absolutejs/auth';
import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';
import { ThemeProps, ThemeSprings } from '../../../types/springTypes';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Divider } from '../utils/Divider';
import { ProviderDropdown } from '../utils/ProviderDropdown';
import { OAuthLink } from './OAuthLink';

type SignupLinkProps = {
	themeSprings: ThemeSprings;
};

const SIGNUP_LINK_BASE_OPACITY = 0.8;
const SIGNUP_LINK_HOVER_OPACITY_RANGE = 0.2;

const SignupLink = ({ themeSprings }: SignupLinkProps) => {
	const [hoverSpring, hoverApi] = useSpring(() => ({
		config: { friction: 20, tension: 300 },
		opacity: 0
	}));

	return (
		<animated.p
			style={{
				color: themeSprings.contrastSecondary,
				fontSize: '0.8125rem',
				marginTop: '12px',
				textAlign: 'center'
			}}
		>
			{"Don't have an account? "}
			<animated.a
				href="/signup"
				onMouseEnter={() => hoverApi.start({ opacity: 1 })}
				onMouseLeave={() => hoverApi.start({ opacity: 0 })}
				style={{
					color: '#6366F1',
					fontSize: '0.8125rem',
					fontWeight: 600,
					opacity: hoverSpring.opacity.to(
						(opacityValue) =>
							SIGNUP_LINK_BASE_OPACITY +
							opacityValue * SIGNUP_LINK_HOVER_OPACITY_RANGE
					),
					textDecoration: 'none'
				}}
			>
				Sign up
			</animated.a>
		</animated.p>
	);
};

export const AuthContainer = ({ themeSprings }: ThemeProps) => {
	const [showMore, setShowMore] = useState(false);
	const [currentProvider, setCurrentProvider] =
		useState<Lowercase<ProviderOption>>();
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	const toggleMore = () => {
		setShowMore((prev) => !prev);
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				padding: isMobile ? '16px 14px' : '20px 24px',
				width: isMobile ? '280px' : '300px'
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '8px'
				}}
			>
				<OAuthLink
					mode="login"
					provider="google"
					themeSprings={themeSprings}
				/>
				<OAuthLink
					mode="login"
					provider="github"
					themeSprings={themeSprings}
				/>
			</div>

			<animated.button
				onClick={toggleMore}
				style={{
					background: 'none',
					border: 'none',
					color: themeSprings.contrastSecondary,
					cursor: 'pointer',
					fontSize: '0.75rem',
					marginTop: '12px',
					opacity: 0.6,
					padding: '4px',
					textAlign: 'center'
				}}
			>
				{showMore ? 'Less options' : 'More providers'}
			</animated.button>

			{showMore && (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '8px',
						marginTop: '8px'
					}}
				>
					<Divider text="select provider" />
					<ProviderDropdown
						setCurrentProvider={setCurrentProvider}
						themeSprings={themeSprings}
					/>
					<OAuthLink
						mode="login"
						provider={currentProvider}
						themeSprings={themeSprings}
					/>
				</div>
			)}

			<SignupLink themeSprings={themeSprings} />
		</div>
	);
};
