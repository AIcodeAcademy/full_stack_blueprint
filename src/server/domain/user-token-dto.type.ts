/**
 * User token DTO sent to the user.
 */
export type UserTokenDto = {
	userId: number;
	token: string;
};

export const NULL_USER_TOKEN_DTO: UserTokenDto = {
	userId: 0,
	token: "",
};
