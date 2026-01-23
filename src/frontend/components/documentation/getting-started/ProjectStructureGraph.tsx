import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';
import { ThemeSprings } from '../../../../types/springTypes';
import {
	containerStyle,
	descriptionColor,
	fileIconColor,
	folderIconColor,
	hoverBgColor,
	lineColor,
	specialFileColor,
	svgStyle,
	textColor
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
	{ indent: 1, isFile: true, isSpecial: true, name: 'package.json' },
	{ indent: 1, isFile: true, isSpecial: true, name: 'tsconfig.json' },
	{ indent: 1, isFile: true, isSpecial: true, name: '.env' }
];

const FolderIcon = ({ color }: { color: string }) => (
	<g>
		<path
			d="M2 4c0-1.1.9-2 2-2h4l2 2h6c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4z"
			fill={color}
			opacity={0.2}
		/>
		<path
			d="M2 4c0-1.1.9-2 2-2h4l2 2h6c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4z"
			fill="none"
			stroke={color}
			strokeLinejoin="round"
			strokeWidth={1.5}
		/>
	</g>
);

const FileIcon = ({ color }: { color: string }) => (
	<g>
		<path
			d="M4 2h8l4 4v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2z"
			fill={color}
			opacity={0.15}
		/>
		<path
			d="M4 2h8l4 4v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2z"
			fill="none"
			stroke={color}
			strokeLinejoin="round"
			strokeWidth={1.5}
		/>
		<path d="M12 2v4h4" fill="none" stroke={color} strokeWidth={1.5} />
	</g>
);

const TreeRow = ({
	index,
	isDark,
	node,
	totalNodes
}: {
	index: number;
	isDark: boolean;
	node: TreeNode;
	totalNodes: number;
}) => {
	const [isHovered, setIsHovered] = useState(false);

	const hoverSpring = useSpring({
		config: { friction: 20, tension: 300 },
		opacity: isHovered ? 1 : 0
	});

	const rowHeight = 36;
	const y = index * rowHeight;
	const x = 24 + node.indent * 28;
	const iconSize = 18;

	const iconColor = node.isFile
		? node.isSpecial
			? isDark
				? specialFileColor.dark
				: specialFileColor.light
			: isDark
				? fileIconColor.dark
				: fileIconColor.light
		: isDark
			? folderIconColor.dark
			: folderIconColor.light;

	const currentTextColor = isDark ? textColor.dark : textColor.light;
	const currentDescColor = isDark
		? descriptionColor.dark
		: descriptionColor.light;
	const currentLineColor = isDark ? lineColor.dark : lineColor.light;
	const currentHoverBg = isDark ? hoverBgColor.dark : hoverBgColor.light;

	return (
		<g
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{ cursor: 'default' }}
		>
			<animated.rect
				fill={currentHoverBg}
				height={rowHeight}
				opacity={hoverSpring.opacity}
				rx={4}
				width="calc(100% - 16px)"
				x={8}
				y={y}
			/>

			{node.indent > 0 &&
				Array.from({ length: node.indent }).map((_, i) => (
					<line
						key={i}
						stroke={currentLineColor}
						strokeDasharray="2,2"
						strokeWidth={1}
						x1={38 + i * 28}
						x2={38 + i * 28}
						y1={y}
						y2={y + rowHeight}
					/>
				))}

			{node.indent > 0 && (
				<path
					d={`M ${10 + node.indent * 28} ${y + rowHeight / 2} L ${x - 4} ${y + rowHeight / 2}`}
					fill="none"
					stroke={currentLineColor}
					strokeWidth={1}
				/>
			)}

			<g transform={`translate(${x}, ${y + (rowHeight - iconSize) / 2})`}>
				<svg height={iconSize} viewBox="0 0 18 18" width={iconSize}>
					{node.isFile ? (
						<FileIcon color={iconColor} />
					) : (
						<FolderIcon color={iconColor} />
					)}
				</svg>
			</g>

			<text
				dominantBaseline="middle"
				fill={currentTextColor}
				fontFamily="'SF Mono', 'Fira Code', 'Monaco', monospace"
				fontSize={14}
				fontWeight={node.indent === 0 ? 600 : 400}
				x={x + iconSize + 8}
				y={y + rowHeight / 2}
			>
				{node.name}
				{!node.isFile && '/'}
			</text>

			{node.description && (
				<text
					dominantBaseline="middle"
					fill={currentDescColor}
					fontFamily="'Inter', -apple-system, sans-serif"
					fontSize={12}
					x={340}
					y={y + rowHeight / 2}
				>
					{node.description}
				</text>
			)}
		</g>
	);
};

export const ProjectStructureGraph = ({
	themeSprings
}: ProjectStructureGraphProps) => {
	const rowHeight = 36;
	const svgHeight = treeData.length * rowHeight + 16;

	return (
		<animated.div style={containerStyle(themeSprings)}>
			<svg
				preserveAspectRatio="xMinYMin meet"
				style={svgStyle}
				viewBox={`0 0 650 ${svgHeight}`}
			>
				{treeData.map((node, index) => (
					<TreeRow
						index={index}
						isDark={
							themeSprings.theme
								.get()
								?.toString()
								.endsWith('dark') ?? true
						}
						key={`${node.name}-${index}`}
						node={node}
						totalNodes={treeData.length}
					/>
				))}
			</svg>
		</animated.div>
	);
};
