import { ThemeProps } from '../../../../types/springTypes';
import { paragraphSpacedStyle, sectionStyle } from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { StepFlow } from '../../utils/StepFlow';

export const HowItWorksSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="how-it-works"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			How It Works
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			AbsoluteJS registers a <code>/_absolute/image</code> endpoint
			automatically when your server starts. When a browser requests an
			optimized image:
		</p>
		<StepFlow
			steps={[
				{
					description: (
						<>
							checks the browser's <code>Accept</code> header to
							determine the best output format (AVIF, WebP, or
							JPEG)
						</>
					),
					title: 'Content negotiation'
				},
				{
					description:
						'checks the disk cache for a previously optimized version with matching URL, width, quality, and format',
					title: 'Cache lookup'
				},
				{
					description:
						'if not cached, loads the source image, auto-rotates based on EXIF, resizes to the requested width (never upscales), and converts to the negotiated format',
					title: 'Sharp optimization'
				},
				{
					description:
						'stores the optimized image to disk with metadata (ETag, TTL, content type)',
					title: 'Cache write'
				},
				{
					description: (
						<>
							serves the image with <code>Cache-Control</code>,{' '}
							<code>ETag</code>, and <code>Vary: Accept</code>{' '}
							headers
						</>
					),
					title: 'Response'
				}
			]}
			themeSprings={themeSprings}
		/>
	</section>
);
