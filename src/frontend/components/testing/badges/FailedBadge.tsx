import { PiWarningFill } from 'react-icons/pi';
import { badgeStyle } from '../../../styles/testingStyles';

export const FailedBadge = () => (
	<span style={badgeStyle('#e53935')}>
		<PiWarningFill />
	</span>
);
