import { ThemeProps } from '../../../../types/springTypes';
import { imageRemotePatterns } from '../../../data/documentation/imageOptDocsCode';
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

export const RemoteImagesSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="remote-images"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Remote Images
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			By default, only local images are allowed. To optimize remote
			images, configure <code>remotePatterns</code> with the allowed
			origins. This prevents the endpoint from being used as an open
			proxy.
		</p>
		<PrismPlus
			codeString={imageRemotePatterns}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>hostname</strong> : supports
				wildcards: <code>"*.example.com"</code> matches{' '}
				<code>cdn.example.com</code>, etc.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>pathname</strong> : supports glob
				prefixes: <code>"/photos/**"</code> matches any path starting
				with <code>/photos/</code>.
			</li>
		</ul>
	</section>
);
