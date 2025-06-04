import { isValidProviderOption } from '@absolutejs/auth';
import { eq } from 'drizzle-orm';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { Provider, SchemaType, schema } from '../../../db/schema';
import { PROVIDER_STATUSES } from '../../constants';
import { updateProviderStatus } from '../handlers/providerHandlers';
import { handleErrorLogging } from './handleErrorLogging';

type HandleStatusUpdateProps = {
	column: Extract<
		keyof Provider,
		| 'authorize_status'
		| 'profile_status'
		| 'refresh_status'
		| 'revoke_status'
	>;

	db: NeonHttpDatabase<SchemaType>;
	guardStatuses: (typeof PROVIDER_STATUSES)[number][];
	newStatus: Extract<(typeof PROVIDER_STATUSES)[number], 'tested' | 'failed'>;
	authProvider: string;
	error?: Error | unknown;
};

export const handleStatusUpdate = async ({
	db,
	column,
	guardStatuses,
	newStatus,
	authProvider,
	error
}: HandleStatusUpdateProps) => {
	if (!isValidProviderOption(authProvider)) {
		throw new Error(`Invalid auth provider: ${authProvider}`);
	}

	const [{ [column]: currentStatus } = {}] = await db
		.select({ [column]: schema.providers[column] })
		.from(schema.providers)
		.where(eq(schema.providers.name, authProvider))
		.execute();

	if (currentStatus === undefined || !guardStatuses.includes(currentStatus)) {
		return;
	}

	await updateProviderStatus({
		column,
		db,
		name: authProvider,
		status: newStatus
	})
		.then(() => {
			console.log(
				`Provider ${authProvider} ${column} status updated to '${newStatus}'`
			);
		})
		.catch((error) => {
			console.error(
				`Failed to update provider ${authProvider} ${column} status:`,
				error
			);
		});

	if (error !== undefined) {
		handleErrorLogging({
			authProvider,
			db,
			error
		});
	}
};
