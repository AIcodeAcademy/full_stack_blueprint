import type { Credentials } from "@client/domain/credentials.type";
import type { UserToken } from "@client/domain/user-token.type";
import { post } from "@client/shared/fetch.utils";

const authenticate =
	(endpoint: string) =>
	async (credentials: Credentials): Promise<UserToken> => {
		const response = await post<UserToken>(endpoint, credentials);
		if (response.error) throw response.body;
		localStorage.setItem("userToken", JSON.stringify(response.body));
		return response.body as UserToken;
	};

export const login = authenticate("/api/auth/login");
export const register = authenticate("/api/auth/register");
