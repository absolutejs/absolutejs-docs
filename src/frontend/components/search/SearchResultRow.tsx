import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import type { DocsSearchResult } from '../../../types/types';
import {
	searchBreadcrumbStyle,
	searchResultStyle,
	searchSnippetStyle,
	searchTitleStyle
} from '../../styles/searchStyles';
import { HighlightedText } from './HighlightedText';

type SearchResultRowProps = {
	active: boolean;
	onHover: () => void;
	onSelect: () => void;
	query: string;
	result: DocsSearchResult;
	rowRef: (element: HTMLLIElement | null) => void;
	themeSprings: ThemeSprings;
};

const termsOf = (query: string) =>
	query
		.toLowerCase()
		.split(/\s+/)
		.filter((term) => term.length >= 2);

export const SearchResultRow = ({
	active,
	onHover,
	onSelect,
	query,
	result,
	rowRef,
	themeSprings
}: SearchResultRowProps) => {
	const terms = termsOf(query);

	return (
		<animated.li
			onClick={onSelect}
			onMouseMove={onHover}
			ref={rowRef}
			style={searchResultStyle(themeSprings, active)}
		>
			{result.breadcrumb.length > 0 && (
				<animated.span style={searchBreadcrumbStyle(themeSprings)}>
					{result.breadcrumb.join(' › ')}
				</animated.span>
			)}
			<span style={searchTitleStyle}>
				<HighlightedText
					terms={terms}
					text={
						result.heading
							? `${result.title} › ${result.heading}`
							: result.title
					}
					themeSprings={themeSprings}
				/>
			</span>
			<animated.span style={searchSnippetStyle(themeSprings)}>
				<HighlightedText
					terms={terms}
					text={result.snippet}
					themeSprings={themeSprings}
				/>
			</animated.span>
		</animated.li>
	);
};
