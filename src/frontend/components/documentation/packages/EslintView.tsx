import { animated } from "@react-spring/web";
import { ThemeProps, ThemeSprings } from "../../../../types/springTypes";
import { eslintDocsData, EslintDocsSection } from "../../../data/documentation/eslintDocsData";
import { useTabSprings } from "../../../hooks/springs/useTabSprings";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import * as styles from "../../../styles/docsStyles";
import { CodeSlider } from "../../home/CodeSlider";
import { PrismPlus } from "../../utils/PrismPlus";
import { TableOfContents, TocItem } from "../../utils/TableOfContents";

const tocItems: TocItem[] = eslintDocsData.map((section) => ({
	href: section.href,
	label: section.title.replace("absolute/", "")
}));

interface EslintDocsSectionProps {
	section: EslintDocsSection;
	themeSprings: ThemeSprings;
}

const EslintDocsSection = ({ section, themeSprings }: EslintDocsSectionProps) => {
	const { handleTabClick, currentTab, sliderSprings } = useTabSprings(2);

	return (
		<section style={styles.sectionStyle}>
			<animated.h2 style={styles.headingStyle(themeSprings)} id={section.href.replace("#", "")}>
				{section.title}
			</animated.h2>
			<p style={styles.paragraphStyle}>
				{section.description}
			</p>
			<CodeSlider
				handleTabClick={handleTabClick}
				sliderSprings={sliderSprings}
				tabs={["Before", "After"]}
				themeSprings={themeSprings}
			/>
			<PrismPlus
				codeString={currentTab === 0 ? section.beforeCode : section.afterCode}
				language="typescript"
				showLineNumbers={false}
				themeSprings={themeSprings}
			/>
		</section>
	)
}

export const EslintView = ({ themeSprings }: ThemeProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: "flex", flex: 1, overflowX: "hidden", overflowY: "auto", position: "relative"
			}}
		>
			<div style={styles.mainContentStyle}>
				<h1 style={styles.h1Style}>
					ESLint
				</h1>
				<p style={styles.paragraphLargeStyle}>
					ESLint is a static code analysis tool for identifying and fixing
					problems in JavaScript code. It helps maintain code quality and
					consistency by enforcing coding standards and best practices.
				</p>

				{eslintDocsData.map((section) => (
					<EslintDocsSection
						key={section.href}
						section={section}
						themeSprings={themeSprings}
					/>
				))}
			</div>

			{!isMobile && <TableOfContents items={tocItems} themeSprings={themeSprings} />}
		</div>
	);
}