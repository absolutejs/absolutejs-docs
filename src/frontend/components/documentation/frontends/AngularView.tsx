import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { AnchorHeading } from '../../utils/AnchorHeading';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';

export const AngularView = ({
	currentPageId,
	onNavigate,
	themeSprings
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				minHeight: 0,
				overflowX: 'hidden',
				overflowY: 'scroll',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style} id="angular">
						Angular
					</h1>
					<p style={paragraphLargeStyle}>
						Angular support is coming soon to AbsoluteJS.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="coming-soon"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Coming Soon
					</AnchorHeading>
					<p style={paragraphLargeStyle}>
						We&apos;re actively working on Angular SSR support.
						Angular will use platform-server utilities for
						server-side rendering with the same type-safe props
						pattern as React, Svelte, and Vue.
					</p>
					<p style={{ ...paragraphLargeStyle, marginTop: '1rem' }}>
						Expected features:
					</p>
					<ul
						style={{
							fontSize: '1.0625rem',
							lineHeight: 1.7,
							listStyleType: 'disc',
							marginTop: '1rem',
							paddingLeft: '2rem'
						}}
					>
						<li style={{ marginBottom: '0.5rem' }}>
							handleAngularPageRequest for SSR
						</li>
						<li style={{ marginBottom: '0.5rem' }}>
							Type-safe props via @Input decorators
						</li>
						<li style={{ marginBottom: '0.5rem' }}>
							Automatic hydration
						</li>
						<li style={{ marginBottom: '0.5rem' }}>
							Zone.js integration
						</li>
					</ul>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>
		</div>
	);
};
