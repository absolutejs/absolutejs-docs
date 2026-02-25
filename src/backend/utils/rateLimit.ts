type WindowEntry = {
	count: number;
	windowStart: number;
};

const windows = new Map<string, WindowEntry>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 60;
const CLEANUP_INTERVAL_MS = 300_000;

setInterval(() => {
	const now = Date.now();
	for (const [key, entry] of windows) {
		if (now - entry.windowStart > WINDOW_MS) {
			windows.delete(key);
		}
	}
}, CLEANUP_INTERVAL_MS);

export const isRateLimited = (ip: string) => {
	const now = Date.now();
	const entry = windows.get(ip);

	if (!entry || now - entry.windowStart > WINDOW_MS) {
		windows.set(ip, { count: 1, windowStart: now });
		return false;
	}

	entry.count++;
	return entry.count > MAX_REQUESTS;
};
