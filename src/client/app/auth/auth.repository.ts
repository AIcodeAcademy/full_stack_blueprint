import type { Credentials } from "../../domain/credentials.type";
import { NULL_USER_TOKEN, type UserToken } from "../../domain/user-token.type";
import { BaseRepository } from "../../shared/base-repository";
import { post } from "../../shared/fetch.utils";

/**
 * Auth repository for handling authentication API requests
 */
export class AuthRepository extends BaseRepository<UserToken> {
	protected endpoint = "/api/auth";

	/**
	 * Login the user
	 * @param credentials The credentials of the user
	 * @returns The user token or NULL_USER_TOKEN if the response is not successful
	 */
	async login(credentials: Credentials): Promise<UserToken> {
		const result = await post<UserToken>(`${this.endpoint}/login`, credentials);
		return result.body || NULL_USER_TOKEN;
	}

	/**
	 * Register the user
	 * @param credentials The credentials of the user
	 * @returns The user token or NULL_USER_TOKEN if the response is not successful
	 */
	async register(credentials: Credentials): Promise<UserToken> {
		const result = await post<UserToken>(
			`${this.endpoint}/register`,
			credentials,
		);
		return result.body || NULL_USER_TOKEN;
	}
}

// Create singleton instance for the repository
export const authRepository = new AuthRepository();
