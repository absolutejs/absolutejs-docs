import { ThemeProps } from '../../../../types/springTypes';
import { paragraphSpacedStyle, sectionStyle } from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DefinitionGrid } from '../../utils/DefinitionGrid';

export const CachingSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="caching"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Caching
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			Optimized images are cached to disk at{' '}
			<code>{'{buildDir}/.cache/images/'}</code>. Each entry is keyed by a
			SHA-256 hash of the URL, width, quality, and format. Cache files
			persist across server restarts.
		</p>
		<DefinitionGrid
			items={[
				{
					description: (
						<>
							each cached image gets a unique ETag. Browsers send{' '}
							<code>If-None-Match</code> on subsequent requests
							and get 304 Not Modified.
						</>
					),
					term: 'ETag'
				},
				{
					description: (
						<>
							set via <code>minimumCacheTTL</code> (seconds).
							After expiry, the next request regenerates the
							image.
						</>
					),
					term: 'TTL'
				},
				{
					description: (
						<>
							responses include{' '}
							<code>
								public, max-age={'<TTL>'}, must-revalidate
							</code>
							.
						</>
					),
					term: 'Cache-Control'
				}
			]}
			themeSprings={themeSprings}
		/>
	</section>
);
