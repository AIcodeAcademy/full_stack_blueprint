import type { User } from "../../domain/user.type";
import { insert, select } from "../../shared/sql.utils";

export const findUserByEmail = async (
	email: string,
): Promise<User | undefined> => {
	const users = select<{ email: string }, User[]>(
		"SELECT id, email, password FROM users WHERE email = ?",
		{ email },
	);
	return users[0];
};

export const createUser = async (
	email: string,
	password: string,
): Promise<User> => {
	const result = insert<{ email: string; password: string }>(
		"INSERT INTO users (email, password) VALUES (?, ?)",
		{ email, password },
	);
	return { id: result, email, password };
};
