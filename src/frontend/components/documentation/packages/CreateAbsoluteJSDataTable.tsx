import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../types/springTypes';
import {
	tableContainerStyle,
	tableStyle,
	tableHeaderStyle
} from '../../../styles/docsStyles';
import { CreateAbsoluteJSDataTableRow } from './CreateAbsoluteJSDataTableRow';

type CreateAbsoluteJSDataTableItem = {
	code: string;
	description: string;
};

type CreateAbsoluteJSDataTableProps = {
	codeHeader: string;
	rows: CreateAbsoluteJSDataTableItem[];
	themeSprings: ThemeSprings;
};

export const CreateAbsoluteJSDataTable = ({
	codeHeader,
	rows,
	themeSprings
}: CreateAbsoluteJSDataTableProps) => (
	<div style={tableContainerStyle}>
		<animated.table style={tableStyle(themeSprings)}>
			<thead>
				<tr>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						{codeHeader}
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Description
					</animated.th>
				</tr>
			</thead>
			<tbody>
				{rows.map((row, index) => (
					<CreateAbsoluteJSDataTableRow
						code={row.code}
						description={row.description}
						key={index}
						themeSprings={themeSprings}
					/>
				))}
			</tbody>
		</animated.table>
	</div>
);
