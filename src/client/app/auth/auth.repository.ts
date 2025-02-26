import type { Credentials } from "../../domain/credentials.type";
import { NULL_USER_TOKEN, type UserToken } from "../../domain/user-token.type";
import { post } from "../../shared/fetch.utils";

const authenticate =
	(endpoint: string) =>
	async (credentials: Credentials): Promise<UserToken> => {
		const response = await post<UserToken>(endpoint, credentials);
		if (response.body) return response.body;
		return NULL_USER_TOKEN;
	};

/**
 * Login the user
 * @param credentials The credentials of the user
 * @returns The user token or NULL_USER_TOKEN if the response is not successful
 */
export const login = authenticate("/api/auth/login");

/**
 * Register the user
 * @param credentials The credentials of the user
 * @returns The user token or NULL_USER_TOKEN if the response is not successful
 */
export const register = authenticate("/api/auth/register");
