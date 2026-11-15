import { ThemeProps } from '../../../../types/springTypes';
import {
	typedManifestAssetUnchecked,
	typedManifestCheck,
	typedManifestGenerated,
	typedManifestKeyType,
	typedManifestTsconfig,
	typedManifestTsconfigFiles
} from '../../../data/documentation/typedManifestKeysDocsCode';
import { paragraphSpacedStyle, sectionStyle } from '../../../styles/docsStyles';
import { gradientHeadingStyle } from '../../../styles/gradientStyles';
import { AnchorHeading } from '../../utils/AnchorHeading';
import { PrismPlus } from '../../utils/PrismPlus';

export const TypedManifestKeysSection = ({ themeSprings }: ThemeProps) => (
	<section style={sectionStyle}>
		<AnchorHeading
			id="typed-manifest-keys"
			level="h2"
			style={gradientHeadingStyle(themeSprings)}
			themeSprings={themeSprings}
		>
			Typed Manifest Keys
		</AnchorHeading>
		<p style={paragraphSpacedStyle}>
			<code>asset(manifest, key)</code> only accepts keys your build
			writes. A misspelled key is a type error instead of a failed request
			at runtime.
		</p>
		<PrismPlus
			codeString={typedManifestCheck}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
		<p style={paragraphSpacedStyle}>
			<code>absolute dev</code>, <code>absolute build</code> and{' '}
			<code>absolute typecheck</code> work out the keys from your pages,
			file routes, stylesheets and island registry without building. They
			write them to <code>.absolutejs/types/manifest.d.ts</code>, which
			adds each key to the <code>AbsoluteManifestKeys</code> interface.
			The dev server rewrites the file when you add or remove a page,
			stylesheet or island.
		</p>
		<PrismPlus
			codeString={typedManifestGenerated}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
		<p style={paragraphSpacedStyle}>
			Keys that depend on bundling, such as a page&apos;s stylesheet, an
			island&apos;s stylesheet or a worker, are accepted whenever the
			build may write them. Shared chunks and self-hosted fonts are typed
			by pattern.
		</p>
		<p style={paragraphSpacedStyle}>
			<code>asset</code> takes a <code>ManifestKey</code>: one of the
			generated keys, or any string when the project has no generated file
			yet. Import the type when you pass keys around.
		</p>
		<PrismPlus
			codeString={typedManifestKeyType}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
		<p style={paragraphSpacedStyle}>
			For a key computed at runtime, use <code>assetUnchecked</code>. It
			does the same lookup without the compile-time check.
		</p>
		<PrismPlus
			codeString={typedManifestAssetUnchecked}
			language="typescript"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
		<p style={paragraphSpacedStyle}>
			<code>absolute typecheck</code> always reads the generated file. For
			the same check in your editor, add{' '}
			<code>.absolutejs/types/manifest.d.ts</code> to <code>include</code>{' '}
			in <code>tsconfig.json</code>. New projects have this already.
		</p>
		<PrismPlus
			codeString={typedManifestTsconfig}
			language="json"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
		<p style={paragraphSpacedStyle}>
			<code>exclude</code> removes files from <code>include</code>, but
			not from <code>files</code>. If your <code>exclude</code> lists{' '}
			<code>.absolutejs</code>, as older projects do, keep it and list the
			file under <code>files</code>. Set <code>include</code> too: with{' '}
			<code>files</code> and no <code>include</code>, TypeScript checks
			only the files listed.
		</p>
		<PrismPlus
			codeString={typedManifestTsconfigFiles}
			language="json"
			showLineNumbers={true}
			themeSprings={themeSprings}
		/>
		<p style={paragraphSpacedStyle}>
			Until the file is part of the program,{' '}
			<code>absolute typecheck</code> prints a note with the change to
			make. The note stops once the change is in place.
		</p>
	</section>
);
