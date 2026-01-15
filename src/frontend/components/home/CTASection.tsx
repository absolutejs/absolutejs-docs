import { CSSProperties } from 'react';
import { FaGithub } from 'react-icons/fa';
import { ThemeProps } from '../../../types/springTypes';
import { sectionStyle } from '../../styles/homeStyles';

const ctaContainerStyle: CSSProperties = {
	alignItems: 'center',
	background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
	borderRadius: '24px',
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem',
	maxWidth: '900px',
	padding: '3rem 2rem',
	textAlign: 'center',
	width: '100%'
};

const ctaTitleStyle: CSSProperties = {
	color: '#fff',
	fontSize: 'clamp(1.5rem, 3vw, 2rem)',
	fontWeight: 700,
	lineHeight: 1.2,
	margin: 0
};

const ctaSubtitleStyle: CSSProperties = {
	color: 'rgba(255, 255, 255, 0.9)',
	fontSize: '1.1rem',
	lineHeight: 1.5,
	margin: 0,
	maxWidth: '500px'
};

const buttonContainerStyle: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	gap: '1rem',
	justifyContent: 'center'
};

const primaryCtaStyle: CSSProperties = {
	alignItems: 'center',
	background: '#fff',
	border: 'none',
	borderRadius: '12px',
	color: '#6366f1',
	display: 'inline-flex',
	fontSize: '1rem',
	fontWeight: 600,
	gap: '0.5rem',
	padding: '0.875rem 1.75rem',
	textDecoration: 'none'
};

const secondaryCtaStyle: CSSProperties = {
	alignItems: 'center',
	background: 'transparent',
	border: '2px solid rgba(255, 255, 255, 0.5)',
	borderRadius: '12px',
	color: '#fff',
	display: 'inline-flex',
	fontSize: '1rem',
	fontWeight: 600,
	gap: '0.5rem',
	padding: '0.875rem 1.75rem',
	textDecoration: 'none'
};

export const CTASection = ({ themeSprings }: ThemeProps) => (
	<section style={{ ...sectionStyle, paddingBottom: '6rem' }}>
		<div style={ctaContainerStyle}>
			<h2 style={ctaTitleStyle}>Ready to Build Something Amazing?</h2>
			<p style={ctaSubtitleStyle}>
				Get started with AbsoluteJS in seconds. Join the community
				building the future of fullstack TypeScript.
			</p>
			<div style={buttonContainerStyle}>
				<a href="/documentation" style={primaryCtaStyle}>
					Get Started
				</a>
				<a
					href="https://github.com/absolutejs/absolute"
					target="_blank"
					rel="noopener noreferrer"
					style={secondaryCtaStyle}
				>
					<FaGithub />
					View on GitHub
				</a>
			</div>
		</div>
	</section>
);
