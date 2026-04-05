import { CSSProperties, ReactNode } from 'react';
import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../../types/springTypes';
import { featureCardStyle } from '../../../styles/gradientStyles';

type ExecutionFlowStepProps = {
	num: string;
	text: ReactNode;
	showConnector: boolean;
	themeSprings: ThemeSprings;
};

const stepCircleStyle: CSSProperties = {
	alignItems: 'center',
	background: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
	borderRadius: '50%',
	color: '#fff',
	display: 'flex',
	flexShrink: 0,
	fontSize: '0.75rem',
	fontWeight: 700,
	height: '1.75rem',
	justifyContent: 'center',
	width: '1.75rem'
};

const stepTextStyle: CSSProperties = {
	fontSize: '0.95rem',
	lineHeight: 1.5
};

const connectorStyle = (themeSprings: ThemeSprings) => ({
	borderLeft: themeSprings.themeTertiary.to((c: string) => `2px dashed ${c}`),
	height: '1rem',
	marginLeft: '0.85rem',
	width: '0'
});

export const ExecutionFlowStep = ({
	num,
	text,
	showConnector,
	themeSprings
}: ExecutionFlowStepProps) => (
	<div>
		<animated.div
			style={{
				...featureCardStyle(themeSprings),
				alignItems: 'center',
				display: 'flex',
				gap: '0.75rem',
				padding: '0.75rem 1rem'
			}}
		>
			<div style={stepCircleStyle}>{num}</div>
			<div style={stepTextStyle}>{text}</div>
		</animated.div>
		{showConnector && <animated.div style={connectorStyle(themeSprings)} />}
	</div>
);
