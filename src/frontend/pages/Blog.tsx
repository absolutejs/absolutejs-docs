/* eslint-disable absolute/max-jsxnesting, absolute/sort-keys-fixable -- the blog index is site-owned editorial layout, not a package component API */
import { animated } from '@react-spring/web';
import { User } from '../../../db/schema';
import { blog, blogPosts } from '../../shared/blog';
import { Navbar } from '../components/navbar/Navbar';
import { Head } from '../components/page/Head';
import { ThemeMode, useTheme } from '../hooks/useTheme';
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
				style={{ ...bodyDefault(themeSprings), overflowX: 'hidden' }}
			>
				<Navbar
					setTheme={setTheme}
					themeSprings={themeSprings}
					user={user}
				/>
				<main style={mainDefault()}>
					<div
						style={{
							maxWidth: '1120px',
							padding: '5rem 2rem 7rem',
							width: '100%'
						}}
					>
						<header
							style={{
								borderBottom: '1px solid currentColor',
								marginBottom: '3.5rem',
								paddingBottom: '3rem'
							}}
						>
							<animated.p
								style={{
									color: themeSprings.contrastSecondary,
									fontFamily: 'monospace',
									fontSize: '0.75rem',
									fontWeight: 700,
									letterSpacing: '0.12em',
									marginBottom: '1rem',
									textTransform: 'uppercase'
								}}
							>
								Notes from the ecosystem
							</animated.p>
							<animated.h1
								style={{
									color: themeSprings.contrastPrimary,
									fontFamily: 'Georgia, serif',
									fontSize: 'clamp(3.5rem, 9vw, 7rem)',
									fontWeight: 400,
									letterSpacing: '-0.065em',
									lineHeight: 0.92,
									marginBottom: '1.5rem'
								}}
							>
								AbsoluteJS Blog
							</animated.h1>
							<animated.p
								style={{
									color: themeSprings.contrastSecondary,
									fontSize: '1.15rem',
									lineHeight: 1.7,
									maxWidth: '700px'
								}}
							>
								Engineering notes, design decisions, and lessons
								from building a TypeScript ecosystem.
							</animated.p>
							<nav
								aria-label="Blog feeds"
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									gap: '1rem',
									marginTop: '1.5rem'
								}}
							>
								{[
									['RSS', blog.site.feed.paths.rss],
									['Atom', blog.site.feed.paths.atom],
									['JSON Feed', blog.site.feed.paths.json]
								].map(([label, href]) => (
									<animated.a
										href={href}
										key={href}
										style={{
											color: themeSprings.contrastSecondary,
											fontFamily: 'monospace',
											fontSize: '0.75rem',
											fontWeight: 700,
											textUnderlineOffset: '4px',
											textTransform: 'uppercase'
										}}
									>
										{label}
									</animated.a>
								))}
							</nav>
						</header>

						<section aria-labelledby="latest-posts">
							<animated.h2
								id="latest-posts"
								style={{
									color: themeSprings.contrastPrimary,
									fontSize: '0.8rem',
									fontWeight: 800,
									letterSpacing: '0.1em',
									marginBottom: '1.5rem',
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
											border: themeSprings.contrastSecondary.to(
												(color) => `1px solid ${color}`
											),
											padding: 'clamp(1.5rem, 4vw, 3rem)'
										}}
									>
										<div
											style={{
												alignItems: 'center',
												display: 'flex',
												flexWrap: 'wrap',
												gap: '0.7rem 1.2rem',
												marginBottom: '1.4rem'
											}}
										>
											<animated.time
												dateTime={post.publishedAt}
												style={{
													color: themeSprings.contrastSecondary,
													fontFamily: 'monospace',
													fontSize: '0.72rem',
													letterSpacing: '0.06em',
													textTransform: 'uppercase'
												}}
											>
												{formatPostDate(
													post.publishedAt
												)}
											</animated.time>
											{post.tags.map((tag) => (
												<animated.span
													key={tag}
													style={{
														backgroundColor:
															themeSprings.themeTertiary,
														color: themeSprings.contrastPrimary,
														fontFamily: 'monospace',
														fontSize: '0.68rem',
														padding:
															'0.3rem 0.55rem',
														textTransform:
															'uppercase'
													}}
												>
													{tag}
												</animated.span>
											))}
										</div>
										<animated.h3
											style={{
												color: themeSprings.contrastPrimary,
												fontFamily: 'Georgia, serif',
												fontSize:
													'clamp(2rem, 5vw, 3.5rem)',
												fontWeight: 400,
												letterSpacing: '-0.04em',
												lineHeight: 1.05,
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
										<animated.a
											href={`${blog.site.basePath}/${post.slug}`}
											style={{
												color: themeSprings.contrastPrimary,
												display: 'inline-block',
												fontSize: '0.8rem',
												fontWeight: 800,
												letterSpacing: '0.08em',
												marginTop: '1.5rem',
												textDecorationThickness: '2px',
												textTransform: 'uppercase',
												textUnderlineOffset: '5px'
											}}
										>
											Read article
										</animated.a>
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
