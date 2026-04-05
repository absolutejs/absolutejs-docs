import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const DevCliOptions = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>[entry]</strong> : Server entry file
			(defaults to <code>src/backend/server.ts</code>)
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>--config</strong>: Path to{' '}
			<code>absolute.config.ts</code>
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>--host</strong>: Bind to{' '}
			<code>0.0.0.0</code> and show network address
		</li>
	</ul>
);
