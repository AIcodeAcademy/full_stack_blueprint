import type { User } from "@server/domain/user.type";
import { create, drop, insert, select } from "@server/shared/sql.utils";

const sqlFolder = process.env.SQL_FOLDER || "sql";
const usersSql = await Bun.file(`${sqlFolder}/users.sql.json`).json();

/**
 * Initializes the users table
 * @returns Number of affected rows
 */
export const initializeUsersTable = (): number => {
	drop(usersSql.TABLE_NAME);
	const result = create(usersSql.CREATE_TABLE);
	return result;
};

/**
 * Finds a user by email
 * @param email - The email of the user
 * @returns The user or undefined if not found
 */
export const findUserByEmail = async (
	$email: string,
): Promise<User | undefined> => {
	const users = select<{ $email: string }, User[]>(
		usersSql.SELECT_USER_BY_EMAIL,
		{ $email },
	);
	return users[0];
};

/**
 * Creates a user
 * @param email - The email of the user
 * @param password - The password of the user
 * @returns The user
 */
export const createUser = async (
	$email: string,
	$password: string,
): Promise<User> => {
	const result = insert<{ $email: string; $password: string }>(
		usersSql.INSERT_USER,
		{ $email, $password },
	);
	return { id: result, email: $email, password: $password };
};
