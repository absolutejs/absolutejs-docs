const MAX_FRAMES = 90;

// After switching pages the target heading mounts a few frames later, so
// this waits for it before scrolling, and gives up after about a second
// and a half.
export const scrollToAnchor = (anchor: string, frame = 0) => {
	const target = document.getElementById(anchor);
	if (target) {
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		window.history.replaceState(
			window.history.state,
			'',
			`${window.location.pathname}${window.location.search}#${anchor}`
		);

		return;
	}
	if (frame < MAX_FRAMES)
		requestAnimationFrame(() => scrollToAnchor(anchor, frame + 1));
};
