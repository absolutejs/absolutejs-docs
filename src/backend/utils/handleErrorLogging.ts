import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { SchemaType } from '../../../db/schema';
import { logError, logUnknownError } from '../handlers/errorLogHandlers';

type HandleErrorLoggingProps = {
	error: unknown;
	db: NeonHttpDatabase<SchemaType>;
	authProvider: string;
};

export const handleErrorLogging = async ({
	error,
	db,
	authProvider
}: HandleErrorLoggingProps) => {
	if (error instanceof Error) {
		logError({
			db,
			message: error.message,
			stack: error.stack ?? 'No stack trace available'
		})
			.then(() => {
				console.log(`Error logged for provider ${authProvider}`);
			})
			.catch((e) => {
				console.error(
					`Failed to log error for provider ${authProvider}:`,
					e
				);
			});
	} else {
		logUnknownError({
			db,
			raw: error
		})
			.then(() => {
				console.log(
					`Unknown error logged for provider ${authProvider}`
				);
			})
			.catch((e) => {
				console.error(
					`Failed to log unknown error for provider ${authProvider}:`,
					e
				);
			});
	}
};
