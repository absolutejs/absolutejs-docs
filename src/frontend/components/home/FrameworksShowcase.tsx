import { animated } from '@react-spring/web';
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
	icon: React.ReactNode;
	color: string;
	href: string;
	status?: string;
};

const frameworks: Framework[] = [
	{
		name: 'React',
		icon: <FaReact />,
		color: '#61DAFB',
		href: '/documentation/frameworks/react'
	},
	{
		name: 'Vue',
		icon: <FaVuejs />,
		color: '#4FC08D',
		href: '/documentation/frameworks/vue'
	},
	{
		name: 'Svelte',
		icon: <SiSvelte />,
		color: '#FF3E00',
		href: '/documentation/frameworks/svelte'
	},
	{
		name: 'HTML',
		icon: <FaHtml5 />,
		color: '#E34F26',
		href: '/documentation/frameworks/html'
	},
	{
		name: 'HTMX',
		icon: <SiHtmx />,
		color: '#3D72D7',
		href: '/documentation/frameworks/htmx'
	},
	{
		name: 'Angular',
		icon: <FaAngular />,
		color: '#DD0031',
		href: '/documentation/frameworks/angular',
		status: 'Soon'
	}
];

const CARD_SIZE = '130px';

export const FrameworksShowcase = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<animated.h2 style={sectionTitleStyle(themeSprings)}>
			One Server, Any Framework
		</animated.h2>
		<animated.p style={sectionSubtitleStyle(themeSprings)}>
			Use React, Vue, Svelte, or plain HTML — mix and match per route
			<br />
			Zero build configuration required
		</animated.p>

		<div
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: '1.25rem',
				justifyContent: 'center',
				maxWidth: '900px',
				padding: '1rem'
			}}
		>
			{frameworks.map((framework, index) => (
				<animated.a
					key={index}
					href={framework.href}
					style={{
						alignItems: 'center',
						background: themeSprings.themeTertiary,
						borderRadius: '16px',
						boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
						display: 'flex',
						flexDirection: 'column',
						gap: '0.75rem',
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
			your admin panel with HTMX — all served from the same Elysia server.
		</animated.p>
	</section>
);
