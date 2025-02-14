/**
 * User in the database.
 */
export type User = {
	id: number;
	email: string;
	password: string;
};

/**
 * Null user.
 */
export const NULL_USER: User = {
	id: 0,
	email: "",
	password: "",
};
