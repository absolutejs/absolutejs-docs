import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../types/springTypes';
import {
	tableContainerStyle,
	tableStyle,
	tableHeaderStyle
} from '../../../styles/docsStyles';
import { HTMXAIEndpointRow } from './HTMXAIEndpointRow';

type EndpointRow = {
	color: string;
	desc: string;
	method: string;
	path: string;
};

type HTMXAIEndpointsTableProps = {
	themeSprings: ThemeSprings;
};

const endpoints: EndpointRow[] = [
	{
		color: '#3B82F6',
		desc: 'User message HTML + SSE container',
		method: 'POST',
		path: '/chat/message'
	},
	{
		color: '#10B981',
		desc: 'SSE stream of HTML fragments',
		method: 'GET',
		path: '/chat/sse/:convId/:msgId'
	},
	{
		color: '#10B981',
		desc: 'Full conversation as HTML',
		method: 'GET',
		path: '/chat/history/:convId'
	},
	{
		color: '#10B981',
		desc: 'Sidebar HTML fragment',
		method: 'GET',
		path: '/chat/conversations/list'
	},
	{
		color: '#EF4444',
		desc: 'Empty response',
		method: 'DELETE',
		path: '/chat/conversations/:id'
	}
];

export const HTMXAIEndpointsTable = ({
	themeSprings
}: HTMXAIEndpointsTableProps) => (
	<div style={tableContainerStyle}>
		<animated.table style={tableStyle(themeSprings)}>
			<thead>
				<tr>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Method
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Path
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Returns
					</animated.th>
				</tr>
			</thead>
			<tbody>
				{endpoints.map((endpoint) => (
					<HTMXAIEndpointRow
						color={endpoint.color}
						desc={endpoint.desc}
						key={endpoint.path}
						method={endpoint.method}
						path={endpoint.path}
						themeSprings={themeSprings}
					/>
				))}
			</tbody>
		</animated.table>
	</div>
);
