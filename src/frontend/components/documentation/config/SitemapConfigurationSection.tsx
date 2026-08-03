import { ThemeProps } from '../../../../types/springTypes';
import { sitemapCustomConfig } from '../../../data/documentation/sitemapDocsCode';
import { paragraphSpacedStyle, sectionStyle } from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DefinitionGrid } from '../../utils/DefinitionGrid';
import { PrismPlus } from '../../utils/PrismPlus';

export const SitemapConfigurationSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="configuration"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Configuration
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			Add a <code>sitemap</code> object to your{' '}
			<code>absolute.config.ts</code> to customize the output. All fields
			are optional.
		</p>
		<PrismPlus
			codeString={sitemapCustomConfig}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
		<DefinitionGrid
			items={[
				{
					description:
						'overrides the auto-detected origin. Use this in production when behind a reverse proxy or load balancer where the internal URL differs from the public one.',
					term: 'baseUrl'
				},
				{
					description: (
						<>
							how often pages typically change. Defaults to{' '}
							<code>"weekly"</code>.
						</>
					),
					term: 'defaultChangefreq'
				},
				{
					description: (
						<>
							relative importance of pages on your site (0.0 to
							1.0). Defaults to <code>0.8</code>.
						</>
					),
					term: 'defaultPriority'
				},
				{
					description:
						'per-route settings for changefreq, priority, and lastmod.',
					term: 'overrides'
				}
			]}
			themeSprings={themeSprings}
		/>
	</section>
);
