import { CSSProperties } from 'react';
import { lightTertiaryColor } from '../../styles/colors';


export type TocItem = {
	label: string;
	href: string;
};

type TableOfContentsProps = {
	items: TocItem[];
	title?: string;
};

const navStyle: CSSProperties = {
	position: 'sticky',
	top: '2rem',
	right: '2rem',
	width: '250px',
	height: 'fit-content',
	padding: '1.5rem',
	borderLeft: `2px solid ${lightTertiaryColor}`,
	overflowY: 'auto',
	maxHeight: 'calc(100vh - 4rem)'
};

const titleStyle: CSSProperties = {
	fontSize: '0.875rem',
	fontWeight: '600',
	marginBottom: '1rem',
	color: '#ffffff',
	textTransform: 'uppercase',
	letterSpacing: '0.05em'
};

const listStyle: CSSProperties = {
	listStyle: 'none',
	padding: 0,
	margin: 0,
	display: 'flex',
	flexDirection: 'column',
	gap: '0.5rem'
};

const linkStyle: CSSProperties = {
	color: '#ffffff',
	textDecoration: 'none',
	fontSize: '0.875rem',
	transition: 'color 0.2s'
};

export const TableOfContents = ({ items, title = 'On This Page' }: TableOfContentsProps) => (
	<nav style={navStyle}>
		<h3 style={titleStyle}>
			{title}
		</h3>
		<ul style={listStyle}>
			{items.map((item) => (
				<li key={item.href}>
					<a href={item.href} style={linkStyle}>
						{item.label}
					</a>
				</li>
			))}
		</ul>
	</nav>
);