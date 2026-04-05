import { CSSProperties } from 'react';
import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../types/springTypes';
import { tableCellStyle, tableCodeStyle } from '../../../styles/docsStyles';

type HTMXAIEndpointRowProps = {
	color: string;
	desc: string;
	method: string;
	path: string;
	themeSprings: ThemeSprings;
};

const methodBadgeStyle = (color: string): CSSProperties => ({
	borderRadius: '4px',
	color,
	fontFamily: 'JetBrains Mono, monospace',
	fontSize: '0.8rem',
	fontWeight: 700
});

export const HTMXAIEndpointRow = ({
	color,
	desc,
	method,
	path,
	themeSprings
}: HTMXAIEndpointRowProps) => (
	<tr>
		<animated.td style={tableCellStyle(themeSprings)}>
			<span style={methodBadgeStyle(color)}>{method}</span>
		</animated.td>
		<animated.td style={tableCellStyle(themeSprings)}>
			<code style={tableCodeStyle}>{path}</code>
		</animated.td>
		<animated.td style={tableCellStyle(themeSprings)}>{desc}</animated.td>
	</tr>
);
