import { listItemStyle, listStyle } from '../../../styles/docsStyles';

export const TypecheckDependenciesList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<code>vue-tsc</code>: required if you have a Vue directory
		</li>
		<li style={listItemStyle}>
			<code>svelte-check</code>: required if you have a Svelte directory
		</li>
		<li style={listItemStyle}>
			<code>typescript</code>: always required
		</li>
	</ul>
);
