import { CSSProperties, ReactNode } from 'react';
import { animated } from '@react-spring/web';
import {
	FaSync,
	FaHeartbeat,
	FaBolt,
	FaShieldAlt,
	FaBroom,
	FaTachometerAlt
} from 'react-icons/fa';
import { ThemeProps } from '../../../../types/springTypes';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { featureCardStyle } from '../../../styles/gradientStyles';

type StreamingConnectionFeaturesProps = ThemeProps;

type ConnectionFeature = {
	desc: string;
	icon: ReactNode;
	title: string;
};

const connFeatureStyle: CSSProperties = {
	alignItems: 'center',
	display: 'flex',
	fontSize: '0.95rem',
	gap: '0.5rem',
	lineHeight: 1.5
};

const connIconStyle: CSSProperties = {
	flexShrink: 0,
	fontSize: '1.1rem'
};

const features: ConnectionFeature[] = [
	{
		desc: 'Exponential backoff on disconnect',
		icon: <FaSync />,
		title: 'Auto-Reconnect'
	},
	{
		desc: 'Ping interval every 30s by default',
		icon: <FaHeartbeat />,
		title: 'Keep-Alive'
	},
	{
		desc: 'Up to 60 reconnect attempts',
		icon: <FaBolt />,
		title: 'Max Retries'
	},
	{
		desc: 'All messages validated with type guards',
		icon: <FaShieldAlt />,
		title: 'Type Validation'
	},
	{
		desc: 'Graceful teardown on component unmount',
		icon: <FaBroom />,
		title: 'Cleanup'
	},
	{
		desc: '1MB threshold for stream buffering',
		icon: <FaTachometerAlt />,
		title: 'Backpressure'
	}
];

export const StreamingConnectionFeatures = ({
	themeSprings
}: StreamingConnectionFeaturesProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');

	return (
		<div
			style={{
				display: 'grid',
				gap: '0.75rem',
				gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
				marginBottom: '1.5rem',
				marginTop: '0.5rem'
			}}
		>
			{features.map((feature) => (
				<animated.div
					key={feature.title}
					style={{
						...featureCardStyle(themeSprings),
						padding: '1rem'
					}}
				>
					<div style={connFeatureStyle}>
						<span style={connIconStyle}>{feature.icon}</span>
						<div>
							<div
								style={{
									fontWeight: 600,
									marginBottom: '0.15rem'
								}}
							>
								{feature.title}
							</div>
							<div
								style={{
									fontSize: '0.85rem',
									opacity: 0.75
								}}
							>
								{feature.desc}
							</div>
						</div>
					</div>
				</animated.div>
			))}
		</div>
	);
};
