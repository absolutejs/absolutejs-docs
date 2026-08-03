import process from 'node:process';
import ts from 'typescript';
import {
	dispatchInstall,
	dispatchQuickStart
} from '../src/frontend/data/documentation/dispatchDocsCode';
import { syncQuickStartServer } from '../src/frontend/data/documentation/syncDocsCode';
import {
	voiceFirstSuccessCode,
	voiceFirstSuccessInstall
} from '../src/frontend/data/documentation/voiceFirstSuccessCode';
import { firstSuccessSamplesByPackage } from '../src/frontend/data/documentation/packages/firstSuccessSamples';

type RunnableExampleContract = {
	code: string;
	expectedResult: string;
	installCommand: string;
	name: string;
};

const contracts: RunnableExampleContract[] = [
	...Object.entries(firstSuccessSamplesByPackage).map(
		([packageName, sample]) => ({
			code: sample.code,
			expectedResult: sample.expectedResult ?? '',
			installCommand: sample.prerequisites?.join('\n') ?? '',
			name: packageName
		})
	),
	{
		code: dispatchQuickStart,
		expectedResult:
			'provider === memory and inspect() contains one message',
		installCommand: dispatchInstall,
		name: 'Dispatch quickstart'
	},
	{
		code: syncQuickStartServer,
		expectedResult: 'server listens on port 3000 with an initialized store',
		installCommand: 'bun add @absolutejs/sync elysia',
		name: 'Sync server quickstart'
	},
	{
		code: voiceFirstSuccessCode,
		expectedResult: 'server prints the WebSocket route and greets a caller',
		installCommand: voiceFirstSuccessInstall,
		name: 'Voice provider quickstart'
	}
];

const packageRoot = (specifier: string) => {
	if (specifier.startsWith('@'))
		return specifier.split('/').slice(0, 2).join('/');

	return specifier.split('/')[0] ?? specifier;
};

const failures: string[] = [];
for (const contract of contracts) {
	const result = ts.transpileModule(contract.code, {
		compilerOptions: {
			jsx: ts.JsxEmit.ReactJSX,
			module: ts.ModuleKind.ESNext,
			target: ts.ScriptTarget.ESNext
		},
		fileName: `${contract.name.replace(/[^a-z0-9]+/gi, '-')}.tsx`,
		reportDiagnostics: true
	});
	const diagnostics = result.diagnostics ?? [];
	if (diagnostics.length > 0)
		failures.push(
			`${contract.name}: runnable example has TypeScript syntax errors: ${diagnostics
				.map((diagnostic) =>
					ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ')
				)
				.join('; ')}`
		);
	if (!contract.expectedResult.trim())
		failures.push(`${contract.name}: expected result is missing.`);
	for (const match of contract.code.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
		const [, specifier] = match;
		if (
			!specifier ||
			specifier.startsWith('.') ||
			specifier.startsWith('node:')
		)
			continue;
		const root = packageRoot(specifier);
		if (!contract.installCommand.includes(root))
			failures.push(
				`${contract.name}: imports ${specifier}, but ${root} is absent from its install contract.`
			);
	}
}

if (failures.length > 0) {
	console.error(failures.map((failure) => `- ${failure}`).join('\n'));
	process.exit(1);
}

console.warn(
	`Runnable documentation syntax and installs verified for ${contracts.length} examples.`
);
