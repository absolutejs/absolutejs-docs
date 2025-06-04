#!/usr/bin/env bun
import readline from 'readline';
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
import { env } from 'process';

if (!env.DATABASE_URL) {
	console.error('DATABASE_URL not set');
	process.exit(1);
}

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql, { schema });

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
const ask = (q: string) =>
	new Promise<string>((resolve) =>
		rl.question(q, (answer) => resolve(answer.trim()))
	);

const validProviders = providerOptions;
const validActions = ['authorization', 'refresh', 'revoke', 'profile'] as const;
type Action = (typeof validActions)[number];
const validNewStatuses = PROVIDER_STATUSES;

let provider: ProviderOption;
while (true) {
	const input = await ask(
		'Which provider do you want to update? (leave blank to choose) '
	);
	if (input === '') {
		validProviders.forEach((p, i) => console.log(`${i + 1}) ${p}`));
		const num = Number(
			await ask(`Enter choice [1-${validProviders.length}]: `)
		);
		if (num >= 1 && num <= validProviders.length) {
			const candidate = validProviders[num - 1];
			if (candidate !== undefined) {
				provider = candidate;
				break;
			}
		}
	} else if (isValidProviderOption(input)) {
		provider = input;
		break;
	}
	console.log('Invalid provider.');
}

let action: Action;
while (true) {
	validActions.forEach((s, i) => console.log(`${i + 1}) ${s}`));
	const num = Number(await ask('Select status type [1-4]: '));
	switch (num) {
		case 1:
			action = 'authorization';
			break;
		case 2:
			action = 'refresh';
			break;
		case 3:
			action = 'revoke';
			break;
		case 4:
			action = 'profile';
			break;
		default:
			console.log('Invalid choice.');
			continue;
	}
	break;
}

let column: keyof Pick<
	Provider,
	'authorize_status' | 'profile_status' | 'refresh_status' | 'revoke_status'
>;
switch (action) {
	case 'authorization':
		column = 'authorize_status';
		break;
	case 'refresh':
		column = 'refresh_status';
		break;
	case 'revoke':
		column = 'revoke_status';
		break;
	case 'profile':
		column = 'profile_status';
		break;
}

let newStatus: Provider['authorize_status'];
while (true) {
	validNewStatuses.forEach((s, i) => console.log(`${i + 1}) ${s}`));
	const num = Number(
		await ask(`Select new status [1-${validNewStatuses.length}]: `)
	);
	if (num >= 1 && num <= validNewStatuses.length) {
		const candidate = validNewStatuses[num - 1];
		if (candidate !== undefined) {
			newStatus = candidate;
			break;
		}
	}
	console.log('Invalid choice.');
}

const updated = await updateProviderStatus({
	db,
	name: provider,
	column,
	status: newStatus
});

console.log(
	`✓ Provider "${provider}" — set ${column} → "${newStatus}".`,
	updated
);
rl.close();
