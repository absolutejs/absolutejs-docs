/* eslint-disable absolute/max-jsxnesting, absolute/sort-keys-fixable -- long-form editorial markup keeps its semantic document hierarchy and source-order attributes */
import { useState } from 'react';
import type { BlogPost, ReadingTime } from '@absolutejs/blog';

const COPY_FEEDBACK_DURATION_MS = 1600;

const formatPostDate = (value: string) =>
	new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'short',
		timeZone: 'UTC',
		year: 'numeric'
	}).format(new Date(value));

const ArticleCode = ({ html }: { html: string }) => (
	<pre>
		<code dangerouslySetInnerHTML={{ __html: html }} />
	</pre>
);

type CitraArticleContentProps = {
	post: BlogPost;
	readingTime: ReadingTime | null;
};

export const CitraArticleContent = ({
	post,
	readingTime
}: CitraArticleContentProps) => {
	const [copied, setCopied] = useState(false);
	const copyInstallCommand = async () => {
		await navigator.clipboard.writeText('bun add citra');
		setCopied(true);
		window.setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
	};

	return (
		<>
			<section className="hero" aria-labelledby="page-title">
				<div className="article-meta">
					<div className="author-lockup">
						<div>
							<span className="byline-label">Written by</span>
							<strong>
								<a href={post.author.url}>{post.author.name}</a>
							</strong>
							<span>{post.author.role}</span>
						</div>
					</div>
					<div className="article-meta-actions">
						<span className="article-details">
							Published{' '}
							<time dateTime={post.publishedAt}>
								{formatPostDate(post.publishedAt)}
							</time>
							{post.updatedAt === undefined ? null : (
								<>
									{' · Updated '}
									<time dateTime={post.updatedAt}>
										{formatPostDate(post.updatedAt)}
									</time>
								</>
							)}
							{' · '}
							{readingTime?.text ?? 'Estimating read'}
						</span>
						<a
							className="source-link"
							href="https://github.com/absolutejs/citra"
							target="_blank"
							rel="noreferrer"
						>
							View source ↗
						</a>
					</div>
				</div>

				<div className="hero-inner">
					<div>
						<div className="citra-lockup">
							<img
								className="citra-logo"
								src="/assets/png/citra-logo.png"
								alt="Citra"
							/>
							<p className="eyebrow">Why Citra</p>
						</div>
						<h1 id="page-title">
							A Complete OAuth Library <em>Built to Last</em>
						</h1>
						<p className="hero-summary">
							We built Citra because one auth layer should be able
							to use GitHub, Withings, Slack, or an enterprise
							OIDC issuer without hiding how any of them works.
							Provider behavior lives in{' '}
							<strong>typed data</strong> instead of another
							client class.
						</p>
					</div>
				</div>
				<nav className="article-toc" aria-label="In this article">
					<p>In this article</p>
					<ol>
						<li>
							<a href="#argument">The application problem</a>
						</li>
						<li>
							<a href="#model">The model</a>
						</li>
						<li>
							<a href="#withings">The hard case</a>
						</li>
						<li>
							<a href="#types">Type safety</a>
						</li>
						<li>
							<a href="#oidc">OIDC discovery</a>
						</li>
						<li>
							<a href="#identity">Identity mapping</a>
						</li>
						<li>
							<a href="#custom">Custom providers</a>
						</li>
						<li>
							<a href="#history">Where Citra came from</a>
						</li>
					</ol>
				</nav>
				<div className="stats" aria-label="Citra at a glance">
					<div className="stat">
						<strong>78</strong>
						<span>Built-in provider configurations</span>
					</div>
					<div className="stat">
						<strong>1</strong>
						<span>Shared implementation</span>
					</div>
				</div>
			</section>

			<article>
				<section className="section argument" id="argument">
					<div className="section-inner">
						<p className="section-label">The application problem</p>
						<h2>
							OAuth providers share a protocol, but their clients
							need different contracts.
						</h2>
						<p className="lede">
							Our auth layer accepts a provider selected from a
							route, database row, or application setting. It
							needs one orchestration path while preserving the
							inputs and operations each provider actually
							supports.
						</p>

						<div className="exchange">
							<div className="quote-card argument-facts">
								<h3>What the auth layer knows</h3>
								<p>
									A provider name, an optional named client,
									callback data, and session state arrive at
									runtime. That is enough to choose the
									client, not enough to erase its
									capabilities.
								</p>
							</div>
							<div className="counterpoint">
								<h3>
									A shared engine does not require a flattened
									interface.
								</h3>
								<p>
									GitHub has no refresh method. Google
									requires PKCE and scopes. Apple has no
									UserInfo endpoint. Withings disconnects a
									user with a numeric ID and a signed request.
									Citra keeps those facts in the selected
									client type and provider definition.
								</p>
								<p className="thesis">
									Provider definitions drive HTTP behavior and
									capability methods. A
									provider-to-credentials map gives each
									built-in its constructor type.
								</p>
							</div>
						</div>

						<div className="argument-context">
							<p>
								We reached this design while using Arctic inside{' '}
								<code>absolutejs/auth</code>. The auth package
								needed one callback and session flow for a
								provider selected at runtime. Its Arctic adapter
								grew a class registry, PKCE detection, and a
								second provider catalog just to recover
								information the OAuth layer did not expose. The
								full history is below.
							</p>
							<p>
								The strongest case for one wrapper per provider
								is that provider differences remain explicit. We
								agree with that goal. The cost is that
								construction, capability checks, profile
								requests, and response normalization move into
								every application adapter. Citra keeps the
								differences explicit as typed definitions and
								lets a shared engine execute them.
							</p>
						</div>
					</div>
				</section>

				<section className="section" id="model">
					<div className="section-inner">
						<p className="section-label">Provider definitions</p>
						<h2>
							One provider model drives requests, capabilities,
							and credentials.
						</h2>
						<p className="lede">
							A provider definition is executable configuration.
							The request engine reads it at runtime. Capability
							types read the literal flags at compile time.
						</p>

						<div className="definition-demo">
							<div
								className="type-code definition-code"
								aria-label="Annotated provider definition"
							>
								<div className="window-bar">
									<span className="dots" aria-hidden="true">
										<i></i>
										<i></i>
										<i></i>
									</span>
									<span>providers.ts</span>
								</div>
								<ArticleCode
									html={
										'withings: {\n  <span class="token-comment">// changes the returned client type</span>\n  isRefreshable: <span class="token-keyword">true</span>,\n  scopeRequired: <span class="token-keyword">true</span>,\n\n  <span class="token-comment">// changes authorization URL construction</span>\n  scopeDelimiter: <span class="token-string">\',\'</span>,\n\n  <span class="token-comment">// normalizes a nonstandard response</span>\n  accessTokenPath: [<span class="token-string">\'body\'</span>, <span class="token-string">\'access_token\'</span>],\n\n  revocationRequest: {\n    authIn: <span class="token-string">\'body\'</span>,\n    inputSource: <span class="token-string">\'subject\'</span>,\n    inputType: <span class="token-string">\'number\'</span>,\n    tokenParamName: <span class="token-string">\'userid\'</span>,\n    body: config =&gt;\n      <span class="token-function">getWithingsSignatureParams</span>(config, <span class="token-string">\'revoke\'</span>),\n    validateResponse: <span class="token-function">assertWithingsSuccess</span>\n  },\n\n  tokenRequest: {\n    authIn: <span class="token-string">\'body\'</span>,\n    encoding: <span class="token-string">\'application/x-www-form-urlencoded\'</span>,\n    url: <span class="token-string">\'https://wbsapi.withings.net/v2/oauth2\'</span>\n  },\n\n  subject: [<span class="token-string">\'userid\'</span>],\n  subjectBySource: {\n    tokenResponse: [<span class="token-string">\'body\'</span>, <span class="token-string">\'userid\'</span>]\n  },\n  subjectType: <span class="token-string">\'number\'</span>\n}'
									}
								/>
							</div>
							<div className="definition-copy">
								<h3>
									<code>isRefreshable: true</code>
								</h3>
								<p>
									The shared implementation can refresh a
									token, and <code>refreshAccessToken()</code>{' '}
									appears on the returned TypeScript type.
								</p>
								<h3>
									<code>scopeRequired: true</code>
								</h3>
								<p>
									<code>createAuthorizationUrl()</code> will
									not compile without a non-empty scope array.
								</p>
								<h3>
									<code>authIn</code> and{' '}
									<code>encoding</code>
								</h3>
								<p>
									The request engine knows where credentials
									belong and how the endpoint expects its
									payload. No Withings branch is needed in the
									engine.
								</p>
								<h3>
									Built-in credentials are mapped separately
								</h3>
								<p>
									<code>CredentialsFor&lt;P&gt;</code> maps
									the provider name to its constructor type.
									That is how Entra requires{' '}
									<code>tenantId</code> and Intuit limits its
									environment.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="section withings" id="withings">
					<div className="section-inner">
						<p className="section-label">
							Provider behavior in practice
						</p>
						<h2>
							Withings makes its differences impossible to ignore.
						</h2>
						<p className="lede">
							Its scopes are comma-separated, tokens are nested,
							operations share an action-based endpoint, and
							disconnecting a user requires a fresh nonce, a
							second HMAC, and the numeric <code>userid</code>.
							Citra represents each requirement directly.
						</p>

						<div className="request-map">
							<div className="request-explanation">
								<span className="mini-kicker">
									Where the differences live
								</span>
								<p>
									The application uses the same authorization,
									token, refresh, and revocation lifecycle.
									Identity comes from the token response
									because Withings does not expose a general
									UserInfo request in this configuration.
								</p>
								<p>
									The revocation input changes too. The
									definition selects <code>subject</code>, the
									shared resolver checks that it is a number,
									and <code>revokeToken()</code> receives the
									Withings <code>userid</code>. Standard
									endpoints default to the access token, while
									providers such as Reddit select the refresh
									token.
								</p>
							</div>

							<dl className="request-stack">
								<div className="request-row">
									<dt>Scopes</dt>
									<dd>
										<strong>scopeDelimiter: ','</strong>
									</dd>
								</div>
								<div className="request-row">
									<dt>Token path</dt>
									<dd>
										<strong>
											['body', 'access_token']
										</strong>
									</dd>
								</div>
								<div className="request-row">
									<dt>Exchange</dt>
									<dd>
										action=<strong>requesttoken</strong>
									</dd>
								</div>
								<div className="request-row">
									<dt>Identity</dt>
									<dd>
										<strong>body.userid</strong> from the
										token response
									</dd>
								</div>
								<div className="request-row">
									<dt>Revoke</dt>
									<dd>
										POST + fresh nonce + second HMAC +
										numeric <strong>userid</strong>; JSON
										status validated
									</dd>
								</div>
								<div className="request-row">
									<dt>App API</dt>
									<dd>
										createAuthorizationUrl ·
										validateAuthorizationCode ·
										refreshAccessToken · revokeToken(userid)
									</dd>
								</div>
							</dl>
						</div>

						<div className="quirk-intro">
							<span className="mini-kicker">
								The same request model
							</span>
							<h3>
								We added these extension points because
								providers needed them.
							</h3>
						</div>
						<div className="quirk-ledger">
							<article>
								<strong>HubSpot</strong>
								<code>profileRequest.authIn: 'path'</code>
								<p>
									The access token becomes the final URL path
									segment instead of a Bearer header.
								</p>
							</article>
							<article>
								<strong>Slack user OAuth</strong>
								<code>scopeParamName + accessTokenPath</code>
								<p>
									Scopes use <code>user_scope</code>, and the
									token arrives at{' '}
									<code>authed_user.access_token</code>.
								</p>
							</article>
							<article>
								<strong>AniList</strong>
								<code>POST · application/json · GraphQL</code>
								<p>
									Fetching identity means sending a GraphQL
									query rather than calling a normal UserInfo
									endpoint.
								</p>
							</article>
							<article>
								<strong>GoHighLevel</strong>
								<code>subjectBySource.tokenResponse</code>
								<p>
									The connected account ID comes from the
									token response, and profile requests require
									a version header.
								</p>
							</article>
							<article>
								<strong>Intuit</strong>
								<code>environment + computed headers</code>
								<p>
									Sandbox and production use different
									UserInfo URLs. Revocation builds its own
									Basic Auth header.
								</p>
							</article>
							<article>
								<strong>Apple</strong>
								<code>
									createClientSecret + idToken subject
								</code>
								<p>
									Token requests receive a freshly signed
									ES256 client-secret JWT. Authorization uses{' '}
									<code>form_post</code>, revocation reuses a
									fresh assertion, and identity is mapped from
									the ID token because there is no UserInfo
									endpoint.
								</p>
							</article>
						</div>

						<div className="daily-tools">
							<div className="daily-tools-intro">
								<p className="section-label">
									Useful in every callback
								</p>
								<h3>Utilities used throughout the callback.</h3>
							</div>
							<article>
								<code>generateState()</code>
								<code>generateCodeVerifier()</code>
								<p>
									Both use{' '}
									<code>crypto.getRandomValues()</code> and
									return URL-safe values.
								</p>
							</article>
							<article>
								<strong>Provider errors with context</strong>
								<p>
									Failed requests include HTTP status, URL,
									and the parsed JSON or text response when
									the provider sends one.
								</p>
							</article>
							<article>
								<strong>Authorization escape hatch</strong>
								<p>
									Pass extra <code>searchParams</code> without
									forking a provider definition for one query
									parameter.
								</p>
							</article>
							<article>
								<strong>Zero runtime dependencies</strong>
								<p>
									URL handling, PKCE, JWT signatures, and OIDC
									verification use platform APIs.
								</p>
							</article>
						</div>
					</div>
				</section>

				<section className="section type-section" id="types">
					<div className="section-inner">
						<p className="section-label">TypeScript</p>
						<h2>Selecting a provider changes the interface.</h2>
						<p className="lede">
							Conditional types read the selected provider’s
							literal configuration and add its required arguments
							and supported methods.
						</p>

						<div className="type-grid">
							<div className="type-notes">
								<section className="type-note">
									<b>PKCE</b>
									<div>
										<h3>
											Required inputs are really required
										</h3>
										<p>
											A PKCE provider requires{' '}
											<code>codeVerifier</code>. A
											scope-required provider requires a
											non-empty array.
										</p>
									</div>
								</section>
								<section className="type-note">
									<b>API</b>
									<div>
										<h3>Unsupported methods disappear</h3>
										<p>
											Refresh, revoke, and profile methods
											appear only when their configuration
											exists. They are absent from both
											the type and runtime object
											otherwise.
										</p>
									</div>
								</section>
								<section className="type-note">
									<b>OIDC</b>
									<div>
										<h3>OIDC is not assumed</h3>
										<p>
											<code>id_token</code> is optional in
											the token response. Even an
											OIDC-capable provider may omit it
											when the flow did not request OpenID
											Connect.
										</p>
									</div>
								</section>
								<section className="type-note">
									<b>HTTP</b>
									<div>
										<h3>Runtime checks remain</h3>
										<p>
											Provider servers can still lie.
											Citra rejects OAuth error objects
											returned with HTTP 200 and responses
											missing an access token.
										</p>
									</div>
								</section>
							</div>

							<div
								className="type-code"
								aria-label="TypeScript error examples"
							>
								<div className="window-bar">
									<span className="dots" aria-hidden="true">
										<i></i>
										<i></i>
										<i></i>
									</span>
									<span>the compiler is part of the API</span>
								</div>
								<div className="code-case">
									<ArticleCode
										html={
											'<span class="token-keyword">const</span> google = <span class="token-keyword">await</span> <span class="token-function">createOAuth2Client</span>(\n  <span class="token-string">\'google\'</span>,\n  credentials\n);\n\ngoogle.<span class="token-function">createAuthorizationUrl</span>(<span class="error-target">{\n  state,\n  scope: [<span class="token-string">\'openid\'</span>]\n}</span>);'
										}
									/>
									<div className="diagnostic">
										<strong>Type error · TS2345</strong>
										<p>
											Property 'codeVerifier' is missing
											in type '&#123; state: string;
											scope: [string]; &#125;' but
											required in type '&#123;
											codeVerifier: string; &#125;'.
										</p>
									</div>
								</div>

								<div className="code-case">
									<ArticleCode
										html={
											'<span class="token-keyword">const</span> facebook = <span class="token-keyword">await</span> <span class="token-function">createOAuth2Client</span>(\n  <span class="token-string">\'facebook\'</span>,\n  credentials\n);\n\nfacebook.<span class="error-target">revokeToken</span>(token);'
										}
									/>
									<div className="diagnostic">
										<strong>Type error · TS2339</strong>
										<p>
											Property 'revokeToken' does not
											exist on type
											'OAuth2Client&lt;"facebook"&gt;'.
										</p>
									</div>
								</div>

								<div className="code-case">
									<ArticleCode
										html={
											'<span class="token-keyword">const</span> tokens =\n  <span class="token-keyword">await</span> facebook.<span class="token-function">validateAuthorizationCode</span>({\n    code,\n    codeVerifier\n  });\n\ntokens.id_token?.toString();\n<span class="token-comment">// optional because a token exchange may omit it</span>'
										}
									/>
								</div>
							</div>
						</div>

						<div className="validation-band">
							<h3>What Citra checks at the token boundary</h3>
							<p>
								Code exchange, refresh, and discovered OIDC
								token responses must be objects with a non-empty{' '}
								<code>access_token</code>. When{' '}
								<code>refresh_token</code>,{' '}
								<code>token_type</code>, <code>scope</code>, or{' '}
								<code>id_token</code> is present, it must be a
								string. <code>expires_in</code> must be a
								non-negative number; numeric strings are
								normalized. Citra also rejects OAuth error
								objects returned with HTTP 200. Extra
								provider-specific fields remain{' '}
								<code>unknown</code> until the application
								extracts and validates them.
							</p>
						</div>

						<div className="constructor-proof">
							<div className="constructor-intro">
								<p className="section-label">
									Before the first request
								</p>
								<h3>
									Provider-specific credentials fail at
									compile time.
								</h3>
								<p>
									Built-in credential types are maintained in{' '}
									<code>CredentialsMap</code>. The provider
									name selects the matching constructor type.
								</p>
							</div>
							<div className="constructor-errors">
								<div className="compiler-card">
									<ArticleCode
										html={
											'<span class="token-function">createOAuth2Client</span>(<span class="token-string">\'microsoftentraid\'</span>, {\n  clientId,\n  clientSecret,\n  redirectUri\n});'
										}
									/>
									<div className="diagnostic">
										<strong>Type error · TS2345</strong>
										<p>
											Property 'tenantId' is missing in
											type '&#123; clientId: string;
											clientSecret: string; redirectUri:
											string; &#125;' but required in type
											'MicrosoftEntraIdOAuth2Credentials'.
										</p>
									</div>
								</div>
								<div className="compiler-card">
									<ArticleCode
										html={
											'<span class="token-function">createOAuth2Client</span>(<span class="token-string">\'intuit\'</span>, {\n  clientId,\n  clientSecret,\n  redirectUri,\n  environment: <span class="error-target"><span class="token-string">\'staging\'</span></span>\n});'
										}
									/>
									<div className="diagnostic">
										<strong>Type error · TS2322</strong>
										<p>
											Type '"staging"' is not assignable
											to type '"production" | "sandbox"'.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="runtime-narrowing">
							<div>
								<p className="section-label">
									Providers chosen at runtime
								</p>
								<h3>
									Generic code can narrow a client without
									classes.
								</h3>
								<p>
									A route parameter or database value is not a
									string literal. Citra exports provider-name
									guards, capability lists, and client guards
									for that case.
								</p>
							</div>
							<div className="type-code">
								<div className="window-bar">
									<span className="dots" aria-hidden="true">
										<i></i>
										<i></i>
										<i></i>
									</span>
									<span>disconnect-provider.ts</span>
								</div>
								<ArticleCode
									html={
										'<span class="token-keyword">function</span> <span class="token-function">disconnectIfSupported</span>(\n  client: OAuth2Client&lt;ProviderOption&gt;,\n  session: RevocationInputContext\n) {\n  <span class="token-keyword">if</span> (<span class="token-function">isRevocableOAuth2Client</span>(client)) {\n    <span class="token-keyword">const</span> input =\n      client.<span class="token-function">resolveRevocationInput</span>(session);\n\n    <span class="token-keyword">return</span> client.<span class="token-function">revokeToken</span>(input);\n  }\n}\n\n<span class="token-comment">// works for built-in and custom clients selected at runtime</span>'
									}
								/>
							</div>
						</div>
					</div>
				</section>

				<section className="section oidc-section" id="oidc">
					<div className="section-inner">
						<p className="section-label">OIDC discovery</p>
						<h2>The provider catalog is optional for OIDC.</h2>
						<p className="lede">
							For issuers that support authorization code flow
							with PKCE and <code>client_secret_post</code>, Citra
							can discover the endpoints at runtime and verify the
							resulting ID token with WebCrypto.
						</p>

						<div className="oidc-demo">
							<div className="type-code">
								<div className="window-bar">
									<span className="dots" aria-hidden="true">
										<i></i>
										<i></i>
										<i></i>
									</span>
									<span>enterprise-oidc.ts</span>
								</div>
								<ArticleCode
									html={
										'<span class="token-keyword">const</span> oidc = <span class="token-keyword">await</span> <span class="token-function">createOIDCClient</span>({\n  issuer: <span class="token-string">\'https://login.example.com\'</span>,\n  clientId,\n  clientSecret,\n  redirectUri\n});\n\n<span class="token-keyword">const</span> authorizationUrl =\n  <span class="token-keyword">await</span> oidc.<span class="token-function">createAuthorizationUrl</span>({\n    codeVerifier,\n    nonce,\n    state\n  });\n\n<span class="token-keyword">const</span> tokens =\n  <span class="token-keyword">await</span> oidc.<span class="token-function">validateAuthorizationCode</span>({\n    code,\n    codeVerifier\n  });\n\n<span class="token-keyword">if</span> (!tokens.id_token) {\n  <span class="token-keyword">throw new</span> Error(<span class="token-string">\'Missing id_token\'</span>);\n}\n\n<span class="token-keyword">const</span> claims =\n  <span class="token-keyword">await</span> oidc.<span class="token-function">verifyIdToken</span>(\n    tokens.id_token,\n    { nonce }\n  );'
									}
								/>
							</div>

							<div className="oidc-facts">
								<article>
									<h3>Discovery</h3>
									<p>
										Reads the authorization, token, JWKS,
										and optional UserInfo endpoints from{' '}
										<code>
											/.well-known/openid-configuration
										</code>
										. The returned issuer must match the one
										we configured.
									</p>
								</article>
								<article>
									<h3>PKCE inputs are required</h3>
									<p>
										Authorization and code exchange require
										a verifier. S256 is built in, and
										default scopes are{' '}
										<code>openid email profile</code>.
									</p>
								</article>
								<article>
									<h3>Signature and claim checks</h3>
									<p>
										Supports RS256 and ES256, then checks
										issuer, audience, authorized party,
										expiration, issued-at, not-before,
										subject, and an optional nonce.
									</p>
								</article>
								<article>
									<h3>JWKS caching and rotation</h3>
									<p>
										Signing keys are cached. Once the cache
										is at least 60 seconds old, a failed
										verification triggers one JWKS refresh
										and retry.
									</p>
								</article>
								<p className="oidc-note">
									This verification path belongs to{' '}
									<code>createOIDCClient()</code>. Selecting
									an OIDC provider from the catalog does not
									automatically verify its ID token.
								</p>
							</div>
						</div>

						<div className="validation-band">
							<h3>Security responsibilities stay visible</h3>
							<p>
								Citra generates cryptographically random state
								and verifier values, but the application must
								store them with the browser session and compare
								the returned <code>state</code>. If it sends a
								nonce, it must retain that value and pass it to{' '}
								<code>verifyIdToken()</code>. The discovered
								client currently supports confidential clients
								using <code>client_secret_post</code>; it does
								not negotiate every token-endpoint
								authentication method. It also does not validate
								hybrid-flow <code>at_hash</code> or{' '}
								<code>c_hash</code> claims.
							</p>
						</div>
					</div>
				</section>

				<section className="section identity-section" id="identity">
					<div className="section-inner">
						<p className="section-label">
							Identity mappings and helpers
						</p>
						<h2>We map the fields our auth layer needs.</h2>
						<p className="lede">
							A successful token exchange still leaves us parsing
							a different identity response for every provider.
							GitHub gives us <code>profile.id</code>. Etsy nests
							the ID under <code>results[0]</code>. GoHighLevel
							puts it in the token response. We record those paths
							in the provider definition.
						</p>

						<div className="identity-stage">
							<div className="provider-paths">
								<div className="provider-path">
									<strong>GitHub</strong>
									<code>profile.id</code>
									<span className="arrow">→</span>
									<span className="value-type">number</span>
								</div>
								<div className="provider-path">
									<strong>Etsy</strong>
									<code>profile.results[0].user_id</code>
									<span className="arrow">→</span>
									<span className="value-type">number</span>
								</div>
								<div className="provider-path">
									<strong>Tiltify</strong>
									<code>profile.data.id</code>
									<span className="arrow">→</span>
									<span className="value-type">string</span>
								</div>
								<div className="provider-path">
									<strong>Tumblr</strong>
									<code>profile.response.user.name</code>
									<span className="arrow">→</span>
									<span className="value-type">string</span>
								</div>
								<div className="provider-path">
									<strong>Facebook</strong>
									<code>profile.id · id_token.sub</code>
									<span className="arrow">→</span>
									<span className="value-type">string</span>
								</div>
								<div className="provider-path">
									<strong>GoHighLevel</strong>
									<code>tokenResponse.locationId</code>
									<span className="arrow">→</span>
									<span className="value-type">string</span>
								</div>
							</div>

							<div className="identity-engine">
								<span className="engine-label">
									What Citra exports
								</span>
								<div className="engine-step">
									<b>PATH</b>
									<div>
										<h3>
											<code>subject</code>
										</h3>
										<p>
											The canonical nested path and its
											expected primitive type live in the
											provider definition.
										</p>
									</div>
								</div>
								<div className="engine-step">
									<b>SOURCE</b>
									<div>
										<h3>
											<code>subjectBySource</code>
										</h3>
										<p>
											A provider can declare different
											paths for a profile, ID token, or
											token response.
										</p>
									</div>
								</div>
								<div className="engine-step">
									<b>READ</b>
									<div>
										<h3>
											<code>
												extractPropFromIdentity()
											</code>
										</h3>
										<p>
											Walks the nested path and can reject
											a value with the wrong string,
											number, boolean, or object type.
										</p>
									</div>
								</div>
								<div className="engine-step">
									<b>MOVE</b>
									<div>
										<h3>
											<code>
												normalizeProviderIdentity()
											</code>
										</h3>
										<p>
											Copies a source-specific subject to
											the provider’s canonical subject
											path.
										</p>
									</div>
								</div>
								<div className="canonical-result">
									<span>application reads</span>
									<br />
									extractPropFromIdentity(
									<br />
									&nbsp;&nbsp;identity,
									<br />
									&nbsp;&nbsp;provider.subject,
									<br />
									&nbsp;&nbsp;provider.subjectType
									<br />)
								</div>
							</div>
						</div>

						<p className="identity-caveat">
							These are metadata and helper functions, not an
							automatic unified-profile method. Our auth layer
							chooses whether it is handling a profile, verified
							ID token, or token response, then calls the helper
							with that source.
						</p>

						<div
							className="identity-fields"
							aria-label="Mapped identity fields"
						>
							<div className="identity-field">
								<code>subject</code>
								<span>
									Stable provider identity with an expected
									string or number type.
								</span>
							</div>
							<div className="identity-field">
								<code>email</code>
								<span>
									Mapped whether it lives at{' '}
									<code>email</code> or deeper.
								</span>
							</div>
							<div className="identity-field">
								<code>fullName</code>
								<span>
									A provider’s display-name field, declared
									once.
								</span>
							</div>
							<div className="identity-field">
								<code>givenName / familyName</code>
								<span>
									Separate name parts when the provider
									exposes them.
								</span>
							</div>
							<div className="identity-field">
								<code>picture</code>
								<span>
									Even nested avatar paths become provider
									metadata.
								</span>
							</div>
						</div>

						<div className="extractor-payoff">
							<h3>
								Our auth layer does not need provider parsing
								branches.
							</h3>
							<p>
								We do not keep a GitHub branch, an Etsy branch,
								and a GoHighLevel branch in our auth layer.
								Generic code reads the provider mapping and runs
								the same extractor. When we add a provider, we
								map its response once.
							</p>
						</div>
					</div>
				</section>

				<section className="section custom" id="custom">
					<div className="section-inner">
						<p className="section-label">Bring your own provider</p>
						<h2>Custom providers keep the capability inference.</h2>
						<p className="lede">
							We do not need to wait for a catalog release to
							integrate a private server or a provider Citra has
							not seen. A literal definition controls the same
							request engine. Its flags determine which operations
							exist on both the inferred type and the runtime
							object.
						</p>

						<div
							className="custom-code"
							aria-label="Custom provider example"
						>
							<div className="window-bar">
								<span className="dots" aria-hidden="true">
									<i></i>
									<i></i>
									<i></i>
								</span>
								<span>acme-provider.ts</span>
							</div>
							<ArticleCode
								html={
									'<span class="token-keyword">type</span> AcmeCredentials = {\n  clientId: <span class="token-keyword">string</span>;\n  clientSecret: <span class="token-keyword">string</span>;\n  redirectUri: <span class="token-keyword">string</span>;\n  tenantId: <span class="token-keyword">string</span>;\n};\n\n<span class="token-keyword">const</span> acme = <span class="token-function">defineProvider</span>&lt;AcmeCredentials&gt;()({\n  authorizationUrl: ({ tenantId }) =&gt;\n    <span class="token-string">`https://${tenantId}.acme.test/oauth/authorize`</span>,\n  isOIDC: <span class="token-keyword">true</span>,\n  isRefreshable: <span class="token-keyword">true</span>,\n  PKCEMethod: <span class="token-string">\'S256\'</span>,\n  scopeRequired: <span class="token-keyword">true</span>,\n  subject: [<span class="token-string">\'sub\'</span>],\n  subjectType: <span class="token-string">\'string\'</span>,\n  profileRequest: {\n    url: ({ tenantId }) =&gt;\n      <span class="token-string">`https://${tenantId}.acme.test/oauth/userinfo`</span>,\n    method: <span class="token-string">\'GET\'</span>,\n    authIn: <span class="token-string">\'header\'</span>,\n    encoding: <span class="token-string">\'application/json\'</span>\n  },\n  tokenRequest: {\n    url: ({ tenantId }) =&gt;\n      <span class="token-string">`https://${tenantId}.acme.test/oauth/token`</span>,\n    authIn: <span class="token-string">\'body\'</span>,\n    encoding: <span class="token-string">\'application/x-www-form-urlencoded\'</span>\n  }\n});\n\n<span class="token-keyword">const</span> client = <span class="token-keyword">await</span> <span class="token-function">createCustomOAuth2Client</span>(acme, {\n  clientId, clientSecret, redirectUri, tenantId\n});\n\n<span class="token-keyword">await</span> client.<span class="token-function">refreshAccessToken</span>(refreshToken);'
								}
							/>
						</div>

						<div className="custom-proof">
							<div className="custom-proof-copy">
								<p className="section-label">
									Inferred from the literal
								</p>
								<h3>
									The definition infers capabilities and
									carries its exact credentials.
								</h3>
								<p>
									Those facts come from{' '}
									<code>isRefreshable</code>,{' '}
									<code>PKCEMethod</code>, and{' '}
									<code>scopeRequired</code>. There is no
									separate custom-client interface to keep in
									sync.
								</p>
								<p className="custom-limit">
									<code>
										defineProvider&lt;AcmeCredentials&gt;()
									</code>{' '}
									types every credential-dependent URL,
									header, body, and client-secret factory. The
									same type is then required by{' '}
									<code>createCustomOAuth2Client()</code>, so
									missing, mistyped, and undeclared custom
									fields fail before construction.
								</p>
							</div>
							<div className="custom-errors">
								<div className="compiler-card">
									<ArticleCode
										html={
											'<span class="token-function">createCustomOAuth2Client</span>(acme, {\n  clientId,\n  clientSecret,\n  redirectUri\n});'
										}
									/>
									<div className="diagnostic">
										<strong>Type error · TS2345</strong>
										<p>
											Property 'tenantId' is missing but
											required in type 'AcmeCredentials'.
										</p>
									</div>
								</div>
								<div className="compiler-card">
									<ArticleCode
										html={
											'client.<span class="token-function">createAuthorizationUrl</span>({\n  state,\n  scope: [<span class="token-string">\'openid\'</span>]\n});'
										}
									/>
									<div className="diagnostic">
										<strong>Type error · TS2345</strong>
										<p>
											Property 'codeVerifier' is missing
											in type '&#123; state: string;
											scope: [string]; &#125;' but
											required in type '&#123;
											codeVerifier: string; &#125;'.
										</p>
									</div>
								</div>
								<div className="compiler-card">
									<ArticleCode
										html={
											'client.<span class="error-target">revokeToken</span>(accessToken);'
										}
									/>
									<div className="diagnostic">
										<strong>
											Compiler result, shortened · TS2339
										</strong>
										<p>
											Property 'revokeToken' does not
											exist on the inferred client type.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="section history" id="history">
					<div className="section-inner">
						<p className="section-label">Where Citra came from</p>
						<h2>
							We needed OAuth to fit inside a complete auth
							system.
						</h2>
						<p className="lede">
							Citra did not begin as an abstract argument about
							provider design. It began while we were building{' '}
							<a
								href="https://github.com/absolutejs/absolute-auth"
								target="_blank"
								rel="noreferrer"
							>
								absolutejs/auth
							</a>
							, where OAuth is one part of a larger authentication
							system.
						</p>

						<div className="history-context">
							<div className="history-context-copy">
								<span className="mini-kicker">
									What we were actually building
								</span>
								<h3>
									One provider selected at runtime, one auth
									flow for the application.
								</h3>
								<p>
									The auth package owned routes, state and
									PKCE cookies, callbacks, sessions, user
									lookup, refresh, revocation, and redirects.
									A route or stored session selected the
									provider. The same orchestration then had to
									work for every configured provider.
								</p>
								<p>
									Elysia hosted those HTTP routes, but it was
									not the source of the problem. Any
									generalized auth system reaches the same
									boundary once provider selection becomes
									data instead of a hardcoded import.
								</p>
							</div>
							<div className="history-friction">
								<span className="mini-kicker">
									What the Arctic adapter accumulated
								</span>
								<dl>
									<div>
										<dt>Construction</dt>
										<dd>
											A manual registry of every provider
											class and a suppressed type error
											around the dynamic constructor.
										</dd>
									</div>
									<div>
										<dt>PKCE</dt>
										<dd>
											Function source converted to text
											and searched for a{' '}
											<code>codeVerifier</code> parameter.
										</dd>
									</div>
									<div>
										<dt>Identity</dt>
										<dd>
											Try to decode an ID token, catch its
											absence, then fall back to a profile
											request.
										</dd>
									</div>
									<div>
										<dt>UserInfo</dt>
										<dd>
											A separate 322-line catalog
											describing profile endpoints,
											methods, headers, bodies, and token
											placement.
										</dd>
									</div>
								</dl>
							</div>
						</div>

						<div className="history-timeline">
							<section className="history-event">
								<span className="history-date">April 2025</span>
								<h3>The mismatch became explicit</h3>
								<p>
									In{' '}
									<a
										href="https://github.com/pilcrowonpaper/arctic/issues/299"
										target="_blank"
										rel="noreferrer"
									>
										Arctic issue #299
									</a>
									, we showed the callback from
									absolutejs/auth. <code>idToken()</code>{' '}
									threw when a non-OIDC response omitted{' '}
									<code>id_token</code>, forcing a normal
									branch through exception handling. Arctic's
									response was that its clients were not
									designed to be passed around or used through
									a shared interface.
								</p>
							</section>
							<section className="history-event">
								<span className="history-date">May 2025</span>
								<h3>The OAuth boundary became Citra</h3>
								<p>
									We began replacing the class registry and
									application-owned profile catalog with one
									client driven by provider definitions. As
									Citra matured, PKCE, request placement,
									response paths, identity extraction,
									refresh, and revocation became facts the
									OAuth layer could expose directly.
								</p>
							</section>
							<section className="history-event">
								<span className="history-date">Today</span>
								<h3>The larger system is the proof</h3>
								<p>
									absolutejs/auth now accepts typed built-in
									or custom provider configuration, resolves
									the selected client, and runs it through
									common authorization, callback, profile,
									refresh, and revocation routes. Auth owns
									the application workflow. Citra owns
									provider-aware OAuth.
								</p>
							</section>
							<section className="history-event">
								<span className="history-date">July 2026</span>
								<h3>Arctic was deprecated</h3>
								<p>
									Pilcrow later{' '}
									<a
										href="https://pilcrowonpaper.com/blog/18"
										target="_blank"
										rel="noreferrer"
									>
										deprecated Arctic
									</a>
									, citing provider maintenance, an API that
									was not tailored enough, and a belief that
									OAuth was the wrong layer to abstract. Those
									concerns are worth taking seriously. Citra's
									answer is to keep the shared operations
									small, make capabilities visible in the
									type, and leave wire details in provider
									configuration.
								</p>
							</section>
						</div>

						<p className="history-maintenance">
							Configuration does not stop providers from changing
							their APIs. Contract fixtures and catalog
							maintenance still matter. What it changes is where
							that work happens and how much application code it
							can disturb.
						</p>

						<p className="history-today">
							absolutejs/auth is one demanding consumer, not the
							boundary of the idea. It can remain an Elysia auth
							system because Citra remains a framework-neutral
							OAuth layer: 78 provider configurations, one engine,
							and no requirement that another application organize
							its routes or sessions the same way.
						</p>
					</div>
				</section>

				<section className="section verdict" id="verdict">
					<div className="section-inner">
						<p className="section-label">Where Citra is going</p>
						<h2>Keep provider details out of application code.</h2>
						<p>
							Citra is useful today because adding a provider
							usually means describing its HTTP behavior, not
							implementing another client. Application code gets a
							stable OAuth surface while provider definitions
							retain the differences.
						</p>
						<p>
							Our next work is specific: expand live provider
							contract fixtures, support more discovered OIDC
							client-authentication methods, and infer custom
							credential fields as precisely as built-in
							credentials. Supporting another provider should add
							its requirements to the catalog instead of
							scattering new branches through the application.
						</p>
						<div className="validation-band">
							<h3>Current boundaries</h3>
							<p>
								The catalog contains 78 typed configurations,
								and compile-time tests require a credential
								mapping for every one. That does not mean every
								provider has been live-tested with production
								credentials. Provider APIs still change, so the
								catalog and its fixtures require maintenance.
								Citra has zero runtime dependencies and uses the
								Business Source License 1.1, which converts to
								Apache 2.0 on May 29, 2030.
							</p>
						</div>
						<div className="cta-row">
							<div
								className="install-command"
								aria-label="Install Citra with Bun"
							>
								<code>
									<span
										className="command-prompt"
										aria-hidden="true"
									>
										$
									</span>
									bun add citra
								</code>
								<button
									className={`copy-command${copied ? ' copied' : ''}`}
									onClick={copyInstallCommand}
									type="button"
									data-copy="bun add citra"
									aria-label={
										copied
											? 'Copied bun add citra'
											: 'Copy bun add citra'
									}
								>
									<svg viewBox="0 0 20 20" aria-hidden="true">
										<rect
											x="6.5"
											y="6.5"
											width="9"
											height="9"
											rx="1.5"
										></rect>
										<path d="M13.5 6.5V5A1.5 1.5 0 0 0 12 3.5H5A1.5 1.5 0 0 0 3.5 5v7A1.5 1.5 0 0 0 5 13.5h1.5"></path>
									</svg>
									<span className="copy-label">
										{copied ? 'Copied' : 'Copy'}
									</span>
								</button>
							</div>
							<a
								className="button"
								href="https://github.com/absolutejs/citra"
								target="_blank"
								rel="noreferrer"
							>
								Read the source ↗
							</a>
						</div>
					</div>
				</section>
			</article>

			<aside className="sources" aria-labelledby="sources-title">
				<div className="sources-inner">
					<h2 id="sources-title">Sources &amp; context</h2>
					<ol>
						<li>
							<a
								href="https://github.com/pilcrowonpaper/arctic/issues/299"
								target="_blank"
								rel="noreferrer"
							>
								Arctic issue #299, “Changing behavior of
								OAuth2Tokens.idToken()”
							</a>
							: the original interchangeability discussion from
							April 2025.
						</li>
						<li>
							<a
								href="https://github.com/absolutejs/absolute-auth/tree/c75f96a"
								target="_blank"
								rel="noreferrer"
							>
								The Arctic-era absolutejs/auth source
							</a>{' '}
							and its{' '}
							<a
								href="https://github.com/absolutejs/absolute-auth/commit/4b8aa12"
								target="_blank"
								rel="noreferrer"
							>
								first Citra migration
							</a>{' '}
							and the{' '}
							<a
								href="https://github.com/absolutejs/absolute-auth/blob/4f151bb/src/providers/clients.ts"
								target="_blank"
								rel="noreferrer"
							>
								current provider integration
							</a>
							: the implementation history behind the origin
							section.
						</li>
						<li>
							<a
								href="https://pilcrowonpaper.com/blog/18"
								target="_blank"
								rel="noreferrer"
							>
								Pilcrow, “I am deprecating most of my
								open-source NPM packages”
							</a>
							: the case against abstracting at the OAuth protocol
							layer from July 2026.
						</li>
						<li>
							<a
								href="https://github.com/absolutejs/citra/blob/3d84df9/src/providers.ts"
								target="_blank"
								rel="noreferrer"
							>
								Citra provider definitions
							</a>{' '}
							and{' '}
							<a
								href="https://github.com/absolutejs/citra/blob/3d84df9/src/types.ts"
								target="_blank"
								rel="noreferrer"
							>
								conditional client types
							</a>
							: the implementation behind the claims on this page.
						</li>
						<li>
							<a
								href="https://developer.withings.com/developer-guide/v3/get-access/sign-your-requests/"
								target="_blank"
								rel="noreferrer"
							>
								Withings request-signing guide
							</a>{' '}
							and{' '}
							<a
								href="https://developer.withings.com/api-reference/"
								target="_blank"
								rel="noreferrer"
							>
								OAuth API reference
							</a>
							: the nonce, HMAC, and numeric <code>userid</code>{' '}
							revocation contract used in the hard-case example.
						</li>
					</ol>
				</div>
			</aside>
		</>
	);
};
