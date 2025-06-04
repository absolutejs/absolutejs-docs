import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { schema, SchemaType } from '../../../db/schema';

type LogErrorProps = {
	db: NeonHttpDatabase<SchemaType>;
	message: string;
	stack: string;
};

type LogUnknownErrorProps = {
	db: NeonHttpDatabase<SchemaType>;
	raw: unknown;
};

export const logError = async ({ db, message, stack }: LogErrorProps) => {
	const [errorLog] = await db
		.insert(schema.errorLogs)
		.values({
			message,
			stack
		})
		.returning();

	return errorLog;
};

export const logUnknownError = async ({ db, raw }: LogUnknownErrorProps) => {
	const [unknownErrorLog] = await db
		.insert(schema.unknownErrorLogs)
		.values({
			raw
		})
		.returning();

	return unknownErrorLog;
};
