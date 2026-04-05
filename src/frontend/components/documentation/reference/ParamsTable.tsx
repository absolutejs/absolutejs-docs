import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../types/springTypes';
import {
	tableContainerStyle,
	tableStyle,
	tableHeaderStyle
} from '../../../styles/docsStyles';
import { ParamsTableRow } from './ParamsTableRow';

type ParamsTableProps = ThemeProps & {
	params: { param: string; type: string; description: string }[];
};

export const ParamsTable = ({ params, themeSprings }: ParamsTableProps) => (
	<div style={tableContainerStyle}>
		<animated.table style={tableStyle(themeSprings)}>
			<thead>
				<tr>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Parameter
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Type
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Description
					</animated.th>
				</tr>
			</thead>
			<tbody>
				{params.map((paramItem, paramIndex) => (
					<ParamsTableRow
						description={paramItem.description}
						key={paramIndex}
						param={paramItem.param}
						themeSprings={themeSprings}
						type={paramItem.type}
					/>
				))}
			</tbody>
		</animated.table>
	</div>
);
