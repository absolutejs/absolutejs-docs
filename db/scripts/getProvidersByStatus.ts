/* eslint-disable no-await-in-loop */
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { env, stdin, stderr, stdout } from 'node:process';
import { schema } from '../schema';
import { getProvidersByStatus } from '../../src/backend/handlers/providerHandlers';
import { createInterface } from 'node:readline/promises';
import { PROVIDER_STATUSES } from '../../src/constants';

if (!env.DATABASE_URL) {
	throw new Error('Please set DATABASE_URL in your .env file');
}

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql, { schema });

const readlineInterface = createInterface({
	input: stdin,
	output: stdout
});
const askQuestion = async (question: string) =>
	(await readlineInterface.question(question)).trim();
const printLine = (text: string) => {
	stdout.write(`${text}\n`);
};
const printError = (text: string) => {
	stderr.write(`${text}\n`);
};

const validStatuses = PROVIDER_STATUSES;
type Status = (typeof validStatuses)[number];

let status: Status | undefined;
let index: number;

do {
	validStatuses.forEach((statusOption, statusIndex) =>
		printLine(`${statusIndex + 1}) ${statusOption}`)
	);
	index =
		Number(
			await askQuestion(
				`Select status type [1-${validStatuses.length}]: `
			)
		) - 1;

	if (index >= 0 && index < validStatuses.length) {
		status = validStatuses[index];
	} else {
		printError('Invalid status.');
	}
} while (!status);

const providers = await getProvidersByStatus(db, status);

if (providers.length === 0) {
	printLine(`No providers found with status "${status}".`);
} else {
	printLine(`Providers with status "${status}":`);
	const operations = ['authorize', 'profile', 'refresh', 'revoke'] as const;

	providers.forEach((provider) => {
		const matchingOperations = operations.filter(
			(operation) => provider[operation] === status
		);

		if (matchingOperations.length === 0) {
			printLine(
				`- ${provider.name} (no operations with status "${status}")`
			);
		} else {
			printLine(`- ${provider.name}:`);
			matchingOperations.forEach((operation) => {
				printLine(`    • ${operation} (${status})`);
			});
		}
	});
}

readlineInterface.close();
