import { CSSProperties } from 'react';
import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../types/springTypes';
import {
	tableContainerStyle,
	tableStyle,
	tableHeaderStyle,
	tableCellStyle,
	tableCodeStyle
} from '../../../styles/docsStyles';

type StreamingServerMessagesTableProps = ThemeProps & {
	directionLabelStyle: CSSProperties;
};

const serverMessageRows: Array<[string, string]> = [
	['chunk', 'Streamed text content fragment'],
	['thinking', 'Extended reasoning token stream'],
	['tool_status', 'Tool execution running or complete with result'],
	['image', 'Generated image data (may be partial during streaming)'],
	[
		'complete',
		'Response finished with model name, duration, and token usage'
	],
	['error', 'Error message from the provider or plugin']
];

const renderServerMessageHeader = (
	themeSprings: ThemeProps['themeSprings']
) => (
	<thead>
		<tr>
			<animated.th style={tableHeaderStyle(themeSprings)}>
				Type
			</animated.th>
			<animated.th style={tableHeaderStyle(themeSprings)}>
				Purpose
			</animated.th>
		</tr>
	</thead>
);

const renderServerMessageBody = (themeSprings: ThemeProps['themeSprings']) => (
	<tbody>
		{serverMessageRows.map(([type, purpose]) => (
			<ServerMessageRow
				key={type}
				purpose={purpose}
				themeSprings={themeSprings}
				type={type}
			/>
		))}
	</tbody>
);

type ServerMessageRowProps = ThemeProps & {
	type: string;
	purpose: string;
};

const ServerMessageRow = ({
	themeSprings,
	type,
	purpose
}: ServerMessageRowProps) => {
	const rowStyle = tableCellStyle(themeSprings);

	return (
		<tr>
			<animated.td style={rowStyle}>
				<code style={tableCodeStyle}>{type}</code>
			</animated.td>
			<animated.td style={rowStyle}>{purpose}</animated.td>
		</tr>
	);
};

export const StreamingServerMessagesTable = ({
	themeSprings,
	directionLabelStyle
}: StreamingServerMessagesTableProps) => (
	<>
		<div style={directionLabelStyle}>Server &#x2192; Client</div>
		<div style={tableContainerStyle}>
			<animated.table style={tableStyle(themeSprings)}>
				{renderServerMessageHeader(themeSprings)}
				{renderServerMessageBody(themeSprings)}
			</animated.table>
		</div>
	</>
);
