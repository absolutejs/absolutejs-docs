import { animated } from '@react-spring/web';
import {
	prism,
	nightOwl
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ThemeProps } from '../../../types/types';
import {
	serverCode,
	treatyCode,
	frontendCode,
	databaseCode
} from '../../data/edenCode';
import { useThemeStore } from '../../hooks/useThemeStore';
import { featureCard } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';
import { PrismPlus } from '../utils/PrismPlus';

export const TypeSafeArticle = ({ themeSprings }: ThemeProps) => {
	const theme = useThemeStore((state) => state.theme);
	const prismTheme = theme === 'light' ? prism : nightOwl;

	return (
		<animated.article style={featureCard(themeSprings)}>
			<animated.h2 style={headingStyle(themeSprings)}>
				Type Safe All Around
			</animated.h2>
			<animated.p style={paragraphStyle(themeSprings)}>
				Maximize the power of TypeScript with AbsoluteJS. From the
				database, to the backend, to the frontend, you can be confident
				in the shape of your data.
			</animated.p>
			<PrismPlus
				themeSprings={themeSprings}
				codeString={databaseCode}
				language="typescript"
				codeStyle={prismTheme}
			/>
			<PrismPlus
				themeSprings={themeSprings}
				codeString={serverCode}
				language="typescript"
				codeStyle={prismTheme}
			/>
			<PrismPlus
				themeSprings={themeSprings}
				codeString={treatyCode}
				language="typescript"
				codeStyle={prismTheme}
			/>
			<PrismPlus
				themeSprings={themeSprings}
				codeString={frontendCode}
				language="tsx"
				codeStyle={prismTheme}
			/>
		</animated.article>
	);
};
