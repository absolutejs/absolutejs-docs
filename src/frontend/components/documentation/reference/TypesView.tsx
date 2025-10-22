import { CodeBlock } from '../../utils/CodeBlock';
import { typesDocsCode } from '../../../data/typesDocsCode';
import { h1Style, sectionStyle, headingStyle, paragraphLargeStyle, paragraphSpacedStyle, paragraphStyle, strongStyle, listStyle, listItemStyle, codeWrapperStyle } from '../../../styles/docsStyles';

const createConfiguration = await CodeBlock({ code: typesDocsCode.createConfiguration });
const frontendDirectories = await CodeBlock({ code: typesDocsCode.frontendDirectories });
const frontend = await CodeBlock({ code: typesDocsCode.frontend });
const tailwindConfig = await CodeBlock({ code: typesDocsCode.tailwindConfig });
const databaseEngine = await CodeBlock({ code: typesDocsCode.databaseEngine });
const orm = await CodeBlock({ code: typesDocsCode.orm });
const authProvider = await CodeBlock({ code: typesDocsCode.authProvider });
const importEntry = await CodeBlock({ code: typesDocsCode.importEntry });
const manifestType = await CodeBlock({ code: typesDocsCode.manifestType });
const typesWorkingTogether = await CodeBlock({ code: typesDocsCode.typesWorkingTogether });
const buildOptionsType = await CodeBlock({ code: typesDocsCode.buildOptionsType });
const packageManager = await CodeBlock({ code: typesDocsCode.packageManager });
const typeSafety = await CodeBlock({ code: typesDocsCode.typeSafety });

export const TypesView = () => (
	<div
		style={{
			display: 'flex',
			flex: 1,
			flexDirection: 'column',
			padding: '2rem',
			lineHeight: '1.7',
			overflowX: 'hidden',
			overflowY: 'auto'
		}}
	>
		<link rel='stylesheet' href='https://esm.sh/@shikijs/twoslash@latest/style-rich.css' />
		<h1 style={h1Style}>
			Types
		</h1>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				Overview
			</h2>
			<p style={paragraphLargeStyle}>
				AbsoluteJS uses TypeScript throughout for type safety. The type system ensures valid project setup, prevents invalid framework combinations, and catches configuration errors at compile time.
			</p>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				Type System Philosophy
			</h2>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					<strong style={strongStyle}>Configuration types</strong> ensure valid project setup
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>Frontend directory types</strong> prevent invalid framework combinations
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>Database and ORM types</strong> ensure compatible technology choices
				</li>
				<li style={listItemStyle}>
					The whole system is designed to catch configuration errors at compile time
				</li>
			</ul>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				The Manifest Type
			</h2>
			<p style={paragraphSpacedStyle}>
				The Manifest is a simple object structure mapping names to file paths:
			</p>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					Only exists when framework frontends are used
				</li>
				<li style={listItemStyle}>
					Each key corresponds to a component or page
				</li>
				<li style={listItemStyle}>
					Values are the paths to compiled JavaScript files
				</li>
				<li style={listItemStyle}>
					Used extensively with the <code>asset()</code> function
				</li>
			</ul>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: manifestType }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				CreateConfiguration
			</h2>
			<p style={paragraphSpacedStyle}>
				Main configuration type for project setup:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: createConfiguration }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				FrontendDirectories
			</h2>
			<p style={paragraphSpacedStyle}>
				Maps frontend frameworks to their directory paths:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: frontendDirectories }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				Frontend
			</h2>
			<p style={paragraphSpacedStyle}>
				Available frontend frameworks:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: frontend }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				TailwindConfig
			</h2>
			<p style={paragraphSpacedStyle}>
				Tailwind CSS configuration:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: tailwindConfig }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				DatabaseEngine
			</h2>
			<p style={paragraphSpacedStyle}>
				Supported database engines:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: databaseEngine }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				ORM
			</h2>
			<p style={paragraphSpacedStyle}>
				Supported ORMs:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: orm }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				AuthProvider
			</h2>
			<p style={paragraphSpacedStyle}>
				Authentication providers:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: authProvider }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				ImportEntry
			</h2>
			<p style={paragraphSpacedStyle}>
				Plugin import configuration:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: importEntry }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				PackageManager
			</h2>
			<p style={paragraphSpacedStyle}>
				Supported package managers:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: packageManager }} />
			</div>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					<strong style={strongStyle}>npm</strong>: Node Package Manager (default)
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>pnpm</strong>: Performant npm alternative
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>yarn</strong>: Popular alternative package manager
				</li>
				<li style={listItemStyle}>
					<strong style={strongStyle}>bun</strong>: Fast all-in-one JavaScript runtime and package manager
				</li>
			</ul>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				BuildOptions Type
			</h2>
			<p style={paragraphSpacedStyle}>
				The <code>build()</code> function accepts configuration matching the build options type:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: buildOptionsType }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				How Types Work Together
			</h2>
			<p style={paragraphSpacedStyle}>
				The type system ensures all parts of AbsoluteJS work together seamlessly:
			</p>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					The <code>build()</code> function accepts configuration matching the build options type
				</li>
				<li style={listItemStyle}>
					It returns a manifest when using frameworks
				</li>
				<li style={listItemStyle}>
					Page handlers accept the manifest along with framework-specific parameters
				</li>
				<li style={listItemStyle}>
					The whole system is designed to catch configuration errors at compile time
				</li>
			</ul>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: typesWorkingTogether }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				Type Safety Benefits
			</h2>
			<p style={paragraphSpacedStyle}>
				TypeScript catches configuration errors before runtime:
			</p>
			<div style={codeWrapperStyle}>
				<div dangerouslySetInnerHTML={{ __html: typeSafety }} />
			</div>
		</section>

		<section style={sectionStyle}>
			<h2 style={headingStyle}>
				Key Takeaways
			</h2>
			<ul style={listStyle}>
				<li style={listItemStyle}>
					AbsoluteJS uses TypeScript throughout for comprehensive type safety
				</li>
				<li style={listItemStyle}>
					The Manifest type maps component names to compiled file paths
				</li>
				<li style={listItemStyle}>
					Configuration types prevent invalid combinations of technologies
				</li>
				<li style={listItemStyle}>
					Types work together to ensure compile-time safety
				</li>
				<li style={listItemStyle}>
					All major configuration options have corresponding TypeScript types
				</li>
				<li style={listItemStyle}>
					TypeScript catches errors early, reducing runtime issues
				</li>
			</ul>
		</section>
	</div>
);
