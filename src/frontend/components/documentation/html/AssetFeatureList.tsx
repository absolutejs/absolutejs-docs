import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const AssetFeatureList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Hashed filenames</strong>: Built files
			include content hashes for cache busting
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Path rewriting</strong>: All asset paths
			are automatically updated to the build output
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>Bundling</strong>: Assets are optimized
			and minified for production
		</li>
	</ul>
);
