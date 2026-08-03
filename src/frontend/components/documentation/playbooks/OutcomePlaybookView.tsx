import { animated } from '@react-spring/web';
import { CSSProperties, useState } from 'react';
import type {
	OutcomePlaybook,
	PlaybookPackageRole
} from '../../../../types/outcomePlaybook';
import type {
	DocsViewProps,
	ThemeSprings
} from '../../../../types/springTypes';
import { outcomePlaybookById } from '../../../data/documentation/outcomePlaybooks';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import {
	featureCardStyle,
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { DocsTable } from '../../utils/DocsTable';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { PrismPlus } from '../../utils/PrismPlus';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { DocsNavigation } from '../DocsNavigation';

const noOp = () => undefined;
const activeStepWeight = 700;
const inactiveStepWeight = 500;
const phaseLabel: Record<PlaybookPackageRole['phase'], string> = {
	operate: 'Operate',
	production: 'Production',
	required: 'Required'
};

const progressSteps = [
	'Choose',
	'Install',
	'Run',
	'Verify',
	'Harden',
	'Operate'
];

const pillStyle: CSSProperties = {
	border: '1px solid rgba(99, 102, 241, 0.3)',
	borderRadius: '999px',
	fontSize: '0.75rem',
	padding: '0.25rem 0.55rem'
};

const PackageArchitecture = ({
	onNavigate,
	packages,
	themeSprings
}: {
	onNavigate: (view: string) => void;
	packages: PlaybookPackageRole[];
	themeSprings: ThemeSprings;
}) => (
	<div
		aria-label="Package architecture"
		style={{
			display: 'grid',
			gap: '0.8rem',
			gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))'
		}}
	>
		{packages.map((packageRole, index) => (
			<animated.a
				href={`/documentation/${packageRole.view}`}
				key={`${packageRole.role}-${packageRole.name}`}
				onClick={(event) => {
					event.preventDefault();
					onNavigate(packageRole.view);
				}}
				style={{
					...featureCardStyle(themeSprings),
					color: 'inherit',
					position: 'relative',
					textDecoration: 'none'
				}}
			>
				<span style={pillStyle}>{phaseLabel[packageRole.phase]}</span>
				<h3>
					{index + 1}. {packageRole.role}
				</h3>
				<code>{packageRole.name}</code>
				<animated.p
					style={{
						color: themeSprings.contrastSecondary,
						lineHeight: 1.6
					}}
				>
					{packageRole.detail}
				</animated.p>
			</animated.a>
		))}
	</div>
);

const ProgressRail = ({ activeIndex }: { activeIndex: number }) => (
	<ol
		aria-label="Playbook progress"
		style={{
			display: 'flex',
			flexWrap: 'wrap',
			gap: '0.45rem',
			listStyle: 'none',
			margin: '1.25rem 0 0',
			padding: 0
		}}
	>
		{progressSteps.map((step, index) => (
			<li
				key={step}
				style={{
					...pillStyle,
					background:
						index <= activeIndex
							? 'rgba(99, 102, 241, 0.16)'
							: 'transparent',
					fontWeight:
						index === activeIndex
							? activeStepWeight
							: inactiveStepWeight
				}}
			>
				{index + 1}. {step}
			</li>
		))}
	</ol>
);

const QuickstartSteps = ({
	playbook,
	themeSprings
}: {
	playbook: OutcomePlaybook;
	themeSprings: ThemeSprings;
}) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const activeStep = playbook.quickstart[activeIndex];

	return (
		<div style={{ display: 'grid', gap: '1rem' }}>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
				{playbook.quickstart.map((step, index) => (
					<button
						aria-pressed={activeIndex === index}
						key={step.label}
						onClick={() => setActiveIndex(index)}
						style={{
							background:
								activeIndex === index
									? 'rgba(99, 102, 241, 0.16)'
									: 'transparent',
							border: '1px solid rgba(99, 102, 241, 0.3)',
							borderRadius: '0.55rem',
							color: 'inherit',
							cursor: 'pointer',
							padding: '0.6rem 0.8rem'
						}}
						type="button"
					>
						{index + 1}. {step.label}
					</button>
				))}
			</div>
			{activeStep ? (
				<animated.div style={featureCardStyle(themeSprings)}>
					<h3>{activeStep.label}</h3>
					<p>{activeStep.detail}</p>
					<p>
						<strong>Proof of success:</strong> {activeStep.verify}
					</p>
				</animated.div>
			) : null}
			<ProgressRail activeIndex={activeIndex + 2} />
		</div>
	);
};

const BulletCards = ({
	items,
	themeSprings
}: {
	items: string[];
	themeSprings: ThemeSprings;
}) => (
	<div
		style={{
			display: 'grid',
			gap: '0.75rem',
			gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'
		}}
	>
		{items.map((item) => (
			<animated.div key={item} style={featureCardStyle(themeSprings)}>
				{item}
			</animated.div>
		))}
	</div>
);

const tocItems: TocItem[] = [
	{ href: '#architecture', label: 'Architecture' },
	{ href: '#prerequisites', label: 'Prerequisites' },
	{ href: '#install', label: 'Install' },
	{ href: '#run-and-verify', label: 'Run and verify' },
	{ href: '#expected-results', label: 'Expected results' },
	{ href: '#production', label: 'Production substitutions' },
	{ href: '#failure-decisions', label: 'Failure decisions' }
];

