import { animated } from '@react-spring/web';
import { DocsViewProps } from '../../../../types/springTypes';
import { DocumentationViewLayout } from '../DocumentationViewLayout';
import {
	syncAdaptersAutomerge,
	syncAdaptersContract,
	syncAdaptersLoro,
	syncAdaptersYjs
} from '../../../data/documentation/syncAdaptersDocsCode';
import {
	h1Style,
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
import { TocItem } from '../../utils/TableOfContents';

const tocItems: TocItem[] = [
	{ href: '#sync-adapters', label: 'CRDT Adapters' },
	{ href: '#why', label: 'Why adapters' },
	{ href: '#contract', label: 'The contract' },
	{ href: '#yjs', label: 'Yjs' },
	{ href: '#automerge', label: 'Automerge' },
	{ href: '#loro', label: 'Loro' }
];

export const SyncAdaptersView = ({
	themeSprings,
	tocOpen,
	onTocToggle,
	isMobileOrTablet
}: DocsViewProps) => (
	<DocumentationViewLayout
		isMobileOrTablet={isMobileOrTablet}
		items={tocItems}
		onTocToggle={onTocToggle}
		themeSprings={themeSprings}
		tocOpen={tocOpen}
	>
		<animated.div style={heroGradientStyle(themeSprings)}>
			<h1 id="sync-adapters" style={h1Style(isMobileOrTablet)}>
				CRDT Adapters
			</h1>
			<p style={paragraphLargeStyle}>
				Production CRDT backends — Yjs, Automerge, Loro — behind the
				same <code>TextCrdtAdapter</code> contract as the in-package{' '}
				<code>rgaText</code>. Swap one in and every call site stays the
				same.
			</p>
		</animated.div>

		<section style={sectionStyle}>
			<AnchorHeading
				id="why"
				level="h2"
				style={gradientHeadingStyle(themeSprings)}
				themeSprings={themeSprings}
			>
				Why adapters
			</AnchorHeading>
			<p style={paragraphSpacedStyle}>
				<code>@absolutejs/sync/crdt</code> is a small, zero-dependency
				RGA — great for offline-merge and moderate collaboration.
				Production-scale collaborative text wants the things mature CRDT
				libraries solve: efficient binary deltas, tombstone management,
				interleaving guarantees. The <code>sync-adapters</code> repo
				houses first-party- maintained wrappers around the staples so
				the core stays dependency-free and you only install the backend
				you actually use.
			</p>
		</section>

		<section style={sectionStyle}>
			<AnchorHeading
				id="contract"
				level="h2"
				style={gradientHeadingStyle(themeSprings)}
				themeSprings={themeSprings}
			>
				The contract — one shape for every backend
			</AnchorHeading>
			<p style={paragraphSpacedStyle}>
				Every backend (including the first-party RGA) implements{' '}
				<code>TextCrdtAdapter&lt;State&gt;</code>. The client controller
				and server engine only ever talk to that contract, which is why
				swapping one in is a one-line change on each side:
			</p>
			<PrismPlus
				codeString={syncAdaptersContract}
				language="typescript"
				showLineNumbers={true}
				themeSprings={themeSprings}
			/>
		</section>

		<section style={sectionStyle}>
			<AnchorHeading
				id="yjs"
				level="h2"
				style={gradientHeadingStyle(themeSprings)}
				themeSprings={themeSprings}
			>
				<code>@absolutejs/sync-yjs</code> — Yjs
			</AnchorHeading>
			<p style={paragraphSpacedStyle}>
				The most widely-used collaborative CRDT in the web ecosystem.
				The adapter wraps Yjs's <code>Y.Text</code>, serialises state as
				a base64 Yjs update, and implements <code>takeDelta</code> via
				state vectors for true delta uploads:
			</p>
			<PrismPlus
				codeString={syncAdaptersYjs}
				language="typescript"
				showLineNumbers={true}
				themeSprings={themeSprings}
			/>
		</section>

		<section style={sectionStyle}>
			<AnchorHeading
				id="automerge"
				level="h2"
				style={gradientHeadingStyle(themeSprings)}
				themeSprings={themeSprings}
			>
				<code>@absolutejs/sync-automerge</code> — Automerge
			</AnchorHeading>
			<p style={paragraphSpacedStyle}>
				A mature, battle-tested CRDT. The adapter wraps an Automerge doc
				with a single <code>text</code> field and serialises state as a
				base64 Automerge document.
			</p>
			<PrismPlus
				codeString={syncAdaptersAutomerge}
				language="typescript"
				showLineNumbers={true}
				themeSprings={themeSprings}
			/>
		</section>

		<section style={sectionStyle}>
			<AnchorHeading
				id="loro"
				level="h2"
				style={gradientHeadingStyle(themeSprings)}
				themeSprings={themeSprings}
			>
				<code>@absolutejs/sync-loro</code> — Loro
			</AnchorHeading>
			<p style={paragraphSpacedStyle}>
				A fast Rust/wasm CRDT. The adapter wraps a <code>LoroDoc</code>
				's text container and serialises state as a base64 Loro
				snapshot.
			</p>
			<PrismPlus
				codeString={syncAdaptersLoro}
				language="typescript"
				showLineNumbers={true}
				themeSprings={themeSprings}
			/>
		</section>
	</DocumentationViewLayout>
);
