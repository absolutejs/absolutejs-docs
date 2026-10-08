const MAX_FRAMES = 90;

const scrollWhenMounted = (
	anchor: string,
	previous: HTMLElement | null,
	frame: number
) => {
	const target = document.getElementById(anchor);
	// When leaving a page, an element with the same id on that page is not
	// the target: wait for the new page's element to replace it.
	if (target && target !== previous) {
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		window.history.replaceState(
			window.history.state,
			'',
			`${window.location.pathname}${window.location.search}#${anchor}`
		);

		return;
	}
	if (frame < MAX_FRAMES)
		requestAnimationFrame(() =>
			scrollWhenMounted(anchor, previous, frame + 1)
		);
};

// Scrolls to a heading once it mounts. Pass leavingPage when the caller has
// just navigated to another page, which renders a few frames later; the
// wait gives up after about a second and a half.
export const scrollToAnchor = (anchor: string, leavingPage = false) =>
	scrollWhenMounted(
		anchor,
		leavingPage ? document.getElementById(anchor) : null,
		0
	);
