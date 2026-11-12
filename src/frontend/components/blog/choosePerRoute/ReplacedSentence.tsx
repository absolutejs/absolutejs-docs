import { Fragment, useEffect, useState } from 'react';

const STEP_MS = 2000;

const replaced = [
	'BullMQ',
	'ioredis',
	'Upstash Redis',
	'two-second polling',
	'a hand-written API client',
	'Swagger',
	'Sentry',
	'a raw Twilio service'
];

const separatorFor = (index: number) => {
	if (index === replaced.length - 1) return '.';
	if (index === replaced.length - 2) return ' and ';

	return ', ';
};

// With reduced motion, every name stays in full ink instead of cycling.
export const ReplacedSentence = () => {
	const [lit, setLit] = useState<number | 'all'>(0);

	useEffect(() => {
		const reduceMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches;
		if (reduceMotion) {
			setLit('all');

			return undefined;
		}

		const timer = window.setInterval(
			() =>
				setLit((current) =>
					current === 'all' ? 0 : (current + 1) % replaced.length
				),
			STEP_MS
		);

		return () => window.clearInterval(timer);
	}, []);

	return (
		<p className="cpr-replaced">
			<b>Before its first deploy, it dropped </b>
			{replaced.map((name, index) => (
				<Fragment key={name}>
					<span data-lit={lit === 'all' || lit === index}>
						{name}
					</span>
					{separatorFor(index)}
				</Fragment>
			))}
		</p>
	);
};
