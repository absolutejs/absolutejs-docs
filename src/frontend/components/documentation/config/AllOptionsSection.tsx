import { ThemeProps } from '../../../../types/springTypes';
import { imageConfigFull } from '../../../data/documentation/imageOptDocsCode';
import {
	listItemStyle,
	listStyle,
	sectionStyle,
	strongStyle
} from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
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
		<ul style={listStyle}>
			<li style={listItemStyle}>
				<strong style={strongStyle}>deviceSizes</strong> : breakpoints
				for device-width responsive images. Default:{' '}
				<code>[640, 750, 828, 1080, 1200, 1920, 2048, 3840]</code>
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>imageSizes</strong> : breakpoints
				for fixed-width images. Default:{' '}
				<code>[16, 32, 48, 64, 96, 128, 256, 384]</code>
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>formats</strong> : output formats in
				preference order. Default: <code>["webp"]</code>. Add{' '}
				<code>"avif"</code> for smaller files at slower encode speed.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>minimumCacheTTL</strong> : cache
				duration in seconds. Default: <code>60</code>.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>quality</strong> : default quality
				1-100. Default: <code>75</code>.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>remotePatterns</strong> : allowed
				remote image origins for security.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>path</strong>: custom endpoint path.
				Default: <code>"/_absolute/image"</code>.
			</li>
			<li style={listItemStyle}>
				<strong style={strongStyle}>unoptimized</strong> : globally
				disable optimization. Images served as-is.
			</li>
		</ul>
	</section>
);
