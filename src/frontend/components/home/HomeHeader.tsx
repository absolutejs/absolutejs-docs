import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../types/springTypes';
import { heroSubtitleStyle, heroTitleStyle } from '../../styles/homeStyles';

export const HomeHeader = ({ themeSprings }: ThemeProps) => (
	<section
		style={{
			alignItems: 'center',
			display: 'flex',
			flexDirection: 'column',
			textAlign: 'center'
		}}
	>
		<animated.h1 style={heroTitleStyle(themeSprings)}>
			Build Fullstack Apps
			<br />
			<span
				style={{
					background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent'
				}}
			>
				Blazingly Fast
			</span>
		</animated.h1>
		<animated.p style={heroSubtitleStyle(themeSprings)}>
			The complete TypeScript framework for modern web development. UI,
			database, auth, and tooling — all in one.
		</animated.p>
	</section>
);
