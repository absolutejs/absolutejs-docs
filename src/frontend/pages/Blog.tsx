/* eslint-disable absolute/max-jsxnesting, absolute/sort-keys-fixable -- the blog index is site-owned editorial layout, not a package component API */
import { animated } from '@react-spring/web';
import { User } from '../../../db/schema';
import { blog, blogPosts } from '../../shared/blog';
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

type BlogProps = {
	user: User | null;
	theme: ThemeMode | undefined;
};

const formatPostDate = (value: string) =>
	new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'long',
		timeZone: 'UTC',
		year: 'numeric'
	}).format(new Date(value));

export const Blog = ({ user, theme }: BlogProps) => {
	const [themeSprings, setTheme] = useTheme(theme);

	return (
		<html lang="en" style={htmlDefault}>
			<Head
				title="Blog | AbsoluteJS"
				description={blog.site.description}
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
							<animated.p
								style={{
									color: primaryColor,
									fontSize: '0.8rem',
									fontWeight: 700,
									letterSpacing: '0.12em',
									marginBottom: '1.25rem',
									textTransform: 'uppercase'
								}}
							>
								From the ecosystem
							</animated.p>
							<animated.h1 style={heroTitleStyle(themeSprings)}>
								What we are building and why
							</animated.h1>
							<animated.p style={heroSubtitleStyle(themeSprings)}>
								Engineering notes, design decisions, and lessons
								from building the AbsoluteJS ecosystem.
							</animated.p>
						</header>

						<section aria-labelledby="latest-posts">
							<animated.h2
								id="latest-posts"
								style={{
									color: themeSprings.contrastPrimary,
									fontSize: '0.85rem',
									fontWeight: 800,
									letterSpacing: '0.1em',
									marginBottom: '1.75rem',
									textTransform: 'uppercase'
								}}
							>
								Latest posts
							</animated.h2>
							<div style={{ display: 'grid', gap: '1.5rem' }}>
								{blogPosts.map((post) => (
									<animated.article
										key={post.slug}
										style={{
											...featureCard(themeSprings),
											padding: 'clamp(1.5rem, 4vw, 3rem)'
										}}
									>
										<div
											style={{
												alignItems: 'center',
												display: 'flex',
												flexWrap: 'wrap',
												gap: '0.7rem 1rem',
												marginBottom: '1.4rem'
											}}
										>
											<animated.time
												dateTime={post.publishedAt}
												style={{
													color: themeSprings.contrastSecondary,
													fontSize: '0.75rem',
													fontWeight: 600,
													letterSpacing: '0.05em',
													textTransform: 'uppercase'
												}}
											>
												{formatPostDate(
													post.publishedAt
												)}
											</animated.time>
											{post.tags.map((tag) => (
												<span
													key={tag}
													style={{
														backgroundColor:
															'rgba(99, 102, 241, 0.12)',
														border: '1px solid rgba(99, 102, 241, 0.18)',
														borderRadius: '999px',
														color: primaryColor,
														fontSize: '0.68rem',
														fontWeight: 600,
														padding:
															'0.3rem 0.65rem',
														textTransform:
															'uppercase'
													}}
												>
													{tag}
												</span>
											))}
										</div>
										<animated.h3
											style={{
												color: themeSprings.contrastPrimary,
												fontSize:
													'clamp(1.75rem, 4vw, 2.75rem)',
												fontWeight: 700,
												letterSpacing: '-0.03em',
												lineHeight: 1.15,
												marginBottom: '1rem'
											}}
										>
											<a
												href={`${blog.site.basePath}/${post.slug}`}
												style={{
													color: 'inherit',
													textDecoration: 'none'
												}}
											>
												{post.title}
											</a>
										</animated.h3>
										<animated.p
											style={{
												color: themeSprings.contrastSecondary,
												fontSize: '1.05rem',
												lineHeight: 1.7,
												maxWidth: '760px'
											}}
										>
											{post.description}
										</animated.p>
										<a
											href={`${blog.site.basePath}/${post.slug}`}
											style={{
												...primaryButtonStyle,
												marginTop: '1.75rem',
												width: 'fit-content'
											}}
										>
											Read article
										</a>
									</animated.article>
								))}
							</div>
						</section>
					</div>
				</main>
			</animated.body>
		</html>
	);
};
