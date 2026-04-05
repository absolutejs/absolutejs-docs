import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../../types/springTypes';
import { tableCellStyle, tableCodeStyle } from '../../../../styles/docsStyles';

type RouteConfigItem = {
	default: string;
	description: string;
	prop: string;
};

type RouteConfigRowProps = {
	item: RouteConfigItem;
	themeSprings: ThemeSprings;
};

export const RouteConfigRow = ({ item, themeSprings }: RouteConfigRowProps) => (
	<tr>
		<animated.td style={tableCellStyle(themeSprings)}>
			<code style={tableCodeStyle}>{item.prop}</code>
		</animated.td>
		<animated.td style={tableCellStyle(themeSprings)}>
			<code style={tableCodeStyle}>{item.default}</code>
		</animated.td>
		<animated.td style={tableCellStyle(themeSprings)}>
			{item.description}
		</animated.td>
	</tr>
);
