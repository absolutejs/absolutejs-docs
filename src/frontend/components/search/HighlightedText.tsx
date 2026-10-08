import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import { searchMarkStyle } from '../../styles/searchStyles';

type HighlightedTextProps = {
	terms: string[];
	text: string;
	themeSprings: ThemeSprings;
};

const escapeForPattern = (term: string) =>
	term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Marks each occurrence of a query term in the text.
export const HighlightedText = ({
	terms,
	text,
	themeSprings
}: HighlightedTextProps) => {
	if (terms.length === 0) return <>{text}</>;
	const pattern = new RegExp(
		`(${terms.map(escapeForPattern).join('|')})`,
		'gi'
	);
	const lowerTerms = new Set(terms.map((term) => term.toLowerCase()));

	return (
		<>
			{text.split(pattern).map((part, index) =>
				lowerTerms.has(part.toLowerCase()) ? (
					<animated.mark
						key={`${index}-${part}`}
						style={searchMarkStyle(themeSprings)}
					>
						{part}
					</animated.mark>
				) : (
					part
				)
			)}
		</>
	);
};
