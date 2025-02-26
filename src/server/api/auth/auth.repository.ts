import { validateUser } from "@/server/domain/user.type";
import { AppError } from "@/server/shared/app-error.class";
import { hashPassword, verifyPassword } from "@/server/shared/hash.utils";
import type { Raw } from "@/server/shared/sql.type";
import type { User } from "@server/domain/user.type";
import { insert, readCommands, select } from "@server/shared/sql.utils";
import type { CredentialsRequest } from "./credentials-request.type";

const usersSql = await readCommands("users");

/**
 * Finds a user by email
 * @param email - The email of the user
 * @returns The user or undefined if not found
 */
export const selectUserByEmail = (email: string): User | undefined => {
	const users = select<User[]>(usersSql.SELECT_BY_FIELD, { email });
	return users[0];
};

/**
 * Creates a user
 * @param rawUser - The user to insert
 * @returns The user id
 * @throws AppError if the user email already exists
 */
export const insertUser = async (rawUser: Raw<User>): Promise<number> => {
	validateUser(rawUser);
	const user = selectUserByEmail(rawUser.email);
	if (user) throw new AppError("User already exists", "LOGIC");
	rawUser.password = await hashPassword(rawUser.password);
	const newUserId = insert<Raw<User>>(usersSql.INSERT, rawUser);
	return newUserId;
};

/**
 * Selects a user by email and password
 * @param credentials - The credentials of the user
 * @returns The user id
 * @throws AppError if the user is not found or the password is invalid
 */
export const selectUserByCredentials = async (
	credentials: CredentialsRequest,
): Promise<number> => {
	const user = await selectUserByEmail(credentials.email);
	if (!user) throw new AppError("Invalid credentials", "LOGIC");
	const isValidPassword = await verifyPassword(
		credentials.password,
		user.password,
	);
	if (!isValidPassword) throw new AppError("Invalid credentials", "LOGIC");
	return user.id;
};
