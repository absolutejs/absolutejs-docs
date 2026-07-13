import { animated } from '@react-spring/web';
import { CSSProperties } from 'react';
import { ThemeSprings } from '../../../types/springTypes';
import {
	tableCellStyle,
	tableContainerStyle,
	tableHeaderStyle,
	tableStyle
} from '../../styles/docsStyles';

export type EndpointMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

export type Endpoint = {
	description: string;
	method: EndpointMethod;
	note?: string;
	path: string;
};

type EndpointTableProps = {
	endpoints: Endpoint[];
	themeSprings: ThemeSprings;
};

const methodColors: Record<EndpointMethod, string> = {
	DELETE: '#EF4444',
	GET: '#10B981',
	PATCH: '#F59E0B',
	POST: '#6366F1',
	PUT: '#F59E0B'
};

const methodBadgeStyle = (method: EndpointMethod): CSSProperties => ({
	background: `${methodColors[method]}1A`,
	border: `1px solid ${methodColors[method]}55`,
	borderRadius: '0.375rem',
	color: methodColors[method],
	display: 'inline-block',
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.7rem',
	fontWeight: 700,
	letterSpacing: '0.04em',
	padding: '0.15rem 0.5rem'
});

const EndpointRow = ({
	endpoint,
	themeSprings
}: {
	endpoint: Endpoint;
	themeSprings: ThemeSprings;
}) => (
	<tr>
		<animated.td
			style={{
				...tableCellStyle(themeSprings),
				whiteSpace: 'nowrap'
			}}
		>
			<span style={methodBadgeStyle(endpoint.method)}>
				{endpoint.method}
			</span>
		</animated.td>
		<animated.td
			style={{
				...tableCellStyle(themeSprings),
				color: themeSprings.contrastPrimary,
				fontFamily: 'JetBrains Mono, monospace',
				fontSize: '0.8125rem',
				whiteSpace: 'nowrap'
			}}
		>
			{endpoint.path}
		</animated.td>
		<animated.td
			style={{
				...tableCellStyle(themeSprings),
				color: themeSprings.contrastPrimary,
				fontSize: '0.9rem'
			}}
		>
			{endpoint.description}
			{endpoint.note ? (
				<animated.div
					style={{
						color: themeSprings.contrastSecondary,
						fontSize: '0.8rem',
						marginTop: '0.2rem'
					}}
				>
					{endpoint.note}
				</animated.div>
			) : null}
		</animated.td>
	</tr>
);

export const EndpointTable = ({
	endpoints,
	themeSprings
}: EndpointTableProps) => (
	<div style={tableContainerStyle}>
		<animated.table style={tableStyle(themeSprings)}>
			<thead>
				<tr>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Method
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Route
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Description
					</animated.th>
				</tr>
			</thead>
			<tbody>
				{endpoints.map((endpoint) => (
					<EndpointRow
						endpoint={endpoint}
						key={`${endpoint.method} ${endpoint.path}`}
						themeSprings={themeSprings}
					/>
				))}
			</tbody>
		</animated.table>
	</div>
);
