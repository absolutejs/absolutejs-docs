import { animated } from '@react-spring/web';
import { useState } from 'react';
import type {
	PackageDecisionExplanation,
	PackageExplanation,
	PackageFlowExplanation,
	PackageMatrixExplanation
} from '../../../../types/packageDocs';
import type { ThemeSprings } from '../../../../types/springTypes';
import { DocsTable } from '../../utils/DocsTable';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';

type ExplanationProps<T> = {
	explanation: T;
	themeSprings: ThemeSprings;
};

const activeFontWeight = 700;
const inactiveFontWeight = 500;

const choiceButtonStyle = (active: boolean) => ({
	background: active ? 'rgba(99, 102, 241, 0.16)' : 'transparent',
	border: '1px solid rgba(99, 102, 241, 0.3)',
	borderRadius: '0.55rem',
	color: 'inherit',
	cursor: 'pointer',
	fontWeight: active ? activeFontWeight : inactiveFontWeight,
	padding: '0.55rem 0.75rem',
	textAlign: 'left' as const
});

const FlowExplorer = ({
	explanation,
	themeSprings
}: ExplanationProps<PackageFlowExplanation>) => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div style={{ display: 'grid', gap: '0.85rem' }}>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
				{explanation.steps.map((step, index) => (
					<button
						aria-pressed={index === activeIndex}
						key={step.label}
						onClick={() => setActiveIndex(index)}
						style={choiceButtonStyle(index === activeIndex)}
						type="button"
					>
						{index + 1}. {step.label}
					</button>
				))}
			</div>
			<ol
				style={{
					display: 'grid',
					gap: '0.6rem',
					margin: 0,
					padding: 0
				}}
			>
				{explanation.steps.map((step, index) => (
					<animated.li
						key={step.label}
						style={{
							background:
								index === activeIndex
									? 'rgba(99, 102, 241, 0.1)'
									: 'transparent',
							borderLeft: `3px solid ${index === activeIndex ? '#6366F1' : 'rgba(99, 102, 241, 0.2)'}`,
							color: themeSprings.contrastSecondary,
							listStyle: 'none',
							padding: '0.7rem 0.9rem'
						}}
					>
						<strong style={{ color: 'inherit' }}>
							{step.label}
						</strong>
						<br />
						{step.detail}
					</animated.li>
				))}
			</ol>
		</div>
	);
};

const DecisionExplorer = ({
	explanation,
	themeSprings
}: ExplanationProps<PackageDecisionExplanation>) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const activeOption =
		explanation.options[activeIndex] ?? explanation.options[0];

	return (
		<div style={{ display: 'grid', gap: '0.85rem' }}>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
				{explanation.options.map((option, index) => (
					<button
						aria-pressed={index === activeIndex}
						key={option.label}
						onClick={() => setActiveIndex(index)}
						style={choiceButtonStyle(index === activeIndex)}
						type="button"
					>
						{option.label}
					</button>
				))}
			</div>
			{activeOption ? (
				<animated.div
					style={{
						border: '1px solid rgba(99, 102, 241, 0.22)',
						borderRadius: '0.65rem',
						color: themeSprings.contrastSecondary,
						padding: '1rem'
					}}
				>
					<p>
						<strong>Best for:</strong> {activeOption.bestFor}
					</p>
					<p>
						<strong>Tradeoffs:</strong> {activeOption.tradeoffs}
					</p>
					<strong>Requirements</strong>
					<ul>
						{activeOption.requirements.map((requirement) => (
							<li key={requirement}>{requirement}</li>
						))}
					</ul>
				</animated.div>
			) : null}
		</div>
	);
};

const MatrixExplorer = ({
	explanation,
	themeSprings
}: ExplanationProps<PackageMatrixExplanation>) => (
	<DocsTable
		columns={['Option', ...explanation.columns]}
		rows={explanation.rows.map((row) => [row.label, ...row.values])}
		themeSprings={themeSprings}
	/>
);

const ExplanationContent = ({
	explanation,
	themeSprings
}: ExplanationProps<PackageExplanation>) => {
	if (explanation.kind === 'decision')
		return (
			<DecisionExplorer
				explanation={explanation}
				themeSprings={themeSprings}
			/>
		);
	if (explanation.kind === 'matrix')
		return (
			<MatrixExplorer
				explanation={explanation}
				themeSprings={themeSprings}
			/>
		);

	return (
		<FlowExplorer explanation={explanation} themeSprings={themeSprings} />
	);
};

export const PackageExplanationBlocks = ({
	explanations,
	themeSprings
}: {
	explanations: PackageExplanation[];
	themeSprings: ThemeSprings;
}) => (
	<>
		{explanations.map((explanation) => (
			<section key={explanation.id} style={{ margin: '2.25rem 0' }}>
				<AnchorHeading
					id={explanation.id}
					level="h2"
					style={gradientHeadingStyle(themeSprings)}
					themeSprings={themeSprings}
				>
					{explanation.title}
				</AnchorHeading>
				<animated.p
					style={{
						color: themeSprings.contrastSecondary,
						lineHeight: 1.7
					}}
				>
					{explanation.description}
				</animated.p>
				<ExplanationContent
					explanation={explanation}
					themeSprings={themeSprings}
				/>
			</section>
		))}
	</>
);
