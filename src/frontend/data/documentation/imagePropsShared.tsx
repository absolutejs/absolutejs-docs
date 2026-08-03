import { DefinitionItem } from '../../components/utils/DefinitionGrid';

export const imageAltItem: DefinitionItem = {
	description: 'alternative text for accessibility (required)',
	term: 'alt'
};

export const imageBlurDataUrlItem: DefinitionItem = {
	description: 'base64 data URL for blur placeholder',
	term: 'blurDataURL'
};

export const imageClassNameItem: DefinitionItem = {
	description: 'CSS class name',
	term: 'className'
};

export const imageFillItem: DefinitionItem = {
	description: 'when true, the image fills its parent container',
	term: 'fill'
};

export const imageHeightItem: DefinitionItem = {
	description: (
		<>
			intrinsic height in pixels. Required unless <code>fill</code> is
			set.
		</>
	),
	term: 'height'
};

export const imageLoadingItem: DefinitionItem = {
	description: (
		<>
			<code>"lazy"</code> or <code>"eager"</code>
		</>
	),
	term: 'loading'
};

export const imageOnErrorItem: DefinitionItem = {
	description: 'callback when the image fails to load',
	term: 'onError'
};

export const imageOnLoadItem: DefinitionItem = {
	description: 'callback when the image finishes loading',
	term: 'onLoad'
};

export const imagePlaceholderItem: DefinitionItem = {
	description: 'placeholder strategy while loading',
	term: 'placeholder'
};

export const imagePriorityItem: DefinitionItem = {
	description: 'preload the image and disable lazy loading',
	term: 'priority'
};

export const imageQualityItem: DefinitionItem = {
	description: 'output quality from 1 to 100',
	term: 'quality'
};

export const imageSizesItem: DefinitionItem = {
	description: 'responsive sizes attribute',
	term: 'sizes'
};

export const imageSrcItem: DefinitionItem = {
	description: 'path to the source image (required)',
	term: 'src'
};

export const imageStyleItem: DefinitionItem = {
	description: 'inline styles',
	term: 'style'
};

export const imageUnoptimizedItem: DefinitionItem = {
	description: 'skip optimization and serve the original',
	term: 'unoptimized'
};

export const imageWidthItem: DefinitionItem = {
	description: (
		<>
			intrinsic width in pixels. Required unless <code>fill</code> is set.
		</>
	),
	term: 'width'
};
