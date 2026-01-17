import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';

type JsonLineProps = {
	line: string;
	needsNewline: boolean;
	themeSprings: ThemeSprings;
};

type ThemeMode = 'light' | 'dark';
type ColorKey =
	| 'boolean'
	| 'key'
	| 'null'
	| 'number'
	| 'punctuation'
	| 'string'
	| 'text';

const colorMap: Record<ThemeMode, Record<ColorKey, string>> = {
	dark: {
		boolean: '#93c5fd',
		key: '#f9a8d4',
		null: '#9ca3af',
		number: '#c4b5fd',
		punctuation: '#d1d5db',
		string: '#86efac',
		text: '#e5e7eb'
	},
	light: {
		boolean: '#2563eb',
		key: '#be185d',
		null: '#6b7280',
		number: '#7c3aed',
		punctuation: '#374151',
		string: '#059669',
		text: '#1f2937'
	}
};

const tokenPattern =
	/("(?:\\u[0-9A-Fa-f]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|true|false|null|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[[\]{},])/g;

const colorRules: [RegExp, ColorKey][] = [
	[/^".*":$/, 'key'],
	[/^"/, 'string'],
	[/^(true|false)$/, 'boolean'],
	[/^null$/, 'null'],
	[/^-?\d/, 'number']
];

const defaultColorKey: ColorKey = 'punctuation';

const getTokenColorKey = (token: string) =>
	colorRules.find(([pattern]) => pattern.test(token))?.[1] ?? defaultColorKey;

export const JsonLine = ({
	line,
	needsNewline,
	themeSprings
}: JsonLineProps) => {
	const colors = themeSprings.theme.to((mode) =>
		mode.endsWith('dark') ? colorMap.dark : colorMap.light
	);

	const segments = line.split(tokenPattern).filter((segment) => segment);

	return (
		<span>
			{segments.map((segment, idx) => (
				<animated.span
					key={idx}
					style={{
						color: colors.to((c) =>
							tokenPattern.test(segment)
								? c[getTokenColorKey(segment)]
								: c.text
						)
					}}
				>
					{segment}
				</animated.span>
			))}
			{needsNewline && '\n'}
		</span>
	);
};
