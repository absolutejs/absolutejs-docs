export const isNonEmptyString = (
	str: string | null | undefined
): str is string => str !== null && str !== undefined && str.trim() !== '';

export const isObject = (x: unknown): x is Record<string, unknown> =>
	typeof x === 'object' && x !== null;
