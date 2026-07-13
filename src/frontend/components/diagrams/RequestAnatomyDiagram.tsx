import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import {
	AnimatedCSSProperties,
	ThemeSprings
} from '../../../types/springTypes';
import {
	ContextPropertyCard,
	ContextPropertyColorKey
} from './ContextPropertyCard';
import { diagramColors, diagramContainerStyle } from './diagramStyles';

type RequestAnatomyDiagramProps = {
	themeSprings: ThemeSprings;
};

type ContextProperty = {
	codeExample: string;
	colorKey: ContextPropertyColorKey;
	descriptionLines: Array<string>;
	title: string;
};

const contextProperties: Array<ContextProperty> = [
	{
		codeExample: 'params.id',
		colorKey: 'accent',
		descriptionLines: [
			'Path parameters',
			'extracted from URL',
			'e.g. /user/:id'
		],
		title: 'params'
	},
	{
		codeExample: 'query.limit',
		colorKey: 'accent',
		descriptionLines: [
			'Query string values',
			'after the ? in URL',
			'e.g. ?limit=10'
		],
		title: 'query'
	},
	{
		codeExample: 'body.email',
		colorKey: 'accent',
		descriptionLines: [
			'Request payload',
			'JSON, form data,',
			'or file uploads'
		],
		title: 'body'
	},
	{
		codeExample: 'headers.auth',
		colorKey: 'accent',
		descriptionLines: [
			'HTTP request headers',
			'Content-Type, Auth,',
			'User-Agent, etc.'
		],
		title: 'headers'
	},
	{
		codeExample: 'cookie.session',
		colorKey: 'accent',
		descriptionLines: [
			'Reactive cookie store',
			'Read/write cookies',
			'via .value property'
		],
		title: 'cookie'
	},
	{
		codeExample: '/users/123',
		colorKey: 'accent',
		descriptionLines: [
			'URL pathname',
			'The resource path',
			'being requested'
		],
		title: 'path'
	},
	{
		codeExample: 'set.status = 201',
		colorKey: 'accentSecondary',
		descriptionLines: [
			'Response config',
			'Modify status and',
			'response headers'
		],
		title: 'set'
	},
	{
		codeExample: 'return status(201)',
		colorKey: 'accentSecondary',
		descriptionLines: [
			'Return with status',
			'Enables TypeScript',
			'type narrowing'
		],
		title: 'status'
	},
	{
		codeExample: "redirect('/login')",
		colorKey: 'accentSecondary',
		descriptionLines: [
			'Redirect to URL',
			'Supports custom',
			'status (301, 302)'
		],
		title: 'redirect'
	},
	{
		codeExample: 'request.url',
		colorKey: 'accentTertiary',
		descriptionLines: [
			'Web Standard',
			'Request object for',
			'low-level access'
		],
		title: 'request'
	},
	{
		codeExample: 'store.db',
		colorKey: 'accentTertiary',
		descriptionLines: [
			'Global mutable state',
			'for Elysia instance',
			'Shared across reqs'
		],
		title: 'store'
	},
	{
		codeExample: 'user, auth, etc.',
		colorKey: 'accentTertiary',
		descriptionLines: [
			'Custom properties',
			'added via .derive()',
			'or .state()'
		],
		title: '...derived'
	}
];

const themedColor = (
	themeSprings: ThemeSprings,
	colorKey: keyof typeof diagramColors.dark
) =>
	themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? diagramColors.dark[colorKey]
			: diagramColors.light[colorKey]
	);

const propertiesGridStyle: CSSProperties = {
	display: 'grid',
	gap: '0.625rem',
	gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
};

const titleStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, 'text'),
	fontSize: '1.125rem',
	fontWeight: 600,
	margin: 0,
	textAlign: 'center'
});

const subtitleStyle = (themeSprings: ThemeSprings): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, 'textMuted'),
	fontSize: '0.8125rem',
	margin: '0.375rem 0 1.25rem',
	textAlign: 'center'
});

const contextFrameStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	background: themedColor(themeSprings, 'background'),
	border: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? `2px solid ${diagramColors.dark.accent}`
			: `2px solid ${diagramColors.light.accent}`
	),
	borderRadius: '0.75rem',
	padding: '1.25rem'
});

const routeSignatureStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	color: themedColor(themeSprings, 'accent'),
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.8125rem',
	fontWeight: 600,
	margin: 0,
	overflowX: 'auto',
	whiteSpace: 'nowrap'
});

const frameDividerStyle = (
	themeSprings: ThemeSprings
): AnimatedCSSProperties => ({
	borderTop: themeSprings.theme.to((theme) =>
		theme.endsWith('dark')
			? `1px solid ${diagramColors.dark.border}`
			: `1px solid ${diagramColors.light.border}`
	),
	margin: '1rem 0'
});

export const RequestAnatomyDiagram = ({
	themeSprings
}: RequestAnatomyDiagramProps) => (
	<animated.div style={diagramContainerStyle(themeSprings)}>
		<animated.p style={titleStyle(themeSprings)}>
			Elysia Type-Safe Context
		</animated.p>
		<animated.p style={subtitleStyle(themeSprings)}>
			Context properties are fully typed based on your route&apos;s
			TypeBox schema
		</animated.p>
		<animated.div style={contextFrameStyle(themeSprings)}>
			<animated.p style={routeSignatureStyle(themeSprings)}>
				{".get('/users/:id', (context) => { ... })"}
			</animated.p>
			<animated.div style={frameDividerStyle(themeSprings)} />
			<div style={propertiesGridStyle}>
				{contextProperties.map((property) => (
					<ContextPropertyCard
						codeExample={property.codeExample}
						colorKey={property.colorKey}
						descriptionLines={property.descriptionLines}
						key={property.title}
						themeSprings={themeSprings}
						title={property.title}
					/>
				))}
			</div>
		</animated.div>
	</animated.div>
);
