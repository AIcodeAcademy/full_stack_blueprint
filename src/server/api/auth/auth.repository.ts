import type { User } from "@server/domain/user.type";
import { insert, select, selectById } from "@server/shared/sql.utils";

const sqlFolder = process.env.SQL_FOLDER || "sql";
const usersSql = await Bun.file(`${sqlFolder}/users.sql.json`).json();

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
export const insertUser = async (
	$email: string,
	$password: string,
	$roleId: number,
): Promise<User> => {
	const newUserId = insert<{
		$email: string;
		$password: string;
		$roleId: number;
	}>(usersSql.INSERT_USER, { $email, $password, $roleId });
	const newUser = selectById<User>(usersSql.SELECT_USER_BY_ID, newUserId);
	return newUser;
};
