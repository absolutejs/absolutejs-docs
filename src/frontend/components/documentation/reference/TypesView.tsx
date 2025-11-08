import {
    createConfiguration,
    frontendDirectories,
    frontend,
    tailwindConfig,
    databaseEngine,
    orm,
    authProvider,
    importEntry,
    manifestType,
    typesWorkingTogether,
    buildOptionsType,
    packageManager,
    typeSafety
} from '../../../data/typesDocsCode';
import * as styles from '../../../styles/docsStyles';
import { TableOfContents, TocItem } from '../../utils/TableOfContents';
import { ThemeProps } from '../../../../types/springTypes';
import { animated } from '@react-spring/web';
import { PrismPlus } from '../../utils/PrismPlus';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

const tocItems: TocItem[] = [
    { label: 'Overview', href: '#overview' },
    { label: 'Type System Philosophy', href: '#type-system-philosophy' },
    { label: 'The Manifest Type', href: '#the-manifest-type' },
    { label: 'CreateConfiguration', href: '#createconfiguration' },
    { label: 'FrontendDirectories', href: '#frontenddirectories' },
    { label: 'Frontend', href: '#frontend' },
    { label: 'TailwindConfig', href: '#tailwindconfig' },
    { label: 'DatabaseEngine', href: '#databaseengine' },
    { label: 'ORM', href: '#orm' },
    { label: 'AuthProvider', href: '#authprovider' },
    { label: 'ImportEntry', href: '#importentry' },
    { label: 'PackageManager', href: '#packagemanager' },
    { label: 'BuildOptions Type', href: '#buildoptions-type' },
    { label: 'How Types Work Together', href: '#how-types-work-together' },
    { label: 'Type Safety Benefits', href: '#type-safety-benefits' },
    { label: 'Key Takeaways', href: '#key-takeaways' }
];

