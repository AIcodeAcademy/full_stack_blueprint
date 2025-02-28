import type { Credentials } from "@/client/domain/credentials.type";
import type { UserToken } from "@/client/domain/user-token.type";
import { post } from "@/client/shared/fetch.utils";
import type { Result } from "@/client/shared/result.type";

const postCredentials =
	(endpoint: string) =>
	async (credentials: Credentials): Promise<Result<UserToken>> => {
		const result = await post<UserToken>(endpoint, credentials);
		if (result.value) {
			localStorage.setItem("userToken", JSON.stringify(result.value));
		}
		return result;
	};

/**
 * Login a user with the given credentials
 * @param credentials The credentials of the user
 * @returns The user token or error if not successful
 */
export const login = (credentials: Credentials) =>
	postCredentials("/api/auth/login")(credentials);

/**
 * Register a new user with the given credentials
 * @param credentials The credentials of the user
 * @returns The user token or error if not successful
 */
export const register = (credentials: Credentials) =>
	postCredentials("/api/auth/register")(credentials);
