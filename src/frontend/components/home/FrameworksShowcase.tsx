import { animated } from '@react-spring/web';
import { ReactNode } from 'react';
import { FaAngular, FaHtml5, FaReact, FaVuejs } from 'react-icons/fa';
import { SiHtmx, SiSvelte } from 'react-icons/si';
import { ThemeProps } from '../../../types/springTypes';
import {
	sectionStyle,
	sectionSubtitleStyle,
	sectionTitleStyle
} from '../../styles/homeStyles';

type Framework = {
	name: string;
	icon: ReactNode;
	color: string;
	href: string;
	status?: string;
};

const frameworks: Framework[] = [
	{
		color: '#61DAFB',
		href: '/documentation/react',
		icon: <FaReact />,
		name: 'React'
	},
	{
		color: '#4FC08D',
		href: '/documentation/vue',
		icon: <FaVuejs />,
		name: 'Vue'
	},
	{
		color: '#FF3E00',
		href: '/documentation/svelte',
		icon: <SiSvelte />,
		name: 'Svelte'
	},
	{
		color: '#E34F26',
		href: '/documentation/html',
		icon: <FaHtml5 />,
		name: 'HTML'
	},
	{
		color: '#3D72D7',
		href: '/documentation/htmx',
		icon: <SiHtmx />,
		name: 'HTMX'
	},
	{
		color: '#DD0031',
		href: '/documentation/angular',
		icon: <FaAngular />,
		name: 'Angular'
	}
];

const CARD_SIZE = '130px';

export const FrameworksShowcase = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<animated.h2 style={sectionTitleStyle(themeSprings)}>
			One Server, Any Framework
		</animated.h2>
		<animated.p style={sectionSubtitleStyle(themeSprings)}>
			Use React, Angular, Vue, Svelte, HTML, or HTMX: mix and match per
			route
			<br />
			Zero build configuration required
		</animated.p>

		<div
			style={{
				display: 'grid',
				gap: '1.25rem',
				gridTemplateColumns: 'repeat(3, 130px)',
				justifyContent: 'center',
				padding: '1rem',
				width: '100%'
			}}
		>
			{frameworks.map((framework, index) => (
				<animated.a
					href={framework.href}
					key={index}
					style={{
						alignItems: 'center',
						backdropFilter: 'blur(12px)',
						background: themeSprings.theme.to((t) =>
							t.endsWith('dark')
								? 'rgba(255, 255, 255, 0.04)'
								: 'rgba(255, 255, 255, 0.6)'
						),
						border: '1px solid rgba(99, 102, 241, 0.1)',
						borderRadius: '16px',
						display: 'flex',
						flexDirection: 'column',
						gap: '0.25rem',
						height: CARD_SIZE,
						justifyContent: 'center',
						position: 'relative',
						textDecoration: 'none',
						width: CARD_SIZE
					}}
				>
					{framework.status && (
						<span
							style={{
								background:
									'linear-gradient(135deg, #6366f1, #8b5cf6)',
								borderRadius: '8px',
								color: '#fff',
								fontSize: '0.65rem',
								fontWeight: 600,
								padding: '3px 8px',
								position: 'absolute',
								right: '-6px',
								top: '-6px'
							}}
						>
							{framework.status}
						</span>
					)}
					<span
						style={{
							color: framework.color,
							fontSize: '2.75rem'
						}}
					>
						{framework.icon}
					</span>
					<animated.span
						style={{
							color: themeSprings.contrastPrimary,
							fontSize: '0.95rem',
							fontWeight: 500
						}}
					>
						{framework.name}
					</animated.span>
				</animated.a>
			))}
		</div>

		<animated.p
			style={{
				color: themeSprings.contrastSecondary,
				fontSize: '0.95rem',
				marginTop: '2rem',
				maxWidth: '600px',
				textAlign: 'center'
			}}
		>
			Build your landing page with React, your dashboard with Vue, and
			your admin panel with HTMX: all served from the same Elysia server.
		</animated.p>
	</section>
);
