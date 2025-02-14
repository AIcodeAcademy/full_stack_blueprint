import type { Credentials } from "@client/domain/credentials.type";
import type { UserToken } from "@client/domain/user-token.type";
import { post } from "@client/shared/fetch.utils";

export async function login(credentials: Credentials): Promise<UserToken> {
	console.group("🔑 Login request");
	console.log("Email:", credentials.email);

	try {
		const response = await post<UserToken>("/api/auth/login", credentials);
		if (response.body) {
			console.log("Login successful");
			console.groupEnd();
			return response.body;
		}
		console.warn("Login failed:", response.error);
		console.groupEnd();
		throw response.error;
	} catch (error) {
		console.error("Login error:", error);
		console.groupEnd();
		throw error;
	}
}

export async function register(credentials: Credentials): Promise<UserToken> {
	console.group("📝 Registration request");
	console.log("Email:", credentials.email);

	try {
		const response = await post<UserToken>("/api/auth/register", credentials);
		if (response.body) {
			console.log("Registration successful");
			console.groupEnd();
			return response.body;
		}
		console.warn("Registration failed:", response.error);
		console.groupEnd();
		throw response.error;
	} catch (error) {
		console.error("Registration error:", error);
		console.groupEnd();
		throw error;
	}
}
