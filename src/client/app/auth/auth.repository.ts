import type { Credentials } from "@client/domain/credentials.type";
import type { UserToken } from "@client/domain/user-token.type";
import { post } from "@client/shared/fetch.utils";

export async function login(credentials: Credentials): Promise<UserToken> {
	return post<UserToken>("/api/auth/login", credentials);
}

export async function register(credentials: Credentials): Promise<UserToken> {
	return post<UserToken>("/api/auth/register", credentials);
}
