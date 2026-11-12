import { Head } from '@absolutejs/absolute/react/components';
import { useReadingProgress, useReadingTime } from '@absolutejs/blog/react';
import type { FluidValue } from '@react-spring/shared';
import { animated } from '@react-spring/web';
import { useRef } from 'react';
import { User } from '../../../db/schema';
import { AnimatedCSSProperties } from '../../types/springTypes';
import { blog } from '../../shared/blog';
import { getArticleEntry } from '../components/blog/postRegistry';
import { Navbar } from '../components/navbar/Navbar';
import { ThemeMode, useTheme } from '../hooks/useTheme';

const PERCENT = 100;

type BlogPostProps = {
	slug: string;
	theme: ThemeMode | undefined;
	user: User | null;
};

type ArticleThemeStyle = AnimatedCSSProperties & {
	'--accent': FluidValue<string>;
	'--accent-soft': FluidValue<string>;
	'--accent-surface': FluidValue<string>;
	'--danger': FluidValue<string>;
	'--ink': FluidValue<string>;
	'--line': FluidValue<string>;
	'--muted': FluidValue<string>;
	'--paper': FluidValue<string>;
	'--paper-deep': FluidValue<string>;
};

export const BlogPost = ({ slug, theme, user }: BlogPostProps) => {
	const post = blog.get(slug);
	if (post === undefined) {
		throw new Error(`Unknown blog post "${slug}"`);
	}
	const article = getArticleEntry(slug);
	if (article === undefined) {
		throw new Error(`Blog post "${slug}" has no article content`);
	}
	const { bodyClassName, Content, footer, styles } = article;

	const [themeSprings, setTheme] = useTheme(theme);
	const articleRef = useRef<HTMLElement>(null);
	const progress = useReadingProgress(articleRef);
	const readingTime = useReadingTime(articleRef);
	const metadata = blog.head(post);
	const { jsonLd, ...headMetadata } = metadata;
	const articleThemeStyle: ArticleThemeStyle = {
		'--accent': themeSprings.theme.to((mode) =>
			mode.endsWith('dark') ? '#a5b4fc' : '#4f46e5'
		),
		'--accent-soft': themeSprings.theme.to((mode) =>
			mode.endsWith('dark')
				? 'rgba(99, 102, 241, 0.16)'
				: 'rgba(99, 102, 241, 0.10)'
		),
		'--accent-surface': themeSprings.theme.to((mode) =>
			mode.endsWith('dark') ? '#25253f' : '#eef2ff'
		),
		'--danger': themeSprings.theme.to((mode) =>
			mode.endsWith('dark') ? '#ff9b81' : '#b93822'
		),
		'--ink': themeSprings.contrastPrimary,
		'--line': themeSprings.contrastPrimary.to(
			(color) => `color-mix(in srgb, ${color} 18%, transparent)`
		),
		'--muted': themeSprings.contrastPrimary.to(
			(color) => `color-mix(in srgb, ${color} 62%, transparent)`
		),
		'--paper': themeSprings.themeSecondary,
		'--paper-deep': themeSprings.themeTertiary
	};

	return (
		<html lang="en">
			<Head
				{...headMetadata}
				icon="/assets/favicon.ico"
				meta={metadata.meta}
			/>
			<animated.body className={bodyClassName} style={articleThemeStyle}>
				<script
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							...jsonLd
						})
					}}
					type="application/ld+json"
				/>
				<style>{styles}</style>
				<div className="blog-sticky-header">
					<Navbar
						setTheme={setTheme}
						themeSprings={themeSprings}
						user={user}
					/>
					<div aria-hidden="true" className="reading-progress-track">
						<div
							className="reading-progress"
							style={{ width: `${progress * PERCENT}%` }}
						/>
					</div>
				</div>
				<main ref={articleRef}>
					<Content post={post} readingTime={readingTime} />
				</main>
				<footer className="site-footer">
					<span>{footer.title}</span>
					<span>{footer.detail}</span>
				</footer>
			</animated.body>
		</html>
	);
};
