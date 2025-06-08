import { useState } from 'react';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
	serverCode,
	treatyCode,
	frontendCode,
	databaseCode
} from '../../data/edenCode';
import { featureCard } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';
import { PrismPlus } from '../utils/PrismPlus';

export const TypeSafeArticle = () => {
	const [theme, setTheme] = useState('light');
	const prismTheme = theme === 'light' ? prism : tomorrow;

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
