import { AppError } from "../shared/app-error.class";

/**
 * User in the database.
 */
export type User = {
	id: number;
	email: string;
	password: string;
	roleId: number;
	createdAt?: Date;
	updatedAt?: Date;
};

/**
 * Null user.
 */
export const NULL_USER: User = {
	id: 0,
	email: "",
	password: "",
	roleId: 0,
	createdAt: new Date(),
	updatedAt: new Date(),
};

/**
 * Validates a user
 * @param user - The user to validate
 * @throws BAD_REQUEST_ERROR if the user is invalid
 */
export const validateUser = (user: Partial<User>): void => {
	if (!user.email || !user.password) {
		throw new AppError("Invalid user", "LOGIC");
	}
};
