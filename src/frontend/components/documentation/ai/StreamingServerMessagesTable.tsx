import { CSSProperties } from 'react';
import { ThemeProps } from '../../../../types/springTypes';
import { DefinitionGrid, DefinitionItem } from '../../utils/DefinitionGrid';

type StreamingServerMessagesTableProps = ThemeProps & {
	directionLabelStyle: CSSProperties;
};

const serverMessageItems: DefinitionItem[] = [
	{
		description: 'Streamed text content fragment',
		term: 'chunk'
	},
	{
		description: 'Extended reasoning token stream',
		term: 'thinking'
	},
	{
		description: 'Tool execution running or complete with result',
		term: 'tool_status'
	},
	{
		description: 'Generated image data (may be partial during streaming)',
		term: 'image'
	},
	{
		description:
			'Response finished with model name, duration, and token usage',
		term: 'complete',
		tone: 'success'
	},
	{
		description: 'Error message from the provider or plugin',
		term: 'error',
		tone: 'error'
	}
];

export const StreamingServerMessagesTable = ({
	themeSprings,
	directionLabelStyle
}: StreamingServerMessagesTableProps) => (
	<>
		<div style={directionLabelStyle}>Server &#x2192; Client</div>
		<DefinitionGrid
			items={serverMessageItems}
			themeSprings={themeSprings}
		/>
	</>
);
