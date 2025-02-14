import type { User } from "@server/domain/user.type";
import { create, drop, insert, select } from "@server/shared/sql.utils";

const sqlFolder = process.env.SQL_FOLDER || "sql";
const usersSql = await Bun.file(`${sqlFolder}/users.sql.json`).json();

export const initializeUsersTable = (): number => {
	drop(usersSql.TABLE_NAME);
	const result = create(usersSql.CREATE_TABLE);
	return result;
};

export const findUserByEmail = async (
	$email: string,
): Promise<User | undefined> => {
	const users = select<{ $email: string }, User[]>(
		usersSql.SELECT_USER_BY_EMAIL,
		{ $email },
	);
	return users[0];
};

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
