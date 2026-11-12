import { useEffect, useState } from 'react';
import { articleSections } from './sections';

// A section counts as current while it crosses this band near the top of
// the viewport. Outside every section (the opening, the close) the rail hides.
const CURRENT_BAND = '-30% 0px -65% 0px';
// The rail is fixed at 140px from the top and about 320px tall. Full-width
// figures pass through that area, so the rail steps aside while one does.
const RAIL_TOP_PX = 130;
const RAIL_BOTTOM_PX = 470;
const WIDE_FIGURES = '.cpr-figure, .cpr-story';

const observeCurrentSection = (onChange: (id: string | null) => void) => {
	const intersecting = new Set<string>();
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) intersecting.add(entry.target.id);
				else intersecting.delete(entry.target.id);
			}
			const current = articleSections.find((section) =>
				intersecting.has(section.id)
			);
			onChange(current?.id ?? null);
		},
		{ rootMargin: CURRENT_BAND }
	);
	for (const section of articleSections) {
		const element = document.getElementById(section.id);
		if (element !== null) observer.observe(element);
	}

	return observer;
};

const observeWideFigures = (onChange: (overlapping: boolean) => void) => {
	const overlapping = new Set<Element>();
	const bottomInset = Math.max(0, window.innerHeight - RAIL_BOTTOM_PX);
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) overlapping.add(entry.target);
				else overlapping.delete(entry.target);
			}
			onChange(overlapping.size > 0);
		},
		{ rootMargin: `-${RAIL_TOP_PX}px 0px -${bottomInset}px 0px` }
	);
	for (const element of document.querySelectorAll(WIDE_FIGURES)) {
		observer.observe(element);
	}

	return observer;
};

export const SectionRail = () => {
	const [activeId, setActiveId] = useState<string | null>(null);
	const [figureInTheWay, setFigureInTheWay] = useState(false);

	useEffect(() => {
		const sections = observeCurrentSection(setActiveId);
		const figures = observeWideFigures(setFigureInTheWay);

		return () => {
			sections.disconnect();
			figures.disconnect();
		};
	}, []);

	return (
		<nav
			aria-label="Sections"
			className="cpr-rail"
			data-visible={activeId !== null && !figureInTheWay}
		>
			<ol>
				{articleSections.map((section) => (
					<li key={section.id}>
						<a
							aria-current={
								section.id === activeId ? 'location' : undefined
							}
							href={`#${section.id}`}
						>
							{section.title}
						</a>
					</li>
				))}
			</ol>
		</nav>
	);
};
