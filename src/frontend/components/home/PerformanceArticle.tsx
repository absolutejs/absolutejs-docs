import { animated } from '@react-spring/web';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { ThemeProps } from '../../../types/springTypes';
import { sectionStyle } from '../../styles/homeStyles';

export const PerformanceArticle = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<animated.div
			style={{
				alignItems: 'center',
				background: themeSprings.themeTertiary,
				border: '1px solid rgba(128, 128, 128, 0.12)',
				borderRadius: '24px',
				boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
				display: 'flex',
				flexDirection: 'column',
				gap: '2rem',
				maxWidth: '1200px',
				overflow: 'hidden',
				padding: '3rem 2rem',
				position: 'relative',
				width: '100%'
			}}
		>
			<div
				style={{
					background:
						'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
					borderRadius: '24px',
					height: '100%',
					left: 0,
					position: 'absolute',
					top: 0,
					width: '100%'
				}}
			/>

			<div
				style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}
			>
				<animated.h2
					style={{
						color: themeSprings.contrastPrimary,
						fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
						fontWeight: 700,
						marginBottom: '0.75rem'
					}}
				>
					Powered by the Best
				</animated.h2>
				<animated.p
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: '1.1rem'
					}}
				>
					Built on the fastest JavaScript runtime and framework
				</animated.p>
			</div>

			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '1.5rem',
					justifyContent: 'center',
					position: 'relative',
					zIndex: 1
				}}
			>
				<a
					href="https://bun.sh"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						alignItems: 'center',
						background: 'linear-gradient(135deg, #fbf0df, #f8e4c4)',
						borderRadius: '16px',
						boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
						color: '#14110f',
						display: 'flex',
						fontSize: '1.1rem',
						fontWeight: 600,
						gap: '0.75rem',
						padding: '1.25rem 2rem',
						textDecoration: 'none',
						transition: 'transform 0.2s ease, box-shadow 0.2s ease'
					}}
				>
					<img
						src="/assets/svg/bun-logo.svg"
						alt="Bun Logo"
						style={{ height: '2.5rem', width: '2.5rem' }}
					/>
					<span>Bun Runtime</span>
					<FaExternalLinkAlt
						style={{ fontSize: '0.75rem', opacity: 0.6 }}
					/>
				</a>

				<a
					href="https://elysiajs.com"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						alignItems: 'center',
						background: 'linear-gradient(135deg, #e8e3fc, #d4ccf9)',
						borderRadius: '16px',
						boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
						color: '#14110f',
						display: 'flex',
						fontSize: '1.1rem',
						fontWeight: 600,
						gap: '0.75rem',
						padding: '1.25rem 2rem',
						textDecoration: 'none',
						transition: 'transform 0.2s ease, box-shadow 0.2s ease'
					}}
				>
					<img
						src="/assets/svg/elysia.svg"
						alt="Elysia Logo"
						style={{ height: '2.5rem', width: '2.5rem' }}
					/>
					<span>Elysia Framework</span>
					<FaExternalLinkAlt
						style={{ fontSize: '0.75rem', opacity: 0.6 }}
					/>
				</a>
			</div>

			<animated.p
				style={{
					color: themeSprings.contrastSecondary,
					fontSize: '0.9rem',
					maxWidth: '500px',
					position: 'relative',
					textAlign: 'center',
					zIndex: 1
				}}
			>
				Bun's native speed combined with Elysia's zero-overhead design
				delivers unmatched performance for server-side rendering.
			</animated.p>
		</animated.div>
	</section>
);
