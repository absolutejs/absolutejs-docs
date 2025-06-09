import { useThemeStore } from '../../hooks/useThemeStore';

type JsonLineProps = {
	line: string;
	needsNewline: boolean;
};

const colorMap: Record<'light' | 'dark', Record<string, string>> = {
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

export const JsonLine = ({ line, needsNewline }: JsonLineProps) => {
	const theme = useThemeStore((s) => s.theme);
	const isDark = theme === 'dark';
	const colors = isDark ? colorMap.dark : colorMap.light;
	const elements: React.ReactNode[] = [];
	let lastIndex = 0;
	const tokenPattern =
		/("(?:\\u[0-9A-Fa-f]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|true|false|null|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[[\]{},])/g;

	for (const match of line.matchAll(tokenPattern)) {
		const token = match[0];
		const idx = match.index;

		if (lastIndex < idx) {
			elements.push(
				<span style={{ color: colors.text }} key={lastIndex}>
					{line.slice(lastIndex, idx)}
				</span>
			);
		}

		let styleColor = colors.punctuation;
		if (/^".*":$/.test(token)) styleColor = colors.key;
		else if (/^"/.test(token)) styleColor = colors.string;
		else if (/^(true|false)$/.test(token)) styleColor = colors.boolean;
		else if (token === 'null') styleColor = colors.null;
		else if (/^-?\d/.test(token)) styleColor = colors.number;

		elements.push(
			<span style={{ color: styleColor }} key={idx}>
				{token}
			</span>
		);
		lastIndex = idx + token.length;
	}

	if (lastIndex < line.length) {
		elements.push(
			<span style={{ color: colors.text }} key={lastIndex}>
				{line.slice(lastIndex)}
			</span>
		);
	}

	return (
		<span>
			{elements}
			{needsNewline && '\n'}
		</span>
	);
};
