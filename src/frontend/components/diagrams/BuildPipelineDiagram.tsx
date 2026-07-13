import { animated } from '@react-spring/web';
import { ThemeSprings } from '../../../types/springTypes';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { BuildPipelineRouteExample } from './BuildPipelineRouteExample';
import {
	arrowStyle,
	assetCardStyle,
	assetDescStyle,
	assetTitleStyle,
	buildCardStyle,
	buildDividerStyle,
	buildStepStyle,
	buildTitleStyle,
	codeTokenStyle,
	diagramTitleStyle,
	inputCardStyle,
	manifestPreStyle,
	outputCardStyle,
	panelHeadingStyle,
	pillListStyle,
	pillStyle,
	pipelineRowStyle,
	sectionLabelStyle,
	usagePanelStyle,
	usageRowStyle
} from './buildPipelineDiagramStyles';
import { diagramContainerStyle } from './diagramStyles';

type BuildPipelineDiagramProps = {
	themeSprings: ThemeSprings;
};

type ThemePanelProps = {
	themeSprings: ThemeSprings;
};

type StackablePanelProps = {
	isStacked: boolean;
	themeSprings: ThemeSprings;
};

const inputDirectories = ['pages/', 'styles/'];

const buildSteps = [
	'Bundles all components',
	'Generates content hashes',
	'Creates asset manifest'
];

const PipelineArrow = ({ isStacked, themeSprings }: StackablePanelProps) => (
	<animated.div
		aria-hidden={true}
		style={arrowStyle(themeSprings, isStacked)}
	>
		→
	</animated.div>
);

const InputPanel = ({ themeSprings }: ThemePanelProps) => (
	<animated.div style={inputCardStyle(themeSprings)}>
		<animated.div style={sectionLabelStyle(themeSprings)}>
			Input
		</animated.div>
		<animated.div style={panelHeadingStyle(themeSprings, 'text')}>
			Frontend Directories
		</animated.div>
		<div style={pillListStyle}>
			{inputDirectories.map((directory) => (
				<animated.div key={directory} style={pillStyle(themeSprings)}>
					{directory}
				</animated.div>
			))}
		</div>
	</animated.div>
);

const BuildPanel = ({ themeSprings }: ThemePanelProps) => (
	<animated.div style={buildCardStyle(themeSprings)}>
		<animated.div style={buildTitleStyle(themeSprings)}>
			build()
		</animated.div>
		<animated.div style={buildDividerStyle(themeSprings)} />
		{buildSteps.map((step) => (
			<animated.div key={step} style={buildStepStyle(themeSprings)}>
				{step}
			</animated.div>
		))}
	</animated.div>
);

const ManifestExample = ({ themeSprings }: ThemePanelProps) => (
	<animated.pre style={manifestPreStyle(themeSprings)}>
		{'{\n  '}
		<animated.span style={codeTokenStyle(themeSprings, 'accent')}>
			HomeIndex
		</animated.span>
		{': '}
		<animated.span style={codeTokenStyle(themeSprings, 'text')}>
			&quot;/build/Home-a1b2c3.js&quot;
		</animated.span>
		{',\n  '}
		<animated.span style={codeTokenStyle(themeSprings, 'accent')}>
			HomeCSS
		</animated.span>
		{': '}
		<animated.span style={codeTokenStyle(themeSprings, 'text')}>
			&quot;/assets/css/home.m93k7s.css&quot;
		</animated.span>
		{'\n}'}
	</animated.pre>
);

const OutputPanel = ({ themeSprings }: ThemePanelProps) => (
	<animated.div style={outputCardStyle(themeSprings)}>
		<animated.div style={sectionLabelStyle(themeSprings)}>
			Output
		</animated.div>
		<animated.div
			style={panelHeadingStyle(themeSprings, 'accentSecondary')}
		>
			Manifest Object
		</animated.div>
		<ManifestExample themeSprings={themeSprings} />
	</animated.div>
);

const AssetCard = ({ themeSprings }: ThemePanelProps) => (
	<animated.div style={assetCardStyle(themeSprings)}>
		<animated.div style={assetTitleStyle(themeSprings)}>
			asset(manifest, key)
		</animated.div>
		<animated.div style={assetDescStyle(themeSprings)}>
			Looks up bundled path from the manifest object
		</animated.div>
	</animated.div>
);

const UsagePanel = ({ isStacked, themeSprings }: StackablePanelProps) => (
	<animated.div style={usagePanelStyle(themeSprings)}>
		<animated.div style={sectionLabelStyle(themeSprings)}>
			Usage
		</animated.div>
		<div style={usageRowStyle(isStacked)}>
			<AssetCard themeSprings={themeSprings} />
			<PipelineArrow isStacked={isStacked} themeSprings={themeSprings} />
			<BuildPipelineRouteExample themeSprings={themeSprings} />
		</div>
	</animated.div>
);

export const BuildPipelineDiagram = ({
	themeSprings
}: BuildPipelineDiagramProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const isStacked = isSizeOrLess('md');

	return (
		<animated.div style={diagramContainerStyle(themeSprings)}>
			<animated.div style={diagramTitleStyle(themeSprings)}>
				Build Pipeline
			</animated.div>
			<div style={pipelineRowStyle(isStacked)}>
				<InputPanel themeSprings={themeSprings} />
				<PipelineArrow
					isStacked={isStacked}
					themeSprings={themeSprings}
				/>
				<BuildPanel themeSprings={themeSprings} />
				<PipelineArrow
					isStacked={isStacked}
					themeSprings={themeSprings}
				/>
				<OutputPanel themeSprings={themeSprings} />
			</div>
			<UsagePanel isStacked={isStacked} themeSprings={themeSprings} />
		</animated.div>
	);
};
