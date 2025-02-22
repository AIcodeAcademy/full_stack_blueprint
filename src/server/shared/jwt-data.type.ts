/**
 * Data stored in the JWT token.
 */
export type JwtData = {
	userId: number;
};

export const NULL_JWT_DATA: JwtData = {
	userId: 0,
};
