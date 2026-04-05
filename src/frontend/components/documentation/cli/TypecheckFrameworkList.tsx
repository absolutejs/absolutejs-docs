import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const TypecheckFrameworkList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Vue directories</strong> →{' '}
			<code>vue-tsc</code> (checks <code>.ts</code>, <code>.tsx</code>,
			and <code>.vue</code> files)
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Svelte directories</strong> →{' '}
			<code>svelte-check</code> (checks <code>.svelte</code> files, scoped
			to the Svelte directory)
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Everything else</strong> →{' '}
			<code>tsc</code> (when no Vue directory is configured)
		</li>
	</ul>
);
