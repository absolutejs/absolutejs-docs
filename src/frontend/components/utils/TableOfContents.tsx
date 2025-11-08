import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import { tocNavStyle, tocTitleStyle, tocListStyle, tocLinkStyle } from '../../styles/docsStyles';

export type TocItem = {
	label: string;
	href: string;
};

type TableOfContentsProps = {
	themeSprings: ThemeSprings;
	items: TocItem[];
	title?: string;
};

type TocListItemProps = {
	item: TocItem;
	themeSprings: ThemeSprings;
};

const TocListItem = ({ item, themeSprings }: TocListItemProps) => (
	<li>
		<animated.a href={item.href} style={tocLinkStyle(themeSprings)}>
			{item.label}
		</animated.a>
	</li>
);

export const TableOfContents = ({ themeSprings, items, title = 'On This Page' }: TableOfContentsProps) => (
	<animated.nav style={tocNavStyle(themeSprings)}>
		<animated.h3 style={tocTitleStyle(themeSprings)}>
			{title}
		</animated.h3>
		<ul style={tocListStyle}>
			{items.map((item) => (
				<TocListItem key={item.href} item={item} themeSprings={themeSprings} />
			))}
		</ul>
	</animated.nav>
);