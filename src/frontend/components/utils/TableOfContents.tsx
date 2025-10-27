import { CSSProperties } from 'react';
import { animated } from '@react-spring/web';
import { AnimatedCSSProperties, ThemeSprings } from '../../../types/springTypes';

export type TocItem = {
	label: string;
	href: string;
};

type TableOfContentsProps = {
	themeSprings: ThemeSprings;
	items: TocItem[];
	title?: string;
};

const navStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	position: 'sticky',
	top: '4rem',
	right: '4rem',
	width: '20%',
	height: 'fit-content',
	padding: '0 1.5rem',
	borderLeft: themeSprings.contrastSecondary.to(color => `1px solid ${color}`),
	overflowY: 'auto',
	maxHeight: 'calc(100vh - 4rem)'
});

const titleStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	fontSize: '1rem',
	fontWeight: '600',
	marginBottom: '1rem',
	color: themeSprings.contrastPrimary,
	textTransform: 'uppercase',
	letterSpacing: '0.05em'
});

const listStyle: CSSProperties = {
	listStyle: 'none',
	padding: 0,
	margin: 0,
	display: 'flex',
	flexDirection: 'column',
	gap: '0.75rem'
};

const linkStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	color: themeSprings.contrastPrimary,
	textDecoration: 'none',
	fontSize: '1rem',
	transition: 'color 0.2s',
	wordBreak: 'break-word'
});

export const TableOfContents = ({ themeSprings, items, title = 'On This Page' }: TableOfContentsProps) => (
	<animated.nav style={navStyle(themeSprings)}>
		<animated.h3 style={titleStyle(themeSprings)}>
			{title}
		</animated.h3>
		<ul style={listStyle}>
			{items.map((item) => (
				<li key={item.href}>
					<animated.a href={item.href} style={linkStyle(themeSprings)}>
						{item.label}
					</animated.a>
				</li>
			))}
		</ul>
	</animated.nav>
);