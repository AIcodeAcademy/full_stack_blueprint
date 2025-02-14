import type { Credentials } from "../../domain/credentials.type";
import { getBody } from "../../shared/request.utils";
import { badRequest, ok, unauthorized } from "../../shared/response.utils";
import { createUser, findUserByEmail } from "./auth.repository";

export const auth = async (request: Request): Promise<Response> => {
	const url = new URL(request.url);
	const path = url.pathname;

	if (request.method !== "POST") return badRequest("Method not allowed");

	try {
		const credentials = (await getBody(request)) as Credentials;

		if (path === "/api/auth/login") {
			return await login(credentials);
		}

		if (path === "/api/auth/register") {
			return await register(credentials);
		}

		return badRequest("Invalid endpoint");
	} catch (error) {
		return badRequest(String(error));
	}
};

const login = async (credentials: Credentials): Promise<Response> => {
	const user = await findUserByEmail(credentials.email);
	if (!user || user.password !== credentials.password) {
		return unauthorized("Invalid credentials");
	}
	return ok({ user });
};

const register = async (credentials: Credentials): Promise<Response> => {
	const existingUser = await findUserByEmail(credentials.email);
	if (existingUser) {
		return badRequest("Email already registered");
	}

	const user = await createUser(credentials.email, credentials.password);
	return ok({ user });
};
