import { ThemeSprings } from '../../../../../types/springTypes';
import { EslintDocsSection } from '../../../../data/documentation/eslintDocsData';
import { useTabSprings } from '../../../../hooks/springs/useTabSprings';
import {
	sectionStyle,
	paragraphSpacedStyle
} from '../../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../../styles/gradientStyles';
import { AnchorHeading } from '../../../utils/AnchorHeading';
import { CodeSlider } from '../../../home/CodeSlider';
import { PrismPlus } from '../../../utils/PrismPlus';

type EslintSectionProps = {
	section: EslintDocsSection;
	themeSprings: ThemeSprings;
};

export const EslintSection = ({
	section,
	themeSprings
}: EslintSectionProps) => {
	const { handleTabClick, currentTab, sliderSprings } = useTabSprings(2);

	return (
		<section style={sectionStyle}>
			<AnchorHeading
				level="h2"
				id={section.href.replace('#', '')}
				style={gradientHeadingStyle(themeSprings)}
				themeSprings={themeSprings}
			>
				{section.title}
			</AnchorHeading>
			<p style={paragraphSpacedStyle}>{section.description}</p>
			<CodeSlider
				handleTabClick={handleTabClick}
				sliderSprings={sliderSprings}
				tabs={['Before', 'After']}
				themeSprings={themeSprings}
			/>
			<PrismPlus
				codeString={
					currentTab === 0 ? section.beforeCode : section.afterCode
				}
				language="typescript"
				showLineNumbers={true}
				themeSprings={themeSprings}
			/>
		</section>
	);
};
