import { ReactNode } from 'react';
import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const NetworkingHowItWorksList = () => (
	<ul style={{ ...listStyle, marginTop: '1.5rem' }}>
		<HowItWorksItem label="Reads environment">
			: Gets HOST and PORT from your .env file
		</HowItWorksItem>
		<HowItWorksItem label="Checks --host flag">
			: Binds to 0.0.0.0 if --host is passed
		</HowItWorksItem>
		<HowItWorksItem label="Starts server">
			: Calls .listen() internally with the correct configuration
		</HowItWorksItem>
		<HowItWorksItem label="Logs info">
			: Outputs the server URL and network address
		</HowItWorksItem>
	</ul>
);

type HowItWorksItemProps = {
	label: string;
	children: ReactNode;
};

const HowItWorksItem = ({ label, children }: HowItWorksItemProps) => (
	<li style={listItemStyle}>
		<strong style={strongStyle}>{label}</strong>
		{children}
	</li>
);
