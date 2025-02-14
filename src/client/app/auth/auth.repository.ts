import type { Credentials } from "@client/domain/credentials.type";
import type { UserToken } from "@client/domain/user-token.type";
import { post } from "@client/shared/fetch.utils";

export async function login(credentials: Credentials): Promise<UserToken> {
	try {
		const response = await post<UserToken>("/api/auth/login", credentials);
		if (response.body) {
			return response.body;
		}
		throw response.error;
	} catch (error) {
		console.error("Login error:", error);
		throw error;
	}
}

export async function register(credentials: Credentials): Promise<UserToken> {
	try {
		const response = await post<UserToken>("/api/auth/register", credentials);
		if (response.body) {
			return response.body;
		}
		throw response.error;
	} catch (error) {
		console.error("Registration error:", error);
		throw error;
	}
}
