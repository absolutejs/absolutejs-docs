import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../types/types';
import {
	legendWrapperStyle,
	legendTitleStyle,
	legendFooterStyle
} from '../../styles/testingStyles';
import { legendData } from '../../data/legendData';
import { LegendKey } from './LegendKey';

export const Legend = ({ themeSprings }: ThemeProps) => (
	<animated.div style={legendWrapperStyle(themeSprings)}>
		<h2 style={legendTitleStyle}>Status Key</h2>
		{legendData.map(({ status, message }) => (
			<LegendKey key={status} status={status} message={message} />
		))}
		<p style={legendFooterStyle}>
			Every test here updates our database in real time, informing all
			users which routes are working.
		</p>
	</animated.div>
);
