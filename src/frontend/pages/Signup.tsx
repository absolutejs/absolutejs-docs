import { ProviderOption } from '@absolutejs/auth';
import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';
import { ThemeSprings } from '../../types/springTypes';
import { OAuthLink } from '../components/auth/OAuthLink';
import { Head } from '../components/page/Head';
import { Divider } from '../components/utils/Divider';
import { ProviderDropdown } from '../components/utils/ProviderDropdown';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { bodyDefault, htmlDefault } from '../styles/styles';

type SignupProps = {
	theme: ThemeMode | undefined;
};

type LoginLinkProps = {
	themeSprings: ThemeSprings;
};

type SignupOptionsProps = {
	themeSprings: ThemeSprings;
};

const LOGIN_LINK_BASE_OPACITY = 0.7;
const LOGIN_LINK_HOVER_OPACITY_RANGE = 0.3;

const LoginLink = ({ themeSprings }: LoginLinkProps) => {
	const [hoverSpring, hoverApi] = useSpring(() => ({
		config: { friction: 20, tension: 300 },
		opacity: 0
	}));

	return (
		<animated.p
			style={{
				color: themeSprings.contrastSecondary,
				fontSize: '0.875rem',
				marginTop: '24px',
				textAlign: 'center'
			}}
		>
			{'Already have an account? '}
			<animated.a
				href="/"
				onMouseEnter={() => hoverApi.start({ opacity: 1 })}
				onMouseLeave={() => hoverApi.start({ opacity: 0 })}
				style={{
					color: themeSprings.contrastPrimary,
					fontSize: '0.875rem',
					fontWeight: 600,
					opacity: hoverSpring.opacity.to(
						(opacityValue) =>
							LOGIN_LINK_BASE_OPACITY +
							opacityValue * LOGIN_LINK_HOVER_OPACITY_RANGE
					),
					textDecoration: 'underline'
				}}
			>
				Sign in
			</animated.a>
		</animated.p>
	);
};

const SignupOptions = ({ themeSprings }: SignupOptionsProps) => {
	const [currentProvider, setCurrentProvider] =
		useState<Lowercase<ProviderOption>>();

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '12px'
				}}
			>
				<OAuthLink
					mode="signup"
					provider="google"
					themeSprings={themeSprings}
				/>
				<OAuthLink
					mode="signup"
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
					mode="signup"
					provider={currentProvider}
					themeSprings={themeSprings}
				/>
			</div>
		</>
	);
};

export const Signup = ({ theme }: SignupProps) => {
	const [themeSprings] = useTheme(theme);

	return (
		<html lang="en" style={htmlDefault}>
			<Head title="Sign Up | AbsoluteJS" />
			<animated.body
				style={{
					...bodyDefault(themeSprings),
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: '100vh'
				}}
			>
				<animated.main
					style={{
						alignItems: 'center',
						display: 'flex',
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'center',
						padding: '40px 20px',
						width: '100%'
					}}
				>
					<animated.div
						style={{
							backgroundColor: themeSprings.themePrimary,
							border: '1px solid rgba(128, 128, 128, 0.12)',
							borderRadius: '20px',
							boxShadow:
								'0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)',
							display: 'flex',
							flexDirection: 'column',
							maxWidth: '440px',
							padding: '48px 40px',
							width: '100%'
						}}
					>
						<animated.a
							href="/"
							style={{
								color: themeSprings.contrastPrimary,
								fontSize: '1.25rem',
								fontWeight: 700,
								marginBottom: '8px',
								textAlign: 'center',
								textDecoration: 'none'
							}}
						>
							AbsoluteJS
						</animated.a>

						<animated.h1
							style={{
								color: themeSprings.contrastPrimary,
								fontSize: '1.75rem',
								fontWeight: 600,
								marginBottom: '8px',
								textAlign: 'center'
							}}
						>
							Create an account
						</animated.h1>

						<animated.p
							style={{
								color: themeSprings.contrastSecondary,
								fontSize: '0.95rem',
								marginBottom: '32px',
								textAlign: 'center'
							}}
						>
							Get started with AbsoluteJS today
						</animated.p>

						<SignupOptions themeSprings={themeSprings} />

						<LoginLink themeSprings={themeSprings} />
					</animated.div>
				</animated.main>
			</animated.body>
		</html>
	);
};