export const createOutcomePlaybookView = (playbookId: string) => {
	const OutcomePlaybookPage = (props: DocsViewProps) => {
		const playbook = outcomePlaybookById[playbookId];
		if (!playbook) return null;

		return <OutcomePlaybookView playbook={playbook} {...props} />;
	};

	return OutcomePlaybookPage;
};

const OutcomePlaybookView = ({
	currentPageId,
	isMobileOrTablet,
	onNavigate,
	onTocToggle,
	playbook,
	themeSprings,
	tocOpen
}: DocsViewProps & { playbook: OutcomePlaybook }) => (
	<div
		style={{
			display: 'flex',
			flex: 1,
			minHeight: 0,
			overflowX: 'hidden',
			overflowY: 'auto',
			position: 'relative'
		}}
	>
		<div style={mainContentStyle(isMobileOrTablet)}>
			<animated.div style={heroGradientStyle(themeSprings)}>
				<p style={{ fontWeight: 700, letterSpacing: '0.08em' }}>
					OUTCOME PLAYBOOK
				</p>
				<h1 id={playbook.id} style={h1Style(isMobileOrTablet)}>
					{playbook.title}
				</h1>
				<p style={paragraphLargeStyle}>{playbook.description}</p>
				<ProgressRail activeIndex={0} />
			</animated.div>

			<section style={sectionStyle}>
				<AnchorHeading
					id="architecture"
					level="h2"
					style={gradientHeadingStyle(themeSprings)}
					themeSprings={themeSprings}
				>
					Choose the package boundaries
				</AnchorHeading>
				<p style={paragraphSpacedStyle}>
					Required packages establish the local success path.
					Production and operate packages close durability and
					evidence boundaries.
				</p>
				<PackageArchitecture
					onNavigate={onNavigate}
					packages={playbook.packages}
					themeSprings={themeSprings}
				/>
			</section>

			<section style={sectionStyle}>
				<AnchorHeading
					id="prerequisites"
					level="h2"
					style={gradientHeadingStyle(themeSprings)}
					themeSprings={themeSprings}
				>
					Prerequisites
				</AnchorHeading>
				<BulletCards
					items={playbook.prerequisites}
					themeSprings={themeSprings}
				/>
			</section>

			<section style={sectionStyle}>
				<AnchorHeading
					id="install"
					level="h2"
					style={gradientHeadingStyle(themeSprings)}
					themeSprings={themeSprings}
				>
					Install the complete surface
				</AnchorHeading>
				<PrismPlus
					codeString={playbook.installCommand}
					language="bash"
					showLineNumbers={false}
					themeSprings={themeSprings}
				/>
				<h3>Smallest useful file tree</h3>
				<PrismPlus
					codeString={playbook.fileTree}
					language="text"
					showLineNumbers={false}
					themeSprings={themeSprings}
				/>
			</section>

			<section style={sectionStyle}>
				<AnchorHeading
					id="run-and-verify"
					level="h2"
					style={gradientHeadingStyle(themeSprings)}
					themeSprings={themeSprings}
				>
					Run and verify
				</AnchorHeading>
				<QuickstartSteps
					playbook={playbook}
					themeSprings={themeSprings}
				/>
			</section>

			<section style={sectionStyle}>
				<AnchorHeading
					id="expected-results"
					level="h2"
					style={gradientHeadingStyle(themeSprings)}
					themeSprings={themeSprings}
				>
					Expected results
				</AnchorHeading>
				<BulletCards
					items={playbook.expectedResults}
					themeSprings={themeSprings}
				/>
			</section>

			<section style={sectionStyle}>
				<AnchorHeading
					id="production"
					level="h2"
					style={gradientHeadingStyle(themeSprings)}
					themeSprings={themeSprings}
				>
					Development to production
				</AnchorHeading>
				<DocsTable
					columns={['Development', 'Production', 'Why']}
					rows={playbook.substitutions.map((item) => [
						item.development,
						item.production,
						item.reason
					])}
					themeSprings={themeSprings}
				/>
			</section>

			<section style={sectionStyle}>
				<AnchorHeading
					id="failure-decisions"
					level="h2"
					style={gradientHeadingStyle(themeSprings)}
					themeSprings={themeSprings}
				>
					Failure decisions
				</AnchorHeading>
				<DocsTable
					columns={['Problem', 'Check first', 'Then']}
					rows={playbook.failures.map((failure) => [
						failure.problem,
						failure.check,
						failure.ifTrue
					])}
					themeSprings={themeSprings}
				/>
			</section>

			<DocsNavigation
				currentPageId={currentPageId}
				isMobileOrTablet={isMobileOrTablet}
				onNavigate={onNavigate}
				themeSprings={themeSprings}
			/>
		</div>
		{!isMobileOrTablet ? (
			<TableOfContents items={tocItems} themeSprings={themeSprings} />
		) : null}
		<MobileTableOfContents
			isOpen={tocOpen ?? false}
			items={tocItems}
			onToggle={onTocToggle ?? noOp}
			themeSprings={themeSprings}
		/>
	</div>
);
