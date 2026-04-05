import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const CompileCliOptions = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>[entry]</strong> : Server entry file
			(defaults to <code>src/backend/server.ts</code>)
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>--outdir</strong> : Build output
			directory (defaults to <code>dist</code>)
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>--outfile</strong> : Compiled binary
			path (defaults to <code>compiled-server</code>)
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>--config</strong>: Path to{' '}
			<code>absolute.config.ts</code>
		</li>
	</ul>
);
