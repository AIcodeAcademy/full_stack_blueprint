import { validateUser } from "@/server/domain/user.type";
import { AppError } from "@/server/shared/app-error.class";
import { hashPassword, verifyPassword } from "@/server/shared/hash.utils";
import type { Raw } from "@/server/shared/sql.type";
import type { User } from "@server/domain/user.type";
import { insert, readCommands, select } from "@server/shared/sql.utils";

const usersSql = await readCommands("users");

/**
 * Finds a user by email
 * @param email - The email of the user
 * @returns The user or undefined if not found
 */
export const selectUserByEmail = async (
	email: string,
): Promise<User | undefined> => {
	const users = select<{ email: string }, User[]>(usersSql.SELECT_BY_FIELD, {
		email,
	});
	return users[0];
};

/**
 * Creates a user
 * @param userToInsert - The user to insert
 * @returns The user
 */
export const insertUser = async (userToInsert: Raw<User>): Promise<number> => {
	validateUser(userToInsert);
	const user = await selectUserByEmail(userToInsert.email);
	if (user) throw new AppError("User already exists", "LOGIC");
	userToInsert.password = await hashPassword(userToInsert.password);
	const newUserId = insert<Raw<User>>(usersSql.INSERT, userToInsert);
	return newUserId;
};

export const selectUserByEmailAndPassword = async (
	email: string,
	password: string,
): Promise<number> => {
	const user = await selectUserByEmail(email);
	if (!user) throw new AppError("User not found", "LOGIC");
	const isValidPassword = await verifyPassword(password, user.password);
	if (!isValidPassword) throw new AppError("Invalid password", "LOGIC");
	return user.id;
};
