import { useRef, useState, type KeyboardEvent } from 'react';
import { chapterFrameworks, frameworkColor } from './frameworks';

// Roving tabindex: only the open tab is in the tab order.
const OUT_OF_TAB_ORDER = -1;

const nextIndex = (key: string, current: number, count: number) => {
	if (key === 'ArrowRight') return (current + 1) % count;
	if (key === 'ArrowLeft') return (current - 1 + count) % count;
	if (key === 'Home') return 0;
	if (key === 'End') return count - 1;

	return null;
};

// The hero: each framework is one of its own files, stacked like folders.
// The open tab's front sheet says what that framework gains here and links
// to its chapter. Rendered open on React, so it reads without JavaScript.
export const FolderStack = () => {
	const [active, setActive] = useState(0);
	const tabs = useRef<(HTMLButtonElement | null)[]>([]);

	const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		const target = nextIndex(event.key, active, chapterFrameworks.length);
		if (target === null) return;
		event.preventDefault();
		setActive(target);
		tabs.current[target]?.focus();
	};

	const framework = chapterFrameworks[active] ?? chapterFrameworks[0];
	if (framework === undefined) return null;

	return (
		<div className="kyf-folders" style={frameworkColor(framework.color)}>
			<div
				aria-label="Frameworks"
				className="kyf-folder-tabs"
				onKeyDown={onKeyDown}
				role="tablist"
			>
				{chapterFrameworks.map((item, index) => (
					<button
						aria-controls="kyf-folder-sheet"
						aria-selected={index === active}
						className="kyf-tab"
						id={`kyf-folder-tab-${item.key}`}
						key={item.key}
						onClick={() => setActive(index)}
						ref={(element) => {
							tabs.current[index] = element;
						}}
						role="tab"
						style={frameworkColor(item.color)}
						tabIndex={index === active ? 0 : OUT_OF_TAB_ORDER}
						type="button"
					>
						{item.file}
					</button>
				))}
			</div>
			<div
				aria-labelledby={`kyf-folder-tab-${framework.key}`}
				className="kyf-folder-sheet"
				id="kyf-folder-sheet"
				role="tabpanel"
			>
				<p className="kyf-folder-name">{framework.name}</p>
				<p className="kyf-folder-gain">{framework.gain}</p>
				<a href={`#${framework.chapterId}`}>
					Read the {framework.name} chapter ↓
				</a>
			</div>
		</div>
	);
};
