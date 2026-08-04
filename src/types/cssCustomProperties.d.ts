import 'csstype';

// Lets style objects carry CSS custom properties (`--name`) without type
// assertions. This is the augmentation pattern csstype documents.
declare module 'csstype' {
	interface Properties {
		[index: `--${string}`]: string | number;
	}
}
