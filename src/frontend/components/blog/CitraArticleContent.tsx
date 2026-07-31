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
							<p className="eyebrow">The OAuth layer we wanted</p>
						</div>
						<h1 id="page-title">
							OAuth providers disagree. Our app{' '}
							<em>doesn’t have to.</em>
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
					<span>In this article</span>
					<a href="#argument">The application problem</a>
					<a href="#model">The model</a>
					<a href="#withings">The hard case</a>
					<a href="#types">Type safety</a>
					<a href="#oidc">OIDC discovery</a>
					<a href="#identity">Identity mapping</a>
					<a href="#custom">Custom providers</a>
					<a href="#history">Where Citra came from</a>
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
							<figure className="quote-card">
								<blockquote>
									The provider is dynamic. The contract should
									still be precise.
								</blockquote>
								<footer>
									The requirement from our application
								</footer>
							</figure>
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
									The same literal configuration controls the
									HTTP request and the TypeScript surface.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="section" id="model">
					<div className="section-inner">
						<p className="section-label">Provider definitions</p>
						<h2>One definition drives the request and its type.</h2>
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
										'withings: {\n  <span class="token-comment">// changes the returned client type</span>\n  isRefreshable: <span class="token-keyword">true</span>,\n  scopeRequired: <span class="token-keyword">true</span>,\n\n  <span class="token-comment">// changes authorization URL construction</span>\n  scopeDelimiter: <span class="token-string">\',\'</span>,\n\n  <span class="token-comment">// normalizes a nonstandard response</span>\n  accessTokenPath: [<span class="token-string">\'body\'</span>, <span class="token-string">\'access_token\'</span>],\n\n  revocationRequest: {\n    authIn: <span class="token-string">\'body\'</span>,\n    inputType: <span class="token-string">\'number\'</span>,\n    tokenParamName: <span class="token-string">\'userid\'</span>,\n    body: config =&gt;\n      <span class="token-function">getWithingsSignatureParams</span>(config, <span class="token-string">\'revoke\'</span>)\n  },\n\n  tokenRequest: {\n    authIn: <span class="token-string">\'body\'</span>,\n    encoding: <span class="token-string">\'application/x-www-form-urlencoded\'</span>,\n    url: <span class="token-string">\'https://wbsapi.withings.net/v2/oauth2\'</span>\n  },\n\n  subject: [<span class="token-string">\'userid\'</span>],\n  subjectBySource: {\n    tokenResponse: [<span class="token-string">\'body\'</span>, <span class="token-string">\'userid\'</span>]\n  },\n  subjectType: <span class="token-string">\'number\'</span>\n}'
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
									The revocation input changes too:{' '}
									<code>revokeToken()</code> accepts a number
									for Withings and a token string for standard
									revocation endpoints.
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
								<h3>Small pieces we should not rewrite.</h3>
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
										'<span class="token-keyword">function</span> <span class="token-function">revokeIfSupported</span>&lt;P <span class="token-keyword">extends</span> ProviderOption&gt;(\n  provider: P,\n  client: BaseOAuth2Client&lt;P&gt;,\n  input: RevocationInputForProvider&lt;P&gt;\n) {\n  <span class="token-keyword">if</span> (<span class="token-function">isRevocableOAuth2Client</span>(provider, client)) {\n    <span class="token-keyword">return</span> client.<span class="token-function">revokeToken</span>(input);\n  }\n}\n\n<span class="token-comment">// the guard checks the client method at runtime too</span>'
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
									<h3>PKCE by construction</h3>
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
								This is the part we care about most. We do not
								keep a GitHub branch, an Etsy branch, and a
								GoHighLevel branch in our auth layer. Generic
								code reads the provider mapping and runs the
								same extractor. When we add a provider, we map
								its response once.
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
									'<span class="token-keyword">const</span> acme = <span class="token-function">defineProvider</span>({\n  authorizationUrl: <span class="token-string">\'https://acme.test/oauth/authorize\'</span>,\n  isOIDC: <span class="token-keyword">true</span>,\n  isRefreshable: <span class="token-keyword">true</span>,\n  PKCEMethod: <span class="token-string">\'S256\'</span>,\n  scopeRequired: <span class="token-keyword">true</span>,\n  subject: [<span class="token-string">\'sub\'</span>],\n  subjectType: <span class="token-string">\'string\'</span>,\n  profileRequest: {\n    url: <span class="token-string">\'https://acme.test/oauth/userinfo\'</span>,\n    method: <span class="token-string">\'GET\'</span>,\n    authIn: <span class="token-string">\'header\'</span>,\n    encoding: <span class="token-string">\'application/json\'</span>\n  },\n  tokenRequest: {\n    url: <span class="token-string">\'https://acme.test/oauth/token\'</span>,\n    authIn: <span class="token-string">\'body\'</span>,\n    encoding: <span class="token-string">\'application/x-www-form-urlencoded\'</span>\n  }\n});\n\n<span class="token-keyword">const</span> client = <span class="token-keyword">await</span> <span class="token-function">createCustomOAuth2Client</span>(acme, credentials);\n<span class="token-keyword">await</span> client.<span class="token-function">refreshAccessToken</span>(refreshToken);'
								}
							/>
						</div>

						<div className="custom-proof">
							<div className="custom-proof-copy">
								<p className="section-label">
									Inferred from the literal
								</p>
								<h3>
									This literal produces a refreshable client
									with required PKCE and scopes.
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
									One limit remains: extra credential fields
									unique to a custom provider are not inferred
									today. Custom definitions get capability
									inference, but built-in{' '}
									<code>CredentialsMap</code> entries still
									provide the stronger constructor types.
								</p>
							</div>
							<div className="custom-errors">
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
							A missing ID token exposed a bigger design question.
						</h2>
						<p className="lede">
							The project started with a practical problem. We
							needed one dependable integration layer for
							providers that expose different slices of OAuth.
						</p>

						<div className="history-timeline">
							<section className="history-event">
								<span className="history-date">April 2025</span>
								<h3>The ordinary case threw an exception</h3>
								<p>
									In{' '}
									<a
										href="https://github.com/pilcrowonpaper/arctic/issues/299"
										target="_blank"
										rel="noreferrer"
									>
										Arctic issue #299
									</a>
									, we pointed out that <code>idToken()</code>{' '}
									threw when a token response omitted{' '}
									<code>id_token</code>. That absence can be
									valid when a flow did not use OpenID
									Connect, so our shared layer could not treat
									it as exceptional every time.
								</p>
							</section>
							<section className="history-event">
								<span className="history-date">
									The disagreement
								</span>
								<h3>Should provider clients interchange?</h3>
								<p>
									Arctic’s answer was no: providers omit
									features, violate specifications, and need
									flexible individual behavior. Consumers who
									needed a shared interface were expected to
									wrap each provider client themselves.
								</p>
							</section>
							<section className="history-event">
								<span className="history-date">
									Citra’s answer
								</span>
								<h3>Make differences typed data</h3>
								<p>
									Citra moved endpoints, capabilities, request
									placement, encoding, identity paths, and
									provider quirks into literal configuration.
									One engine reads that data at runtime while
									conditional types derive the client
									contract.
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
								<p>
									Configuration does not stop providers from
									changing their APIs. Contract fixtures and
									catalog maintenance still matter. What it
									changes is where that work happens and how
									much application code it can disturb.
								</p>
							</section>
						</div>

						<p className="history-today">
							That disagreement gave us a concrete test: can one
							engine represent 78 provider configurations without
							pretending they have the same capabilities? Citra
							does it with typed configuration, custom providers,
							OIDC discovery, and identity mapping.
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
								Citra 0.29.9 is pre-1.0. The catalog contains 78
								typed configurations, and compile-time tests
								require a credential mapping for every one. That
								does not mean every provider has been
								live-tested with production credentials.
								Provider APIs still change, so the catalog and
								its fixtures require maintenance. Citra has zero
								runtime dependencies and uses the Business
								Source License 1.1, which converts to Apache 2.0
								on May 29, 2030.
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
								href="https://github.com/absolutejs/citra/blob/v0.29.9/src/providers.ts"
								target="_blank"
								rel="noreferrer"
							>
								Citra provider definitions
							</a>{' '}
							and{' '}
							<a
								href="https://github.com/absolutejs/citra/blob/v0.29.9/src/types.ts"
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
