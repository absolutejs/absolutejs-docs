export const AuthRoutesTable = () => (
	<table
		style={{ borderCollapse: 'collapse', marginTop: '1rem', width: '100%' }}
	>
		<thead>
			<tr style={{ borderBottom: '2px solid #ddd' }}>
				<th style={{ padding: '0.5rem', textAlign: 'left' }}>Route</th>
				<th style={{ padding: '0.5rem', textAlign: 'left' }}>Method</th>
				<th style={{ padding: '0.5rem', textAlign: 'left' }}>
					Description
				</th>
			</tr>
		</thead>
		<tbody>
			<tr style={{ borderBottom: '1px solid #ddd' }}>
				<td style={{ padding: '0.5rem' }}>
					<code>/oauth2/:provider/authorization</code>
				</td>
				<td style={{ padding: '0.5rem' }}>GET</td>
				<td style={{ padding: '0.5rem' }}>Initiate OAuth flow</td>
			</tr>
			<tr style={{ borderBottom: '1px solid #ddd' }}>
				<td style={{ padding: '0.5rem' }}>
					<code>/oauth2/callback</code>
				</td>
				<td style={{ padding: '0.5rem' }}>GET</td>
				<td style={{ padding: '0.5rem' }}>Handle OAuth callback</td>
			</tr>
			<tr style={{ borderBottom: '1px solid #ddd' }}>
				<td style={{ padding: '0.5rem' }}>
					<code>/oauth2/status</code>
				</td>
				<td style={{ padding: '0.5rem' }}>GET</td>
				<td style={{ padding: '0.5rem' }}>
					Check user authentication status
				</td>
			</tr>
			<tr style={{ borderBottom: '1px solid #ddd' }}>
				<td style={{ padding: '0.5rem' }}>
					<code>/oauth2/profile</code>
				</td>
				<td style={{ padding: '0.5rem' }}>GET</td>
				<td style={{ padding: '0.5rem' }}>
					Get user profile from provider
				</td>
			</tr>
			<tr style={{ borderBottom: '1px solid #ddd' }}>
				<td style={{ padding: '0.5rem' }}>
					<code>/oauth2/tokens</code>
				</td>
				<td style={{ padding: '0.5rem' }}>POST</td>
				<td style={{ padding: '0.5rem' }}>Refresh access token</td>
			</tr>
			<tr style={{ borderBottom: '1px solid #ddd' }}>
				<td style={{ padding: '0.5rem' }}>
					<code>/oauth2/revocation</code>
				</td>
				<td style={{ padding: '0.5rem' }}>POST</td>
				<td style={{ padding: '0.5rem' }}>Revoke access token</td>
			</tr>
			<tr>
				<td style={{ padding: '0.5rem' }}>
					<code>/oauth2/signout</code>
				</td>
				<td style={{ padding: '0.5rem' }}>DELETE</td>
				<td style={{ padding: '0.5rem' }}>Sign out user</td>
			</tr>
		</tbody>
	</table>
);
