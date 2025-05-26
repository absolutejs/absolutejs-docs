import { UserFunctionProps } from '@absolutejs/auth';
import { eq } from 'drizzle-orm';
import { DatabaseFunctionProps, NewUser } from '../../../db/schema';

export const getDBUser = async ({
	authSub,
	db,
	schema
}: DatabaseFunctionProps & { authSub: string }) => {
	try {
		const user = await db
			.select()
			.from(schema.users)
			.where(eq(schema.users.auth_sub, authSub))
			.execute();

		if (user.length === 0) {
			return null;
		}

		return user[0];
	} catch (error) {
		console.error('Error fetching user:', error);

		if (error instanceof Error) {
			throw new Error(`Database query failed: ${error.message}`);
		} else {
			throw new Error(
				'An unknown error occurred while fetching the user'
			);
		}
	}
};

export const createDBUser = async ({
	auth_sub,
	db,
	schema,
	metadata
}: DatabaseFunctionProps & NewUser) => {
	try {
		const newUser = await db
			.insert(schema.users)
			.values({
				auth_sub,
				metadata
			})
			.returning();

		return newUser[0];
	} catch (error) {
		console.error('Error creating user:', error);

		if (error instanceof Error) {
			throw new Error(`Failed to create user: ${error.message}`);
		} else {
			throw new Error(
				'An unknown error occurred while creating the user'
			);
		}
	}
};

export const createUser = ({
	userProfile,
	authProvider,
	db,
	schema
}: UserFunctionProps & DatabaseFunctionProps) => {
	const provider = authProvider.toUpperCase();
	const { sub, id, userid } = userProfile;

	if (!sub && !id && !userid) {
		throw new Error('No sub or ID claim found in ID token');
	}
	const authSub = `${provider}|${sub ?? id ?? userid}`;

	return createDBUser({
		auth_sub: authSub,
		db,
		metadata: userProfile,
		schema
	});
};

export const getUser = ({
	userProfile,
	authProvider,
	db,
	schema
}: UserFunctionProps & DatabaseFunctionProps) => {
	const provider = authProvider.toUpperCase();
	const { sub, id, userid } = userProfile;

	if (!sub && !id && !userid) {
		throw new Error('No sub or ID claim found in ID token');
	}

	const authSub = `${provider}|${sub ?? id ?? userid}`;

	return getDBUser({ authSub, db, schema });
};
