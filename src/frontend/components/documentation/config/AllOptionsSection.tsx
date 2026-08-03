import { ThemeProps } from '../../../../types/springTypes';
import { imageConfigFull } from '../../../data/documentation/imageOptDocsCode';
import { sectionStyle } from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DefinitionGrid } from '../../utils/DefinitionGrid';
import { PrismPlus } from '../../utils/PrismPlus';

export const AllOptionsSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="all-options"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			All Options
		</AnchorHeading>
		<PrismPlus
			codeString={imageConfigFull}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
		<DefinitionGrid
			items={[
				{
					description: (
						<>
							breakpoints for device-width responsive images.
							Default:{' '}
							<code>
								[640, 750, 828, 1080, 1200, 1920, 2048, 3840]
							</code>
						</>
					),
					term: 'deviceSizes'
				},
				{
					description: (
						<>
							breakpoints for fixed-width images. Default:{' '}
							<code>[16, 32, 48, 64, 96, 128, 256, 384]</code>
						</>
					),
					term: 'imageSizes'
				},
				{
					description: (
						<>
							output formats in preference order. Default:{' '}
							<code>["webp"]</code>. Add <code>"avif"</code> for
							smaller files at slower encode speed.
						</>
					),
					term: 'formats'
				},
				{
					description: (
						<>
							cache duration in seconds. Default: <code>60</code>.
						</>
					),
					term: 'minimumCacheTTL'
				},
				{
					description: (
						<>
							default quality 1-100. Default: <code>75</code>.
						</>
					),
					term: 'quality'
				},
				{
					description: 'allowed remote image origins for security.',
					term: 'remotePatterns'
				},
				{
					description: (
						<>
							custom endpoint path. Default:{' '}
							<code>"/_absolute/image"</code>.
						</>
					),
					term: 'path'
				},
				{
					description:
						'globally disable optimization. Images served as-is.',
					term: 'unoptimized'
				}
			]}
			themeSprings={themeSprings}
		/>
	</section>
);
