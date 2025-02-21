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
