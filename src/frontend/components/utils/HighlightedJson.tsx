type HighlightedJsonProps = {
	data: unknown;
	primaryColor: string;
};

export const HighlightedJson = ({
	data,
	primaryColor
}: HighlightedJsonProps) => {
	const jsonString = JSON.stringify(data ?? {}, null, 2);
	const jsonLines = jsonString
		.split('\n')
		.slice(1, -1)
		.map((line) => line.replace(/^ {2}/, ''));
	const tokenPattern =
		/("(?:\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|true|false|null|-?\d+(\.\d+)?([eE][+\-]?\d+)?|[{}\[\],])/g;

	return (
		<pre
			style={{
				border: `2px solid ${primaryColor}`,
				borderRadius: '4px',
				fontFamily: 'monospace',
				height: '250px',
				margin: '0 0 8px',
				overflow: 'auto',
				padding: '16px',
				whiteSpace: 'pre-wrap'
			}}
		>
			<code>
				{jsonLines.map((line, lineIndex) => {
					const elements = [];
					let lastIndex = 0;
					for (const match of line.matchAll(tokenPattern)) {
						const token = match[0];
						const index = match.index ?? 0;
						if (lastIndex < index)
							elements.push(line.slice(lastIndex, index));
						let style = {};
						if (/^".*":$/.test(token)) style = { color: '#922' };
						else if (/^"/.test(token)) style = { color: '#070' };
						else if (/^(true|false)$/.test(token))
							style = { color: '#00c' };
						else if (token === 'null') style = { color: '#777' };
						else if (/^-?\d/.test(token)) style = { color: '#00f' };
						elements.push(
							<span key={index} style={style}>
								{token}
							</span>
						);
						lastIndex = index + token.length;
					}
					if (lastIndex < line.length)
						elements.push(line.slice(lastIndex));

					return (
						<span key={lineIndex}>
							{elements}
							{lineIndex < jsonLines.length - 1 && '\n'}
						</span>
					);
				})}
			</code>
		</pre>
	);
};
