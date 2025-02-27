import { AppError } from "../shared/app-error.class";
import type { Raw } from "../shared/sql.type";

/**
 * User in the database.
 */
export type User = {
	id: number;
	email: string;
	password: string;
	role_id: number;
	created_at?: Date;
	updated_at?: Date;
};

/**
 * Null user.
 */
export const NULL_USER: User = {
	id: 0,
	email: "",
	password: "",
	role_id: 0,
	created_at: new Date(),
	updated_at: new Date(),
};

/**
 * Validates a user
 * @param user - The user to validate
 * @throws BAD_REQUEST_ERROR if the user is invalid
 */
export const validateUser = (user: Raw<User>): void => {
	if (!user.email || !user.password) {
		throw new AppError("Invalid user", "LOGIC");
	}
};
