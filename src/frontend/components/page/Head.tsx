import { styleReset } from '../../styles/styles';

type HeadProps = {
	canonical?: string;
	canonicalUrl?: string;
	description?: string;
	icon?: string;
	jsonLd?: string;
	meta?: MetaTag[];
	openGraph?: OpenGraphMetadata;
	robots?: string;
	title?: string;
	twitter?: TwitterMetadata;
};

type MetaTag = {
	content: string;
	name?: string;
	property?: string;
};

type OpenGraphMetadata = {
	description?: string;
	image?: string;
	locale?: string;
	siteName?: string;
	title?: string;
	type?: string;
	url?: string;
};

type TwitterMetadata = {
	card?: string;
	description?: string;
	image?: string;
	site?: string;
	title?: string;
};

export const Head = ({
	canonical,
	canonicalUrl,
	description = 'AbsoluteJS Documentation',
	title = 'AbsoluteJS',
	icon = '/assets/favicon.ico',
	jsonLd,
	meta = [],
	openGraph,
	robots = 'index,follow,max-image-preview:large,max-snippet:-1',
	twitter
}: HeadProps) => {
	const canonicalHref = canonicalUrl ?? canonical;
	const image =
		openGraph?.image ??
		twitter?.image ??
		'https://absolutejs.com/assets/png/absolutejs-logo.png';

	return (
		<head>
			<meta charSet="utf-8" />
			<title>{title}</title>
			<meta content={description} name="description" />
			<meta content={robots} name="robots" />
			<meta content={openGraph?.title ?? title} property="og:title" />
			<meta
				content={openGraph?.description ?? description}
				property="og:description"
			/>
			<meta content={openGraph?.type ?? 'website'} property="og:type" />
			<meta
				content={openGraph?.siteName ?? 'AbsoluteJS'}
				property="og:site_name"
			/>
			<meta content={openGraph?.locale ?? 'en_US'} property="og:locale" />
			<meta content={image} property="og:image" />
			<meta
				content={twitter?.card ?? 'summary_large_image'}
				name="twitter:card"
			/>
			<meta content={twitter?.title ?? title} name="twitter:title" />
			<meta
				content={twitter?.description ?? description}
				name="twitter:description"
			/>
			<meta content={twitter?.image ?? image} name="twitter:image" />
			{twitter?.site ? (
				<meta content={twitter.site} name="twitter:site" />
			) : null}
			{meta.map((tag) => (
				<meta
					content={tag.content}
					key={`${tag.name ?? ''}:${tag.property ?? ''}:${tag.content}`}
					name={tag.name}
					property={tag.property}
				/>
			))}
			{canonicalHref ? (
				<>
					<link href={canonicalHref} rel="canonical" />
					<meta
						content={openGraph?.url ?? canonicalHref}
						property="og:url"
					/>
				</>
			) : null}
			{jsonLd ? (
				<script
					dangerouslySetInnerHTML={{ __html: jsonLd }}
					type="application/ld+json"
				/>
			) : null}
			<meta
				content="width=device-width, initial-scale=1"
				name="viewport"
			/>
			<link href={icon} rel="icon" />
			<link
				href="/blog/rss.xml"
				rel="alternate"
				title="AbsoluteJS Blog RSS"
				type="application/rss+xml"
			/>
			<link
				href="/blog/atom.xml"
				rel="alternate"
				title="AbsoluteJS Blog Atom"
				type="application/atom+xml"
			/>
			<link
				href="/blog/feed.json"
				rel="alternate"
				title="AbsoluteJS Blog JSON Feed"
				type="application/feed+json"
			/>
			<link
				href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
				rel="stylesheet"
			/>
			<style>{styleReset}</style>
		</head>
	);
};
