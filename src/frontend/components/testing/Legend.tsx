import { AiOutlineExperiment, AiOutlineMinusCircle } from 'react-icons/ai';
import { FaCheckCircle, FaRegQuestionCircle } from 'react-icons/fa';
import { ImWarning } from 'react-icons/im';
import {
	legendWrapperStyle,
	legendTitleStyle,
	legendGridStyle,
	badgeStyle,
	legendTextStyle,
	legendFooterStyle
} from '../../styles/testingStyles';

export const Legend = () => (
	<div style={legendWrapperStyle}>
		<h2 style={legendTitleStyle}>Status Key</h2>
		<div style={legendGridStyle}>
			<span style={badgeStyle('#4caf50')}>
				<FaCheckCircle />
			</span>
			<p style={legendTextStyle}>
				Tested: Verified routes actively working and community-tested.
			</p>

			<span style={badgeStyle('#888')}>
				<FaRegQuestionCircle />
			</span>
			<p style={legendTextStyle}>
				Untested: Pending external or restricted access.
			</p>

			<span style={badgeStyle('#ff9800')}>
				<AiOutlineExperiment />
			</span>
			<p style={legendTextStyle}>
				Testing: Feature currently under development on our end.
			</p>

			<span style={badgeStyle('#e0e0e0', '#333')}>
				<AiOutlineMinusCircle />
			</span>
			<p style={legendTextStyle}>
				Missing: Functionality not supported by the provider.
			</p>

			<span style={badgeStyle('#e53935')}>
				<ImWarning />
			</span>
			<p style={legendTextStyle}>
				Failed: Library or endpoint issues (not user error).
			</p>
		</div>

		<p style={legendFooterStyle}>
			Every test here updates our database in real time, informing all
			users which routes are working.
		</p>
	</div>
);
