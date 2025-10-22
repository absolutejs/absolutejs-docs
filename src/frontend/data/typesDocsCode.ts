// TODO: Fix code samples
export const typesDocsCode = {
    'createConfiguration': `// @noErrors
type CreateConfiguration = {
  assetsDirectory: string;
  authProvider: AuthProvider;
  buildDirectory: string;
  directoryConfig: DirectoryConfiguration;
  databaseEngine: DatabaseEngine;
  frontendDirectories: FrontendDirectories;
  frontends: Frontend[];
  useHTMLScripts: boolean;
  initializeGitNow: boolean;
  installDependenciesNow: boolean;
  codeQualityTool: CodeQualityTool;
  orm: ORM;
  plugins: string[];
  projectName: string;
  tailwind: TailwindConfig;
  useTailwind: boolean;
  databaseDirectory: string | undefined;
  databaseHost: DatabaseHost;
}`,

    'frontendDirectories': `// @noErrors
type FrontendDirectories = Partial<Record<Frontend, string>>

// Example usage:
const directories: FrontendDirectories = {
  react: './src/frontend/react',
  svelte: './src/frontend/svelte',
  vue: './src/frontend/vue'
};`,

    'frontend': `// @noErrors
type Frontend = 'react' | 'svelte' | 'vue' | 'html' | 'htmx' | 'angular'

// Example usage:
const selectedFrameworks: Frontend[] = ['react', 'svelte'];
const primaryFramework: Frontend = 'react';`,

    'tailwindConfig': `// @noErrors
type TailwindConfig = {
  input: string;
  output: string;
} | undefined

// Example usage:
const tailwindConfig: TailwindConfig = {
  input: './src/styles/input.css',
  output: './dist/output.css'
};

// Or disabled:
const noTailwind: TailwindConfig = undefined;`,

    'databaseEngine': `// @noErrors
type DatabaseEngine = 
  | 'postgresql'
  | 'mysql'
  | 'sqlite'
  | 'mongodb'
  | 'none'
  | undefined

// Example usage:
const dbEngine: DatabaseEngine = 'postgresql';
const noDatabase: DatabaseEngine = 'none';`,

    'orm': `// @noErrors
type ORM = 
  | 'drizzle'
  | 'prisma'
  | 'none'
  | undefined

// Example usage:
const selectedORM: ORM = 'drizzle';
const noORM: ORM = 'none';`,

    'authProvider': `// @noErrors
type AuthProvider = 
  | 'github'
  | 'google'
  | 'discord'
  | 'none'
  | undefined

// Example usage:
const provider: AuthProvider = 'github';
const noAuth: AuthProvider = 'none';`,

    'importEntry': `// @noErrors
type ImportEntry = {
  packageName: string;
  isPlugin: boolean;
  config?: Record<string, unknown> | null;
}

// Example usage:
const pluginImport: ImportEntry = {
  packageName: 'absolute-auth',
  isPlugin: true,
  config: {
    providers: ['github', 'google'],
    sessionDuration: 3600
  }
};`,

    'manifestType': `// @noErrors
type Manifest = Record<string, string>

// Example manifest structure:
const manifest: Manifest = {
  'HomeIndex': '/dist/HomeIndex-abc123.js',
  'AboutIndex': '/dist/AboutIndex-def456.js',
  'DashboardIndex': '/dist/DashboardIndex-ghi789.js',
  'styles': '/dist/styles-jkl012.css'
};

// Used with asset() function:
import { asset } from '@absolutejs/absolute';

const homePath = asset(manifest, 'HomeIndex');
// Returns: '/dist/HomeIndex-abc123.js'`,

    'typesWorkingTogether': `// @noErrors
import { build, asset, handleReactPageRequest } from '@absolutejs/absolute';
import type { Manifest } from '@absolutejs/absolute';
import { Elysia } from 'elysia';
import Home from './components/Home';

// Build returns a typed Manifest
const manifest: Manifest = await build({
  assetsDirectory: './src/assets',
  buildDirectory: './dist',
  reactDirectory: './src/frontend/react',
  tailwind: {
    input: './src/styles/input.css',
    output: './dist/output.css'
  }
});

// Manifest is used with asset() - type-safe
const homePath: string = asset(manifest, 'HomeIndex');

// Page handler accepts typed parameters
const app = new Elysia()
  .get('/', () =>
    handleReactPageRequest(
      Home,
      asset(manifest, 'HomeIndex'),
      { title: 'Welcome' }
    )
  )
  .listen(3000);`,

    'buildOptionsType': `// @noErrors
// Build function signature with types
type BuildOptions = {
  assetsDirectory: string;
  buildDirectory: string;
  reactDirectory?: string;
  svelteDirectory?: string;
  vueDirectory?: string;
  htmlDirectory?: string;
  htmxDirectory?: string;
  tailwind?: {
    input: string;
    output: string;
  };
}

// Returns Manifest when using frameworks
function build(options: BuildOptions): Promise<Manifest | void>;

// Example:
const manifest = await build({
  assetsDirectory: './assets',
  buildDirectory: './dist',
  reactDirectory: './src/react' // TypeScript ensures valid paths
});`,

    'packageManager': `// @noErrors
type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun'

// Example usage in configuration:
const config = {
  packageManager: 'bun' as PackageManager,
  installDependenciesNow: true
};

// Supported package managers:
// - npm: Node Package Manager (default)
// - pnpm: Performant npm alternative
// - yarn: Popular alternative package manager
// - bun: Fast all-in-one JavaScript runtime`,

    'typeSafety': `// TypeScript catches errors at compile time
// @noErrors
// ✅ Valid configuration
const validConfig = {
  frontends: ['react', 'svelte'] as Frontend[],
  databaseEngine: 'postgresql' as DatabaseEngine,
  orm: 'drizzle' as ORM
};

// ❌ TypeScript error - invalid frontend
const invalidFrontend = {
  frontends: ['react', 'angular2'] // Error: 'angular2' is not assignable
};

// ❌ TypeScript error - invalid database
const invalidDB = {
  databaseEngine: 'oracle' // Error: 'oracle' is not assignable
};

// ❌ TypeScript error - incompatible ORM
const incompatibleORM = {
  databaseEngine: 'mongodb',
  orm: 'drizzle' // May cause runtime issues
};`
};
