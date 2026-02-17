import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../types/springTypes';
import {
	heroStyle,
	navStyle,
	primaryButtonStyle,
	secondaryButtonStyle
} from '../../styles/homeStyles';
import { CreateButton } from './CreateButton';
import { HomeHeader } from './HomeHeader';

export const CommandSection = ({ themeSprings }: ThemeProps) => (
	<section style={heroStyle}>
		<HomeHeader themeSprings={themeSprings} />
		<CreateButton themeSprings={themeSprings} />
		<nav style={navStyle}>
			<a href="/documentation" style={primaryButtonStyle}>
				Get Started
			</a>
			<animated.a
				href="/documentation/overview"
				style={secondaryButtonStyle(themeSprings)}
			>
				Documentation
			</animated.a>
		</nav>
	</section>
);
