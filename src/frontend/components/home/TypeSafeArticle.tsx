import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../types/springTypes';
import { typeArticleData } from '../../data/typeArticleData';
import { useTabSprings } from '../../hooks/springs/useTabSprings';
import {
	sectionStyle,
	sectionSubtitleStyle,
	sectionTitleStyle,
	showcaseCardStyle
} from '../../styles/homeStyles';
import { PrismPlus } from '../utils/PrismPlus';
import { CodeSlider } from './CodeSlider';

export const TypeSafeArticle = ({ themeSprings }: ThemeProps) => {
	const { handleTabClick, currentTab, sliderSprings } = useTabSprings(
		typeArticleData.length
	);

	const { codeString, title, description, language } =
		typeArticleData[currentTab] ?? {};

	if (
		codeString === undefined ||
		title === undefined ||
		description === undefined
	) {
		return null;
	}

	return (
		<section style={sectionStyle}>
			<animated.h2 style={sectionTitleStyle(themeSprings)}>
				Type Safe All Around
			</animated.h2>
			<animated.p style={sectionSubtitleStyle(themeSprings)}>
				From database to frontend — your data stays typed
			</animated.p>
			<animated.div style={showcaseCardStyle(themeSprings)}>
				<CodeSlider
					handleTabClick={handleTabClick}
					sliderSprings={sliderSprings}
					tabs={typeArticleData.map((item) => item.title)}
					themeSprings={themeSprings}
				/>
				<PrismPlus
					themeSprings={themeSprings}
					codeString={codeString}
					language={language}
				/>
				<animated.p
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: '0.95rem',
						lineHeight: 1.6,
						marginTop: '1rem',
						textAlign: 'center'
					}}
				>
					{description}
				</animated.p>
			</animated.div>
		</section>
	);
};
