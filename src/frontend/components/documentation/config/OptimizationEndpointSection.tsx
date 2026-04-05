import { ThemeProps } from '../../../../types/springTypes';
import { imageEndpointDirect } from '../../../data/documentation/imageOptDocsCode';
import {
	listItemStyle,
	listStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
} from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';

export const OptimizationEndpointSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="endpoint"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Optimization Endpoint
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			The endpoint accepts three query parameters:
		</p>
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>url</strong> (required) : the source
				image path or a full remote URL
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>w</strong> (required) : target width
				in pixels. Must be one of the configured{' '}
				<code>deviceSizes</code> or <code>imageSizes</code> values.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>q</strong> (optional) : quality
				1-100. Defaults to the configured quality.
			</li>
		</ul>
		<PrismPlus
			codeString={imageEndpointDirect}
			language="bash"
			showLineNumbers={false}
			themeSprings={themeSprings}
		/>
	</section>
);
