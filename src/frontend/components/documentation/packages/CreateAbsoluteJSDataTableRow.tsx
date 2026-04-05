import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../types/springTypes';
import { tableCellStyle, tableCodeStyle } from '../../../styles/docsStyles';

type CreateAbsoluteJSDataTableRowProps = {
	code: string;
	description: string;
	themeSprings: ThemeSprings;
};

export const CreateAbsoluteJSDataTableRow = ({
	code,
	description,
	themeSprings
}: CreateAbsoluteJSDataTableRowProps) => (
	<tr>
		<animated.td style={tableCellStyle(themeSprings)}>
			<code style={tableCodeStyle}>{code}</code>
		</animated.td>
		<animated.td style={tableCellStyle(themeSprings)}>
			{description}
		</animated.td>
	</tr>
);
