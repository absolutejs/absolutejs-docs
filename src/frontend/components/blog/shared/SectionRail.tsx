import { useEffect, useState } from 'react';

export type ArticleSection = { id: string; title: string };

type SectionRailProps = {
	sections: ArticleSection[];
	// Full-width figures pass through the rail's area; the rail steps aside
	// while one matching this selector is there.
	wideFigures: string;
};

// A section counts as current while it crosses this band near the top of
// the viewport. Outside every section (the opening, the close) the rail hides.
const CURRENT_BAND = '-30% 0px -65% 0px';
// The rail is fixed at 140px from the top and about 320px tall.
const RAIL_TOP_PX = 130;
const RAIL_BOTTOM_PX = 470;

const observeCurrentSection = (
	sections: ArticleSection[],
	onChange: (id: string | null) => void
) => {
	const intersecting = new Set<string>();
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) intersecting.add(entry.target.id);
				else intersecting.delete(entry.target.id);
			}
			const current = sections.find((section) =>
				intersecting.has(section.id)
			);
			onChange(current?.id ?? null);
		},
		{ rootMargin: CURRENT_BAND }
	);
	for (const section of sections) {
		const element = document.getElementById(section.id);
		if (element !== null) observer.observe(element);
	}

	return observer;
};

const observeWideFigures = (
	selector: string,
	onChange: (overlapping: boolean) => void
) => {
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
	for (const element of document.querySelectorAll(selector)) {
		observer.observe(element);
	}

	return observer;
};

export const SectionRail = ({ sections, wideFigures }: SectionRailProps) => {
	const [activeId, setActiveId] = useState<string | null>(null);
	const [figureInTheWay, setFigureInTheWay] = useState(false);

	useEffect(() => {
		const sectionObserver = observeCurrentSection(sections, setActiveId);
		const figureObserver = observeWideFigures(
			wideFigures,
			setFigureInTheWay
		);

		return () => {
			sectionObserver.disconnect();
			figureObserver.disconnect();
		};
	}, [sections, wideFigures]);

	return (
		<nav
			aria-label="Sections"
			className="post-rail"
			data-visible={activeId !== null && !figureInTheWay}
		>
			<ol>
				{sections.map((section) => (
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
