import { PackageDocData } from '../../../../types/packageDocs';

export const studioPackageData: PackageDocData = {
	category: 'Dev Tools',
	description:
		'A sandboxed visual IDE for AbsoluteJS projects. The studio CLI spawns your project’s dev server as a managed subprocess and serves an editor UI beside it: the running app is proxied into a canvas with a click-to-inspect overlay that maps any element back to its source file and line, a Monaco editor edits that source in the browser and saves straight to disk, and a scaffolding engine creates new pages across React, Svelte, Vue, HTML, HTMX, and Angular — writing the page file, injecting the route into server.ts, and updating absolute.config.ts for you.',
	features: [
		{
			description:
				'Your app’s dev server is proxied into the studio canvas. An injected overlay lets you click any element to inspect its tag, props, and styles — and, when source location is available, jump straight to that file and line in VS Code or Cursor.',
			title: 'Live preview with click-to-inspect'
		},
		{
			description:
				'Create a page in React, Svelte, Vue, HTML, HTMX, or Angular from one dialog. Studio writes the page from a framework template, injects the route into server.ts, updates absolute.config.ts, and installs any missing framework dependencies.',
			title: 'Six-framework page scaffolding'
		},
		{
			description:
				'A Monaco editor with custom JSX, Svelte, and Vue SFC syntax highlighting, project type definitions loaded for IntelliSense, and local imports resolved — saving writes the file back to disk and the dev server hot-reloads.',
			title: 'In-browser code editing'
		},
		{
			description:
				'Compose pages from built-in blocks — text, heading, hero, button, image, columns, spacer, code, and raw HTML — each with a typed prop editor and a style editor panel.',
			title: 'Block palette'
		},
		{
			description:
				'Pointed at an empty directory, Studio runs the create-absolutejs wizard from the browser with live per-step progress, then boots the freshly scaffolded app’s dev server.',
			title: 'Scaffold wizard'
		},
		{
			description:
				'The CLI clears stale ports, spawns your project’s dev script as a subprocess, streams its logs, and gives you restart, open-in-browser, clear, and quit hotkeys — plus an asset browser and a package-script runner inside the UI.',
			title: 'Managed dev server'
		}
	],
	installCommand: 'bun run studio',
	name: 'Studio',
	notes: [
		{
			body: 'Studio ships as part of the AbsoluteJS platform and is not published to npm yet (private, v0.0.0). Run it from the repo with bun run studio, which builds the editor UI and opens it against the bundled example project on port 3625.',
			title: 'Not on npm yet',
			variant: 'warning'
		}
	],
	npmName: '@absolutejs/studio',
	samples: [
		{
			code: `# from the studio repo (not on npm yet)
bun run studio        # build the editor UI, then open it on the example app

# or point the CLI at any AbsoluteJS project
bun src/cli.ts path/to/project --config path/to/project/absolute.config.ts

#   Studio:      http://localhost:3625   (--port)
#   Dev server:  http://localhost:3000   (--dev-port, spawned for you)`,
			description:
				'The CLI kills stale processes on both ports, spawns your project’s dev script, reads absolute.config.ts to find every framework directory, and serves the studio UI beside the running app.',
			heading: 'Quick Start',
			language: 'bash'
		},
		{
			code: `import { startStudio } from '@absolutejs/studio';

// Serve the visual editor beside an already-running dev server
await startStudio({
	devServerUrl: 'http://localhost:3000',
	port: 3625,
	projectDir: './my-app',
	reactDirectory: './my-app/src/frontend/react'
});`,
			description:
				'startStudio is the Elysia server behind the CLI — embed it to serve the editor against any dev server, passing the framework directories from your absolute.config.ts.',
			heading: 'Embed the Studio Server',
			language: 'typescript'
		}
	],
	status: 'alpha',
	tagline:
		'A sandboxed visual IDE for AbsoluteJS projects — live preview with click-to-inspect, six-framework page scaffolding, and in-browser Monaco editing.',
	version: '0.0.0'
};
