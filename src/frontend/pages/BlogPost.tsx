import { Head } from '@absolutejs/absolute/react/components';
import { useReadingProgress, useReadingTime } from '@absolutejs/blog/react';
import type { FluidValue } from '@react-spring/shared';
import { animated } from '@react-spring/web';
import { useRef } from 'react';
import { User } from '../../../db/schema';
import { AnimatedCSSProperties } from '../../types/springTypes';
import { blog } from '../../shared/blog';
import { CitraArticleContent } from '../components/blog/CitraArticleContent';
import { Navbar } from '../components/navbar/Navbar';
import { ThemeMode, useTheme } from '../hooks/useTheme';
import { citraArticleStyles } from '../styles/citraArticleStyles';

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
			<animated.body
				className="citra-blog-document"
				style={articleThemeStyle}
			>
				<script
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							...jsonLd
						})
					}}
					type="application/ld+json"
				/>
				<style>{citraArticleStyles}</style>
				<div
					aria-hidden="true"
					className="reading-progress"
					style={{ width: `${progress * PERCENT}%` }}
				/>
				<Navbar
					setTheme={setTheme}
					themeSprings={themeSprings}
					user={user}
				/>
				<main ref={articleRef}>
					<CitraArticleContent
						post={post}
						readingTime={readingTime}
					/>
				</main>
				<footer className="site-footer">
					<span>Citra · OAuth2 for TypeScript</span>
					<span>78 provider configurations, one request engine.</span>
				</footer>
			</animated.body>
		</html>
	);
};
