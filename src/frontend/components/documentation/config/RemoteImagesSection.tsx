import { ThemeProps } from '../../../../types/springTypes';
import { imageRemotePatterns } from '../../../data/documentation/imageOptDocsCode';
import { paragraphSpacedStyle, sectionStyle } from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DefinitionGrid } from '../../utils/DefinitionGrid';
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
		<DefinitionGrid
			items={[
				{
					description: (
						<>
							supports wildcards: <code>"*.example.com"</code>{' '}
							matches <code>cdn.example.com</code>, etc.
						</>
					),
					term: 'hostname'
				},
				{
					description: (
						<>
							supports glob prefixes: <code>"/photos/**"</code>{' '}
							matches any path starting with <code>/photos/</code>
							.
						</>
					),
					term: 'pathname'
				}
			]}
			themeSprings={themeSprings}
		/>
	</section>
);
