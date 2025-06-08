import {
	prism,
	nightOwl
} from 'react-syntax-highlighter/dist/esm/styles/prism';
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

export const TypeSafeArticle = () => {
	const theme = useThemeStore((state) => state.theme);
	console.log('TypeSafeArticle theme:', theme);
	const prismTheme = theme === 'light' ? prism : nightOwl;

	return (
		<article style={featureCard}>
			<h2 style={headingStyle}>Type Safe All Around</h2>
			<p style={paragraphStyle}>
				Maximize the power of TypeScript with AbsoluteJS. From the
				database, to the backend, to the frontend, you can be confident
				in the shape of your data.
			</p>
			<PrismPlus
				codeString={databaseCode}
				language="typescript"
				codeStyle={prismTheme}
			/>
			<PrismPlus
				codeString={serverCode}
				language="typescript"
				codeStyle={prismTheme}
			/>
			<PrismPlus
				codeString={treatyCode}
				language="typescript"
				codeStyle={prismTheme}
			/>
			<PrismPlus
				codeString={frontendCode}
				language="tsx"
				codeStyle={prismTheme}
			/>
		</article>
	);
};
