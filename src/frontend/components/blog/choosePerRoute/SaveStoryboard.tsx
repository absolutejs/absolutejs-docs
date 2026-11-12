import { useEffect, useRef, useState, type ReactNode } from 'react';
import { frameworkColor } from './frameworks';

type SaveStep = {
	color: string;
	count: number;
	detail: ReactNode;
	kept: boolean;
	name: string;
	path: string;
	state: string;
};

const steps: SaveStep[] = [
	{
		color: 'var(--fw-react)',
		count: 7,
		detail: (
			<>
				Fast Refresh keeps component state. That needs a patched Bun
				build, because stock Bun ignores the Fast Refresh option in its
				transpiler (
				<a
					href="https://github.com/oven-sh/bun/issues/32919"
					rel="noreferrer"
					target="_blank"
				>
					oven-sh/bun#32919
				</a>
				). <code>absolute bun-patch install</code> installs it, with
				signature checks, and <code>absolute dev</code> picks it up. On
				stock Bun, React edits remount and you lose local state.
			</>
		),
		kept: true,
		name: 'React',
		path: '/react',
		state: 'State kept'
	},
	{
		color: 'var(--fw-svelte)',
		count: 7,
		detail: 'Svelte uses its own native HMR runtime and keeps component state.',
		kept: true,
		name: 'Svelte',
		path: '/svelte',
		state: 'State kept'
	},
	{
		color: 'var(--fw-vue)',
		count: 7,
		detail: 'Vue uses its own native HMR runtime and carries setup state across the edit.',
		kept: true,
		name: 'Vue',
		path: '/vue',
		state: 'State kept'
	},
	{
		color: 'var(--fw-angular)',
		count: 0,
		detail: (
			<>
				Angular swaps the component in place. Its state resets unless
				you opt in with <code>preserveAcrossHmr</code>, and if it has to
				fall back to a full reboot, a toast tells you why.
			</>
		),
		kept: false,
		name: 'Angular',
		path: '/angular',
		state: 'Opt in'
	},
	{
		color: 'var(--fw-htmx)',
		count: 7,
		detail: 'HTML and HTMX pages are patched by diffing the DOM, so form input, scroll position and event listeners stay put.',
		kept: true,
		name: 'HTML and HTMX',
		path: '/htmx',
		state: 'DOM kept'
	},
	{
		color: 'var(--fw-server)',
		count: 7,
		detail: 'Server code updates in place, per top-level statement. The process, the port, open requests, WebSockets, database pools and queues all carry across the edit. More on this below.',
		kept: true,
		name: 'Server code',
		path: 'server.ts',
		state: 'Process kept'
	}
];

const ACTIVE_BAND = '-45% 0px -45% 0px';

export const SaveStoryboard = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const index = stepRefs.current.indexOf(
						entry.target instanceof HTMLLIElement
							? entry.target
							: null
					);
					if (index >= 0) setActiveIndex(index);
				}
			},
			{ rootMargin: ACTIVE_BAND }
		);
		for (const element of stepRefs.current) {
			if (element !== null) observer.observe(element);
		}

		return () => observer.disconnect();
	}, []);

	const active = steps[activeIndex] ?? steps[0];
	if (active === undefined) return null;

	return (
		<div className="cpr-story">
			<div
				aria-live="polite"
				className="cpr-story-stage"
				style={frameworkColor(active.color)}
			>
				<span className="cpr-story-path">{active.path}</span>
				<span className="cpr-story-count">{active.count}</span>
				<span
					className={`cpr-story-state ${active.kept ? 'is-kept' : 'is-optin'}`}
				>
					{active.name}: {active.state}
				</span>
			</div>
			<ol className="cpr-story-steps">
				{steps.map((step, index) => (
					<li
						data-active={index === activeIndex}
						key={step.name}
						ref={(element) => {
							stepRefs.current[index] = element;
						}}
						style={frameworkColor(step.color)}
					>
						<h3>
							<i className="cpr-dot" />
							{step.name}
						</h3>
						<p>{step.detail}</p>
					</li>
				))}
			</ol>
		</div>
	);
};
