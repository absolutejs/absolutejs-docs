import { headingStyle, paragraphStyle } from '../../styles/styles';

export const HomeHeader = () => (
	<section
		style={{
			alignItems: 'center',
			display: 'flex',
			flexDirection: 'column',
			textAlign: 'center'
		}}
	>
		<h1 style={headingStyle}>
			The Last Fullstack JavaScript Meta-Framework You'll Ever Need
		</h1>
		<p style={paragraphStyle}>
			AbsoluteJS brings together every aspect of modern web development.
			It covers user interfaces, data handling, code quality, and
			authentication.
		</p>
		<p style={paragraphStyle}>
			Powered by Bun & Elysia, it delivers blazing server side rendered performance and
			full TypeScript support all the way through, so you can focus on building
			great apps instead of configuring tools.
		</p>
	</section>
);
