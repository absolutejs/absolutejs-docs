import { animated } from '@react-spring/web';
import {
	prism,
	nightOwl
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ThemeProps } from '../../../types/types';
import { typeArticleData } from '../../data/typeArticleData';
import { useTabSprings } from '../../hooks/useTabSprings';
import { useThemeStore } from '../../hooks/useThemeStore';
import { featureCard } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';
import { PrismPlus } from '../utils/PrismPlus';

export const TypeSafeArticle = ({ themeSprings }: ThemeProps) => {
	const theme = useThemeStore((state) => state.theme);
	const prismTheme = theme === 'light' ? prism : nightOwl;
	const { handleTabClick, currentTab, sliderSprings } = useTabSprings(
		typeArticleData.length
	);

	const { codeString, title, description } =
		typeArticleData[currentTab] ?? {};

	if (
		codeString === undefined ||
		title === undefined ||
		description === undefined
	) {
		return null;
	}

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
				codeString={codeString}
				language="typescript"
				codeStyle={prismTheme}
			/>
		</animated.article>
	);
};
