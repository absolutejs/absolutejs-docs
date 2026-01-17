import { ThemeSprings } from '../../../types/springTypes';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { JsonLine } from './JsonLine';

type HighlightedJsonProps = {
	data: unknown;
	primaryColor: string;
	themeSprings: ThemeSprings;
};

/* eslint-disable no-magic-numbers */
const ensureMinimumBrightness = (hex: string, minBrightness = 80): string => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;

	if (brightness < minBrightness) {
		return '#808080';
	}

	return hex;
};
/* eslint-enable no-magic-numbers */

export const HighlightedJson = ({
	data,
	primaryColor,
	themeSprings
}: HighlightedJsonProps) => {
	const jsonString = JSON.stringify(data ?? {}, null, 2);
	const jsonLines = jsonString
		.split('\n')
		.slice(1, -1)
		.map((line) => line.replace(/^ {2}/, ''));

	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');
	const safeColor = ensureMinimumBrightness(primaryColor);

	return (
		<pre
			style={{
				backgroundColor: `${safeColor}12`,
				border: `1px solid ${safeColor}40`,
				borderRadius: '12px',
				fontFamily:
					'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
				fontSize: '0.8125rem',
				height: isMobile ? '180px' : '260px',
				lineHeight: 1.7,
				margin: 0,
				overflow: 'auto',
				padding: '20px 24px',
				whiteSpace: 'pre-wrap'
			}}
		>
			<code>
				{jsonLines.map((line, lineIndex) => (
					<JsonLine
						themeSprings={themeSprings}
						key={lineIndex}
						line={line}
						needsNewline={lineIndex < jsonLines.length - 1}
					/>
				))}
			</code>
		</pre>
	);
};
