import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';
import { FaFileCode, FaFolder, FaFolderOpen } from 'react-icons/fa';
import { ThemeSprings } from '../../../../types/springTypes';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	containerStyle,
	descriptionStyle,
	fileIconColor,
	folderIconColor,
	guideStyle,
	hoverBgColor,
	iconWrapStyle,
	labelCellStyle,
	nameStyle,
	rowStyle,
	specialFileColor
} from './projectStructureGraphStyles';

type ProjectStructureGraphProps = {
	themeSprings: ThemeSprings;
};

type TreeNode = {
	description?: string;
	indent: number;
	isFile?: boolean;
	isSpecial?: boolean;
	name: string;
};

const treeData: TreeNode[] = [
	{ indent: 0, name: 'my-app' },
	{
		description: 'Build output and compiled assets',
		indent: 1,
		name: 'build'
	},
	{ description: 'DB and ORM related stuff', indent: 1, name: 'db' },
	{ indent: 1, name: 'src' },
	{ indent: 2, name: 'backend' },
	{ description: 'Request handlers', indent: 3, name: 'handlers' },
	{ description: 'Elysia plugins', indent: 3, name: 'plugins' },
	{ description: 'Static assets', indent: 3, name: 'assets' },
	{
		description: 'Elysia server entry point',
		indent: 3,
		isFile: true,
		name: 'server.ts'
	},
	{ indent: 2, name: 'frontend' },
	{ description: 'Page components', indent: 3, name: 'pages' },
	{ description: 'Shared components', indent: 3, name: 'components' },
	{ description: 'CSS and styling files', indent: 3, name: 'styles' },
	{
		description: 'TypeScript type definitions',
		indent: 2,
		name: 'types'
	},
	{
		description: 'AbsoluteJS build configuration',
		indent: 1,
		isFile: true,
		isSpecial: true,
		name: 'absolute.config.ts'
	},
	{ indent: 1, isFile: true, isSpecial: true, name: 'package.json' },
	{ indent: 1, isFile: true, isSpecial: true, name: 'tsconfig.json' },
	{ indent: 1, isFile: true, isSpecial: true, name: '.env' }
];

const getIconColorPair = (node: TreeNode) => {
	if (node.isFile) {
		return node.isSpecial ? specialFileColor : fileIconColor;
	}

	return folderIconColor;
};

const renderRowIcon = (node: TreeNode) => {
	if (node.isFile) {
		return <FaFileCode />;
	}

	return node.indent === 0 ? <FaFolderOpen /> : <FaFolder />;
};

type TreeRowProps = {
	node: TreeNode;
	themeSprings: ThemeSprings;
};

const TreeRow = ({ node, themeSprings }: TreeRowProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const { isSizeOrLess } = useMediaQuery();
	const isMobile = isSizeOrLess('sm');
	const hoverSpring = useSpring({
		backgroundColor: isHovered ? hoverBgColor.dark : 'rgba(99,102,241,0)',
		config: { friction: 20, tension: 300 }
	});

	return (
		<animated.div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{ ...rowStyle(isMobile), ...hoverSpring }}
		>
			<span style={labelCellStyle(isMobile)}>
				{Array.from({ length: node.indent }).map((_, levelIndex) => (
					<animated.span
						key={levelIndex}
						style={guideStyle(themeSprings)}
					/>
				))}
				<animated.span
					style={iconWrapStyle(themeSprings, getIconColorPair(node))}
				>
					{renderRowIcon(node)}
				</animated.span>
				<animated.span
					style={nameStyle(themeSprings, node.indent === 0)}
				>
					{node.name}
					{!node.isFile && '/'}
				</animated.span>
			</span>
			{node.description && (
				<animated.span
					style={descriptionStyle(
						themeSprings,
						node.indent,
						isMobile
					)}
				>
					{node.description}
				</animated.span>
			)}
		</animated.div>
	);
};

export const ProjectStructureGraph = ({
	themeSprings
}: ProjectStructureGraphProps) => (
	<animated.div style={containerStyle(themeSprings)}>
		{treeData.map((node, index) => (
			<TreeRow
				key={`${node.name}-${index}`}
				node={node}
				themeSprings={themeSprings}
			/>
		))}
	</animated.div>
);
