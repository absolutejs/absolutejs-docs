import { serverCode, treatyCode, frontendCode } from '../../data/edenCode';
import { featureCard, codeBlock } from '../../styles/homeStyles';
import { headingStyle, paragraphStyle } from '../../styles/styles';

export const TypeSafeArticle = () => (
	<article style={featureCard}>
		<h2 style={headingStyle}>Type Safe All Around</h2>
		<p style={paragraphStyle}>
			Maximize the power of TypeScript with AbsoluteJS. From the database,
			to the backend, to the frontend, everything is type safe.
		</p>
		<pre style={codeBlock}>{serverCode}</pre>
		<pre style={codeBlock}>{treatyCode}</pre>
		<pre style={codeBlock}>{frontendCode}</pre>
	</article>
);
