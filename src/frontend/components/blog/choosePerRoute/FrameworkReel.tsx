import { useEffect, useState } from 'react';
import { frameworkColor, frameworks } from './frameworks';

const STEP_MS = 1800;

// The same counter page, served by one Elysia server at a route per
// framework. The count never changes because props come from the server.
export const FrameworkReel = () => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const reduceMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches;
		if (reduceMotion) return undefined;

		const timer = window.setInterval(
			() => setIndex((current) => (current + 1) % frameworks.length),
			STEP_MS
		);

		return () => window.clearInterval(timer);
	}, []);

	const framework = frameworks[index] ?? frameworks[0];
	if (framework === undefined) return null;

	return (
		<span
			aria-hidden="true"
			className="cpr-reel"
			style={frameworkColor(framework.color)}
		>
			<span className="cpr-reel-bar">
				<i />
				<span>/{framework.key}</span>
			</span>
			<span className="cpr-reel-body">
				<span className="cpr-reel-name">{framework.name}</span>
				<span className="cpr-reel-count">7</span>
			</span>
		</span>
	);
};
