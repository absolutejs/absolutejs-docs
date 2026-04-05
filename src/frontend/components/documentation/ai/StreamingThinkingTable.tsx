import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../../types/springTypes';
import {
	tableContainerStyle,
	tableStyle,
	tableHeaderStyle,
	tableCellStyle
} from '../../../styles/docsStyles';

const thinkingModels = [
	['Claude Opus 4.6', 'Anthropic'],
	['Claude Sonnet 4.6', 'Anthropic'],
	['o3', 'OpenAI'],
	['o4-mini', 'OpenAI'],
	['DeepSeek Reasoner', 'DeepSeek']
];

export const StreamingThinkingTable = ({ themeSprings }: ThemeProps) => (
	<div style={tableContainerStyle}>
		<animated.table style={tableStyle(themeSprings)}>
			<thead>
				<tr>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Model
					</animated.th>
					<animated.th style={tableHeaderStyle(themeSprings)}>
						Provider
					</animated.th>
				</tr>
			</thead>
			<tbody>
				{thinkingModels.map(([model, provider]) => (
					<tr key={model}>
						<animated.td
							style={{
								...tableCellStyle(themeSprings),
								fontWeight: 600
							}}
						>
							{model}
						</animated.td>
						<animated.td style={tableCellStyle(themeSprings)}>
							{provider}
						</animated.td>
					</tr>
				))}
			</tbody>
		</animated.table>
	</div>
);
