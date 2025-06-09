import { animated } from '@react-spring/web';
import { ThemeProps } from '../../../types/types';
import {
	legendWrapperStyle,
	legendTitleStyle,
	legendGridStyle,
	legendTextStyle,
	legendFooterStyle
} from '../../styles/testingStyles';
import { FailedBadge } from './badges/FailedBadge';
import { MissingBadge } from './badges/MissingBadge';
import { TestedBadge } from './badges/TestedBadge';
import { TestingBadge } from './badges/TestingBadge';
import { UntestedBadge } from './badges/UntestedBadge';

export const Legend = ({ themeSprings }: ThemeProps) => (
	<animated.div style={legendWrapperStyle(themeSprings)}>
		<h2 style={legendTitleStyle}>Status Key</h2>
		<div style={legendGridStyle}>
			<TestedBadge />
			<p style={legendTextStyle}>
				Tested: Verified routes actively working and community-tested.
			</p>

			<UntestedBadge />
			<p style={legendTextStyle}>
				Untested: Pending external or restricted access.
			</p>

			<TestingBadge />
			<p style={legendTextStyle}>
				Testing: Feature currently under development on our end.
			</p>

			<MissingBadge />
			<p style={legendTextStyle}>
				Missing: Functionality not supported by the provider.
			</p>

			<FailedBadge />
			<p style={legendTextStyle}>
				Failed: Library or endpoint issues (not user error).
			</p>
		</div>

		<p style={legendFooterStyle}>
			Every test here updates our database in real time, informing all
			users which routes are working.
		</p>
	</animated.div>
);
