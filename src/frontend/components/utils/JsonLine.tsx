import { useThemeStore } from '../../hooks/useThemeStore';

type JsonLineProps = {
	line: string;
	needsNewline: boolean;
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
		boolean: '#8be9fd',
		key: '#ff79c6',
		null: '#6272a4',
		number: '#bd93f9',
		punctuation: '#f8f8f2',
		string: '#50fa7b',
		text: '#f8f8f2'
	},
	light: {
		boolean: '#0000ff',
		key: '#a31515',
		null: '#808080',
		number: '#098658',
		punctuation: '#000000',
		string: '#008000',
		text: '#000000'
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

export const JsonLine = ({ line, needsNewline }: JsonLineProps) => {
	const theme = useThemeStore((state) => state.theme);
	const colors = theme === 'dark' ? colorMap.dark : colorMap.light;

	const segments = line.split(tokenPattern).filter((segment) => segment);

	return (
		<span>
			{segments.map((segment, idx) => (
				<span
					key={idx}
					style={{
						color: tokenPattern.test(segment)
							? colors[getTokenColorKey(segment)]
							: colors.text
					}}
				>
					{segment}
				</span>
			))}
			{needsNewline && '\n'}
		</span>
	);
};
