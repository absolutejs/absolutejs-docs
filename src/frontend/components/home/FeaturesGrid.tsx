import { animated } from '@react-spring/web';
import {
	FaBolt,
	FaCode,
	FaDatabase,
	FaLock,
	FaPalette,
	FaShieldAlt
} from 'react-icons/fa';
import { ThemeProps } from '../../../types/springTypes';
import {
	featureCard,
	featureDescStyle,
	featureIconStyle,
	featuresGridStyle,
	featureTitleStyle,
	sectionStyle,
	sectionSubtitleStyle,
	sectionTitleStyle
} from '../../styles/homeStyles';

type Feature = {
	icon: React.ReactNode;
	title: string;
	description: string;
};

const features: Feature[] = [
	{
		icon: <FaCode />,
		title: 'End-to-End Type Safety',
		description:
			'TypeScript from database to frontend. Schemas generate types automatically.'
	},
	{
		icon: <FaBolt />,
		title: 'Blazing Performance',
		description:
			'Built on Bun and Elysia for ultra-fast SSR and minimal overhead.'
	},
	{
		icon: <FaPalette />,
		title: 'Multi-Framework UI',
		description: 'Use React, Vue, Svelte, or HTML. Mix and match per route.'
	},
	{
		icon: <FaDatabase />,
		title: 'Flexible Database',
		description:
			'PostgreSQL, MySQL, SQLite with Drizzle or Prisma adapters.'
	},
	{
		icon: <FaLock />,
		title: 'Built-in Auth',
		description:
			'66+ OAuth providers with PKCE, OpenID, and session management.'
	},
	{
		icon: <FaShieldAlt />,
		title: 'Code Quality',
		description:
			'ESLint + Prettier or Biome with opinionated defaults included.'
	}
];

export const FeaturesGrid = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<animated.h2 style={sectionTitleStyle(themeSprings)}>
			Everything You Need
		</animated.h2>
		<animated.p style={sectionSubtitleStyle(themeSprings)}>
			A complete toolkit for building production-ready applications
		</animated.p>
		<div style={featuresGridStyle}>
			{features.map((feature, index) => (
				<animated.div key={index} style={featureCard(themeSprings)}>
					<div style={featureIconStyle}>{feature.icon}</div>
					<animated.h3 style={featureTitleStyle(themeSprings)}>
						{feature.title}
					</animated.h3>
					<animated.p style={featureDescStyle(themeSprings)}>
						{feature.description}
					</animated.p>
				</animated.div>
			))}
		</div>
	</section>
);
