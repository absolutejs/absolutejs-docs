import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../types/springTypes';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { paragraphSpacedStyle, strongStyle } from '../../../styles/docsStyles';
import { featureCardStyle } from '../../../styles/gradientStyles';

type EmbeddedFeature = {
	description: string;
	title: string;
};

const features: EmbeddedFeature[] = [
	{
		description:
			'All pages are pre-rendered at compile time and embedded as static HTML that hydrates on the client.',
		title: 'Pre-rendered Pages'
	},
	{
		description:
			'JavaScript bundles for React, Svelte, Vue, Angular, and HTML: all framework client code.',
		title: 'Client Bundles'
	},
	{
		description:
			'Worker scripts are embedded and served from Bun\u2019s virtual filesystem. Workers load and execute normally.',
		title: 'Web Workers'
	},
	{
		description:
			'CSS, images, SVGs, fonts, favicons: every asset is embedded with correct MIME types and cache headers.',
		title: 'Static Assets'
	}
];

export const CompileEmbeddedGrid = ({ themeSprings }: ThemeProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'grid',
				gap: '1rem',
				gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
				marginBottom: '1.5rem',
				marginTop: '1.5rem'
			}}
		>
			{features.map((feature) => (
				<animated.div
					key={feature.title}
					style={featureCardStyle(themeSprings)}
				>
					<p
						style={{
							...paragraphSpacedStyle,
							marginBottom: '0.5rem'
						}}
					>
						<strong style={strongStyle}>{feature.title}</strong>
					</p>
					<p
						style={{
							fontSize: '0.95rem',
							lineHeight: 1.6
						}}
					>
						{feature.description}
					</p>
				</animated.div>
			))}
		</div>
	);
};
