import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const SvelteImagePropsList = () => (
	<ul style={listStyle}>
		<li style={listItemStyle}>
			<strong style={strongStyle}>src</strong>: path to the source image
			(required)
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>alt</strong> : alternative text for
			accessibility (required)
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>width</strong> : intrinsic width in
			pixels. Required unless <code>fill</code> is set.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>height</strong> : intrinsic height in
			pixels. Required unless <code>fill</code> is set.
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>fill</strong>: when true, the image
			fills its parent container
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>quality</strong> : output quality from 1
			to 100
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>sizes</strong> : responsive sizes
			attribute
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>priority</strong> : preload the image
			and disable lazy loading
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>placeholder</strong> : placeholder
			strategy while loading
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>blurDataURL</strong> : base64 data URL
			for blur placeholder
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>loading</strong> : <code>"lazy"</code>{' '}
			or <code>"eager"</code>
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>unoptimized</strong> : skip optimization
			and serve the original
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>style</strong>: inline styles (string in
			Svelte)
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>className</strong>: CSS class name
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>onLoad</strong> : callback when the
			image finishes loading
		</li>
		<li style={listItemStyle}>
			<strong style={strongStyle}>onError</strong> : callback when the
			image fails to load
		</li>
	</ul>
);
