import { LegendData } from '../../data/legendData';
import { renderBadge } from '../utils/renderBadge';

export const LegendKey = ({ status, message }: LegendData) => (
	<div>
		{renderBadge(status)}
		<p>{message}</p>
	</div>
);
