import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocsNavigation } from '../DocsNavigation';
import {
	authGuardManual,
	authGuardProtectRoute,
	corsHeaders,
	lifecycleOverview,
	middlewareComparison,
	rateLimiting,
	redirects,
	registrationOrder,
	scopingMiddleware
} from '../../../data/documentation/middlewareDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	h1Style,
	listItemStyle,
	listStyle,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle,
	strongStyle
} from '../../../styles/docsStyles';
import {
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#middleware-in-absolutejs', label: 'Middleware in AbsoluteJS' },
	{ href: '#request-lifecycle', label: 'Request Lifecycle' },
	{ href: '#auth-guard', label: 'Auth Guard' },
	{ href: '#redirects', label: 'Redirects & URL Rewriting' },
	{ href: '#cors', label: 'CORS & Custom Headers' },
	{ href: '#rate-limiting', label: 'Rate Limiting' },
	{ href: '#scoping', label: 'Scoping Middleware' }
];

export const MiddlewareView = ({
	currentPageId,
	onNavigate,
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');
	const showDesktopToc = !isMobileOrTablet;

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				minHeight: 0,
				overflowX: 'hidden',
				overflowY: 'auto',
				position: 'relative'
			}}
		>
			<div style={mainContentStyle(isMobileOrTablet)}>
				<animated.div style={heroGradientStyle(themeSprings)}>
					<h1 style={h1Style(isMobileOrTablet)} id="middleware">
						Middleware
					</h1>
					<p style={paragraphLargeStyle}>
						There&apos;s no <code>middleware.ts</code> file.
						Instead, Elysia gives you lifecycle hooks&mdash;and
						they&apos;re more powerful than traditional middleware.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="middleware-in-absolutejs"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Middleware in AbsoluteJS
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						If you&apos;re coming from Next.js or Express, you might
						be looking for a middleware layer. In AbsoluteJS, your
						server is an Elysia server&mdash;and Elysia uses{' '}
						<strong style={strongStyle}>lifecycle hooks</strong>{' '}
						instead of middleware. They run at specific phases of
						the request, giving you more control over when your code
						executes.
					</p>
					<div
						style={{
							display: 'grid',
							gap: '1rem',
							gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
							marginBottom: '1.5rem',
							marginTop: '1rem'
						}}
					>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									Next.js middleware.ts
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Single file, runs before every request on the
								edge. Can redirect, rewrite, set headers, check
								auth.
							</p>
						</animated.div>
						<animated.div style={featureCardStyle(themeSprings)}>
							<p
								style={{
									...paragraphSpacedStyle,
									marginBottom: '0.5rem'
								}}
							>
								<strong style={strongStyle}>
									Elysia Lifecycle Hooks
								</strong>
							</p>
							<p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
								Multiple hooks at specific phases.{' '}
								<code>onRequest</code>,{' '}
								<code>onBeforeHandle</code>, <code>guard</code>,
								and more. Runs on Bun, not edge.
							</p>
						</animated.div>
					</div>
					<PrismPlus
						codeString={middlewareComparison}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="request-lifecycle"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Request Lifecycle
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Every request passes through Elysia&apos;s lifecycle in
						order. Understanding where each hook runs helps you pick
						the right one for the job.
					</p>
					<PrismPlus
						codeString={lifecycleOverview}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>onRequest</strong>: Runs
							first on every request. Minimal context. Best for
							rate limiting, analytics, and custom headers.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>onBeforeHandle</strong>:
							Runs after validation. Return a value to skip the
							handler. This is your primary auth/access control
							hook.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>resolve</strong>: Like{' '}
							<code>derive</code> but runs after validation, so
							types are guaranteed. Preferred for type-safe
							context values.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>onAfterHandle</strong>:
							Inspect or transform the response after the handler
							runs.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>onAfterResponse</strong>
							: Runs after the response is sent. Use for cleanup
							and logging.
						</li>
					</ul>
					<p style={{ ...paragraphSpacedStyle, marginTop: '1.5rem' }}>
						See the full lifecycle details in the{' '}
						<a
							href="https://elysiajs.com/essential/life-cycle"
							target="_blank"
							rel="noopener noreferrer"
							style={{ color: '#a78bfa' }}
						>
							Elysia lifecycle documentation
						</a>
						.
					</p>
					<AnchorHeading
						level="h3"
						id="registration-order"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Registration Order Matters
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Hooks only apply to routes registered{' '}
						<strong style={strongStyle}>after</strong> them. The one
						exception is <code>onRequest</code>, which is always
						global.
					</p>
					<PrismPlus
						codeString={registrationOrder}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="auth-guard"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Auth Guard
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Authentication is the most common middleware pattern.
						AbsoluteJS gives you two approaches: the built-in{' '}
						<code>@absolutejs/auth</code> plugin, or a manual guard
						pattern using Elysia&apos;s <code>guard</code> +{' '}
						<code>resolve</code>.
					</p>
					<AnchorHeading
						level="h3"
						id="auth-absolutejs-auth"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Using @absolutejs/auth
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The <code>@absolutejs/auth</code> package provides a{' '}
						<code>protectRoute</code> helper that handles session
						validation, token refresh, and cleanup automatically.
					</p>
					<PrismPlus
						codeString={authGuardProtectRoute}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<AnchorHeading
						level="h3"
						id="auth-manual"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Manual Auth Pattern
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						For custom auth logic, use <code>guard</code> with a{' '}
						<code>beforeHandle</code> check and <code>resolve</code>{' '}
						to extract typed user context. <code>resolve</code> is
						preferred over <code>derive</code> here because it runs
						after validation, giving you type-safe access to headers
						and body.
					</p>
					<PrismPlus
						codeString={authGuardManual}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="redirects"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Redirects &amp; URL Rewriting
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Use <code>set.redirect</code> in any hook or handler to
						redirect requests. Return early to skip the route
						handler.
					</p>
					<PrismPlus
						codeString={redirects}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="cors"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						CORS &amp; Custom Headers
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						For CORS, the <code>@elysiajs/cors</code> plugin is the
						simplest option. For custom header logic, use{' '}
						<code>onRequest</code>&mdash;it runs earliest and is
						always global, making it ideal for headers that should
						apply to every response.
					</p>
					<PrismPlus
						codeString={corsHeaders}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="rate-limiting"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Rate Limiting
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Rate limiting belongs in <code>onRequest</code> since it
						should run before any parsing or validation. Here&apos;s
						a simple in-memory rate limiter built as a reusable
						plugin:
					</p>
					<PrismPlus
						codeString={rateLimiting}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1rem'
						}}
					>
						For production, consider a community rate limiting
						plugin or backing the store with Redis for multi-process
						deployments.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						level="h2"
						id="scoping"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Scoping Middleware
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						By default, Elysia hooks are{' '}
						<strong style={strongStyle}>isolated</strong> to the
						plugin they&apos;re defined in. This prevents plugins
						from accidentally affecting other parts of your
						application. You can control this with three scope
						levels:
					</p>
					<ul style={{ ...listStyle, marginBottom: '1.5rem' }}>
						<li style={listItemStyle}>
							<strong style={strongStyle}>local</strong>{' '}
							(default): Hooks stay in the current plugin instance
							and its descendants.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>scoped</strong>: Hooks
							propagate one level up to the parent instance.
						</li>
						<li style={listItemStyle}>
							<strong style={strongStyle}>global</strong>: Hooks
							apply to all instances everywhere.
						</li>
					</ul>
					<PrismPlus
						codeString={scopingMiddleware}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p
						style={{
							...paragraphSpacedStyle,
							marginTop: '1.5rem'
						}}
					>
						See the full scoping details in the{' '}
						<a
							href="https://elysiajs.com/essential/plugin#scope"
							target="_blank"
							rel="noopener noreferrer"
							style={{ color: '#a78bfa' }}
						>
							Elysia plugin scope documentation
						</a>
						.
					</p>
				</section>

				<DocsNavigation
					currentPageId={currentPageId}
					isMobileOrTablet={isMobileOrTablet}
					onNavigate={onNavigate}
					themeSprings={themeSprings}
				/>
			</div>

			{showDesktopToc && (
				<TableOfContents themeSprings={themeSprings} items={tocItems} />
			)}
			{isMobileOrTablet && onTocToggle && (
				<MobileTableOfContents
					themeSprings={themeSprings}
					items={tocItems}
					isOpen={tocOpen ?? false}
					onToggle={onTocToggle}
				/>
			)}
		</div>
	);
};
