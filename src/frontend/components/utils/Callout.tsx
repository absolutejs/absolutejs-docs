import { animated } from '@react-spring/web';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import {
	FaCheckCircle,
	FaExclamationTriangle,
	FaInfoCircle,
	FaLightbulb
} from 'react-icons/fa';
import { ThemeSprings } from '../../../types/springTypes';

export type CalloutVariant = 'info' | 'note' | 'success' | 'warning';

type CalloutVariantConfig = {
	accent: string;
	background: string;
	icon: IconType;
};

const variantConfig: Record<CalloutVariant, CalloutVariantConfig> = {
	info: {
		accent: '#6366F1',
		background: 'rgba(99, 102, 241, 0.08)',
		icon: FaInfoCircle
	},
	note: {
		accent: '#8B5CF6',
		background: 'rgba(139, 92, 246, 0.08)',
		icon: FaLightbulb
	},
	success: {
		accent: '#10B981',
		background: 'rgba(16, 185, 129, 0.08)',
		icon: FaCheckCircle
	},
	warning: {
		accent: '#F59E0B',
		background: 'rgba(245, 158, 11, 0.08)',
		icon: FaExclamationTriangle
	}
};

type CalloutProps = {
	children: ReactNode;
	themeSprings: ThemeSprings;
	title?: string;
	variant?: CalloutVariant;
};

export const Callout = ({
	children,
	themeSprings,
	title,
	variant = 'info'
}: CalloutProps) => {
	const { accent, background, icon: Icon } = variantConfig[variant];

	return (
		<animated.div
			style={{
				background,
				borderLeft: `3px solid ${accent}`,
				borderRadius: '0.5rem',
				color: themeSprings.contrastPrimary,
				display: 'flex',
				gap: '0.75rem',
				margin: '1rem 0 1.5rem',
				padding: '1rem 1.25rem'
			}}
		>
			<span
				style={{
					color: accent,
					flexShrink: 0,
					fontSize: '1.1rem',
					lineHeight: 1,
					paddingTop: '0.2rem'
				}}
			>
				<Icon />
			</span>
			<div style={{ minWidth: 0 }}>
				{title ? (
					<div
						style={{
							fontSize: '0.95rem',
							fontWeight: 600,
							marginBottom: '0.35rem'
						}}
					>
						{title}
					</div>
				) : null}
				<div style={{ fontSize: '0.95rem', lineHeight: 1.65 }}>
					{children}
				</div>
			</div>
		</animated.div>
	);
};
