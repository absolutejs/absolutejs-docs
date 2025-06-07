import {
	serverCode,
	treatyCode,
	frontendCode,
	databaseCode
} from '../../data/edenCode';
import { featureCard } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';
import { PrismPlus } from '../utils/PrismPlus';

export const TypeSafeArticle = () => (
	<article style={featureCard}>
		<h2 style={headingStyle}>Type Safe All Around</h2>
		<p style={paragraphStyle}>
			Maximize the power of TypeScript with AbsoluteJS. From the database,
			to the backend, to the frontend, everything is type safe.
		</p>
		<PrismPlus codeString={databaseCode} language="typescript" />
		<PrismPlus codeString={serverCode} language="typescript" />
		<PrismPlus codeString={treatyCode} language="typescript" />
		<PrismPlus codeString={frontendCode} language="tsx" />
	</article>
);
