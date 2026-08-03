import { animated } from '@react-spring/web';
import { CSSProperties, useState } from 'react';
import { ThemeSprings } from '../../../types/springTypes';

const clampCharacterThreshold = 240;
const clampedLineCount = 4;

const clampedStyle: CSSProperties = {
	display: '-webkit-box',
	overflow: 'hidden',
	WebkitBoxOrient: 'vertical',
	WebkitLineClamp: clampedLineCount
};

const toggleStyle: CSSProperties = {
	background: 'none',
	border: 'none',
	color: '#6366F1',
	cursor: 'pointer',
	fontSize: '0.78rem',
	fontWeight: 600,
	marginTop: '0.35rem',
	padding: 0
};

type ClampedTextProps = {
	fontSize?: string;
	text: string;
	themeSprings: ThemeSprings;
};

/**
 * Body text that collapses to a few lines with a Read more toggle once it
 * would read as a wall. Short text renders as a plain paragraph.
 */
export const ClampedText = ({
	fontSize = '0.9rem',
	text,
	themeSprings
}: ClampedTextProps) => {
	const [expanded, setExpanded] = useState(false);
	const needsClamp = text.length > clampCharacterThreshold;

	return (
		<>
			<animated.p
				style={{
					color: themeSprings.contrastSecondary,
					fontSize,
					lineHeight: 1.6,
					margin: 0,
					...(needsClamp && !expanded ? clampedStyle : {})
				}}
			>
				{text}
			</animated.p>
			{needsClamp ? (
				<button
					onClick={() => setExpanded(!expanded)}
					style={toggleStyle}
					type="button"
				>
					{expanded ? 'Show less' : 'Read more'}
				</button>
			) : null}
		</>
	);
};