export const TypesView = ({ themeSprings }: ThemeProps) => {
    const { isSizeOrLess } = useMediaQuery();
    const isMobile = isSizeOrLess('sm');

    return (
        <div
            style={{
                display: 'flex',
                flex: 1,
                position: 'relative',
                overflowX: 'hidden',
                overflowY: 'auto'
            }}
        >

            {/* Main Content - Centered */}
            <div
                style={styles.mainContentStyle}
            >
                <h1 style={styles.h1Style} id="types">
                    Types
                </h1>

                <section style={styles.sectionStyle}>
                    <animated.h2 style={styles.headingStyle(themeSprings)} id="overview">
                        Overview
                    </animated.h2>
                    <p style={styles.paragraphLargeStyle}>
                        AbsoluteJS uses TypeScript throughout for type safety. The type system ensures valid project setup, prevents invalid framework combinations, and catches configuration errors at compile time.
                    </p>
                </section>

                <section style={styles.sectionStyle}>
                    <animated.h2 style={styles.headingStyle(themeSprings)} id="type-system-philosophy">
                        Type System Philosophy
                    </animated.h2>
                    <ul style={styles.listStyle}>
                        <li style={styles.listItemStyle}>
                            <strong style={styles.strongStyle}>Configuration types</strong> ensure valid project setup
                        </li>
                        <li style={styles.listItemStyle}>
                            <strong style={styles.strongStyle}>Frontend directory types</strong> prevent invalid framework combinations
                        </li>
                        <li style={styles.listItemStyle}>
                            <strong style={styles.strongStyle}>Database and ORM types</strong> ensure compatible technology choices
                        </li>
                        <li style={styles.listItemStyle}>
                            The whole system is designed to catch configuration errors at compile time
                        </li>
                    </ul>
                </section>

                <section style={styles.sectionStyle}>
                    <animated.h2 style={styles.headingStyle(themeSprings)} id="the-manifest-type">
                        The Manifest Type
                    </animated.h2>
                    <p style={styles.paragraphSpacedStyle}>
                        The Manifest is a simple object structure mapping names to file paths:
                    </p>
                    <ul style={styles.listStyle}>
                        <li style={styles.listItemStyle}>
                            Only exists when framework frontends are used
                        </li>
                        <li style={styles.listItemStyle}>
                            Each key corresponds to a component or page
                        </li>
                        <li style={styles.listItemStyle}>
                            Values are the paths to compiled JavaScript files
                        </li>
                        <li style={styles.listItemStyle}>
                            Used extensively with the <code>asset()</code> function
                        </li>
                    </ul>
                    <PrismPlus codeString={manifestType} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
                </section>

                <section style={styles.sectionStyle}>
                    <animated.h2 style={styles.headingStyle(themeSprings)} id="createconfiguration">
                        CreateConfiguration
                    </animated.h2>
                    <p style={styles.paragraphSpacedStyle}>
                        Main configuration type for project setup:
                    </p>
                    <PrismPlus codeString={createConfiguration} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
                </section>

                <section style={styles.sectionStyle}>
                    <animated.h2 style={styles.headingStyle(themeSprings)} id="frontenddirectories">
                        FrontendDirectories
                    </animated.h2>
                    <p style={styles.paragraphSpacedStyle}>
                        Maps frontend frameworks to their directory paths:
                    </p>
                    <PrismPlus codeString={frontendDirectories} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
                </section>

                <section style={styles.sectionStyle}>
                    <animated.h2 style={styles.headingStyle(themeSprings)} id="frontend">
                        Frontend
                    </animated.h2>
                    <p style={styles.paragraphSpacedStyle}>
                        Available frontend frameworks:
                    </p>
                    <PrismPlus codeString={frontend} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
                </section>

                <section style={styles.sectionStyle}>
                    <animated.h2 style={styles.headingStyle(themeSprings)} id="tailwindconfig">
                        TailwindConfig
                    </animated.h2>
                    <p style={styles.paragraphSpacedStyle}>
                        Tailwind CSS configuration:
                    </p>
                    <PrismPlus codeString={tailwindConfig} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
                </section>

                <section style={styles.sectionStyle}>
                    <animated.h2 style={styles.headingStyle(themeSprings)} id="databaseengine">
                        DatabaseEngine
                    </animated.h2>
                    <p style={styles.paragraphSpacedStyle}>
                        Supported database engines:
                    </p>
                    <PrismPlus codeString={databaseEngine} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
                </section>

                <section style={styles.sectionStyle}>
                    <animated.h2 style={styles.headingStyle(themeSprings)} id="orm">
                        ORM
                    </animated.h2>
                    <p style={styles.paragraphSpacedStyle}>
                        Supported ORMs:
                    </p>
                    <PrismPlus codeString={orm} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
                </section>

                <section style={styles.sectionStyle}>
                    <animated.h2 style={styles.headingStyle(themeSprings)} id="authprovider">
                        AuthProvider
                    </animated.h2>
                    <p style={styles.paragraphSpacedStyle}>
                        Authentication providers:
                    </p>
                    <PrismPlus codeString={authProvider} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
                </section>

                <section style={styles.sectionStyle}>
                    <animated.h2 style={styles.headingStyle(themeSprings)} id="importentry">
                        ImportEntry
                    </animated.h2>
                    <p style={styles.paragraphSpacedStyle}>
                        Plugin import configuration:
                    </p>
                    <PrismPlus codeString={importEntry} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
                </section>

                <section style={styles.sectionStyle}>
                    <animated.h2 style={styles.headingStyle(themeSprings)} id="packagemanager">
                        PackageManager
                    </animated.h2>
                    <p style={styles.paragraphSpacedStyle}>
                        Supported package managers:
                    </p>
                    <PrismPlus codeString={packageManager} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
                    <ul style={styles.listStyle}>
                        <li style={styles.listItemStyle}>
                            <strong style={styles.strongStyle}>npm</strong>: Node Package Manager (default)
                        </li>
                        <li style={styles.listItemStyle}>
                            <strong style={styles.strongStyle}>pnpm</strong>: Performant npm alternative
                        </li>
                        <li style={styles.listItemStyle}>
                            <strong style={styles.strongStyle}>yarn</strong>: Popular alternative package manager
                        </li>
                        <li style={styles.listItemStyle}>
                            <strong style={styles.strongStyle}>bun</strong>: Fast all-in-one JavaScript runtime and package manager
                        </li>
                    </ul>
                </section>

                <section style={styles.sectionStyle}>
                    <animated.h2 style={styles.headingStyle(themeSprings)} id="buildoptions-type">
                        BuildOptions Type
                    </animated.h2>
                    <p style={styles.paragraphSpacedStyle}>
                        The <code>build()</code> function accepts configuration matching the build options type:
                    </p>
                    <PrismPlus codeString={buildOptionsType} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
                </section>

                <section style={styles.sectionStyle}>
                    <animated.h2 style={styles.headingStyle(themeSprings)} id="how-types-work-together">
                        How Types Work Together
                    </animated.h2>
                    <p style={styles.paragraphSpacedStyle}>
                        The type system ensures all parts of AbsoluteJS work together seamlessly:
                    </p>
                    <ul style={styles.listStyle}>
                        <li style={styles.listItemStyle}>
                            The <code>build()</code> function accepts configuration matching the build options type
                        </li>
                        <li style={styles.listItemStyle}>
                            It returns a manifest when using frameworks
                        </li>
                        <li style={styles.listItemStyle}>
                            Page handlers accept the manifest along with framework-specific parameters
                        </li>
                        <li style={styles.listItemStyle}>
                            The whole system is designed to catch configuration errors at compile time
                        </li>
                    </ul>
                    <PrismPlus codeString={typesWorkingTogether} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
                </section>

                <section style={styles.sectionStyle}>
                    <animated.h2 style={styles.headingStyle(themeSprings)} id="type-safety-benefits">
                        Type Safety Benefits
                    </animated.h2>
                    <p style={styles.paragraphSpacedStyle}>
                        TypeScript catches configuration errors before runtime:
                    </p>
                    <PrismPlus codeString={typeSafety} language="typescript" showLineNumbers={false} themeSprings={themeSprings} />
                </section>

                <section style={styles.sectionStyle}>
                    <animated.h2 style={styles.headingStyle(themeSprings)} id="key-takeaways">
                        Key Takeaways
                    </animated.h2>
                    <ul style={styles.listStyle}>
                        <li style={styles.listItemStyle}>
                            AbsoluteJS uses TypeScript throughout for comprehensive type safety
                        </li>
                        <li style={styles.listItemStyle}>
                            The Manifest type maps component names to compiled file paths
                        </li>
                        <li style={styles.listItemStyle}>
                            Configuration types prevent invalid combinations of technologies
                        </li>
                        <li style={styles.listItemStyle}>
                            Types work together to ensure compile-time safety
                        </li>
                        <li style={styles.listItemStyle}>
                            All major configuration options have corresponding TypeScript types
                        </li>
                        <li style={styles.listItemStyle}>
                            TypeScript catches errors early, reducing runtime issues
                        </li>
                    </ul>
                </section>
            </div>

            {!isMobile && <TableOfContents themeSprings={themeSprings} items={tocItems} />}
        </div>
    );
}