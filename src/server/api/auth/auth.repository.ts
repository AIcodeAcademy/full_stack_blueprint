import type { User } from "@server/domain/user.type";
import {
	insert,
	readCommands,
	select,
	selectById,
} from "@server/shared/sql.utils";

const usersSql = await readCommands("users");

/**
 * Finds a user by email
 * @param email - The email of the user
 * @returns The user or undefined if not found
 */
export const findUserByEmail = async (
	$email: string,
): Promise<User | undefined> => {
	const users = select<{ $email: string }, User[]>(usersSql.SELECT_BY_FIELD, {
		$email,
	});
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
	}>(usersSql.INSERT, { $email, $password, $roleId });
	const newUser = selectById<User>(usersSql.SELECT_BY_ID, newUserId);
	return newUser;
};
