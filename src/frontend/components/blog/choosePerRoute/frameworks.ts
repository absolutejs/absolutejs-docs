import type { CSSProperties } from 'react';

export type FrameworkKey = 'react' | 'svelte' | 'vue' | 'angular' | 'htmx';

export type Framework = {
	color: string;
	key: FrameworkKey;
	name: string;
};

export const frameworks: Framework[] = [
	{ color: 'var(--fw-react)', key: 'react', name: 'React' },
	{ color: 'var(--fw-svelte)', key: 'svelte', name: 'Svelte' },
	{ color: 'var(--fw-vue)', key: 'vue', name: 'Vue' },
	{ color: 'var(--fw-angular)', key: 'angular', name: 'Angular' },
	{ color: 'var(--fw-htmx)', key: 'htmx', name: 'HTMX' }
];

export type FrameworkColorStyle = CSSProperties & { '--fw-color': string };

export const frameworkColor = (color: string): FrameworkColorStyle => ({
	'--fw-color': color
});
