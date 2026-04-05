import { styleReset } from '../../styles/styles';

type HeadProps = {
	title?: string;
	icon?: string;
};

export const Head = ({
	title = 'AbsoluteJS',
	icon = '/assets/favicon.ico'
}: HeadProps) => (
	<head>
		<meta charSet="utf-8" />
		<title>{title}</title>
		<meta content="AbsoluteJS Documentation" name="description" />
		<meta content="width=device-width, initial-scale=1" name="viewport" />
		<link href={icon} rel="icon" />
		<link
			href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
			rel="stylesheet"
		/>
		<style>{styleReset}</style>
	</head>
);
