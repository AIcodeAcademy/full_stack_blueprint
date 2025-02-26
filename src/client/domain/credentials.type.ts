/**
 * Credentials sent to the server.
 */
export type Credentials = {
	email: string;
	password: string;
};

/**
 * Default empty credentials object
 */
export const NULL_CREDENTIALS: Credentials = {
	email: "",
	password: "",
};
