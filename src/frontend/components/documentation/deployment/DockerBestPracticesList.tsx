import { ReactNode } from 'react';
import {
	listItemStyle,
	listStyle,
	strongStyle
} from '../../../styles/docsStyles';

export const DockerBestPracticesList = () => (
	<ul style={listStyle}>
		<BestPracticeItem label="Use --frozen-lockfile">
			: Ensures reproducible builds by using exact versions from bun.lockb
		</BestPracticeItem>
		<BestPracticeItem label="Multi-stage builds">
			: Separate build and runtime stages to reduce final image size
		</BestPracticeItem>
		<BestPracticeItem label="Don't run as root">
			: Add a non-root user for better security
		</BestPracticeItem>
		<BestPracticeItem label="Use .dockerignore">
			: Exclude node_modules, .git, and other unnecessary files
		</BestPracticeItem>
		<BestPracticeItem label="Health checks">
			: Add HEALTHCHECK instruction for container orchestration
		</BestPracticeItem>
	</ul>
);

type BestPracticeItemProps = {
	label: string;
	children: ReactNode;
};

const BestPracticeItem = ({ label, children }: BestPracticeItemProps) => (
	<li style={listItemStyle}>
		<strong style={strongStyle}>{label}</strong>
		{children}
	</li>
);
