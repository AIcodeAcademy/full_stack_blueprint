import { AppError } from "../shared/app-error.class";
import type { Raw } from "../shared/sql.type";

/**
 * User in the database.
 */
export type User = {
	id: number;
	email: string;
	password: string;
	name: string;
	role_id: number;
	created_at: string;
	updated_at: string;
};

/**
 * Null user.
 */
export const NULL_USER: User = {
	id: 0,
	email: "",
	password: "",
	name: "",
	role_id: 0,
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
};

/**
 * Validates a user
 * @param user - The user to validate
 * @throws AppError if the user is invalid
 */
export const validateUser = (user: Raw<User>): void => {
	if (!user.email || typeof user.email !== "string") {
		throw new AppError("Invalid email", "LOGIC");
	}

	if (!user.password || typeof user.password !== "string") {
		throw new AppError("Invalid password", "LOGIC");
	}

	if (!user.name || typeof user.name !== "string") {
		throw new AppError("Invalid name", "LOGIC");
	}
};
