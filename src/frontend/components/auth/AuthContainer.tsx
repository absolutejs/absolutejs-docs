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

const SignupLink = ({ themeSprings }: SignupLinkProps) => {
	const [hoverSpring, hoverApi] = useSpring(() => ({
		config: { friction: 20, tension: 300 },
		opacity: 0
	}));

	return (
		<animated.p
			style={{
				color: themeSprings.contrastSecondary,
				fontSize: '0.875rem',
				marginTop: '8px',
				textAlign: 'center'
			}}
		>
			{"Don't have an account? "}
			<animated.a
				href="/signup"
				onMouseEnter={() => hoverApi.start({ opacity: 1 })}
				onMouseLeave={() => hoverApi.start({ opacity: 0 })}
				style={{
					color: themeSprings.contrastPrimary,
					fontSize: '0.875rem',
					fontWeight: 600,
					opacity: hoverSpring.opacity.to((o) => 0.7 + o * 0.3),
					textDecoration: 'underline'
				}}
			>
				Sign up
			</animated.a>
		</animated.p>
	);
};

export const AuthContainer = ({ themeSprings }: ThemeProps) => {
	const [currentProvider, setCurrentProvider] =
		useState<Lowercase<ProviderOption>>();
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				padding: isMobile ? '24px 20px' : '32px 36px',
				width: isMobile ? '320px' : '420px'
			}}
		>
			<animated.h1
				style={{
					color: themeSprings.contrastPrimary,
					fontSize: '1.5rem',
					fontWeight: 600,
					marginBottom: '24px',
					textAlign: 'center'
				}}
			>
				Welcome Back
			</animated.h1>

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '12px'
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

			<Divider text="or continue with" />

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '12px'
				}}
			>
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

			<SignupLink themeSprings={themeSprings} />
		</div>
	);
};
