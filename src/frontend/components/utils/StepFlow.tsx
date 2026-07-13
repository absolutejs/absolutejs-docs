import { animated } from '@react-spring/web';
import { CSSProperties, ReactNode } from 'react';
import { ThemeSprings } from '../../../types/springTypes';
import { primaryColor } from '../../styles/colors';

export type StepFlowStep = {
	actor?: string;
	code?: string;
	description?: ReactNode;
	title: string;
};

type StepFlowProps = {
	steps: StepFlowStep[];
	themeSprings: ThemeSprings;
};

const actorBadgeStyle: CSSProperties = {
	background: 'rgba(99, 102, 241, 0.12)',
	borderRadius: '999px',
	color: primaryColor,
	fontSize: '0.7rem',
	fontWeight: 600,
	letterSpacing: '0.05em',
	padding: '0.15rem 0.6rem',
	textTransform: 'uppercase'
};

const stepNumberStyle: CSSProperties = {
	alignItems: 'center',
	background: `linear-gradient(135deg, ${primaryColor} 0%, #818CF8 100%)`,
	borderRadius: '50%',
	color: '#FFFFFF',
	display: 'flex',
	flexShrink: 0,
	fontSize: '0.85rem',
	fontWeight: 700,
	height: '2rem',
	justifyContent: 'center',
	width: '2rem',
	zIndex: 1
};

export const StepFlow = ({ steps, themeSprings }: StepFlowProps) => (
	<div style={{ margin: '1.5rem 0' }}>
		{steps.map((step, index) => {
			const isLast = index === steps.length - 1;

			return (
				<div key={step.title} style={{ display: 'flex', gap: '1rem' }}>
					<div
						style={{
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'column'
						}}
					>
						<div style={stepNumberStyle}>{index + 1}</div>
						{isLast ? null : (
							<div
								style={{
									background:
										'linear-gradient(180deg, rgba(99,102,241,0.4) 0%, rgba(99,102,241,0.15) 100%)',
									flex: 1,
									minHeight: '1rem',
									width: '2px'
								}}
							/>
						)}
					</div>
					<div
						style={{
							flex: 1,
							minWidth: 0,
							paddingBottom: isLast ? 0 : '1.5rem'
						}}
					>
						<div
							style={{
								alignItems: 'center',
								display: 'flex',
								flexWrap: 'wrap',
								gap: '0.6rem',
								marginBottom: '0.3rem'
							}}
						>
							{step.actor ? (
								<span style={actorBadgeStyle}>
									{step.actor}
								</span>
							) : null}
							<animated.span
								style={{
									color: themeSprings.contrastPrimary,
									fontSize: '1rem',
									fontWeight: 600
								}}
							>
								{step.title}
							</animated.span>
						</div>
						{step.description ? (
							<animated.div
								style={{
									color: themeSprings.contrastSecondary,
									fontSize: '0.95rem',
									lineHeight: 1.65
								}}
							>
								{step.description}
							</animated.div>
						) : null}
						{step.code ? (
							<animated.code
								style={{
									background: 'rgba(99, 102, 241, 0.08)',
									borderRadius: '0.375rem',
									color: themeSprings.contrastPrimary,
									display: 'inline-block',
									fontFamily: 'JetBrains Mono, monospace',
									fontSize: '0.8rem',
									marginTop: '0.5rem',
									maxWidth: '100%',
									overflowX: 'auto',
									padding: '0.35rem 0.75rem',
									whiteSpace: 'pre'
								}}
							>
								{step.code}
							</animated.code>
						) : null}
					</div>
				</div>
			);
		})}
	</div>
);
