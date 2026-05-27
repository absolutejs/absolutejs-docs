import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import {
	syncGraphBuilder,
	syncGraphComparison,
	syncGraphProblem,
	syncGraphSolution,
	syncGraphWhen
} from '../../../data/documentation/syncGraphDocsCode';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import {
	h1Style,
	mainContentStyle,
	paragraphLargeStyle,
	paragraphSpacedStyle,
	sectionStyle
} from '../../../styles/docsStyles';
import {
	gradientHeadingStyle,
	heroGradientStyle
} from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';
import { MobileTableOfContents } from '../../utils/MobileTableOfContents';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#sync-graph', label: 'Operator-graph queries' },
	{ href: '#problem', label: 'The default-path cost' },
	{ href: '#solution', label: 'defineGraphCollection' },
	{ href: '#builder', label: 'The builder' },
	{ href: '#when', label: 'When to reach for it' },
	{ href: '#numbers', label: 'Head-to-head numbers' }
];

export const SyncGraphCollectionsView = ({
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => {
	const { isSizeOrLess } = useMediaQuery();
	const showDesktopToc = !isMobileOrTablet;

	return (
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
					<h1
						id="sync-graph"
						style={h1Style(isMobileOrTablet)}
					>
						Operator-graph queries
					</h1>
					<p style={paragraphLargeStyle}>
						<code>defineGraphCollection</code> is the path for
						ranged subscriptions over big tables. A declarative
						builder (<code>query(source).filter(...).orderBy(...)</code>){' '}
						compiles into an incremental operator graph: the source's{' '}
						<code>hydrate</code> pushes filters to SQL, and incremental
						changes flow through only the operators they touch — so
						live-update latency stays bounded as the table grows.
					</p>
				</animated.div>

				<section style={sectionStyle}>
					<AnchorHeading
						id="problem"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The default-path cost
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The default <code>defineReactiveQuery</code> path is fine
						for small tables, but its body re-runs on every change to
						the tables it read. With a naïve{' '}
						<code>db.all('tasks').filter(...)</code>, that's O(table
						size) per change — bench-measured at ~580 ms live-update
						latency at 100k rows:
					</p>
					<PrismPlus
						codeString={syncGraphProblem}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="solution"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						<code>defineGraphCollection</code> — bounded live updates
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The graph collection compiles your{' '}
						<code>query(source).orderBy(...)</code> chain into a
						pipeline. The source's <code>hydrate</code> runs the
						filtered SQL once per subscriber; <code>match</code>{' '}
						scopes incremental changes so a row that doesn't belong
						to this subscriber's view never enters its pipeline; the{' '}
						<code>orderBy</code> operator maintains a sorted result
						incrementally:
					</p>
					<PrismPlus
						codeString={syncGraphSolution}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						<strong>The 13.8× win at 100k rows</strong> isn't magic —
						the engine simply stops re-scanning the whole table.
						Cold-subscribe also improves (~2.7× at 100k) because the
						initial snapshot is the filtered SQL result, not the whole
						table.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="builder"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						The builder — filter, map, join, leftJoin, groupBy,
						orderBy
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						The chain is purely declarative; each stage is a
						composable operator the engine wires into the graph:
					</p>
					<PrismPlus
						codeString={syncGraphBuilder}
						language="typescript"
						showLineNumbers={true}
						themeSprings={themeSprings}
					/>
					<p style={paragraphSpacedStyle}>
						Joins and aggregations are equally incremental — adding
						one <code>orderItem</code> updates the matching{' '}
						<code>order</code>'s row in the result, not every order.
						See <code>JoinOptions</code> / <code>GroupByOptions</code>{' '}
						/ <code>OrderByQueryOptions</code> in{' '}
						<code>@absolutejs/sync/engine</code> for the full surface.
					</p>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="when"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						When to reach for it
					</AnchorHeading>
					<PrismPlus
						codeString={syncGraphWhen}
						language="markdown"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>

				<section style={sectionStyle}>
					<AnchorHeading
						id="numbers"
						level="h2"
						style={gradientHeadingStyle(themeSprings)}
						themeSprings={themeSprings}
					>
						Head-to-head numbers (100k-row table)
					</AnchorHeading>
					<p style={paragraphSpacedStyle}>
						Same workload, same engine, same hardware — only the
						query path differs. Full distribution +
						cold-subscribe numbers in{' '}
						<a
							href="https://github.com/absolutejs/benchmarks/blob/main/sync/RESULTS.md"
							rel="noopener noreferrer"
							target="_blank"
						>
							absolutejs/benchmarks/sync/RESULTS.md
						</a>
						:
					</p>
					<PrismPlus
						codeString={syncGraphComparison}
						language="markdown"
						showLineNumbers={false}
						themeSprings={themeSprings}
					/>
				</section>
			</div>
			{showDesktopToc ? (
				<TableOfContents
					items={tocItems}
					themeSprings={themeSprings}
				/>
			) : null}
			<MobileTableOfContents
				items={tocItems}
				isOpen={tocOpen ?? false}
				onToggle={onTocToggle ?? (() => {})}
				themeSprings={themeSprings}
			/>
		</div>
	);
};
