import { styleReset } from '../../styles/styles';

type HeadProps = {
	canonicalUrl?: string;
	description?: string;
	title?: string;
	icon?: string;
};

export const Head = ({
	canonicalUrl,
	description = 'AbsoluteJS Documentation',
	title = 'AbsoluteJS',
	icon = '/assets/favicon.ico'
}: HeadProps) => (
	<head>
		<meta charSet="utf-8" />
		<title>{title}</title>
		<meta content={description} name="description" />
		<meta content={title} property="og:title" />
		<meta content={description} property="og:description" />
		<meta content="website" property="og:type" />
		{canonicalUrl ? (
			<>
				<link href={canonicalUrl} rel="canonical" />
				<meta content={canonicalUrl} property="og:url" />
			</>
		) : null}
		<meta content="width=device-width, initial-scale=1" name="viewport" />
		<link href={icon} rel="icon" />
		<link
			href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
			rel="stylesheet"
		/>
		<style>{styleReset}</style>
	</head>
);
