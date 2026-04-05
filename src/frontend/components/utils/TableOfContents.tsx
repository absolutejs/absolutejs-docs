import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import {
	tocNavStyle,
	tocTitleStyle,
	tocListStyle
} from '../../styles/docsStyles';
import { TocListItem } from './TocItem';

export type TocItem = {
	label: string;
	href: string;
};

type TableOfContentsProps = {
	themeSprings: ThemeSprings;
	items: TocItem[];
	title?: string;
};

export const TableOfContents = ({
	themeSprings,
	items,
	title = 'On This Page'
}: TableOfContentsProps) => (
	<animated.nav style={tocNavStyle}>
		<animated.h3 style={tocTitleStyle(themeSprings)}>{title}</animated.h3>
		<ul style={tocListStyle}>
			{items.map((item) => (
				<TocListItem
					item={item}
					key={item.href}
					themeSprings={themeSprings}
				/>
			))}
		</ul>
	</animated.nav>
);
