import { animated } from '@react-spring/web';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { ThemeSprings } from '../../../types/springTypes';
import type { DocsSearchResult } from '../../../types/types';
import { useDocsSearch } from '../../hooks/useDocsSearch';
import {
	searchFooterStyle,
	searchInputRowStyle,
	searchInputStyle,
	searchKeyStyle,
	searchMessageStyle,
	searchPanelStyle,
	searchResultsStyle
} from '../../styles/searchStyles';
import { Modal } from '../utils/Modal';
import { SearchResultRow } from './SearchResultRow';

type DocsSearchDialogProps = {
	initialQuery: string;
	isOpen: boolean;
	onClose: () => void;
	onSelect: (result: DocsSearchResult) => void;
	themeSprings: ThemeSprings;
};

type SearchMessageProps = {
	error: boolean;
	loading: boolean;
	query: string;
	resultCount: number;
	themeSprings: ThemeSprings;
};

const SearchMessage = ({
	error,
	loading,
	query,
	resultCount,
	themeSprings
}: SearchMessageProps) => {
	if (resultCount > 0) return null;
	let message = 'Search page titles, headings and text across every doc.';
	if (error) message = 'Search is unavailable right now. Try again shortly.';
	else if (loading) message = 'Searching…';
	else if (query.trim() !== '')
		message = `Nothing in the docs matches “${query.trim()}”.`;

	return (
		<animated.p style={searchMessageStyle(themeSprings)}>
			{message}
		</animated.p>
	);
};

export const DocsSearchDialog = ({
	initialQuery,
	isOpen,
	onClose,
	onSelect,
	themeSprings
}: DocsSearchDialogProps) => {
	const [query, setQuery] = useState(initialQuery);
	const [activeIndex, setActiveIndex] = useState(0);
	const rows = useRef<Array<HTMLLIElement | null>>([]);
	const { error, loading, results } = useDocsSearch(isOpen ? query : '');

	useEffect(() => {
		if (isOpen) setQuery(initialQuery);
	}, [initialQuery, isOpen]);

	useEffect(() => setActiveIndex(0), [results]);

	useEffect(() => {
		rows.current[activeIndex]?.scrollIntoView({ block: 'nearest' });
	}, [activeIndex]);

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			onClose();
		} else if (event.key === 'ArrowDown' && results.length > 0) {
			event.preventDefault();
			setActiveIndex((index) => (index + 1) % results.length);
		} else if (event.key === 'ArrowUp' && results.length > 0) {
			event.preventDefault();
			setActiveIndex(
				(index) => (index - 1 + results.length) % results.length
			);
		} else if (event.key === 'Enter') {
			const result = results[activeIndex];
			if (result) onSelect(result);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<animated.div style={searchPanelStyle(themeSprings)}>
				<animated.div style={searchInputRowStyle(themeSprings)}>
					<input
						aria-label="Search the docs"
						autoFocus
						onChange={(event) => setQuery(event.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Search the docs"
						style={searchInputStyle}
						type="text"
						value={query}
					/>
					<animated.kbd style={searchKeyStyle(themeSprings)}>
						esc
					</animated.kbd>
				</animated.div>
				<ul style={searchResultsStyle}>
					{results.map((result, index) => (
						<SearchResultRow
							active={index === activeIndex}
							key={`${result.view}#${result.anchor ?? ''}`}
							onHover={() => setActiveIndex(index)}
							onSelect={() => onSelect(result)}
							query={query}
							result={result}
							rowRef={(element) => {
								rows.current[index] = element;
							}}
							themeSprings={themeSprings}
						/>
					))}
				</ul>
				<SearchMessage
					error={error}
					loading={loading}
					query={query}
					resultCount={results.length}
					themeSprings={themeSprings}
				/>
				<animated.div style={searchFooterStyle(themeSprings)}>
					<span>↑↓ to move · ↵ to open</span>
					<span>
						{results.length > 0
							? `${results.length} result${results.length === 1 ? '' : 's'}`
							: ''}
					</span>
				</animated.div>
			</animated.div>
		</Modal>
	);
};
