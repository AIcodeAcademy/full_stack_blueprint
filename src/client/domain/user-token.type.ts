/**
 * Token received from the server.
 */
export type UserToken = {
	userId: number;
	token: string;
};

/**
 * Default empty user token object
 */
export const NULL_USER_TOKEN: UserToken = {
	userId: 0,
	token: "",
};
