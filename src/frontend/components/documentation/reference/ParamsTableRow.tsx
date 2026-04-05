import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../types/springTypes';
import { tableCellStyle, tableCodeStyle } from '../../../styles/docsStyles';

type ParamsTableRowProps = ThemeProps & {
	param: string;
	type: string;
	description: string;
};

export const ParamsTableRow = ({
	param,
	type,
	description,
	themeSprings
}: ParamsTableRowProps) => (
	<tr>
		<animated.td style={tableCellStyle(themeSprings)}>
			<code style={tableCodeStyle}>{param}</code>
		</animated.td>
		<animated.td style={tableCellStyle(themeSprings)}>
			<code style={tableCodeStyle}>{type}</code>
		</animated.td>
		<animated.td style={tableCellStyle(themeSprings)}>
			{description}
		</animated.td>
	</tr>
);
