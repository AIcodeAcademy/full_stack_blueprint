/**
 * User token DTO sent to the user.
 */
export type UserTokenResponse = {
	userId: number;
	token: string;
};

export const NULL_USER_TOKEN_DTO: UserTokenResponse = {
	userId: 0,
	token: "",
};
