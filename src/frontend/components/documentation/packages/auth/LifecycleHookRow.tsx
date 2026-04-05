import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../../types/springTypes';
import { tableCellStyle, tableCodeStyle } from '../../../../styles/docsStyles';

type LifecycleHookItem = {
	description: string;
	hook: string;
};

type LifecycleHookRowProps = {
	item: LifecycleHookItem;
	themeSprings: ThemeSprings;
};

export const LifecycleHookRow = ({
	item,
	themeSprings
}: LifecycleHookRowProps) => (
	<tr>
		<animated.td style={tableCellStyle(themeSprings)}>
			<code style={tableCodeStyle}>{item.hook}</code>
		</animated.td>
		<animated.td style={tableCellStyle(themeSprings)}>
			{item.description}
		</animated.td>
	</tr>
);
