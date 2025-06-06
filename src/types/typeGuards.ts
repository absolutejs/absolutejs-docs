export const isNonEmptyString = (
	str: string | null | undefined
): str is string => str !== null && str !== undefined && str.trim() !== '';

export const isObject = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null;
