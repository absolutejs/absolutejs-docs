#!/usr/bin/env bun
/* eslint-disable no-await-in-loop */
import {
	providerOptions,
	isValidProviderOption,
	type ProviderOption
} from '@absolutejs/auth';
import { PROVIDER_STATUSES } from '../../src/constants';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { schema, type Provider } from '../../db/schema';
import { updateProviderStatus } from '../../src/backend/handlers/providerHandlers';
import { createInterface } from 'node:readline/promises';
import { env, exit, stdin, stderr, stdout } from 'node:process';

if (!env.DATABASE_URL) {
	stderr.write('DATABASE_URL not set\n');
	exit(1);
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

const validProviders = providerOptions;
const validActions = ['authorization', 'refresh', 'revoke', 'profile'] as const;
type Action = (typeof validActions)[number];
const validNewStatuses = PROVIDER_STATUSES;

// 1) Select provider
let provider: ProviderOption;
while (true) {
	const input = await askQuestion(
		'Which provider do you want to update? (leave blank to choose) '
	);
	if (input === '') {
		validProviders.forEach((providerOption, providerIndex) =>
			printLine(`${providerIndex + 1}) ${providerOption}`)
		);
		const selectedProviderNumber = Number(
			await askQuestion(`Enter choice [1-${validProviders.length}]: `)
		);
		if (
			selectedProviderNumber >= 1 &&
			selectedProviderNumber <= validProviders.length
		) {
			const candidate = validProviders[selectedProviderNumber - 1];
			if (candidate !== undefined) {
				provider = candidate;
				break;
			}
		}
	} else if (isValidProviderOption(input)) {
		provider = input;
		break;
	}
	printError('Invalid provider.');
}

// 2) Select one or more actions (status types)
let actions: Action[];
while (true) {
	validActions.forEach((actionName, actionIndex) =>
		printLine(`${actionIndex + 1}) ${actionName}`)
	);
	const input = await askQuestion(
		`Select status types to update [1-${validActions.length}, comma-separated]: `
	);
	const indices = input
		.split(',')
		.map((selectedValue) => Number(selectedValue.trim()))
		.filter(
			(selectedIndex) =>
				!Number.isNaN(selectedIndex) &&
				selectedIndex >= 1 &&
				selectedIndex <= validActions.length
		);

	if (indices.length > 0) {
		// Map indices to actions and filter out any undefined just in case
		actions = indices
			.map((selectedIndex) => validActions[selectedIndex - 1])
			.filter(
				(selectedAction): selectedAction is Action =>
					selectedAction !== undefined
			);
		if (actions.length > 0) {
			break;
		}
	}
	printError('Invalid choice.');
}

// 3) Map each action to the corresponding column name
const columns: Array<
	keyof Pick<
		Provider,
		| 'authorize_status'
		| 'profile_status'
		| 'refresh_status'
		| 'revoke_status'
	>
> = actions.map((action) => {
	const actionToColumn = {
		authorization: 'authorize_status',
		profile: 'profile_status',
		refresh: 'refresh_status',
		revoke: 'revoke_status'
	} as const;

	return actionToColumn[action];
});

// 4) For each selected column, ask for a new status and update
for (const column of columns) {
	let newStatus: Provider['authorize_status'];
	while (true) {
		validNewStatuses.forEach((statusOption, statusIndex) =>
			printLine(`${statusIndex + 1}) ${statusOption}`)
		);
		const selectedStatusNumber = Number(
			await askQuestion(
				`Select new status for "${column}" [1-${validNewStatuses.length}]: `
			)
		);
		if (
			selectedStatusNumber >= 1 &&
			selectedStatusNumber <= validNewStatuses.length
		) {
			const candidate = validNewStatuses[selectedStatusNumber - 1];
			if (candidate !== undefined) {
				newStatus = candidate;
				break;
			}
		}
		printError('Invalid choice.');
	}

	const updated = await updateProviderStatus({
		column,
		db,
		name: provider,
		status: newStatus
	});

	printLine(`✓ Provider "${provider}" status for ${column}: "${newStatus}".`);
	printLine(JSON.stringify(updated));
}

readlineInterface.close();
