import { useState } from 'react';
import { PROVIDER_STATUSES } from '../../../constants';
import { ThemeProps } from '../../../types/springTypes';
import { legendData } from '../../data/legendData';
import { renderBadge } from '../utils/renderBadge';

type StatusColors = {
	arrowColor: string;
	bg: string;
	text: string;
	tooltipBg: string;
};

const STATUS_COLORS: Record<string, StatusColors> = {
	failed: {
		arrowColor: '#B71C1C',
		bg: 'rgba(229, 57, 53, 0.12)',
		text: '#e53935',
		tooltipBg:
			'linear-gradient(135deg, #C62828 0%, #B71C1C 50%, #8E0000 100%)'
	},
	missing: {
		arrowColor: '#455A64',
		bg: 'rgba(158, 158, 158, 0.15)',
		text: '#757575',
		tooltipBg:
			'linear-gradient(135deg, #546E7A 0%, #455A64 50%, #37474F 100%)'
	},
	tested: {
		arrowColor: '#2E7D32',
		bg: 'rgba(76, 175, 80, 0.12)',
		text: '#4caf50',
		tooltipBg:
			'linear-gradient(135deg, #388E3C 0%, #2E7D32 50%, #1B5E20 100%)'
	},
	testing: {
		arrowColor: '#EF6C00',
		bg: 'rgba(255, 152, 0, 0.12)',
		text: '#ff9800',
		tooltipBg:
			'linear-gradient(135deg, #F57C00 0%, #EF6C00 50%, #E65100 100%)'
	},
	untested: {
		arrowColor: '#525252',
		bg: 'rgba(136, 136, 136, 0.12)',
		text: '#888888',
		tooltipBg:
			'linear-gradient(135deg, #616161 0%, #525252 50%, #424242 100%)'
	}
};

const DEFAULT_COLORS: StatusColors = {
	arrowColor: '#525252',
	bg: 'rgba(136, 136, 136, 0.12)',
	text: '#888888',
	tooltipBg: 'linear-gradient(135deg, #616161 0%, #525252 50%, #424242 100%)'
};

type LegendPillProps = {
	status: (typeof PROVIDER_STATUSES)[number];
	message: string;
};

const LegendPill = ({ status, message }: LegendPillProps) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const colors = STATUS_COLORS[status] ?? DEFAULT_COLORS;

	return (
		<div
			style={{
				position: 'relative'
			}}
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}
		>
			<div
				style={{
					alignItems: 'center',
					backgroundColor: colors.bg,
					borderRadius: '100px',
					cursor: 'help',
					display: 'flex',
					fontSize: '0.8125rem',
					fontWeight: 500,
					gap: '0.5rem',
					padding: '0.5rem 1rem 0.5rem 0.625rem'
				}}
			>
				{renderBadge(status)}
				<span
					style={{
						color: colors.text,
						textTransform: 'capitalize'
					}}
				>
					{status}
				</span>
			</div>
			{showTooltip && (
				<div
					style={{
						background: colors.tooltipBg,
						borderRadius: '8px',
						bottom: '100%',
						boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
						color: '#fff',
						fontSize: '0.8125rem',
						fontWeight: 400,
						left: '50%',
						lineHeight: 1.5,
						marginBottom: '8px',
						padding: '12px 16px',
						position: 'absolute',
						textAlign: 'center',
						transform: 'translateX(-50%)',
						whiteSpace: 'normal',
						width: '280px',
						zIndex: 10
					}}
				>
					{message}
					<div
						style={{
							borderLeft: '6px solid transparent',
							borderRight: '6px solid transparent',
							borderTop: `6px solid ${colors.arrowColor}`,
							bottom: '-6px',
							height: 0,
							left: '50%',
							position: 'absolute',
							transform: 'translateX(-50%)',
							width: 0
						}}
					/>
				</div>
			)}
		</div>
	);
};

export const Legend = ({ themeSprings }: ThemeProps) => (
	<nav
		style={{
			alignItems: 'center',
			display: 'flex',
			flexWrap: 'wrap',
			gap: '0.75rem',
			justifyContent: 'center',
			margin: '0 auto 2.5rem',
			maxWidth: '900px',
			padding: '0 1rem'
		}}
	>
		{legendData.map(({ status, message }) => (
			<LegendPill key={status} status={status} message={message} />
		))}
	</nav>
);
