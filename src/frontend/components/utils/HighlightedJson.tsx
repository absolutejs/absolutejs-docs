import {
	COLOR_CHANNEL_PARSE_RADIX,
	HEX_COLOR_BLUE_END_INDEX,
	HEX_COLOR_BLUE_START_INDEX,
	HEX_COLOR_GREEN_END_INDEX,
	HEX_COLOR_GREEN_START_INDEX,
	HEX_COLOR_RED_END_INDEX,
	JSON_VIEWER_LAYOUT,
	MINIMUM_READABLE_BRIGHTNESS,
	YIQ_BLUE_WEIGHT,
	YIQ_GREEN_WEIGHT,
	YIQ_RED_WEIGHT,
	YIQ_SCALE_DIVISOR
} from '../../../constants';
import { ThemeSprings } from '../../../types/springTypes';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { JsonLine } from './JsonLine';

type HighlightedJsonProps = {
	data: unknown;
	primaryColor: string;
	themeSprings: ThemeSprings;
};

const ensureMinimumBrightness = (
	hex: string,
	minBrightness = MINIMUM_READABLE_BRIGHTNESS
) => {
	const red = parseInt(
		hex.slice(1, HEX_COLOR_RED_END_INDEX),
		COLOR_CHANNEL_PARSE_RADIX
	);
	const green = parseInt(
		hex.slice(HEX_COLOR_GREEN_START_INDEX, HEX_COLOR_GREEN_END_INDEX),
		COLOR_CHANNEL_PARSE_RADIX
	);
	const blue = parseInt(
		hex.slice(HEX_COLOR_BLUE_START_INDEX, HEX_COLOR_BLUE_END_INDEX),
		COLOR_CHANNEL_PARSE_RADIX
	);
	const brightness =
		(red * YIQ_RED_WEIGHT +
			green * YIQ_GREEN_WEIGHT +
			blue * YIQ_BLUE_WEIGHT) /
		YIQ_SCALE_DIVISOR;

	if (brightness < minBrightness) {
		return '#808080';
	}

	return hex;
};

export const HighlightedJson = ({
	data,
	primaryColor,
	themeSprings
}: HighlightedJsonProps) => {
	const jsonString = JSON.stringify(data ?? {}, null, 2);
	const jsonLines = jsonString
		.split('\n')
		.slice(1, JSON_VIEWER_LAYOUT.contentEndIndexOffset)
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
						key={lineIndex}
						line={line}
						needsNewline={lineIndex < jsonLines.length - 1}
						themeSprings={themeSprings}
					/>
				))}
			</code>
		</pre>
	);
};
