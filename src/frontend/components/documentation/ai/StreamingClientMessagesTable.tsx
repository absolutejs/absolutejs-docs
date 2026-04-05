import { CSSProperties, ReactNode } from 'react';
import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../types/springTypes';
import {
	tableContainerStyle,
	tableStyle,
	tableHeaderStyle,
	tableCellStyle,
	tableCodeStyle
} from '../../../styles/docsStyles';

type StreamingClientMessagesTableProps = ThemeProps & {
	directionLabelStyle: CSSProperties;
};

type ClientMessageData = {
	fields: ReactNode;
	purpose: string;
	type: string;
};

type ClientMessageRowProps = ThemeProps & ClientMessageData;

const clientMessageRows: ClientMessageData[] = [
	{
		fields: (
			<>
				<code style={tableCodeStyle}>content</code>,{' '}
				<code style={tableCodeStyle}>attachments?</code>
			</>
		),
		purpose: 'Send a message with optional file attachments',
		type: 'message'
	},
	{
		fields: <code style={tableCodeStyle}>conversationId</code>,
		purpose: 'Stop a streaming response',
		type: 'cancel'
	},
	{
		fields: (
			<>
				<code style={tableCodeStyle}>messageId</code>,{' '}
				<code style={tableCodeStyle}>content</code>
			</>
		),
		purpose: 'Fork conversation from a specific message',
		type: 'branch'
	}
];

const renderClientMessageHeader = (
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
			<animated.th style={tableHeaderStyle(themeSprings)}>
				Key Fields
			</animated.th>
		</tr>
	</thead>
);

const renderClientMessageBody = (themeSprings: ThemeProps['themeSprings']) => (
	<tbody>
		{clientMessageRows.map((row) => (
			<ClientMessageRow
				fields={row.fields}
				key={row.type}
				purpose={row.purpose}
				themeSprings={themeSprings}
				type={row.type}
			/>
		))}
	</tbody>
);

const ClientMessageRow = ({
	themeSprings,
	type,
	purpose,
	fields
}: ClientMessageRowProps) => {
	const rowStyle = tableCellStyle(themeSprings);

	return (
		<tr>
			<animated.td style={rowStyle}>
				<code style={tableCodeStyle}>{type}</code>
			</animated.td>
			<animated.td style={rowStyle}>{purpose}</animated.td>
			<animated.td style={rowStyle}>{fields}</animated.td>
		</tr>
	);
};

export const StreamingClientMessagesTable = ({
	themeSprings,
	directionLabelStyle
}: StreamingClientMessagesTableProps) => (
	<>
		<div style={directionLabelStyle}>Client &#x2192; Server</div>
		<div style={tableContainerStyle}>
			<animated.table style={tableStyle(themeSprings)}>
				{renderClientMessageHeader(themeSprings)}
				{renderClientMessageBody(themeSprings)}
			</animated.table>
		</div>
	</>
);
