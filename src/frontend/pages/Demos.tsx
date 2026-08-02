/* eslint-disable absolute/max-jsxnesting, absolute/sort-keys-fixable -- the demos index is a site-owned showcase layout */
import { providerOptions } from '@absolutejs/auth/providers';
import { animated } from '@react-spring/web';
import { User } from '../../../db/schema';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { AuroraBackground } from '../components/utils/AuroraBackground';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { primaryColor } from '../styles/colors';
import {
	featureCard,
	heroSubtitleStyle,
	heroTitleStyle,
	primaryButtonStyle
} from '../styles/homeStyles';
import { bodyDefault, htmlDefault, mainDefault } from '../styles/styles';

type DemosProps = {
	user: User | null;
	theme: ThemeMode | undefined;
};

const flowSteps = ['Authorization', 'Profile', 'Refresh', 'Revocation'];

export const Demos = ({ user, theme }: DemosProps) => {
	const [themeSprings, setTheme] = useTheme(theme);

	return (
		<html lang="en" style={htmlDefault}>
			<Head
				canonicalUrl="https://absolutejs.com/demos"
				title="Demos | AbsoluteJS"
				description="Try live demos built with packages from the AbsoluteJS ecosystem."
			/>
			<animated.body
				style={{
					...bodyDefault(themeSprings),
					overflowX: 'hidden',
					position: 'relative'
				}}
			>
				<AuroraBackground themeSprings={themeSprings} />
				<Navbar
					setTheme={setTheme}
					themeSprings={themeSprings}
					user={user}
				/>
				<main
					style={{
						...mainDefault(),
						position: 'relative',
						zIndex: 1
					}}
				>
					<div
						style={{
							maxWidth: '1200px',
							padding: '5rem 2rem 7rem',
							width: '100%'
						}}
					>
						<header
							style={{
								alignItems: 'center',
								display: 'flex',
								flexDirection: 'column',
								marginBottom: '4.5rem',
								textAlign: 'center'
							}}
						>
							<p
								style={{
									color: primaryColor,
									fontSize: '0.8rem',
									fontWeight: 700,
									letterSpacing: '0.12em',
									marginBottom: '1.25rem',
									textTransform: 'uppercase'
								}}
							>
								Try the ecosystem
							</p>
							<animated.h1 style={heroTitleStyle(themeSprings)}>
								See AbsoluteJS in action
							</animated.h1>
							<animated.p style={heroSubtitleStyle(themeSprings)}>
								Explore working examples backed by the packages
								and integrations we ship.
							</animated.p>
						</header>

						<section aria-labelledby="available-demos">
							<animated.h2
								id="available-demos"
								style={{
									color: themeSprings.contrastPrimary,
									fontSize: '0.85rem',
									fontWeight: 800,
									letterSpacing: '0.1em',
									marginBottom: '1.75rem',
									textTransform: 'uppercase'
								}}
							>
								Available demos
							</animated.h2>

							<a
								href="/demos/authentication"
								style={{
									color: 'inherit',
									textDecoration: 'none'
								}}
							>
								<animated.article
									style={{
										...featureCard(themeSprings),
										gap: 'clamp(1.75rem, 4vw, 3rem)',
										padding: 'clamp(1.25rem, 4vw, 3rem)'
									}}
								>
									<animated.div
										aria-hidden="true"
										style={{
											background: themeSprings.theme.to(
												(value) =>
													value.endsWith('dark')
														? 'rgba(8, 10, 18, 0.78)'
														: 'rgba(248, 250, 252, 0.9)'
											),
											border: '1px solid rgba(99, 102, 241, 0.18)',
											borderRadius: '14px',
											overflow: 'hidden'
										}}
									>
										<div
											style={{
												alignItems: 'center',
												borderBottom:
													'1px solid rgba(99, 102, 241, 0.14)',
												display: 'flex',
												gap: '0.4rem',
												padding: '0.85rem 1rem'
											}}
										>
											{[
												'#fb7185',
												'#fbbf24',
												'#34d399'
											].map((color) => (
												<span
													key={color}
													style={{
														background: color,
														borderRadius: '50%',
														height: '0.55rem',
														width: '0.55rem'
													}}
												/>
											))}
											<animated.span
												style={{
													color: themeSprings.contrastSecondary,
													fontSize: '0.72rem',
													marginLeft: '0.4rem'
												}}
											>
												/demos/authentication
											</animated.span>
										</div>
										<div
											style={{
												display: 'grid',
												gap: '0.8rem',
												gridTemplateColumns:
													'repeat(auto-fit, minmax(130px, 1fr))',
												padding:
													'clamp(1rem, 3vw, 1.75rem)'
											}}
										>
											{flowSteps.map((step, index) => (
												<div
													key={step}
													style={{
														background:
															'rgba(99, 102, 241, 0.09)',
														border: '1px solid rgba(99, 102, 241, 0.13)',
														borderRadius: '10px',
														padding: '0.9rem'
													}}
												>
													<p
														style={{
															color: primaryColor,
															fontSize: '0.68rem',
															fontWeight: 800,
															letterSpacing:
																'0.08em',
															marginBottom:
																'0.25rem',
															textTransform:
																'uppercase'
														}}
													>
														Step {index + 1}
													</p>
													<animated.p
														style={{
															color: themeSprings.contrastPrimary,
															fontSize: '0.85rem',
															fontWeight: 650
														}}
													>
														{step}
													</animated.p>
												</div>
											))}
										</div>
									</animated.div>

									<div>
										<div
											style={{
												alignItems: 'center',
												display: 'flex',
												flexWrap: 'wrap',
												gap: '0.7rem',
												marginBottom: '1rem'
											}}
										>
											{[
												'Citra',
												'@absolutejs/auth',
												'Live'
											].map((label) => (
												<span
													key={label}
													style={{
														background:
															'rgba(99, 102, 241, 0.12)',
														border: '1px solid rgba(99, 102, 241, 0.18)',
														borderRadius: '999px',
														color: primaryColor,
														fontSize: '0.68rem',
														fontWeight: 700,
														padding:
															'0.3rem 0.65rem',
														textTransform:
															'uppercase'
													}}
												>
													{label}
												</span>
											))}
										</div>
										<animated.h3
											style={{
												color: themeSprings.contrastPrimary,
												fontSize:
													'clamp(1.7rem, 4vw, 2.6rem)',
												fontWeight: 700,
												letterSpacing: '-0.03em',
												lineHeight: 1.15,
												marginBottom: '1rem'
											}}
										>
											OAuth provider matrix
										</animated.h3>
										<animated.p
											style={{
												color: themeSprings.contrastSecondary,
												fontSize: '1.05rem',
												lineHeight: 1.7,
												maxWidth: '760px'
											}}
										>
											See the current status of all{' '}
											{providerOptions.length} provider
											configurations. Providers configured
											in our demo environment can run
											authorization, profile, refresh, and
											revocation from the same page.
										</animated.p>
										<span
											style={{
												...primaryButtonStyle,
												marginTop: '1.75rem',
												width: 'fit-content'
											}}
										>
											Open authentication demo
										</span>
									</div>
								</animated.article>
							</a>
						</section>
					</div>
				</main>
			</animated.body>
		</html>
	);
};
