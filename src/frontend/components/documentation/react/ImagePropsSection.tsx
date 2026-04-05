import { ThemeSprings } from '../../../../types/springTypes';
import {
	listItemStyle,
	listStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
} from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';

type ImagePropsSectionProps = {
	themeSprings: ThemeSprings;
};

export const ImagePropsSection = ({ themeSprings }: ImagePropsSectionProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="image-props"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Image Props
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			All available props for the <code>Image</code> component:
		</p>
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>src</strong>: path to the source
				image (required)
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
				<strong style={strongStyle}>height</strong> : intrinsic height
				in pixels. Required unless <code>fill</code> is set.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>fill</strong>: when true, the image
				fills its parent container using absolute positioning
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>quality</strong> : output quality
				from 1 to 100
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>sizes</strong> : responsive sizes
				attribute for the browser
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>priority</strong> : preload the
				image and disable lazy loading
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>placeholder</strong> : placeholder
				strategy while loading
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>blurDataURL</strong> : base64 data
				URL for blur placeholder
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>loading</strong> :{' '}
				<code>"lazy"</code> or <code>"eager"</code>. Defaults to{' '}
				<code>"lazy"</code>.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>unoptimized</strong> : skip
				optimization and serve the original image
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>loader</strong>: custom function to
				generate the image URL
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>overrideSrc</strong> : override the
				resolved <code>src</code> on the rendered{' '}
				<code>&lt;img&gt;</code>
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>fetchPriority</strong> :{' '}
				<code>"high"</code>, <code>"low"</code>, or <code>"auto"</code>
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>crossOrigin</strong> : CORS setting
				for the image request
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>referrerPolicy</strong> : referrer
				policy for the image request
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>className</strong>: CSS class name
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>style</strong>: inline styles
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
	</section>
);
